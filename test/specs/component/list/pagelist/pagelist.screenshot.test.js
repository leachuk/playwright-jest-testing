/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const { username } = require('minimist')(process.argv.slice(2));
const DefaultTestSetup = require('../../../../DefaultTestSetup');

const timeout = 5000;

describe(
  '/ (PageList Screenshot)',
  () => {
    let page;
    let testpage;
    const { browserRenditions } = new DefaultTestSetup();
    const pagePath = '/content/swinburne-site-showcase/en/styleguide/components/page-list.html';
    const fullSwinPath = 'https://www.swinburne.edu.au/study/life/why-choose-swinburne/';
    const swinPath = '/study/life/why-choose-swinburne/';
    //const aemUtils = new AEMPageUtilities(swinPath);

    beforeAll(async () => {
      const browser = await global.__BROWSER__;
      const context = await browser.newContext();
      // const path = await aemUtils.getPath();
      page = await context.newPage('https://www.swinburne.edu.au/study/life/why-choose-swinburne/');

      const aemUtils = global.AEMPageUtils();
      aemUtils.setPage('/foo/bar');
      console.log('AEMUtils getPath(): %s', aemUtils.getPath());
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

        const element = await page.$('body > div.l-wrapper.l-wrapper--main > section');
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
        expect(true).toBe(true);
      },
      timeout,
    );
  },
  timeout,
);
