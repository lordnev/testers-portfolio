import { BasePage } from './BasePage';

export class SortableTablePage extends BasePage {
  private tableHeader = 'th';

  sortByColumn(columnText: string) {
    cy.contains(this.tableHeader, columnText).click();
  }

  verifyFirstRowValue(columnIdx: number, expectedValue: string) {
    cy.get('tbody tr').first().find('td').eq(columnIdx).should('contain', expectedValue);
  }
}
