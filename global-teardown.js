/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const chalk = require('chalk');
const rimraf = require('rimraf');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup');

module.exports = async () => {
  console.log(chalk.green('Teardown playwright'));
  const chromiumBrowserApp = await global.__BROWSER_GLOBAL__.chromium;
  const firefoxBrowserApp = await global.__BROWSER_GLOBAL__.firefox;
  const webkitBrowserApp = await global.__BROWSER_GLOBAL__.webkit;

  await chromiumBrowserApp.close();
  await firefoxBrowserApp.close();
  await webkitBrowserApp.close();

  rimraf.sync(DIR);
};
