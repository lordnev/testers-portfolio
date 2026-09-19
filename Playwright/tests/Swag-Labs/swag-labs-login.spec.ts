import { test, expect } from '@playwright/test';
import { LoginPage } from '../../PageObjects/Swag-Labs/LoginPage';

test.describe('Swag Labs Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    const testUsers = [
        { user: 'standard_user', expected: 'success' },
        { user: 'locked_out_user', expected: 'error' },
        { user: 'problem_user', expected: 'success' },
        { user: 'performance_glitch_user', expected: 'success' },
        { user: 'error_user', expected: 'success' },
        { user: 'visual_user', expected: 'success' },
    ];

    for (const { user, expected } of testUsers) {
        test(`Login test for user: ${user}`, async ({ page }) => {
            await loginPage.login(user, 'secret_sauce');

            if (expected === 'success') {
                await expect(page).toHaveURL(/.*inventory.html/);
            } else if (expected === 'error') {
                const error = await loginPage.getErrorMessage();
                expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
            }
        });
    }
});
