import { loginPage } from '../../pages/Swag-Labs/LoginPage';

describe('Swag Labs Login Tests', { tags: ['@smoke', '@ui'] }, () => {
  const testUsers = [
    { username: 'standard_user', password: 'secret_sauce', expectsSuccess: true, description: 'Standard user' },
    { username: 'locked_out_user', password: 'secret_sauce', expectsSuccess: false, description: 'Locked out user' },
    { username: 'problem_user', password: 'secret_sauce', expectsSuccess: true, description: 'Problem user' },
    { username: 'performance_glitch_user', password: 'secret_sauce', expectsSuccess: true, description: 'Performance glitch user' },
    { username: 'error_user', password: 'secret_sauce', expectsSuccess: true, description: 'Error user' },
    { username: 'visual_user', password: 'secret_sauce', expectsSuccess: true, description: 'Visual user' },
  ];

  beforeEach(() => {
    loginPage.visit();
  });

  testUsers.forEach(({ username, password, expectsSuccess, description }) => {
    it(`Login with ${description} (${username})`, { tags: ['@data-driven'] }, () => {
      loginPage.login(username, password);

      if (expectsSuccess) {
        loginPage.expectSuccess();
      } else {
        loginPage.expectErrorMessage('Epic sadface: Sorry, this user has been locked out.');
      }
    });
  });

  it('Login with empty credentials', { tags: ['@negative'] }, () => {
    loginPage.visit();
    loginPage.loginButton.click();
    loginPage.expectErrorMessage('Epic sadface: Username is required');
  });

  it('Login with invalid password', { tags: ['@negative'] }, () => {
    loginPage.login('standard_user', 'wrong_password');
    loginPage.expectErrorMessage('Epic sadface: Username and password do not match');
  });

  it('Verify error message visibility', { tags: ['@ui'] }, () => {
    loginPage.login('invalid', 'invalid');
    loginPage.errorContainer.should('be.visible');
  });

  it('Clear credentials after failed login', { tags: ['@ui'] }, () => {
    loginPage.login('invalid', 'invalid');
    loginPage.clearForm();

    loginPage.usernameInput.should('have.value', '');
    loginPage.passwordInput.should('have.value', '');
  });

  it('Verify login page elements', { tags: ['@ui'] }, () => {
    loginPage.verifyPageElements();
  });
});