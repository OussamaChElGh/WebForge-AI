import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { TextReveal } from 'webforge-ai/components/TextReveal';
import { ParallaxHero } from 'webforge-ai/components/ParallaxHero';
import { MagneticButton } from 'webforge-ai/components/MagneticButton';

test('componentes compilados renderizan SSR sin window ni document', () => {
  const text = renderToString(
    createElement(TextReveal, { text: 'Texto legible', as: 'h2' }),
  );
  assert.ok(text.startsWith('<h2'));
  assert.ok(text.includes('Texto legible'));
  assert.ok(!text.includes('opacity:0'));
  const hero = renderToString(
    createElement(ParallaxHero, {
      media: createElement('span', null, 'Capa decorativa'),
      children: createElement('h2', null, 'Contenido esencial'),
    }),
  );
  assert.ok(hero.includes('aria-hidden="true"'));
  assert.ok(hero.includes('inert=""'));
  assert.ok(hero.includes('Contenido esencial'));
  const button = renderToString(
    createElement(MagneticButton, { children: 'Activar', disabled: true }),
  );
  assert.ok(button.includes('type="button"'));
  assert.ok(button.includes('disabled=""'));
});

test('MagneticButton rechaza parámetros no finitos y fuera de rango', () => {
  for (const props of [
    { strength: Infinity },
    { strength: -1 },
    { maxDistance: 41 },
    { damping: 0 },
  ]) {
    assert.throws(
      () =>
        renderToString(
          createElement(MagneticButton, { ...props, children: 'Prueba' }),
        ),
      RangeError,
    );
  }
});
