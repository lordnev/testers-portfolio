import { loginPage } from '../../pages/Swag-Labs/LoginPage';

describe('Swag Labs Login Tests', () => {
    beforeEach(() => {
        loginPage.goto();
    });

    const testUsers = [
        { user: 'standard_user', expected: 'success' },
        { user: 'locked_out_user', expected: 'error' },
        { user: 'problem_user', expected: 'success' },
        { user: 'performance_glitch_user', expected: 'success' },
        { user: 'error_user', expected: 'success' },
        { user: 'visual_user', expected: 'success' },
    ];

    testUsers.forEach(({ user, expected }) => {
        it(`Login test for user: ${user}`, () => {
            loginPage.login(user, 'secret_sauce');

            if (expected === 'success') {
                cy.url().should('include', 'inventory.html');
            } else if (expected === 'error') {
                loginPage.errorMessage.should('contain', 'Epic sadface: Sorry, this user has been locked out.');
            }
        });
    });
});
