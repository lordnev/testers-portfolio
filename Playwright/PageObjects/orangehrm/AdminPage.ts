import { Page, Locator } from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    readonly searchUsernameInput: Locator;
    readonly searchBtn: Locator;
    readonly userTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchUsernameInput = page.locator('input[placeholder="Username"]');
        this.searchBtn = page.locator('button[type="submit"]');
        this.userTable = page.locator('.oxd-table-card');
    }

    async verifyLoaded() {
        await this.page.waitForURL('**/admin/viewUsers');
    }

    async searchUser(username: string) {
        await this.searchUsernameInput.fill(username);
        await this.searchBtn.click();
    }

    async verifyUserExists(username: string) {
        await this.page.waitForSelector(`.oxd-table-cell:has-text("${username}")`);
    }

    async createNewUser(username: string, password: string) {
        await this.page.locator('button:has-text("Add")').click();
        await this.page.locator('input[name="username"]').fill(username);
        await this.page.locator('input[name="password"]').fill(password);
        await this.page.locator('input[name="confirmPassword"]').fill(password);
        await this.page.locator('button[type="submit"]').click();
    }

}
