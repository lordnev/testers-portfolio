import { Page } from '@playwright/test';
import { WikipediaHeader } from './components/WikipediaHeader';
import { WikipediaAuthPage } from './components/WikipediaAuthPage';
import { WikipediaContentPage } from './components/WikipediaContentPage';

export class WikipediaPage {
    readonly page: Page;
    readonly header: WikipediaHeader;
    readonly auth: WikipediaAuthPage;
    readonly content: WikipediaContentPage;

    constructor(page: Page) {
        this.page = page;
        this.header = new WikipediaHeader(page);
        this.auth = new WikipediaAuthPage(page);
        this.content = new WikipediaContentPage(page);
    }

    async goto() {
        await this.page.goto('https://www.wikipedia.org/');
    }
}
