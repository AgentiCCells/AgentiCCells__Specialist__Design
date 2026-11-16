// Build: copy src/ to _site/, stamp the version, write version.json.
// SITE_VERSION is set by CI only (v0.1.N); a local build says "dev".
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const version = process.env.SITE_VERSION || 'dev';
rmSync('_site', { recursive: true, force: true });
cpSync('src', '_site', { recursive: true });
// specialist.design@: publish the guidance as plain markdown next to the pages, so every
// published word passes the same wording check (validate.mjs reads .md under _site/).
for (const d of ['abp', 'guidance', 'examples', 'mistakes', 'pack', 'reviews']) if (existsSync(d)) cpSync(d, join('_site', d), { recursive: true });
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk('_site')) {
  if (!/\.(html|js|css|json|md|txt)$/.test(f)) continue;
  const s = readFileSync(f, 'utf8');
  if (s.includes('__VERSION__')) writeFileSync(f, s.replaceAll('__VERSION__', version));
}
writeFileSync('_site/version.json', JSON.stringify({ version, commit: process.env.GITHUB_SHA || 'local', built: new Date().toISOString() }, null, 2) + '\n');
writeFileSync('_site/.nojekyll', '');
console.log(`built _site/ (${version})`);
