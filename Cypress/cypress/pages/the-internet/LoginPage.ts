import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = ' #username';
  private passwordInput = '#password';
  private loginButton = 'button.radius';
  private flashMessage = '#flash';

  login(user: string, pass: string) {
    cy.get(this.usernameInput).type(user);
    cy.get(this.passwordInput).type(pass);
    cy.get(this.loginButton).click();
  }

  verifyFlashMessage(text: string) {
    cy.get(this.flashMessage).should('be.visible').and('contain', text);
  }
}
