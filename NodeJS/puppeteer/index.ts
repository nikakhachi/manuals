import Puppeteer, { Browser, Page } from "puppeteer";

(async () => {
  const browser: Browser = await Puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto("https://example.com", {
    waitUntil: "domcontentloaded",
  });
  await page.screenshot({ path: "example.png" });
  await page.pdf({ path: "hn.pdf", format: "a4" });

  // Run javascript inside the page
  const data: any = await page.evaluate(() => {
    const h1Text = document.querySelector("h1").innerText;
    return h1Text;
  });

  await browser.close();
})();
