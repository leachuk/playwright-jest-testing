const playwright = require('playwright');
const fs = require('fs');

var screenshotDir = './screenshots';

if (!fs.existsSync(screenshotDir)){
	fs.mkdirSync(screenshotDir);
}

(async () => {
	for (const browserType of ['chromium', 'firefox', 'webkit']) {
		const browser = await playwright[browserType].launch();
		//set deviceScaleFactor = 2 to capture highres screenshot if mac display emulation is required.
		const context = await browser.newContext({
			viewport: {
				width: 1000,
				height: 600,
				deviceScaleFactor : 1
			}
		});
		const page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/');
		const element = await page.$("body > div.l-wrapper.l-wrapper--main > section");

		await element.screenshot({ path: screenshotDir + `/` + `example-${browserType}.png` });
		await browser.close();
	}
})();