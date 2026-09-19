import { BasePage } from './BasePage';

export class ElementsPage extends BasePage {
  private dragSource = '#draggable';
  private dragTarget = '#droppable';
  private fileInput = '#file-upload';

  dragAndDrop() {
    cy.get(this.dragSource).drag('#droppable');
  }

  uploadFile(fileName: string) {
    cy.get(this.fileInput).selectFile(fileName);
  }

  verifyUploadSuccess() {
    cy.get('#uploaded').should('be.visible');
  }
}
