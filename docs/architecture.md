# Arquitectura creativa v0.2

## Responsabilidad

WebForge mejora la capa visual/interactiva de un frontend ya funcional. Google AI Studio u otra herramienta entrega código; se recibe un checkout, no se asume una API de generación ni un MCP. No hay backend, producto, deployment ni motor de agentes propios. El framework no construye otra aplicación Next.js para sustituir la existente.

## Módulos

| Módulo          | Función                                                                 | Carga                                                    |
| --------------- | ----------------------------------------------------------------------- | -------------------------------------------------------- |
| .codex/         | Tres roles nativos: creative_director, creative_engineer, visual_critic | Director principal; especialistas solo por tarea         |
| .agents/skills/ | Auditoría, dirección, motion y crítica                                  | Solo skill pertinente; instrucciones, no agentes nuevos  |
| motion/         | Reveal/parallax GSAP, inyección de motor, scope y reversión             | Opt-in y frontera cliente; sin acceso DOM al importar    |
| styles/         | Tokens semánticos y adaptador Tailwind 4                                | Opcional; preservar estilos/versión Tailwind del cliente |
| qa/             | Evidencia visual, responsive, accesibilidad y presupuesto               | Comandos deterministas antes de crítica humana           |
| integrations/   | Guía de adopción de referencias y límites externos                      | Sin SDKs/MCPs automáticos                                |
| templates/      | Contexto persistido, especificación aprobable y comparación             | Archivos de proyecto concretos, sin repetir análisis     |
| docs/           | Decisiones, referencias, estado y migración                             | Resumen primero; detalles solo cuando se necesitan       |
| archive/        | Documentación y roles generalistas anteriores                           | No cargar en contexto habitual ni registrar como agentes |

## Roles y fronteras

Creative Director absorbe coordinación y dirección de arte; identifica intención, alcance y aceptación. Creative Engineer implementa frontend/motion y ejecuta calidad técnica. Visual Critic revisa sin editar y declara lo no evaluable sin capturas reales. No se crea un cuarto agente para un comando de test. Máximo dos subagentes concurrentes, profundidad V1 uno y un escritor por archivo. El contrato es organizativo, no un lock del filesystem.

Registro [agents.<role>] con description/config_file y capas de sandbox, sin modelo impuesto. Codex instalado 0.163.0; la validación de esquema y la carga nativa son comprobaciones diferentes. Codex puede ignorar el registro hasta confiar en el checkout; no se cambia trust global desde el repo. Las skills usan el formato local .agents/skills/<name>/SKILL.md; su disponibilidad en otro cliente requiere descubrimiento nativo de esa instalación.

## Flujo incremental

Contexto y baseline → especificación draft → aprobación de revisión → gate estructural → piloto delimitado → controles/evidencia → crítica → aceptación o corrección del mismo propietario. Cambios de revisión invalidan aprobación anterior. Nunca se infiere consentimiento del silencio ni de que un JSON tenga status approved; hay que contrastar approvalEvidence.

En Next.js, incorporar solo una isla cliente para efectos; no convertir toda una ruta a use client, cambiar router o reemplazar global.css. Mantener el resto del stack, contenido, SEO, datos e integraciones intactos salvo alcance explícito. El ejemplo de motion es orientación para un efecto, no una integración Next.js ejecutada.

## Dependencias y tecnologías

Se conservan TypeScript 6, ESLint, Prettier, Playwright, smol-toml y Tailwind CLI porque se usan en controles. GSAP 3.15.0 se añade como devDependency para probar presets reales; motion/ no importa el motor en runtime y el proyecto cliente decide su instalación. No se instala React, Next, Motion, Three/Fiber ni catálogos. Consultar [evaluación](references.md) antes de ampliar.

Reutilizar CSS/motion existentes primero. GSAP para secuencias/scroll; 3D solo con función artística clara, fallback, carga diferida, lifecycle y presupuesto. No añadir scroll smoothing global por defecto.

## Eficiencia y límites

Guardar revisión auditada, rutas, decisiones y resultados. Cada asignación transmite objetivo, archivos/diff, skill y aceptación, no todo el repo. El crítico recibe evidencias reales, no otra auditoría de arquitectura. Actualizar referencias solo al cambiar versión/necesidad. Medir rondas, reutilización y tiempo; tokens solo si hay medición disponible.

No hay app cliente ni benchmark de calidad artística. Las fixtures verifican scope, cleanup, CSS y responsive técnico del laboratorio; no prueban Core Web Vitals ni conformidad WCAG del cliente. No se añaden servicios para métricas: usar herramientas existentes y registrar sus condiciones.
