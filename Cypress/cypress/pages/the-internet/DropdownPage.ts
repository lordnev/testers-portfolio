import { BasePage } from './BasePage';

export class DropdownPage extends BasePage {
  private dropdown = '#dropdown';

  selectByText(text: string) {
    cy.get(this.dropdown).select(text);
  }

  verifySelection(text: string) {
    cy.get(this.dropdown).should('have.value', text);
  }
}
