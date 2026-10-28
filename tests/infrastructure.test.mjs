import process from 'node:process';
import { URL } from 'node:url';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parse } from 'smol-toml';

const root = new URL('../', import.meta.url);
const read = (file) => readFile(new URL(file, root), 'utf8');
const roles = ['creative_director', 'creative_engineer', 'visual_critic'];

test('solo tres roles activos y crítico read-only; sin modelo impuesto', async () => {
  const config = parse(await read('.codex/config.toml'));
  assert.equal(config.agents.enabled, true);
  assert.equal(config.agents.max_concurrent_threads_per_session, 2);
  assert.equal(config.agents.max_depth, 1);
  assert.deepEqual(
    Object.keys(config.agents)
      .filter((key) => typeof config.agents[key] === 'object')
      .sort(),
    roles.toSorted(),
  );
  const files = await readdir(new URL('.codex/agents/', root));
  assert.deepEqual(files.sort(), roles.map((role) => `${role}.toml`).sort());
  for (const role of roles) {
    const entry = config.agents[role];
    assert.ok(entry.description.length > 15);
    assert.equal(entry.config_file, `agents/${role}.toml`);
    const layer = parse(await read(`.codex/${entry.config_file}`));
    assert.ok(layer.developer_instructions.length > 100);
    assert.equal(
      layer.sandbox_mode,
      role === 'visual_critic' ? 'read-only' : 'workspace-write',
    );
    assert.equal(layer.model, undefined);
  }
});

test('skills locales bajo demanda con metadata y sin roles históricos activos', async () => {
  const expected = [
    'creative-audit',
    'art-direction',
    'motion-design',
    'gsap-scroll-storytelling',
    'react-bits-integration',
    'typography-and-layout',
    'visual-audit',
    'responsive-refinement',
  ];
  const folders = await readdir(new URL('.agents/skills/', root));
  assert.deepEqual(folders.sort(), expected.toSorted());
  for (const name of expected) {
    const content = await read(`.agents/skills/${name}/SKILL.md`);
    assert.ok(content.startsWith(`---\nname: ${name}\ndescription: `));
    assert.ok(
      content.includes('Cargar únicamente cuando la tarea lo requiera'),
    );
  }
  for (const name of [
    'orchestrator',
    'architect',
    'art_director',
    'frontend',
    'visual_qa',
    'technical_qa',
  ]) {
    assert.ok(
      (await read(`archive/generalist-v0.1/${name}.toml.txt`)).length > 0,
    );
  }
});

const luminance = (hex) => {
  const rgb = hex.match(/[a-f\d]{2}/gi).map((x) => parseInt(x, 16) / 255);
  return rgb
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce(
      (total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index],
      0,
    );
};

test('contraste AA de los pares semánticos base', async () => {
  const css = await read('styles/tokens.css');
  const colors = Object.fromEntries(
    [...css.matchAll(/--wf-color-([\w-]+):\s*(#[\da-f]{6})/gi)].map((m) => [
      m[1],
      m[2],
    ]),
  );
  for (const [fg, bg, minimum] of [
    ['text', 'background', 4.5],
    ['text', 'surface', 4.5],
    ['muted', 'background', 4.5],
    ['muted', 'surface', 4.5],
    ['on-brand', 'brand', 4.5],
    ['error', 'background', 4.5],
    ['success', 'background', 4.5],
    ['focus', 'background', 3],
    ['border', 'background', 3],
  ]) {
    const values = [luminance(colors[fg]), luminance(colors[bg])].sort(
      (a, b) => a - b,
    );
    const ratio = (values[1] + 0.05) / (values[0] + 0.05);
    assert.ok(
      ratio >= minimum,
      `${fg}/${bg}: ${ratio.toFixed(2)} < ${minimum}`,
    );
  }
});

test('Tailwind compila utilidades con los tokens reales del framework', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'webforge-tailwind-'));
  try {
    const input = path.join(dir, 'input.css');
    await writeFile(
      input,
      `@import "${new URL('styles/tailwind.css', root).pathname}";\n@source inline("bg-brand text-on-brand rounded-control font-sans");\n`,
    );
    const output = execFileSync(
      process.execPath,
      [
        new URL('node_modules/@tailwindcss/cli/dist/index.mjs', root).pathname,
        '-i',
        input,
      ],
      { encoding: 'utf8' },
    );
    for (const utility of [
      '.bg-brand',
      '.text-on-brand',
      '.rounded-control',
      '.font-sans',
    ])
      assert.ok(output.includes(utility), utility);
    assert.ok(output.includes('var(--wf-color-brand)'));
    assert.ok(output.includes('prefers-reduced-motion'));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
