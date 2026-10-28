# Registro de decisiones vigente

## V1 — 2026-10-28

- Se añaden tres componentes React propios y build de biblioteca con tipos; se conservan los presets GSAP sin reconstruir una app.
- GSAP controla TextReveal/ParallaxHero; Motion se incorpora para MagneticButton. React/ReactDOM y esbuild tienen uso real en SSR/fixture. El cliente instala solo el motor necesario.
- Siete skills creativas solicitadas más creative-audit conservada; motion-enhancement/visual-review se sustituyen por motion-design/visual-audit.
- UI UX Pro Max, React Bits, Motion Primitives y TweenLabs se investigan a commits fijos, sin instalar sus CLI ni copiar catálogos. Motion Primitives espera licencia verificable.
- QA genera capturas reales y compara solo si se aportan referencias aprobadas. La revisión de fixture no acredita diseño o rendimiento de cliente.
- El paquete maestro sigue privado; UNLICENSED explicita que el propietario no ha fijado una licencia pública propia. No se publican paquetes ni se despliega producción.

## Migración creativa v0.2 — 2026-10-28

| Decisión                                                  | Motivo y consecuencias                                                                                                      | Estado                                     |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Sustituir seis roles por tres creativos                   | Director coordina; Engineer implementa y verifica; Critic revisa. No ampliar la arquitectura anterior                       | Autorizado por el usuario e implementado   |
| Enhancement sobre frontend existente                      | No repetir generación de Google AI Studio ni reconstruir Next.js; preservar stack/función/diseño fuera de la especificación | Regla vigente                              |
| Especificación con aprobación de revisión antes de diseño | Gate estructural y contraste de evidencia humana; draft no permite implementar                                              | Implementado; no hay aprobación cliente    |
| GSAP como única nueva devDependency                       | Presets propios probados, motor inyectado; CSS primero y otras referencias opcionales                                       | Implementado, sin catálogo externo copiado |
| Skills y contexto bajo demanda                            | Auditar una vez por revisión, pasar diffs y medir eficiencia; no activar todos los roles                                    | Implementado                               |
| Archivo histórico fuera de registro/lectura habitual      | Preservar trabajo anterior sin mantener roles obsoletos activos                                                             | Implementado en archive/generalist-v0.1    |
| Conservar calidad determinista y tokens opt-in            | Reusar lo comprobable sin imponer un tema o una migración Tailwind al cliente                                               | Implementado                               |

## Historial anterior (sustituido cuando contradice lo vigente)

### Decisiones de v0.1

| Fecha | Decisión    | Motivo | Responsable | Estado    |
| ----- | ----------- | ------ | ----------- | --------- |
| —     | Por definir | —      | —           | Pendiente |

| 2026-10-28 | Primer proyecto: restaurante | Selección explícita del usuario | Usuario | Confirmado |
| 2026-10-28 | Preparar discovery y plan de tres hitos antes de implementar | prompts/first-run.md solicitado por el usuario | Orchestrator | Ejecutado: ver first-project-plan.md |
| 2026-10-28 | Contenido local tipado, App Router y tokens semánticos | Propuestas de arquitectura y dirección de arte | Especialistas | Propuesto; pendiente de alcance y validación |

| 2026-10-28 | Iteración actual: infraestructura genérica, sin web cliente | Petición explícita posterior del usuario; restaurante queda como contexto futuro | Usuario | Autorizado |
| 2026-10-28 | Seis roles nativos; discovery integrado en Orchestrator | Evitar motor paralelo y rol extra; formato verificado contra Codex 0.163.0 | Arquitectura | Implementado; carga nativa pendiente de trust |
| 2026-10-28 | Tokens CSS y adaptador Tailwind 4 con pruebas en memoria | Reutilización sin crear web de demostración | Arquitectura | Implementado |
| 2026-10-28 | Sin dependencias Next/React/Vercel hasta crear una app | No instalar dependencias sin uso | Arquitectura | Implementado |
| 2026-10-28 | TypeScript 6 fijado y npm ci | Compatibilidad declarada por typescript-eslint y reproducción por lockfile | Arquitectura | Implementado |
