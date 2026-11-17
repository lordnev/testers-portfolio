describe('ReqRes API Tests', { tags: ['@api'] }, () => {
  const apiKey = Cypress.env('REQRES_API_KEY');

  describe('Users API', () => {
    it('GET /api/users - should list users', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'GET',
        url: '/api/users',
        headers: { 'x-api-key': apiKey },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.gt(0);
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('per_page');
        expect(response.body).to.have.property('total');
        expect(response.body).to.have.property('total_pages');
      });
    });

    it('GET /api/users?page=2 - should return second page', { tags: ['@regression'] }, () => {
      cy.request({
        method: 'GET',
        url: '/api/users',
        qs: { page: 2 },
        headers: { 'x-api-key': apiKey },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.page).to.eq(2);
      });
    });

    it('GET /api/users/2 - should return a single user', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'GET',
        url: '/api/users/2',
        headers: { 'x-api-key': apiKey },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(2);
        expect(response.body.data).to.have.property('email');
        expect(response.body.data).to.have.property('first_name');
        expect(response.body.data).to.have.property('last_name');
        expect(response.body.data).to.have.property('avatar');
      });
    });

    it('GET /api/users/23 - should return 404 not found', { tags: ['@negative'] }, () => {
      cy.request({
        method: 'GET',
        url: '/api/users/23',
        headers: { 'x-api-key': apiKey },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('POST /api/users - should create a user', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'POST',
        url: '/api/users',
        headers: { 'x-api-key': apiKey },
        body: {
          name: 'morpheus',
          job: 'leader',
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.name).to.eq('morpheus');
        expect(response.body.job).to.eq('leader');
        expect(response.body).to.have.property('createdAt');
      });
    });

    it('PUT /api/users/2 - should update user', { tags: ['@regression'] }, () => {
      cy.request({
        method: 'PUT',
        url: '/api/users/2',
        headers: { 'x-api-key': apiKey },
        body: {
          name: 'morpheus',
          job: 'zion resident',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('morpheus');
        expect(response.body.job).to.eq('zion resident');
        expect(response.body).to.have.property('updatedAt');
      });
    });

    it('PATCH /api/users/2 - should partially update user', { tags: ['@regression'] }, () => {
      cy.request({
        method: 'PATCH',
        url: '/api/users/2',
        headers: { 'x-api-key': apiKey },
        body: {
          job: 'QA Engineer',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.job).to.eq('QA Engineer');
        expect(response.body).to.have.property('updatedAt');
      });
    });

    it('DELETE /api/users/2 - should delete user', { tags: ['@regression'] }, () => {
      cy.request({
        method: 'DELETE',
        url: '/api/users/2',
        headers: { 'x-api-key': apiKey },
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });

    it('GET /api/users?delay=3 - should handle delayed response', { tags: ['@performance'] }, () => {
      const startTime = Date.now();
      cy.request({
        method: 'GET',
        url: '/api/users?delay=3',
        headers: { 'x-api-key': apiKey },
        timeout: 10000,
      }).then((response) => {
        const duration = Date.now() - startTime;
        expect(response.status).to.eq(200);
        expect(duration).to.be.gte(3000);
      });
    });
  });

  describe('Resources API', () => {
    it('GET /api/resources - should list resources', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'GET',
        url: '/api/resources',
        headers: { 'x-api-key': apiKey },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.gt(0);
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('per_page');
      });
    });

    it('GET /api/resources/1 - should return a single resource', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'GET',
        url: '/api/resources/1',
        headers: { 'x-api-key': apiKey },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(1);
        expect(response.body.data).to.have.property('name');
        expect(response.body.data).to.have.property('year');
        expect(response.body.data).to.have.property('color');
        expect(response.body.data).to.have.property('pantone_value');
      });
    });

    it('GET /api/resources/23 - should return 404 not found', { tags: ['@negative'] }, () => {
      cy.request({
        method: 'GET',
        url: '/api/resources/23',
        headers: { 'x-api-key': apiKey },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe('Authentication API', () => {
    const login = Cypress.env('REQRES_LOGIN');
    const password = Cypress.env('REQRES_PASSWORD');

    it('POST /api/register - success', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'POST',
        url: '/api/register',
        headers: { 'x-api-key': apiKey },
        body: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('token');
      });
    });

    it('POST /api/register - failure (missing password)', { tags: ['@negative'] }, () => {
      cy.request({
        method: 'POST',
        url: '/api/register',
        headers: { 'x-api-key': apiKey },
        body: {
          email: login,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('POST /api/register - failure (missing email)', { tags: ['@negative'] }, () => {
      cy.request({
        method: 'POST',
        url: '/api/register',
        headers: { 'x-api-key': apiKey },
        body: {
          password: 'cityslicka',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('POST /api/login - success', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        headers: { 'x-api-key': apiKey },
        body: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });

    it('POST /api/login - failure (wrong password)', { tags: ['@negative'] }, () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        headers: { 'x-api-key': apiKey },
        body: {
          email: 'eve.holt@reqres.in',
          password: 'wrongpassword',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('POST /api/login - failure (missing email)', { tags: ['@negative'] }, () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        headers: { 'x-api-key': apiKey },
        body: {
          password: 'cityslicka',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });
  });
});