// Build: copy src/ to _site/, stamp the version, write version.json.
// SITE_VERSION is set by CI only (v0.1.N); a local build says "dev".
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { render } from './md.mjs';
const version = process.env.SITE_VERSION || 'dev';
rmSync('_site', { recursive: true, force: true });
cpSync('src', '_site', { recursive: true });
// specialist.design@: publish the guidance as plain markdown next to the pages, so every
// published word passes the same wording check (validate.mjs reads .md under _site/).
const SECTIONS = ['abp', 'guidance', 'examples', 'mistakes', 'pack', 'reviews'];
for (const d of SECTIONS) if (existsSync(d)) cpSync(d, join('_site', d), { recursive: true });
// Each markdown file is also rendered to a readable page from the same source, so the two cannot drift.
const page = readFileSync('src/_page.html', 'utf8');
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// Link previews (cells@ roll-out at Dinis's word, 2026-11-17): every description is 110 to 150 characters.
const fitDescription = (d) => {
  let t = (d || '').replace(/\s+/g, ' ').trim();
  const pads = ['From the design guidance of the AgentiCCells Design specialist.', 'Part of the day-one pack and guidance for every SGit and AgentiCCells team.'];
  for (const pad of pads) if (t.length < 110) t = `${t.replace(/[.:]?$/, '.')} ${pad}`.trim();
  if (t.length > 150) { t = t.slice(0, 149); t = t.slice(0, t.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '\u2026'; }
  return t;
};
const walkMd = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walkMd(p) : p.endsWith('.md') ? [p] : []; });
for (const d of SECTIONS) {
  if (!existsSync(join('_site', d))) continue;
  for (const f of walkMd(join('_site', d))) {
    const { title, description, html } = render(readFileSync(f, 'utf8'));
    const src = '/' + relative('_site', f);
    const out = f.replace(/README\.md$/, 'index.md').replace(/\.md$/, '.html');
    writeFileSync(out, page.replaceAll('__TITLE__', escAttr(title || src)).replaceAll('__DESCRIPTION__', escAttr(fitDescription(description || title))).replaceAll('__SOURCE__', src).replace('__BODY__', html));
  }
}
rmSync('_site/_page.html', { force: true });
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk('_site')) {
  if (!/\.(html|js|css|json|md|txt)$/.test(f)) continue;
  const s = readFileSync(f, 'utf8');
  if (s.includes('__VERSION__')) writeFileSync(f, s.replaceAll('__VERSION__', version));
}
// The share tags, added to every HTML page from its own title, description and address.
const ORIGIN = 'https://specialist-design.agenticcells.site';
for (const f of walk('_site').filter((x) => x.endsWith('.html'))) {
  let s = readFileSync(f, 'utf8');
  if (s.includes('property="og:title"')) continue;
  const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || 'Specialist: Design';
  const desc = (s.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const path = '/' + relative('_site', f).replace(/(^|\/)index\.html$/, '$1');
  const url = ORIGIN + path;
  const tags = [
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:url" content="${url}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Specialist: Design (AgentiCCells)">',
    '<meta property="og:locale" content="en_GB">',
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${desc}">`,
    `<meta property="og:image" content="${ORIGIN}/assets/share-card.jpg">`,
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="Specialist: Design. The design system for SGit, AgentiCCells and their teams.">',
    '<meta name="twitter:card" content="summary_large_image">',
  ].join('\n');
  writeFileSync(f, s.replace('</head>', tags + '\n</head>'));
}
writeFileSync('_site/version.json', JSON.stringify({ version, commit: process.env.GITHUB_SHA || 'local', built: new Date().toISOString() }, null, 2) + '\n');
writeFileSync('_site/.nojekyll', '');
console.log(`built _site/ (${version})`);
