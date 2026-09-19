import { BasePage } from './BasePage';

export class FixedHeaderPage extends BasePage {
  private targetElement = '#fixed-header';

  scrollToElement() {
    cy.get('body').scrollTo('bottom');
  }

  verifyElementVisible() {
    cy.get(this.targetElement).should('be.visible');
  }
}
