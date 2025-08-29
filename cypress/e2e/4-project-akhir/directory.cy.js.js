import loginPage from '../support/pages/loginPage';
import dashboardPage from '../support/pages/dashboardPage';

describe('Navigate to Directory Menu', () => {
    beforeEach(() => {
        loginPage.visit();
        loginPage.enterUsername('Admin');
        loginPage.enterPassword('admin123');
        loginPage.clickLogin();
        cy.url().should('include', '/dashboard');
    });

    it('should navigate to Directory page and intercept API', () => {
        cy.intercept('GET', '**/directory/employees**').as('getDirectory');

        dashboardPage.goToDirectory();
        cy.wait('@getDirectory').its('response.statusCode').should('eq', 200);
        dashboardPage.verifyDirectoryPage();
    });
});
