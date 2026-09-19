import { BasePage } from './BasePage';

export class AddRemovePage extends BasePage {
  private addButton = 'button:contains("Add Element")';
  private removeButton = 'button:contains("Delete")';
  private element = '.input-group';

  addElement() {
    cy.get(this.addButton).click();
  }

  removeElement() {
    cy.get(this.removeButton).click();
  }

  verifyElementVisible(visible: boolean) {
    if (visible) {
      cy.get(this.element).should('be.visible');
    } else {
      cy.get(this.element).should('not.exist');
    }
  }
}
