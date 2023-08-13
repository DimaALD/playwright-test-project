import { expect, test } from '@playwright/test';
import { HomePage, LoginPage } from '../../page-objects';

test.describe.parallel('login flow test suite', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('Negative scenario for login', async () => {
    await homePage.header.clickSignIn();
    await loginPage.login('invalid_username', 'invalid_password');
    await expect(await loginPage.getAlertText()).toEqual(
      'Login and/or password are wrong.'
    );
  });
 
  test('Positive scenario for login + logout', async () => {
    await homePage.header.clickSignIn();
    await loginPage.login('username', 'password');
    await homePage.open();
    const text = await homePage.header.getUserDropdownText();
    await expect(text).toContain('username');
  })

});
