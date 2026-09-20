import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('OrangeHRM Auth Suite', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto();
    });

    test('Successful Login', async () => {
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        await dashboardPage.verifyLoaded();
    });

    test('Invalid Login - Wrong Password', async () => {
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, 'WrongPassword123');
        await loginPage.verifyErrorMessage();
    });

    test('Invalid Login - Non-existent User', async () => {
        await loginPage.login('NonExistentUser', 'admin123');
        await loginPage.verifyErrorMessage();
    });

    test('Empty Credentials Login', async () => {
        await loginPage.login('', '');
        await loginPage.verifyErrorMessage();
    });

    test('Logout Process', async () => {
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        await dashboardPage.logout();
        await expect(loginPage.page).toHaveURL(/.*auth\/login/);
    });
});
