import './commands';

// Global beforeEach
beforeEach(() => {
  // Clear cookies/localStorage between tests
  cy.clearCookies();
  cy.clearLocalStorage();

  // Set viewport
  cy.viewport(1280, 720);

  // Fail fast on uncaught exceptions (optional)
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore specific errors
    if (err.message.includes('ResizeObserver loop limit exceeded')) {
      return false;
    }
    if (err.message.includes('Non-Error promise rejection captured')) {
      return false;
    }
    return true;
  });
});

// Global afterEach
afterEach(function () {
  // Take screenshot on failure
  if (this.currentTest.state === 'failed') {
    cy.screenshot(`failed-${this.currentTest.title.replace(/\s+/g, '-')}`);
  }
});

// Custom assertion helpers
declare global {
  namespace Cypress {
    interface Chainable {
      step(name: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('step', (name) => {
  cy.log(`**${name}**`);
});

export {};