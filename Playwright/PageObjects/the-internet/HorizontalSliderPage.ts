import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HorizontalSliderPage extends BasePage {
  readonly slider: Locator;
  readonly rangeValue: Locator;

  constructor(page: Page) {
    super(page);
    this.slider = page.locator('.sliderContainer input');
    this.rangeValue = page.locator('#range');
  }

  async open() {
    await this.navigateTo('/horizontal_slider');
  }

  async setSliderValueWithKeys(targetValue: number) {
    await this.slider.focus();
    let current = parseFloat((await this.rangeValue.innerText()) || '0');
    while (current < targetValue) {
      await this.page.keyboard.press('ArrowRight');
      current = parseFloat(await this.rangeValue.innerText());
    }
  }
}
