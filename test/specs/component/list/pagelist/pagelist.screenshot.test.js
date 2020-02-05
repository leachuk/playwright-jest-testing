const DefaultTestSetup = require('../../../../defaulttest.setup.js');
const timeout = 5000;

describe(
	'/ (PageList Screenshot)',
	() => {
		let page;
		let testConfig = new DefaultTestSetup();

		beforeAll(async () => {
			let browser = await global.__BROWSER__;
			//let context = await browser.newContext(testConfig.browserContext);
			//page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/')
		}, timeout);

		afterAll(async () => {
			await page.close()
		});

		test.each(testConfig.browserRenditions)(
			'Rendition Test %s',
			(rendition) => {
			console.log('label:%s ,height:%i ,width:%i',rendition.label,rendition.height,rendition.width)
			expect(true).toBe(true)
		},
		timeout
		);

		test.each([[1, 1, 2, {foo: "bar"}],[3, 3, 6, {foo: "moo"}]])(
			'.add(%i, %i)',
			(a, b, expected, foo) => {
				console.log('a:%i, b:%i, expected:%i, foo:%o',a,b,expected,foo.foo)
				expect(a + b).toBe(expected);
			},
		);

		// it('should load without error', async () => {
		// 	const element = await page.$("body > div.l-wrapper.l-wrapper--main > section");
		// 	const image = await element.screenshot();
		// 	expect(image).toMatchImageSnapshot();
		// })
	},
	timeout
)