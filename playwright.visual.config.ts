import { defineConfig } from '@playwright/test';
import path from 'node:path';
import base from './playwright.config.js';

const references = process.env.WEBFORGE_VISUAL_REFERENCE_DIR;
if (!references || !path.isAbsolute(references))
  throw new Error(
    'Indica WEBFORGE_VISUAL_REFERENCE_DIR con una ruta absoluta de referencias aprobadas.',
  );

export default defineConfig(base, {
  testDir: './tests/visual',
  snapshotPathTemplate: path.join(references, '{projectName}', '{arg}{ext}'),
  updateSnapshots: 'none',
  use: { ...base.use, reducedMotion: 'reduce' },
});
