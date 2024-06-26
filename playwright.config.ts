import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI !== undefined ? [['list'], ['allure-playwright']] : [['list'], ['allure-playwright']],
  use: {
    baseURL: 'https://www.rijksmuseum.nl/api/nl/',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
    },
  ]
});
