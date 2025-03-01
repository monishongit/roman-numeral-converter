const { By, until } = require('selenium-webdriver');

class AlivePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:3000/metrics/romannumeral/alive';
    }

    async open() {
        await this.driver.get(this.url);
    }

    async getText() {
        return await this.driver.getPageSource();
    }
}

module.exports = AlivePage;
