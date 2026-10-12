import { test, expect } from '@playwright/test';

test.describe('Resources API', () => {
  const apiKey = process.env.REQRES_API_KEY;

  test('GET /api/resources - should list resources', async ({ request }) => {
    const response = await request.get('/api/resources', {
      headers: {
        'x-api-key': apiKey
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/resources/1 - should return a single resource', async ({ request }) => {
    const response = await request.get('/api/resources/1', {
      headers: {
        'x-api-key': apiKey
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data.name).toBeDefined();
  });

  test('GET /api/resources/23 - should return 404 not found', async ({ request }) => {
    const response = await request.get('/api/resources/23', {
      headers: {
        'x-api-key': apiKey
      }
    });
    expect(response.status()).toBe(404);
  });
});
