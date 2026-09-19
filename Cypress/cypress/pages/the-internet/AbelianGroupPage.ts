import { BasePage } from './BasePage';

export class AbelianGroupPage extends BasePage {
  verifyGroupElements() {
    cy.get('.example').should('be.visible');
  }

  verifyIdentityElement() {
    cy.contains('Identity').should('be.visible');
  }
}
