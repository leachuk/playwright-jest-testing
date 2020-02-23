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
    // if (typeof this.scheme === 'undefined' || typeof this.hostname === 'undefined' || typeof this.port === 'undefined') {
    //   const scheme = args.scheme;
    //   const hostname = args.hostname;
    //   const port = args.port;
    // } else {
    //   const scheme = this.scheme;
    //   const hostname = this.hostname;
    //   const port = this.port;
    // }
    let host = `${optionsIn.scheme}://${optionsIn.hostname}`;
    if (typeof optionsIn.port !== 'undefined') {
      host = `${optionsIn.scheme}://${optionsIn.hostname}:${optionsIn.port}`;
    }
    return host;
  }

  static setupPath(path, optionsIn) {
    // if (typeof options.setupHostname === 'undefined' || typeof options.isWcmModeDisabled === 'undefined') {
    //   const isWcmModeDisabled = args.isWcmModeDisabled;
    // } else {
    //   const isWcmModeDisabled = this.isWcmModeDisabled;
    // }
    const url = AEMPageUtilities.setupHostname(optionsIn);
    console.log(`optionsIn.isWcmModeDisabled:${optionsIn.isWcmModeDisabled}`);
    if (typeof optionsIn.isWcmModeDisabled !== 'undefined' && optionsIn.isWcmModeDisabled === true) {
      return `${url}${path}?wcmmode=disabled`;
    }
    return `${url}${path}`;
  }

  static async setViewportSize(page, rendition) {
    const bodyHandle = await page.$wait('body');
    const boundingBox = await bodyHandle.boundingBox();
    console.log(`resized width:${Math.max(rendition.width, Math.ceil(boundingBox.width))}, resized height:${Math.max(rendition.height, Math.ceil(boundingBox.height))}`);
    await page.setViewportSize({
      width: rendition.width,
      height: Math.max(rendition.height, Math.ceil(boundingBox.height)),
    });
    return page;
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
    let browserUpdateWithPage = browsers;

    for (const index in browserUpdateWithPage) {
      console.log(`......X:${index}`);
      const context = await browsers[index].browser.newContext();
      // const path = await aemUtils.getPath();
      const page = await context.newPage();
      // console.log(AEMPageUtilities.setupPath(setupPath, optionsIn));
      await page.goto(AEMPageUtilities.setupPath(setupPath, optionsIn));
      console.log(`page.url():${page.url()}`);
      // page.screenshot({ path: 'testingScreenshot.png' });
      // const found = await page.$('text="Welcome to Adobe Experience Manager"');
      if (await AEMPageUtilities.isAemLogin(page)) {
        let loginUrl = '';
        // todo: need to handle authenticating to author instance via form
        // trying with basic auth in the url redirects to the login page
        if (typeof optionsIn.port !== 'undefined') {
          loginUrl = `${optionsIn.scheme}://${optionsIn.hostname}:${optionsIn.port}/libs/granite/core/content/login.html`;
        } else {
          loginUrl = `${optionsIn.scheme}://${optionsIn.hostname}/libs/granite/core/content/login.html`;
        }
        console.log(`loginUrl:${loginUrl}`);
        // const loginPage = await this.context.newPage(loginUrl);
        console.log('got loginPage');
        // await page.screenshot({ path: './preloginscreenshot.png' });
        await page.type('#username', optionsIn.username);
        await page.type('#password', optionsIn.password);
        // await page.screenshot({ path: './pre1loginscreenshot.png' });
        await page.click('#submit-button');
        // await page.waitForNavigation({ waitUntil: 'load' });
        console.log('clicked loginPage');
        // await page.screenshot({ path: './pre2loginscreenshot.png' });
        // await Promise.all([
        //   page.click('#submit-button'),
        //   page.waitForNavigation({ waitUntil: 'load' }),
        //   console.log('clicked loginPage'),
        //   page.screenshot({ path: './pre2loginscreenshot.png' }),
        // ]);
        // await page.screenshot({ path: './pre3loginscreenshot.png' });
        // await page.screenshot({ path: './postloginscreenshot.png' });
        // return page;
      }
      // await page.screenshot({ path: 'standardscreenshot.png' });
      browserUpdateWithPage[index].page = page;
    }
    return browserUpdateWithPage;
  }

  async getPage(browserNameIn) {
    const result = this.browsers.filter((x) => x.browserName === browserNameIn);
    console.log(`getPage(${result[0].browserName})`);
    return result[0].page;
    // this.context = await this.browser[browserName].newContext();
    // // const path = await aemUtils.getPath();
    // const page = await this.context.newPage();
    // await page.goto(this.setupPath());
    // console.log(`page.url():${page.url()}`);
    // // page.screenshot({ path: 'testingScreenshot.png' });
    // // const found = await page.$('text="Welcome to Adobe Experience Manager"');
    // if (await AEMPageUtilities.isAemLogin(page)) {
    //   let loginUrl = '';
    //   // todo: need to handle authenticating to author instance via form
    //   // trying with basic auth in the url redirects to the login page
    //   if (typeof this.port !== 'undefined') {
    //     loginUrl = `${this.scheme}://${this.hostname}:${this.port}/libs/granite/core/content/login.html`;
    //   } else {
    //     loginUrl = `${this.scheme}://${this.hostname}/libs/granite/core/content/login.html`;
    //   }
    //   console.log(`loginUrl:${loginUrl}`);
    //   // const loginPage = await this.context.newPage(loginUrl);
    //   console.log('got loginPage');
    //   // await page.screenshot({ path: './preloginscreenshot.png' });
    //   await page.type('#username', this.username);
    //   await page.type('#password', this.password);
    //   // await page.screenshot({ path: './pre1loginscreenshot.png' });
    //   await page.click('#submit-button');
    //   // await page.waitForNavigation({ waitUntil: 'load' });
    //   console.log('clicked loginPage');
    //   // await page.screenshot({ path: './pre2loginscreenshot.png' });
    //   // await Promise.all([
    //   //   page.click('#submit-button'),
    //   //   page.waitForNavigation({ waitUntil: 'load' }),
    //   //   console.log('clicked loginPage'),
    //   //   page.screenshot({ path: './pre2loginscreenshot.png' }),
    //   // ]);
    //   // await page.screenshot({ path: './pre3loginscreenshot.png' });
    //   console.log(`setupPath:${this.setupPath()}`);
    //   // await page.screenshot({ path: './postloginscreenshot.png' });
    //   // return page;
    // }
    // // await page.screenshot({ path: 'standardscreenshot.png' });
    // return page;
  }
}

module.exports = AEMPageUtilities;
