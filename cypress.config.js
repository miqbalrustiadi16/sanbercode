const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    supportFile: 'cypress/support/e2e.js',
  },
});
