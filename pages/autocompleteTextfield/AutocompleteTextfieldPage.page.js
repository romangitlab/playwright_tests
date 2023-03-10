const { expect } = require('@playwright/test');
const BasePage = require('../basePage.page');

exports.AutocompleteTextfieldPage = class AutocompleteTextfieldPage extends BasePage{
    constructor(page) {
        super(page);
        this.page = page;
    }

    async inputText(text){
        await this.page.locator('#myInput').click();
        await this.page.locator('#myInput').fill(text);

        expect(await this.page.locator('#myInputautocomplete-list')).toBeVisible();
    }

    async selectSuggestionOption(text){
        expect(await this.page.locator('#myInputautocomplete-list')).toBeVisible();

        await this.page.getByText(text).click();
    }

    async assertSelectedOptionToBe(text){
        expect(await this.page.locator("input[type='text']").inputValue()).toStrictEqual(text);
    }

}