import { Page } from '@playwright/test';

export interface OrderDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class ConsoleLog {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  logOrderDetails(details: OrderDetails) {
    console.log(`Test completed. Order details:
Imię: ${details.firstName}
Nazwisko: ${details.lastName}
Email: ${details.email}
Telefon: ${details.phone}`);
  }
}
