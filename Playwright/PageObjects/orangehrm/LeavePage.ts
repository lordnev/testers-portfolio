import { Page, Locator } from '@playwright/test';

export class LeavePage {
    readonly page: Page;
    readonly applyLeaveBtn: Locator;
    readonly leaveTypeDropdown: Locator;
    readonly fromDateInput: Locator;
    readonly toDateInput: Locator;
    readonly saveBtn: Locator;
    readonly leaveRequestTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.applyLeaveBtn = page.locator('button:has-text("Apply")');
        this.leaveTypeDropdown = page.locator('.oxd-select-text');
        this.fromDateInput = page.locator('input[placeholder="Enter start date"]');
        this.toDateInput = page.locator('input[placeholder="Enter end date"]');
        this.saveBtn = page.locator('button[type="submit"]');
        this.leaveRequestTable = page.locator('.oxd-table-card');
    }

    async applyForLeave(type: string, from: string, to: string) {
        await this.applyLeaveBtn.click();
        await this.leaveTypeDropdown.click();
        await this.page.locator(`div:has-text("${type}")`).click();
        await this.fromDateInput.fill(from);
        await this.toDateInput.fill(to);
        await this.saveBtn.click();
    }

    async verifyLeaveBalance(balance: string) {
        await this.page.waitForSelector(`text=${balance}`);
    }
}
