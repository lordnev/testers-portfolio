import { BasePage } from './BasePage';

export class PaginationPage extends BasePage {
  private nextPageButton = 'a[rel="next"]';
  private prevPageButton = 'a[rel="prev"]';

  clickNext() {
    cy.get(this.nextPageButton).click();
  }

  clickPrev() {
    cy.get(this.prevPageButton).click();
  }

  verifyPageNumber(number: string) {
    cy.get('.pagination .active').should('contain', number);
  }
}
