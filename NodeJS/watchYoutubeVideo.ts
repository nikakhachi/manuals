import Puppeteer, { Browser, Page } from "puppeteer";
import { waitNSeconds } from "./waitNSeconds";
import logger from "../utils/logger";

const watchYoutubeVideo = async (youtubeLink: string, proxy: string) => {
  try {
    logger.debug("Opening the browser..");
    const browser: Browser = await Puppeteer.launch({
      args: [`--proxy-server=socks5://${proxy}`],
    });
    logger.debug("Waiting for the page to load..");
    const page: Page = await browser.newPage();
    await page.goto(youtubeLink, {
      waitUntil: "domcontentloaded",
    });
    logger.debug("Watching the video..");
    await page.evaluate(() => {
      setTimeout(() => {
        // Handle Paused Video On Start
        const playPauseButton = document.querySelector(".ytp-play-button");
        const isVideoPaused = () =>
          playPauseButton?.getAttribute("title") === "Play (k)" ? true : false;
        // @ts-ignore
        if (isVideoPaused()) playPauseButton.click();
        // Handle Paused Video On Start
        // ********
        // Handle Cookie Window On Start
        const isCookieWindow =
          // @ts-ignore
          document.querySelector(".style-scope .ytd-consent-bump-v2-lightbox")
            ?.children?.[3]?.children?.[1]?.innerText ===
          "Before you continue to YouTube";
        // @ts-ignore
        const agreeButton = document.querySelectorAll(
          ".style-scope .ytd-button-renderer .style-primary .size-default"
        )[1];
        // @ts-ignore
        if (isCookieWindow) agreeButton.click();
        // Handle Cookie Window On Start
      }, 2000);
    });
    await waitNSeconds(35);
    logger.debug("Closing the browser..");
    await browser.close();
  } catch (error) {
    logger.error("Watch Youtube Video ERROR : ", error);
  }
};

export default watchYoutubeVideo;
