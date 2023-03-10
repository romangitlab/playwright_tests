const { expect } = require('@playwright/test');

exports.ContactFormThankYouPage = class ContactFormThankYouPage {
    constructor(page) {
        this.page = page;
        this.text = page.locator('//*[@id="contact_reply"]/h1');
    }

    async assertSuccessfulMessage(message) {
        expect(await this.text.textContent()).not.toEqual('');
        expect(await this.text.textContent()).toEqual(message);
    }
}