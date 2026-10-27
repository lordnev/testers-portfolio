import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../../PageObjects/wikipedia/WikipediaPage';

let wikiPage: WikipediaPage;

test.beforeEach(async ({ page }) => {
    wikiPage = new WikipediaPage(page);
    await wikiPage.goto();
});

test('Should display the main logo on the home page', async () => {
    await expect(wikiPage.header.mainLogo).toBeVisible();
});

test('Should have the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Wikipedia/);
});

test('Should show language options on the home page', async () => {
    await expect(wikiPage.content.languageList).not.toBeEmpty();
});

test('Should redirect to the main page when clicking the logo', async ({ page }) => {
    await wikiPage.header.searchFor('Playwright');
    await wikiPage.header.mainLogo.click();
    await expect(page).toHaveURL(/wikipedia.org/);
});

test('Should verify that the search input is empty initially', async () => {
    await expect(wikiPage.header.searchInput).toHaveValue('');
});
