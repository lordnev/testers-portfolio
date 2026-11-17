/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface TestConfigOverrides {
      tags?: string | string[];
    }
    interface SuiteConfigOverrides {
      tags?: string | string[];
    }
  }
}

export {};