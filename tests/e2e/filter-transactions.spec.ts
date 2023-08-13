import { test, expect } from '@playwright/test';

test.describe('filter transactions suite', () => {
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

  test('should change filters and check descriptions', async ({ page }) => {
    await page.goto(
      'http://zero.webappsecurity.com/bank/account-activity.html'
    );
    await page.locator('#aa_accountId').selectOption('4');
    const descriptions = await page.locator(
      '.table-condensed tr td:nth-of-type(2)'
    );
    await expect(descriptions).toHaveText(['RENT', 'RENT']);
  });
});
