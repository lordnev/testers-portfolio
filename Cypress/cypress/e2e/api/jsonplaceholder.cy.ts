describe('JSONPlaceholder API Tests', { tags: ['@api'] }, () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  describe('Posts Resource', () => {
    it('GET /posts - should list posts', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(100);
        expect(response.body[0]).to.have.all.keys('userId', 'id', 'title', 'body');
      });
    });

    it('GET /posts/1 - should return a single post', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts/1`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
        expect(response.body).to.have.property('userId');
      });
    });

    it('POST /posts - should create a new post', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/posts`,
        body: {
          title: 'Cypress Test Post',
          body: 'This is a test body',
          userId: 1,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.eq('Cypress Test Post');
      });
    });

    it('PUT /posts/1 - should update a post entirely', { tags: ['@regression'] }, () => {
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/posts/1`,
        body: {
          id: 1,
          title: 'Updated Title',
          body: 'Updated Body',
          userId: 1,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq('Updated Title');
      });
    });

    it('PATCH /posts/1 - should partially update a post', { tags: ['@regression'] }, () => {
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/posts/1`,
        body: {
          title: 'Partially Updated Title',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq('Partially Updated Title');
        expect(response.body).to.have.property('body');
      });
    });

    it('DELETE /posts/1 - should delete a post', { tags: ['@regression'] }, () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/posts/1`,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  describe('Filtering and Nested Routes', () => {
    it('GET /comments?postId=1 - should filter comments by postId', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/comments`,
        qs: { postId: 1 },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        response.body.forEach((comment: any) => {
          expect(comment.postId).to.eq(1);
        });
      });
    });

    it('GET /posts/1/comments - should return comments for a specific post (Nested)', { tags: ['@smoke'] }, () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts/1/comments`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.gt(0);
        response.body.forEach((comment: any) => {
          expect(comment.postId).to.eq(1);
        });
      });
    });
  });

  describe('Other Resources Basic Checks', () => {
    const resources = ['comments', 'albums', 'photos', 'todos', 'users'];

    resources.forEach((resource) => {
      it(`GET /${resource} - should list ${resource}`, { tags: ['@regression', '@data-driven'] }, () => {
        cy.request({
          method: 'GET',
          url: `${baseUrl}/${resource}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.gt(0);
        });
      });
    });
  });
});