const { expect } = require('@playwright/test');
const BasePage = require('../basePage.page');

exports.AjaxLoaderPage = class AjaxLoaderPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async clickAtButton(){
        await (await this.page.waitForSelector('#button1')).click();
    }

    async closeModalWindow(){
        expect(await this.page.locator('.modal-content')).toBeVisible();
        await this.page.locator('button.btn.btn-default').click();
    }
}
