const BasePage = require('../basePage.page');

exports.DatepickerPage = class DatepickerPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async getSelectedDay() {
        return await this.page.locator("input[type='text']").inputValue();
    }

    async selectAnyDay(day) {
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('cell', { name: day }).click();
    }

    async selectCurrentDay(day) {
        await this.page.getByRole('textbox').click();
        await this.page.locator('.today.day').click()
    }
}