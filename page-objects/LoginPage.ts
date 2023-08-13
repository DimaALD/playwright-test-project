import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly rootElem: Locator;
  readonly form: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly alert: Locator;

  constructor(protected page: Page) {
    super(page, '/login.html');
    this.rootElem = this.page.locator('.top_offset .row');
    this.form = this.rootElem.locator('#login_form');
    this.username = this.form.locator('#user_login');
    this.password = this.form.locator('#user_password');
    this.loginBtn = this.form.locator('.btn.btn-primary', {
      hasText: 'Sign in',
    });
    this.alert = this.rootElem.locator('.alert.alert-error');
  }

  public async login(username: string, password: string) {
    await this.username.type(username);
    await this.password.type(password);
    await this.loginBtn.click();
  }

  public getAlertText() {
    return this.alert.innerText();
  }
}
