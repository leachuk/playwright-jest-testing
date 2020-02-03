const chalk = require('chalk');
const rimraf = require('rimraf');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup');

module.exports = async function() {
	console.log(chalk.green('Teardown playwright'));
	const browserApp = await global.__BROWSER_GLOBAL__;
	browserApp.close();
	rimraf.sync(DIR)
}