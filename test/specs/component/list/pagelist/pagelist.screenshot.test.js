/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const DefaultTestSetup = require('../../../../DefaultTestSetup');
const AEMPageUtilities = require('../../../../support/AEMPageUtilities');

const timeout = 20000;

describe(
  '/ (PageList Screenshot)',
  () => {
    let page;
    let aemUtils;

    const { browserRenditions } = new DefaultTestSetup();
    const pagePath = '/content/swinburne-site-showcase/en/styleguide/components/page-list.html';

    beforeAll(async () => {
      const browserChromium = await global.__CHROMIUMBROWSER__;
      const browserFirefox = await global.__FIREFOXBROWSER__;
      const browserWebkit = await global.__WEBKITBROWSER__;
      const browsers = [
        { browserName: 'chromium', browser: browserChromium, page: null },
        { browserName: 'firefox', browser: browserFirefox, page: null },
        { browserName: 'webkit', browser: browserWebkit, page: null },
      ];
      const chromeBrowser = [
        { browserName: 'chromium', browser: browserChromium, page: null },
      ];
      const firefoxBrowser = [
        { browserName: 'firefox', browser: browserFirefox, page: null },
      ];

      aemUtils = await new AEMPageUtilities(browsers, pagePath);
      // for (const index in aemUtils.browsers) {
      //   let browser = browsers[index];
      //   console.log(browser);
      // }
    }, timeout);

    afterAll(async () => {
      await aemUtils.closeAllPages();
    });

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Icon in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#social-links';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Default in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_default_links';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Card with Image Tag Title and Action Promoted : default background in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#reference_OXHFFXJJE #pagelist_36a';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Card with Image Tag Title and Action Promoted : default background with charcoal theme in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#reference_1XHFFXJJE #pagelist_36b';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Card with Image Tag Title and Action Promoted : grey background in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#reference_2XHFFXJJE #pagelist_36a';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Card with Image Tag Title and Action Promoted : yellow background in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#reference_4XHFFXJJE #pagelist_36a';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Card with Image Tag Title and Action Promoted : grey background with charcoal theme in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#reference_5XHFFXJJE #pagelist_36b';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Default : Horizontal links in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist37';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Page details with Image, Title, Description and Action in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#contentblock_pagelist_pagedetails_badge_image_title_desc_action_pagelist';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Image, Title, Description and Action : Column in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_column';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Image, Title, Description and Action : Column 3 in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_column_3';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Card with Image, Sub Title, Title, Description and Action in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#contentblock_pagelist_pagedetails_card_background_pagelist';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of 1 notification in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_notification_1';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of 2 notifications in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_notification_2';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of 3 notifications in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_notification_3';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List Testimonial Card with Online Media in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);
        const cssSelector = '#pagelist_testimonial_online_media';

        page = await aemUtils.getPage(browserName);
        const resizedPage = await AEMPageUtilities.setViewportSize(page, rendition);
        // Remove yellow video buttons which cuase test failures due to loading svg animation
        // Attempts to wait for the svg selector were not successful, hence this workaround.
        await page.evaluate((selector) => {
          const elements = document.querySelectorAll(selector);
          for (let i = 0; i < elements.length; i++){
            elements[i].parentNode.removeChild(elements[i]);
          }
        }, '.play-video.btn.btn-primary-yellow');
        const element = await resizedPage.$(cssSelector);
        const image = await element.screenshot();
        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List Testimonial Card with Online Media and Custom Image in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_testimonial_online_media_custom_image';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List with badge Card with Title, Subtitle, Description and Action in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#card_title_subtitle_description_action';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List Testimonial Card with Image in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_testimonial_image';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List Testimonial Card with Subtitle in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_testimonial_text_only';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Page List Testimonial Card without Subtitle in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_testimonial_text_only_without_subtitle';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of Clickable cards with icon and title in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_pagedetails_clickable_card_icon_title';
        const image = await getElementScreenshot(aemUtils, browserName, rendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );

    test.each(browserRenditions.map((data) => [data[0].label, data[0].browserName, data[0]]))(
      'Appearance of cards with action default with arrow in %s for %s',
      async (label, browserName, rendition) => {
        console.log('label:%s ,browser:%s ,height:%i ,width:%i', label, browserName, rendition.height, rendition.width);

        const cssSelector = '#pagelist_action_default_with_arrow';
        const fixedRendition = {
          width: rendition.width,
          height: 20000, // hack to fix the last test. Prevents the element rendering as blank
        };
        const image = await getElementScreenshot(aemUtils, browserName, fixedRendition, cssSelector);

        expect(image).toMatchImageSnapshot();
      },
      timeout,
    );
  },
  timeout,
);
