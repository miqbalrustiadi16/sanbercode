import loginPage from '../support/pages/loginPage';

describe('Login Tests', () => {
    beforeEach(() => {
        loginPage.visit();
    });

    it('should login successfully and intercept dashboard API', () => {
        cy.intercept('GET', '**/dashboard/**').as('getDashboard');

        loginPage.enterUsername('Admin');
        loginPage.enterPassword('admin123');
        loginPage.clickLogin();

        cy.wait('@getDashboard').its('response.statusCode').should('eq', 200);
        cy.url().should('include', '/dashboard');
    });

    it('should login using fixture data', () => {
        cy.fixture('credentials').then(({ username, password }) => {
            loginPage.enterUsername(username);
            loginPage.enterPassword(password);
            loginPage.clickLogin();
        });

        cy.url().should('include', '/dashboard');
    });
});
