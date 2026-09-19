import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TextBoxPage extends BasePage {
  private readonly fullNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly currentPasswordInput: Locator;
  private readonly checkboxOne: Locator;
  private readonly checkboxTwo: Locator;
  private readonly radioMale: Locator;
  private readonly radioFemale: Locator;
  private readonly selectDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentPasswordInput = page.locator('#currentPassword');
    this.checkboxOne = page.locator('label:has-text("Checkbox 1") input');
    this.checkboxTwo = page.locator('label:has-text("Checkbox 2") input');
    this.radioMale = page.locator('label:has-text("Male") input');
    this.radioFemale = page.locator('label:has-text("Female") input');
    this.selectDropdown = page.locator('#reactor-dropdown');
  }

  async fillTextBoxes(name: string, email: string, password: string): Promise<void> {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.currentPasswordInput.fill(password);
  }

  async toggleCheckbox(index: number): Promise<void> {
    const checkboxLabel = index === 1 ? this.page.locator('label:has-text("Checkbox 1")') : this.page.locator('label:has-text("Checkbox 2")');
    await this.scrollIntoView(checkboxLabel);
    const checkboxInput = index === 1 ? this.checkboxOne : this.checkboxTwo;
    if (!(await checkboxInput.isChecked())) {
      await checkboxLabel.click();
    }
  }

  async selectRadio(gender: 'male' | 'female'): Promise<void> {
    const radioLabel = gender === 'male' ? this.page.locator('label:has-text("Male")') : this.page.locator('label:has-text("Female")');
    await this.scrollIntoView(radioLabel);
    await radioLabel.click();
  }

  async selectOption(value: string): Promise<void> {
    await this.selectDropdown.selectOption({ label: value });
  }

  async verifyEmailError(): Promise<void> {
    await expect(this.emailInput).toHaveClass(/text-invalid-child/);
  }

  async verifyCheckboxState(index: number, expected: boolean): Promise<void> {
    const checkbox = index === 1 ? this.checkboxOne : this.checkboxTwo;
    await expect(checkbox).toBeChecked({ checked: expected });
  }

  async verifyRadioState(gender: 'male' | 'female', expected: boolean): Promise<void> {
    const radio = gender === 'male' ? this.radioMale : this.radioFemale;
    await expect(radio).toBeChecked({ checked: expected });
  }

  async verifySelectedOption(value: string): Promise<void> {
    await expect(this.selectDropdown).toContainText(value);
  }
}
