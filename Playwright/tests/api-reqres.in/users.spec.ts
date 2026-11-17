import { test, expect } from '../../fixtures/test-fixtures';
import { ReqResClient } from '../../utils/api-helpers';
import { generateTestUser, API_TEST_DATA } from '../../utils/test-data-generators';

test.describe('ReqRes Users API @api', () => {
  let reqresClient: ReqResClient;

  test.beforeEach(async ({ request }) => {
    reqresClient = new ReqResClient(request);
  });

  test('GET /api/users - should list users @smoke', async () => {
    const response = await reqresClient.getUsers();
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBeTruthy();
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.page).toBeDefined();
    expect(response.per_page).toBeDefined();
    expect(response.total).toBeDefined();
    expect(response.total_pages).toBeDefined();
  });

  test('GET /api/users?page=2 - should return second page @regression', async () => {
    const response = await reqresClient.getUsers(2);
    expect(response.page).toBe(2);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('GET /api/users/2 - should return a single user @smoke', async () => {
    const response = await reqresClient.getUser(2);
    expect(response.data.id).toBe(2);
    expect(response.data.email).toBeDefined();
    expect(response.data.first_name).toBeDefined();
    expect(response.data.last_name).toBeDefined();
    expect(response.data.avatar).toBeDefined();
  });

  test('GET /api/users/23 - should return 404 not found @negative', async () => {
    await expect(reqresClient.getUser(23)).rejects.toThrow(/404/);
  });

  test('POST /api/users - should create a user @smoke', async () => {
    const userData = API_TEST_DATA.reqres.user;
    const response = await reqresClient.createUser(userData);
    expect(response.id).toBeDefined();
    expect(response.name).toBe(userData.name);
    expect(response.job).toBe(userData.job);
    expect(response.createdAt).toBeDefined();
  });

  test('PUT /api/users/2 - should update user @regression', async () => {
    const response = await reqresClient.updateUser(2, API_TEST_DATA.reqres.updatedUser);
    expect(response.name).toBe(API_TEST_DATA.reqres.updatedUser.name);
    expect(response.job).toBe(API_TEST_DATA.reqres.updatedUser.job);
    expect(response.updatedAt).toBeDefined();
  });

  test('PATCH /api/users/2 - should partially update user @regression', async () => {
    const response = await reqresClient.patchUser(2, { job: 'QA Engineer' });
    expect(response.job).toBe('QA Engineer');
    expect(response.updatedAt).toBeDefined();
  });

  test('DELETE /api/users/2 - should delete user @regression', async () => {
    await expect(reqresClient.deleteUser(2)).resolves.toBeUndefined();
  });

  test('GET /api/users?delay=3 - should handle delayed response @performance', async () => {
    const startTime = Date.now();
    const response = await reqresClient.getUsers();
    const duration = Date.now() - startTime;
    expect(response.data).toBeDefined();
    expect(duration).toBeGreaterThanOrEqual(3000);
  });
});