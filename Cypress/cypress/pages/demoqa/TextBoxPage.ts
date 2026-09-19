import { BasePage } from './BasePage';

export class TextBoxPage extends BasePage {
  private readonly fullNameInput = '#userName';
  private readonly emailInput = '#userEmail';
  private readonly passwordInput = '#currentPassword';
  private readonly checkboxOne = 'label:has-text("Checkbox 1")';
  private readonly checkboxTwo = 'label:has-text("Checkbox 2")';
  private readonly radioMale = 'label:has-text("Male")';
  private readonly radioFemale = 'label:has-text("Female")';
  private readonly selectDropdown = '#reactor-dropdown';

  fillTextBoxes(name: string, email: string, password: string): void {
    cy.get(this.fullNameInput).type(name);
    cy.get(this.emailInput).type(email);
    cy.get(this.passwordInput).type(password);
  }

  toggleCheckbox(index: number): void {
    const selector = index === 1 ? this.checkboxOne : this.checkboxTwo;
    cy.get(selector).click();
  }

  selectRadio(gender: 'male' | 'female'): void {
    const selector = gender === 'male' ? this.radioMale : this.radioFemale;
    cy.get(selector).click();
  }

  selectOption(value: string): void {
    cy.get(this.selectDropdown).select(value);
  }

  verifyEmailError(): void {
    cy.get(this.emailInput).should('have.class', 'text-invalid-child');
  }

  verifyCheckboxState(index: number, expected: boolean): void {
    const selector = index === 1 ? 'input[value="checkbox1"]' : 'input[value="checkbox2"]';
    cy.get(selector).should(expected ? 'be.checked' : 'not.be.checked');
  }

  verifyRadioState(gender: 'male' | 'female', expected: boolean): void {
    const selector = gender === 'male' ? 'input[value="male"]' : 'input[value="female"]';
    cy.get(selector).should(expected ? 'be.checked' : 'not.be.checked');
  }

  verifySelectedOption(value: string): void {
    cy.get(this.selectDropdown).should('contain.text', value);
  }
}
