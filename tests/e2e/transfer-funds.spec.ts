import { expect, Page, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Transfer funds suite', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://zero.webappsecurity.com/index.html');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should login in application', async () => {
    await page.locator('#signin_button').click();
    await expect(page.locator('h3')).toHaveText('Log in to ZeroBank');
    await page.type('#user_login', 'username');
    await page.type('#user_password', 'password');
    await page.locator('.btn-primary', { hasText: 'Sign in' }).click();
    await page.goto('http://zero.webappsecurity.com/index.html');
    const userName = await page.locator(
      '//*[@id="settingsBox"]//a[.//*[@class="icon-user"]]'
    );
    await expect(userName).toContainText('username');
  });

  test('should open transfer funds', async () => {
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    const header = await page.locator('.board-header');
    await expect(header).toHaveText('Transfer Money & Make Payments');
  });

  test('should fill open transfer funds', async () => {
    await page.locator('#tf_fromAccountId').selectOption('2');
    await page.locator('#tf_toAccountId').selectOption('2');
    await page.locator('#tf_amount').type('200');
    await page.locator('#tf_description').type('test_description');
    await page.locator('#btn_submit').click();
    const title = await page.locator('h2');
    await expect(title).toHaveText('Transfer Money & Make Payments - Verify');
  });

  test('should check filled form', async () => {
    const fromAccountId = await page.locator('#tf_fromAccountId');
    const toAccountId = await page.locator('#tf_fromAccountId');
    const amount = await page.locator('#tf_amount');
    const description = await page.locator('#tf_description');
    await expect(fromAccountId).toBeDisabled();
    await expect(toAccountId).toBeDisabled();
    await expect(amount).toBeDisabled();
    await expect(description).toBeDisabled();
    await page.locator('#btn_submit').click();
    await expect(page.locator('.alert.alert-success')).toBeVisible();
  });
});
