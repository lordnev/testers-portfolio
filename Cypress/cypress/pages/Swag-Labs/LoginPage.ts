export class LoginPage {
  // Selectors as constants
  private readonly selectors = {
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
    errorContainer: '[data-test="error-container"]',
  } as const;

  // Elements getters
  get usernameInput() { return cy.get(this.selectors.usernameInput); }
  get passwordInput() { return cy.get(this.selectors.passwordInput); }
  get loginButton() { return cy.get(this.selectors.loginButton); }
  get errorMessage() { return cy.get(this.selectors.errorMessage); }
  get errorContainer() { return cy.get(this.selectors.errorContainer); }

  visit(): void {
    cy.visit('/');
    this.waitForLoad();
  }

  waitForLoad(): void {
    this.usernameInput.should('be.visible');
    this.loginButton.should('be.enabled');
  }

  login(username: string, password: string): void {
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password);
    this.loginButton.click();
    cy.waitForNetworkIdle();
  }

  loginWith(credentials: { username: string; password: string }): void {
    this.login(credentials.username, credentials.password);
  }

  getErrorText(): Cypress.Chainable<string | null> {
    return this.errorContainer.then(($container) => {
      if ($container.is(':visible')) {
        return this.errorMessage.invoke('text');
      }
      return cy.wrap(null);
    });
  }

  expectErrorMessage(message: string): void {
    this.errorContainer.should('be.visible');
    this.errorMessage.should('contain', message);
  }

  expectSuccess(): void {
    cy.url().should('include', '/inventory.html');
  }

  clearForm(): void {
    this.usernameInput.clear();
    this.passwordInput.clear();
  }

  verifyPageElements(): void {
    this.usernameInput.should('be.visible');
    this.passwordInput.should('be.visible');
    this.loginButton.should('be.visible');
  }
}

export const loginPage = new LoginPage();