import { test, expect } from '../../fixtures/test-fixtures';
import { JsonPlaceholderClient } from '../../utils/api-helpers';

test.describe('JSONPlaceholder Filtering & Nested Routes @api', () => {
  let jsonPlaceholderClient: JsonPlaceholderClient;

  test.beforeEach(async ({ request }) => {
    jsonPlaceholderClient = new JsonPlaceholderClient(request);
  });

  test('GET /comments?postId=1 - should filter comments by postId @smoke', async () => {
    const comments = await jsonPlaceholderClient.getComments(1);
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBeGreaterThan(0);
    comments.forEach(comment => {
      expect(comment.postId).toBe(1);
    });
  });

  test('GET /posts/1/comments - should return comments for a specific post (Nested) @smoke', async () => {
    const comments = await jsonPlaceholderClient.getNestedComments(1);
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBeGreaterThan(0);
    comments.forEach(comment => {
      expect(comment.postId).toBe(1);
    });
  });

  test('GET /posts/1/comments - should match filtered comments @regression', async () => {
    const [filteredComments, nestedComments] = await Promise.all([
      jsonPlaceholderClient.getComments(1),
      jsonPlaceholderClient.getNestedComments(1),
    ]);
    expect(filteredComments.length).toBe(nestedComments.length);
    expect(filteredComments.map(c => c.id).sort()).toEqual(nestedComments.map(c => c.id).sort());
  });

  test('GET /comments?postId=999 - should return empty array for non-existent post @negative', async () => {
    const comments = await jsonPlaceholderClient.getComments(999);
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBe(0);
  });
});