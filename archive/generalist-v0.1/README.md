# WebForge AI

Infraestructura multiagente reutilizable para proyectos web profesionales. Incluye seis roles Codex, contratos de delegación, design tokens y controles de calidad; todavía no contiene ninguna aplicación de cliente.

## Inicio

Node.js 24 y npm. Desde la raíz:

```sh
npm ci
npm run check
npx playwright install --with-deps chromium
npm run test:browser
```

Si ya existe Chromium, se puede usar explícitamente sin descargarlo:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:browser
```

Esta alternativa depende de la versión instalada; no equivale a probar el navegador fijado por Playwright. No existen scripts dev/build mientras no exista una app.

## Estructura

```text
.codex/config.toml          Registro y límite de concurrencia
.codex/agents/*.toml        Seis roles con instrucciones y sandbox
.github/workflows/         CI: lint, tipos, formato y pruebas
AGENTS.md                  Reglas globales
styles/                    Tokens CSS e integración Tailwind 4
tests/                    Pruebas Node y Playwright (sin servidor)
docs/                      Arquitectura, diseño, contratos y evidencia
prompts/first-run.md        Encargo inicial para Orchestrator
templates/                 Especificaciones: corporativa, restaurante, e-commerce
```

## Trabajar con los agentes

Usar Codex CLI 0.163.0, versión contrastada con su esquema oficial. Abrir este checkout en Codex y marcarlo como proyecto de confianza únicamente si se acepta su configuración. Sin confianza, Codex omite la capa .codex del proyecto. No basta con que los TOML parseen.

El hilo principal actúa como orchestrator. Los otros roles son architect, art_director, frontend, visual_qa y technical_qa. No se fija modelo; se hereda el disponible. Cada encargo sigue [el contrato de delegación](docs/delegation.md) y reserva archivos a un solo escritor. Los agentes no son procesos siempre activos ni el contrato implementa un bloqueo automático del filesystem. QA dispone de sandbox read-only.

Consultar [inicio de proyectos](docs/new-project.md), [arquitectura](docs/architecture.md), [diseño](docs/design-system.md) y [evidencia actual](docs/progress.md). Next.js, React y Vercel son el stack de las aplicaciones futuras; no se instalan hasta usarse. Las plantillas describen requisitos candidatos, no generan tres apps.
