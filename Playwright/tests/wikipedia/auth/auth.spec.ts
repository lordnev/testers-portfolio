import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../../PageObjects/wikipedia/WikipediaPage';

test.describe('Wikipedia Authentication Tests @ui', () => {
  test.describe.configure({ retries: 1 });

  let wikiPage: WikipediaPage;

  test.beforeEach(async ({ page }) => {
    wikiPage = new WikipediaPage(page);
    await wikiPage.goto();
  });

  test('Should navigate to the login page @smoke', async () => {
    await wikiPage.auth.loginLink.click();
    await expect(wikiPage.auth.usernameInput).toBeVisible();
  });

  test('Should show error message for invalid login @negative', async () => {
    await wikiPage.auth.login('wrong_user', 'wrong_pass');
    await expect(wikiPage.auth.errorMessage).toBeVisible();
  });

  test('Should verify login page layout @ui', async () => {
    await wikiPage.auth.loginLink.click();
    await expect(wikiPage.auth.passwordInput).toBeVisible();
    await expect(wikiPage.auth.loginSubmitButton).toBeVisible();
  });

  test('Should handle empty login attempt @negative', async () => {
    await wikiPage.auth.loginLink.click();
    await wikiPage.auth.login('', '');
    await expect(wikiPage.auth.errorMessage).toBeVisible();
  });

  test('Should display login form elements @ui', async () => {
    await wikiPage.auth.loginLink.click();
    await expect(wikiPage.auth.usernameInput).toBeVisible();
    await expect(wikiPage.auth.passwordInput).toBeVisible();
    await expect(wikiPage.auth.loginSubmitButton).toBeVisible();
    await expect(wikiPage.auth.rememberCheckbox).toBeVisible();
  });
});