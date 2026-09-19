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
  private readonly firstNameInput = '#firstName';
  private readonly lastNameInput = '#lastName';
  private readonly emailInput = '#userEmail';
  private readonly genderRadio = (label: string) => `label:has-text("${label}")`;
  private readonly phoneInput = '#phoneNumber';
  private readonly fileInput = 'input[type="file"]';
  private readonly submitBtn = '#submit';
  private readonly submissionModal = '#submit';

  fillCompleteForm(user: UserData): void {
    cy.get(this.firstNameInput).type(user.firstName);
    cy.get(this.lastNameInput).type(user.lastName);
    cy.get(this.emailInput).type(user.email);
    cy.get(this.genderRadio(user.gender)).click();
    cy.get(this.phoneInput).type(user.phoneNumber);
    cy.get(this.fileInput).selectFile(user.filePath);
    cy.get(this.submitBtn).click();
  }

  verifySubmissionSuccess(user: UserData): void {
    cy.get(this.submissionModal).should('be.visible')
      .and('contain.text', user.firstName)
      .and('contain.text', user.email);
  }
}
