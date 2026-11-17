/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      waitForNetworkIdle(timeout?: number): Chainable<void>;
      login(username: string, password: string): Chainable<void>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      shouldHaveValidationError(message: string): Chainable<void>;
      step(name: string): Chainable<void>;
      checkA11y(): Chainable<void>;
    }
  }
}

// Wait for network to be idle - simplified version
Cypress.Commands.add('waitForNetworkIdle', (timeout = 3000) => {
  cy.wait(timeout);
});

// Quick login command with session
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });
});

// Get element by data-test-id
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-test="${testId}"]`);
});

// Validation error assertion
Cypress.Commands.add('shouldHaveValidationError', { prevSubject: 'optional' }, (subject, message) => {
  const $el = subject || cy.get('.oxd-alert-content-text, [data-test="error"], .error-message');
  $el.should('be.visible').and('contain', message);
});

// Test step logging
Cypress.Commands.add('step', (name) => {
  cy.log(`**${name}**`);
});

// Accessibility check (requires cypress-axe)
Cypress.Commands.add('checkA11y', () => {
  cy.injectAxe();
  cy.checkA11y();
});

export {};