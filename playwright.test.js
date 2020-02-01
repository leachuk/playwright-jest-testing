const timeout = 5000

describe(
	'/ (Home Page)',
	() => {
		let page;
		beforeAll(async () => {
			let browser = await global.__BROWSER__;
			let context = await browser.newContext({
				viewport: {
					width: 1000,
					height: 600,
					deviceScaleFactor : 1
				}
			});
			page = await context.newPage('https://google.com')
		}, timeout);

		afterAll(async () => {
			await page.close()
		});

		it('should load without error', async () => {
			let text = await page.evaluate(() => document.body.textContent)
			expect(text).toContain('google')
		});

		it('should also load without error', async () => {
			let text = await page.evaluate(() => document.body.textContent)
			expect(text).not.toContain('googlefoo')
		});
	},
	timeout
);