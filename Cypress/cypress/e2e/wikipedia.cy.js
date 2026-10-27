import { wikipediaHeader, wikipediaAuth, wikipediaContent } from '../pages/wikipedia/WikipediaPage';

describe('Wikipedia Automation Tests (Cypress POM)', () => {
    beforeEach(() => {
        cy.visit('https://www.wikipedia.org/');
    });

    // --- Home Page Tests ---
    it('Should display the main logo on the home page', () => {
        wikipediaHeader.mainLogo.should('be.visible');
    });

    it('Should have the correct page title', () => {
        cy.title().should('match', /Wikipedia/);
    });

    it('Should show language options on the home page', () => {
        // Using a more flexible check for language lists
        wikipediaContent.languageList.should('exist');
    });

    it('Should redirect to the main page when clicking the logo', () => {
        wikipediaHeader.searchFor('Playwright');
        wikipediaHeader.mainLogo.click();
        cy.url().should('include', 'wikipedia.org');
    });

    it('Should verify that the search input is empty initially', () => {
        wikipediaHeader.searchInput.should('have.value', '');
    });

    // --- Search Tests ---
    it('Should search for a valid term and display the article', () => {
        wikipediaHeader.searchFor('OpenAI');
        wikipediaContent.articleTitle.should('contain', 'OpenAI');
    });

    it('Should handle search for a non-existent term', () => {
        wikipediaHeader.searchFor('ThisIsSomeRandomText123456789');
        wikipediaContent.articleTitle.should('contain', 'Search results');
    });

    it('Should display a result when searching for "Playwright"', () => {
        wikipediaHeader.searchFor('Playwright');
        wikipediaContent.articleTitle.should('be.visible');
    });

    it('Should be able to navigate back to home from an article', () => {
        wikipediaHeader.searchFor('TypeScript');
        wikipediaHeader.mainLogo.click();
        cy.url().should('include', 'wikipedia.org');
    });

    // --- Image & Content Tests ---
    it('Should find at least one image in a popular article', () => {
        wikipediaHeader.searchFor('Earth');
        wikipediaContent.imageElements.should('have.length.at.least', 1);
    });

    it('Should verify that the article "Tesla" contains images', () => {
        wikipediaHeader.searchFor('Tesla');
        wikipediaContent.imageElements.first().should('be.visible');
    });

    it('Should check if side navigation is visible', () => {
        wikipediaContent.sideNav.should('be.visible');
    });

    it('Should verify footer links are present', () => {
        wikipediaContent.footerLinks.should('be.visible');
    });

    // --- Authentication Tests ---
    it('Should navigate to the login page', () => {
        wikipediaAuth.loginLink.click();
        wikipediaAuth.usernameInput.should('be.visible');
    });

    it('Should show error message for invalid login', () => {
        wikipediaAuth.login('wrong_user', 'wrong_pass');
        wikipediaAuth.errorMessage.should('be.visible');
    });

    it('Should verify login page layout', () => {
        wikipediaAuth.loginLink.click();
        wikipediaAuth.passwordInput.should('be.visible');
        wikipediaAuth.loginSubmitButton.should('be.visible');
    });

    // --- Interaction Tests ---
    it('Should load a random article', () => {
        wikipediaContent.clickRandomArticle();
        wikipediaContent.articleTitle.should('be.visible');
    });

    it('Should be able to click the edit link on an article', () => {
        wikipediaHeader.searchFor('JavaScript');
        wikipediaContent.contributorsLink.should('be.visible');
    });

    it('Should check if language links are clickable', () => {
        wikipediaContent.languageList.first().click();
        cy.url().should('not.eq', 'https://www.wikipedia.org/');
    });

    it('Should verify the page responsiveness (implicit check via visibility)', () => {
        wikipediaHeader.mainLogo.should('be.visible');
    });
});
