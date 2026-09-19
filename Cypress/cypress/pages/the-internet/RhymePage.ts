import { BasePage } from './BasePage';

export class RhymePage extends BasePage {
  private inputField = '#rhymeword';
  private searchButton = 'button';

  searchRhyme(word: string) {
    cy.get(this.inputField).type(word);
    cy.get(this.searchButton).click();
  }

  verifyRhymesFound() {
    cy.get('.rhymeword').should('have.length.at.least', 1);
  }
}
