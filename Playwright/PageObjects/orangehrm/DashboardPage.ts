import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly pimMenu: Locator;
    readonly adminMenu: Locator;
    readonly leaveMenu: Locator;
    readonly myMenu: Locator;
    readonly userProfileDropdown: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pimMenu = page.locator('span:has-text("PIM")');
        this.adminMenu = page.locator('span:has-text("Admin")');
        this.leaveMenu = page.locator('span:has-text("Leave")');
        this.myMenu = page.locator('span:has-text("My")');
        this.userProfileDropdown = page.locator('.oxd-usermenu-button');
        this.logoutLink = page.locator('a:has-text("Logout")');
    }

    async verifyLoaded() {
        await this.page.waitForURL('**/dashboard');
    }

    async navigateToPIM() {
        await this.pimMenu.click();
    }

    async navigateToAdmin() {
        await this.adminMenu.click();
    }

    async navigateToLeave() {
        await this.leaveMenu.click();
    }

    async navigateToMy() {
        await this.myMenu.click();
    }

    async logout() {
        await this.userProfileDropdown.click();
        await this.logoutLink.click();
    }
}
