import { BasePage } from './BasePage';

export class AlertsWindowsPage extends BasePage {
  private readonly alertBtn = 'text=Click me';
  private readonly confirmBtn = 'text=Confirm Box';
  private readonly resultText = '#confirmBoxResult';

  triggerSimpleAlert(): void {
    cy.get(this.alertBtn).click();
  }

  triggerConfirmAlert(action: 'accept' | 'dismiss'): void {
    cy.on('window:alert', (str) => {
      if (action === 'accept') {
        cy.accept(); // Note: Cypress handles alerts automatically, but for explicit control:
      }
    });
    cy.get(this.confirmBtn).click();
  }

  // Cypress automatically accepts alerts. To test custom behavior, we use the window:alert event.
  verifyConfirmResult(text: string): void {
    cy.get(this.resultText).should('contain.text', text);
  }
}
