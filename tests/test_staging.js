import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js'; 
import { assert } from 'chai'; 

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
    const baseUrl = 'http://3.95.168.9';

    it('should open the website and check the title', async () => {
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        assert.strictEqual(title, 'DevOps Bonus Project - CCTB');
    });
});
