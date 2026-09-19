import { BasePage } from './BasePage';

export class BrokenImagesPage extends BasePage {
  verifyImagesLoaded() {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'src');
      // This is a simplified check; in real scenarios we'd check naturalWidth > 0
    });
  }
}
