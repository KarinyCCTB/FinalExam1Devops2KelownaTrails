import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js'; 
import { assert } from 'chai';

// Define the timeout for the entire suite in the test
const TEST_TIMEOUT = 120000; // 2 minutes

let driver;

before(async () => {
    const options = new Options();
    options.addArguments('--headless');
    options.addArguments('window-size=1200x600');

    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
});

after(async () => {
    await driver.quit();
});

describe('Kelowna Wine Trails and Tours - Group Discount Functionality', () => {
    const baseUrl = 'http://52.90.60.126/FinalExam1Devops2KelownaTrails/index.html';

    it('should open the website and check the title', async () => {
        // Explicit timeout in Mocha
        this.timeout(TEST_TIMEOUT);

        await driver.get(baseUrl);

        // Wait for an element to be loaded (e.g., the <body> tag)
        await driver.wait(until.elementLocated(By.tagName('body')), 10000); // 10 seconds timeout

        const title = await driver.getTitle();
        console.log('Page title:', title);
        assert.strictEqual(title, 'DevOps Bonus Project - CCTB');
    });
});
