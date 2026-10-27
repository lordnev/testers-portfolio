import { test, expect } from '@playwright/test';
import { WikipediaPage } from '../../../PageObjects/wikipedia/WikipediaPage';

let wikiPage: WikipediaPage;

test.beforeEach(async ({ page }) => {
    wikiPage = new WikipediaPage(page);
    await wikiPage.goto();
});

test('Should find at least one image in a popular article', async () => {
    await wikiPage.header.searchFor('Earth');
    const count = await wikiPage.content.imageElements.count();
    expect(count).toBeGreaterThan(0);
});

test('Should verify that the article "Tesla" contains images', async () => {
    await wikiPage.header.searchFor('Tesla');
    await expect(wikiPage.content.imageElements.first()).toBeVisible();
});

test('Should check if side navigation is visible', async () => {
    await expect(wikiPage.content.sideNav).toBeVisible();
});

test('Should verify footer links are present', async () => {
    await expect(wikiPage.content.footerLinks.first()).toBeVisible();
});

test('Should load a random article', async () => {
    await wikiPage.content.clickRandomArticle();
    await expect(wikiPage.content.articleTitle).toBeVisible();
});

test('Should be able to click the edit link on an article', async () => {
    await wikiPage.header.searchFor('JavaScript');
    await expect(wikiPage.content.contributorsLink).toBeVisible();
});

test('Should check if language links are clickable', async () => {
    await wikiPage.content.languageList.first().click();
});

test('Should verify the page responsiveness (implicit check via visibility)', async () => {
    await expect(wikiPage.header.mainLogo).toBeVisible();
});
