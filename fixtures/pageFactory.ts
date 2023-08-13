import { test as base } from '@playwright/test';
import {
  FeedBackPage,
  HomePage,
  LoginPage,
  SearchPage,
  SendFeedBackPage,
} from '../page-objects';
import { BasePage } from '../page-objects/BasePage';

export const test = base.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  feedbackPage: FeedBackPage;
  searchPage: SearchPage;
  sendFeedbackPage: SendFeedBackPage;
}>({
  homePage: createPo(HomePage),
  loginPage: createPo(LoginPage),
  feedbackPage: createPo(FeedBackPage),
  searchPage: createPo(SearchPage),
  sendFeedbackPage: createPo(SendFeedBackPage),
});

interface IObjectConstructor<T extends BasePage> {
  new (...args: any[]): T;
}

function createPo(pageClass: IObjectConstructor<BasePage>) {
  return async ({ page }, use) => {
    await use(new pageClass(page));
  };
}
