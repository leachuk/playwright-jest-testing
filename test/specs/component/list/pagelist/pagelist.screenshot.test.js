const testConfig = require('./pagelist.setup.json')
const timeout = 5000;

describe(
	'/ (PageList Screenshot)',
	() => {
		let page;

		beforeAll(async () => {
			let browser = await global.__BROWSER__;
			let context = await browser.newContext(testConfig.context);
			page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/')
		}, timeout);

		afterAll(async () => {
			await page.close()
		});

		it('should load without error', async () => {
			const element = await page.$("body > div.l-wrapper.l-wrapper--main > section");
			const image = await element.screenshot();
			expect(image).toMatchImageSnapshot();//temp force success
		})
	},
	timeout
)