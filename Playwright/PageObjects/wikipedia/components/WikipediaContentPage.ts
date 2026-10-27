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
        this.articleTitle = page.getByRole('heading', { level: 1 }).or(page.locator('h1#firstHeading, .mw-headline').first());
        this.imageElements = page.locator('.mw-parser-output img, .central-featured-image img');
        this.sideNav = page.getByRole('navigation', { name: /Main menu/i }).or(page.locator('#mw-panel, .vector-main-menu-content').first());
        this.footerLinks = page.locator('footer a').first().or(page.locator('ul#footer-info-center li a, #footer-places-list a').first());
        this.randomArticleLink = page.getByRole('link', { name: /Random/i }).first().or(page.locator('a#mp-pl-random, a[href*="Random"]').first());
        this.contributorsLink = page.getByRole('link', { name: /Edit/i }).first().or(page.locator('a#ca-edit, span.mw-edit-section a').first());
        this.languageList = page.getByRole('list', { name: /Languages/i }).first().or(page.locator('#mw-panel-languages li, .vector-languages').first());
    }

    async ensureMenuOpen() {
        const menuButton = this.page.getByRole('button', { name: /Main menu/i });
        if (await menuButton.isVisible()) {
            await menuButton.click();
            await this.page.waitForTimeout(500);
        }
    }

    async clickRandomArticle() {
        await this.ensureMenuOpen();
        await this.randomArticleLink.waitFor({ state: 'visible' });
        await this.randomArticleLink.click();
        await this.page.waitForLoadState('networkidle');
    }

}
