import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/orangehrm/LoginPage';
import { DashboardPage } from '../../PageObjects/orangehrm/DashboardPage';
import { MyPage } from '../../PageObjects/orangehrm/MyPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

test.describe('OrangeHRM My Page Suite', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let myPage: MyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        myPage = new MyPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!);
        await dashboardPage.navigateToMy();
    });

    test('My Page Personal Info', async () => {
        await myPage.verifyPersonalDetails();
    });

    test('Verify personal contact details load', async () => {
        await myPage.verifyContactDetails();
    });

    test('Check profile picture visibility', async () => {
        await myPage.verifyProfilePic();
    });
});
