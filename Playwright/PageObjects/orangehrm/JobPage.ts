import { Page, Locator } from '@playwright/test';

export class JobPage {
    readonly page: Page;
    readonly jobTable: Locator;
    readonly addJobBtn: Locator;
    readonly jobTitleInput: Locator;
    readonly descriptionInput: Locator;
    readonly saveBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.jobTable = page.locator('.oxd-table-card');
        this.addJobBtn = page.locator('button:has-text("Add")');
        this.jobTitleInput = page.locator('input[name="jobTitle"]');
        this.descriptionInput = page.locator('textarea[name="description"]');
        this.saveBtn = page.locator('button[type="submit"]');
    }

    async addJobVacancy(title: string, description: string) {
        await this.addJobBtn.click();
        await this.jobTitleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.saveBtn.click();
    }

    async verifyJobExists(title: string) {
        await this.page.waitForSelector(`.oxd-table-cell:has-text("${title}")`);
    }
}
