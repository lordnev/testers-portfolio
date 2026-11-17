import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../../PageObjects/wikipedia/WikipediaPage';
import { WIKIPEDIA_TEST_DATA } from '../../utils/test-data-generators';

test.describe('Wikipedia Content Tests @ui', () => {
  test.describe.configure({ retries: 1 });

  let wikiPage: WikipediaPage;

  test.beforeEach(async ({ page }) => {
    wikiPage = new WikipediaPage(page);
    await wikiPage.goto();
  });

  test('Should find at least one image in a popular article @smoke', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.articles.earth);
    const count = await wikiPage.content.imageElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Should verify that the article "Tesla" contains images @smoke', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.articles.tesla);
    await expect(wikiPage.content.imageElements.first()).toBeVisible();
  });

  test('Should check if side navigation is visible @ui', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.articles.openai);
    await expect(wikiPage.content.sideNav).toBeVisible();
  });

  test('Should verify footer links are present @ui', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.articles.javascript);
    await expect(wikiPage.content.footerLinks.first()).toBeVisible();
  });

  test('Should load a random article @regression', async () => {
    await wikiPage.content.clickRandomArticle();
    await expect(wikiPage.content.articleTitle).toBeVisible();
  });

  test('Should be able to click the edit link on an article @regression', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.articles.javascript);
    await expect(wikiPage.content.contributorsLink).toBeVisible();
  });

  test('Should check if language links are clickable @regression', async ({ page }) => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.articles.python);
    await wikiPage.content.languageList.first().click();
    await expect(page).not.toHaveURL('https://www.wikipedia.org/');
  });

  test('Should verify the page responsiveness (implicit check via visibility) @regression', async () => {
    await expect(wikiPage.header.mainLogo).toBeVisible();
  });

  test('Should verify article structure has headings @regression', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.articles.playwright);
    await expect(wikiPage.content.articleHeadings.first()).toBeVisible();
  });

  test('Should verify table of contents is present @regression', async () => {
    await wikiPage.header.searchFor(WIKIPEDIA_TEST_DATA.articles.typescript);
    await expect(wikiPage.content.tableOfContents).toBeVisible();
  });
});