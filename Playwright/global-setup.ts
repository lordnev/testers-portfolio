import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Global setup started...');

  // Ensure test directories exist
  const dirs = [
    'test-results',
    'test-snapshots',
    'allure-results',
    'downloads',
    path.join('Playwright', 'test-data'),
  ];

  for (const dir of dirs) {
    const fullPath = path.resolve(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Created directory: ${fullPath}`);
    }
  }

  // Pre-warm browser (optional, speeds up first test)
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.close();
  await browser.close();

  console.log('✅ Global setup completed');
}

export default globalSetup;