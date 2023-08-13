import { Locator, Page } from '@playwright/test';

export class Header {
  readonly rootElem: Locator;
  readonly searchInput: Locator;
  readonly signInButton: Locator;
  readonly userDropdown: Locator;

  constructor(private page: Page) {
    this.rootElem = this.page.locator('.navbar-inner');
    this.searchInput = this.rootElem.locator('#searchTerm');
    this.signInButton = this.rootElem.locator('#signin_button');
    this.userDropdown = this.rootElem.locator(
      `//*[@class='dropdown-toggle' and ./*[@class='icon-user']]`
    );
  }

  public async performSearch(value: string) {
    await this.searchInput.type(value);
    await this.page.keyboard.press('Enter');
  }

  public async clickSignIn() {
    await this.signInButton.click();
  }

  public getUserDropdownText() {
    return this.userDropdown.innerText();
  }
}
