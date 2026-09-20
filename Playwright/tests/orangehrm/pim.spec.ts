import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import { PimPage } from '../../PageObjects/orangehrm/PimPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('OrangeHRM PIM Suite', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let pimPage: PimPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        pimPage = new PimPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        await dashboardPage.navigateToPIM();
    });

    test('Add Employee', async () => {
        const firstName = 'Test';
        const lastName = 'User' + Math.floor(Math.random() * 1000);
        await pimPage.addEmployee(firstName, lastName);
        await expect(pimPage.employeeTable).toBeVisible();
    });

    test('Search Employee', async () => {
        await pimPage.searchEmployee('Admin');
        await pimPage.verifyEmployeeExists('Admin');
    });

    test('Employee List Load', async () => {
        await expect(pimPage.employeeTable).toBeVisible();
    });

    test('Search for non-existent employee', async () => {
        await pimPage.searchEmployee('NonExistentEmployee123');
        await pimPage.verifyNoRecordsFound();
    });

    test('Validate required fields in Add Employee', async ({ page }) => {
        await pimPage.addEmployeeBtn.click();
        await pimPage.saveBtn.click();
        await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
    });

    test('Employee Update', async () => {
        await pimPage.searchEmployee('Admin');
        await pimPage.editEmployeeDetails('Admin', 'UpdatedLastName');
        await expect(pimPage.employeeTable).toBeVisible();
    });

    test('Complex Search', async ({ page }) => {
        await page.goto('**/pim/viewEmployeeList');
        await page.locator('input[placeholder="Employee Name"]').fill('Admin');
        await page.locator('button[type="submit"]').click();
        await pimPage.verifyEmployeeExists('Admin');
    });
});
