import { Page, Locator } from '@playwright/test';

export class PimPage {
    readonly page: Page;
    readonly addEmployeeBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly saveBtn: Locator;
    readonly employeeNameInput: Locator;
    readonly searchBtn: Locator;
    readonly employeeTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addEmployeeBtn = page.locator('button:has-text("Add")');
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.saveBtn = page.locator('button[type="submit"]');
        this.employeeNameInput = page.locator('input[placeholder="Employee Name"]');
        this.searchBtn = page.locator('button[type="submit"]');
        this.employeeTable = page.locator('.oxd-table-card');
    }

    async addEmployee(firstName: string, lastName: string) {
        await this.addEmployeeBtn.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.saveBtn.click();
    }

    async searchEmployee(name: string) {
        await this.page.goto('**/pim/viewEmployeeList');
        await this.employeeNameInput.fill(name);
        await this.searchBtn.click();
    }

    async verifyNoRecordsFound() {
        await this.page.waitForSelector('text=No Records Found');
    }

    async editEmployeeDetails(name: string, newLastName: string) {
        await this.searchEmployee(name);
        await this.page.locator(`.oxd-table-row:has-text("${name}")`).locator('button').first().click();
        await this.page.locator('button:has-text("Edit")').click();
        await this.lastNameInput.fill(newLastName);
        await this.saveBtn.click();
    }

    async verifyEmployeeExists(name: string) {
        await this.page.waitForSelector(`.oxd-table-cell:has-text("${name}")`);
    }


}
