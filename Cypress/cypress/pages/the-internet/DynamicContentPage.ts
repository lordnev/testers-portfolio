import { BasePage } from './BasePage';

export class DynamicContentPage extends BasePage {
  private content = '#content';
  private startButton = '#start-button';

  clickStart() {
    cy.get(this.startButton).click();
  }

  verifyContentChanged(oldText: string) {
    cy.get(this.content).should('not.have.text', oldText);
  }
}
