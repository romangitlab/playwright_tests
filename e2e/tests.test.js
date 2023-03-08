import { test, expect } from '@playwright/test';

test.describe('Contact-Us', () => {
  test('Test 1 - Fill all data, reset, and verify if deletecorrectlyct correctly', async ({ page }) => {
    await page.goto('/Contact-Us/contactus.html');
  
    //Fill inputs
    await page.locator('[name=first_name]').click()
    await page.locator('[name=first_name]').fill('Name')
    await page.locator('[name=last_name]').click()
    await page.locator('[name=last_name]').fill('Last Name')
    await page.locator('[name=email]').click();
    await page.locator('[name=email]').fill('name.last@gmail.com');
    await page.locator('[name=message]').click();
    await page.locator('[name=message]').fill('comment');
  
    //Verify if the data was filled
    for (const input of await page.$$('.feedback-input')) {
      expect(await input.inputValue()).not.toEqual('');
    }
    
    //Click Reset button
    await page.locator(("#form_buttons input[type='reset']")).click();
  
    //Verify if the data was reset
    for (const input of await page.$$('.feedback-input')) {
      expect(await input.inputValue()).toEqual('');
    }
  });
  
  test('Test 2 - Fill few data and try to send - check the error message', async ({ page }) => {
  
    await page.goto('/Contact-Us/contactus.html');
    
    //Fill inputs
    await page.locator('[name=first_name]').click()
    await page.locator('[name=first_name]').fill('Name')
    await page.locator('[name=last_name]').click()
    await page.locator('[name=last_name]').fill('Last Name')
  
    //Click Submit
    await page.locator(("#form_buttons input[type='submit']")).click();
  
    //Get text messages
    const body = await page.textContent('body');
  
    //Check that content is not empty
    expect(body.trim().split('\n')[0]).not.toEqual('');
  
    //Check error messages
    expect(body.trim().split('\n')[0]).toEqual('Error: all fields are required');
    expect(body.trim().split('\n')[1].trimStart()).toEqual('Error: Invalid email address');
  });
  
  test('Test 3 - Put the wrong email and check the message', async ({ page }) => {
  
    await page.goto('/Contact-Us/contactus.html');
    
    //Fill inputs
    await page.locator('[name=first_name]').click()
    await page.locator('[name=first_name]').fill('Name')
    await page.locator('[name=last_name]').click()
    await page.locator('[name=last_name]').fill('Last Name')
    await page.locator('[name=email]').click();
    await page.locator('[name=email]').fill('name.last@');
    await page.locator('[name=message]').click();
    await page.locator('[name=message]').fill('comment');
  
    //Click Submit
    await page.locator(("#form_buttons input[type='submit']")).click();
  
    //Get body content
    const body = await page.textContent('body');
  
    //Check that content is not empty
    expect(body.trim().split('\n')[0]).not.toEqual('');
  
    //Check Invalid email address
    expect(body.trim().split('\n')[0]).toEqual('Error: Invalid email address');
  });
  
  test('Test 4 - Put all data and check the message', async ({ page }) => {
  
    await page.goto('/Contact-Us/contactus.html');
    
    //Fill inputs
    await page.locator('[name=first_name]').click()
    await page.locator('[name=first_name]').fill('Name')
    await page.locator('[name=last_name]').click()
    await page.locator('[name=last_name]').fill('Last Name')
    await page.locator('[name=email]').click();
    await page.locator('[name=email]').fill('name.last@gmail.com');
    await page.locator('[name=message]').click();
    await page.locator('[name=message]').fill('comment');
  
    //Click Submit
    await page.locator(("#form_buttons input[type='submit']")).click();
  
    //Get text
    const text = await page.locator('//*[@id="contact_reply"]/h1');
  
    //Check text
    expect(await text.textContent()).not.toEqual('');
    expect(await text.textContent()).toEqual('Thank You for your Message!');
  });
})

test.describe('Dropdown-Checkboxes-RadioButtons', () => {
  test('Test 5 - Select all possible options in dropdowns and check if they are correct', async ({ page }) => {

    await page.goto('/Dropdown-Checkboxes-RadioButtons/index.html');
    
    //Select dropdown
    const dropdown1 = await page.$('#dropdowm-menu-1');
  
    //Collect all available options
    const availableOptions = await dropdown1.$$('option');
  
    //Select option
    await dropdown1.selectOption({ value: 'python' });
  
    //Check lenght
    expect(availableOptions.length).toBe(4);
  
    //Check selected value
    const selectedValue = await page.$eval('#dropdowm-menu-1', ele => ele.value);
    expect(selectedValue).toMatch('python');
  
    const expectedOptions = [
      'JAVA',
      'C#',
      'Python',
      'SQL'
    ]
  
    //Check list of options
    for (let j = 0; j < expectedOptions.length; j++) {
      expect(expectedOptions[j]).toMatch(await availableOptions[j].innerText());
    }
  });
  
  test('Test 6 - Select all checkboxes, then uncheck 2 and 4 - check if checked/unchecked properly', async ({ page }) => {
  
    await page.goto('/Dropdown-Checkboxes-RadioButtons/index.html');
    
    //Collect all checkboxes
    const checks = await page.$$('#checkboxes input[type="checkbox"]');
  
    //Check selected checkboxes
    for(const check of checks) {
      await check.check();
      expect(await check.isChecked()).toBeTruthy();
    }
  
    //Check 2,4 checkboxes 
    for (let j = 0; j < checks.length; j++) {
      if(j % 2){
        await checks[j].uncheck();
        expect(await checks[j].isChecked()).toBeFalsy();
      }
    }
  });
  
  test('Test 7 - Klick all Radio buttons  and verify after each click if they clicked properly', async ({ page }) => {
  
    await page.goto('/Dropdown-Checkboxes-RadioButtons/index.html');
    
    //Collect all radio buttons
    const radioButtons = await page.$$('#radio-buttons input[type="radio"]');
  
    //Check is checked/unchecked radio button
    for(const radio of radioButtons) {
      expect(await radio.isChecked()).toBeFalsy();
      await radio.check();
      expect(await radio.isChecked()).toBeTruthy();
    }
  });
})

test('Test 8 - Automate page Datepicker - input date and check if it is selected correct', async ({ page }) => {

  await page.goto('/Datepicker/index.html');
  
  //Get current and random day from datapicker
  const todayDay = await page.locator("input[type='text']").inputValue();
  await page.locator("input[type='text']").click()
  await page.locator('tbody tr:nth-child(3) td:nth-child(4)').click()
  const randomDay = await page.locator("input[type='text']").inputValue();

  //Check that current day is changed
  expect(todayDay).not.toBe(randomDay);

  //Select current day
  await page.locator("input[type='text']").click()
  await page.locator('.today.day').click()
  const today = await page.locator("input[type='text']").inputValue();

  //Check current day
  expect(todayDay).toMatch(today);
});


test('Test 9 - Autocomplete TextField - input first three cahacters and select a second item from the list', async ({ page }) => {

  await page.goto('/Autocomplete-TextField/autocomplete-textfield.html');
  
  //Input text 'chi'
  await page.locator('#myInput').click();
  await page.locator('#myInput').fill('chi');
  
  //Check suggestion droplist exists
  expect(await page.locator('#myInputautocomplete-list')).toBeVisible();

  //Get text  for second element and click on it
  const dropDownValue = await page.locator("//div[@id='content-body']//div[2]").innerText();
  await page.locator("//div[@id='content-body']//div[2]").click();
  
  //Check clicked element
  expect(await page.locator("input[type='text']").inputValue()).toStrictEqual(dropDownValue);
});

//describe()
test('Test 10 - Ajax-Loader -  wait until the page load without using static waits and click the button', async ({ page }) => {

  await page.goto('/Ajax-Loader/index.html');

  //Wait and click at button
  await (await page.waitForSelector('#button1')).click();

  //Check modal window - visible
  expect(await page.locator('.modal-content')).toBeVisible();

  //On modal window click - Cancel
  await page.locator('button.btn.btn-default').click();

  //Check modal window - hidden
  expect(await page.locator('.modal-content')).toBeHidden();
});