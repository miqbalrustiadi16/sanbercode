describe('Tes Login OrangeHRM', () => {
  beforeEach(() => {
    // Buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait(2000); // Tunggu elemen termuat
  });

  it('1. Cek elemen Username', () => {
    cy.get('input[name="username"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Username');
  });

  it('2. Cek elemen Password', () => {
    cy.get('input[name="password"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Password');
  });

  it('3. Cek tombol Login', () => {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('contain', 'Login');
  });

  it('4. Cek logo SVG latar (svg)', () => {
    cy.get('svg').should('exist');
  });

  it('5. Cek elemen <g> dalam SVG', () => {
    cy.get('svg g').should('exist');
  });

  it('6. Cek elemen <path> dalam SVG', () => {
    cy.get('svg path').should('exist');
  });

  it('7. Cek elemen <circle> dalam SVG', () => {
    cy.get('svg circle').should('exist');
  });

  it('Login dengan kredensial valid', () => {
    // Isi username
    cy.get('input[name="username"]').type('Admin');

    // Isi password
    cy.get('input[name="password"]').type('admin123');

    // Klik login
    cy.get('button[type="submit"]').click();

    // Verifikasi halaman setelah login
    cy.url().should('include', '/dashboard');
  });
});
