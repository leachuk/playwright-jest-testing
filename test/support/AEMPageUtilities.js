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
  },
};
const args = require('minimist')(process.argv.slice(2), options);

class AEMPageUtilities {
  constructor(browser, path) {
    this.path = path;
    this.browser = browser;
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

  setupHostname() {
    let hostname = `${this.scheme}://${this.hostname}`;
    if (typeof this.port !== 'undefined') {
      hostname = `${this.scheme}://${this.hostname}:${this.port}`;
    }
    return hostname;
  }

  setupPath() {
    const url = this.setupHostname();
    console.log(`this.isWcmModeDisabled:${this.isWcmModeDisabled}`);
    if (typeof this.isWcmModeDisabled !== 'undefined' && this.isWcmModeDisabled === true) {
      return `${url}${this.path}?wcmmode=disabled`;
    }
    return `${url}${this.path}`;
  }

  async isAemLogin(page) {
    const found = await page.content();
    if (found.includes('QUICKSTART_HOMEPAGE')) {
      console.log('isAemLogin true');
      return true;
    }
    console.log('isAemLogin false');
    return false;
  }

  async getPage() {
    this.context = await this.browser.newContext();
    // const path = await aemUtils.getPath();
    const page = await this.context.newPage(this.setupPath());
    console.log(`page.url():${page.url()}`);
    // const found = await page.$('text="Welcome to Adobe Experience Manager"');
    if (await this.isAemLogin(page)) {
      let loginUrl = '';
      // todo: need to handle authenticating to author instance via form
      // trying with basic auth in the url redirects to the login page
      if (typeof this.port !== 'undefined') {
        loginUrl = `${this.scheme}://${this.hostname}:${this.port}/libs/granite/core/content/login.html`;
      } else {
        loginUrl = `${this.scheme}://${this.hostname}/libs/granite/core/content/login.html`;
      }
      console.log(`loginUrl:${loginUrl}`);
      // const loginPage = await this.context.newPage(loginUrl);
      console.log('got loginPage');
      // await page.screenshot({ path: './preloginscreenshot.png' });
      await page.type('#username', this.username);
      await page.type('#password', this.password);
      // await page.screenshot({ path: './pre2loginscreenshot.png' });
      await Promise.all([
        page.click('#submit-button'),
        page.waitForNavigation({ waitUntil: 'load' }),
      ]);
      console.log('clicked loginPage');
      // await page.screenshot({ path: './pre3loginscreenshot.png' });
      console.log(`setupPath:${this.setupPath()}`);
      // await page.screenshot({ path: './postloginscreenshot.png' });
      return page;
    }
    // await page.screenshot({ path: 'standardscreenshot.png' });
    return page;
  }
}

module.exports = AEMPageUtilities;
