# ParaBank Automation with Serenity/JS, Playwright & TypeScript

A beginner-friendly project demonstrating how to implement the **Screenplay Pattern** using [Serenity/JS](https://serenity-js.org/), [Playwright](https://playwright.dev/) and TypeScript.

This project uses the ParaBank demo banking application to demonstrate browser automation using Serenity/JS's built-in Screenplay Pattern implementation.

## Overview

The Screenplay Pattern provides a structured way to write maintainable and reusable automated tests.

Instead of putting all browser interactions and assertions directly into test cases, we organise the automation around:

- **Actors** – represent users interacting with the application.
- **Abilities** – define what actors can do.
- **Tasks** – represent business activities performed by actors.
- **Interactions** – represent individual actions performed by actors.
- **Questions** – retrieve information from the application.
- **Assertions** – verify expected application behaviour.

This project uses the actual Serenity/JS APIs rather than a custom implementation of the Screenplay Pattern.

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Programming language |
| Playwright | Browser automation |
| Serenity/JS | Screenplay Pattern implementation |
| Serenity/JS Assertions | Test assertions |
| Playwright Test | Test execution |
| Serenity/JS Console Reporter | Console reporting |
| Serenity/JS HTML Reporter | HTML test reporting |
| Node.js | Runtime environment |

## Application Under Test

**ParaBank Demo Application**

https://parabank.parasoft.com/parabank/

The project uses the publicly available ParaBank demo application to demonstrate browser-based testing scenarios.

## Prerequisites

Before getting started, make sure you have:

- Node.js installed.
- npm installed.
- Visual Studio Code or another TypeScript-compatible editor.
- Basic knowledge of TypeScript and Playwright.

Check your Node.js and npm versions:

```bash
node --version
npm --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd parabank-serenity
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

For this project, Chromium is used.

```bash
npx playwright install chromium
```

### 4. Configure the application URL

The Playwright configuration uses the ParaBank application URL as its base URL.

```typescript
use: {
  baseURL: 'https://parabank.parasoft.com/parabank/',
  browserName: 'chromium',
  headless: false,
},
```

The trailing slash in `baseURL` is intentional. It allows relative navigation paths such as `index.htm` to resolve correctly.

## Project Structure

The project follows a simple Screenplay Pattern structure.

```text
parabank-serenity/
│
├── screenplay/
│   ├── tasks/
│   │   └── Login.ts
│   │
│   └── questions/
│       └── AccountOverview.ts
│
├── tests/
│   └── login.spec.ts
│
├── reports/
│   └── serenity-js/
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### Folder Responsibilities

| Folder/File | Responsibility |
|---|---|
| `screenplay/tasks` | Contains reusable business tasks |
| `screenplay/questions` | Contains questions used to retrieve application information |
| `tests` | Contains Playwright test scenarios |
| `reports` | Stores generated test reports |
| `playwright.config.ts` | Contains Playwright and Serenity/JS configuration |
| `tsconfig.json` | Contains TypeScript compiler configuration |

## Understanding the Screenplay Implementation

### 1. Tasks

Tasks represent business activities performed by an actor.

For example, logging into ParaBank is a business activity.

`screenplay/tasks/Login.ts`

```typescript
import { Answerable, Task, the } from '@serenity-js/core';
import { By, Click, Enter, PageElement } from '@serenity-js/web';

export const Login = {
  withCredentials: (
    username: Answerable<string>,
    password: Answerable<string>
  ) =>
    Task.where(
      the`#actor logs in with username ${username}`,

      Enter.theValue(username).into(
        PageElement.located(By.css('input[name="username"]'))
          .describedAs('username field')
      ),

      Enter.theValue(password).into(
        PageElement.located(By.css('input[name="password"]'))
          .describedAs('password field')
      ),

      Click.on(
        PageElement.located(
          By.role('button', { name: 'Log In', exact: true })
        ).describedAs('Log In button')
      )
    ),
};
```

The `Task.where()` method combines multiple interactions into a single reusable task.

### 2. Questions

Questions retrieve information from the application.

For example, we can retrieve the account overview heading.

`screenplay/questions/AccountOverview.ts`

```typescript
import { Question } from '@serenity-js/core';
import { By, PageElement, Text } from '@serenity-js/web';

export const AccountOverview = {
  headingText: () =>
    Question.about<string>(
      'the account overview heading',
      async actor => actor.answer(
        Text.of(
          PageElement.located(
            By.css('#showOverview h1')
          )
        )
      )
    ),

  accountsTableIsVisible: () =>
    Question.about<boolean>(
      'whether the account overview table is visible',
      async actor => actor.answer(
        PageElement.located(
          By.id('accountTable')
        ).isVisible()
      )
    ),
};
```

`Question.about()` allows us to define reusable Questions without creating custom Question classes.

### 3. Assertions

Serenity/JS provides the `Ensure.that()` interaction to verify expected outcomes.

For example:

```typescript
Ensure.that(
  AccountOverview.headingText(),
  equals('Accounts Overview')
);
```

To verify that the account table is visible:

```typescript
Ensure.that(
  AccountOverview.accountsTableIsVisible(),
  isTrue()
);
```

Assertions are kept separate from the interactions that perform the business activity.

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests with a specific number of workers:

```bash
npx playwright test --workers=2
```

Run tests in Playwright UI mode:

```bash
npx playwright test --ui
```

## Parallel Execution

Playwright supports parallel test execution through its configuration.

Example configuration:

```typescript
fullyParallel: true,
workers: process.env.CI ? 2 : 4,
```

- `fullyParallel: true` allows tests within the same file to execute in parallel.
- `workers: 4` allows up to four worker processes locally.
- `workers: 2` limits execution to two workers in CI.

Make sure tests use independent test data to avoid conflicts during parallel execution.

## Reporting

This project uses the Serenity/JS HTML Reporter to generate an interactive test report.

The reporter is configured in `playwright.config.ts`.

Example:

```typescript
reporter: [
  [
    '@serenity-js/playwright-test',
    {
      crew: [
        '@serenity-js/console-reporter',
        [
          '@serenity-js/html-reporter',
          {
            outputDirectory: './reports/serenity-js',
            specDirectory: './tests',
          },
        ],
      ],
    },
  ],
],
```

The HTML report is generated automatically after the test run completes.

### Open the Serenity/JS HTML Report

Run:

```bash
npx @serenity-js/html-reporter serve --open
```

To specify a report directory:

```bash
npx @serenity-js/html-reporter serve --dir ./reports/serenity-js --open
```

Alternatively, open the generated `index.html` file directly:

```text
reports/serenity-js/index.html
```

No separate Java installation or Serenity BDD CLI is required for the Serenity/JS HTML Reporter.

## Key Learning Areas

This project is intended to demonstrate:

- Implementing the Screenplay Pattern with Serenity/JS.
- Integrating Serenity/JS with Playwright and TypeScript.
- Creating reusable Tasks using `Task.where()`.
- Implementing Questions using `Question.about()`.
- Using Playwright-compatible accessible locators through Serenity/JS.
- Writing assertions using `Ensure.that()`.
- Configuring parallel test execution.
- Generating interactive HTML test reports.
- Separating business activities, interactions and assertions.

## Useful Resources

- [Serenity/JS Official Website](https://serenity-js.org/)
- [Serenity/JS API Documentation](https://serenity-js.org/api/)
- [Serenity/JS Task API](https://serenity-js.org/api/core/class/Task/)
- [Serenity/JS Question API](https://serenity-js.org/api/core/class/Question/)
- [Serenity/JS Playwright Test Integration](https://serenity-js.org/handbook/test-runners/playwright-test/)
- [Serenity/JS HTML Reporter](https://serenity-js.org/handbook/reporting/html-reporter/)
- [Playwright Documentation](https://playwright.dev/docs/intro)

## Contributing

Suggestions, improvements and contributions are welcome.

If you find an issue or have an idea to improve the project, feel free to open an issue or submit a pull request.

## Disclaimer

ParaBank is a publicly available demo banking application. This project is intended for learning and demonstrating test automation concepts. It is not intended for testing real banking transactions or production banking systems.

---

**If you find this project useful, consider giving the repository a star!**