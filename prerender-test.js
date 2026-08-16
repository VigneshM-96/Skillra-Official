const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle2",
  });

  console.log("TITLE:");
  console.log(await page.title());

  console.log("\nH1:");
  console.log(await page.$eval("h1", el => el.innerText));

  console.log("\nDESCRIPTION:");
  console.log(
    await page.$eval(
      'meta[name="description"]',
      el => el.getAttribute("content")
    )
  );

  console.log("\nCANONICAL:");
  console.log(
    await page.$eval(
      'link[rel="canonical"]',
      el => el.getAttribute("href")
    )
  );

  await browser.close();
})();