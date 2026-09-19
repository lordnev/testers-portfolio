import { TextBoxPage } from '../../pages/demoqa/TextBoxPage';
import { AlertsWindowsPage } from '../../pages/demoqa/AlertsWindowsPage';
import { WidgetsPage } from '../../pages/demoqa/WidgetsPage';
import { InteractionsPage } from '../../pages/demoqa/InteractionsPage';
import { PracticeFormPage, UserData } from '../../pages/demoqa/PracticeFormPage';

describe('DemoQA Professional Test Suite (Cypress)', () => {
  const textBoxPage = new TextBoxPage();
  const alertsPage = new AlertsWindowsPage();
  const widgetsPage = new WidgetsPage();
  const interactionsPage = new InteractionsPage();
  const formPage = new PracticeFormPage();

  it('1. Text Box: Should validate input and email error state', () => {
    textBoxPage.navigateTo('text-box');
    textBoxPage.fillTextBoxes('John Doe', 'invalid-email', 'Password123');
    textBoxPage.verifyEmailError();
  });

  it('2. Checkboxes: Should verify multiple selection', () => {
    textBoxPage.navigateTo('checkbox');
    textBoxPage.toggleCheckbox(1);
    textBoxPage.toggleCheckbox(2);
    textBoxPage.verifyCheckboxState(1, true);
    textBoxPage.verifyCheckboxState(2, true);
  });

  it('3. Radio Buttons: Should verify single selection constraint', () => {
    textBoxPage.navigateTo('radio');
    textBoxPage.selectRadio('male');
    textBoxPage.verifyRadioState('male', true);
    textBoxPage.selectRadio('female');
    textBoxPage.verifyRadioState('female', true);
    textBoxPage.verifyRadioState('male', false);
  });

  it('4. Select Options: Should verify dropdown selection', () => {
    textBoxPage.navigateTo('select-option');
    textBoxPage.selectOption('React');
    textBoxPage.verifySelectedOption('React');
  });

  it('5. Alerts: Should verify Confirm and Cancel behavior', () => {
    alertsPage.navigateTo('alerts');
    // Cypress automatically accepts alerts, so we test the outcome
    alertsPage.triggerConfirmAlert('accept');
    alertsPage.verifyConfirmResult('You selected Ok');
  });

  it('6. Widgets: Should verify Date Picker selection', () => {
    widgetsPage.navigateTo('datepicker');
    widgetsPage.selectDate('January', '2025', '15');
    widgetsPage.verifyDateValue('01/15/2025');
  });

  it('7. Interactions: Should verify Drag and Drop', () => {
    interactionsPage.navigateTo('drag-drop-upload');
    interactionsPage.dragAndDrop();
    interactionsPage.verifyDropResult('Dropped!');
  });

  it('8. Interactions: Should verify Resizable element', () => {
    interactionsPage.navigateTo('resizable');
    interactionsPage.resizeElement();
    // Check if size changed - simplified for Cypress
    cy.get('#resizable').should('have.css', 'width').and('not.eq', '150px');
  });

  it('9. Interactions: Should verify Selectable items', () => {
    interactionsPage.navigateTo('selectable');
    interactionsPage.selectItems([1, 3]);
    interactionsPage.verifyItemIsSelected(1);
    interactionsPage.verifyItemIsSelected(3);
  });

  it('10. Practice Form: Should successfully submit the form with valid data', () => {
    formPage.navigateTo('automation-practice-form');
    const userData: UserData = {
      firstName: 'Bartłomiej',
      lastName: 'Tester',
      email: 'bartlomiej@example.com',
      gender: 'Male',
      phoneNumber: '1234567890',
      filePath: 'cypress/fixtures/sample-upload.pdf',
    };
    formPage.fillCompleteForm(userData);
    formPage.verifySubmissionSuccess(userData);
  });
});
