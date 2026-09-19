import { BasePage } from './BasePage';

export class FramesPage extends BasePage {
  switchToFrame(index: number) {
    cy.get('iframe').eq(index).its('0.contentDocument.body').should('not.be.empty').then((body) => {
      cy.wrap(body).find('#frame-text').should('be.visible');
    });
  }

  verifyFrameText(index: number, text: string) {
    cy.get('iframe').eq(index).its('0.contentDocument.body').should('not.be.empty').then((body) => {
      cy.wrap(body).find('#frame-text').should('contain', text);
    });
  }
}
