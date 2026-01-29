export class GoogleLoginPage {
  constructor(page) {
    this.page=page;
    this.googleButtons = [
                          page.getByRole('button', { name: 'Continue with Google' }),
                          page.getByRole('button', { name: 'Google' }),
                          page.getByRole('button', { name: 'Sign in with Google' }) // added more variants if required
                        ];
    this.emailTxt = this.page.locator('input#identifierId, input[name="identifier"], input[type="email"]');
    this.passwordTxt = this.page.locator('input[type="password"]:not([aria-hidden])').first();
    this.nextBtn = this.page.getByRole('button', { name: /Next/i });
    this.continueBtn= this.page.getByRole('button', { name: 'Continue' });
  }

  async clickContinueWithGoogle() {
    let buttonFound = null;
    for (const btn of this.googleButtons) {
      if (await btn.isVisible().catch(() => false)) {
        buttonFound = btn;
        break;
      }
    }
  if (!buttonFound) {
    throw new Error('No Google button found');
  }

  const clickPromise = buttonFound.click();

    try {
      const googlePage = await this.page.context().waitForEvent('page', { timeout: 10000 });
      await clickPromise;
      await googlePage.waitForLoadState('domcontentloaded');
      return googlePage;
    } catch (e) {
      // No new page opened; assume same-page navigation
      await clickPromise;
      await this.page.waitForLoadState('domcontentloaded');
      return this.page;
    }
  }
  async login(email, password) {
    await this.emailTxt.waitFor({ state: 'visible', timeout: 15000 });
    await this.emailTxt.fill(email);
    await this.nextBtn.click();

    await this.passwordTxt.waitFor({ state: 'visible', timeout: 60000 });
    await this.passwordTxt.fill(password);
    await this.nextBtn.click();
   if (await this.continueBtn.isVisible().catch(() => false)) {
  await this.continueBtn.click();
  console.log("✅ Continue button clicked");
} else {
  console.log("ℹ️ Continue button not present, skipping");
}

    await this.page.waitForLoadState('networkidle');
  }
}
