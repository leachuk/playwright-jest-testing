const playwright = require('playwright');
const fs = require('fs');

var screenshotDir = './screenshots';

if (!fs.existsSync(screenshotDir)){
	fs.mkdirSync(screenshotDir);
}

(async () => {
	for (const browserType of ['chromium', 'firefox', 'webkit']) {
		const browser = await playwright[browserType].launch();
		const context = await browser.newContext();
		const page = await context.newPage('http://whatsmyuseragent.org/');

		await page.screenshot({ path: screenshotDir + `/` + `example-${browserType}.png` });
		await browser.close();
	}
})();