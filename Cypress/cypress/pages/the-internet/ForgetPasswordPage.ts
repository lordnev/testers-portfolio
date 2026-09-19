import { BasePage } from './BasePage';

export class ForgetPasswordPage extends BasePage {
  private emailInput = '#email';
  private recoverButton = 'button';

  recoverPassword(email: string) {
    cy.get(this.emailInput).type(email);
    cy.get(this.recoverButton).click();
  }

  verifySuccessMessage() {
    cy.get('#flash').should('contain', 'Sent');
  }

  verifyErrorMessage() {
    cy.get('#flash').should('contain', 'invalid');
  }
}
