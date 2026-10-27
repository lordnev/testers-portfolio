import { Page, Locator } from '@playwright/test';

export class WikipediaContentPage {
    readonly page: Page;
    readonly articleTitle: Locator;
    readonly imageElements: Locator;
    readonly sideNav: Locator;
    readonly footerLinks: Locator;
    readonly randomArticleLink: Locator;
    readonly contributorsLink: Locator;
    readonly languageList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.articleTitle = page.locator('h1#firstHeading, .mw-headline').first();
        this.imageElements = page.locator('.mw-parser-output img, .central-featured-image img');
        this.sideNav = page.locator('#mw-panel, .vector-main-menu-content').first();
        this.footerLinks = page.locator('ul#footer-info-center li a, #footer-places-list a').first();
        this.randomArticleLink = page.locator('a#mp-pl-random, a[href*="Random"]').first();
        this.contributorsLink = page.locator('a#ca-edit, span.mw-edit-section a').first();
        this.languageList = page.locator('#mw-panel-languages li, .vector-languages').first();
    }

    async clickRandomArticle() {
        await this.randomArticleLink.waitFor({ state: 'visible' });
        await this.randomArticleLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}
