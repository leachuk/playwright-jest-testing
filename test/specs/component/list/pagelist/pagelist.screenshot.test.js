const DefaultTestSetup = require('../../../../defaulttest.setup.js');
const timeout = 5000;

describe(
	'/ (PageList Screenshot)',
	() => {
		let page;
		let testConfig = new DefaultTestSetup().browserRenditions;

		beforeAll(async () => {
			let browser = await global.__BROWSER__;
			//page = await browser.newPage();
			let context = await browser.newContext(testConfig.browserContext);
			page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/')
		}, timeout);

		afterAll(async () => {
			await page.close()
		});

		test.each(testConfig.map(testConfig => [testConfig[0].label, testConfig[0]]))(
			'Rendition test for size %s',
			async(label,rendition) => {
				console.log('label:%s ,height:%i ,width:%i',label,rendition.height,rendition.width);
				await page.setViewport({
					width: rendition.width,
					height: rendition.height
				});

				const element = await page.$("body > div.l-wrapper.l-wrapper--main > section");
				const image = await element.screenshot();
				expect(image).toMatchImageSnapshot();
				expect(true).toBe(true);
			},
		timeout
		);

	},
	timeout
)