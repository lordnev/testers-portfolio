import { test, expect } from '../../fixtures/test-fixtures';
import { JsonPlaceholderClient } from '../../utils/api-helpers';
import { API_TEST_DATA } from '../../utils/test-data-generators';

test.describe('JSONPlaceholder Posts API @api', () => {
  let jsonPlaceholderClient: JsonPlaceholderClient;

  test.beforeEach(async ({ request }) => {
    jsonPlaceholderClient = new JsonPlaceholderClient(request);
  });

  test('GET /posts - should list all posts @smoke', async () => {
    const posts = await jsonPlaceholderClient.getPosts();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBe(100);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
    expect(posts[0]).toHaveProperty('userId');
  });

  test('GET /posts/1 - should return a single post @smoke', async () => {
    const post = await jsonPlaceholderClient.getPost(1);
    expect(post.id).toBe(1);
    expect(post.title).toBeDefined();
    expect(post.body).toBeDefined();
    expect(post.userId).toBeDefined();
  });

  test('POST /posts - should create a new post @smoke', async () => {
    const newPost = await jsonPlaceholderClient.createPost(API_TEST_DATA.jsonPlaceholder.post);
    expect(newPost.id).toBeDefined();
    expect(newPost.title).toBe(API_TEST_DATA.jsonPlaceholder.post.title);
    expect(newPost.body).toBe(API_TEST_DATA.jsonPlaceholder.post.body);
    expect(newPost.userId).toBe(API_TEST_DATA.jsonPlaceholder.post.userId);
  });

  test('PUT /posts/1 - should update a post entirely @regression', async () => {
    const updatedPost = await jsonPlaceholderClient.updatePost(1, {
      id: 1,
      ...API_TEST_DATA.jsonPlaceholder.updatedPost,
    });
    expect(updatedPost.id).toBe(1);
    expect(updatedPost.title).toBe(API_TEST_DATA.jsonPlaceholder.updatedPost.title);
    expect(updatedPost.body).toBe(API_TEST_DATA.jsonPlaceholder.updatedPost.body);
  });

  test('PATCH /posts/1 - should partially update a post @regression', async () => {
    const patchedPost = await jsonPlaceholderClient.patchPost(1, {
      title: 'Partially Updated Title',
    });
    expect(patchedPost.id).toBe(1);
    expect(patchedPost.title).toBe('Partially Updated Title');
    // body should remain unchanged
    expect(patchedPost.body).toBeDefined();
  });

  test('DELETE /posts/1 - should delete a post @regression', async () => {
    await expect(jsonPlaceholderClient.deletePost(1)).resolves.toBeUndefined();
  });

  test('GET /posts with pagination simulation @regression', async () => {
    const posts = await jsonPlaceholderClient.getPosts({ _limit: '10', _page: '2' });
    expect(posts.length).toBeLessThanOrEqual(10);
  });
});