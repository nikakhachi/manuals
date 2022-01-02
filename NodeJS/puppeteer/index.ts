import { Browser, Page, launch } from "puppeteer";

(async () => {
  const browser: Browser = await launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });
  await page.pdf({ path: "hn.pdf", format: "a4" });

  // Run javascript inside the page
  const data: any = await page.evaluate(() => {
    const h1Text = document.querySelector("h1").innerText;
    return h1Text;
  });

  await browser.close();
})();
