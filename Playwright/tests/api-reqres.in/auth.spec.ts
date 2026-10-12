import { test, expect } from '@playwright/test';

test.describe('Authentication API', () => {
  test('POST /api/register - success', async ({ request }) => {
    // ReqRes note: Only defined users succeed registration in the mock environment
    // Since we are testing the API response for a generic successful call,
    // we will use a known valid user if possible, or acknowledge this mock limitation.
    const response = await request.post('/api/register', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('POST /api/register - failure (no password)', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: process.env.REQRES_LOGIN
      }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

  test('POST /api/login - success', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('POST /api/login - failure (no password)', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: process.env.REQRES_LOGIN
      }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
  });
});
