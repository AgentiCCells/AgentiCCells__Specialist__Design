// AgentiCCells design pack: check-design.mjs, version 1.0.0 (2026-11-16).
// Kept by specialist-design@AgentiCCells.dinis. Code: Apache-2.0. Node built-ins only.
//
// Usage: node check-design.mjs <dir-or-file>...   (for example: node pack/check-design.mjs _site)
// The token block is the text between the comments /* tokens:start */ and /* tokens:end */.
// Reads every .css file and every <style> block and style="" attribute in .html files.
// Fails (exit 1) on:
//   1. a literal colour (#hex, rgb(), hsl()) outside the tokens:start / tokens:end block;
//   2. a custom property declared twice in one block (the second silently wins);
//   3. a light token that the dark theme does not set again;
//   4. a text pair under 4.5:1 (WCAG 2.2, 1.4.3) in light or dark, for the pairs in PAIRS.
// Prints OK and the measured ratios otherwise. Never weaken a check to pass; fix the design.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const PAIRS = [
  ['--fg', '--bg'], ['--fg', '--surface'], ['--muted', '--bg'], ['--muted', '--surface'],
  ['--accent', '--bg'], ['--accent', '--surface'], ['--on-accent', '--accent'],
  ['--ok', '--bg'], ['--warn', '--bg'], ['--bad', '--bg'],
];
const COLOUR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\(/g;

const walk = (p) => statSync(p).isDirectory() ? readdirSync(p).flatMap((f) => walk(join(p, f))) : [p];
const files = process.argv.slice(2).filter(existsSync).flatMap(walk).filter((f) => /\.(css|html)$/.test(f));
if (!files.length) { console.error('check-design: no .css or .html files given'); process.exit(1); }

const problems = [];
const light = {}, dark = {};
let tokenFiles = 0;

function lineOf(text, index) { return text.slice(0, index).split('\n').length; }

// Rule bodies with their selectors, and whether each sits inside a dark-scheme @media.
function blocks(css) {
  const out = []; const re = /([^{}]+)\{([^{}]*)\}/g; let m;
  while ((m = re.exec(css))) {
    const before = css.slice(0, m.index);
    const media = before.lastIndexOf('@media');
    const between = media === -1 ? '' : before.slice(media);
    const inside = media !== -1 && (between.split('{').length - between.split('}').length) === 1;
    const darkMedia = inside && /prefers-color-scheme\s*:\s*dark/.test(between.slice(0, between.indexOf('{')));
    out.push({ sel: m[1].replace(/\/\*[\s\S]*?\*\//g, '').trim(), body: m[2], darkMedia });
  }
  return out;
}

function checkCss(file, css, baseLine) {
  const sm = css.match(/\/\*\s*tokens:start\s*\*\//), em = css.match(/\/\*\s*tokens:end\s*\*\//);
  const start = sm ? sm.index : -1, end = em ? em.index : -1;
  const hasBlock = start !== -1 && end > start;
  for (const m of css.matchAll(COLOUR)) {
    const i = m.index;
    if (hasBlock && i > start && i < end) continue;
    const before = css.lastIndexOf('/*', i), close = css.lastIndexOf('*/', i);
    if (before > close) continue; // inside a comment
    problems.push(`${file}:${baseLine + lineOf(css, i) - 1}: literal colour ${m[0]} outside the token block`);
  }
  if (!hasBlock) return;
  tokenFiles++;
  const tokenCss = css.slice(start, end);
  for (const b of blocks(tokenCss)) {
    const seen = new Set();
    const target = (b.darkMedia || /data-theme="dark"/.test(b.sel)) ? dark : /:root/.test(b.sel) ? light : null;
    for (const d of b.body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      if (seen.has(d[1])) problems.push(`${file}: ${d[1]} declared twice in "${b.sel}"`);
      seen.add(d[1]);
      if (target) target[d[1]] = d[2].replace(/\/\*.*?\*\//g, '').trim();
    }
  }
}

for (const f of files) {
  const text = readFileSync(f, 'utf8');
  if (f.endsWith('.css')) { checkCss(f, text, 1); continue; }
  for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) checkCss(f, m[1], lineOf(text, m.index));
  for (const m of text.matchAll(/style="([^"]*)"/g)) if (COLOUR.test(m[1])) { COLOUR.lastIndex = 0; problems.push(`${f}:${lineOf(text, m.index)}: literal colour in a style attribute`); }
}

function rgb(v) {
  const h = (v || '').trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!h) return null;
  const s = h[1].length === 3 ? [...h[1]].map((c) => c + c).join('') : h[1];
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
}
const lum = ([r, g, b]) => { const c = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b); };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const report = [];
if (tokenFiles) {
  for (const k of Object.keys(light)) if (k !== '--focus' && !(k in dark) && rgb(light[k])) problems.push(`token ${k} is set for light but not for dark`);
  for (const [theme, set] of [['light', light], ['dark', { ...light, ...dark }]]) {
    for (const [fg, bg] of PAIRS) {
      const a = rgb(set[fg]), b = rgb(set[bg]);
      if (!a || !b) continue;
      const r = contrast(a, b);
      report.push(`${theme} ${fg} on ${bg}: ${r.toFixed(1)}:1`);
      if (r < 4.5) problems.push(`${theme}: ${fg} on ${bg} is ${r.toFixed(2)}:1, under 4.5:1`);
    }
  }
}

if (problems.length) { console.error(problems.join('\n')); console.error(`FAILED: ${problems.length} problem(s) in ${files.length} file(s)`); process.exit(1); }
console.log(report.join('\n'));
console.log(`OK (${files.length} files, ${tokenFiles} token block(s))`);
