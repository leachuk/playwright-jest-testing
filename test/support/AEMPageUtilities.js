/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const options = {
  string: ['hostname', 'port', 'username', 'password'],
  boolean: ['isAuthor', 'isWcmModeDisabled'],
  default: {
    scheme: 'http',
    hostname: 'localhost',
    username: 'admin',
    password: 'admin',
    isWcmModeDisabled: true,
    isAuthor: true,
  },
};
const args = require('minimist')(process.argv.slice(2), options);

class AEMPageUtilities {
  constructor(browsers, path) {
    return (async () => {
      this.path = path;
      this.browsers = [{}];
      this.context = null;
      this.argv = args;
      this.options = {
        scheme: args.scheme,
        hostname: args.hostname,
        port: args.port,
        isAuthor: args.isAuthor,
        isWcmModeDisabled: args.isWcmModeDisabled,
        username: args.username,
        password: args.password,
      };
      await Object.assign(
        this.browsers,
        [{ browserName: 'chromium', browser: null, page: null }],
        await AEMPageUtilities.initPages(browsers, this.path, this.options),
      );

      return this; // when done
    })();
  }

  set browsers(browsers) {
    this._browsers = browsers;
  }

  get browsers() {
    return this._browsers;
  }

  set scheme(scheme) {
    this.options.scheme = scheme;
  }

  get scheme() {
    return this.options.scheme;
  }

  set hostname(hostname) {
    this.options.hostname = hostname;
  }

  get hostname() {
    return this.options.hostname;
  }

  set port(port) {
    this.options.port = port;
  }

  get port() {
    return this.options.port;
  }

  set isAuthor(isAuthor) {
    this.options.isAuthor = isAuthor;
  }

  get isAuthor() {
    return this.options.isAuthor;
  }

  set isWcmModeDisabled(isWcmModeDisabled) {
    this.options.isWcmModeDisabled = isWcmModeDisabled;
  }

  get isWcmModeDisabled() {
    return this.options.isWcmModeDisabled;
  }

  set username(username) {
    this.options.username = username;
  }

  get username() {
    return this.options.username;
  }

  set password(password) {
    this.options.password = password;
  }

  get password() {
    return this.options.password;
  }

  setPath(path) {
    this.path = path;
  }

  getPath() {
    return this.setupPath();
  }

  static setupHostname(optionsIn) {
    let host = `${optionsIn.scheme}://${optionsIn.hostname}`;
    if (typeof optionsIn.port !== 'undefined') {
      host = `${optionsIn.scheme}://${optionsIn.hostname}:${optionsIn.port}`;
    }
    return host;
  }

  static setupPath(path, optionsIn) {
    const url = AEMPageUtilities.setupHostname(optionsIn);
    console.log(`optionsIn.isWcmModeDisabled:${optionsIn.isWcmModeDisabled}`);
    if (typeof optionsIn.isWcmModeDisabled !== 'undefined' && optionsIn.isWcmModeDisabled === true) {
      return `${url}${path}?wcmmode=disabled`;
    }
    return `${url}${path}`;
  }

  static async isAemLogin(page) {
    const found = await page.content();
    if (found.includes('QUICKSTART_HOMEPAGE')) {
      console.log('isAemLogin true');
      return true;
    }
    console.log('isAemLogin false');
    return false;
  }

  static async initPages(browsers, setupPath, optionsIn) {
    console.log('initPages()...');
    console.log(optionsIn);
    const browserUpdateWithPage = browsers;

    for (const index in browserUpdateWithPage) {
      const context = await browsers[index].browser.newContext();
      const page = await context.newPage();
      await page.goto(AEMPageUtilities.setupPath(setupPath, optionsIn));
      console.log(`page.url():${page.url()}`);
      // page.screenshot({ path: 'testingScreenshot.png' });
      if (await AEMPageUtilities.isAemLogin(page)) {
        let loginUrl = '';
        if (typeof optionsIn.port !== 'undefined') {
          loginUrl = `${optionsIn.scheme}://${optionsIn.hostname}:${optionsIn.port}/libs/granite/core/content/login.html`;
        } else {
          loginUrl = `${optionsIn.scheme}://${optionsIn.hostname}/libs/granite/core/content/login.html`;
        }
        console.log(`got loginUrl:${loginUrl}`);
        // await page.screenshot({ path: './preloginscreenshot.png' });
        await page.type('#username', optionsIn.username);
        await page.type('#password', optionsIn.password);
        // await page.screenshot({ path: './pre1loginscreenshot.png' });
        await Promise.all([
          page.click('#submit-button'),
          console.log(`[${browsers[index].browserName}]clicked loginPage`),
          page.waitForNavigation({ waitUntil: 'load' }),
          console.log(`[${browsers[index].browserName}]login navigation completed`),
        ]);
        // await page.screenshot({ path: './pre2loginscreenshot.png' });
      }
      browserUpdateWithPage[index].page = page;
    }
    return browserUpdateWithPage;
  }

  async getPage(browserNameIn) {
    const result = this.browsers.filter((x) => x.browserName === browserNameIn);
    // console.log(`getPage(${result[0].browserName})`);
    return result[0].page;
  }
}

module.exports = AEMPageUtilities;
