import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function savePreview(name: string, data: any) {
  const date = new Date().toISOString().split('T')[0];
  const fileName = `${name}-preview-${date}.md`;

  // Fixed path: move up from tests/api-jasonplaceholder to tests, then to test-data
  const dirPath = path.join(process.cwd(), 'Playwright', 'test-data');
  const filePath = path.join(dirPath, fileName);

  // Ensure directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const content = `# ${name} API Test Data Preview\nDate: ${date}\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;

  fs.writeFileSync(filePath, content);
}

test.describe('Posts Resource', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  test('GET /posts - should list posts', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(100);
    await savePreview('jsonplaceholder-posts', body.slice(0, 2));
  });

  test('GET /posts/1 - should return a single post', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/1`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.id).toBe(1);
    await savePreview('jsonplaceholder-single-post', body);
  });

  test('POST /posts - should create a new post', async ({ request }) => {
    const response = await request.post(`${baseUrl}/posts`, {
      data: {
        title: 'Playwright Test Post',
        body: 'This is a test body',
        userId: 1
      }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    await savePreview('jsonplaceholder-created-post', body);
  });

  test('PUT /posts/1 - should update a post entirely', async ({ request }) => {
    const response = await request.put(`${baseUrl}/posts/1`, {
      data: {
        id: 1,
        title: 'Updated Title',
        body: 'Updated Body',
        userId: 1
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    await savePreview('jsonplaceholder-updated-post', body);
  });

  test('PATCH /posts/1 - should partially update a post', async ({ request }) => {
    const response = await request.patch(`${baseUrl}/posts/1`, {
      data: {
        title: 'Partially Updated Title'
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    await savePreview('jsonplaceholder-patched-post', body);
  });

  test('DELETE /posts/1 - should delete a post', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/posts/1`);
    expect(response.status()).toBe(200);
  });
});
