import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class WidgetsPage extends BasePage {
  private readonly dateInput: Locator;
  private readonly monthSelect: Locator;
  private readonly yearSelect: Locator;
  private readonly dayCell: (day: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.dateInput = page.locator('.react-datepicker__input-field');
    this.monthSelect = page.locator('.react-datepicker__month-select');
    this.yearSelect = page.locator('.react-datepicker__year-select');
    this.dayCell = (day: string) => page.locator(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`);
  }

  async selectDate(month: string, year: string, day: string): Promise<void> {
    await this.dateInput.click();
    await this.monthSelect.selectOption({ label: month });
    await this.yearSelect.selectOption({ label: year });
    await this.dayCell(day).click();
  }

  async verifyDateValue(expectedDate: string): Promise<void> {
    await expect(this.dateInput).toHaveValue(expectedDate);
  }
}
