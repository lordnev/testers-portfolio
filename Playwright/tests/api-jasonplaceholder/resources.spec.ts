import { test, expect } from '../../fixtures/test-fixtures';
import { JsonPlaceholderClient } from '../../utils/api-helpers';

test.describe('JSONPlaceholder Other Resources @api', () => {
  let jsonPlaceholderClient: JsonPlaceholderClient;

  test.beforeEach(async ({ request }) => {
    jsonPlaceholderClient = new JsonPlaceholderClient(request);
  });

  const resources = ['comments', 'albums', 'photos', 'todos', 'users'] as const;

  for (const resource of resources) {
    test(`GET /${resource} - should list ${resource} @regression @data-driven`, async () => {
      const data = await jsonPlaceholderClient.getResource(resource);
      expect(Array.isArray(data)).toBeTruthy();
      expect(data.length).toBeGreaterThan(0);
    });

    test(`GET /${resource}/1 - should return single ${resource} @regression`, async () => {
      const item = await jsonPlaceholderClient.getResource(resource, 1);
      expect(item.id).toBe(1);
      expect(Object.keys(item).length).toBeGreaterThan(1);
    });
  }

  test('GET /users - should have expected structure @regression', async () => {
    const users = await jsonPlaceholderClient.getResource('users');
    expect(users.length).toBeGreaterThan(0);
    const user = users[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user).toHaveProperty('phone');
    expect(user).toHaveProperty('website');
    expect(user).toHaveProperty('company');
  });

  test('GET /todos - should have completed status @regression', async () => {
    const todos = await jsonPlaceholderClient.getResource('todos');
    expect(todos.length).toBeGreaterThan(0);
    const todo = todos[0];
    expect(todo).toHaveProperty('userId');
    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('title');
    expect(todo).toHaveProperty('completed');
    expect(typeof todo.completed).toBe('boolean');
  });

  test('GET /photos - should have thumbnail URL @regression', async () => {
    const photos = await jsonPlaceholderClient.getResource('photos');
    expect(photos.length).toBeGreaterThan(0);
    const photo = photos[0];
    expect(photo).toHaveProperty('albumId');
    expect(photo).toHaveProperty('id');
    expect(photo).toHaveProperty('title');
    expect(photo).toHaveProperty('url');
    expect(photo).toHaveProperty('thumbnailUrl');
    expect(photo.url).toMatch(/^https?:\/\//);
    expect(photo.thumbnailUrl).toMatch(/^https?:\/\//);
  });
});