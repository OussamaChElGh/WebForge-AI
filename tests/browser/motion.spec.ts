import { test, expect, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

declare global {
  interface Window {
    gsap: typeof import('gsap').gsap;
    ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    wfMotion: typeof import('../../motion/gsap-presets.mjs');
    wfCleanup: () => void;
  }
}
const source = await readFile(
  new URL('../../motion/gsap-presets.mjs', import.meta.url),
  'utf8',
);
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;

async function load(page: Page) {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // Todo local: fixture en memoria, sin aplicación ni peticiones a terceros.
  await page.setContent(`<meta name="viewport" content="width=device-width, initial-scale=1"><style>body { margin: 0; } #scope { padding-top: 80vh; min-height: 200vh; } .layer { height: 120px; width: 80px; }</style>
    <div id="outside" data-wf-reveal>Fuera del scope</div>
    <section id="scope"><p data-wf-reveal style="color: red">Texto de laboratorio</p><div class="layer" data-wf-parallax></div></section>`);
  await page.addScriptTag({
    path: fileURLToPath(
      new URL('../../node_modules/gsap/dist/gsap.min.js', import.meta.url),
    ),
  });
  await page.addScriptTag({
    path: fileURLToPath(
      new URL(
        '../../node_modules/gsap/dist/ScrollTrigger.min.js',
        import.meta.url,
      ),
    ),
  });
  await page.evaluate(async (url) => {
    window.wfMotion = await import(url);
  }, moduleUrl);
}

test('reveal scoping y cleanup repetible preservan estilos originales', async ({
  page,
}) => {
  await load(page);
  const result = await page.evaluate(() => {
    const root = document.querySelector('#scope')!;
    const target = root.querySelector('[data-wf-reveal]')!;
    const outside = document.querySelector('#outside')!;
    const original = (target as HTMLElement).style.cssText;
    const cleanup = window.wfMotion.mountReveal(window.gsap, root, {
      duration: 2,
    });
    const local = window.gsap.getTweensOf(target).length;
    const external = window.gsap.getTweensOf(outside).length;
    cleanup();
    cleanup();
    const restored = (target as HTMLElement).style.cssText;
    const remount = window.wfMotion.mountReveal(window.gsap, root);
    const mountedAgain = window.gsap.getTweensOf(target).length;
    remount();
    return {
      local,
      external,
      original,
      restored,
      mountedAgain,
      remaining: window.gsap.getTweensOf(target).length,
    };
  });
  expect(result.local).toBe(1);
  expect(result.external).toBe(0);
  expect(result.restored).toBe(result.original);
  expect(result.mountedAgain).toBe(1);
  expect(result.remaining).toBe(0);
});

test('preferencia reducida al cargar y cambiar mantiene contenido visible', async ({
  page,
}) => {
  await load(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => {
    window.wfCleanup = window.wfMotion.mountReveal(
      window.gsap,
      document.querySelector('#scope'),
      { duration: 2 },
    );
  });
  const target = page.locator('#scope [data-wf-reveal]');
  await expect(target).toHaveCSS('opacity', '1');
  expect(
    await page.evaluate(
      () => window.gsap.getTweensOf('#scope [data-wf-reveal]').length,
    ),
  ).toBe(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect
    .poll(() =>
      page.evaluate(
        () => window.gsap.getTweensOf('#scope [data-wf-reveal]').length,
      ),
    )
    .toBe(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(target).toHaveCSS('opacity', '1');
  await expect
    .poll(() =>
      page.evaluate(
        () => window.gsap.getTweensOf('#scope [data-wf-reveal]').length,
      ),
    )
    .toBe(0);
  await page.evaluate(() => window.wfCleanup());
});

test('parallax solo en viewport permitido y cleanup conserva triggers ajenos', async ({
  page,
}) => {
  await load(page);
  const width = page.viewportSize()!.width;
  const active = await page.evaluate(() => {
    const { gsap, ScrollTrigger, wfMotion } = window;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      id: 'wf-external',
      trigger: '#outside',
      start: 'top top',
    });
    window.wfCleanup = wfMotion.mountParallax(
      gsap,
      ScrollTrigger,
      document.querySelector('#scope'),
    );
    return ScrollTrigger.getAll().length;
  });
  expect(active).toBe(width >= 768 ? 2 : 1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() => page.evaluate(() => window.ScrollTrigger.getAll().length))
    .toBe(1);
  await expect(page.locator('[data-wf-parallax]')).toHaveCSS(
    'transform',
    'none',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect
    .poll(() => page.evaluate(() => window.ScrollTrigger.getAll().length))
    .toBe(width >= 768 ? 2 : 1);
  await page.setViewportSize({ width: 390, height: 740 });
  await expect
    .poll(() => page.evaluate(() => window.ScrollTrigger.getAll().length))
    .toBe(1);
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect
    .poll(() => page.evaluate(() => window.ScrollTrigger.getAll().length))
    .toBe(2);
  const after = await page.evaluate(() => {
    window.wfCleanup();
    window.wfCleanup();
    const external = window.ScrollTrigger.getById('wf-external');
    const result = {
      count: window.ScrollTrigger.getAll().length,
      preserved: Boolean(external),
    };
    external?.kill();
    return result;
  });
  expect(after.count).toBe(1);
  expect(after.preserved).toBe(true);
});
