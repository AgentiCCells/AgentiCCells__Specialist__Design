// Gate: fails the build on any problem. Never weaken a check to get a release out.
// From scripts/validate.mjs in the site repositories made by sites@AgentiCCells.dinis
// (2026-11-16); factory@ added the hub.json fields, the description check and the
// placeholder check (a seeded site must hold no __SITE_*__ placeholder).
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const problems = [];
const fail = m => problems.push(m);
const hype = /\b(revolutionary|cutting[- ]edge|seamless(?:ly)?|world[- ]class|game[- ]changing)\b/i;
const isTemplate = existsSync('.factory-template');
if (!existsSync('_site')) { console.error('FAILED: _site/ is not built: run node scripts/build.mjs'); process.exit(1); }
const files = walk('_site');
for (const f of [...files, 'hub.json', 'README.md']) {
  if (!existsSync(f) || !/\.(html|js|css|json|md)$/.test(f)) continue;
  const s = readFileSync(f, 'utf8');
  s.split('\n').forEach((line, i) => {
    if (line.includes('—')) fail(`${f}:${i + 1}: em dash`);
    const m = line.match(hype); if (m) fail(`${f}:${i + 1}: hype word "${m[0]}"`);
    if (!isTemplate && /__SITE_[A-Z]+__/.test(line)) fail(`${f}:${i + 1}: template placeholder left in a seeded site`);
  });
  if (f.endsWith('.html')) {
    if (!/<title>[^<]+<\/title>/.test(s)) fail(`${f}: no <title>`);
    if (!/<meta name="description" content="[^"]+"/.test(s)) fail(`${f}: no description`);
    if (!/<html lang="/.test(s)) fail(`${f}: no lang on <html>`);
    for (const m of s.matchAll(/<script[^>]+src="([^"]+)"/g)) if (/^(https?:)?\/\//.test(m[1])) fail(`${f}: third-party script ${m[1]}`);
    for (const m of s.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)) if (/^(https?:)?\/\//.test(m[1])) fail(`${f}: third-party stylesheet ${m[1]}`);
    for (const m of s.matchAll(/(?:href|src)="([^"#?]+)/g)) {
      const u = m[1]; if (/^(https?:|mailto:|data:|\/\/)/.test(u)) continue;
      const target = u.startsWith('/') ? join('_site', u) : join(dirname(f), u);
      if (!existsSync(target) && !existsSync(join(target, 'index.html'))) fail(`${f}: broken link ${u}`);
    }
  }
}
// Link previews (cells@ roll-out at Dinis's word, 2026-11-17; added by specialist.design@AgentiCCells.dinis).
// Every page carries the share tags with absolute https URLs and a 110 to 150 character
// description; the card it names is served by this site, a JPEG, 1200 by 630, under 300 KB.
{
  const decode = (t) => t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  const meta = (s, attr, key) => { const m = s.match(new RegExp(`<meta ${attr}="${key.replace(/[:.]/g, '\\$&')}" content="([^"]*)"`)); return m ? decode(m[1]) : null; };
  const absolute = (u) => /^https:\/\/[^/\s]+\.[^/\s]+/.test(u || '');
  const jpegSize = (buf) => { // width and height from the first SOF marker
    if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
    for (let i = 2; i < buf.length - 9;) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1], len = buf.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      i += 2 + len;
    }
    return null;
  };
  const cards = new Set();
  for (const f of files.filter((x) => x.endsWith('.html'))) {
    const s = readFileSync(f, 'utf8');
    const canon = (s.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    if (!absolute(canon)) fail(`${f}: canonical link missing or not an absolute https URL`);
    for (const k of ['og:url', 'og:image']) if (!absolute(meta(s, 'property', k))) fail(`${f}: ${k} missing or not an absolute https URL`);
    for (const k of ['og:type', 'og:site_name', 'og:locale', 'og:title', 'og:image:type', 'og:image:alt']) if (!meta(s, 'property', k)) fail(`${f}: no ${k}`);
    const d = meta(s, 'property', 'og:description');
    if (d === null) fail(`${f}: no og:description`);
    else if ([...d].length < 110 || [...d].length > 150) fail(`${f}: og:description is ${[...d].length} characters, not 110 to 150`);
    if (meta(s, 'property', 'og:image:width') !== '1200' || meta(s, 'property', 'og:image:height') !== '630') fail(`${f}: og:image:width and og:image:height must be 1200 and 630`);
    if (meta(s, 'name', 'twitter:card') !== 'summary_large_image') fail(`${f}: twitter:card is not summary_large_image`);
    const img = meta(s, 'property', 'og:image');
    if (img) cards.add(img);
  }
  for (const u of cards) {
    const local = join('_site', new URL(u).pathname);
    if (new URL(u).host !== 'specialist-design.agenticcells.site' || !existsSync(local)) { fail(`share card ${u} is not served by this site`); continue; }
    const buf = readFileSync(local), size = jpegSize(buf);
    if (!size) fail(`${local}: share card is not a JPEG`);
    else if (size.w !== 1200 || size.h !== 630) fail(`${local}: share card is ${size.w}x${size.h}, not 1200x630`);
    if (buf.length >= 300 * 1024) fail(`${local}: share card is ${Math.round(buf.length / 1024)} KB, not under 300 KB`);
  }
}
if (!existsSync('_site/version.json')) fail('no version.json');
if (!existsSync('_site/index.html')) fail('no index.html');
try {
  const h = JSON.parse(readFileSync('hub.json', 'utf8'));
  for (const k of ['name', 'what_it_does', 'owner', 'repository', 'live_address', 'version_from']) if (typeof h[k] !== 'string' || !h[k].trim()) fail(`hub.json: ${k} must be a non-empty string`);
  if (h.owner !== 'AgentiCCells') fail('hub.json: owner must be AgentiCCells');
  if (!h.licence || h.licence.code !== 'Apache-2.0' || h.licence.text !== 'CC BY 4.0') fail('hub.json: licence must be code Apache-2.0, text CC BY 4.0');
} catch (e) { fail(`hub.json is missing or not JSON (${e.message})`); }
if (problems.length) { console.error(problems.join('\n')); console.error(`FAILED: ${problems.length} problem(s)`); process.exit(1); }
console.log(`OK${isTemplate ? ' (template)' : ''}`);
