/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const { username } = require('minimist')(process.argv.slice(2));
const DefaultTestSetup = require('../../../../DefaultTestSetup');
const AEMPageUtilities = require('../../../../support/AEMPageUtilities');

const timeout = 5000;

describe(
  '/ (PageList Screenshot)',
  () => {
    let page;

    const { browserRenditions } = new DefaultTestSetup();
    const pagePath = '/content/swinburne-site-showcase/en/styleguide/components/page-list.html';
    const aemSelector = '#contentblock4';

    beforeAll(async () => {
      const browser = await global.__BROWSER__;
      const aemUtils = new AEMPageUtilities(browser, pagePath);

      aemUtils.scheme = 'http';
      aemUtils.hostname = 'localhost';
      aemUtils.port = '4502';
      page = await aemUtils.getPage();
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    test.each(browserRenditions.map((data) => [data[0].label, data[0]]))(
      'Rendition test for size %s',
      async (label, rendition) => {
        console.log('custom cli param test %s', username);
        console.log('label:%s ,height:%i ,width:%i', label, rendition.height, rendition.width);
        await page.setViewport({
          width: rendition.width,
          height: rendition.height,
        });

        const element = await page.$(aemSelector);
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );
  },
  timeout,
);
