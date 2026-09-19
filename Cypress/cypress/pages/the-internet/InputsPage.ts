import { BasePage } from './BasePage';

export class InputsPage extends BasePage {
  private inputField = '#input';

  typeText(text: string) {
    cy.get(this.inputField).type(text);
  }

  clearText() {
    cy.get(this.inputField).clear();
  }

  verifyValue(text: string) {
    cy.get(this.inputField).should('have.value', text);
  }
}
