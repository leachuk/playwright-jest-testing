/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const chalk = require('chalk');
const playwright = require('playwright');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const DIR = path.join('/Users/stewart.leach', 'jest_playwright_global_setup');

module.exports = async () => {
  console.log(chalk.green('Setup Playwright'));
  // const browserApp = await chromium.launchBrowserApp({ webSocket: true });
  const chromiumBrowserApp = await playwright.chromium.launchServer();
  // const firefoxBrowserApp = await playwright.firefox.launchBrowserApp({ webSocket: true });
  // const webkitBrowserApp = await playwright.webkit.launchBrowserApp({ webSocket: true });
  // This global is not available inside tests but only in global teardown
  // global.__BROWSER_GLOBAL__ = browserApp;
  // global.__BROWSER_GLOBAL__ = {};
  // global.__BROWSER_GLOBAL__.chromium = chromiumBrowserApp;
  // global.__BROWSER_GLOBAL__.firefox = firefoxBrowserApp;
  // global.__BROWSER_GLOBAL__.webkit = webkitBrowserApp;
  // Instead, we expose the connection details via file system to be used in tests
  mkdirp.sync(DIR);
  console.log('wsEnpointChromium:'+ chromiumBrowserApp.wsEndpoint());
  fs.writeFileSync(path.join(DIR, 'wsEndpointChromium'), chromiumBrowserApp.wsEndpoint());
  // fs.writeFileSync(path.join(DIR, 'wsEndpointFirefox'), firefoxBrowserApp.wsEndpoint());
  // fs.writeFileSync(path.join(DIR, 'wsEndpoint'), webkitBrowserApp.wsEndpoint());
};
