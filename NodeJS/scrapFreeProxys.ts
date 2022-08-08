import Puppeteer, { Browser, Page } from "puppeteer";
import logger from "../utils/logger";

interface ProxyArrayItem {
  ip: string;
  port: string;
}

const getProxys = async () => {
  try {
    const browser: Browser = await Puppeteer.launch();
    const page: Page = await browser.newPage();
    await page.goto("https://free-proxy-list.net/");
    const data: ProxyArrayItem[] = await page.evaluate(() => {
      const trElementAray = Array.from(document.querySelectorAll("tr"));
      const trChildrenArray = trElementAray?.map((item) => item.children);
      const ipsAndPorts = trChildrenArray
        .slice(1, 301)
        .map((item) => ({ ip: item[0].innerHTML, port: item[1].innerHTML }));
      return ipsAndPorts;
    });
    await browser.close();
    return data;
  } catch (error) {
    logger.error("Get Free Proxies ERROR : ", error);
    return [];
  }
};

export { getProxys };
