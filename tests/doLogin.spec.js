import { test, expect,chromium} from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs'; 

dotenv.config();

test.setTimeout(180000);
import { GoogleLoginPage } from '../pages/GoogleLoginPage';

test('Google Login – UI steps only', async () => {
  const profileDir = './playwright-google-profile';
  const isFirstRun = !fs.existsSync(profileDir); 
  const context = await chromium.launchPersistentContext(
    './playwright-google-profile',
    {
      channel: 'chrome',
      headless: false,
      ignoreHTTPSErrors: true,
      args: [
        '--start-maximized',
        '--disable-blink-features=AutomationControlled',
      ],
    }
  );
    const page = context.pages()[0] ?? await context.newPage();
  await page.goto(process.env.BASE_URL);

 if (isFirstRun) {
    const loginPage = new GoogleLoginPage(page);

    const googlePopup = await loginPage.clickContinueWithGoogle();
    const googleLogin = new GoogleLoginPage(googlePopup);

    await googleLogin.login(process.env.EMAIL, process.env.PASSWORD);
  }

  await page.waitForURL(/dashboard|home|profile/, { timeout: 180000 });
  await expect(page).toHaveURL(/dashboard|home|profile/);

});
