import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js'; 
import { assert } from 'chai';

let driver;

before(async function () {
    const options = new Options();
    options.addArguments('--headless');
    options.addArguments('window-size=1200x600');

    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
});

after(async function () {
    await driver.quit();
});

describe('Kelowna Wine Trails and Tours - Group Discount Functionality', () => {
    const baseUrl = 'http://34.228.37.70/FinalExam1Devops2KelownaTrails/index.html';

    it('should open the website and check the title', async function () {
        await driver.get(baseUrl);

        // Wait until the body tag is rendered to ensure the page has loaded
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);

        // Get the title of the page
        const title = await driver.getTitle();
        console.log('Page title:', title);

        // Assert the title of the page
        assert.strictEqual(title, 'DevOps Bonus Project - CCTB');
    });
});
