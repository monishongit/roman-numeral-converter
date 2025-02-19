const { By, until } = require('selenium-webdriver');

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:3000';

        // Theme toggle elements
        this.themeToggleButton = By.id('toggle-btn');

        // Roman numeral conversion elements
        this.formHeading = By.css('h1') 
        this.numberInput = By.id('number-input');
        this.convertButton = By.id('convert-button');
        this.result = By.id('result');
    }

    async open() {
        await this.driver.get(this.url);
    }

    async getTitle() {
        return await this.driver.getTitle();
    }

    async getHeadingText() {
        const heading = await this.driver.wait(until.elementLocated(this.formHeading), 50000);
        return heading.getText();
    }

    async getCurrentTheme() {
        return await this.driver.executeScript(() => {
            return document.documentElement.getAttribute("data-theme");
        });
    }

    async toggleTheme() {
        await this.driver.findElement(this.themeToggleButton).click();
    }

    async enterNumber(number) {
        const inputField = await this.driver.findElement(this.numberInput);
        await inputField.clear()
        // await this.driver.sleep(200);

        // await this.driver.executeScript("arguments[0].value = '';", inputField);

        await inputField.sendKeys(number);
    }

    async clickConvertButton() {
        await this.driver.findElement(this.convertButton).click();
    }

    async getResultText() {
        await this.driver.wait(until.elementLocated(this.result), 50000);
        const resultElement = await this.driver.findElement(this.result);
        return await resultElement.getText();
    }
}

module.exports = HomePage;
