import { test, expect, Page } from '@playwright/test';
import { FeedBackPage, HomePage, SendFeedBackPage } from '../../page-objects';

test.describe.configure({ mode: 'serial' });

test.describe.only('Feedback form submit', () => {
  let page: Page;
  let homePage: HomePage;
  let feedbackPage: FeedBackPage;
  let sendFeedBackPage: SendFeedBackPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    feedbackPage = new FeedBackPage(page);
    sendFeedBackPage = new SendFeedBackPage(page);
    await homePage.open();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should navigate to Feedback form', async () => {
    await homePage.navigationBar.switchToTab('Feedback');
    const titleText = await feedbackPage.getTitleText();
    await expect(titleText).toEqual('Feedback');
  });

  test('should fill Feedback form', async () => {
    await feedbackPage.fillFeedbackForm({
      email: 'random@email.com',
      subject: 'test_subject',
      name: 'test-name',
      comment: 'test-comment',
    });
    await feedbackPage.clickSendMessage();
    const isTitleVisible = await sendFeedBackPage.getTitleVisibility();
    await expect(isTitleVisible).toBeTruthy();
  })
});
