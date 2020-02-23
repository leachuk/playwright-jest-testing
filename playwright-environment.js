/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node');
const playwright = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup');

class PlaywrightEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();
    const wsEndpointChromium = fs.readFileSync(path.join(DIR, 'wsEndpointChromium'), 'utf8');
    const wsEndpointFirefox = fs.readFileSync(path.join(DIR, 'wsEndpointFirefox'), 'utf8');
    const wsEndpointWebkit = fs.readFileSync(path.join(DIR, 'wsEndpointWebkit'), 'utf8');
    if (!wsEndpointChromium || !wsEndpointFirefox || !wsEndpointWebkit) {
      throw new Error('wsEndpoint not found');
    }

    // Use connect options later to establish a connection.
    this.global.__CHROMIUMBROWSER__ = await playwright.chromium.connect({ wsEndpoint: wsEndpointChromium });
    this.global.__FIREFOXBROWSER__ = await playwright.firefox.connect({ wsEndpoint: wsEndpointFirefox });
    this.global.__WEBKITBROWSER__ = await playwright.webkit.connect({ wsEndpoint: wsEndpointWebkit });
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'));
    // await this.global.__CHROMIUMBROWSER__.close();
    // console.log('Is still connected?:' + await this.global.__CHROMIUMBROWSER__.isConnected());
    // this.global.__FIREFOXBROWSER__.close();
    // this.global.__WEBKITBROWSER__.close();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PlaywrightEnvironment;
