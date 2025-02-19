const { Builder, until } = require('selenium-webdriver');
const { expect } = require('chai');
const HomePage = require('./pages/HomePage'); // Import HomePage object

const browsers = ['firefox', 'chrome',] // Test across multiple browsers

browsers.forEach(browser => {
    describe(`${browser} Browser Tests for Theme Toggle`, function() {
        let driver;
        let homePage;

        // Extended timeout for stability
        this.timeout(30000);

        before(async function() {
            driver = await new Builder().forBrowser(browser).build();
            homePage = new HomePage(driver);
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

         // ============================
        // Theme Specific Tests
        // ============================


        it('should initially load with the light theme', async function() {
            await driver.wait(until.titleContains("Roman Numeral Converter"), 30000);
            const currentTheme = await homePage.getCurrentTheme();
            expect(currentTheme).to.equal('light'); // Default should be light mode
        });

        it('should toggle to dark theme after clicking the toggle button', async function() {
            await homePage.toggleTheme();
            const currentTheme = await homePage.getCurrentTheme();
            expect(currentTheme).to.equal('dark');
        });

        it('should toggle back to light theme after clicking the toggle button again', async function() {
            await homePage.toggleTheme();
            const currentTheme = await homePage.getCurrentTheme();
            expect(currentTheme).to.equal('light');
        });

        it('should persist the theme after a page refresh', async function() {
            await homePage.toggleTheme();
            driver.navigate().refresh()
            await driver.wait(() => driver.executeScript("return document.readyState === 'complete';"), 5000);
            const currentTheme = await homePage.getCurrentTheme();
            expect(currentTheme).to.equal('dark'); // Ensure persistence after refresh
        });
    });
});