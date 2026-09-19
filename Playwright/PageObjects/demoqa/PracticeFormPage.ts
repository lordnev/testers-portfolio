import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  filePath: string;
}

export class PracticeFormPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly genderRadio: (label: string) => Locator;
  private readonly phoneInput: Locator;
  private readonly fileInput: Locator;
  private readonly submitBtn: Locator;
  private readonly submissionModal: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.genderRadio = (label: string) => page.locator(`label:has-text("${label}") input`);
    this.phoneInput = page.locator('#phoneNumber');
    this.fileInput = page.locator('input[type="file"]');
    this.submitBtn = page.locator('#submit');
    this.submissionModal = page.locator('#submit');
  }

  async fillCompleteForm(user: UserData): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);

    const genderRadio = this.genderRadio(user.gender);
    await this.scrollIntoView(genderRadio);
    await genderRadio.click({ force: true });

    await this.phoneInput.fill(user.phoneNumber);
    await this.fileInput.setInputFiles(user.filePath);
    await this.submitBtn.click();
  }

  async verifySubmissionSuccess(user: UserData): Promise<void> {
    await expect(this.submissionModal).toBeVisible();
    await expect(this.submissionModal).toContainText(user.firstName);
    await expect(this.submissionModal).toContainText(user.email);
  }
}
