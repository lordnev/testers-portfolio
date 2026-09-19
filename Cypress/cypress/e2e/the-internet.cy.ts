import { LoginPage } from '../pages/the-internet/LoginPage';
import { CheckboxesPage } from '../pages/the-internet/CheckboxesPage';
import { DropdownPage } from '../pages/the-internet/DropdownPage';
import { DynamicContentPage } from '../pages/the-internet/DynamicContentPage';
import { ElementsPage } from '../pages/the-internet/ElementsPage';
import { InputsPage } from '../pages/the-internet/InputsPage';
import { AddRemovePage } from '../pages/the-internet/AddRemovePage';
import { AlertsPage } from '../pages/the-internet/AlertsPage';
import { FramesPage } from '../pages/the-internet/FramesPage';
import { ChallengesPage } from '../pages/the-internet/ChallengesPage';
import { DynamicLoadingPage } from '../pages/the-internet/DynamicLoadingPage';
import { HandlingCookiesPage } from '../pages/the-internet/HandlingCookiesPage';
import { BrokenImagesPage } from '../pages/the-internet/BrokenImagesPage';
import { DisabledElementsPage } from '../pages/the-internet/DisabledElementsPage';
import { FixedHeaderPage } from '../pages/the-internet/FixedHeaderPage';
import { PaginationPage } from '../pages/the-internet/PaginationPage';
import { SessionPage } from '../pages/the-internet/SessionPage';
import { SortableTablePage } from '../pages/the-internet/SortableTablePage';
import { AbelianGroupPage } from '../pages/the-internet/AbelianGroupPage';
import { CustomDropdownPage } from '../pages/the-internet/CustomDropdownPage';
import { DynamicControlsPage } from '../pages/the-internet/DynamicControlsPage';
import { ForgetPasswordPage } from '../pages/the-internet/ForgetPasswordPage';
import { MultipleWindowsPage } from '../pages/the-internet/MultipleWindowsPage';
import { NotificationsPage } from '../pages/the-internet/NotificationsPage';
import { PasswordCheckPage } from '../pages/the-internet/PasswordCheckPage';
import { RhymePage } from '../pages/the-internet/RhymePage';

describe('The Internet Professional Test Suite', () => {
  const loginPage = new LoginPage();
  const checkboxesPage = new CheckboxesPage();
  const dropdownPage = new DropdownPage();
  const dynamicPage = new DynamicContentPage();
  const elementsPage = new ElementsPage();
  const inputsPage = new InputsPage();
  const addRemovePage = new AddRemovePage();
  const alertsPage = new AlertsPage();
  const framesPage = new FramesPage();
  const challengesPage = new ChallengesPage();
  const loadingPage = new DynamicLoadingPage();
  const cookiesPage = new HandlingCookiesPage();
  const imagesPage = new BrokenImagesPage();
  const disabledPage = new DisabledElementsPage();
  const headerPage = new FixedHeaderPage();
  const paginationPage = new PaginationPage();
  const sessionPage = new SessionPage();
  const sortablePage = new SortableTablePage();
  const abelianPage = new AbelianGroupPage();
  const customDropdownPage = new CustomDropdownPage();
  const dynamicControlsPage = new DynamicControlsPage();
  const forgetPasswordPage = new ForgetPasswordPage();
  const multipleWindowsPage = new MultipleWindowsPage();
  const notificationsPage = new NotificationsPage();
  const passwordCheckPage = new PasswordCheckPage();
  const rhymePage = new RhymePage();

  describe('Login Tests', () => {
    beforeEach(() => loginPage.visit('login'));

    it('should log in successfully with valid credentials', () => {
      loginPage.login('tomsmith', 'SuperSecretPassword!');
      loginPage.verifyFlashMessage('You logged into a secure area!');
    });

    it('should show error message with invalid credentials', () => {
      loginPage.login('invalidUser', 'wrongPassword');
      loginPage.verifyFlashMessage('Your username is invalid!');
    });

    it('should show error message with empty fields', () => {
      loginPage.login('', '');
      loginPage.verifyFlashMessage('Your username is invalid!');
    });
  });

  describe('Checkboxes Tests', () => {
    beforeEach(() => checkboxesPage.visit('checkboxes'));

    it('should check an unchecked checkbox', () => {
      checkboxesPage.toggleCheckbox(0, true);
      checkboxesPage.verifyCheckboxState(0, true);
    });

    it('should uncheck a checked checkbox', () => {
      checkboxesPage.toggleCheckbox(1, false);
      checkboxesPage.verifyCheckboxState(1, false);
    });
  });

  describe('Dropdown Tests', () => {
    beforeEach(() => dropdownPage.visit('dropdown'));

    it('should select an option by text', () => {
      dropdownPage.selectByText('Option 1');
      dropdownPage.verifySelection('Option 1');
    });

    it('should select another option and verify', () => {
      dropdownPage.selectByText('Option 2');
      dropdownPage.verifySelection('Option 2');
    });

    it('should verify default selection is correct', () => {
      dropdownPage.verifySelection('Please select an option');
    });
  });

  describe('Dynamic Content Tests', () => {
    beforeEach(() => dynamicPage.visit('dynamic_content'));

    it('should change text after clicking start', () => {
      cy.get('#content').invoke('text').then((oldText) => {
        dynamicPage.clickStart();
        dynamicPage.verifyContentChanged(oldText);
      });
    });

    it('should change text again on second click', () => {
      cy.get('#content').invoke('text').then((oldText) => {
        dynamicPage.clickStart();
        cy.get('#content').invoke('text').then((newText) => {
          dynamicPage.clickStart();
          dynamicPage.verifyContentChanged(newText);
        });
      });
    });
  });

  describe('Elements Tests', () => {
    beforeEach(() => elementsPage.visit('elements'));

    it('should drag and drop element', () => {
      elementsPage.dragAndDrop();
      cy.get('#droppable').should('contain', 'dropped');
    });

    it('should upload a file successfully', () => {
      elementsPage.uploadFile('cypress/fixtures/example.txt');
      elementsPage.verifyUploadSuccess();
    });
  });

  describe('Inputs Tests', () => {
    beforeEach(() => inputsPage.visit('inputs'));

    it('should type text into input field', () => {
      inputsPage.typeText('Cypress Professional');
      inputsPage.verifyValue('Cypress Professional');
    });

    it('should clear text from input field', () => {
      inputsPage.typeText('Delete me');
      inputsPage.clearText();
      inputsPage.verifyValue('');
    });

    it('should handle maximum input length', () => {
      const longText = 'a'.repeat(100);
      inputsPage.typeText(longText);
      inputsPage.verifyValue(longText);
    });
  });

  describe('Add/Remove Elements Tests', () => {
    beforeEach(() => addRemovePage.visit('add_remove'));

    it('should add a new element', () => {
      addRemovePage.addElement();
      addRemovePage.verifyElementVisible(true);
    });

    it('should remove an added element', () => {
      addRemovePage.addElement();
      addRemovePage.removeElement();
      addRemovePage.verifyElementVisible(false);
    });
  });

  describe('JS Alerts Tests', () => {
    beforeEach(() => alertsPage.visit('javascript_alerts'));

    it('should handle confirm alert', () => {
      alertsPage.confirmAlert();
    });

    it('should handle dismiss alert', () => {
      alertsPage.dismissAlert();
    });

    it('should handle prompt alert', () => {
      alertsPage.promptAlert('Cypress User');
    });
  });

  describe('Frames Tests', () => {
    beforeEach(() => framesPage.visit('frames'));

    it('should verify text in the first frame', () => {
      framesPage.verifyFrameText(0, 'Hello world!');
    });

    it('should verify text in the second frame', () => {
      framesPage.verifyFrameText(1, 'Hello world!');
    });

    it('should switch and interact with frame content', () => {
      framesPage.switchToFrame(0);
    });
  });

  describe('Challenges Tests', () => {
    beforeEach(() => challengesPage.visit('challenges'));

    it('should handle hover menu', () => {
      challengesPage.hoverOverUserMenu();
    });

    it('should perform complex drag and drop', () => {
      challengesPage.complexDragAndDrop();
    });

    it('should verify drag target state', () => {
      challengesPage.complexDragAndDrop();
      cy.get('#drag-target').should('contain', 'dropped');
    });
  });

  describe('Dynamic Loading Tests', () => {
    beforeEach(() => loadingPage.visit('dynamic_loading/1'));

    it('should wait for element to appear', () => {
      loadingPage.clickStart();
      loadingPage.verifyFinishTextVisible();
    });

    it('should verify loading state', () => {
      loadingPage.clickStart();
      cy.get('#loading').should('be.visible');
    });
  });

  describe('Cookies Tests', () => {
    beforeEach(() => cookiesPage.visit('cookies'));

    it('should verify initial cookie value', () => {
      cookiesPage.verifyCookieValue('webdriverjs', 'true');
    });

    it('should verify cookie exists', () => {
      cy.getCookie('webdriverjs').should('exist');
    });
  });

  describe('Broken Images Tests', () => {
    beforeEach(() => imagesPage.visit('broken_images'));

    it('should check if all images are loaded', () => {
      imagesPage.verifyImagesLoaded();
    });

    it('should verify image attributes', () => {
      cy.get('img').should('have.length.at.least', 1);
    });
  });

  describe('Disabled Elements Tests', () => {
    beforeEach(() => disabledPage.visit('disabled_elements'));

    it('should verify input is disabled', () => {
      disabledPage.verifyInputDisabled();
    });

    it('should verify field cannot be focused', () => {
      disabledPage.verifyInputDisabled();
      cy.get('#disabled_field').should('not.be.focused');
    });
  });

  describe('Fixed Header Tests', () => {
    beforeEach(() => headerPage.visit('fixed_header'));

    it('should scroll to target element', () => {
      headerPage.scrollToElement();
      headerPage.verifyElementVisible();
    });

    it('should verify element is in view', () => {
      headerPage.scrollToElement();
      headerPage.verifyElementVisible();
    });
  });

  describe('Pagination Tests', () => {
    beforeEach(() => {
      paginationPage.visit('pagination');
      paginationPage.verifyPageNumber('1');
    });

    it('should navigate to next page', () => {
      paginationPage.clickNext();
      paginationPage.verifyPageNumber('2');
    });

    it('should navigate back to previous page', () => {
      paginationPage.clickNext();
      paginationPage.clickPrev();
      paginationPage.verifyPageNumber('1');
    });
  });

  describe('Session Tests', () => {
    beforeEach(() => sessionPage.visit('session'));

    it('should verify active session state', () => {
      sessionPage.verifySessionActive();
    });

    it('should verify session persists after reload', () => {
      sessionPage.verifySessionActive();
      cy.reload();
      sessionPage.verifySessionActive();
    });
  });

  describe('Sortable Table Tests', () => {
    beforeEach(() => sortablePage.visit('sortable'));

    it('should sort by column ascending', () => {
      sortablePage.sortByColumn('First Name');
      sortablePage.verifyFirstRowValue(0, 'A');
    });

    it('should sort by column descending', () => {
      sortablePage.sortByColumn('First Name');
      sortablePage.sortByColumn('First Name');
      sortablePage.verifyFirstRowValue(0, 'Z');
    });

    it('should verify sorting order of multiple rows', () => {
      sortablePage.sortByColumn('Last Name');
      cy.get('tbody tr').should('have.length.at.least', 1);
    });
  });

  describe('Extra File Upload Tests', () => {
    beforeEach(() => elementsPage.visit('elements'));

    it('should verify upload field is visible', () => {
      cy.get('#file-upload').should('be.visible');
    });

    it('should verify upload status message', () => {
      elementsPage.uploadFile('cypress/fixtures/example.txt');
      elementsPage.verifyUploadSuccess();
    });
  });

  describe('Abelian Group Tests', () => {
    beforeEach(() => abelianPage.visit('abelian_group'));

    it('should verify group elements are visible', () => {
      abelianPage.verifyGroupElements();
    });

    it('should verify identity element is present', () => {
      abelianPage.verifyIdentityElement();
    });
  });

  describe('Custom Dropdown Tests', () => {
    beforeEach(() => customDropdownPage.visit('custom_dropdown'));

    it('should select an option from custom dropdown', () => {
      customDropdownPage.selectOption('Option 1');
      customDropdownPage.verifySelection('Option 1');
    });

    it('should select another option and verify', () => {
      customDropdownPage.selectOption('Option 2');
      customDropdownPage.verifySelection('Option 2');
    });
  });

  describe('Dynamic Controls Tests', () => {
    beforeEach(() => dynamicControlsPage.visit('dynamic_controls'));

    it('should remove element and verify it is gone', () => {
      dynamicControlsPage.removeElement();
      dynamicControlsPage.verifyElementGone();
    });

    it('should edit and save text', () => {
      dynamicControlsPage.editAndSave('New Professional Text');
      dynamicControlsPage.verifyUpdatedText('New Professional Professional Text');
    });

    it('should verify initial state', () => {
      cy.get('#dynamic_controls_example').should('be.visible');
    });
  });

  describe('Forgot Password Tests', () => {
    beforeEach(() => forgetPasswordPage.visit('forgot_password'));

    it('should attempt recovery with valid email', () => {
      forgetPasswordPage.recoverPassword('test@example.com');
      forgetPasswordPage.verifySuccessMessage();
    });

    it('should attempt recovery with invalid email', () => {
      forgetPasswordPage.recoverPassword('invalid-email');
      forgetPasswordPage.verifyErrorMessage();
    });
  });

  describe('Multiple Windows Tests', () => {
    beforeEach(() => multipleWindowsPage.visit('windows'));

    it('should open a new window and verify content', () => {
      multipleWindowsPage.openWindow();
      multipleWindowsPage.verifyWindowContent('Here is the page you wanted');
    });

    it('should verify multiple windows are handled', () => {
      multipleWindowsPage.openWindow();
      cy.get('a').should('have.length.at.least', 1);
    });

    it('should verify parent window still exists', () => {
      multipleWindowsPage.openWindow();
      cy.window().should('exist');
    });
  });

  describe('Notifications Tests', () => {
    beforeEach(() => notificationsPage.visit('notifications'));

    it('should trigger and verify notification text', () => {
      notificationsPage.addNotification();
      notificationsPage.verifyNotificationText('Added successfully');
    });

    it('should verify notification is visible', () => {
      notificationsPage.addNotification();
      cy.get('.flash').should('be.visible');
    });

    it('should close notification by clicking it', () => {
      notificationsPage.addNotification();
      notificationsPage.closeNotification();
      cy.get('.flash').should('not.exist');
    });
  });

  describe('Password Check Tests', () => {
    beforeEach(() => passwordCheckPage.visit('password_check'));

    it('should verify weak password does not trigger checkmark', () => {
      passwordCheckPage.typePassword('123');
      passwordCheckPage.verifyCheckmark(false);
    });

    it('should verify strong password triggers checkmark', () => {
      passwordCheckPage.typePassword('Abc12345!');
      passwordCheckPage.verifyCheckmark(true);
    });
  });

  describe('Rhymes Tests', () => {
    beforeEach(() => rhymePage.visit('rhymes'));

    it('should search for a rhyme and verify results', () => {
      rhymePage.searchRhyme('cat');
      rhymePage.verifyRhymesFound();
    });

    it('should verify no rhymes for random string', () => {
      rhymePage.searchRhyme('asdfghjkl123');
      cy.get('.rhymeword').should('not.exist');
    });
  });

  describe('Edge Case & Regression Tests', () => {
    beforeEach(() => {
      // Navigation is handled per test
    });

    it('should verify login default state', () => {
      loginPage.visit('login');
      cy.get('#username').should('have.value', '');
    });

    it('should verify dropdown default state', () => {
      dropdownPage.visit('dropdown');
      dropdownPage.verifySelection('Please select an option');
    });

    it('should verify input field limits', () => {
      inputsPage.visit('inputs');
      const longText = 'a'.repeat(255);
      inputsPage.typeText(longText);
      inputsPage.verifyValue(longText);
    });
  });
});
