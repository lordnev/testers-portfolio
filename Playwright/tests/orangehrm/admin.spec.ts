import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import { AdminPage } from '../../PageObjects/orangehrm/AdminPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('OrangeHRM Admin Suite', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let adminPage: AdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        adminPage = new AdminPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        await dashboardPage.navigateToAdmin();
    });

    test('Admin Navigation', async () => {
        await adminPage.verifyLoaded();
    });

    test('User Search', async () => {
        await adminPage.searchUser('Admin');
        await adminPage.verifyUserExists('Admin');
    });

    test('Search for non-existent user', async () => {
        await adminPage.searchUser('GhostUser123');
        await expect(adminPage.userTable).not.toBeVisible();
    });
});
