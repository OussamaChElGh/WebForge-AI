import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import process from 'node:process';

const nonEmpty = (value) =>
  typeof value === 'string' && value.trim().length > 0;
const concretePath = (value) =>
  nonEmpty(value) &&
  !value.startsWith('/') &&
  !/^[A-Za-z]:/.test(value) &&
  !value.includes('\\') &&
  !value.split('/').some((part) => ['..', '.', ''].includes(part)) &&
  !['*', '?', '[', ']'].some((char) => value.includes(char));

/** Gate estructural; no verifica identidad ni autenticidad de la aprobación humana. */
export function validateSpec(spec) {
  const errors = [];
  if (!spec || typeof spec !== 'object' || Array.isArray(spec))
    return ['La especificación debe ser un objeto'];
  for (const field of ['id', 'baseRevision', 'objective', 'approvalEvidence']) {
    if (!nonEmpty(spec[field])) errors.push(`${field}: obligatorio`);
  }
  if (!Number.isInteger(spec.revision) || spec.revision < 1)
    errors.push('revision: entero positivo');
  if (spec.status !== 'approved')
    errors.push('status: debe ser approved antes de implementar');
  if (!nonEmpty(spec.approvedBy)) errors.push('approvedBy: obligatorio');
  if (spec.approvedRevision !== spec.revision)
    errors.push(
      'approvedRevision: la aprobación no corresponde a esta revisión',
    );
  for (const field of ['allowedFiles', 'protectedFiles']) {
    if (
      !Array.isArray(spec[field]) ||
      (field === 'allowedFiles' && !spec[field].length) ||
      !spec[field].every(concretePath)
    )
      errors.push(`${field}: usar rutas relativas concretas sin comodines`);
    else if (new Set(spec[field]).size !== spec[field].length)
      errors.push(`${field}: contiene duplicados`);
  }
  if (
    Array.isArray(spec.allowedFiles) &&
    Array.isArray(spec.protectedFiles) &&
    spec.allowedFiles.some((file) => spec.protectedFiles.includes(file))
  )
    errors.push('Un archivo no puede estar permitido y protegido');
  for (const field of ['baselineEvidence', 'acceptance']) {
    if (
      !Array.isArray(spec[field]) ||
      !spec[field].length ||
      !spec[field].every(nonEmpty)
    )
      errors.push(`${field}: lista no vacía de referencias o criterios`);
  }
  if (
    !spec.motion ||
    !nonEmpty(spec.motion.intent) ||
    !nonEmpty(spec.motion.reducedMotion) ||
    !nonEmpty(spec.motion.cleanup)
  )
    errors.push(
      'motion: definir intención, reducedMotion y cleanup, incluso para cambios estáticos',
    );
  const budget = spec.performanceBudget;
  for (const metric of ['maxAddedJsGzipKb', 'maxLcpRegressionMs', 'maxCls']) {
    if (
      !budget ||
      typeof budget[metric] !== 'number' ||
      !Number.isFinite(budget[metric]) ||
      budget[metric] < 0
    )
      errors.push(`performanceBudget.${metric}: número no negativo acordado`);
  }
  return errors;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    if (!process.argv[2])
      throw new Error('Uso: npm run spec:check -- ruta/spec.json');
    const errors = validateSpec(
      JSON.parse(await readFile(process.argv[2], 'utf8')),
    );
    if (errors.length) throw new Error(errors.join('\n'));
    process.stdout.write(
      'Especificación estructuralmente aprobada; contrastar la evidencia humana antes de editar.\n',
    );
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
