import loginPage from '../support/pages/loginPage';
import forgotPasswordPage from '../support/pages/forgotPasswordPage';

describe('Forgot Password Flow', () => {
    beforeEach(() => {
        loginPage.visit();
        loginPage.clickForgotPassword();
    });

    it('should submit forgot password request', () => {
        forgotPasswordPage.enterUsername('Admin');
        forgotPasswordPage.clickResetButton();

        cy.contains('Reset Password link sent successfully').should('be.visible');
    });
});
