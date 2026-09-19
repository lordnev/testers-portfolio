import { BasePage } from './BasePage';

export class NotificationsPage extends BasePage {
  private addNotificationButton = '#add-msg';
  private notification = '.flash');

  addNotification() {
    cy.get(this.addNotificationButton).click();
  }

  verifyNotificationText(text: string) {
    cy.get('.flash').should('contain', text);
  }

  closeNotification() {
    cy.get('.flash').click();
  }
}
