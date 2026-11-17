import { test, expect } from '../../fixtures/test-fixtures';
import { ReqResClient } from '../../utils/api-helpers';

test.describe('ReqRes Resources API @api', () => {
  let reqresClient: ReqResClient;

  test.beforeEach(async ({ request }) => {
    reqresClient = new ReqResClient(request);
  });

  test('GET /api/resources - should list resources @smoke', async () => {
    const response = await reqresClient.getResources();
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBeTruthy();
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.page).toBeDefined();
    expect(response.per_page).toBeDefined();
    expect(response.total).toBeDefined();
    expect(response.total_pages).toBeDefined();
  });

  test('GET /api/resources/1 - should return a single resource @smoke', async () => {
    const response = await reqresClient.getResource(1);
    expect(response.data.id).toBe(1);
    expect(response.data.name).toBeDefined();
    expect(response.data.year).toBeDefined();
    expect(response.data.color).toBeDefined();
    expect(response.data.pantone_value).toBeDefined();
  });

  test('GET /api/resources/23 - should return 404 not found @negative', async () => {
    await expect(reqresClient.getResource(23)).rejects.toThrow(/404/);
  });

  test('GET /api/resources - should have correct structure @regression', async () => {
    const response = await reqresClient.getResources();
    const resource = response.data[0];
    expect(resource).toHaveProperty('id');
    expect(resource).toHaveProperty('name');
    expect(resource).toHaveProperty('year');
    expect(resource).toHaveProperty('color');
    expect(resource).toHaveProperty('pantone_value');
    expect(typeof resource.year).toBe('number');
    expect(typeof resource.color).toBe('string');
    expect(resource.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });
});