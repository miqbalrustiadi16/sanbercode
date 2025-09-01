describe('Menulis hasil Login, Forgot Password, dan Dashboard ke write.json', () => {
  const outputFile = 'cypress/output/write.json'
  const baseUrl = 'https://opensource-demo.orangehrmlive.com'

  let result = {
    login: {},
    forgotPassword: {},
    dashboard: {}
  }

  it('Melakukan Login dan simpan response', () => {
    cy.visit(`${baseUrl}/web/index.php/auth/login`, {
      timeout: 90000 // perpanjang timeout
    })

    // Intercept login request (gunakan request body sebagai fallback karena URL dinamis)
    cy.intercept('POST', '**/auth/login').as('loginRequest')

    // Login
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Tidak semua request bisa diintercept, kita simpan token dari localStorage jika gagal
    cy.url({ timeout: 10000 }).should('include', '/dashboard')

    // Ambil teks selamat datang sebagai hasil login
    cy.get('.oxd-userdropdown-name').then($el => {
      result.login = {
        status: 'success',
        welcomeText: $el.text()
      }

      cy.writeFile(outputFile, result)
    })
  })

  it('Melakukan Forgot Password dan simpan response', () => {
    cy.visit(`${baseUrl}/web/index.php/auth/login`)

    cy.contains('Forgot your password?').click()

    cy.url().should('include', '/requestPasswordResetCode')

    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    // Tunggu sampai redirect ke halaman sendPasswordReset
    cy.url().should('include', '/sendPasswordReset')

    cy.contains('Reset Password link sent successfully').should('exist')

    result.forgotPassword = {
      status: 'success',
      message: 'Reset Password link sent successfully'
    }

    cy.writeFile(outputFile, result)
  })

  it('Mengakses Dashboard dan simpan informasi direktori', () => {
    cy.visit(`${baseUrl}/web/index.php/auth/login`)

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')

    // Ambil teks dashboard dan menu utama
    cy.get('.oxd-topbar-header-breadcrumb h6').then($el => {
      result.dashboard = {
        pageTitle: $el.text()
      }

      cy.writeFile(outputFile, result)
    })
  })
})
