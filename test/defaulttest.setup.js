class DefaultTestSetup {
    constructor() {
        this.playwright = {};
        this.playwright.context = {
            viewport: {
                width: 1000,
                height: 600,
                deviceScaleFactor: 1
            }
        };
    }
    get browserContext() {
        return this.playwright.context;
    }
}

module.exports = DefaultTestSetup;