const { expect } = require('@playwright/test');

exports.SelectorsPage = class SelectorsPage {
    constructor(page) {
        this.page = page;
        this.text = page.locator('//*[@id="contact_reply"]/h1');
        this.dropdown = '#dropdowm-menu-1';
        this.availableOptions = 'option';
    }

    async assertSelectedCheckBoxes() {
        for(const check of await this.checks) {
            await check.check();

            expect(await check.isChecked()).toBeTruthy();
          }
    }

    async selectCheckBoxes(values) {
        const checkboxes = await this.page.$$('#checkboxes input[type="checkbox"]');

        if(values[0]=='all'){
            for(const check of await checkboxes) {
                await check.check();
    
                expect(await check.isChecked()).toBeTruthy();
            }
        } else {
            for (let i = 0; i < await values.length; i++) {
                for (let j = 0; j < await checkboxes.length; j++) {
                    if(values[i]==j+1) {
                        await checkboxes[j].uncheck();

                        expect(await checkboxes[j].isChecked()).toBeFalsy();
                    }
                }
            }
        }
    }

    async assertThatRadioButtonWasClicked(values) {
        const radioButtons = await this.page.$$('#radio-buttons input[type="radio"]');

        for(const radio of radioButtons) {
            expect(await radio.isChecked()).toBeFalsy();
            await radio.check();
            expect(await radio.isChecked()).toBeTruthy();
        }
    }

    async selectDropDownLenghtOption(text) {
        const dropdown = await this.page.$(this.dropdown);
        await dropdown.selectOption({ value: text });
    }

    async assertDropDownLenghtToBe(lenght) {
        //to fix
        const dropdown1 = await this.page.$(this.dropdown);
        const availableOption = await dropdown1.$$(this.availableOptions);

        expect(availableOption.length).toBe(lenght);
    }

    async assertSelectedDropDownOption(text) {
        const selectedValue = await this.page.$eval(this.dropdown, ele => ele.value);

        expect(selectedValue).toMatch(text);
    }

    async assertExpectedDropDownOptions(expectedOptions) {
        //to fix
        const dropdown1 = await this.page.$(this.dropdown);
        const availableOptions = await dropdown1.$$(this.availableOptions);

        for (let j = 0; j < expectedOptions.length; j++) {
        expect(expectedOptions[j]).toMatch(await availableOptions[j].innerText());
        }
    }
}