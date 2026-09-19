import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class UploadDownloadPage extends BasePage {
  readonly fileInput: Locator;
  readonly uploadBtn: Locator;
  readonly uploadedFilesText: Locator;
  readonly downloadLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.fileInput = page.locator('#file-upload');
    this.uploadBtn = page.locator('#file-submit');
    this.uploadedFilesText = page.locator('#uploaded-files');
    this.downloadLinks = page.locator('.example a');
  }

  async openUpload() {
    await this.navigateTo('/upload');
  }

  async openDownload() {
    await this.navigateTo('/download');
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadBtn.click();
  }
}
