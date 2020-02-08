/* eslint-disable no-undef */
const fs = require('fs');

const timeout = 5000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    const screenshotDir = './screenshots';
    beforeAll(async () => {
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      const browser = await global.__BROWSER__;
      const context = await browser.newContext({
        viewport: {
          width: 1000,
          height: 600,
          deviceScaleFactor: 1,
        },
      });
      page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/');
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    it('should load without error', async () => {
      const element = await page.$('body > div.l-wrapper.l-wrapper--main > section');
      const image = await element.screenshot({ path: `${screenshotDir}/` + 'swinburnetest.png' });
      expect(image).toMatchImageSnapshot();// temp force success
    });
  },
  timeout,
);
