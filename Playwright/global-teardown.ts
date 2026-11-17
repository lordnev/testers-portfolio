import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Global teardown started...');

  // Optional: Clean up old test results (keep last 10 runs)
  const resultsDir = path.resolve(__dirname, '..', 'test-results');
  if (fs.existsSync(resultsDir)) {
    const files = fs.readdirSync(resultsDir)
      .map(file => ({ file, mtime: fs.statSync(path.join(resultsDir, file)).mtime }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    if (files.length > 20) {
      for (let i = 10; i < files.length; i++) {
        fs.unlinkSync(path.join(resultsDir, files[i].file));
      }
      console.log(`🗑️ Cleaned up ${files.length - 10} old test result files`);
    }
  }

  console.log('✅ Global teardown completed');
}

export default globalTeardown;