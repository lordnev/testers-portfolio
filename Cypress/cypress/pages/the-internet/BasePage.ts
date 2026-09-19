export class BasePage {
  visit(path: string) {
    cy.visit(`https://the-internet.herokuapp.com/${path}`);
  }
}
