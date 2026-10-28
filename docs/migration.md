# Migración a Creative Frontend Enhancement Framework — histórico v0.2

Fecha: 2026-10-28. Base auditada: e30fc12. Rama: feat/creative-enhancement-migration.

## Auditoría real

37 archivos versionados; árbol limpio al comenzar. Seis roles Codex con instrucciones, no un motor propio. No hay aplicación Next.js/React, backend, componentes de cliente, GSAP, 3D ni integraciones ejecutables con servicios externos. Hay tokens CSS/Tailwind 4, 3 tests Node, 6 casos Playwright con fixture en memoria, herramientas de calidad y workflow CI. La selección previa de restaurante es histórica; no aprueba un rediseño.

Dependencias actuales: @eslint/js, ESLint, typescript-eslint, TypeScript 6, @types/node, Prettier, smol-toml, Tailwind y su CLI, @playwright/test. Todas tienen uso en controles y se conservan. No existen dependencias de aplicación que haya que desinstalar. Codex disponible: 0.163.0; Node 24. El remoto solo contiene feat/multiagent-infrastructure; será la base real de la PR, no se inventa main.

## Clasificación exhaustiva por elemento

| Elemento existente                                                                              | Acción                                     | Motivo                                                                                                |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| .codex/config.toml                                                                              | Adaptar                                    | Registrar solo creative_director, creative_engineer y visual_critic; máximo de dos subagentes         |
| .codex/agents/{orchestrator,architect,art_director,frontend,visual_qa,technical_qa}.toml        | Archivar y retirar del registro activo     | Sustituir seis roles generalistas por tres; preservar los originales fuera de rutas de descubrimiento |
| AGENTS.md, README.md, prompts/first-run.md                                                      | Adaptar                                    | Enhancement sobre repos existentes, especificación aprobada y lectura progresiva                      |
| docs/{architecture,design-system,delegation,new-project,project-brief,progress,pull-request}.md | Archivar copia y adaptar                   | Mantener evidencia anterior separada del flujo creativo vigente                                       |
| docs/decisions.md                                                                               | Adaptar conservando historial              | Registrar la sustitución explícita de decisiones anteriores                                           |
| docs/first-project-plan.md                                                                      | Archivar                                   | Discovery de restaurante previo, ajeno al alcance activo                                              |
| templates/{corporate,restaurant,ecommerce}.md                                                   | Archivar                                   | Son planes de webs completas; reemplazar por plantillas transversales de enhancement                  |
| styles/{tokens,tailwind}.css                                                                    | Conservar                                  | Base reutilizable; importar solo tras especificación aprobada, nunca restyling global automático      |
| tests/infrastructure.test.mjs                                                                   | Adaptar                                    | Verificar tres roles, skills y ausencia de configuración antigua activa                               |
| tests/browser/tokens.spec.ts                                                                    | Conservar                                  | Contraste, foco y reduced motion de laboratorio siguen siendo útiles                                  |
| playwright.config.ts, tsconfig.json, eslint.config.mjs                                          | Adaptar cuando sea necesario               | Incluir motion y pruebas nuevas sin iniciar una app                                                   |
| package.json, package-lock.json                                                                 | Adaptar                                    | Mantener herramientas usadas; GSAP solo para validar la biblioteca real de motion                     |
| .github/workflows/quality.yml, .github/pull_request_template.md                                 | Adaptar                                    | Ramas creativas y evidencia visual/motion/performance; ningún despliegue                              |
| .gitignore, .nvmrc, .prettierignore, .prettierrc.json                                           | Conservar / exclusión de archivo histórico | Mantener reproducibilidad y evitar reformatear el archivo preservado                                  |

No se desecha código reutilizable. Lo eliminado del descubrimiento activo se conserva en archive/generalist-v0.1 con índice y fecha. No es un conjunto de agentes instalables ni documentación vigente.

## Etapas y aceptación

1. Auditoría y referencias: inventario, clasificación y decisiones de selección guardadas antes de modificar roles; ninguna instalación masiva.
2. Especialización: tres roles, skills bajo demanda, plantillas de contexto/especificación/evidencia y guías de adopción incremental. Ninguna instrucción activa obliga a regenerar una aplicación.
3. Motion y QA: revelar/parallax GSAP con scope, cleanup, fallback estático, respeto a reduced motion y pruebas reales. No scroll hijacking, 3D ni biblioteca visual innecesaria.
4. Validación y entrega: controles deterministas, revisión independiente delimitada y PR contra la rama base existente. Declarar límites de confianza Codex, navegador y acceso GitHub.

## Arquitectura propuesta

.agents/skills/ → auditoría, dirección visual, motion y revisión bajo demanda. .codex/ → tres roles, sin modelo impuesto. motion/ → presets reutilizables con GSAP inyectado por el consumidor. qa/ → protocolo de evidencia y comparación. styles/ → design system opt-in. integrations/ → selección y límites de herramientas externas, sin conectores ficticios. templates/ → contexto de repositorio existente, especificación aprobable y evidencia. docs/ → memoria compacta y decisiones. archive/ → historia fuera del flujo activo.

## Eficiencia

Auditar una vez por revisión base y actualizar solo rutas cambiadas. El Director lee el contexto y el estado; cada especialista recibe rutas, diff y skill relevante. No lanzar tres agentes automáticamente ni delegar ejecución de comandos triviales. El crítico revisa evidencia concreta y emite incidencias breves; las herramientas hacen tipos, contraste, compilación y pruebas. Medir iteraciones, archivos reutilizados y presupuestos antes/después sin inventar ahorro de tokens ni calidad artística validada por código.

## Resultado de implementación

Las cuatro etapas están implementadas; la evidencia y los límites están en progress.md. Se conservan 21 archivos anteriores verificados byte a byte. La rama de migración se revisará contra feat/multiagent-infrastructure; una PR creada no se presume a partir de publicar la rama.
