const fs = require('fs');
const timeout = 5000;

describe(
	'/ (Home Page)',
	() => {
		let page;
		let screenshotDir = './screenshots';
		beforeAll(async () => {
			if (!fs.existsSync(screenshotDir)){
				fs.mkdirSync(screenshotDir);
			}

			let browser = await global.__BROWSER__;
			let context = await browser.newContext({
				viewport: {
					width: 1000,
					height: 600,
					deviceScaleFactor : 1
				}
			});
			page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/')
		}, timeout);

		afterAll(async () => {
			await page.close()
		});

		it('should load without error', async () => {
			const element = await page.$("body > div.l-wrapper.l-wrapper--main > section");
			const image = await element.screenshot({ path: screenshotDir + `/` + `swinburnetest.png` });
			expect(image).toMatchImageSnapshot();//temp force success
		})
	},
	timeout
)