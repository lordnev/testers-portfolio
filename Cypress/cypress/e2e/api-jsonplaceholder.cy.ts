describe('JSONPlaceholder API Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  describe('Posts Resource', () => {
    it('GET /posts - should list posts', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(100);
      });
    });

    it('GET /posts/1 - should return a single post', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts/1`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
      });
    });

    it('POST /posts - should create a new post', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/posts`,
        body: {
          title: 'Cypress Test Post',
          body: 'This is a test body',
          userId: 1
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.eq('Cypress Test Post');
      });
    });

    it('PUT /posts/1 - should update a post entirely', () => {
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/posts/1`,
        body: {
          id: 1,
          title: 'Updated Title',
          body: 'Updated Body',
          userId: 1
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq('Updated Title');
      });
    });

    it('PATCH /posts/1 - should partially update a post', () => {
      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/posts/1`,
        body: {
          title: 'Partially Updated Title'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq('Partially Updated Title');
        // body should remain unchanged from original for PATCH if not provided
        expect(response.body).to.have.property('body');
      });
    });

    it('DELETE /posts/1 - should delete a post', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/posts/1`
      }).then((response) => {
        expect(response.status).to.eq(200); // JSONPlaceholder returns 200 for successful delete
      });
    });
  });

  describe('Filtering and Nested Routes', () => {
    it('GET /comments?postId=1 - should filter comments by postId', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/comments`,
        qs: { postId: 1 }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        response.body.forEach(comment => {
          expect(comment.postId).to.eq(1);
        });
      });
    });

    it('GET /posts/1/comments - should return comments for a specific post (Nested)', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/posts/1/comments`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.gt(0);
        response.body.forEach(comment => {
          expect(comment.postId).to.eq(1);
        });
      });
    });
  });

  describe('Other Resources Basic Checks', () => {
    const resources = ['comments', 'albums', 'photos', 'todos', 'users'];

    resources.forEach(resource => {
      it(`GET /${resource} - should list ${resource}`, () => {
        cy.request({
          method: 'GET',
          url: `${baseUrl}/${resource}`
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
        });
      });
    });
  });
});
