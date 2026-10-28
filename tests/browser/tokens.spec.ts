import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const tokens = await readFile(
  new URL('../../styles/tokens.css', import.meta.url),
  'utf8',
);
// Fixture de laboratorio en memoria: no es una web de cliente ni un servidor.
for (const reduced of [false, true]) {
  test(`tokens y movimiento reducido=${reduced}`, async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: reduced ? 'reduce' : 'no-preference',
    });
    await page.setContent(`<meta name="viewport" content="width=device-width, initial-scale=1"><style>${tokens}
      body { margin: 0; padding: var(--wf-space-4); background: var(--wf-color-background); color: var(--wf-color-text); font-family: var(--wf-font-body); }
      button { background: var(--wf-color-brand); color: var(--wf-color-on-brand); padding: var(--wf-space-3); border-radius: var(--wf-radius-control); }
      button:focus-visible { outline: 2px solid var(--wf-color-focus); outline-offset: 2px; }
    </style><button>Control de prueba</button>`);
    const button = page.getByRole('button', { name: 'Control de prueba' });
    await expect(button).toHaveCSS('background-color', 'rgb(29, 78, 216)');
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(button).toHaveCSS('outline-style', 'solid');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const duration = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--wf-motion-duration')
        .trim(),
    );
    expect(duration).toBe(reduced ? '0ms' : '160ms');
  });
}
