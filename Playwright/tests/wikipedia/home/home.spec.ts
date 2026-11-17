import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../../PageObjects/wikipedia/WikipediaPage';
import { WIKIPEDIA_TEST_DATA } from '../../utils/test-data-generators';

test.describe('Wikipedia Home Page Tests @ui', () => {
  test.describe.configure({ retries: 1 });

  let wikiPage: WikipediaPage;

  test.beforeEach(async ({ page }) => {
    wikiPage = new WikipediaPage(page);
    await wikiPage.goto();
  });

  test('Should display the main logo on the home page @smoke', async () => {
    await expect(wikiPage.header.mainLogo).toBeVisible();
  });

  test('Should have the correct page title @smoke', async ({ page }) => {
    await expect(page).toHaveTitle(/Wikipedia/);
  });

  test('Should show language options on the home page @smoke', async () => {
    await expect(wikiPage.content.languageList).not.toBeEmpty();
  });

  test('Should redirect to the main page when clicking the logo @regression', async ({ page }) => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.searchTerms.valid[2]); // Playwright
    await wikiPage.header.mainLogo.click();
    await expect(page).toHaveURL(/wikipedia.org/);
  });

  test('Should verify that the search input is empty initially @ui', async () => {
    await expect(wikiPage.header.searchInput).toHaveValue('');
  });

  test('Should display correct number of languages @regression', async () => {
    const count = await wikiPage.content.languageList.count();
    expect(count).toBeGreaterThan(10); // Wikipedia supports many languages
  });
});