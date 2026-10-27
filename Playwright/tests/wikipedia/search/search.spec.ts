import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../../PageObjects/wikipedia/WikipediaPage';

let wikiPage: WikipediaPage;

test.beforeEach(async ({ page }) => {
    wikiPage = new WikipediaPage(page);
    await wikiPage.goto();
});

test('Should search for a valid term and display the article', async () => {
    await wikiPage.header.searchFor('OpenAI');
    await expect(wikiPage.content.articleTitle).toContainText('OpenAI');
});

test('Should handle search for a non-existent term', async () => {
    await wikiPage.header.searchFor('ThisIsSomeRandomText123456789');
    await expect(wikiPage.content.articleTitle).toContainText('Search results');
});

test('Should display a result when searching for "Playwright"', async () => {
    await wikiPage.header.searchFor('Playwright');
    await expect(wikiPage.content.articleTitle).toBeVisible();
});

test('Should be able to navigate back to home from an article', async ({ page }) => {
    await wikiPage.header.searchFor('TypeScript');
    await wikiPage.header.mainLogo.click();
    await expect(page).toHaveURL(/wikipedia.org/);
});
