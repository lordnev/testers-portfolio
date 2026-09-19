export class CheckoutPage {
    get firstNameInput() { return cy.get('[data-test="firstName"]'); }
    get lastNameInput() { return cy.get('[data-test="lastName"]'); }
    get zipCodeInput() { return cy.get('[data-test="postalCode"]'); }
    get continueButton() { return cy.get('[data-test="continue"]'); }
    get finishButton() { return cy.get('[data-test="finish"]'); }
    get completeHeader() { return cy.get('.complete-header'); }
    get downloadInvoiceButton() { return cy.get('[data-test="download-invoice"]'); }

    fillCheckoutInformation(userData) {
        this.firstNameInput.type(userData.firstName);
        this.lastNameInput.type(userData.lastName);
        this.zipCodeInput.type(userData.zipCode);
    }

    continueToOverview() {
        this.continueButton.click();
    }

    finishPurchase() {
        this.finishButton.click();
    }

    getCompletionMessage() {
        return this.completeHeader.invoke('text');
    }

    downloadInvoice() {
        this.downloadInvoiceButton.click();
    }
}

export const checkoutPage = new CheckoutPage();
