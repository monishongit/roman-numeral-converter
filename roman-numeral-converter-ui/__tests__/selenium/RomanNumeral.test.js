const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');
const HomePage = require('./pages/HomePage');

const browsers = ['chrome', 'firefox']

browsers.forEach(browser => {
    describe(`${browser} browser tests for Roman Numeral Converter`, function() {
        let driver;
        let homePage;

        // Increase the timeout globally for all tests
        this.timeout(10000);

        before(async function() {
            driver = await new Builder().forBrowser(browser).build();
            homePage = new HomePage(driver);
            // Open the app once before the tests begin
            await homePage.open();
        });

        after(async function() {
            await driver.quit();
        });

        // ============================
        // Initial Load Tests
        // ============================

        it('should have the correct title', async function() {
            await driver.wait(() => driver.executeScript("return document.readyState === 'complete';"), 20000);
            const pageTitle = await homePage.getTitle();
            expect(pageTitle).to.equal('Roman Numeral Converter');
        });

        it('should have the correct heading', async function() {
            const headingText = await homePage.getHeadingText();
            expect(headingText).to.equal('Roman Numeral Converter');
        });

        // ============================
        // Conversion Tests
        // ============================

        it('should convert given number correctly', async function() {
            await homePage.enterNumber('58');
            await homePage.clickConvertButton();
            const resultText = await homePage.getResultText();
            expect(resultText).to.include('Roman numeral: LVIII');
        });

        // ============================
        // Edge Cases (Invalid Input)
        // ============================

        it('should show an error for negative numbers', async function() {
            await homePage.enterNumber('-5');
            await homePage.clickConvertButton();
            const resultText = await homePage.getResultText();
            expect(resultText).to.include('Please enter a number between 1 and 3999.');
        });

        it('should show an error for non-numeric input', async function() {
            await homePage.enterNumber('abc');
            await homePage.clickConvertButton();
            const resultText = await homePage.getResultText();
            expect(resultText).to.include('Please enter a number between 1 and 3999.');
        });

        it('should show an error for numbers greater than 3999', async function() {
            await homePage.enterNumber('4000');
            await homePage.clickConvertButton();
            const resultText = await homePage.getResultText();
            expect(resultText).to.include('Please enter a number between 1 and 3999.');
        });
    });
});
