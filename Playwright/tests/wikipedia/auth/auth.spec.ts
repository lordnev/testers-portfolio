import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../../PageObjects/wikipedia/WikipediaPage';

let wikiPage: WikipediaPage;

test.beforeEach(async ({ page }) => {
    wikiPage = new WikipediaPage(page);
    await wikiPage.goto();
});

test('Should navigate to the login page', async () => {
    await wikiPage.auth.loginLink.click();
    await expect(wikiPage.auth.usernameInput).toBeVisible();
});

test('Should show error message for invalid login', async () => {
    await wikiPage.auth.login('wrong_user', 'wrong_pass');
    await expect(wikiPage.auth.errorMessage).toBeVisible();
});

test('Should verify login page layout', async () => {
    await wikiPage.auth.loginLink.click();
    await expect(wikiPage.auth.passwordInput).toBeVisible();
    await expect(wikiPage.auth.loginSubmitButton).toBeVisible();
});
