import { expect, test } from '@playwright/test';
import { HomePage, SearchPage } from "../../page-objects";

test.describe('Search suite', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.open()
  });

  test('Perform search', async ({ page }) => {
    await homePage.header.performSearch('bank');
    const linksNumber = await searchPage.getLinksCount();
    await expect(linksNumber).toEqual(2)
  });
});
