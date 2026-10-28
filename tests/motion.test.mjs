import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mountReveal,
  mountParallax,
  motionDefaults,
} from '../motion/gsap-presets.mjs';

test('importar y llamar sin DOM no requiere window ni instancia GSAP (SSR)', () => {
  const cleanupReveal = mountReveal(null, null);
  const cleanupParallax = mountParallax(null, null, undefined);
  assert.doesNotThrow(() => {
    cleanupReveal();
    cleanupReveal();
    cleanupParallax();
  });
  assert.equal(Object.isFrozen(motionDefaults.reveal), true);
});

test('presets rechazan opciones no finitas antes de tocar el motor', () => {
  const root = { ownerDocument: { defaultView: {} } };
  assert.throws(() => mountReveal(null, root, { duration: NaN }), RangeError);
  assert.throws(
    () => mountParallax(null, null, root, { amount: Infinity }),
    RangeError,
  );
});
