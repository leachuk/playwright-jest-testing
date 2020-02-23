/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const chalk = require('chalk');
const rimraf = require('rimraf');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DIR = path.join('/Users/stewartleach', 'jest_playwright_global_setup');

module.exports = async () => {
  console.log(chalk.green('Teardown playwright'));
  const chromiumBrowserApp = await global.__BROWSER_GLOBAL__.chromium;
  // const firefoxBrowserApp = await global.__BROWSER_GLOBAL__.firefox;
  // const webBrowskiterApp = await global.__BROWSER_GLOBAL__.webkit;
  chromiumBrowserApp.close();
  // firefoxBrowserApp.close();
  // webBrowskiterApp.close();
  rimraf.sync(DIR);
};
