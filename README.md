# WebForge AI

Creative Frontend Enhancement Framework: mejora artística e interactiva sobre webs funcionales creadas en Google AI Studio u otras herramientas. Adopción incremental en repositorios existentes, especialmente Next.js; sin regenerar páginas ni imponer un stack nuevo.

## Tres roles, activación selectiva

- **Creative Director** (`creative_director`): dirección artística, especificación, coordinación y aceptación; hilo principal.
- **Creative Frontend & Motion Engineer** (`creative_engineer`): implementación creativa, motion y rendimiento.
- **Visual Critic** (`visual_critic`): crítica independiente basada en evidencia; read-only.

No son procesos siempre activos. El Director trabaja solo hasta que una tarea delimitada justifique delegar. Configuración contrastada con Codex CLI 0.163.0; revisar y confiar en el checkout desde Codex para cargar la capa local. No se fija modelo ni se modifica confianza global automáticamente.

## Estructura

```text
.codex/                  Tres roles y límite de dos subagentes
.agents/skills/          Cuatro skills creativas bajo demanda
motion/                 Presets GSAP con scope y cleanup
styles/                 Tokens CSS y adaptador Tailwind opt-in
qa/                     Protocolo de crítica visual/motion/performance
integrations/           Selección opcional, sin conectores ficticios
templates/              Contexto, especificación y evidencia de cliente
docs/                   Arquitectura, migración, referencias y estado
scripts/check-spec.mjs  Gate estructural de especificación aprobada
tests/                  Controles deterministas y navegador
archive/                Versión generalista preservada, fuera del flujo activo
```

## Validar el framework

Node.js 24. Desde esta raíz:

```sh
npm ci
npm run check
npx playwright install --with-deps chromium
npm run test:browser
```

Si existe Chromium instalado, usarlo explícitamente:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:browser
```

Registrar navegador/versión: no equivale a probar el Chromium fijado por Playwright. No hay scripts dev/build porque este repositorio no contiene una app de cliente.

## Aplicar a una web existente

1. Seguir [adopción incremental](docs/new-project.md) y persistir contexto/baseline una sola vez.
2. Crear una copia de [la especificación](templates/enhancement-spec.json), acotar el piloto y obtener aprobación explícita de su revisión antes de editar diseño.
3. Validar estructura con `npm run spec:check -- /ruta/spec.json`. La plantilla draft falla por diseño; el validador no autentica aprobaciones ni aplica cambios.
4. Reutilizar componentes, estilos y animaciones existentes. Copiar solo lo necesario, con revisión de diferencias; no sobrescribir AGENTS, .codex, tokens o manifiestos del cliente.
5. Implementar, ejecutar controles y medir presupuesto; [Visual Critic](qa/README.md) revisa capturas/clips reales antes/después.

GSAP es la única nueva dependencia de desarrollo, usada en pruebas reales de [motion](motion/README.md); el consumidor aporta su propio motor. CSS basta para efectos simples. [Las otras referencias](docs/references.md) son opciones evaluadas: UI UX Pro Max, React Bits, Motion Primitives, Three.js y React Three Fiber no se instalan automáticamente.

Consultar [decisiones](docs/decisions.md), [plan de migración](docs/migration.md) y [evidencia/limitaciones](docs/progress.md). No se afirma mejora artística, fluidez ni rendimiento de una web cliente hasta probar un piloto real.
