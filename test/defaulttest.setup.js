class DefaultTestSetup {
    constructor() {
        this.browser = {
            renditions: [
                [{label: "SM", width: 320, height: 480}],
                [{label: "MD", width: 640, height: 768}],
                [{label: "LG", width: 1024, height: 768}],
                [{label: "XLG", width: 1366, height: 1280}]
            ]
        };

        this.playwright = {
            context: {
                viewport: {
                    width: 1000,
                    height: 600,
                    deviceScaleFactor: 1
                }
            }
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
