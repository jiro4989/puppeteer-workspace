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

  const pixiv = new Pixiv(browser, page);
  pixiv.resolve()
    .then(() => pixiv.login())
    .then(() => pixiv.gotoBookmarks())
    .catch((err) => {
      console.log("アプリが死にました。");
    })
})();
