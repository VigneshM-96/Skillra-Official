// audit-canonical.js
// Crawls given routes of a React app and reports:
// 1. Pages missing a <link rel="canonical"> tag
// 2. Duplicate pages (identical content) among those missing pages

import puppeteer from 'puppeteer';
import fs from 'fs';

const routes = JSON.parse(fs.readFileSync('routes.json', 'utf-8')); // e.g. ["/", "/about", "/products/1"]
const BASE_URL = 'http://localhost:3000'; // change to your app's URL/port

const results = [];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const route of routes) {
    console.log(`Checking ${route} ...`);
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });

    const canonical = await page.evaluate(() => {
      const el = document.querySelector('link[rel="canonical"]');
      return el ? el.getAttribute('href') : null;
    });

    const bodyText = await page.evaluate(() => document.body.innerText.trim());

    results.push({ route, canonical, contentHash: hash(bodyText) });
  }

  await browser.close();

  // 1. Pages missing canonical tag
  const missing = results.filter(r => !r.canonical);
  console.log('\n=== Pages WITHOUT canonical tag ===');
  console.log(missing.length ? missing.map(r => r.route) : 'None found ✅');

  // 2. Duplicate pages among those missing canonical
  const seen = {};
  missing.forEach(r => {
    seen[r.contentHash] = seen[r.contentHash] || [];
    seen[r.contentHash].push(r.route);
  });
  const duplicates = Object.values(seen).filter(group => group.length > 1);

  console.log('\n=== Duplicate pages (no canonical) ===');
  console.log(duplicates.length ? duplicates : 'None found ✅');

  // Save results to a file too, for reference
  fs.writeFileSync(
    'audit-results.json',
    JSON.stringify({ missing: missing.map(r => r.route), duplicates }, null, 2)
  );
  console.log('\nFull results saved to audit-results.json');
};

run();