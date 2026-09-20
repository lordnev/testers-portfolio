import { Page, Locator } from '@playwright/test';

export class PerformancePage {
    readonly page: Page;
    readonly addReviewBtn: Locator;
    readonly employeeDropdown: Locator;
    readonly ratingDropdown: Locator;
    readonly saveBtn: Locator;
    readonly reviewTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addReviewBtn = page.locator('button:has-text("Add")');
        this.employeeDropdown = page.locator('div[role="combobox"]');
        this.ratingDropdown = page.locator('.oxd-select-text');
        this.saveBtn = page.locator('button[type="submit"]');
        this.reviewTable = page.locator('.oxd-table-card');
    }

    async addReview(employeeName: string, rating: string) {
        await this.addReviewBtn.click();
        await this.employeeDropdown.click();
        await this.page.locator(`div:has-text("${employeeName}")`).click();
        await this.ratingDropdown.click();
        await this.page.locator(`div:has-text("${rating}")`).click();
        await this.saveBtn.click();
    }

    async verifyReviewLoaded() {
        await this.reviewTable.waitFor({ state: 'visible' });
    }
}
