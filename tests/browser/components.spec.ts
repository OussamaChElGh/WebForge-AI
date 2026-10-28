import { expect, test, type Page } from '@playwright/test';

async function openFixture(page: Page) {
  await page.goto('/');
  await expect(page.locator('[data-qa-ready]')).toHaveAttribute(
    'data-qa-ready',
    'true',
  );
}
async function offset(page: Page) {
  return page.locator('#magnetic').evaluate((button) => {
    const transform = getComputedStyle(button).transform;
    if (transform === 'none') return 0;
    const matrix = new DOMMatrixReadOnly(transform);
    return Math.hypot(matrix.m41, matrix.m42);
  });
}

test('captura real, overflow y acciones con ratón y teclado', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openFixture(page);
  await expect(
    page.getByRole('heading', { name: 'Tipografía que conserva su voz' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const screenshot = await page.screenshot({
    path: info.outputPath('components.png'),
    fullPage: true,
    animations: 'disabled',
  });
  await info.attach('components', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.locator('#toggle').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('#magnetic')).toBeFocused();
  await expect(page.locator('#decorative-link')).not.toBeFocused();
  await page.getByRole('button', { name: 'Acción magnética' }).click();
  await expect(page.getByRole('status')).toHaveText('Activaciones: 1');
  await page.locator('#magnetic').focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Activaciones: 2');
  await expect(
    page.getByRole('button', { name: 'Acción deshabilitada' }),
  ).toBeDisabled();
  await page.locator('#magnetic').blur();
  expect(errors).toEqual([]);
});

test('magnetismo acotado, reset y ausencia de movimiento touch/teclado', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openFixture(page);
  const button = page.locator('#magnetic');
  await button.scrollIntoViewIfNeeded();
  const bounds = (await button.boundingBox())!;
  const fine = await page.evaluate(
    () => matchMedia('(hover: hover) and (pointer: fine)').matches,
  );
  if (fine) {
    await page.mouse.move(
      bounds.x + bounds.width * 0.8,
      bounds.y + bounds.height * 0.7,
    );
    await expect.poll(() => offset(page)).toBeGreaterThan(0.5);
    expect(await offset(page)).toBeLessThan(23); // máximo 16 por eje
    await page.mouse.move(2, 2);
    await expect.poll(() => offset(page)).toBeLessThan(0.5);
  } else {
    await button.dispatchEvent('pointermove', {
      pointerType: 'touch',
      clientX: bounds.x + bounds.width,
      clientY: bounds.y,
    });
    expect(await offset(page)).toBe(0);
  }
  await button.focus();
  await page.mouse.move(
    bounds.x + bounds.width * 0.8,
    bounds.y + bounds.height * 0.7,
  );
  await expect.poll(() => offset(page)).toBeLessThan(0.5);
});

test('cambio de reduced motion restaura texto, parallax y botón', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openFixture(page);
  await page.locator('#magnetic').scrollIntoViewIfNeeded();
  const bounds = (await page.locator('#magnetic').boundingBox())!;
  await page.mouse.move(
    bounds.x + bounds.width * 0.8,
    bounds.y + bounds.height * 0.7,
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => offset(page)).toBeLessThan(0.01);
  await expect
    .poll(() =>
      page.evaluate(() => window.wfComponents.ScrollTrigger.getAll().length),
    )
    .toBe(0);
  await expect(page.locator('#hero [data-wf-parallax]')).toHaveCSS(
    'transform',
    'none',
  );
  await expect(page.locator('#hero [data-wf-reveal]').first()).toHaveCSS(
    'opacity',
    '1',
  );
});

test('montaje y desmontaje en StrictMode no acumula ScrollTriggers', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await openFixture(page);
  const expected = page.viewportSize()!.width >= 768 ? 1 : 0;
  await expect
    .poll(() =>
      page.evaluate(() => window.wfComponents.ScrollTrigger.getAll().length),
    )
    .toBe(expected);
  for (let index = 0; index < 3; index++) {
    await page.locator('#toggle').click();
    await expect(page.locator('#components')).toHaveCount(0);
    expect(
      await page.evaluate(
        () => window.wfComponents.ScrollTrigger.getAll().length,
      ),
    ).toBe(0);
    await page.locator('#toggle').click();
    await expect(page.locator('#components')).toHaveCount(1);
    await expect
      .poll(() =>
        page.evaluate(() => window.wfComponents.ScrollTrigger.getAll().length),
      )
      .toBe(expected);
  }
});

test('contenido SSR usable sin JavaScript', async ({ browser, page }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: page.viewportSize()!,
  });
  const noJS = await context.newPage();
  try {
    await noJS.goto('http://127.0.0.1:4173');
    await expect(
      noJS.getByRole('heading', { name: 'Tipografía que conserva su voz' }),
    ).toBeVisible();
    await expect(
      noJS.getByRole('button', { name: 'Acción magnética' }),
    ).toBeVisible();
    await expect(noJS.locator('#hero [data-wf-reveal]').first()).toHaveCSS(
      'opacity',
      '1',
    );
  } finally {
    await context.close();
  }
});
