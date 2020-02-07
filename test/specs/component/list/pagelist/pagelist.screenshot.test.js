const DefaultTestSetup = require('../../../../defaulttest.setup.js');
const timeout = 5000;
const username = require("minimist")(process.argv.slice(2))["username"];

describe(
	'/ (PageList Screenshot)',
	() => {
		let page;
		let browserRenditions = new DefaultTestSetup().browserRenditions;

		let pagePath = "/content/swinburne-site-showcase/en/styleguide/components/page-list.html";

		beforeAll(async () => {
			let browser = await global.__BROWSER__;
			//page = await browser.newPage();
			let context = await browser.newContext();
			page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/')
		}, timeout);

		afterAll(async () => {
			await page.close()
		});

		test.each(browserRenditions.map(browserRenditions => [browserRenditions[0].label, browserRenditions[0]]))(
			'Rendition test for size %s',
			async(label,rendition) => {
				console.log("custom cli param test %s", username);
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