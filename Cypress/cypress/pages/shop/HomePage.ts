export class HomePage {
  goto() {
    cy.visit(Cypress.env('BASE_URL'));
  }

  checkRegulaminExists() {
    cy.contains('a', /Regulamin/i).should('be.visible');
  }

  checkPolitykaPrywatnosciExists() {
    cy.contains('a', /Polityka/i).should('be.visible');
  }

  checkKontaktExists() {
    cy.contains('a', /Kontakt/i).should('be.visible');
  }
}
