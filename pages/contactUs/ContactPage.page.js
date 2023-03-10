const { expect } = require('@playwright/test');

exports.ContactPage = class ContactPage {
    constructor(page) {
        this.page = page;
        this.first_name = page.locator('[name=first_name]');
        this.last_name = page.locator('[name=last_name]');
        this.email = page.locator('[name=email]');
        this.message = page.locator('[name=message]');
        this.reset = page.locator("#form_buttons input[type='reset']");
        this.feedback_input = page.$$('.feedback-input');
        this.submit = page.locator("#form_buttons input[type='submit']");
        this.body_inputs = page.textContent('body');
    }

    async enterFirstName(name) {
        await this.first_name.fill(name);
    }
    
    async enterLastName(name) {
        await this.last_name.fill(name);
    }

    async enterEmail(name) {
        await this.email.fill(name);
    }

    async enterMessage(name) {
        await this.message.fill(name);
    }

    async clickReset() {
        await this.reset.click();
    }

    async clickSubmit() {
        await this.submit.click();
    }

    async assertThatFieldsNotEmpty() {
        for (const input of await this.feedback_input) {
            expect(await input.inputValue()).not.toEqual('');
        }
    }

    async assertThatFieldsEmpty() {
        for (const input of await this.feedback_input) {
            expect(await input.inputValue()).toEqual('');
        }
    }

    async assertInputsForErrors(invalidText) {
        const body = await this.page.textContent('body');

        expect(body.trim().split('\n')[0]).not.toEqual('');
        
        for (let j = 0; j < invalidText.length; j++) {
            expect(body.trim().split('\n')[j].trimStart()).toEqual(invalidText[j]);
        }
    }
}