const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  console.log("Rendering homepage...");

  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle2",
  });

  // Give React/Sanity a little extra time to finish.
  await new Promise(resolve => setTimeout(resolve, 2000));

  const html = await page.content();

  const outputPath = path.join(
    process.cwd(),
    "build",
    "index.html"
  );

  fs.writeFileSync(outputPath, html, "utf8");

  console.log("Homepage prerendered:");
  console.log(outputPath);

  await browser.close();
})();