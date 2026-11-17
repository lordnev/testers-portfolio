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

describe('The Internet Professional Test Suite', { tags: ['@ui'] }, () => {
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

  describe('Login Tests', { tags: ['@smoke'] }, () => {
    beforeEach(() => loginPage.visit('login'));

    it('should log in successfully with valid credentials', () => {
      loginPage.login('tomsmith', 'SuperSecretPassword!');
      loginPage.verifyFlashMessage('You logged into a secure area!');
    });

    it('should show error message with invalid credentials', { tags: ['@negative'] }, () => {
      loginPage.login('invalidUser', 'wrongPassword');
      loginPage.verifyFlashMessage('Your username is invalid!');
    });

    it('should show error message with empty fields', { tags: ['@negative'] }, () => {
      loginPage.login('', '');
      loginPage.verifyFlashMessage('Your username is invalid!');
    });
  });

  describe('Checkboxes Tests', { tags: ['@smoke'] }, () => {
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

  describe('Dropdown Tests', { tags: ['@smoke'] }, () => {
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

  describe('Dynamic Content Tests', { tags: ['@regression'] }, () => {
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

  describe('Elements Tests', { tags: ['@regression'] }, () => {
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

  describe('Inputs Tests', { tags: ['@regression'] }, () => {
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

  describe('Add/Remove Elements Tests', { tags: ['@smoke'] }, () => {
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

  describe('JS Alerts Tests', { tags: ['@smoke'] }, () => {
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

  describe('Frames Tests', { tags: ['@regression'] }, () => {
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

  describe('Dynamic Loading Tests', { tags: ['@smoke'] }, () => {
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

  describe('Cookies Tests', { tags: ['@regression'] }, () => {
    beforeEach(() => cookiesPage.visit('cookies'));

    it('should verify initial cookie value', () => {
      cookiesPage.verifyCookieValue('webdriverjs', 'true');
    });

    it('should verify cookie exists', () => {
      cy.getCookie('webdriverjs').should('exist');
    });
  });

  describe('Broken Images Tests', { tags: ['@regression'] }, () => {
    beforeEach(() => imagesPage.visit('broken_images'));

    it('should check if all images are loaded', () => {
      imagesPage.verifyImagesLoaded();
    });

    it('should verify image attributes', () => {
      cy.get('img').should('have.length.at.least', 1);
    });
  });

  describe('Disabled Elements Tests', { tags: ['@regression'] }, () => {
    beforeEach(() => disabledPage.visit('disabled_elements'));

    it('should verify input is disabled', () => {
      disabledPage.verifyInputDisabled();
    });

    it('should verify field cannot be focused', () => {
      disabledPage.verifyInputDisabled();
      cy.get('#disabled_field').should('not.be.focused');
    });
  });

  describe('Pagination Tests', { tags: ['@regression'] }, () => {
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

  describe('Session Tests', { tags: ['@regression'] }, () => {
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

  describe('Sortable Table Tests', { tags: ['@regression'] }, () => {
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
  });
});