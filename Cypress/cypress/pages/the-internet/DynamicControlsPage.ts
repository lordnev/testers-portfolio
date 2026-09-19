import { BasePage } from './BasePage';

export class DynamicControlsPage extends BasePage {
  private removeButton = '#remove';
  private editButton = '#edit';
  private inputField = '#input';
  private saveButton = '#save';

  removeElement() {
    cy.get(this.removeButton).click();
  }

  verifyElementGone() {
    cy.get('#dynamic_controls_example').should('not.exist');
  }

  editAndSave(text: string) {
    cy.get(this.editButton).click();
    cy.get(this.inputField).clear().type(text);
    cy.get(this.saveButton).click();
  }

  verifyUpdatedText(text: string) {
    cy.contains(text).should('be.visible');
  }
}
