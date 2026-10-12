import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
  test('GET /api/users - should list users', async ({ request }) => {
    const response = await request.get('/api/users');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/users/2 - should return a single user', async ({ request }) => {
    const response = await request.get('/api/users/2');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data.id).toBe(2);
  });

  test('GET /api/users/23 - should return 404 not found', async ({ request }) => {
    const response = await request.get('/api/users/23');
    expect(response.status()).toBe(404);
  });

  test('POST /api/users - should create a user', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'morpheus',
        job: 'leader'
      }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });

  test('PUT /api/users/2 - should update user', async ({ request }) => {
    const response = await request.put('/api/users/2', {
      data: {
        name: 'morpheus',
        job: 'leader'
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('updatedAt');
  });

  test('PATCH /api/users/2 - should partially update user', async ({ request }) => {
    const response = await request.patch('/api/users/2', {
      data: {
        name: 'morpheus'
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('updatedAt');
  });

  test('DELETE /api/users/2 - should delete user', async ({ request }) => {
    const response = await request.delete('/api/users/2');
    expect(response.status()).toBe(204);
  });

  test('GET /api/users?delay=3 - should handle delayed response', async ({ request }) => {
    const response = await request.get('/api/users?delay=3');
    expect(response.ok()).toBeTruthy();
  });
});
