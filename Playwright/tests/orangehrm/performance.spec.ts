import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import { PerformancePage } from '../../PageObjects/orangehrm/PerformancePage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('OrangeHRM Performance Suite', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let performancePage: PerformancePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        performancePage = new PerformancePage(page);

        await loginPage.goto();
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        // Using raw navigation as DashboardPage doesn't have navigateToPerformance yet
        await page.goto('**/performance/viewPerformanceReviews');
    });

    test('Navigate to Performance module', async () => {
        await expect(performancePage.page).toHaveURL(/.*performance/);
    });

    test('Verify review list load', async () => {
        await performancePage.verifyReviewLoaded();
    });
});
