const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const STATIC_ROUTES = [
  "about-us",
  "contact-us",
  "campus",
  "placement",
  "career",
  "books",
  "gallery",
  "our-products",
  "blog",
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const route of STATIC_ROUTES) {
    const url = `http://localhost:3000/${route}`;
    console.log(`Rendering ${url} ...`);

    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      // Give React/Sanity extra time to finish rendering,
      // without waiting for network to go fully idle.
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const html = await page.content();

      const outDir = path.join(process.cwd(), "build", route);
      fs.mkdirSync(outDir, { recursive: true });

      const outputPath = path.join(outDir, "index.html");
      fs.writeFileSync(outputPath, html, "utf8");

      console.log(`  -> saved to ${outputPath}`);
    } catch (err) {
      console.log(`  !! FAILED for ${route}: ${err.message}`);
      console.log(`  -> skipping and continuing...`);
    }
  }

  await browser.close();
  console.log("Static page prerendering complete.");
})();