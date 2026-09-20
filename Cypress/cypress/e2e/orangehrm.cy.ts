describe('OrangeHRM Professional Test Suite', () => {
    const username = Cypress.env('ORANGEHRM_USERNAME');
    const password = Cypress.env('ORANGEHRM_PASSWORD');
    const url = Cypress.env('ORANGEHRM_URL');

    const login = () => {
        cy.visit(url);
        cy.get('input[name="username"]').type(username, { force: true });
        cy.get('input[name="password"]').type(password, { force: true });
        cy.get('button[type="submit"]').click();
    };


    describe('Auth Suite', () => {
        it('Successful Login', () => {
            login();
            cy.url().should('include', '/dashboard');
        });

        it('Invalid Login - Wrong Password', () => {
            cy.visit(url);
            cy.get('input[name="username"]').type(username);
            cy.get('input[name="password"]').type('WrongPassword123');
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-alert-content-text').should('be.visible');
        });

        it('Invalid Login - Non-existent User', () => {
            cy.visit(url);
            cy.get('input[name="username"]').type('NonExistentUser');
            cy.get('input[name="password"]').type('admin123');
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-alert-content-text').should('be.visible');
        });

        it('Empty Credentials Login', () => {
            cy.visit(url);
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-alert-content-text').should('be.visible');
        });

        it('Logout Process', () => {
            login();
            cy.get('.oxd-usermenu-button').click();
            cy.get('a:has-text("Logout")').click();
            cy.url().should('include', '/auth/login');
        });
    });

    describe('PIM Suite', () => {
        beforeEach(() => {
            login();
            cy.get('span:has-text("PIM")').click();
        });

        it('Add Employee', () => {
            const firstName = 'Test';
            const lastName = 'User' + Math.floor(Math.random() * 1000);
            cy.get('button:has-text("Add")').click();
            cy.get('input[name="firstName"]').type(firstName);
            cy.get('input[name="lastName"]').type(lastName);
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Search Employee', () => {
            cy.visit(`${url.replace('/auth/login', '/pim/viewEmployeeList')}`);
            cy.get('input[placeholder="Employee Name"]').type('Admin');
            cy.get('button[type="submit"]').click();
            cy.contains('Admin').should('be.visible');
        });

        it('Employee List Load', () => {
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Search for non-existent employee', () => {
            cy.visit(`${url.replace('/auth/login', '/pim/viewEmployeeList')}`);
            cy.get('input[placeholder="Employee Name"]').type('NonExistentEmployee123');
            cy.get('button[type="submit"]').click();
            cy.contains('No Records Found').should('be.visible');
        });

        it('Validate required fields in Add Employee', () => {
            cy.get('button:has-text("Add")').click();
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-alert-content-text').should('be.visible');
        });

        it('Employee Update', () => {
            cy.visit(`${url.replace('/auth/login', '/pim/viewEmployeeList')}`);
            cy.get('input[placeholder="Employee Name"]').type('Admin');
            cy.get('button[type="submit"]').click();
            cy.contains('Admin').click(); // Simplified navigation to details
            cy.get('button:has-text("Edit")').click();
            cy.get('input[name="lastName"]').clear().type('UpdatedLastName');
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Complex Search', () => {
            cy.visit(`${url.replace('/auth/login', '/pim/viewEmployeeList')}`);
            cy.get('input[placeholder="Employee Name"]').type('Admin');
            cy.get('button[type="submit"]').click();
            cy.contains('Admin').should('be.visible');
        });
    });

    describe('Admin Suite', () => {
        beforeEach(() => {
            login();
            cy.get('span:has-text("Admin")').click();
        });

        it('Admin Navigation', () => {
            cy.url().should('include', '/admin/viewUsers');
        });

        it('User Search', () => {
            cy.get('input[placeholder="Username"]').type('Admin');
            cy.get('button[type="submit"]').click();
            cy.contains('Admin').should('be.visible');
        });

        it('Search for non-existent user', () => {
            cy.get('input[placeholder="Username"]').type('GhostUser123');
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('not.be.visible');
        });
    });

    describe('Leave Suite', () => {
        beforeEach(() => {
            login();
            cy.get('span:has-text("Leave")').click();
        });

        it('Navigate to Leave module', () => {
            cy.url().should('include', '/leave');
        });

        it('Apply for leave (Valid request)', () => {
            cy.get('button:has-text("Apply")').click();
            cy.get('.oxd-select-text').click();
            cy.get('div:has-text("Sick Leave")').click();
            cy.get('input[placeholder="Enter start date"]').type('2026-10-01');
            cy.get('input[placeholder="Enter end date"]').type('2026-10-02');
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Verify leave balance visibility', () => {
            cy.contains('Leave Balance').should('be.visible');
        });
    });

    describe('Performance Suite', () => {
        beforeEach(() => {
            login();
            cy.visit(`${url.replace('/auth/login', '/performance/viewPerformanceReviews')}`);
        });

        it('Navigate to Performance module', () => {
            cy.url().should('include', '/performance');
        });

        it('Verify review list load', () => {
            cy.get('.oxd-table-card').should('be.visible');
        });
    });

    describe('My Page Suite', () => {
        beforeEach(() => {
            login();
            cy.get('span:has-text("My")').click();
        });

        it('My Page Personal Info', () => {
            cy.get('.oxd-card').should('be.visible');
        });

        it('Verify personal contact details load', () => {
            cy.contains('Contact Details').should('be.visible');
        });

        it('Check profile picture visibility', () => {
            cy.get('.oxd-userprofile-image').should('be.visible');
        });
    });

    describe('Recruitment Suite', () => {
        beforeEach(() => {
            login();
            cy.visit(`${url.replace('/auth/login', '/recruitment/viewCandidates')}`);
        });

        it('Candidate List Load', () => {
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Add Candidate', () => {
            const firstName = 'Recruit';
            const lastName = 'User' + Math.floor(Math.random() * 1000);
            const email = `${lastName}@example.com`;
            cy.get('button:has-text("Add")').click();
            cy.get('input[name="firstName"]').type(firstName);
            cy.get('input[name="lastName"]').type(lastName);
            cy.get('input[name="workEmail"]').type(email);
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Update Candidate Status', () => {
            cy.contains('Admin').click(); // Simplified for demo
            cy.get('.oxd-select-text').click();
            cy.get('div:has-text("Interview")').click();
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Candidate Search', () => {
            cy.get('input[placeholder="Candidate Name"]').type('Admin');
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Filter Candidates by Status', () => {
            cy.get('.oxd-select-text').first().click();
            cy.get('div:has-text("Applied")').click();
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Invalid Candidate Data Validation', () => {
            cy.get('button:has-text("Add")').click();
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-alert-content-text').should('be.visible');
        });
    });

    describe('Job Suite', () => {
        beforeEach(() => {
            login();
            cy.visit(`${url.replace('/auth/login', '/admin/viewJobTitles')}`);
        });

        it('Job Vacancy List Load', () => {
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Add Job Vacancy', () => {
            cy.get('button:has-text("Add")').click();
            cy.get('input[name="jobTitle"]').type('QA Automation Engineer');
            cy.get('textarea[name="description"]').type('Experience with Playwright');
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Job Search', () => {
            cy.get('input[placeholder="Job Title"]').type('QA');
            cy.get('button[type="submit"]').click();
            cy.get('.oxd-table-card').should('be.visible');
        });

        it('Job Description Verification', () => {
            cy.contains('QA Automation Engineer').should('be.visible');
        });
    });
});
