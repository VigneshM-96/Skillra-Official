const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function getBlogSlugs() {
  // Use the same sanity client config directly here (CommonJS-safe, no ESM import)
  const { createClient } = require("@sanity/client");
  const client = createClient({
    projectId: "o8wkzf6d",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const data = await client.fetch(
    `*[_type == "siteSettings"][0].blogs[]{ "slug": slug.current }`
  );
  return data.map((b) => b.slug).filter(Boolean);
}

(async () => {
  const slugs = await getBlogSlugs();
  console.log(`Found ${slugs.length} blog posts to prerender.`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const slug of slugs) {
    const url = `http://localhost:3000/blog/${slug}`;
    console.log(`Rendering ${url} ...`);

    await page.goto(url, { waitUntil: "networkidle2" });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const html = await page.content();

    const outDir = path.join(process.cwd(), "build", "blog", slug);
    fs.mkdirSync(outDir, { recursive: true });

    const outputPath = path.join(outDir, "index.html");
    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`  -> saved to ${outputPath}`);
  }

  await browser.close();
  console.log("All blog pages prerendered.");
})();