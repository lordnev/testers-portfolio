import { BasePage } from './BasePage';

export class CustomDropdownPage extends BasePage {
  private dropdownTrigger = '#dropdown';

  selectOption(text: string) {
    cy.get(this.dropdownTrigger).click();
    cy.contains('.example', text).click();
  }

  verifySelection(text: string) {
    cy.get(this.dropdownTrigger).should('contain', text);
  }
}
