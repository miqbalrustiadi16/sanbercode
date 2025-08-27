describe('API Automation Testing on Reqres.in', () => {
  const baseUrl = 'https://reqres.in/api';

  it('1. GET List Users', () => {
    cy.request(`${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  it('2. GET Single User', () => {
    cy.request(`${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('id', 2);
    });
  });

  it('3. GET Single User Not Found', () => {
    cy.request({
      url: `${baseUrl}/users/23`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('4. POST Create User', () => {
    cy.request('POST', `${baseUrl}/users`, {
      name: 'morpheus',
      job: 'leader'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'morpheus');
    });
  });

  it('5. PUT Update User', () => {
    cy.request('PUT', `${baseUrl}/users/2`, {
      name: 'morpheus',
      job: 'zion resident'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', 'zion resident');
    });
  });

  it('6. PATCH Update User', () => {
    cy.request('PATCH', `${baseUrl}/users/2`, {
      job: 'zion master'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', 'zion master');
    });
  });

  it('7. DELETE User', () => {
    cy.request('DELETE', `${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(204); // No content
    });
  });
});
