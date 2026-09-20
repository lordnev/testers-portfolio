import { Page, Locator } from '@playwright/test';

export class RecruitmentPage {
    readonly page: Page;
    readonly candidateTable: Locator;
    readonly addCandidateBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly saveBtn: Locator;
    readonly statusDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.candidateTable = page.locator('.oxd-table-card');
        this.addCandidateBtn = page.locator('button:has-text("Add")');
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.emailInput = page.locator('input[name="workEmail"]');
        this.saveBtn = page.locator('button[type="submit"]');
        this.statusDropdown = page.locator('.oxd-select-text');
    }

    async addCandidate(firstName: string, lastName: string, email: string) {
        await this.addCandidateBtn.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.saveBtn.click();
    }

    async updateCandidateStatus(candidateName: string, status: string) {
        await this.page.locator(`.oxd-table-row:has-text("${candidateName}")`).locator('button').first().click();
        await this.statusDropdown.click();
        await this.page.locator(`div:has-text("${status}")`).click();
        await this.page.locator('button[type="submit"]').click();
    }
}
