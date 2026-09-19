import { BasePage } from './BasePage';

export class DisabledElementsPage extends BasePage {
  private disabledInput = '#disabled_field';

  verifyInputDisabled() {
    cy.get(this.disabledInput).should('be.disabled');
  }
}
