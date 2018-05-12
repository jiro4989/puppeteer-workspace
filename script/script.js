const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const url = "https://jiro4989.github.io/";
  const page = await browser.newPage();
  // await page.goto('https://example.com');
  await page.goto(url);
  const list = page.evaluate(() => {
    const nodes = document.querySelectorAll(".article-title");
    const list = [];
    for (let node in nodes) {
      const text = node.innerHTML;
      list.push(text);
    }
    return list;
  });
  let str = "";
  for (let l in list) {
    str += l;
  }
  fs.writeFile("result.txt", str);
  await page.screenshot({ path: 'example.png' });

  browser.close();
})();
