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
const walkMd = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walkMd(p) : p.endsWith('.md') ? [p] : []; });
for (const d of SECTIONS) {
  if (!existsSync(join('_site', d))) continue;
  for (const f of walkMd(join('_site', d))) {
    const { title, description, html } = render(readFileSync(f, 'utf8'));
    const src = '/' + relative('_site', f);
    const out = f.replace(/README\.md$/, 'index.md').replace(/\.md$/, '.html');
    writeFileSync(out, page.replaceAll('__TITLE__', escAttr(title || src)).replaceAll('__DESCRIPTION__', escAttr(description || title)).replaceAll('__SOURCE__', src).replace('__BODY__', html));
  }
}
rmSync('_site/_page.html', { force: true });
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk('_site')) {
  if (!/\.(html|js|css|json|md|txt)$/.test(f)) continue;
  const s = readFileSync(f, 'utf8');
  if (s.includes('__VERSION__')) writeFileSync(f, s.replaceAll('__VERSION__', version));
}
writeFileSync('_site/version.json', JSON.stringify({ version, commit: process.env.GITHUB_SHA || 'local', built: new Date().toISOString() }, null, 2) + '\n');
writeFileSync('_site/.nojekyll', '');
console.log(`built _site/ (${version})`);
