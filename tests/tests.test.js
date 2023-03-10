import { test, expect } from '@playwright/test';
const { ContactPage } = require('../pages/contactUs/ContactPage.page');
const { ContactFormThankYouPage } = require('../pages/contactUs/ContactFormThankYouPage.page');
const { SelectorsPage } = require('../pages/selectors/SelectorsPage.page');
const { DatepickerPage } = require('../pages/datePicker/DatepickerPage.page');
const { AutocompleteTextfieldPage } = require('../pages/autocompleteTextfield/AutocompleteTextfieldPage.page');
const { AjaxLoaderPage } = require('../pages/ajaxLoader/AjaxLoaderPage.page');

test.describe('Contact-Us @contact-us', () => {
  let contactPage = null;
  let contactFormThankYouPage = null;

  test.beforeEach(async ({ page }) => {
    await page.goto('Contact-Us/contactus.html');
    contactPage = new ContactPage(page);
  });

  test('Test 1 - Fill all data, reset, and verify if deletecorrectlyct correctly', async () => {
    await contactPage.enterFirstName('Name');
    await contactPage.enterLastName('Last Name');
    await contactPage.enterEmail('name.last@gmail.com');
    await contactPage.enterMessage('Comment');
    await contactPage.assertThatFieldsNotEmpty();
    await contactPage.clickReset();
    await contactPage.assertThatFieldsEmpty();
  });
  
  test('Test 2 - Fill few data and try to send - check the error message', async () => {
    await contactPage.enterFirstName('Name');
    await contactPage.enterLastName('Last Name');
    await contactPage.clickSubmit();
    await contactPage.assertInputsForErrors(['Error: all fields are required', 'Error: Invalid email address']);
  });
  
  test('Test 3 - Put the wrong email and check the message', async () => {
    await contactPage.enterFirstName('Name');
    await contactPage.enterLastName('Last Name');
    await contactPage.enterEmail('name.last@');
    await contactPage.enterMessage('Comment');
    await contactPage.clickSubmit();
    await contactPage.assertInputsForErrors(['Error: Invalid email address']);
  });
  
  test('Test 4 - Put all data and check the message', async ({ page }) => {
    contactFormThankYouPage = new ContactFormThankYouPage(page);

    await contactPage.enterFirstName('Name');
    await contactPage.enterLastName('Last Name');
    await contactPage.enterEmail('name.last@gmail.com');
    await contactPage.enterMessage('Comment');
    await contactPage.clickSubmit();
    await contactFormThankYouPage.assertSuccessfulMessage('Thank You for your Message!');
  });
})

test.describe('Dropdown-Checkboxes-RadioButtons @selectors', () => {
  let selectorsPage = null;
  const expectedOptions = [
    'JAVA',
    'C#',
    'Python',
    'SQL'
  ]

  test.beforeEach(async ({ page }) => {
    await page.goto('Dropdown-Checkboxes-RadioButtons/index.html');
    selectorsPage = new SelectorsPage(page);
  });

  test('Test 5 - Select all possible options in dropdowns and check if they are correct', async ({page}) => {
    await selectorsPage.assertDropDownLenghtToBe(4);
    await selectorsPage.assertExpectedDropDownOptions(expectedOptions);
    await selectorsPage.selectDropDownLenghtOption('python');
    await selectorsPage.assertSelectedDropDownOption('python');
  });
  
  test('Test 6 - Select all checkboxes, then uncheck 2 and 4 - check if checked/unchecked properly', async () => {
    await selectorsPage.selectCheckBoxes(['all']);
    await selectorsPage.selectCheckBoxes(['2', '4']);
  });
  
  test('Test 7 - Klick all Radio buttons  and verify after each click if they clicked properly', async () => {
    await selectorsPage.assertThatRadioButtonWasClicked();
  });
})

test('Test 8 - Automate page Datepicker - input date and check if it is selected correct', async ({ page }) => {
  const datepickerPage = new DatepickerPage(page);

  await datepickerPage.navigate('/Datepicker/index.html');
  await datepickerPage.selectAnyDay('15');
  const randomName = (await datepickerPage.getSelectedDay());
  await datepickerPage.selectCurrentDay();
  const currentDay = (await datepickerPage.getSelectedDay());

  expect(randomName).not.toMatch(currentDay);
});


test('Test 9 - Autocomplete TextField - input first three cahacters and select a second item from the list', async ({ page }) => {
  const autocompleteTextfieldPage = new AutocompleteTextfieldPage(page);

  await autocompleteTextfieldPage.navigate('Autocomplete-TextField/autocomplete-textfield.html');
  await autocompleteTextfieldPage.inputText('chi');
  await autocompleteTextfieldPage.selectSuggestionOption('Chips');
  await autocompleteTextfieldPage.assertSelectedOptionToBe('Chips');
});

test('Test 10 - Ajax-Loader -  wait until the page load without using static waits and click the button', async ({ page }) => {
  let ajaxLoaderPage = new AjaxLoaderPage(page);

  await ajaxLoaderPage.navigate('Ajax-Loader/index.html');
  await ajaxLoaderPage.clickAtButton();
  await ajaxLoaderPage.closeModalWindow();
});