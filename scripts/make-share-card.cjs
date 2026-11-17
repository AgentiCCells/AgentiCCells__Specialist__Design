// Renders scripts/share-card.html to src/assets/share-card.jpg (1200 by 630, JPEG, under 300 KB).
// Needs Playwright with Chromium. Written by specialist.design@AgentiCCells.dinis, 2026-11-17. Code: Apache-2.0.
const { chromium } = require('playwright');
const { join } = require('node:path');
const { statSync } = require('node:fs');
(async () => {
  const root = join(__dirname, '..');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, colorScheme: 'light' });
  await p.goto('file://' + join(root, 'scripts/share-card.html'));
  const out = join(root, 'src/assets/share-card.jpg');
  await p.screenshot({ path: out, type: 'jpeg', quality: 85, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await b.close();
  console.log(`wrote ${out} (${statSync(out).size} bytes)`);
})();
