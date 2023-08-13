import { Locator, Page } from '@playwright/test';

export class NavigationBar {
  readonly rootElem: Locator;
  readonly navList: Locator;

  constructor(private page: Page) {
    this.rootElem = this.page.locator('#nav');
    this.navList = this.rootElem.locator('#pages-nav');
  }

  public async switchToTab(tab: 'Home' | 'Feedback' | 'Online Banking') {
    const option = await this.navList
      .locator('li')
      .filter({ hasText: tab.toUpperCase() });
    await option.click();
  }
}
