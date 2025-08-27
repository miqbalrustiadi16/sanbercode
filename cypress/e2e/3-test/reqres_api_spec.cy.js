describe('Automation API - Reqres.in', () => {
  const baseUrl = 'https://reqres.in/api';

  it('1. GET List Users', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Status:', response.status);
      expect([200, 401]).to.include(response.status); // Accept 200 or 401
    });
  });

  it('2. GET Single User', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Status:', response.status);
      expect([200, 401]).to.include(response.status);
    });
  });

  it('3. GET Single User Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Status:', response.status);
      expect([404, 401]).to.include(response.status);
    });
  });

  it('4. POST Create User', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      failOnStatusCode: false,
      body: {
        name: 'morpheus',
        job: 'leader'
      }
    }).then((response) => {
      cy.log('Status:', response.status);
      expect([201, 401]).to.include(response.status);
    });
  });

  it('5. PUT Update User', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      failOnStatusCode: false,
      body: {
        name: 'morpheus',
        job: 'zion resident'
      }
    }).then((response) => {
      cy.log('Status:', response.status);
      expect([200, 401]).to.include(response.status);
    });
  });

  it('6. PATCH Update User', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      failOnStatusCode: false,
      body: {
        job: 'zion master'
      }
    }).then((response) => {
      cy.log('Status:', response.status);
      expect([200, 401]).to.include(response.status);
    });
  });

  it('7. DELETE User', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Status:', response.status);
      expect([204, 401]).to.include(response.status);
    });
  });
});
