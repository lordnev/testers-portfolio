import { test, expect } from '@playwright/test';
import { TheInternetHomePage } from '../../PageObjects/the-internet/TheInternetHomePage';
import { AddRemoveElementsPage } from '../../PageObjects/the-internet/AddRemoveElementsPage';
import { CheckboxesPage } from '../../PageObjects/the-internet/CheckboxesPage';
import { DropdownPage } from '../../PageObjects/the-internet/DropdownPage';
import { DynamicControlsPage } from '../../PageObjects/the-internet/DynamicControlsPage';
import { DynamicLoadingPage } from '../../PageObjects/the-internet/DynamicLoadingPage';
import { FormAuthPage } from '../../PageObjects/the-internet/FormAuthPage';
import { HoversPage } from '../../PageObjects/the-internet/HoversPage';
import { JsAlertsPage } from '../../PageObjects/the-internet/JsAlertsPage';
import { UploadDownloadPage } from '../../PageObjects/the-internet/UploadDownloadPage';
import { TablesPage } from '../../PageObjects/the-internet/TablesPage';
import { KeyPressesPage } from '../../PageObjects/the-internet/KeyPressesPage';
import { BrokenImagesPage } from '../../PageObjects/the-internet/BrokenImagesPage';
import { ChallengingDomPage } from '../../PageObjects/the-internet/ChallengingDomPage';
import { ContextMenuPage } from '../../PageObjects/the-internet/ContextMenuPage';
import { DragAndDropPage } from '../../PageObjects/the-internet/DragAndDropPage';
import { EntryAdPage } from '../../PageObjects/the-internet/EntryAdPage';
import { FloatingMenuPage } from '../../PageObjects/the-internet/FloatingMenuPage';
import { ForgotPasswordPage } from '../../PageObjects/the-internet/ForgotPasswordPage';
import { FramesPage } from '../../PageObjects/the-internet/FramesPage';
import { HorizontalSliderPage } from '../../PageObjects/the-internet/HorizontalSliderPage';
import { InputsPage } from '../../PageObjects/the-internet/InputsPage';
import { MultipleWindowsPage } from '../../PageObjects/the-internet/MultipleWindowsPage';
import { NotificationMessagePage } from '../../PageObjects/the-internet/NotificationMessagePage';
import { StatusCodesPage } from '../../PageObjects/the-internet/StatusCodesPage';
import { ShadowDomPage } from '../../PageObjects/the-internet/ShadowDomPage';
import { LargeDomPage } from '../../PageObjects/the-internet/LargeDomPage';
import { ABTestingPage } from '../../PageObjects/the-internet/ABTestingPage';
import { GeolocationPage } from '../../PageObjects/the-internet/GeolocationPage';
import { InfiniteScrollPage } from '../../PageObjects/the-internet/InfiniteScrollPage';
import { ExitIntentPage } from '../../PageObjects/the-internet/ExitIntentPage';
import { ShiftingContentPage } from '../../PageObjects/the-internet/ShiftingContentPage';
import { TyposPage } from '../../PageObjects/the-internet/TyposPage';
import * as path from 'path';
import * as fs from 'fs';

test.describe('The Internet Herokuapp - Modern Playwright Suite @ui', () => {
  test.describe.configure({ retries: 1 });

  // --- Navigation & Core Elements ---
  test('Home page structure and link navigation @smoke', async ({ page }) => {
    const homePage = new TheInternetHomePage(page);
    await homePage.navigateTo('');
    await expect(homePage.heading).toHaveText('Welcome to the-internet');
    await expect(homePage.availableExamples).toHaveCount(44);

    await homePage.clickExampleLink('Checkboxes');
    await expect(page).toHaveURL(/.*\/checkboxes/);
  });

  test('Add/Remove elements dynamic lifecycle @smoke', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page);
    await addRemovePage.navigateTo('/add_remove_elements/');

    await expect(addRemovePage.deleteBtns).toHaveCount(0);
    await addRemovePage.addElements(3);
    await expect(addRemovePage.deleteBtns).toHaveCount(3);
    await addRemovePage.deleteFirstElement();
    await expect(addRemovePage.deleteBtns).toHaveCount(2);
    await addRemovePage.deleteAllElements();
    await expect(addRemovePage.deleteBtns).toHaveCount(0);
  });

  test('Batch addition and deletion performance @regression', async ({ page }) => {
    const addRemovePage = new AddRemoveElementsPage(page);
    await addRemovePage.navigateTo('/add_remove_elements/');

    await addRemovePage.addElements(10);
    await expect(addRemovePage.deleteBtns).toHaveCount(10);
    for (let i = 0; i < 5; i++) await addRemovePage.deleteFirstElement();
    await expect(addRemovePage.deleteBtns).toHaveCount(5);
  });

  test('Checkbox toggle state and keyboard spacebar interaction @smoke', async ({ page }) => {
    const checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.navigateTo('/checkboxes');

    const [box1, box2] = [checkboxesPage.checkboxes.nth(0), checkboxesPage.checkboxes.nth(1)];
    await expect(box1).not.toBeChecked();
    await expect(box2).toBeChecked();

    await checkboxesPage.setCheckbox(0, true);
    await checkboxesPage.setCheckbox(1, false);
    await expect(box1).toBeChecked();
    await expect(box2).not.toBeChecked();

    await box1.focus();
    await page.keyboard.press('Space');
    await expect(box1).not.toBeChecked();
  });

  // --- Form Controls & Inputs ---
  test('Dropdown select, keyboard navigation and placeholder state @smoke', async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.navigateTo('/dropdown');

    await expect(dropdownPage.dropdown.locator('option').first()).toBeDisabled();

    await dropdownPage.selectByValue('1');
    expect(await dropdownPage.getSelectedValue()).toBe('1');

    await dropdownPage.selectByLabel('Option 2');
    expect(await dropdownPage.getSelectedValue()).toBe('2');

    await dropdownPage.dropdown.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    expect(['1', '2']).toContain(await dropdownPage.getSelectedValue());
  });

  test('Dynamic Controls: async checkbox & input field states @smoke', async ({ page }) => {
    const dynamicControlsPage = new DynamicControlsPage(page);
    await dynamicControlsPage.navigateTo('/dynamic_controls');

    await expect(dynamicControlsPage.checkbox).toBeVisible();
    await dynamicControlsPage.clickRemoveAdd();
    await expect(dynamicControlsPage.message).toHaveText("It's gone!", { timeout: 10000 });
    await expect(dynamicControlsPage.checkbox).toHaveCount(0);

    await dynamicControlsPage.clickRemoveAdd();
    await expect(dynamicControlsPage.message).toHaveText("It's back!", { timeout: 10000 });
    await expect(dynamicControlsPage.checkbox).toBeVisible();

    await expect(dynamicControlsPage.inputField).toBeDisabled();
    await dynamicControlsPage.clickEnableDisable();
    await expect(dynamicControlsPage.message).toHaveText("It's enabled!", { timeout: 10000 });
    await expect(dynamicControlsPage.inputField).toBeEnabled();

    await dynamicControlsPage.inputField.fill('Playwright Modern Test');
    await expect(dynamicControlsPage.inputField).toHaveValue('Playwright Modern Test');

    await dynamicControlsPage.clickEnableDisable();
    await expect(dynamicControlsPage.message).toHaveText("It's disabled!", { timeout: 10000 });
    await expect(dynamicControlsPage.inputField).toBeDisabled();
  });

  test('Number inputs typing, arrows increment and bounds @regression', async ({ page }) => {
    const inputsPage = new InputsPage(page);
    await inputsPage.navigateTo('/inputs');

    await inputsPage.fillNumber('10');
    await expect(inputsPage.numberInput).toHaveValue('10');
    await inputsPage.stepWithArrow('Up');
    await expect(inputsPage.numberInput).toHaveValue('11');
    await inputsPage.stepWithArrow('Down');
    await inputsPage.stepWithArrow('Down');
    await expect(inputsPage.numberInput).toHaveValue('9');
  });

  test('Horizontal slider adjustment via keyboard @regression', async ({ page }) => {
    const sliderPage = new HorizontalSliderPage(page);
    await sliderPage.navigateTo('/horizontal_slider');

    await sliderPage.setSliderValueWithKeys(3.5);
    await expect(sliderPage.rangeValue).toHaveText('3.5');
  });

  // --- Parameterized Dynamic Loading ---
  for (const exampleId of [1, 2] as const) {
    test(`Dynamic Loading: Example ${exampleId} @smoke`, async ({ page }) => {
      const dynamicLoadingPage = new DynamicLoadingPage(page);
      await dynamicLoadingPage.navigateTo(`/dynamic_loading/${exampleId}`);
      await dynamicLoadingPage.startAndWaitForFinish();
      await expect(dynamicLoadingPage.finishText).toHaveText('Hello World!');
    });
  }

  // --- Authentication ---
  test('Form Authentication: valid, invalid and empty credentials @smoke', async ({ page }) => {
    const authPage = new FormAuthPage(page);
    await authPage.navigateTo('/login');

    await expect(authPage.passwordInput).toHaveAttribute('type', 'password');

    await authPage.login('', '');
    await expect(authPage.flashMessage).toContainText('Your username is invalid!');

    await authPage.login('invalidUser', 'wrongPassword');
    await expect(authPage.flashMessage).toContainText('Your username is invalid!');

    await authPage.login('tomsmith', 'SuperSecretPassword!');
    await expect(page).toHaveURL(/.*\/secure/);
    await expect(authPage.flashMessage).toContainText('You logged into a secure area!');

    await authPage.logout();
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('HTTP Basic Auth via browser context @regression', async ({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('h3')).toHaveText('Basic Auth');
    await expect(page.locator('.example p')).toContainText('Congratulations!');
    await context.close();
  });

  test('HTTP Digest Auth via browser context @regression', async ({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/digest_auth');
    await expect(page.locator('h3')).toHaveText('Digest Auth');
    await expect(page.locator('.example p')).toContainText('Congratulations!');
    await context.close();
  });

  // --- User Interactions & Dialogs ---
  test('Hovers: reveal figures captions dynamically @regression', async ({ page }) => {
    const hoversPage = new HoversPage(page);
    await hoversPage.navigateTo('/hovers');

    const count = await hoversPage.figures.count();
    for (let i = 0; i < count; i++) {
      await hoversPage.hoverFigure(i);
      const caption = hoversPage.getFigureCaption(i);
      await expect(caption).toBeVisible();
      await expect(caption.locator('h5')).toHaveText(`name: user${i + 1}`);
    }
  });

  test('JavaScript Dialogs: Alert, Confirm and Prompt @smoke', async ({ page }) => {
    const alertsPage = new JsAlertsPage(page);
    await alertsPage.navigateTo('/javascript_alerts');

    expect(await alertsPage.triggerAlertAndAccept()).toBe('I am a JS Alert');
    await expect(alertsPage.resultText).toHaveText('You successfully clicked an alert');

    await alertsPage.triggerConfirm(true);
    await expect(alertsPage.resultText).toHaveText('You clicked: Ok');

    await alertsPage.triggerConfirm(false);
    await expect(alertsPage.resultText).toHaveText('You clicked: Cancel');

    await alertsPage.triggerPrompt('Playwright Modern Test');
    await expect(alertsPage.resultText).toHaveText('You entered: Playwright Modern Test');
  });

  test('Context menu right-click dialog trigger @regression', async ({ page }) => {
    const contextMenuPage = new ContextMenuPage(page);
    await contextMenuPage.navigateTo('/context_menu');

    const msg = await contextMenuPage.rightClickHotSpot();
    expect(msg).toBe('You selected a context menu');
  });

  // --- Parameterized Key Presses ---
  for (const [key, expected] of [['Shift', 'SHIFT'], ['Escape', 'ESCAPE'], ['Space', 'SPACE']]) {
    test(`Key Presses: detect ${key} event @regression`, async ({ page }) => {
      const keyPressPage = new KeyPressesPage(page);
      await keyPressPage.navigateTo('/key_presses');
      await keyPressPage.pressKey(key);
      await expect(keyPressPage.resultText).toHaveText(`You entered: ${expected}`);
    });
  }

  // --- Files, Drag & Drop, Windows ---
  test('File Upload and Download lifecycle @smoke', async ({ page }, testInfo) => {
    const uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.navigateTo('/upload');

    const tempFile = path.join(testInfo.outputDir, 'test-file.txt');
    fs.mkdirSync(testInfo.outputDir, { recursive: true });
    fs.writeFileSync(tempFile, 'Modern Playwright Upload Test');
    await uploadDownloadPage.uploadFile(tempFile);
    await expect(uploadDownloadPage.pageHeading).toHaveText('File Uploaded!');

    await uploadDownloadPage.navigateTo('/download');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      uploadDownloadPage.downloadLinks.first().click(),
    ]);
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('Secure File Download with credentials @regression', async ({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/download_secure');
    await expect(page.locator('h3')).toHaveText('Secure File Downloader');
    expect(await page.locator('.example a').count()).toBeGreaterThan(0);
    await context.close();
  });

  test('Drag and Drop column exchange @smoke', async ({ page }) => {
    const dragDropPage = new DragAndDropPage(page);
    await dragDropPage.navigateTo('/drag_and_drop');

    await expect(dragDropPage.columnAHeader).toHaveText('A');
    await dragDropPage.dragAToB();
    await expect(dragDropPage.columnAHeader).toHaveText('B');
    await dragDropPage.dragBToA();
    await expect(dragDropPage.columnAHeader).toHaveText('A');
  });

  test('Multiple Windows tab management @regression', async ({ page }) => {
    const windowsPage = new MultipleWindowsPage(page);
    await windowsPage.navigateTo('/windows');

    const newTab = await windowsPage.openNewWindow();
    await expect(newTab).toHaveURL(/.*\/windows\/new/);
    await expect(newTab.locator('h3')).toHaveText('New Window');
    await newTab.close();
  });

  // --- Frames & Nested Content ---
  test('Nested Frames multi-target content validation @regression', async ({ page }) => {
    const framesPage = new FramesPage(page);
    await framesPage.navigateTo('/nested_frames');

    for (const pos of ['LEFT', 'MIDDLE', 'RIGHT', 'BOTTOM'] as const) {
      await expect(framesPage.getNestedFrameText(pos)).toContainText(pos);
    }
  });

  test('iFrame TinyMCE WYSIWYG editor interaction @regression', async ({ page }) => {
    const framesPage = new FramesPage(page);
    await framesPage.navigateTo('/iframe');

    const message = 'Modern automated text via Playwright Fixtures!';
    await framesPage.setIframeText(message);
    await expect(framesPage.getIframeBody()).toHaveText(message);
  });

  test('Shadow DOM text piercing @regression', async ({ page }) => {
    const shadowPage = new ShadowDomPage(page);
    await shadowPage.navigateTo('/shadowdom');

    await expect(shadowPage.shadowParagraphs.first()).toHaveText("Let's have some different text!");
    await expect(page.locator('ul[slot="my-text"] li').first()).toHaveText("Let's have some different text!");
  });

  // --- Data Tables Sorting ---
  test('Data Tables: sort LastName, Email and Due columns @regression', async ({ page }) => {
    const tablesPage = new TablesPage(page);
    await tablesPage.navigateTo('/tables');

    // Table 1 Last Name
    const initialLastNames = await tablesPage.getColumnValues(1, 1);
    await tablesPage.sortByHeader(1, 'Last Name');
    expect(await tablesPage.getColumnValues(1, 1)).toEqual([...initialLastNames].sort((a, b) => a.localeCompare(b)));

    // Table 1 Email
    const initialEmails = await tablesPage.getColumnValues(1, 3);
    await tablesPage.sortByHeader(1, 'Email');
    expect(await tablesPage.getColumnValues(1, 3)).toEqual([...initialEmails].sort((a, b) => a.localeCompare(b)));

    // Table 2 Due
    await tablesPage.sortByHeader(2, 'Due');
    const dues = (await tablesPage.getColumnValues(2, 4)).map(v => parseFloat(v.replace('$', '')));
    expect(dues).toEqual([...dues].sort((a, b) => a - b));
  });

  // --- Advanced DOM, Network & Browser Features ---
  test('Broken images HTTP status validation @regression', async ({ page }) => {
    const brokenImagesPage = new BrokenImagesPage(page);
    await brokenImagesPage.navigateTo('/broken_images');

    const statuses = await brokenImagesPage.getImageStatuses();
    expect(statuses).toContain(200);
    expect(statuses).toContain(404);
  });

  test('Challenging DOM dynamic buttons and canvas @regression', async ({ page }) => {
    const challengingDomPage = new ChallengingDomPage(page);
    await challengingDomPage.navigateTo('/challenging_dom');

    await challengingDomPage.clickBlueButton();
    await challengingDomPage.clickRedAlertButton();
    await challengingDomPage.clickGreenSuccessButton();
    await expect(challengingDomPage.canvas).toBeVisible();
    await expect(challengingDomPage.editLinks).toHaveCount(10);
  });

  test('Disappearing Elements navigation links @regression', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
    const items = page.locator('.example ul li a');
    for (const name of ['Home', 'About', 'Contact Us', 'Portfolio']) {
      await expect(items.filter({ hasText: name })).toBeVisible();
    }
  });

  test('Dynamic Content changes across page reloads @regression', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_content');
    const rows = page.locator('#content .row .large-10');
    const before = await rows.allInnerTexts();
    await page.reload();
    const after = await rows.allInnerTexts();
    expect(before.some((text, i) => text !== after[i])).toBeTruthy();
  });

  test('Entry Ad: modal display and dismissal @regression', async ({ page }) => {
    const entryAdPage = new EntryAdPage(page);
    await entryAdPage.navigateTo('/entry_ad');

    await expect(entryAdPage.modal).toBeVisible({ timeout: 10000 });
    await entryAdPage.closeModal();
    await expect(entryAdPage.modal).toBeHidden();
  });

  test('Exit Intent: trigger and close modal @regression', async ({ page }) => {
    const exitIntentPage = new ExitIntentPage(page);
    await exitIntentPage.navigateTo('/exit_intent');

    await exitIntentPage.triggerExitIntent();
    await expect(exitIntentPage.modal).toBeVisible();
    await exitIntentPage.closeModal();
    await expect(exitIntentPage.modal).toBeHidden();
  });

  test('Floating Menu scrolling persistence @regression', async ({ page }) => {
    const floatingMenuPage = new FloatingMenuPage(page);
    await floatingMenuPage.navigateTo('/floating_menu');

    await expect(floatingMenuPage.menu).toBeVisible();
    await floatingMenuPage.scrollDown(2500);
    await expect(floatingMenuPage.menu).toBeVisible();
  });

  test('Forgot Password submission @regression', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.navigateTo('/forgot_password');

    await forgotPasswordPage.submitEmail('tester@example.com');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Notification Messages flash notification trigger @regression', async ({ page }) => {
    const notificationPage = new NotificationMessagePage(page);
    await notificationPage.navigateTo('/notification_message');

    await notificationPage.clickTrigger();
    await expect(notificationPage.flashMessage).toBeVisible();
    await expect(notificationPage.flashMessage).toContainText('Action');
  });

  // --- Parameterized Status Codes ---
  for (const code of [200, 301, 404, 500]) {
    test(`Status Codes: verify HTTP ${code} page @regression`, async ({ page }) => {
      const statusPage = new StatusCodesPage(page);
      await statusPage.navigateTo('/status_codes');
      await statusPage.clickStatusCode(code);
      await expect(page).toHaveURL(new RegExp(`.*\\/status_codes\\/${code}`));
      await expect(statusPage.statusText).toContainText(`This page returned a ${code} status code`);
    });
  }

  test('Redirect link chain to status codes @regression', async ({ page }) => {
    const statusPage = new StatusCodesPage(page);
    await statusPage.navigateTo('/redirector');
    await statusPage.redirectLink.click();
    await expect(page).toHaveURL(/.*\/status_codes/);
  });

  test('Large & Deep DOM coordinates query @regression', async ({ page }) => {
    const largeDomPage = new LargeDomPage(page);
    await largeDomPage.navigateTo('/large');

    await expect(largeDomPage.getCell(25, 15)).toHaveText('25.15');
    await expect(largeDomPage.getCell(50, 50)).toHaveText('50.50');
  });

  test('A/B Testing with cookie control @regression', async ({ page }) => {
    const abPage = new ABTestingPage(page);
    await abPage.navigateTo('/abtest');

    await abPage.setOptOutCookie();
    await abPage.open();
    await expect(abPage.heading).toHaveText(/A\/B Test|No A\/B Test/);
  });

  test('JavaScript Error exception interception @regression', async ({ page }) => {
    let capturedError: Error | null = null;
    page.on('pageerror', err => { capturedError = err; });
    await page.goto('https://the-internet.herokuapp.com/javascript_error');
    expect(capturedError?.message).toContain('Cannot read properties of undefined');
  });

  test('Infinite scroll dynamic paragraph loading @regression', async ({ page }) => {
    const scrollPage = new InfiniteScrollPage(page);
    await scrollPage.navigateTo('/infinite_scroll');

    const initial = await scrollPage.scrollBlocks.count();
    await scrollPage.scrollDown(2);
    await expect(async () => {
      expect(await scrollPage.scrollBlocks.count()).toBeGreaterThan(initial);
    }).toPass({ timeout: 10000 });
  });

  test('Geolocation mocking via context permissions @regression', async ({ browser }) => {
    const context = await browser.newContext({
      permissions: ['geolocation'],
      geolocation: { latitude: 52.2297, longitude: 21.0122 },
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/geolocation');
    await page.locator('.example button').click();
    await expect(page.locator('#lat-value')).toHaveText('52.2297');
    await expect(page.locator('#long-value')).toHaveText('21.0122');
    await context.close();
  });

  test('Shifting Content menu and image rendering @regression', async ({ page }) => {
    const shiftingPage = new ShiftingContentPage(page);
    await shiftingPage.navigateTo('/shifting_content/menu?mode=random');

    await shiftingPage.openMenu(100);
    await expect(shiftingPage.menuItems).toHaveCount(5);

    await shiftingPage.navigateTo('/shifting_content/image?mode=random');
    await shiftingPage.openImage(100);
    await expect(shiftingPage.shiftingImage).toBeVisible();
    await expect(shiftingPage.shiftingImage).toHaveAttribute('src', /.*avatar\.jpg/);
  });

  test('Typos page text structure validation @regression', async ({ page }) => {
    const typosPage = new TyposPage(page);
    await typosPage.navigateTo('/typos');

    await expect(typosPage.pageHeading).toHaveText('Typos');
    await expect(typosPage.paragraphs).toHaveCount(2);
  });
});