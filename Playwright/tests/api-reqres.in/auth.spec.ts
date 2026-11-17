import { test, expect } from '../../fixtures/test-fixtures';
import { ReqResClient } from '../../utils/api-helpers';
import { API_TEST_DATA } from '../../utils/test-data-generators';

test.describe('ReqRes Authentication API @api', () => {
  let reqresClient: ReqResClient;

  test.beforeEach(async ({ request }) => {
    reqresClient = new ReqResClient(request);
  });

  test('POST /api/register - success @smoke', async () => {
    const response = await reqresClient.register(
      API_TEST_DATA.reqres.register.email,
      API_TEST_DATA.reqres.register.password
    );
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('token');
    expect(typeof response.token).toBe('string');
    expect(response.token.length).toBeGreaterThan(0);
  });

  test('POST /api/register - failure (missing password) @negative', async () => {
    await expect(
      reqresClient.register('eve.holt@reqres.in', '')
    ).rejects.toThrow(/400/);
  });

  test('POST /api/register - failure (missing email) @negative', async () => {
    await expect(
      reqresClient.register('', 'cityslicka')
    ).rejects.toThrow(/400/);
  });

  test('POST /api/login - success @smoke', async () => {
    const response = await reqresClient.login(
      API_TEST_DATA.reqres.login.email,
      API_TEST_DATA.reqres.login.password
    );
    expect(response).toHaveProperty('token');
    expect(typeof response.token).toBe('string');
    expect(response.token.length).toBeGreaterThan(0);
  });

  test('POST /api/login - failure (wrong password) @negative', async () => {
    await expect(
      reqresClient.login('eve.holt@reqres.in', 'wrongpassword')
    ).rejects.toThrow(/400/);
  });

  test('POST /api/login - failure (missing email) @negative', async () => {
    await expect(
      reqresClient.login('', 'cityslicka')
    ).rejects.toThrow(/400/);
  });

  test('POST /api/login - failure (non-existent user) @negative', async () => {
    await expect(
      reqresClient.login('nonexistent@example.com', 'password')
    ).rejects.toThrow(/400/);
  });
});