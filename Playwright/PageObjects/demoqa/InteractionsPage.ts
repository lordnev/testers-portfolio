import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InteractionsPage extends BasePage {
  private readonly sourceElement: Locator;
  private readonly targetElement: Locator;
  private readonly resizableBox: Locator;
  private readonly resizableHandle: Locator;
  private readonly selectableItems: (index: number) => Locator;

  constructor(page: Page) {
    super(page);
    this.sourceElement = page.locator('#draggable');
    this.targetElement = page.locator('#droppable');
    this.resizableBox = page.locator('#resizable');
    this.resizableHandle = page.locator('.resizer');
    this.selectableItems = (index: number) => page.locator('.selectable-item').nth(index);
  }

  async dragAndDrop(): Promise<void> {
    await this.sourceElement.dragTo(this.targetElement);
  }

  async verifyDropResult(expectedText: string): Promise<void> {
    await expect(this.targetElement).toContainText(expectedText);
  }

  async resizeElement(): Promise<void> {
    const box = this.resizableBox;
    await this.scrollIntoView(box);
    const boxRect = await box.boundingBox();

    // Use mouse to drag the handle
    await this.page.mouse.move(
      (await this.resizableHandle.boundingBox())?.x || 0,
      (await this.resizableHandle.boundingBox())?.y || 0
    );
    await this.page.mouse.down();
    await this.page.mouse.move(200, 200);
    await this.page.mouse.up();

    const newBoxRect = await box.boundingBox();
    if (!boxRect || !newBoxRect) throw new Error('Could not get bounding box');
    expect(newBoxRect.width).toBeGreaterThan(boxRect.width);
    expect(newBoxRect.height).toBeGreaterThan(boxRect.height);
  }

  async selectItems(indices: number[]): Promise<void> {
    for (const index of indices) {
      await this.selectableItems(index).click();
    }
  }

  async verifyItemIsSelected(index: number): Promise<void> {
    await expect(this.selectableItems(index)).toHaveClass(/selected/);
  }
}
