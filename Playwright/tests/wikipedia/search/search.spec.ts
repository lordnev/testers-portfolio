import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../../PageObjects/wikipedia/WikipediaPage';
import { WIKIPEDIA_TEST_DATA } from '../../utils/test-data-generators';

test.describe('Wikipedia Search Tests @ui', () => {
  test.describe.configure({ retries: 1 });

  let wikiPage: WikipediaPage;

  test.beforeEach(async ({ page }) => {
    wikiPage = new WikipediaPage(page);
    await wikiPage.goto();
  });

  test('Should search for a valid term and display the article @smoke', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.searchTerms.valid[0]); // OpenAI
    await expect(wikiPage.content.articleTitle).toContainText('OpenAI');
  });

  test('Should handle search for a non-existent term @negative', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.searchTerms.invalid[0]);
    await expect(wikiPage.content.articleTitle).toContainText('Search results');
  });

  test('Should display a result when searching for "Playwright" @smoke', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.searchTerms.valid[1]); // Playwright
    await expect(wikiPage.content.articleTitle).toBeVisible();
  });

  test('Should be able to navigate back to home from an article @regression', async ({ page }) => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.searchTerms.valid[3]); // TypeScript
    await wikiPage.header.mainLogo.click();
    await expect(page).toHaveURL(/wikipedia.org/);
  });

  test('Should search for special characters @regression', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.searchTerms.special[0]); // C++
    await expect(wikiPage.content.articleTitle).toBeVisible();
  });

  test('Should handle empty search gracefully @negative', async ({ page }) => {
    await wikiPage.header.searchInput.press('Enter');
    await expect(page).toHaveURL(/wikipedia.org/);
  });

  test('Should display search suggestions @regression', async ({ page }) => {
    await wikiPage.header.searchInput.fill('Play');
    await expect(wikiPage.header.searchSuggestions).toBeVisible({ timeout: 5000 });
  });

  for (const term of WIKIPEDIA_TEST_DATA.searchTerms.valid) {
    test(`Search for "${term}" and verify article loads @data-driven`, async () => {
      await wikiPage.header.searchFor(term);
      await expect(wikiPage.content.articleTitle).toBeVisible({ timeout: 10000 });
    });
  }
});