import { Page, Locator } from '@playwright/test';

export class MyPage {
    readonly page: Page;
    readonly personalDetailsSection: Locator;
    readonly contactDetailsSection: Locator;
    readonly profilePic: Locator;

    constructor(page: Page) {
        this.page = page;
        this.personalDetailsSection = page.locator('.oxd-card');
        this.contactDetailsSection = page.locator('text=Contact Details');
        this.profilePic = page.locator('.oxd-userprofile-image');
    }

    async verifyPersonalDetails() {
        await this.personalDetailsSection.waitFor({ state: 'visible' });
    }

    async verifyContactDetails() {
        await this.contactDetailsSection.waitFor({ state: 'visible' });
    }

    async verifyProfilePic() {
        await this.profilePic.waitFor({ state: 'visible' });
    }
}
