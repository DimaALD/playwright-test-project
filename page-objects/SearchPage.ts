import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class SearchPage extends BasePage {
  private readonly rootElem: Locator;
  readonly title: Locator;
  readonly links: Locator;

  constructor(protected page: Page) {
    super(page, 'search.html?searchTerm=');
    this.rootElem = this.page.locator('.top_offset');
    this.title = this.rootElem.locator('h2');
    this.links = this.rootElem.locator('ul a[href]');
  }

  public async getSearchPageTitle() {
    await this.title.waitFor({ state: 'visible' });
    return this.title.innerText();
  }

  public async getLinksCount() {
    await this.title.waitFor({ state: 'visible' });
    return this.links.count();
  }
}
