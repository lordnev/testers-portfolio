import { test, expect } from '../../PageObjects/the-internet';
import * as path from 'path';
import * as fs from 'fs';

test.describe('The Internet Herokuapp - Modern Playwright Suite', () => {

  // --- Navigation & Core Elements ---
  test('Home page structure and link navigation', async ({ homePage, page }) => {
    await expect(homePage.heading).toHaveText('Welcome to the-internet');
    await expect(homePage.availableExamples).toHaveCount(44);

    await homePage.clickExampleLink('Checkboxes');
    await expect(page).toHaveURL(/.*\/checkboxes/);
  });

  test('Add/Remove elements dynamic lifecycle', async ({ addRemovePage }) => {
    await expect(addRemovePage.deleteBtns).toHaveCount(0);
    await addRemovePage.addElements(3);
    await expect(addRemovePage.deleteBtns).toHaveCount(3);
    await addRemovePage.deleteFirstElement();
    await expect(addRemovePage.deleteBtns).toHaveCount(2);
    await addRemovePage.deleteAllElements();
    await expect(addRemovePage.deleteBtns).toHaveCount(0);
  });

  test('Batch addition and deletion performance', async ({ addRemovePage }) => {
    await addRemovePage.addElements(10);
    await expect(addRemovePage.deleteBtns).toHaveCount(10);
    for (let i = 0; i < 5; i++) await addRemovePage.deleteFirstElement();
    await expect(addRemovePage.deleteBtns).toHaveCount(5);
  });

  test('Checkbox toggle state and keyboard spacebar interaction', async ({ checkboxesPage, page }) => {
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
  test('Dropdown select, keyboard navigation and placeholder state', async ({ dropdownPage, page }) => {
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

  test('Dynamic Controls: async checkbox & input field states', async ({ dynamicControlsPage }) => {
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

  test('Number inputs typing, arrows increment and bounds', async ({ inputsPage }) => {
    await inputsPage.fillNumber('10');
    await expect(inputsPage.numberInput).toHaveValue('10');
    await inputsPage.stepWithArrow('Up');
    await expect(inputsPage.numberInput).toHaveValue('11');
    await inputsPage.stepWithArrow('Down');
    await inputsPage.stepWithArrow('Down');
    await expect(inputsPage.numberInput).toHaveValue('9');
  });

  test('Horizontal slider adjustment via keyboard', async ({ sliderPage }) => {
    await sliderPage.setSliderValueWithKeys(3.5);
    await expect(sliderPage.rangeValue).toHaveText('3.5');
  });

  // --- Parameterized Dynamic Loading ---
  for (const exampleId of [1, 2] as const) {
    test(`Dynamic Loading: Example ${exampleId}`, async ({ dynamicLoadingPage }) => {
      await dynamicLoadingPage.openExample(exampleId);
      await dynamicLoadingPage.startAndWaitForFinish();
      await expect(dynamicLoadingPage.finishText).toHaveText('Hello World!');
    });
  }

  // --- Authentication ---
  test('Form Authentication: valid, invalid and empty credentials', async ({ authPage, page }) => {
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

  test('HTTP Basic Auth via browser context', async ({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('h3')).toHaveText('Basic Auth');
    await expect(page.locator('.example p')).toContainText('Congratulations!');
    await context.close();
  });

  test('HTTP Digest Auth via browser context', async ({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/digest_auth');
    await expect(page.locator('h3')).toHaveText('Digest Auth');
    await expect(page.locator('.example p')).toContainText('Congratulations!');
    await context.close();
  });

  // --- User Interactions & Dialogs ---
  test('Hovers: reveal figures captions dynamically', async ({ hoversPage }) => {
    const count = await hoversPage.figures.count();
    for (let i = 0; i < count; i++) {
      await hoversPage.hoverFigure(i);
      const caption = hoversPage.getFigureCaption(i);
      await expect(caption).toBeVisible();
      await expect(caption.locator('h5')).toHaveText(`name: user${i + 1}`);
    }
  });

  test('JavaScript Dialogs: Alert, Confirm and Prompt', async ({ alertsPage }) => {
    expect(await alertsPage.triggerAlertAndAccept()).toBe('I am a JS Alert');
    await expect(alertsPage.resultText).toHaveText('You successfully clicked an alert');

    await alertsPage.triggerConfirm(true);
    await expect(alertsPage.resultText).toHaveText('You clicked: Ok');

    await alertsPage.triggerConfirm(false);
    await expect(alertsPage.resultText).toHaveText('You clicked: Cancel');

    await alertsPage.triggerPrompt('Playwright Modern Test');
    await expect(alertsPage.resultText).toHaveText('You entered: Playwright Modern Test');
  });

  test('Context menu right-click dialog trigger', async ({ contextMenuPage }) => {
    const msg = await contextMenuPage.rightClickHotSpot();
    expect(msg).toBe('You selected a context menu');
  });

  // --- Parameterized Key Presses ---
  for (const [key, expected] of [['Shift', 'SHIFT'], ['Escape', 'ESCAPE'], ['Space', 'SPACE']]) {
    test(`Key Presses: detect ${key} event`, async ({ keyPressPage }) => {
      await keyPressPage.pressKey(key);
      await expect(keyPressPage.resultText).toHaveText(`You entered: ${expected}`);
    });
  }

  // --- Files, Drag & Drop, Windows ---
  test('File Upload and Download lifecycle', async ({ uploadDownloadPage, page }, testInfo) => {
    await uploadDownloadPage.openUpload();
    const tempFile = path.join(testInfo.outputDir, 'test-file.txt');
    fs.mkdirSync(testInfo.outputDir, { recursive: true });
    fs.writeFileSync(tempFile, 'Modern Playwright Upload Test');
    await uploadDownloadPage.uploadFile(tempFile);
    await expect(uploadDownloadPage.pageHeading).toHaveText('File Uploaded!');

    await uploadDownloadPage.openDownload();
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      uploadDownloadPage.downloadLinks.first().click(),
    ]);
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('Secure File Download with credentials', async ({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/download_secure');
    await expect(page.locator('h3')).toHaveText('Secure File Downloader');
    expect(await page.locator('.example a').count()).toBeGreaterThan(0);
    await context.close();
  });

  test('Drag and Drop column exchange', async ({ dragDropPage }) => {
    await expect(dragDropPage.columnAHeader).toHaveText('A');
    await dragDropPage.dragAToB();
    await expect(dragDropPage.columnAHeader).toHaveText('B');
    await dragDropPage.dragBToA();
    await expect(dragDropPage.columnAHeader).toHaveText('A');
  });

  test('Multiple Windows tab management', async ({ windowsPage }) => {
    const newTab = await windowsPage.openNewWindow();
    await expect(newTab).toHaveURL(/.*\/windows\/new/);
    await expect(newTab.locator('h3')).toHaveText('New Window');
    await newTab.close();
  });

  // --- Frames & Nested Content ---
  test('Nested Frames multi-target content validation', async ({ framesPage }) => {
    await framesPage.openNestedFrames();
    for (const pos of ['LEFT', 'MIDDLE', 'RIGHT', 'BOTTOM'] as const) {
      await expect(framesPage.getNestedFrameText(pos)).toContainText(pos);
    }
  });

  test('iFrame TinyMCE WYSIWYG editor interaction', async ({ framesPage }) => {
    await framesPage.openIframe();
    const message = 'Modern automated text via Playwright Fixtures!';
    await framesPage.setIframeText(message);
    await expect(framesPage.getIframeBody()).toHaveText(message);
  });

  test('Shadow DOM text piercing', async ({ shadowPage, page }) => {
    await expect(shadowPage.shadowParagraphs.first()).toHaveText("Let's have some different text!");
    await expect(page.locator('ul[slot="my-text"] li').first()).toHaveText("Let's have some different text!");
  });

  // --- Data Tables Sorting ---
  test('Data Tables: sort LastName, Email and Due columns', async ({ tablesPage }) => {
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
  test('Broken images HTTP status validation', async ({ brokenImagesPage }) => {
    const statuses = await brokenImagesPage.getImageStatuses();
    expect(statuses).toContain(200);
    expect(statuses).toContain(404);
  });

  test('Challenging DOM dynamic buttons and canvas', async ({ challengingDomPage }) => {
    await challengingDomPage.clickBlueButton();
    await challengingDomPage.clickRedAlertButton();
    await challengingDomPage.clickGreenSuccessButton();
    await expect(challengingDomPage.canvas).toBeVisible();
    await expect(challengingDomPage.editLinks).toHaveCount(10);
  });

  test('Disappearing Elements navigation links', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
    const items = page.locator('.example ul li a');
    for (const name of ['Home', 'About', 'Contact Us', 'Portfolio']) {
      await expect(items.filter({ hasText: name })).toBeVisible();
    }
  });

  test('Dynamic Content changes across page reloads', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_content');
    const rows = page.locator('#content .row .large-10');
    const before = await rows.allInnerTexts();
    await page.reload();
    const after = await rows.allInnerTexts();
    expect(before.some((text, i) => text !== after[i])).toBeTruthy();
  });

  test('Entry Ad: modal display and dismissal', async ({ entryAdPage }) => {
    await expect(entryAdPage.modal).toBeVisible({ timeout: 10000 });
    await entryAdPage.closeModal();
    await expect(entryAdPage.modal).toBeHidden();
  });

  test('Exit Intent: trigger and close modal', async ({ exitIntentPage }) => {
    await exitIntentPage.triggerExitIntent();
    await expect(exitIntentPage.modal).toBeVisible();
    await exitIntentPage.closeModal();
    await expect(exitIntentPage.modal).toBeHidden();
  });

  test('Floating Menu scrolling persistence', async ({ floatingMenuPage }) => {
    await expect(floatingMenuPage.menu).toBeVisible();
    await floatingMenuPage.scrollDown(2500);
    await expect(floatingMenuPage.menu).toBeVisible();
  });

  test('Forgot Password submission', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.submitEmail('tester@example.com');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Notification Messages flash notification trigger', async ({ notificationPage }) => {
    await notificationPage.clickTrigger();
    await expect(notificationPage.flashMessage).toBeVisible();
    await expect(notificationPage.flashMessage).toContainText('Action');
  });

  // --- Parameterized Status Codes ---
  for (const code of [200, 301, 404, 500]) {
    test(`Status Codes: verify HTTP ${code} page`, async ({ statusPage, page }) => {
      await statusPage.openStatusCodes();
      await statusPage.clickStatusCode(code);
      await expect(page).toHaveURL(new RegExp(`.*\\/status_codes\\/${code}`));
      await expect(statusPage.statusText).toContainText(`This page returned a ${code} status code`);
    });
  }

  test('Redirect link chain to status codes', async ({ statusPage, page }) => {
    await statusPage.openRedirector();
    await statusPage.redirectLink.click();
    await expect(page).toHaveURL(/.*\/status_codes/);
  });

  test('Large & Deep DOM coordinates query', async ({ largeDomPage }) => {
    await expect(largeDomPage.getCell(25, 15)).toHaveText('25.15');
    await expect(largeDomPage.getCell(50, 50)).toHaveText('50.50');
  });

  test('A/B Testing with cookie control', async ({ abPage }) => {
    await abPage.setOptOutCookie();
    await abPage.open();
    await expect(abPage.heading).toHaveText(/A\/B Test|No A\/B Test/);
  });

  test('JavaScript Error exception interception', async ({ page }) => {
    let capturedError: Error | null = null;
    page.on('pageerror', err => { capturedError = err; });
    await page.goto('https://the-internet.herokuapp.com/javascript_error');
    expect(capturedError?.message).toContain('Cannot read properties of undefined');
  });

  test('Infinite scroll dynamic paragraph loading', async ({ scrollPage }) => {
    const initial = await scrollPage.scrollBlocks.count();
    await scrollPage.scrollDown(2);
    await expect(async () => {
      expect(await scrollPage.scrollBlocks.count()).toBeGreaterThan(initial);
    }).toPass({ timeout: 10000 });
  });

  test('Geolocation mocking via context permissions', async ({ browser }) => {
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

  test('Shifting Content menu and image rendering', async ({ shiftingPage }) => {
    await shiftingPage.openMenu(100);
    await expect(shiftingPage.menuItems).toHaveCount(5);

    await shiftingPage.openImage(100);
    await expect(shiftingPage.shiftingImage).toBeVisible();
    await expect(shiftingPage.shiftingImage).toHaveAttribute('src', /.*avatar\.jpg/);
  });

  test('Typos page text structure validation', async ({ typosPage }) => {
    await expect(typosPage.pageHeading).toHaveText('Typos');
    await expect(typosPage.paragraphs).toHaveCount(2);
});
});
