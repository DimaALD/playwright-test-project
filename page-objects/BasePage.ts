import { Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected page: Page, protected URL: string) {}

  public async open() {
    await this.page.goto(this.URL);
  }
}
