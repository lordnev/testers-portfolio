import { Page, FrameLocator, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FramesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openNestedFrames() {
    await this.navigateTo('/nested_frames');
  }

  async openIframe() {
    await this.navigateTo('/iframe');
  }

  getNestedFrameText(position: 'LEFT' | 'MIDDLE' | 'RIGHT' | 'BOTTOM'): Locator {
    if (position === 'BOTTOM') {
      return this.page.frameLocator('frame[name="frame-bottom"]').locator('body');
    }
    const topFrame = this.page.frameLocator('frame[name="frame-top"]');
    if (position === 'LEFT') {
      return topFrame.frameLocator('frame[name="frame-left"]').locator('body');
    }
    if (position === 'MIDDLE') {
      return topFrame.frameLocator('frame[name="frame-middle"]').locator('#content');
    }
    return topFrame.frameLocator('frame[name="frame-right"]').locator('body');
  }

  getIframeBody(): Locator {
    return this.page.frameLocator('#mce_0_ifr').locator('#tinymce');
  }

  async setIframeText(text: string) {
    const editor = this.getIframeBody();
    await editor.evaluate((el, t) => { el.innerHTML = `<p>${t}</p>`; }, text);
  }
}
