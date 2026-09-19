import { test as base, expect } from '@playwright/test';
import * as pom from './index';

type InternetFixtures = {
  homePage: pom.TheInternetHomePage;
  addRemovePage: pom.AddRemoveElementsPage;
  checkboxesPage: pom.CheckboxesPage;
  dropdownPage: pom.DropdownPage;
  dynamicControlsPage: pom.DynamicControlsPage;
  dynamicLoadingPage: pom.DynamicLoadingPage;
  authPage: pom.FormAuthPage;
  hoversPage: pom.HoversPage;
  alertsPage: pom.JsAlertsPage;
  uploadDownloadPage: pom.UploadDownloadPage;
  tablesPage: pom.TablesPage;
  keyPressPage: pom.KeyPressesPage;
  brokenImagesPage: pom.BrokenImagesPage;
  challengingDomPage: pom.ChallengingDomPage;
  contextMenuPage: pom.ContextMenuPage;
  dragDropPage: pom.DragAndDropPage;
  entryAdPage: pom.EntryAdPage;
  floatingMenuPage: pom.FloatingMenuPage;
  forgotPasswordPage: pom.ForgotPasswordPage;
  framesPage: pom.FramesPage;
  sliderPage: pom.HorizontalSliderPage;
  inputsPage: pom.InputsPage;
  windowsPage: pom.MultipleWindowsPage;
  notificationPage: pom.NotificationMessagePage;
  statusPage: pom.StatusCodesPage;
  shadowPage: pom.ShadowDomPage;
  largeDomPage: pom.LargeDomPage;
  abPage: pom.ABTestingPage;
  geoPage: pom.GeolocationPage;
  scrollPage: pom.InfiniteScrollPage;
  exitIntentPage: pom.ExitIntentPage;
  shiftingPage: pom.ShiftingContentPage;
  typosPage: pom.TyposPage;
};

export const test = base.extend<InternetFixtures>({
  homePage: async ({ page }, use) => {
    const p = new pom.TheInternetHomePage(page);
    await p.open();
    await use(p);
  },
  addRemovePage: async ({ page }, use) => {
    const p = new pom.AddRemoveElementsPage(page);
    await p.open();
    await use(p);
  },
  checkboxesPage: async ({ page }, use) => {
    const p = new pom.CheckboxesPage(page);
    await p.open();
    await use(p);
  },
  dropdownPage: async ({ page }, use) => {
    const p = new pom.DropdownPage(page);
    await p.open();
    await use(p);
  },
  dynamicControlsPage: async ({ page }, use) => {
    const p = new pom.DynamicControlsPage(page);
    await p.open();
    await use(p);
  },
  dynamicLoadingPage: async ({ page }, use) => {
    await use(new pom.DynamicLoadingPage(page));
  },
  authPage: async ({ page }, use) => {
    const p = new pom.FormAuthPage(page);
    await p.open();
    await use(p);
  },
  hoversPage: async ({ page }, use) => {
    const p = new pom.HoversPage(page);
    await p.open();
    await use(p);
  },
  alertsPage: async ({ page }, use) => {
    const p = new pom.JsAlertsPage(page);
    await p.open();
    await use(p);
  },
  uploadDownloadPage: async ({ page }, use) => {
    await use(new pom.UploadDownloadPage(page));
  },
  tablesPage: async ({ page }, use) => {
    const p = new pom.TablesPage(page);
    await p.open();
    await use(p);
  },
  keyPressPage: async ({ page }, use) => {
    const p = new pom.KeyPressesPage(page);
    await p.open();
    await use(p);
  },
  brokenImagesPage: async ({ page }, use) => {
    const p = new pom.BrokenImagesPage(page);
    await p.open();
    await use(p);
  },
  challengingDomPage: async ({ page }, use) => {
    const p = new pom.ChallengingDomPage(page);
    await p.open();
    await use(p);
  },
  contextMenuPage: async ({ page }, use) => {
    const p = new pom.ContextMenuPage(page);
    await p.open();
    await use(p);
  },
  dragDropPage: async ({ page }, use) => {
    const p = new pom.DragAndDropPage(page);
    await p.open();
    await use(p);
  },
  entryAdPage: async ({ page }, use) => {
    const p = new pom.EntryAdPage(page);
    await p.open();
    await use(p);
  },
  floatingMenuPage: async ({ page }, use) => {
    const p = new pom.FloatingMenuPage(page);
    await p.open();
    await use(p);
  },
  forgotPasswordPage: async ({ page }, use) => {
    const p = new pom.ForgotPasswordPage(page);
    await p.open();
    await use(p);
  },
  framesPage: async ({ page }, use) => {
    await use(new pom.FramesPage(page));
  },
  sliderPage: async ({ page }, use) => {
    const p = new pom.HorizontalSliderPage(page);
    await p.open();
    await use(p);
  },
  inputsPage: async ({ page }, use) => {
    const p = new pom.InputsPage(page);
    await p.open();
    await use(p);
  },
  windowsPage: async ({ page }, use) => {
    const p = new pom.MultipleWindowsPage(page);
    await p.open();
    await use(p);
  },
  notificationPage: async ({ page }, use) => {
    const p = new pom.NotificationMessagePage(page);
    await p.open();
    await use(p);
  },
  statusPage: async ({ page }, use) => {
    await use(new pom.StatusCodesPage(page));
  },
  shadowPage: async ({ page }, use) => {
    const p = new pom.ShadowDomPage(page);
    await p.open();
    await use(p);
  },
  largeDomPage: async ({ page }, use) => {
    const p = new pom.LargeDomPage(page);
    await p.open();
    await use(p);
  },
  abPage: async ({ page }, use) => {
    await use(new pom.ABTestingPage(page));
  },
  geoPage: async ({ page }, use) => {
    const p = new pom.GeolocationPage(page);
    await p.open();
    await use(p);
  },
  scrollPage: async ({ page }, use) => {
    const p = new pom.InfiniteScrollPage(page);
    await p.open();
    await use(p);
  },
  exitIntentPage: async ({ page }, use) => {
    const p = new pom.ExitIntentPage(page);
    await p.open();
    await use(p);
  },
  shiftingPage: async ({ page }, use) => {
    await use(new pom.ShiftingContentPage(page));
  },
  typosPage: async ({ page }, use) => {
    const p = new pom.TyposPage(page);
    await p.open();
    await use(p);
  },
});

export { expect };
