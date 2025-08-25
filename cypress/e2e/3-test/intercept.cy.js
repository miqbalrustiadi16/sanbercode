describe('Intercept Login Request - OrangeHRM', () => {
  it('should intercept the login API request and check the response', () => {
    // Intercept POST request saat login
    cy.intercept('POST', '/web/index.php/api/v2/login').as('loginRequest');

    // Buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Isi username dan password
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Tunggu sampai permintaan login terjadi dan berhasil
    cy.wait('@loginRequest').then((interception) => {
      // Pastikan metode dan respons sesuai
      expect(interception.request.method).to.eq('POST');
      expect(interception.response.statusCode).to.eq(200); // Login sukses
      cy.log('Login berhasil, token:', interception.response.body.token);
    });
  });
});
