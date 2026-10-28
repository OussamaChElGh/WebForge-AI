# Pull request preparada — migración creativa

Título: refactor: specialize WebForge as a creative frontend enhancement framework

Base: feat/multiagent-infrastructure (e30fc12 al iniciar).
Rama: feat/creative-enhancement-migration.
Estado: rama publicada correctamente; implementación en 091fff1. gh pr create --draft falló con Forbidden en https://api.github.com/graphql; no se creó PR. La base existente sí está disponible.

## Problema y comportamiento resultante

WebForge estaba orientado a construir webs completas con seis roles. Ahora mejora frontends existentes generados por Google AI Studio u otras herramientas mediante tres roles: Creative Director coordina y define, Creative Engineer implementa, Visual Critic revisa. No reconstruye aplicaciones ni altera diseño sin especificación aprobada.

## Cambios

- Auditoría y clasificación conservar/adaptar/archivar/eliminar; 21 archivos históricos preservados byte a byte y seis roles retirados del registro activo.
- Tres roles, cuatro skills bajo demanda y contratos/contexto persistentes para evitar auditorías repetidas y escritores simultáneos.
- Tokens opt-in y plantillas de contexto, especificación aprobable y evidencia antes/después. Gate estructural con pruebas de aprobación/revisión/scope y presupuestos; no autentica aprobación humana.
- Presets GSAP propios de reveal/parallax con SSR, scope, cleanup, reduced motion y breakpoints. GSAP es la única dependencia nueva y se usa en pruebas reales.
- Evaluación de UI UX Pro Max, React Bits, Motion Primitives, GSAP, Three.js y React Three Fiber; sin instalación masiva ni redistribución de catálogos.
- Calidad determinista y workflow adaptado, sin despliegues ni app de demostración.

## Validación

npm ci; npm run check; 9 pruebas Node y 15 casos Playwright con Chromium 154 local. Esquema oficial Codex válido; archivo histórico verificado contra e30fc12. Draft spec rechazada como corresponde. Auditoría npm sin vulnerabilidades. Revisión independiente detectó aceptación de rutas Windows absolutas; corregida con regresión.

## Riesgos y límites

La carga nativa de agentes/skills depende de trust y de la instalación; no se cambia confianza global. CI remoto y el navegador fijado de Playwright no se han validado aquí. No hay aplicación cliente ni prueba de Next.js, mejora artística, rendimiento o ahorro de tokens. Esas métricas requieren piloto aprobado y evidencia real. 3D e integraciones externas permanecen opcionales.

API GitHub devuelve Forbidden. La descripción preparada no implica que exista PR; no fusionar ni desplegar automáticamente.

Revisión manual con la descripción de este archivo: https://github.com/OussamaChElGh/WebForge-AI/compare/feat%2Fmultiagent-infrastructure...feat%2Fcreative-enhancement-migration?expand=1
