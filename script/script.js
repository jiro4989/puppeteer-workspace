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
  console.log("Webよみ");
  const list = await page.evaluate(() => {
    // この中でブラウザ上でのJSのコードが書ける
    const nodes = document.querySelectorAll("h2#name");
    console.log(nodes);
    const list = [];
    for (let node of nodes) {
      const text = node.innerHTML;
      list.push(text);
    }
    return list;
  });
  console.log("読み取り終わり！" + list);
  let str = "";
  for (let l of list) {
    console.log(l);
    str += l;
  }
  fs.writeFile("result.txt", str, (err) => {
    if (err) {
      // 書き出しに失敗した場合
      console.log("書き出しに失敗しました。" + err);
      throw err;
    } else {
      // 書き出し成功の場合
      console.log("正常にファイルは書き出されました。")
    }
  });
  await page.screenshot({ path: 'example.png' });

  browser.close();

  // スクレイピングここまで
  // ここからはDBにデータを追加する。
  const mysql = require("mysql");
  const conn = mysql.createConnection({
    host: "pup_db",
    user: "root",
    password: "password",
    database: "test_db"
  });

  conn.connect((err) => {
    if (err) {
      console.log("接続断が発生しました。" + err);
      return;
    }

    conn.query("select * from `users`", (err, results, fieldds) => {
      console.log(results);
    });

    // データ挿入テスト
    conn.query("insert into `users` set ?", {name: "inoue", password: "inocchi"}, (err, results, fieldds) => {
      console.log(results);
    });

    conn.query("select * from `users`", (err, results, fieldds) => {
      console.log(results);
    });

    conn.end();
  });
})();
