const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');
const AlivePage = require('./pages/AlivePage');

const browsers = ['chrome', 'firefox']

browsers.forEach(browser => {
    describe(`${browser} browser tests for Roman Numeral Converter`, function() {
        let driver;
        let alivePage;

        this.timeout(30000);

        before(async function() {
            driver = await new Builder().forBrowser(browser).build();
            alivePage = new AlivePage(driver);
            // Open the app once before the tests begin
            await alivePage.open();
        });

        after(async function() {
            await driver.quit();
        });

        it('should have the correct health metrics', async function() {
            const text = await alivePage.getText();
            expect(text).to.include('rnc_ui_health_status');
            expect(text).to.include('rnc_ui_health_status');
        });
    });
});
