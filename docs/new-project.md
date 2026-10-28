# Iniciar un proyecto de cliente

Esta versión proporciona infraestructura, contratos, tokens y especificaciones; todavía no genera una web. El trabajo actual es el framework reutilizable. La selección previa de restaurante sigue como contexto de un posible proyecto, sin convertirla en alcance de esta iteración.

## 1. Preparar el repositorio y el brief

Usar un repositorio independiente para el cliente, conservando WebForge AI como referencia. Si el proyecto ya tiene checkout, trabajar en él y preservar sus cambios. Las tareas en la nube ya están aisladas: no crear worktrees salvo petición expresa.

Copiar de forma explícita las instrucciones, roles y documentos aplicables; revisar diferencias si el destino ya contiene archivos. No copiar `.git`, `node_modules`, cachés, credenciales ni decisiones específicas de otro cliente. Abrir el directorio del proyecto en Codex y verificar la versión de CLI y la compatibilidad de su configuración antes de delegar. La configuración se prepara para Codex CLI 0.163.0: los roles se registran con `[agents.<rol>]`, `description` y `config_file`. Consultar la evidencia y las limitaciones en `docs/architecture.md` y `docs/progress.md`; otras versiones requieren una comprobación propia.

Elegir una especificación inicial:

- [Corporativa](../templates/corporate.md).
- [Restaurante](../templates/restaurant.md).
- [E-commerce](../templates/ecommerce.md).

Completar `docs/project-brief.md` con objetivo, audiencia, idiomas, CTA, alcance y exclusiones, contenido, integraciones, restricciones y persona aprobadora. Las plantillas son preguntas y criterios de partida; no implican que todas sus funciones estén incluidas. Asignar dueño a cada contenido pendiente y resolver las incógnitas que cambien arquitectura o diseño.

## 2. Planificar con los agentes

Los seis roles registrados son `orchestrator`, `architect`, `art_director`, `frontend`, `visual_qa` y `technical_qa`. El hilo principal actúa como Orchestrator. Lee `AGENTS.md` y la documentación vigente. Emite contratos delimitados conforme a [delegation.md](delegation.md), reserva un escritor por archivo y coordina los relevos.

- Solicitar a Software Architect una estructura mínima y contratos de datos.
- Solicitar a Art Director dirección visual y personalización de tokens a partir de marca y referencias autorizadas.
- Ejecutar estas tareas en paralelo solo si sus archivos de salida no se solapan; integrar las decisiones después.
- Asignar Frontend Engineer únicamente el alcance acordado.
- Asignar Technical QA tras disponer de implementación comprobable y Visual QA tras obtener capturas reales.

No suponer que un TOML sintácticamente válido confirma que Codex cargó el rol. Verificar las capacidades expuestas por la instalación concreta. Si el cliente o la interfaz no expone subagentes, informar del límite; no presentar una revisión del mismo agente como revisión independiente.

## 3. Crear la aplicación cuando esté autorizada

Elegir versiones compatibles y fijarlas mediante un lockfile. El stack objetivo es Next.js App Router, React, TypeScript y Tailwind CSS, con Playwright para los recorridos que lo requieran y Vercel como destino previsto. En esta iteración no se crea ninguna app ni se instalan dependencias de aplicación que todavía no se usan.

Antes de generar archivos, acordar los paths, la estrategia de contenido y los contratos. Mantener contenido, componentes y acceso a servicios separados. Preferir componentes de servidor por defecto; añadir interacción cliente, CMS, persistencia o autenticación solo cuando satisfagan un requisito aprobado. Aplicar tokens semánticos y documentar los cambios visuales. No introducir reservas, pagos ni APIs ficticias.

Cuando exista una app, añadir sus comandos reales de desarrollo, build y pruebas a su propio README y CI. No copiar checks que pasan sin recorrer funcionalidad. En Vercel, configurar el directorio de aplicación, comandos y variables según esa app; los secretos se introducen en el servicio, nunca en archivos versionados. La publicación es un paso expresamente autorizado.

## 4. Validar y entregar

En el framework, usar Node.js 24 y ejecutar desde la raíz:

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:browser
```

`npm run check` reúne lint, comprobación de tipos, formato y `npm test`; estos últimos son tests de infraestructura ejecutados con Node. `npm run test:browser` comprueba la infraestructura con Playwright y Chromium; no valida una web de cliente. La instalación del navegador necesita acceso a sus destinos de descarga y las bibliotecas del sistema correspondientes. Si falla, registrar el bloqueo sin presentar la prueba como ejecutada. No existen todavía comandos de aplicación `dev` ni `build`.

Los tokens reutilizables están en `styles/tokens.css`; `styles/tailwind.css` integra Tailwind y esos tokens. Personalizarlos por identidad sin introducir estilos arbitrarios. Documentar resultados actuales, no los esperados.

En el proyecto cliente, verificar build, TypeScript, lint, pruebas funcionales y flujos acordados. Preparar capturas reales de móvil, tablet y escritorio; revisar navegación por teclado, foco, semántica, contraste y estados. Para regresión visual, crear y revisar los baselines antes de usarlos como evidencia; no aceptarlos automáticamente para ocultar fallos.

La entrega incluye alcance cumplido, archivos cambiados, comandos ejecutados y resultados, pruebas pendientes, incidencias con severidad y decisiones necesarias. Registrar progreso y decisiones. Solicitar aceptación sobre un resultado concreto y revisar la pull request antes de fusionar. La disponibilidad de infraestructura no demuestra todavía que una web de cliente funciona.

## Prompt inicial sugerido

> Actúa como Orchestrator. Lee AGENTS.md y docs/. Revisa el brief y la especificación elegida. Identifica bloqueos, define alcance y criterios verificables, y asigna contratos a los especialistas necesarios sin escritores simultáneos sobre un archivo. Presenta un plan y distingue decisiones propuestas, aprobadas y comprobadas. No generes integraciones ni despliegues fuera del alcance autorizado.

## Limitaciones comprobadas en esta máquina

Codex app-server omite la configuración local hasta que el usuario confíe en el proyecto. Abrirlo en Codex, revisar sus instrucciones y habilitar confianza mediante el mecanismo de la instalación. No modificar la configuración global automáticamente.

La descarga de Chromium Playwright está bloqueada por la política de red en cdn.playwright.dev. Se ha usado el navegador existente con:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:browser
```

Esta opción es explícita, no un fallback silencioso; la compatibilidad depende de la versión del navegador. CI instala la versión propia de Playwright. Para habilitar descargas en este entorno se necesita permitir cdn.playwright.dev y, si hay redirecciones, los destinos oficiales que se observen. No desactivar verificación TLS ni esquivar el proxy.
