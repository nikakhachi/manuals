import { Page } from "puppeteer";

export const logintoInstagram = async (page: Page) => {
  await page.goto("https://www.instagram.com/", {
    waitUntil: ["load", "networkidle0"],
  });
  await page.type("input[name='username']", username);
  await page.type("input[name='password']", password);
  await page.click("#loginForm > div > div:nth-child(3) > button > div");
  await page.waitForNavigation({ waitUntil: ["load", "networkidle0"] });
};
