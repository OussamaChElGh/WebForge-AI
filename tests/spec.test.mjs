import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';
import { validateSpec } from '../scripts/check-spec.mjs';

// Contrato sintético de test: no aprueba un proyecto real.
const approved = () => ({
  id: 'TEST-ONLY',
  revision: 2,
  baseRevision: 'test-base',
  objective: 'Piloto tipográfico',
  status: 'approved',
  approvedBy: 'synthetic-test',
  approvedRevision: 2,
  approvalEvidence: 'fixture-only',
  allowedFiles: ['src/components/Hero.tsx'],
  protectedFiles: ['src/app/layout.tsx'],
  baselineEvidence: ['test-baseline'],
  acceptance: ['Jerarquía acordada y CTA preservado'],
  motion: {
    intent: 'Reveal no esencial',
    reducedMotion: 'Contenido estático',
    cleanup: 'Revertir scope al desmontar',
  },
  performanceBudget: {
    maxAddedJsGzipKb: 30,
    maxLcpRegressionMs: 100,
    maxCls: 0.1,
  },
});

test('gate admite contrato completo y rechaza aprobación de otra revisión', () => {
  assert.deepEqual(validateSpec(approved()), []);
  const spec = approved();
  spec.revision++;
  assert.ok(
    validateSpec(spec).some((error) => error.includes('approvedRevision')),
  );
});

test('plantilla draft bloquea implementación; no hay aprobación inventada', async () => {
  const draft = JSON.parse(
    await readFile(
      new URL('../templates/enhancement-spec.json', import.meta.url),
      'utf8',
    ),
  );
  const errors = validateSpec(draft);
  assert.ok(errors.some((error) => error.startsWith('status:')));
  assert.ok(errors.some((error) => error.startsWith('approvedBy:')));
  assert.ok(errors.some((error) => error.startsWith('baselineEvidence:')));
});

test('gate rechaza scope ambiguo, solapamiento y presupuestos ausentes', () => {
  for (const invalidPath of [
    '../outside.tsx',
    'C:/outside.tsx',
    'C:relative.tsx',
    '/etc/config',
    'src/**',
    'src/../file.tsx',
    'src\\file.tsx',
  ]) {
    const spec = approved();
    spec.allowedFiles = [invalidPath];
    assert.ok(
      validateSpec(spec).some((error) => error.startsWith('allowedFiles:')),
    );
  }
  const spec = approved();
  spec.protectedFiles = [...spec.allowedFiles];
  spec.performanceBudget.maxCls = -1;
  const errors = validateSpec(spec);
  assert.ok(errors.some((error) => error.includes('permitido y protegido')));
  assert.ok(errors.some((error) => error.includes('maxCls')));
  assert.deepEqual(validateSpec(null), [
    'La especificación debe ser un objeto',
  ]);
});
