const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chai = require('chai');
const assert = chai.assert;

let driver;

// Start browser before each test
before(async () => {
    const options = new firefox.Options();
    options.addArguments('-headless');
    options.addArguments('window-size=1200x600'); // Set window size for headless mode

    driver = await new Builder()
        .forBrowser('firefox')
        .setChromeOptions(options)
        .build();
});

after(async () => {
    await driver.quit();
});

describe('Kelowna Wine Trails and Tours - Group Discount Functionality', () => {
    const baseUrl = 'http://52.90.60.126';

    it('should open the website and check the title', async () => {
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        assert.strictEqual(title, 'DevOps Bonus Project - CCTB');
    });
});
