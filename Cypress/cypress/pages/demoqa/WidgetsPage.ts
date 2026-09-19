import { BasePage } from './BasePage';

export class WidgetsPage extends BasePage {
  private readonly dateInput = '.react-datepicker__input-field';
  private readonly monthSelect = '.react-datepicker__month-select';
  private readonly yearSelect = '.react-datepicker__year-select';
  private readonly dayCell = (day: string) => `.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`;

  selectDate(month: string, year: string, day: string): void {
    cy.get(this.dateInput).click();
    cy.get(this.monthSelect).select(month);
    cy.get(this.yearSelect).select(year);
    cy.get(this.dayCell(day)).click();
  }

  verifyDateValue(expectedDate: string): void {
    cy.get(this.dateInput).should('have.value', expectedDate);
  }
}
