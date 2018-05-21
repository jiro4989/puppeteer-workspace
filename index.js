const puppeteer = require('puppeteer');
const Pixiv = require("./src/pixiv.js");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();

  try {
    const pixiv = new Pixiv(browser, page);
    await pixiv.login();
    await pixiv.gotoBookmark();
    await pixiv.downloadBookmarks();
  } catch (e) {
    console.log(`アプリが死にました。err=${e}`);
  }
})();
