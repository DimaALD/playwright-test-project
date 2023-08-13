import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

interface IFeedBack {
  name: string;
  email: string;
  subject: string;
  comment: string;
}

export class FeedBackPage extends BasePage {
  form: Locator;
  nameInput: Locator;
  emailInput: Locator;
  subjectInput: Locator;
  commentInput: Locator;
  sendMessageBtn: Locator;
  title: Locator;

  constructor(protected page: Page) {
    super(page, '/feedback.html');
    this.form = this.page.locator('form[action*=send]');
    this.title = this.page.locator('#feedback-title');
    this.nameInput = this.form.locator('#name');
    this.emailInput = this.form.locator('#email');
    this.subjectInput = this.form.locator('#subject');
    this.commentInput = this.form.locator('#comment');
    this.sendMessageBtn = this.form.locator('.btn-signin.btn.btn-primary');
  }

  public async fillFeedbackForm({
    name,
    subject,
    comment,
    email,
  }: Partial<IFeedBack>) {
    await this.form.waitFor({ state: 'visible' });
    name && (await this.nameInput.type(name));
    email && (await this.emailInput.type(email));
    subject && (await this.subjectInput.type(subject));
    comment && (await this.commentInput.type(comment));
  }

  public async clickSendMessage() {
    await this.sendMessageBtn.click();
  }

  public getTitleText() {
    return this.title.innerText();
  }
}
