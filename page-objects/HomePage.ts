import { Page } from '@playwright/test';
import { Header, NavigationBar } from './components';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly header: Header;
  readonly navigationBar: NavigationBar;

  constructor(protected page: Page) {
    super(page, '/index.html');
    this.header = new Header(this.page);
    this.navigationBar = new NavigationBar(this.page);
  }
}
