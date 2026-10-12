import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function savePreview(name: string, data: any) {
  const date = new Date().toISOString().split('T')[0];
  const fileName = `${name}-preview-${date}.md`;

  // Using process.cwd() to ensure we are relative to the project root
  const dirPath = path.join(process.cwd(), 'Playwright', 'test-data');
  const filePath = path.join(dirPath, fileName);

  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const content = `# ${name} API Test Data Preview\nDate: ${date}\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`Failed to save preview to ${filePath}:`, error);
  }
}

test.describe('Posts Routing - Filter & Nested', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  test('GET /comments?postId=1 - should filter comments by postId', async ({ request }) => {
    const response = await request.get(`${baseUrl}/comments`, {
      params: { postId: 1 }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    body.forEach(comment => {
      expect(comment.postId).toBe(1);
    });
    await savePreview('jsonplaceholder-filtered-comments', body.slice(0, 2));
  });

  test('GET /posts/1/comments - should return comments for a specific post (Nested)', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/1/comments`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    body.forEach(comment => {
      expect(comment.postId).toBe(1);
    });
    await savePreview('jsonplaceholder-nested-comments', body.slice(0, 2));
  });
});
