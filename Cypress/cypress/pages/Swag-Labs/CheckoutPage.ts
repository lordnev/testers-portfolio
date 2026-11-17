export class CheckoutPage {
  private readonly selectors = {
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    finishButton: '[data-test="finish"]',
    completeHeader: '.complete-header',
    downloadInvoice: '[data-test="download-invoice"]',
    errorMessage: '[data-test="error"]',
  } as const;

  get firstNameInput() { return cy.get(this.selectors.firstName); }
  get lastNameInput() { return cy.get(this.selectors.lastName); }
  get postalCodeInput() { return cy.get(this.selectors.postalCode); }
  get continueButton() { return cy.get(this.selectors.continueButton); }
  get finishButton() { return cy.get(this.selectors.finishButton); }
  get completeHeader() { return cy.get(this.selectors.completeHeader); }
  get downloadInvoiceButton() { return cy.get(this.selectors.downloadInvoice); }
  get errorMessage() { return cy.get(this.selectors.errorMessage); }

  fillCheckoutInformation(userData: { firstName: string; lastName: string; zipCode: string }): void {
    this.firstNameInput.clear().type(userData.firstName);
    this.lastNameInput.clear().type(userData.lastName);
    this.postalCodeInput.clear().type(userData.zipCode);
  }

  continueToOverview(): void {
    this.continueButton.click();
    cy.waitForNetworkIdle();
  }

  finishPurchase(): void {
    this.finishButton.click();
    cy.waitForNetworkIdle();
  }

  getCompletionMessage(): Cypress.Chainable<string> {
    return this.completeHeader.invoke('text');
  }

  downloadInvoice(): void {
    this.downloadInvoiceButton.click();
  }

  expectErrorMessage(message: string): void {
    this.errorMessage.should('be.visible').and('contain', message);
  }
}

export const checkoutPage = new CheckoutPage();