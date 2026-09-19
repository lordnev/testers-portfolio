import { BasePage } from './BasePage';

export class CheckboxesPage extends BasePage {
  private checkboxes = 'input[type="checkbox"]';

  toggleCheckbox(index: number, state: boolean) {
    cy.get(this.checkboxes).eq(index).check({ force: true }).should('be.checked');
    if (!state) {
      cy.get(this.checkboxes).eq(index).uncheck({ force: true }).should('not.be.checked');
    }
  }

  verifyCheckboxState(index: number, isChecked: boolean) {
    cy.get(this.checkboxes).eq(index).should(isChecked ? 'be.checked' : 'not.be.checked');
  }
}
