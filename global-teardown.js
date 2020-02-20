/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const chalk = require('chalk');
const rimraf = require('rimraf');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup');

module.exports = async function () {
  console.log(chalk.green('Teardown playwright'));
  const chromiumBrowserApp = await global.__BROWSER_GLOBAL__.chromium;
  const firefoxBrowserApp = await global.__BROWSER_GLOBAL__.firefox;
  const webBrowskiterApp = await global.__BROWSER_GLOBAL__.webkit;
  chromiumBrowserApp.close();
  firefoxBrowserApp.close();
  webBrowskiterApp.close();
  rimraf.sync(DIR);
};
