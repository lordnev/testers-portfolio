import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
  confirmAlert() {
    cy.get('#confirm-button').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button!');
    });
  }

  dismissAlert() {
    cy.get('#confirm-button').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You clicked a button!');
    });
  }

  promptAlert(text: string) {
    cy.get('#prompt-button').click();
    cy.on('window:alert', (str) => {
      cy.get('input').type(text);
    });
  }
}
