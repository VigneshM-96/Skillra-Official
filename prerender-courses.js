const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const COURSE_SLUGS = [
  "ai-medical-coding-course",
  "ai-medical-billing-course",
  "ai-medical-scribing-course",
  "full-stack-development-course",
  "data-analytics-course",
  "ai-machine-learning-course",
  "tally-gst-course",
  "sap-development-course",
  "ui-ux-design-course",
  "personality-development-course",
  "digital-marketing-course",
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const slug of COURSE_SLUGS) {
    const url = `http://localhost:3000/courses/${slug}`;
    console.log(`Rendering ${url} ...`);

    await page.goto(url, { waitUntil: "networkidle2" });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const html = await page.content();

    const outDir = path.join(process.cwd(), "build", "courses", slug);
    fs.mkdirSync(outDir, { recursive: true });

    const outputPath = path.join(outDir, "index.html");
    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`  -> saved to ${outputPath}`);
  }

  await browser.close();
  console.log("All course pages prerendered.");
})();