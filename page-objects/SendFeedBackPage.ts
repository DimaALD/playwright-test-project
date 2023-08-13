import { BasePage } from "./BasePage";
import { ElementHandle, Locator, Page } from "@playwright/test";

export class SendFeedBackPage extends BasePage {

  readonly title: Locator;

  constructor(protected page: Page) {
    super(page, '/sendFeedback.html');
    this.title = this.page.locator('#feedback-title');
  }

  public getTitleVisibility() {
    return this.title.isVisible();
  }
}
