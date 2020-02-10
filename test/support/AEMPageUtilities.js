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
    let url = this.setupHostname();
    if (typeof this.isWcmModeDisabled !== 'undefined' && this.isWcmModeDisabled === true) {
      url = `${url}?wcmmode=disabled`;
    }
    return `${url}${this.path}`;
  }

  async getPage() {
    if (typeof this.isAuthor !== 'undefined' && this.isAuthor === true) {
      console.log('handle AEM login');

      let loginUrl = '';
      // todo: need to handle authenticating to author instance via form
      // trying with basic auth in the url redirects to the login page
      if (typeof this.port !== 'undefined') {
        loginUrl = `${this.scheme}://${this.hostname}:${this.port}/libs/granite/core/content/login.html`;
      } else {
        loginUrl = `${this.scheme}://${this.hostname}/libs/granite/core/content/login.html`;
      }
      const loginPage = await this.context.newPage(loginUrl);
      await loginPage.type('#username', this.username);
      await loginPage.type('#password', this.password);
      await loginPage.click('submit-button');
    }

    this.context = await this.browser.newContext();
    // const path = await aemUtils.getPath();
    const page = await this.context.newPage(this.setupPath());
    // const found = await page.$('text="Welcome to Adobe Experience Manager"');
    const found = await page.content();
    await page.screenshot({ path: 'loginscreenshot.png' });
    console.log('found %s', found.includes('QUICKSTART_HOMEPAGE'));

    return page;
  }
}

module.exports = AEMPageUtilities;
