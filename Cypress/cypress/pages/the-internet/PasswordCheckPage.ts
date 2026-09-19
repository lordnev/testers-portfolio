import { BasePage } from './BasePage';

export class PasswordCheckPage extends BasePage {
  private passwordInput = '#password';

  typePassword(password: string) {
    cy.get(this.passwordInput).type(password);
  }

  verifyCheckmark(isVisible: boolean) {
    if (isVisible) {
      cy.get('.checkmark').should('be.visible');
    } else {
      cy.get('.checkmark').should('not.be.visible');
    }
  }
}
