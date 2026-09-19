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
  BrokenImagesPage,
  ChallengingDomPage,
  ContextMenuPage,
  DragAndDropPage,
  EntryAdPage,
  FloatingMenuPage,
  ForgotPasswordPage,
  FramesPage,
  HorizontalSliderPage,
  InputsPage,
  MultipleWindowsPage,
  NotificationMessagePage,
  StatusCodesPage,
  ShadowDomPage,
  LargeDomPage,
  ABTestingPage,
  GeolocationPage,
  InfiniteScrollPage,
  ExitIntentPage,
  ShiftingContentPage,
  TyposPage,
} from '../../PageObjects/the-internet';

test.describe('The Internet Herokuapp - Comprehensive Test Suite (60 Tests)', () => {

  // ==========================================
  // BATCH 1: TESTS 1 - 20 (Foundational Features)
  // ==========================================

  test.describe('Home Page Navigation', () => {
    test('1. should load main page and verify heading and examples list', async ({ page }) => {
      const homePage = new TheInternetHomePage(page);
      await homePage.open();

      await expect(homePage.heading).toHaveText('Welcome to the-internet');
      await expect(homePage.availableExamples).toHaveCount(44);
    });

    test('2. should navigate to Checkboxes from home page', async ({ page }) => {
      const homePage = new TheInternetHomePage(page);
      await homePage.open();
      await homePage.clickExampleLink('Checkboxes');

      await expect(page).toHaveURL(/.*\/checkboxes/);
      await expect(page.locator('h3')).toHaveText('Checkboxes');
    });
  });

  test.describe('Add/Remove Elements', () => {
    test('3. should add and remove multiple dynamic elements', async ({ page }) => {
      const addRemovePage = new AddRemoveElementsPage(page);
      await addRemovePage.open();

      await expect(addRemovePage.deleteBtns).toHaveCount(0);

      await addRemovePage.addElements(3);
      await expect(addRemovePage.deleteBtns).toHaveCount(3);

      await addRemovePage.deleteFirstElement();
      await expect(addRemovePage.deleteBtns).toHaveCount(2);

      await addRemovePage.deleteAllElements();
      await expect(addRemovePage.deleteBtns).toHaveCount(0);
    });
  });

  test.describe('Checkboxes', () => {
    test('4. should toggle checkbox states accurately', async ({ page }) => {
      const checkboxesPage = new CheckboxesPage(page);
      await checkboxesPage.open();

      await expect(checkboxesPage.checkboxes.nth(0)).not.toBeChecked();
      await expect(checkboxesPage.checkboxes.nth(1)).toBeChecked();

      await checkboxesPage.setCheckbox(0, true);
      await checkboxesPage.setCheckbox(1, false);

      await expect(checkboxesPage.checkboxes.nth(0)).toBeChecked();
      await expect(checkboxesPage.checkboxes.nth(1)).not.toBeChecked();
    });
  });

  test.describe('Dropdown List', () => {
    test('5. should select options by value and label', async ({ page }) => {
      const dropdownPage = new DropdownPage(page);
      await dropdownPage.open();

      await dropdownPage.selectByValue('1');
      expect(await dropdownPage.getSelectedValue()).toBe('1');

      await dropdownPage.selectByLabel('Option 2');
      expect(await dropdownPage.getSelectedValue()).toBe('2');
    });
  });

  test.describe('Dynamic Controls', () => {
    test('6. should remove and restore checkbox with async waiting', async ({ page }) => {
      const dynamicControls = new DynamicControlsPage(page);
      await dynamicControls.open();

      await expect(dynamicControls.checkbox).toBeVisible();

      await dynamicControls.clickRemoveAdd();
      await expect(dynamicControls.message).toHaveText("It's gone!", { timeout: 10000 });
      await expect(dynamicControls.checkbox).toHaveCount(0);

      await dynamicControls.clickRemoveAdd();
      await expect(dynamicControls.message).toHaveText("It's back!", { timeout: 10000 });
      await expect(dynamicControls.checkbox).toBeVisible();
    });

    test('7. should enable and disable input field', async ({ page }) => {
      const dynamicControls = new DynamicControlsPage(page);
      await dynamicControls.open();

      await expect(dynamicControls.inputField).toBeDisabled();

      await dynamicControls.clickEnableDisable();
      await expect(dynamicControls.message).toHaveText("It's enabled!", { timeout: 10000 });
      await expect(dynamicControls.inputField).toBeEnabled();

      await dynamicControls.inputField.fill('Playwright Test');
      await expect(dynamicControls.inputField).toHaveValue('Playwright Test');

      await dynamicControls.clickEnableDisable();
      await expect(dynamicControls.message).toHaveText("It's disabled!", { timeout: 10000 });
      await expect(dynamicControls.inputField).toBeDisabled();
    });
  });

  test.describe('Dynamic Loading', () => {
    test('8. Example 1: Element on page that is hidden', async ({ page }) => {
      const dynamicLoading = new DynamicLoadingPage(page);
      await dynamicLoading.openExample(1);

      await dynamicLoading.startAndWaitForFinish();
      await expect(dynamicLoading.finishText).toBeVisible();
      await expect(dynamicLoading.finishText).toHaveText('Hello World!');
    });

    test('9. Example 2: Element that is rendered after the fact', async ({ page }) => {
      const dynamicLoading = new DynamicLoadingPage(page);
      await dynamicLoading.openExample(2);

      await dynamicLoading.startAndWaitForFinish();
      await expect(dynamicLoading.finishText).toBeVisible();
      await expect(dynamicLoading.finishText).toHaveText('Hello World!');
    });
  });

  test.describe('Form Authentication', () => {
    test('10. should fail login with invalid credentials', async ({ page }) => {
      const authPage = new FormAuthPage(page);
      await authPage.open();

      await authPage.login('invalidUser', 'wrongPassword');
      await expect(authPage.flashMessage).toContainText('Your username is invalid!');
    });

    test('11. should successfully login and logout with valid credentials', async ({ page }) => {
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
    test('12. should reveal user info on mouse hover', async ({ page }) => {
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
    test('13. should handle simple alert', async ({ page }) => {
      const alertsPage = new JsAlertsPage(page);
      await alertsPage.open();

      const msg = await alertsPage.triggerAlertAndAccept();
      expect(msg).toBe('I am a JS Alert');
      await expect(alertsPage.resultText).toHaveText('You successfully clicked an alert');
    });

    test('14. should accept and dismiss confirm dialog', async ({ page }) => {
      const alertsPage = new JsAlertsPage(page);
      await alertsPage.open();

      await alertsPage.triggerConfirm(true);
      await expect(alertsPage.resultText).toHaveText('You clicked: Ok');

      await alertsPage.triggerConfirm(false);
      await expect(alertsPage.resultText).toHaveText('You clicked: Cancel');
    });

    test('15. should input prompt text and accept', async ({ page }) => {
      const alertsPage = new JsAlertsPage(page);
      await alertsPage.open();

      const testInput = 'Automatyzacja Playwright';
      await alertsPage.triggerPrompt(testInput);
      await expect(alertsPage.resultText).toHaveText(`You entered: ${testInput}`);
    });
  });

  test.describe('File Upload & Download', () => {
    test('16. should upload a file and verify confirmation', async ({ page }, testInfo) => {
      const uploadPage = new UploadDownloadPage(page);
      await uploadPage.openUpload();

      const tempFile = path.join(testInfo.outputDir, 'sample-upload.txt');
      fs.mkdirSync(testInfo.outputDir, { recursive: true });
      fs.writeFileSync(tempFile, 'Playwright test upload content');

      await uploadPage.uploadFile(tempFile);
      await expect(uploadPage.pageHeading).toHaveText('File Uploaded!');
      await expect(uploadPage.uploadedFilesText).toHaveText('sample-upload.txt');
    });

    test('17. should trigger and verify file download', async ({ page }) => {
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
    test('18. should sort table rows by Last Name', async ({ page }) => {
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
    test('19. should detect key events', async ({ page }) => {
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
    test('20. should authenticate via HTTP Basic Auth headers', async ({ browser }) => {
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

  // ==========================================
  // BATCH 2: TESTS 21 - 40 (Advanced Scenarios)
  // ==========================================

  test.describe('Broken Images', () => {
    test('21. should detect broken and valid images by response status', async ({ page }) => {
      const brokenImagesPage = new BrokenImagesPage(page);
      await brokenImagesPage.open();

      const statuses = await brokenImagesPage.getImageStatuses();
      expect(statuses.length).toBeGreaterThan(0);
      expect(statuses).toContain(200);
      expect(statuses).toContain(404);
    });
  });

  test.describe('Challenging DOM', () => {
    test('22. should interact with dynamic buttons, canvas and table action links', async ({ page }) => {
      const challengingDomPage = new ChallengingDomPage(page);
      await challengingDomPage.open();

      await challengingDomPage.clickBlueButton();
      await challengingDomPage.clickRedAlertButton();
      await challengingDomPage.clickGreenSuccessButton();

      await expect(challengingDomPage.canvas).toBeVisible();
      await expect(challengingDomPage.editLinks).toHaveCount(10);
      await expect(challengingDomPage.deleteLinks).toHaveCount(10);
    });
  });

  test.describe('Context Menu', () => {
    test('23. should trigger alert dialog on context menu right-click', async ({ page }) => {
      const contextMenuPage = new ContextMenuPage(page);
      await contextMenuPage.open();

      const alertMsg = await contextMenuPage.rightClickHotSpot();
      expect(alertMsg).toBe('You selected a context menu');
    });
  });

  test.describe('Disappearing Elements', () => {
    test('24. should verify presence of navigation elements', async ({ page }) => {
      await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
      const menuItems = page.locator('.example ul li a');
      await expect(menuItems.filter({ hasText: 'Home' })).toBeVisible();
      await expect(menuItems.filter({ hasText: 'About' })).toBeVisible();
      await expect(menuItems.filter({ hasText: 'Contact Us' })).toBeVisible();
      await expect(menuItems.filter({ hasText: 'Portfolio' })).toBeVisible();
    });
  });

  test.describe('Drag and Drop', () => {
    test('25. should drag and drop columns exchanging their headers', async ({ page }) => {
      const dragDropPage = new DragAndDropPage(page);
      await dragDropPage.open();

      await expect(dragDropPage.columnAHeader).toHaveText('A');
      await expect(dragDropPage.columnBHeader).toHaveText('B');

      await dragDropPage.dragAToB();
      await expect(dragDropPage.columnAHeader).toHaveText('B');
      await expect(dragDropPage.columnBHeader).toHaveText('A');

      await dragDropPage.dragBToA();
      await expect(dragDropPage.columnAHeader).toHaveText('A');
      await expect(dragDropPage.columnBHeader).toHaveText('B');
    });
  });

  test.describe('Dynamic Content', () => {
    test('26. should change content on page refresh', async ({ page }) => {
      await page.goto('https://the-internet.herokuapp.com/dynamic_content');
      const textRows = page.locator('#content .row .large-10');
      const initialTexts = await textRows.allInnerTexts();

      await page.reload();
      const reloadedTexts = await textRows.allInnerTexts();

      const isDifferent = initialTexts.some((text, i) => text !== reloadedTexts[i]);
      expect(isDifferent).toBeTruthy();
    });
  });

  test.describe('Entry Ad (Modal Window)', () => {
    test('27. should display modal window and close it', async ({ page }) => {
      const entryAdPage = new EntryAdPage(page);
      await entryAdPage.open();

      await expect(entryAdPage.modal).toBeVisible({ timeout: 10000 });
      await expect(entryAdPage.modalTitle).toHaveText('This is a modal window');

      await entryAdPage.closeModal();
      await expect(entryAdPage.modal).toBeHidden();
    });
  });

  test.describe('Floating Menu', () => {
    test('28. should remain visible after scrolling down', async ({ page }) => {
      const floatingMenuPage = new FloatingMenuPage(page);
      await floatingMenuPage.open();

      await expect(floatingMenuPage.menu).toBeVisible();
      await floatingMenuPage.scrollDown(2500);

      await expect(floatingMenuPage.menu).toBeVisible();
      await expect(floatingMenuPage.homeLink).toBeVisible();
    });
  });

  test.describe('Forgot Password', () => {
    test('29. should submit email and verify response', async ({ page }) => {
      const forgotPasswordPage = new ForgotPasswordPage(page);
      await forgotPasswordPage.open();

      await forgotPasswordPage.submitEmail('user@test.com');
      await expect(page.locator('body')).not.toBeEmpty();
    });
  });

  test.describe('Horizontal Slider', () => {
    test('30. should adjust slider value using arrow keys', async ({ page }) => {
      const sliderPage = new HorizontalSliderPage(page);
      await sliderPage.open();

      await sliderPage.setSliderValueWithKeys(3.5);
      await expect(sliderPage.rangeValue).toHaveText('3.5');
    });
  });

  test.describe('Inputs', () => {
    test('31. should handle numbers and arrow increment/decrement', async ({ page }) => {
      const inputsPage = new InputsPage(page);
      await inputsPage.open();

      await inputsPage.fillNumber('10');
      await expect(inputsPage.numberInput).toHaveValue('10');

      await inputsPage.stepWithArrow('Up');
      await expect(inputsPage.numberInput).toHaveValue('11');

      await inputsPage.stepWithArrow('Down');
      await inputsPage.stepWithArrow('Down');
      await expect(inputsPage.numberInput).toHaveValue('9');
    });
  });

  test.describe('Multiple Windows / Tabs', () => {
    test('32. should open new window and verify text', async ({ page }) => {
      const windowsPage = new MultipleWindowsPage(page);
      await windowsPage.open();

      const newTab = await windowsPage.openNewWindow();
      await expect(newTab).toHaveURL(/.*\/windows\/new/);
      await expect(newTab.locator('h3')).toHaveText('New Window');
      await newTab.close();
    });
  });

  test.describe('Nested Frames', () => {
    test('33. should read contents from top nested and bottom frames', async ({ page }) => {
      const framesPage = new FramesPage(page);
      await framesPage.openNestedFrames();

      await expect(framesPage.getNestedFrameText('LEFT')).toContainText('LEFT');
      await expect(framesPage.getNestedFrameText('MIDDLE')).toContainText('MIDDLE');
      await expect(framesPage.getNestedFrameText('RIGHT')).toContainText('RIGHT');
      await expect(framesPage.getNestedFrameText('BOTTOM')).toContainText('BOTTOM');
    });
  });

  test.describe('iFrame Editor', () => {
    test('34. should type into TinyMCE rich text editor inside iframe', async ({ page }) => {
      const framesPage = new FramesPage(page);
      await framesPage.openIframe();

      const testText = 'Playwright test message in iframe editor!';
      await framesPage.setIframeText(testText);
      await expect(framesPage.getIframeBody()).toHaveText(testText);
    });
  });

  test.describe('Notification Messages', () => {
    test('35. should display flash notification upon action trigger', async ({ page }) => {
      const notificationPage = new NotificationMessagePage(page);
      await notificationPage.open();

      await notificationPage.clickTrigger();
      await expect(notificationPage.flashMessage).toBeVisible();
      await expect(notificationPage.flashMessage).toContainText('Action');
    });
  });

  test.describe('Redirect Link', () => {
    test('36. should follow redirect chain to status codes page', async ({ page }) => {
      const statusPage = new StatusCodesPage(page);
      await statusPage.openRedirector();

      await statusPage.redirectLink.click();
      await expect(page).toHaveURL(/.*\/status_codes/);
      await expect(page.locator('h3')).toHaveText('Status Codes');
    });
  });

  test.describe('Status Codes', () => {
    test('37. should inspect HTTP 404 response page content', async ({ page }) => {
      const statusPage = new StatusCodesPage(page);
      await statusPage.openStatusCodes();

      await statusPage.clickStatusCode(404);
      await expect(page).toHaveURL(/.*\/status_codes\/404/);
      await expect(statusPage.statusText).toContainText('This page returned a 404 status code');
    });

    test('38. should inspect HTTP 200 response page content', async ({ page }) => {
      const statusPage = new StatusCodesPage(page);
      await statusPage.openStatusCodes();

      await statusPage.clickStatusCode(200);
      await expect(page).toHaveURL(/.*\/status_codes\/200/);
      await expect(statusPage.statusText).toContainText('This page returned a 200 status code');
    });
  });

  test.describe('Shadow DOM', () => {
    test('39. should pierce Shadow DOM and read text elements', async ({ page }) => {
      const shadowPage = new ShadowDomPage(page);
      await shadowPage.open();

      await expect(shadowPage.shadowParagraphs.first()).toHaveText("Let's have some different text!");
      await expect(page.locator('ul[slot="my-text"] li').first()).toHaveText("Let's have some different text!");
    });
  });

  test.describe('Large & Deep DOM', () => {
    test('40. should locate cells in large table DOM', async ({ page }) => {
      const largeDomPage = new LargeDomPage(page);
      await largeDomPage.open();

      const cell25 = largeDomPage.getCell(25, 15);
      await expect(cell25).toHaveText('25.15');

      const cell50 = largeDomPage.getCell(50, 50);
      await expect(cell50).toHaveText('50.50');
    });
  });

  // ==========================================
  // BATCH 3: TESTS 41 - 60 (Deep Exploration & Edge Cases)
  // ==========================================

  test.describe('A/B Testing with Cookie Control', () => {
    test('41. should force control variation using opt_out cookie', async ({ page }) => {
      const abPage = new ABTestingPage(page);
      await abPage.setOptOutCookie();
      await abPage.open();

      await expect(abPage.heading).toHaveText(/A\/B Test Control|No A\/B Test/);
    });
  });

  test.describe('Digest Authentication', () => {
    test('42. should authenticate successfully using Digest Auth headers', async ({ browser }) => {
      const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin',
        },
      });
      const page = await context.newPage();
      await page.goto('https://the-internet.herokuapp.com/digest_auth');

      await expect(page.locator('h3')).toHaveText('Digest Auth');
      await expect(page.locator('.example p')).toContainText('Congratulations! You must have the proper credentials.');
      await context.close();
    });
  });

  test.describe('JavaScript Error Handling', () => {
    test('43. should capture unhandled page error on load', async ({ page }) => {
      let capturedError: Error | null = null;
      page.on('pageerror', error => {
        capturedError = error;
      });

      await page.goto('https://the-internet.herokuapp.com/javascript_error');
      expect(capturedError).not.toBeNull();
      expect(capturedError?.message).toContain('Cannot read properties of undefined');
    });
  });

  test.describe('Status Codes Extended', () => {
    test('44. should inspect HTTP 301 redirection status content', async ({ page }) => {
      const statusPage = new StatusCodesPage(page);
      await statusPage.openStatusCodes();

      await statusPage.clickStatusCode(301);
      await expect(page).toHaveURL(/.*\/status_codes\/301/);
      await expect(statusPage.statusText).toContainText('This page returned a 301 status code');
    });

    test('45. should inspect HTTP 500 server error status content', async ({ page }) => {
      const statusPage = new StatusCodesPage(page);
      await statusPage.openStatusCodes();

      await statusPage.clickStatusCode(500);
      await expect(page).toHaveURL(/.*\/status_codes\/500/);
      await expect(statusPage.statusText).toContainText('This page returned a 500 status code');
    });
  });

  test.describe('Exit Intent', () => {
    test('46. should trigger exit intent modal when mouse exits viewport', async ({ page }) => {
      const exitIntentPage = new ExitIntentPage(page);
      await exitIntentPage.open();

      await exitIntentPage.triggerExitIntent();
      await expect(exitIntentPage.modal).toBeVisible();
      await expect(exitIntentPage.modalTitle).toHaveText('This is a modal window');

      await exitIntentPage.closeModal();
      await expect(exitIntentPage.modal).toBeHidden();
    });
  });

  test.describe('Infinite Scroll', () => {
    test('47. should load additional paragraphs dynamically on scroll', async ({ page }) => {
      const scrollPage = new InfiniteScrollPage(page);
      await scrollPage.open();

      const initialCount = await scrollPage.scrollBlocks.count();
      await scrollPage.scrollDown(2);
      await expect(async () => {
        const count = await scrollPage.scrollBlocks.count();
        expect(count).toBeGreaterThan(initialCount);
      }).toPass({ timeout: 10000 });
    });
  });

  test.describe('Geolocation Mocking', () => {
    test('48. should report mocked geolocation coordinates', async ({ browser }) => {
      const context = await browser.newContext({
        permissions: ['geolocation'],
        geolocation: { latitude: 52.2297, longitude: 21.0122 },
      });
      const page = await context.newPage();
      const geoPage = new GeolocationPage(page);
      await geoPage.open();

      await geoPage.clickWhereAmI();
      await expect(geoPage.latValue).toHaveText('52.2297');
      await expect(geoPage.longValue).toHaveText('21.0122');
      await context.close();
    });
  });

  test.describe('Shifting Content', () => {
    test('49. should render all menu items in shifting menu mode', async ({ page }) => {
      const shiftingPage = new ShiftingContentPage(page);
      await shiftingPage.openMenu(100);

      await expect(shiftingPage.menuItems).toHaveCount(5);
      await expect(shiftingPage.menuItems.filter({ hasText: 'Home' })).toBeVisible();
      await expect(shiftingPage.menuItems.filter({ hasText: 'About' })).toBeVisible();
    });

    test('50. should verify shifting image rendering with pixel shift', async ({ page }) => {
      const shiftingPage = new ShiftingContentPage(page);
      await shiftingPage.openImage(100);

      await expect(shiftingPage.shiftingImage).toBeVisible();
      await expect(shiftingPage.shiftingImage).toHaveAttribute('src', /.*avatar\.jpg/);
    });
  });

  test.describe('Typos Page', () => {
    test('51. should verify typos page content and paragraphs', async ({ page }) => {
      const typosPage = new TyposPage(page);
      await typosPage.open();

      await expect(typosPage.pageHeading).toHaveText('Typos');
      await expect(typosPage.paragraphs).toHaveCount(2);
      await expect(typosPage.paragraphs.first()).toContainText('This example demonstrates');
    });
  });

  test.describe('Form Authentication Edge Cases', () => {
    test('52. should show error when submitting empty login fields', async ({ page }) => {
      const authPage = new FormAuthPage(page);
      await authPage.open();

      await authPage.login('', '');
      await expect(authPage.flashMessage).toContainText('Your username is invalid!');
    });

    test('53. should mask password input field with type password', async ({ page }) => {
      const authPage = new FormAuthPage(page);
      await authPage.open();

      await expect(authPage.passwordInput).toHaveAttribute('type', 'password');
    });
  });

  test.describe('Dropdown Keyboard Navigation', () => {
    test('54. should navigate and select dropdown option via ArrowDown key', async ({ page }) => {
      const dropdownPage = new DropdownPage(page);
      await dropdownPage.open();

      await dropdownPage.dropdown.focus();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const selectedVal = await dropdownPage.getSelectedValue();
      expect(['1', '2']).toContain(selectedVal);
    });
  });

  test.describe('Checkboxes Keyboard Navigation', () => {
    test('55. should toggle checkbox using keyboard Space key', async ({ page }) => {
      const checkboxesPage = new CheckboxesPage(page);
      await checkboxesPage.open();

      const firstBox = checkboxesPage.checkboxes.nth(0);
      await firstBox.focus();
      await page.keyboard.press('Space');
      await expect(firstBox).toBeChecked();

      await page.keyboard.press('Space');
      await expect(firstBox).not.toBeChecked();
    });
  });

  test.describe('Add/Remove Elements Batch Performance', () => {
    test('56. should handle rapid batch addition and deletion of 10 elements', async ({ page }) => {
      const addRemovePage = new AddRemoveElementsPage(page);
      await addRemovePage.open();

      await addRemovePage.addElements(10);
      await expect(addRemovePage.deleteBtns).toHaveCount(10);

      for (let i = 0; i < 5; i++) {
        await addRemovePage.deleteFirstElement();
      }
      await expect(addRemovePage.deleteBtns).toHaveCount(5);
    });
  });

  test.describe('Data Tables Deep Sort Checks', () => {
    test('57. should sort Table 2 numerically by Due column', async ({ page }) => {
      const tablesPage = new TablesPage(page);
      await tablesPage.open();

      await tablesPage.sortByHeader(2, 'Due');
      const dueTexts = await tablesPage.getColumnValues(2, 4);

      const dueNumbers = dueTexts.map(val => parseFloat(val.replace('$', '')));
      const sortedDueNumbers = [...dueNumbers].sort((a, b) => a - b);
      expect(dueNumbers).toEqual(sortedDueNumbers);
    });

    test('58. should sort Table 1 alphabetically by Email column', async ({ page }) => {
      const tablesPage = new TablesPage(page);
      await tablesPage.open();

      const initialEmails = await tablesPage.getColumnValues(1, 3);
      await tablesPage.sortByHeader(1, 'Email');
      const sortedEmails = await tablesPage.getColumnValues(1, 3);

      const expectedSorted = [...initialEmails].sort((a, b) => a.localeCompare(b));
      expect(sortedEmails).toEqual(expectedSorted);
    });
  });

  test.describe('Dropdown Disabled Option', () => {
    test('59. should verify placeholder option in dropdown is disabled', async ({ page }) => {
      const dropdownPage = new DropdownPage(page);
      await dropdownPage.open();

      const defaultOption = dropdownPage.dropdown.locator('option').first();
      await expect(defaultOption).toBeDisabled();
      await expect(defaultOption).toHaveText('Please select an option');
    });
  });

  test.describe('Secure File Download', () => {
    test('60. should access secure download area with credentials and list files', async ({ browser }) => {
      const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin',
        },
      });
      const page = await context.newPage();
      await page.goto('https://the-internet.herokuapp.com/download_secure');

      await expect(page.locator('h3')).toHaveText('Secure File Downloader');
      const downloadLinks = page.locator('.example a');
      expect(await downloadLinks.count()).toBeGreaterThan(0);
      await context.close();
    });
  });
});
