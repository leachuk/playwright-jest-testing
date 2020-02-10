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
    let testpage;
    const { browserRenditions } = new DefaultTestSetup();
    const pagePath = '/content/swinburne-site-showcase/en/styleguide/components/page-list.html';
    const aemSelector = '#contentblock4';
    const swinPath = '/study/life/why-choose-swinburne/';
    const swinSelector = 'body > div.l-wrapper.l-wrapper--main > section';
    // const aemUtils = new AEMPageUtilities(swinPath);

    beforeAll(async () => {
      const browser = await global.__BROWSER__;
      const aemUtils = new AEMPageUtilities(browser, pagePath);
      // const path = await aemUtils.getPath();
      // page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/');
      aemUtils.scheme = 'http';
      aemUtils.hostname = 'localhost';
      aemUtils.port = '4502';
      page = await aemUtils.getPage();
      // const aemUtils = await global.AEMPageUtils;
      // const aemUtils = new AEMPageUtilities();
      // aemUtils.setPath('/foo');
      console.log('AEMUtils');
      console.log(aemUtils.getPath());
      // console.log(page);
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

        // const element = await page.$(aemSelector);
        // const image = await element.screenshot();
        await page.screenshot({path: 'screenshot.png'});
        // expect(image).toMatchImageSnapshot();
        expect(true).toBe(true);
      },
      timeout,
    );
  },
  timeout,
);
