import { test, expect } from '../../fixtures/test-fixtures';
import { TextBoxPage } from '../../PageObjects/demoqa/TextBoxPage';
import { AlertsWindowsPage } from '../../PageObjects/demoqa/AlertsWindowsPage';
import { WidgetsPage } from '../../PageObjects/demoqa/WidgetsPage';
import { InteractionsPage } from '../../PageObjects/demoqa/InteractionsPage';
import { PracticeFormPage, UserData } from '../../PageObjects/demoqa/PracticeFormPage';
import { DEMOQA_TEST_DATA } from '../../utils/test-data-generators';
import path from 'path';

test.describe('DemoQA Professional Test Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  test('1. Text Box: Should validate input and email error state @smoke', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigateTo('text-box');
    await textBoxPage.fillTextBoxes('John Doe', DEMOQA_TEST_DATA.invalidEmail, 'Password123');
    await textBoxPage.verifyEmailError();
  });

  test('2. Checkboxes: Should verify multiple selection @smoke', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigateTo('checkbox');
    await textBoxPage.toggleCheckbox(1);
    await textBoxPage.toggleCheckbox(2);
    await textBoxPage.verifyCheckboxState(1, true);
    await textBoxPage.verifyCheckboxState(2, true);
  });

  test('3. Radio Buttons: Should verify single selection constraint @smoke', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigateTo('radio');
    await textBoxPage.selectRadio('male');
    await textBoxPage.verifyRadioState('male', true);
    await textBoxPage.selectRadio('female');
    await textBoxPage.verifyRadioState('female', true);
    await textBoxPage.verifyRadioState('male', false);
  });

  test('4. Select Options: Should verify dropdown selection @smoke', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigateTo('select-option');
    await textBoxPage.selectOption('React');
    await textBoxPage.verifySelectedOption('React');
  });

  test('5. Alerts: Should verify Confirm and Cancel behavior @regression', async ({ page }) => {
    const alertsPage = new AlertsWindowsPage(page);
    await alertsPage.navigateTo('alerts');
    await alertsPage.triggerConfirmAlert('accept');
    await alertsPage.verifyConfirmResult('You selected Ok');
    await alertsPage.triggerConfirmAlert('dismiss');
    await alertsPage.verifyConfirmResult('You selected Cancel');
  });

  test('6. Widgets: Should verify Date Picker selection @regression', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);
    await widgetsPage.navigateTo('datepicker');
    await widgetsPage.selectDate('January', '2025', '15');
    await widgetsPage.verifyDateValue('01/15/2025');
  });

  test('7. Interactions: Should verify Drag and Drop @regression', async ({ page }) => {
    const interactionsPage = new InteractionsPage(page);
    await interactionsPage.navigateTo('drag-drop-upload');
    await interactionsPage.dragAndDrop();
    await interactionsPage.verifyDropResult('Dropped!');
  });

  test('8. Interactions: Should verify Resizable element @regression', async ({ page }) => {
    const interactionsPage = new InteractionsPage(page);
    await interactionsPage.navigateTo('resizable');
    const initialSize = await interactionsPage.getElementSize();
    await interactionsPage.resizeElement();
    const newSize = await interactionsPage.getElementSize();
    expect(newSize.width).toBeGreaterThan(initialSize.width);
  });

  test('9. Interactions: Should verify Selectable items @regression', async ({ page }) => {
    const interactionsPage = new InteractionsPage(page);
    await interactionsPage.navigateTo('selectable');
    await interactionsPage.selectItems([1, 3]);
    await interactionsPage.verifyItemIsSelected(1);
    await interactionsPage.verifyItemIsSelected(3);
  });

  test('10. Practice Form: Should successfully submit the form with valid data @smoke @e2e', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    await formPage.navigateTo('automation-practice-form');

    const userData: UserData = {
      ...DEMOQA_TEST_DATA.validUser,
      filePath: path.resolve(__dirname, '../../test-data/sample-upload.pdf'),
    };

    await formPage.fillCompleteForm(userData);
    await formPage.verifySubmissionSuccess(userData);
  });

  test('11. Practice Form: Should validate required fields @negative', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    await formPage.navigateTo('automation-practice-form');
    await formPage.submitForm();
    await formPage.verifyValidationErrors();
  });
});