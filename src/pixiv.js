class Pixiv {
  constructor(b,p) {
    this.browser = b;
    this.page = p;
  }

  /**
   * resolve は以降のあらゆるメソッドの起点のために実行するメソッドです。
   */
  resolve() {
    return Promise.resolve();
  }

  /**
   * close はブラウザを閉じます。
   */
  close() {
    return this.browser.close()
      .catch((err) => console.log("ブラウザを閉じられませんでした。"));
  }

  /**
   * login はログイン認証を通過します。
   * ログインを通過するために環境変数PIXIV_USER_IDとPIXIV_USER_PASSWORDを設定する必要があります。
   */
  login() {
    return Promise.resolve()
      .then(() => this.page.goto("https://accounts.pixiv.net/login?lang=ja&source=pc&view_type=page&ref=wwwtop_accounts_index"))
      .then(() => this.page.type('#LoginComponent > form > div.input-field-group > div:nth-child(1) > input[type="text"]', process.env.PIXIV_USER_ID))
      .then(() => this.page.type('#LoginComponent > form > div.input-field-group > div:nth-child(2) > input[type="password"]', process.env.PIXIV_USER_PASSWORD))
      .then(() => {
        return Promise.all([
          this.page.click('#LoginComponent > form > button'),
          this.page.waitForNavigation({waitUntil: "domcontentloaded"})
        ])
      })
      .catch(err => {
        console.log("ログインに失敗しました。" + err);
      });
  }

  /**
   * gotoBookmarks はブックマーク一覧の画面に移動します。
   */
  gotoBookmarks() {
    return Promise.all([
      this.page.click('body > header > div > nav.navigation-list > ul.menus > li.bookmarks > a'),
      this.page.waitForNavigation({waitUntil: "domcontentloaded"})
    ]).catch((err) => {
      console.log("ブックマークのページに遷移できませんでした。" + err)
    });
  }

  /**
   * downloadBookmarks はブックマーク一覧をDLします。
   */
  downloadBookmarks() {
    // TODO
    // const urls = await page.$$eval('.work', list => list.map(v => v.href));
    // for (let url of urls) {
    //   const illustPage = await browser.newPage();
    //   await illustPage.goto(url);
    //   await illustPage.waitFor(2000);
    // }
  }

}

module.exports = Pixiv;