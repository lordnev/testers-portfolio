class WikipediaHeader {
    get searchInput() { return cy.get('input[name="search"], input#searchInput').first(); }
    get searchButton() { return cy.get('button[type="submit"], span.pure-button-primary').first(); }
    get mainLogo() { return cy.get('.mw-wiki-logo, .mw-wiki-logo-container, #p-logo, a.mw-wiki-logo').first(); }

    searchFor(text) {
        this.searchInput.should('be.visible').clear().type(text);
        cy.get('body').type('{enter}');
        cy.get('.mw-parser-output, #content').should('be.visible');
    }
}

class WikipediaAuthPage {
    get loginLink() { return cy.get('a#ca-login, a[href*="Special:UserLogin"], :contains("Log in"), :contains("Zaloguj się")').first(); }
    get usernameInput() { return cy.get('input#wpLoggedInuserName, input#wpUserName').first(); }
    get passwordInput() { return cy.get('input#wpLoggedInPassword, input#wpPassword').first(); }
    get loginSubmitButton() { return cy.get('button[type="submit"], input[type="submit"]').first(); }
    get errorMessage() { return cy.get('.error, .mw-error-container').first(); }

    login(user, pass) {
        this.loginLink.should('be.visible').click();
        this.usernameInput.should('be.visible').type(user);
        this.passwordInput.should('be.visible').type(pass);
        this.loginSubmitButton.click();
    }
}

class WikipediaContentPage {
    get articleTitle() { return cy.get('h1#firstHeading, .mw-headline').first(); }
    get imageElements() { return cy.get('.mw-parser-output img, .central-featured-image img'); }
    get sideNav() { return cy.get('#mw-panel, .vector-main-menu-content, #mw-navigation').first(); }
    get footerLinks() { return cy.get('ul#footer-info-center li a, #footer-places-list a, .footer-info-center a').first(); }
    get randomArticleLink() { return cy.get('a#mp-pl-random, a[href*="Random"]').first(); }
    get contributorsLink() { return cy.get('a#ca-edit, span.mw-edit-section a').first(); }
    get languageList() { return cy.get('#mw-panel-languages li, .vector-languages, #mw-panel-languages').first(); }

    clickRandomArticle() {
        this.randomArticleLink.should('be.visible').click();
    }
}

export const wikipediaHeader = new WikipediaHeader();
export const wikipediaAuth = new WikipediaAuthPage();
export const wikipediaContent = new WikipediaContentPage();
