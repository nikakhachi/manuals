import { Page } from "puppeteer";

export const getFollowers = async (page: Page, username: string) => {
  await page.goto(`https://www.instagram.com/${username}/followers/`);
  await page.waitForSelector("._aano");

  const followers = await page.evaluate(async () => {
    const waitForNSeconds = (seconds: number) => new Promise((res, rej) => setTimeout(() => res(""), seconds * 1000));
    const scrollableBox = document.querySelector("._aano");
    if (scrollableBox) {
      for (let i = 0; i < 120; i++) {
        await waitForNSeconds(1);
        scrollableBox.scroll(0, 1000000);
      }
      // @ts-ignore
      return Array.from(document.querySelectorAll(".oajrlxb2 ._aacl._aaco")).map((item) => item.innerText);
    }
  });

  if (!followers) throw new Error("Internal Server Error");
  if (!followers.every((item) => typeof item === "string")) throw new Error("Internal Server Error");

  return followers as string[];
};
