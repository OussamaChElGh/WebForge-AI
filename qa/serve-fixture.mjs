import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import { build } from 'esbuild';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import process from 'node:process';

const root = new URL('../', import.meta.url);
const out = new URL('.cache/v1-fixture/', root);
await mkdir(out, { recursive: true });
const options = {
  absWorkingDir: fileURLToPath(root),
  bundle: true,
  jsx: 'automatic',
  logLevel: 'warning',
};
await build({
  ...options,
  entryPoints: ['qa/fixture/client.tsx'],
  outfile: fileURLToPath(new URL('client.js', out)),
  platform: 'browser',
  format: 'esm',
});
await build({
  ...options,
  entryPoints: ['qa/fixture/App.tsx'],
  outfile: fileURLToPath(new URL('server.mjs', out)),
  platform: 'node',
  format: 'esm',
  packages: 'external',
});
const { App } = await import(new URL('server.mjs', out));
const markup = renderToString(createElement(App));
const css = await readFile(new URL('qa/fixture/fixture.css', root), 'utf8');
const js = await readFile(new URL('client.js', out));
const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>WebForge — fixture QA</title><link rel="icon" href="data:,"><style>${css}</style></head><body><div id="root">${markup}</div><script type="module" src="/client.js"></script></body></html>`;
const server = createServer((request, response) => {
  const route = request.url?.split('?')[0];
  if (route === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(html);
  } else if (route === '/client.js') {
    response.writeHead(200, {
      'Content-Type': 'text/javascript; charset=utf-8',
    });
    response.end(js);
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
server.listen(4173, '127.0.0.1', () =>
  process.stdout.write('Fixture QA lista en puerto 4173\n'),
);
for (const signal of ['SIGINT', 'SIGTERM'])
  process.once(signal, () => server.close(() => process.exit(0)));
