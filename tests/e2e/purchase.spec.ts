import { test, expect } from '@playwright/test';

test.describe('purchase test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
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

  test('should purchase foreign currency', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html');
    await page
      .locator('.ui-tabs a[href]', { hasText: 'Purchase Foreign Currency' })
      .click();
    await page.locator('#pc_currency').selectOption('EUR');
    const currencyText = await page.locator('#sp_sell_rate');
    await expect(currencyText).toContainText('1 euro (EUR) =');
    await page.locator('#pc_amount').type('100');
    await page.locator('#pc_inDollars_false').click();
    await page.locator('#pc_calculate_costs').click();
    const amount = await page.locator('#pc_conversion_amount');
    await expect(amount).toContainText('100.00 euro (EUR) =');
    await page.locator('#purchase_cash').click();
    await expect(page.locator('.alert_container')).toContainText(
      'Foreign currency cash was successfully purchased.'
    );
  });
});
