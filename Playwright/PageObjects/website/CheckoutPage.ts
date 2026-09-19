import { Page, expect } from '@playwright/test';
import process from 'process';
import { fakerPL as faker } from '@faker-js/faker';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) throw new Error('BASE_URL is not defined in .env');
    await this.page.goto(`${baseUrl}/zamowienie/`);
  }

  async fillBillingDetails() {
    const details = {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.string.numeric(9)
    };

    await this.page.getByRole('textbox', { name: 'Adres email' }).fill(details.email);
    await this.page.getByRole('radio', { name: 'Wysyłka', exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Imię' }).fill(details.firstName);
    await this.page.getByRole('textbox', { name: 'Nazwisko' }).fill(details.lastName);
    await this.page.getByRole('textbox', { name: 'Adres', exact: true }).fill(`${faker.location.street()} ${faker.number.int({ min: 1, max: 150 })}`);
    await this.page.getByRole('button', { name: '+ Dodaj nr mieszkania, lokalu' }).click();
    await this.page.getByText('Ciąg dalszy adresu (').click();
    await this.page.getByRole('textbox', { name: 'Ciąg dalszy adresu (' }).fill(faker.number.int({ min: 1, max: 99 }).toString());
    await this.page.getByRole('textbox', { name: 'Kod pocztowy' }).click();
    await this.page.getByRole('textbox', { name: 'Kod pocztowy' }).fill(faker.location.zipCode('##-###'));
    await this.page.getByRole('textbox', { name: 'Miejscowość' }).fill(faker.location.city());
    await this.page.getByRole('textbox', { name: 'Telefon (opcjonalnie)' }).fill(details.phone);
    return details;
  }

  async selectShippingMethod(methodName: string) {
    const method = this.page.getByRole('radio', { name: methodName, exact: false });
    await expect(method).toBeVisible();
    await method.check();
  }

  async selectPaymentMethod(methodName: string) {
    const method = this.page.getByText(methodName, { exact: false });
    await expect(method).toBeVisible();
    await method.click();
  }

  async confirmOrder() {
    const submitButton = this.page.getByRole('button', { name: 'Kupuję i płacę', exact: false });
    await expect(submitButton).toBeVisible();
    await submitButton.click();
  }

  async verifyOrderSuccess() {
    await expect(this.page).toHaveURL(/zamowienie/);
  }

  async orderSummary(email: string) {
    await expect(this.page.getByRole('banner').getByRole('link', { name: 'Sklep Playwright' })).toBeVisible( { timeout: 20000 } );
    await expect(this.page.getByRole('heading', { name: 'Zamówienie otrzymane' })).toBeVisible( { timeout: 30000 } );
    await expect(this.page.getByText(email)).toBeVisible( { timeout: 20000 } );
  }
}
