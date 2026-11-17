import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10_000,
    requestTimeout: 10_000,
    responseTimeout: 30_000,
    pageLoadTimeout: 60_000,

    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // Test isolation
    testIsolation: true,

    // Spec pattern
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',

    // Video/screenshot folders
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',

    // Experimental features (commented out as they are deprecated/removed in newer versions)
    // experimentalSessionAndOrigin: true,
    // experimentalWebKitSupport: true,

    setupNodeEvents(on, config) {
      // Task for generating test data
      on('task', {
        generateUser() {
          const random = Math.floor(Math.random() * 100000);
          return {
            firstName: `User_${random}`,
            lastName: `Tester_${random}`,
            zipCode: `${10000 + (random % 90000)}`,
          };
        },
        log(message) {
          console.log(message);
          return null;
        },
        // Read file content
        readFile({ filePath, encoding = 'utf8' }) {
          const fs = require('fs');
          return fs.promises.readFile(filePath, encoding);
        },
        // Write file content
        writeFile({ filePath, content, encoding = 'utf8' }) {
          const fs = require('fs');
          return fs.promises.writeFile(filePath, content, encoding);
        },
      });

      // Allure reporter integration
      const allureWriter = require('@shelex/cypress-allure-plugin/writer');
      allureWriter(on, config);

      // Code coverage (if using @cypress/code-coverage)
      // require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },

  // Environment variables
  env: {
    ORANGEHRM_URL: process.env.ORANGEHRM_URL,
    ORANGEHRM_USERNAME: process.env.ORANGEHRM_USERNAME,
    ORANGEHRM_PASSWORD: process.env.ORANGEHRM_PASSWORD,
    REQRES_API_KEY: process.env.REQRES_API_KEY,
    REQRES_LOGIN: process.env.REQRES_LOGIN,
    REQRES_PASSWORD: process.env.REQRES_PASSWORD,
    apiUrl: 'https://jsonplaceholder.typicode.com',
    tags: '', // Default to all tags
  },

  // Reporter configuration
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mocha-junit-reporter, mochawesome',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/results/junit-[hash].xml',
    },
    mochawesomeReporterOptions: {
      reportDir: 'cypress/results/mochawesome',
      quiet: true,
      overwrite: false,
      html: true,
      json: true,
    },
  },

  // Global setup
  retries: 0,
  watchForFileChanges: true,
});