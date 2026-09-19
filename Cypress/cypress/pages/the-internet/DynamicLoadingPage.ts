import { BasePage } from './BasePage';

export class DynamicLoadingPage extends BasePage {
  private startButton = '#start';
  private finishText = '#finish';

  clickStart() {
    cy.get(this.startButton).click();
  }

  verifyFinishTextVisible() {
    cy.get(this.finishText, { timeout: 10000 }).should('be.visible');
  }
}
