/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const chalk = require('chalk');
const playwright = require('playwright');
const rimraf = require('rimraf');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DIR = path.join('/Users/stewart.leach', 'jest_playwright_global_setup');

module.exports = async function () {
  console.log(chalk.green('Teardown playwright'));
  const wsEndpointChromium = fs.readFileSync(path.join(DIR, 'wsEndpointChromium'), 'utf8');
  console.log('wsEndpoint:' + wsEndpointChromium);
  const chromiumBrowserApp = await playwright.chromium.connect({ wsEndpoint: wsEndpointChromium });
  // const chromiumBrowserApp = await global.__BROWSER_GLOBAL__.chromium;
  // const firefoxBrowserApp = await global.__BROWSER_GLOBAL__.firefox;
  // const webBrowskiterApp = await global.__BROWSER_GLOBAL__.webkit;
  chromiumBrowserApp.close();
  // firefoxBrowserApp.close();
  // webBrowskiterApp.close();
  //rimraf.sync(DIR);
};
