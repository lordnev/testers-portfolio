import { Page } from 'cypress';

export class BasePage {
  async navigateTo(path: string): Promise<void> {
    cy.visit(`https://demoqa.com/${path}`);
    // Remove ads that block elements
    cy.get('body').then(($body) => {
      $('.adbox').invoke('remove');
      $('#fixedban').invoke('remove');
    });
  }

  scrollIntoView(selector: string): void {
    cy.get(selector).scrollIntoView();
  }
}
