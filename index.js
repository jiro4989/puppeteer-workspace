const puppeteer = require('puppeteer');
const mysql = require('promise-mysql');
const Pixiv = require("./src/pixiv.js");

async function main() {
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
    const urls = await pixiv.downloadBookmarks();

    const conn = await mysql.createConnection({
      host: '127.0.0.1',
      port: '3314',
      user: 'root',
      password: 'password',
      database: 'test_db',
    });
    try {
      for (let url in urls) {
        console.log(`${url}を追加します。`);
        await conn.query("INSERT INTO urls VALUES (NULL, ?)", url);
      }
      console.log("INSERT完了");
    } catch (e) {
      console.log(`SQLエラーが発生しました。 err=${e}`);
      conn.end();
    }
  } catch (e) {
    console.log(`アプリが死にました。err=${e}`);
  }
}

main();
