/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node');
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');
const AEMPageUtilities = require('./test/support/AEMPageUtilities');

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup');

class PlaywrightEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }
    const browserApp = await chromium.launchBrowserApp({ webSocket: true });
    const connectOptions = browserApp.connectOptions({
      browserWSEndpoint: wsEndpoint,
    });
    // Use connect options later to establish a connection.
    this.global.__BROWSER__ = await chromium.connect(connectOptions);
    this.global.AEMPageUtils = new AEMPageUtilities();
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'));
    this.global.__BROWSER__.close();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PlaywrightEnvironment;
