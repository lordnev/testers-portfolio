import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function savePreview(name: string, data: any) {
  const date = new Date().toISOString().split('T')[0];
  const fileName = `${name}-preview-${date}.md`;

  // Resolve path relative to the current working directory
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

test.describe('Other Resources', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const resources = ['comments', 'albums', 'photos', 'todos', 'users'];

  for (const resource of resources) {
    test(`GET /${resource} - should list ${resource}`, async ({ request }) => {
      const response = await request.get(`${baseUrl}/${resource}`);
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(Array.isArray(body)).toBeTruthy();
      await savePreview(`jsonplaceholder-${resource}`, body.slice(0, 2));
    });
  }
});
