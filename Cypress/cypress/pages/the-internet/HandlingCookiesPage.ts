import { BasePage } from './BasePage';

export class HandlingCookiesPage extends BasePage {
  verifyCookieValue(name: string, value: string) {
    cy.getCookie(name).should('have.property', 'value', value);
  }
}
