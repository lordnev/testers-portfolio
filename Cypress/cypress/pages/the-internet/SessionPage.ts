import { BasePage } from './BasePage';

export class SessionPage extends BasePage {
  verifySessionActive() {
    cy.get('#session-state').should('contain', 'active');
  }
}
