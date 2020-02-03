const chalk = require('chalk');
const { chromium } = require('playwright');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup');

module.exports = async function() {
	console.log(chalk.green('Setup Playwright'));
	const browserApp = await chromium.launchBrowserApp({ webSocket: true });
	// This global is not available inside tests but only in global teardown
	global.__BROWSER_GLOBAL__ = browserApp;
	// Instead, we expose the connection details via file system to be used in tests
	mkdirp.sync(DIR);
	fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browserApp.wsEndpoint());
}