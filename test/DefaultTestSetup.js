class DefaultTestSetup {
  constructor() {
    this.browser = {
      renditions: [
        [{ label: 'SM', browserName: 'chromium', width: 320, height: 480 }],
        [{ label: 'MD', browserName: 'chromium', width: 640, height: 768 }],
        [{ label: 'LG', browserName: 'chromium', width: 1024, height: 768 }],
        [{ label: 'XLG', browserName: 'chromium', width: 1366, height: 1280 }],
      ],
    };

    this.playwright = {
      context: {
        viewport: {
          width: 400,
          height: 600,
          deviceScaleFactor: 1,
        },
      },
    };
  }

  get browserContext() {
    return this.playwright.context;
  }

  get browserRenditions() {
    return this.browser.renditions;
  }
}

module.exports = DefaultTestSetup;
