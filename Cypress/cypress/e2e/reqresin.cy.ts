describe('ReqRes API Tests', () => {
  const apiKey = Cypress.env('REQRES_API_KEY');

  describe('Users API', () => {
    it('GET /api/users - should list users', () => {
      cy.request({
        method: 'GET',
        url: '/api/users',
        headers: { 'x-api-key': apiKey },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.gt(0);
      });
    });

    it('GET /api/users/2 - should return a single user', () => {
      cy.request({
        method: 'GET',
        url: '/api/users/2',
        headers: { 'x-api-key': apiKey }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(2);
      });
    });

    it('GET /api/users/23 - should return 404 not found', () => {
      cy.request({
        method: 'GET',
        url: '/api/users/23',
        headers: { 'x-api-key': apiKey },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('POST /api/users - should create a user', () => {
      cy.request({
        method: 'POST',
        url: '/api/users',
        headers: { 'x-api-key': apiKey },
        body: {
          name: 'morpheus',
          job: 'leader'
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('createdAt');
      });
    });

    it('PUT /api/users/2 - should update user', () => {
      cy.request({
        method: 'PUT',
        url: '/api/users/2',
        headers: { 'x-api-key': apiKey },
        body: {
          name: 'morpheus',
          job: 'leader'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('updatedAt');
      });
    });

    it('PATCH /api/users/2 - should partially update user', () => {
      cy.request({
        method: 'PATCH',
        url: '/api/users/2',
        headers: { 'x-api-key': apiKey },
        body: {
          name: 'morpheus'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('updatedAt');
      });
    });

    it('DELETE /api/users/2 - should delete user', () => {
      cy.request({
        method: 'DELETE',
        url: '/api/users/2',
        headers: { 'x-api-key': apiKey }
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });

    it('GET /api/users?delay=3 - should handle delayed response', () => {
      cy.request({
        method: 'GET',
        url: '/api/users?delay=3',
        headers: { 'x-api-key': apiKey },
        timeout: 5000
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe('Resources API', () => {
    it('GET /api/resources - should list resources', () => {
      cy.request({
        method: 'GET',
        url: '/api/resources',
        headers: { 'x-api-key': apiKey }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
      });
    });

    it('GET /api/resources/1 - should return a single resource', () => {
      cy.request({
        method: 'GET',
        url: '/api/resources/1',
        headers: { 'x-api-key': apiKey }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.name).to.not.be.undefined;
      });
    });

    it('GET /api/resources/23 - should return 404 not found', () => {
      cy.request({
        method: 'GET',
        url: '/api/resources/23',
        headers: { 'x-api-key': apiKey },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe('Authentication API', () => {
    const login = Cypress.env('REQRES_LOGIN');
    const password = Cypress.env('REQRES_PASSWORD');

    it('POST /api/register - success', () => {
      // Using a known valid user for the mock registration
      cy.request({
        method: 'POST',
        url: '/api/register',
        headers: { 'x-api-key': apiKey },
        body: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });

    it('POST /api/register - failure (no password)', () => {
      cy.request({
        method: 'POST',
        url: '/api/register',
        headers: { 'x-api-key': apiKey },
        body: {
          email: login
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('POST /api/login - success', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        headers: { 'x-api-key': apiKey },
        body: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });

    it('POST /api/login - failure (no password)', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        headers: { 'x-api-key': apiKey },
        body: {
          email: login
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });
  });
});
