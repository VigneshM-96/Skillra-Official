const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

const BASE_URL = "http://localhost:3000";

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

const STATIC_ROUTES = [
  "",
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

async function getBlogSlugs() {
  const client = createClient({
    projectId: "o8wkzf6d",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const data = await client.fetch(
    `*[_type == "siteSettings"][0].blogs[]{
      "slug": slug.current
    }`
  );

  return data.map((b) => b.slug).filter(Boolean);
}

async function renderAndSave(page, urlPath, outDir) {
  const url = `${BASE_URL}${urlPath}`;

  console.log(`Rendering ${url} ...`);

  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Give React/Sanity/client-side rendering a little extra time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const html = await page.content();

    fs.mkdirSync(outDir, { recursive: true });

    const outputPath = path.join(outDir, "index.html");

    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`  -> saved to ${outputPath}`);
  } catch (err) {
    console.log(`  !! FAILED for ${urlPath}: ${err.message}`);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Better viewport for consistent rendering
  await page.setViewport({
    width: 1440,
    height: 900,
  });

  // Catch browser errors
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log("Browser error:", msg.text());
    }
  });

  console.log("== Static pages (incl. homepage) ==");

  for (const route of STATIC_ROUTES) {
    const outDir =
      route === ""
        ? path.join(process.cwd(), "build")
        : path.join(process.cwd(), "build", route);

    await renderAndSave(page, `/${route}`, outDir);
  }

  console.log("== Course pages ==");

  for (const slug of COURSE_SLUGS) {
    const outDir = path.join(
      process.cwd(),
      "build",
      "courses",
      slug
    );

    await renderAndSave(
      page,
      `/courses/${slug}`,
      outDir
    );
  }

  console.log("== Blog pages ==");

  const blogSlugs = await getBlogSlugs();

  console.log(`Found ${blogSlugs.length} blog posts.`);

  for (const slug of blogSlugs) {
    const outDir = path.join(
      process.cwd(),
      "build",
      "blog",
      slug
    );

    await renderAndSave(
      page,
      `/blog/${slug}`,
      outDir
    );
  }

  await browser.close();

  console.log("\nAll pages prerendered successfully.");
})();