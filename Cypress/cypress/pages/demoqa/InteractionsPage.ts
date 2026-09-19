import { BasePage } from './BasePage';

export class InteractionsPage extends BasePage {
  private readonly sourceElement = '#draggable';
  private readonly targetElement = '#droppable';
  private readonly resizableBox = '#resizable';
  private readonly resizableHandle = '.resizer';
  private readonly selectableItems = (index: number) => `.selectable-item:nth-child(${index + 1})`;

  dragAndDrop(): void {
    cy.get(this.sourceElement).drag('#droppable', { force: true });
  }

  verifyDropResult(expectedText: string): void {
    cy.get(this.targetElement).should('contain.text', expectedText);
  }

  resizeElement(): void {
    cy.get(this.resizableHandle).trigger('mousedown', { which: 1 });
    cy.get(this.resizableBox).trigger('mousemove', { clientX: 200, clientY: 200 });
    cy.get(this.resizableBox).trigger('mouseup', { force: true });
  }

  selectItems(indices: number[]): void {
    indices.forEach(index => {
      cy.get(this.selectableItems(index)).click();
    });
  }

  verifyItemIsSelected(index: number): void {
    cy.get(this.selectableItems(index)).should('have.class', 'selected');
  }
}
