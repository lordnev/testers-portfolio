import { Page, Locator } from '@playwright/test';

export class WikipediaHeader {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly mainLogo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('searchbox', { name: /Search/i }).or(page.locator('input[name="search"], input#searchInput').first());
        this.searchButton = page.getByRole('button', { name: /Search/i }).or(page.locator('button[type="submit"], span.pure-button-primary').first());
        this.mainLogo = page.getByRole('link', { name: /Wikipedia/i }).first().or(page.locator('.mw-wiki-logo, .mw-wiki-logo-container, #p-logo, a.mw-wiki-logo').first());
    }

    async searchFor(text: string) {
        await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchInput.fill(text);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }
}
