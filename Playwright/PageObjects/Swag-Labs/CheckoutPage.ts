import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    private readonly page: Page;
    private readonly firstNameInput = '[data-test="firstName"]';
    private readonly lastNameInput = '[data-test="lastName"]';
    private readonly zipCodeInput = '[data-test="postalCode"]';
    private readonly continueButton = '[data-test="continue"]';
    private readonly finishButton = '[data-test="finish"]';
    private readonly completeHeader = '.complete-header';
    private readonly downloadInvoiceButton = '[data-test="download-invoice"]';

    constructor(page: Page) {
        this.page = page;
    }

    async fillCheckoutInformation(userData: { firstName: string, lastName: string, zipCode: string }) {
        await this.page.fill(this.firstNameInput, userData.firstName);
        await this.page.fill(this.lastNameInput, userData.lastName);
        await this.page.fill(this.zipCodeInput, userData.zipCode);
    }

    async continueToOverview() {
        await this.page.click(this.continueButton);
    }

    async finishPurchase() {
        await this.page.click(this.finishButton);
    }

    async getCompletionMessage(): Promise<string | null> {
        return await this.page.textContent(this.completeHeader);
    }

    async downloadInvoice() {
        await this.page.click(this.downloadInvoiceButton);
    }
}
