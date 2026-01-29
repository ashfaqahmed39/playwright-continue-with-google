
# Continue with Google (Playwright)

This project automates a "Continue with Google" login flow using Playwright and a simple Page Object model. It is designed for UI-only login steps and stores a persistent browser profile so the login can be skipped on subsequent runs.

## What this repo contains

- A Playwright test that launches Chrome with a persistent profile and performs the Google login on first run.
- A page object that handles the Google login popup or same-page redirect.
- A Playwright config with two projects (fresh and persistent) for local execution.

## Project layout

- `pages/GoogleLoginPage.js` - Page Object for the Continue with Google flow.
- `tests/doLogin.spec.js` - The login test (UI steps only).
- `playwright.config.js` - Playwright configuration and projects.
- `.env` - Local environment variables (not checked in here).
- `playwright-google-profile/` - Persistent Chrome profile directory created at runtime.

## How it works

1. The test launches Chrome using a persistent context at `./playwright-google-profile`.
2. On the first run (when the profile folder does not exist), it:
   - Clicks the "Continue with Google" button.
   - Handles either a new popup window or same-page redirect.
   - Enters email and password.
   - Clicks "Next" and optionally "Continue" if the consent screen appears.
3. On subsequent runs, the test skips login and reuses the saved session.
4. The test waits for a URL that matches `/dashboard|home|profile/` to confirm login.

## Requirements

- Node.js (LTS recommended).
- Google Chrome installed (Playwright uses the `chrome` channel).
- Network access to the app under test and Google's login page.

## Environment variables

Create a `.env` file in the project root with:

```
BASE_URL=<your app url>
EMAIL=<google account email>
PASSWORD=<google account password>
```

Notes:
- Do not commit real credentials.
- The project uses `dotenv` to load these values.

## Install

```
npm install
npx playwright install
```

## Run tests

Run the full test suite:

```
npx playwright test
```

Run only the login test:

```
npx playwright test tests/doLogin.spec.js
```

## Playwright configuration details

`playwright.config.js` defines two projects:

- `chrome-fresh` - Non-persistent Chrome (fresh session each run).
- `chrome-persistent` - Persistent Chrome using `./playwright-google-profile`.

Other notable settings:

- `fullyParallel: false` and `workers: 1` to keep login flow stable.
- `headless: false` for interactive debugging.
- `--start-maximized` and `--disable-blink-features=AutomationControlled` flags.

## Security and account safety

- Use a dedicated test Google account.
- Expect Google to challenge sign-in with CAPTCHA or 2FA depending on account settings.
- If the stored session becomes invalid, delete `./playwright-google-profile` and re-run.

## Troubleshooting

- If login fails, verify `BASE_URL`, `EMAIL`, and `PASSWORD`.
- If the Google login opens in a new window, the page object handles it automatically.
- If the app's post-login URL changes, update the `waitForURL` regex in the test.
