import { defineConfig } from '@playwright/test';
import type {
    SerenityFixtures,
    SerenityWorkerFixtures
} from '@serenity-js/playwright-test';

export default defineConfig<SerenityFixtures, SerenityWorkerFixtures>({

    testDir: './tests',
  fullyParallel: true,

  // Maximum number of parallel workers
  workers: process.env.CI ? 2 : 4,

  // Other configurations
  timeout: 10000,

    expect: {
        timeout: 5000
    },

    retries: 0,

    reporter: [
        ['@serenity-js/playwright-test', {
            crew: [
                '@serenity-js/console-reporter',

                ['@serenity-js/html-reporter', {
                    specDirectory: './tests'
                }]
            ]
        }],

        ['html', {
            open: 'never'
        }]
    ],

    use: {
        baseURL: 'https://parabank.parasoft.com/parabank/',

        browserName: 'chromium',

        headless: false,
        
        defaultActorName: 'Faisal',

        screenshot: 'only-on-failure',

        trace: 'retain-on-failure',

        crew: [
            ['@serenity-js/web:Photographer', {
                strategy: 'TakePhotosOfFailures'
            }]
        ]
    }
  
}); 