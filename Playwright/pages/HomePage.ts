import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL as string);
  }

  async checkRegulaminExists() {
    // Weryfikacja czy istnieje link z tekstem "Regulamin"
    const regulaminLink = this.page.getByRole('link', { name: /Regulamin/i });
    await expect(regulaminLink.first()).toBeVisible();
  }

  async checkPolitykaPrywatnosciExists() {
    // Weryfikacja czy istnieje link z tekstem "Polityka Prywatności" lub podobnym
    const politykaLink = this.page.getByRole('link', { name: /Polityka/i });
    await expect(politykaLink.first()).toBeVisible();
  }

  async checkKontaktExists() {
    // Weryfikacja czy istnieje link z tekstem "Kontakt"
    const kontaktLink = this.page.getByRole('link', { name: /Kontakt/i });
    await expect(kontaktLink.first()).toBeVisible();
  }
}
