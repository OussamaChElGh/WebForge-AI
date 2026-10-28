import { expect, test } from '@playwright/test';

test('comparar contra referencia aprobada sin regenerarla', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('[data-qa-ready]')).toHaveAttribute(
    'data-qa-ready',
    'true',
  );
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('components.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixels: 0,
  });
});
