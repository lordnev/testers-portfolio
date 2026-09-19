import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import {
  TheInternetHomePage,
  AddRemoveElementsPage,
  CheckboxesPage,
  DropdownPage,
  DynamicControlsPage,
  DynamicLoadingPage,
  FormAuthPage,
  HoversPage,
  JsAlertsPage,
  UploadDownloadPage,
  TablesPage,
  KeyPressesPage,
} from '../../PageObjects/the-internet';

test.describe('The Internet Herokuapp - Test Suite', () => {

  test.describe('Home Page Navigation', () => {
    test('should load main page and verify heading and examples list', async ({ page }) => {
      const homePage = new TheInternetHomePage(page);
      await homePage.open();

      await expect(homePage.heading).toHaveText('Welcome to the-internet');
      await expect(homePage.availableExamples).toHaveCount(44);
    });

    test('should navigate to Checkboxes from home page', async ({ page }) => {
      const homePage = new TheInternetHomePage(page);
      await homePage.open();
      await homePage.clickExampleLink('Checkboxes');

      await expect(page).toHaveURL(/.*\/checkboxes/);
      await expect(page.locator('h3')).toHaveText('Checkboxes');
    });
  });

  test.describe('Add/Remove Elements', () => {
    test('should add and remove multiple dynamic elements', async ({ page }) => {
      const addRemovePage = new AddRemoveElementsPage(page);
      await addRemovePage.open();

      await expect(addRemovePage.deleteBtns).toHaveCount(0);

      // Add 3 elements
      await addRemovePage.addElements(3);
      await expect(addRemovePage.deleteBtns).toHaveCount(3);

      // Delete the first element
      await addRemovePage.deleteFirstElement();
      await expect(addRemovePage.deleteBtns).toHaveCount(2);

      // Delete all remaining elements
      await addRemovePage.deleteAllElements();
      await expect(addRemovePage.deleteBtns).toHaveCount(0);
    });
  });

  test.describe('Checkboxes', () => {
    test('should toggle checkbox states accurately', async ({ page }) => {
      const checkboxesPage = new CheckboxesPage(page);
      await checkboxesPage.open();

      // Default state: 1st unchecked, 2nd checked
      await expect(checkboxesPage.checkboxes.nth(0)).not.toBeChecked();
      await expect(checkboxesPage.checkboxes.nth(1)).toBeChecked();

      // Toggle both
      await checkboxesPage.setCheckbox(0, true);
      await checkboxesPage.setCheckbox(1, false);

      await expect(checkboxesPage.checkboxes.nth(0)).toBeChecked();
      await expect(checkboxesPage.checkboxes.nth(1)).not.toBeChecked();
    });
  });

  test.describe('Dropdown List', () => {
    test('should select options by value and label', async ({ page }) => {
      const dropdownPage = new DropdownPage(page);
      await dropdownPage.open();

      await dropdownPage.selectByValue('1');
      expect(await dropdownPage.getSelectedValue()).toBe('1');

      await dropdownPage.selectByLabel('Option 2');
      expect(await dropdownPage.getSelectedValue()).toBe('2');
    });
  });

  test.describe('Dynamic Controls', () => {
    test('should remove and restore checkbox with async waiting', async ({ page }) => {
      const dynamicControls = new DynamicControlsPage(page);
      await dynamicControls.open();

      await expect(dynamicControls.checkbox).toBeVisible();

      // Remove checkbox
      await dynamicControls.clickRemoveAdd();
      await expect(dynamicControls.message).toHaveText("It's gone!", { timeout: 10000 });
      await expect(dynamicControls.checkbox).toHaveCount(0);

      // Add checkbox back
      await dynamicControls.clickRemoveAdd();
      await expect(dynamicControls.message).toHaveText("It's back!", { timeout: 10000 });
      await expect(dynamicControls.checkbox).toBeVisible();
    });

    test('should enable and disable input field', async ({ page }) => {
      const dynamicControls = new DynamicControlsPage(page);
      await dynamicControls.open();

      await expect(dynamicControls.inputField).toBeDisabled();

      // Enable input
      await dynamicControls.clickEnableDisable();
      await expect(dynamicControls.message).toHaveText("It's enabled!", { timeout: 10000 });
      await expect(dynamicControls.inputField).toBeEnabled();

      await dynamicControls.inputField.fill('Playwright Test');
      await expect(dynamicControls.inputField).toHaveValue('Playwright Test');

      // Disable input
      await dynamicControls.clickEnableDisable();
      await expect(dynamicControls.message).toHaveText("It's disabled!", { timeout: 10000 });
      await expect(dynamicControls.inputField).toBeDisabled();
    });
  });

  test.describe('Dynamic Loading', () => {
    test('Example 1: Element on page that is hidden', async ({ page }) => {
      const dynamicLoading = new DynamicLoadingPage(page);
      await dynamicLoading.openExample(1);

      await dynamicLoading.startAndWaitForFinish();
      await expect(dynamicLoading.finishText).toBeVisible();
      await expect(dynamicLoading.finishText).toHaveText('Hello World!');
    });

    test('Example 2: Element that is rendered after the fact', async ({ page }) => {
      const dynamicLoading = new DynamicLoadingPage(page);
      await dynamicLoading.openExample(2);

      await dynamicLoading.startAndWaitForFinish();
      await expect(dynamicLoading.finishText).toBeVisible();
      await expect(dynamicLoading.finishText).toHaveText('Hello World!');
    });
  });

  test.describe('Form Authentication', () => {
    test('should fail login with invalid credentials', async ({ page }) => {
      const authPage = new FormAuthPage(page);
      await authPage.open();

      await authPage.login('invalidUser', 'wrongPassword');
      await expect(authPage.flashMessage).toContainText('Your username is invalid!');
    });

    test('should successfully login and logout with valid credentials', async ({ page }) => {
      const authPage = new FormAuthPage(page);
      await authPage.open();

      await authPage.login('tomsmith', 'SuperSecretPassword!');
      await expect(page).toHaveURL(/.*\/secure/);
      await expect(authPage.flashMessage).toContainText('You logged into a secure area!');

      await authPage.logout();
      await expect(page).toHaveURL(/.*\/login/);
      await expect(authPage.flashMessage).toContainText('You logged out of the secure area!');
    });
  });

  test.describe('Hovers', () => {
    test('should reveal user info on mouse hover', async ({ page }) => {
      const hoversPage = new HoversPage(page);
      await hoversPage.open();

      const userCount = await hoversPage.figures.count();
      expect(userCount).toBe(3);

      for (let i = 0; i < userCount; i++) {
        await hoversPage.hoverFigure(i);
        const caption = hoversPage.getFigureCaption(i);

        await expect(caption).toBeVisible();
        await expect(caption.locator('h5')).toHaveText(`name: user${i + 1}`);
        await expect(caption.locator('a')).toHaveAttribute('href', `/users/${i + 1}`);
      }
    });
  });

  test.describe('JavaScript Dialogs & Alerts', () => {
    test('should handle simple alert', async ({ page }) => {
      const alertsPage = new JsAlertsPage(page);
      await alertsPage.open();

      const msg = await alertsPage.triggerAlertAndAccept();
      expect(msg).toBe('I am a JS Alert');
      await expect(alertsPage.resultText).toHaveText('You successfully clicked an alert');
    });

    test('should accept and dismiss confirm dialog', async ({ page }) => {
      const alertsPage = new JsAlertsPage(page);
      await alertsPage.open();

      // Accept
      await alertsPage.triggerConfirm(true);
      await expect(alertsPage.resultText).toHaveText('You clicked: Ok');

      // Dismiss
      await alertsPage.triggerConfirm(false);
      await expect(alertsPage.resultText).toHaveText('You clicked: Cancel');
    });

    test('should input prompt text and accept', async ({ page }) => {
      const alertsPage = new JsAlertsPage(page);
      await alertsPage.open();

      const testInput = 'Automatyzacja Playwright';
      await alertsPage.triggerPrompt(testInput);
      await expect(alertsPage.resultText).toHaveText(`You entered: ${testInput}`);
    });
  });

  test.describe('File Upload & Download', () => {
    test('should upload a file and verify confirmation', async ({ page }, testInfo) => {
      const uploadPage = new UploadDownloadPage(page);
      await uploadPage.openUpload();

      const tempFile = path.join(testInfo.outputDir, 'sample-upload.txt');
      fs.mkdirSync(testInfo.outputDir, { recursive: true });
      fs.writeFileSync(tempFile, 'Playwright test upload content');

      await uploadPage.uploadFile(tempFile);
      await expect(uploadPage.pageHeading).toHaveText('File Uploaded!');
      await expect(uploadPage.uploadedFilesText).toHaveText('sample-upload.txt');
    });

    test('should trigger and verify file download', async ({ page }) => {
      const downloadPage = new UploadDownloadPage(page);
      await downloadPage.openDownload();

      const [download] = await Promise.all([
        page.waitForEvent('download'),
        downloadPage.downloadLinks.first().click(),
      ]);

      const downloadName = download.suggestedFilename();
      expect(downloadName).toBeTruthy();
    });
  });

  test.describe('Data Tables', () => {
    test('should sort table rows by Last Name', async ({ page }) => {
      const tablesPage = new TablesPage(page);
      await tablesPage.open();

      const initialValues = await tablesPage.getColumnValues(1, 1);
      
      await tablesPage.sortByHeader(1, 'Last Name');
      const sortedValues = await tablesPage.getColumnValues(1, 1);

      const expectedSorted = [...initialValues].sort((a, b) => a.localeCompare(b));
      expect(sortedValues).toEqual(expectedSorted);
    });
  });

  test.describe('Key Presses', () => {
    test('should detect key events', async ({ page }) => {
      const keyPressPage = new KeyPressesPage(page);
      await keyPressPage.open();

      await keyPressPage.pressKey('Shift');
      await expect(keyPressPage.resultText).toHaveText('You entered: SHIFT');

      await keyPressPage.pressKey('Escape');
      await expect(keyPressPage.resultText).toHaveText('You entered: ESCAPE');

      await keyPressPage.pressKey('Space');
      await expect(keyPressPage.resultText).toHaveText('You entered: SPACE');
    });
  });

  test.describe('Basic Auth', () => {
    test('should authenticate via HTTP Basic Auth headers', async ({ browser }) => {
      const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin',
        },
      });
      const page = await context.newPage();
      await page.goto('https://the-internet.herokuapp.com/basic_auth');

      await expect(page.locator('h3')).toHaveText('Basic Auth');
      await expect(page.locator('.example p')).toContainText('Congratulations! You must have the proper credentials.');
      await context.close();
    });
  });
});
