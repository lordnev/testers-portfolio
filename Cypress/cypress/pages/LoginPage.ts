export class LoginPage {
  goto() {
    cy.visit(Cypress.env('WP_ADMIN_URL'));
  }

  checkLoginFieldsVisible() {
    cy.get('#user_login').should('be.visible');
    cy.get('#user_pass').should('be.visible');
    cy.get('#wp-submit').should('be.visible');
  }

  login(username?: string, password?: string) {
    const user = username ?? Cypress.env('WP_USERNAME');
    const pass = password ?? Cypress.env('WP_PASSWORD');
    
    cy.get('#user_login').type(user);
    cy.get('#user_pass').type(pass);
    cy.get('#wp-submit').click();
  }
}
