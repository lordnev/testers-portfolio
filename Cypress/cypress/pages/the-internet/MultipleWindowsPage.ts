import { BasePage } from './BasePage';

export class MultipleWindowsPage extends BasePage {
  private link = 'a';

  openWindow() {
    cy.get(this.link).click();
  }

  verifyWindowContent(text: string) {
    cy.window().then((win) => {
      cy.wrap(win.document.body).should('contain', text);
    });
  }
}
