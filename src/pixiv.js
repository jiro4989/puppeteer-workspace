class Pixiv {
  constructor(b,p) {
    this.browser = b;
    this.page = p;
  }

  /**
   * resolve は以降のあらゆるメソッドの起点のために実行するメソッドです。
   */
  async resolve() {
    return Promise.resolve();
  }

  /**
   * close はブラウザを閉じます。
   */
  async close() {
    return this.browser.close()
      .catch((err) => console.log("ブラウザを閉じられませんでした。"));
  }

  /**
   * login はログイン認証を通過します。
   * ログインを通過するために環境変数PIXIV_USER_IDとPIXIV_USER_PASSWORDを設定する必要があります。
   */
  async login() {
    await this.page.goto("https://accounts.pixiv.net/login?lang=ja&source=pc&view_type=page&ref=wwwtop_accounts_index");
    await this.page.type('#LoginComponent > form > div.input-field-group > div:nth-child(1) > input[type="text"]', process.env.PIXIV_USER_ID);
    await this.page.type('#LoginComponent > form > div.input-field-group > div:nth-child(2) > input[type="password"]', process.env.PIXIV_USER_PASSWORD);
    return await this.clickJump('#LoginComponent > form > button')
      .catch(err => {
        console.log(`ログインに失敗しました。err=${err}`);
      });
  }

  /**
   * clickJump はボタンやURLのクリックでの画面遷移の際に使用します。
   */
  async clickJump(selector) {
    return await Promise.all([
      this.page.click(selector),
      this.page.waitForNavigation({waitUntil: "domcontentloaded"})
    ]).catch((err) => {
      console.log(`クリックでの画面遷移に失敗しました。selector=${selector}, err=${err}`)
    });
  }

  /**
   * gotoBookmark はブックマーク一覧の画面に移動します。
   */
  async gotoBookmark() {
    const url = "https://www.pixiv.net/bookmark.php";
    console.log(url);
    return await this.page.goto(url).catch(err => console.log(`ブックマーク一覧ページに遷移できませんでした。url=${url} err=${err}`));
  }

  /**
   * downloadBookmarks はブックマーク一覧をDLします。
   * TODO
   */
  async downloadBookmarks() {
    const urls = await this.page.$$eval('.work', list => list.map(v => v.href));
    return urls;
  }

}

module.exports = Pixiv;
