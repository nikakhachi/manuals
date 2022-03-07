import Puppeteer, { Browser, Page } from "puppeteer";

(async () => {
  const browser: Browser = await Puppeteer.launch({
    /*
    * To run the browser with { headless: false } 
    * within server environments where you don't need a visible UI
    * is not recommended
    */
    headless: false, // DEFAULTS to true
    // To run puppeteer within a Docker container
    executablePath: process.env.CHROME_EXECUTABLE_PATH,
    args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
    ]
  });

  // configure to increase the speed
  const more_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];


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

  // Fill the input fields, then click the submit button
  let city = 'Tokyo';
  let num = 123;
  await page.evaluate(val => document.querySelector('#some_id1').value = val, city);
  await page.evaluate(val => document.querySelector('#some_id2').value = val, num);

  let submitBtn = await page.$('#search_btn');
  await submitBtn.click();

  // Wait for a page to load
  await page.waitForSelector('#some_existing_id');

  await browser.close();
})();
