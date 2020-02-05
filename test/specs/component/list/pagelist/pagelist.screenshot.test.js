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

		test('adds 1 + 2 to equal 3', () => {
			console.log(testConfig.browserRenditions[0].label)
			expect(3).toBe(3);
		});

		test.each([testConfig.browserRenditions])(
			'foo=%s, bar=%s, zoo=%s',
			(a,b,c) => {
			console.log('a:%o ,b:%o ,c:%o',a,b,c)
			expect(true).toBe(true)
		},
		timeout
		)
		test.each([[1, 1, 2, {foo: "bar"}]])(
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