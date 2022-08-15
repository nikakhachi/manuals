import Puppeteer from "puppeteer";

const usernamesToUnfollow: string[] = [];

(async () => {
  const browser = await Puppeteer.launch({
    headless: false,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });

  const page = await browser.newPage();

  const waitForNSeconds = (seconds: number) =>
    new Promise((res, rej) => setTimeout(() => res(""), seconds * 1000));

  for (const username of usernamesToUnfollow) {
    await page.goto(`https://www.instagram.com/${username}`);
    try {
      await page.waitForSelector("._abn9._abnd._abni", { timeout: 1000 * 5 });
      await page.click("._abn9._abnd._abni");
      await page.waitForSelector("._a9--._a9-_", { timeout: 1000 * 5 });
      await page.click("._a9--._a9-_");
      await waitForNSeconds(3);
    } catch (error) {
      console.log(`ERROR on ${username}`);
    }
  }
})();
