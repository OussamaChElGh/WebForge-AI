# Adoptar WebForge en un frontend existente

## 1. Inspección de una sola vez

Trabajar en el checkout del cliente y una rama. En la nube no crear worktrees salvo petición expresa. Preservar archivos y cambios existentes. Comprobar versión de Next/React, router, CSS/Tailwind, gestor/lockfile, librerías motion, componentes y scripts disponibles. No ejecutar create-next-app ni regenerar páginas; tampoco instalar el package.json completo del framework en el cliente.

Persistir [contexto](../templates/client-context.md) con revisión auditada y rutas relevantes. Capturar baseline de diseño/estados y funcionamiento; medir rendimiento con condiciones repetibles. El código exportado de Google AI Studio se trata como código de entrada; no se asume una API ni se requiere credencial de Google.

## 2. Incorporación selectiva

Revisar AGENTS.md/.codex/.agents existentes antes de copiar o fusionar instrucciones. No sobrescribirlas. Incorporar solo los tres roles y skills pertinentes, conservando restricciones del cliente. Con Codex 0.163.0, los roles se registran en .codex/config.toml y las skills viven en .agents/skills/. Revisar y confiar en el proyecto mediante Codex; un TOML válido no demuestra carga de roles. No modificar automáticamente ajustes globales de confianza.

Conservar el sistema de estilos del cliente. styles/tokens.css es referencia y opt-in, no un tema para importar globalmente. Si ya hay tokens, mapear roles existentes. styles/tailwind.css requiere Tailwind 4; no imponerlo a Tailwind 3 u otro sistema.

## 3. Especificación antes de diseño

Director propone un piloto de una sección/interacción con intención artística, composición/tipografía y función de motion. Copiar templates/enhancement-spec.json y completar baseRevision, archivos concretos permitidos/protegidos, baselineEvidence, acceptance, motion y presupuestos numéricos. Si no hay motion, documentar explícitamente no aplica y cleanup sin efectos.

Mantener status draft hasta obtener aprobación humana explícita y trazable de esa revisión. Registrar approvedBy, approvedRevision y approvalEvidence. Cada cambio de especificación aumenta revision y requiere nueva aprobación. No inventar el aprobador ni usar la aprobación del framework para un rediseño de cliente.

Desde el checkout WebForge:

```sh
npm run spec:check -- /ruta/cliente/enhancement-spec.json
```

Es una validación estructural: no verifica identidad, integridad criptográfica, autenticidad ni que baseRevision coincida con el checkout. El Director contrasta aprobación y revisión real antes de delegar. El gate no edita la web. La plantilla draft se rechaza intencionadamente.

## 4. Implementación incremental

Director asigna archivos y aceptación; Engineer conserva contenido, navegación, SEO, datos e integraciones. Reutilizar CSS y componentes actuales. Seleccionar dependencias por efecto, no instalar todas las referencias. Si se usan [presets GSAP](../motion/README.md), copiar solo el módulo necesario, revisar la versión GSAP y llamar desde un efecto cliente con cleanup. No trasladar toda la página de servidor a cliente. Cambios en wrappers/tokens requieren estar en la especificación aprobada.

Probar montaje, desmontaje, cambios de ruta/Strict Mode, breakpoints y reduced motion en carga y cambio. No añadir 3D sin función, presupuesto, fallback y liberación de recursos. No cambiar el diseño original a partir de una recomendación externa sin aprobación.

## 5. Evidencia y aceptación

Ejecutar scripts reales del cliente de build/tipos/lint/tests; registrar si faltan o fallan. Capturar rutas/estados/viewports idénticos antes/después y grabación para motion. Medir presupuestos en el mismo entorno; usar [plantilla](../templates/visual-evidence.md) y [protocolo QA](../qa/README.md). Critic revisa sin editar; Director acepta o asigna corrección acotada. No crear nuevos baselines automáticamente para ocultar fallos.

No hay comandos dev/build en este framework; son del cliente. Vercel o cualquier despliegue quedan fuera salvo tarea explícitamente autorizada.

## Controles del framework

Node 24, npm ci y npm run check. Navegador: npx playwright install --with-deps chromium; luego npm run test:browser. Si la red bloquea la descarga y hay Chromium local, usar explícitamente PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium y registrar versión. Las fixtures no validan una app Next.js real.
