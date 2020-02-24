class DefaultTestSetup {
  constructor() {
    this.browser = {
      renditions: [
        [{ label: 'SM', browserName: 'chromium', width: 320, height: 480 }],
        [{ label: 'MD', browserName: 'chromium', width: 640, height: 768 }],
        [{ label: 'LG', browserName: 'chromium', width: 1024, height: 768 }],
        [{ label: 'XLG', browserName: 'chromium', width: 1366, height: 1280 }],
        [{ label: 'SM', browserName: 'webkit', width: 320, height: 480 }],
        [{ label: 'MD', browserName: 'webkit', width: 640, height: 768 }],
        [{ label: 'LG', browserName: 'webkit', width: 1024, height: 768 }],
        [{ label: 'XLG', browserName: 'webkit', width: 1366, height: 1280 }],
        [{ label: 'SM', browserName: 'firefox', width: 320, height: 480 }],
        [{ label: 'MD', browserName: 'firefox', width: 640, height: 768 }],
        [{ label: 'LG', browserName: 'firefox', width: 1024, height: 768 }],
        [{ label: 'XLG', browserName: 'firefox', width: 1366, height: 1280 }],
      ],
    };

    this.playwright = {
      context: {
        viewport: {
          width: 1000,
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
