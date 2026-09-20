import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import { LeavePage } from '../../PageObjects/orangehrm/LeavePage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('OrangeHRM Leave Suite', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let leavePage: LeavePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        leavePage = new LeavePage(page);

        await loginPage.goto();
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        await dashboardPage.navigateToLeave();
    });

    test('Navigate to Leave module', async () => {
        await expect(leavePage.page).toHaveURL(/.*leave/);
    });

    test('Apply for leave (Valid request)', async () => {
        await leavePage.applyForLeave('Sick Leave', '2026-10-01', '2026-10-02');
        await expect(leavePage.leaveRequestTable).toBeVisible();
    });

    test('Verify leave balance visibility', async () => {
        await expect(leavePage.page.locator('text=Leave Balance')).toBeVisible();
    });
});
