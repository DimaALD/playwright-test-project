import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  reporter: 'line',
  testDir: '../tests/e2e',
  workers: 10,
  use: {
    actionTimeout: 10000,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: 'http://zero.webappsecurity.com',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', headless: true },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox', headless: true },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit', headless: true },
    },
  ],
};

export default config;
