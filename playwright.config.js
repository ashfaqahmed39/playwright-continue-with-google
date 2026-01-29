// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,

  projects: [
//🔹 NORMAL MODE (NO SESSION)
    // {
    //   name: 'chrome-fresh',
    //   use: {
    //     browserName: 'chromium',
    //     channel: 'chrome',
    //     headless: false,
    //     viewport: null,
    //     ignoreHTTPSErrors: true,
    //     launchOptions: {
    //       args: [
    //         '--start-maximized',
    //         '--disable-blink-features=AutomationControlled',
    //       ],
    //     },
    //   },
    // },

//     // 🔹 PERSISTENT MODE (SESSION STORED)
    {
      name: 'chrome-persistent',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: null,
        ignoreHTTPSErrors: true,

        // ⭐ persistent context
        userDataDir: './playwright-google-profile',

        launchOptions: {
          args: [
            '--start-maximized',
            '--disable-blink-features=AutomationControlled',
          ],
        },
      },
    },
  ],
});
