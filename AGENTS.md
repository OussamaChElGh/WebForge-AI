# WebForge AI — reglas globales

## Alcance y arquitectura

Framework reutilizable para webs profesionales con Next.js, React, TypeScript, Tailwind CSS, Playwright y destino Vercel. Esta iteración implementa infraestructura; no crear una web de demostración. Leer docs/project-brief.md, docs/architecture.md, docs/design-system.md, docs/decisions.md y docs/progress.md antes de trabajar. Las especificaciones de templates/ no son funcionalidades aprobadas.

## Coordinación

El hilo principal es Orchestrator. Seis roles registrados: orchestrator, architect, art_director, frontend, visual_qa y technical_qa. Discovery de producto corresponde a Orchestrator. Delegar solo tareas delimitadas mediante docs/delegation.md: objetivo, entradas, archivos permitidos, entregables, aceptación y evidencia. Registrar propietario por archivo y liberar la asignación antes de un relevo. Nunca dos escritores sobre el mismo archivo; integrar cambios compartidos en secuencia. El máximo de tres subagentes concurrentes es un límite, no un objetivo. No modificar configuración de confianza global ni asumir permisos por tener un rol.

## Desarrollo

- Definir alcance, dependencias y aceptación antes de implementar. Preferir módulos pequeños y contratos explícitos.
- Reutilizar tokens de styles/ y convenciones; documentar cambios de diseño. No inventar identidad, contenido, integraciones o requisitos del cliente.
- Instalar solo dependencias usadas y justificadas. Mantener lockfile; usar npm ci para reproducir instalación.
- Usar ramas. Preservar cambios existentes; no restablecer, borrar o sobrescribir trabajo ajeno. En la nube usar checkout existente, sin worktree salvo petición explícita.
- Registrar decisiones con estado, razones y consecuencias en docs/decisions.md y progreso en docs/progress.md.
- No guardar ni imprimir secretos, credenciales ni datos personales innecesarios. No modificar producción ni desplegar sin autorización expresa.

## Revisión y aceptación

QA visual y técnico revisan sin editar la solución. Sus sandboxes son read-only; si los comandos necesitan escribir artefactos, solicitar su ejecución al propietario y revisar su evidencia. No ampliar permisos automáticamente. Visual QA exige capturas reales; no declarar aprobada una web usando solo fixtures de tokens.

En el framework ejecutar npm run check y npm run test:browser. Indicar navegador y versión. En una app futura añadir build y flujos funcionales reales. Para interfaces revisar móvil/tablet/escritorio, teclado, foco, semántica, contraste y estados. Un escáner automático no prueba accesibilidad completa.

La entrega informa archivos cambiados, comandos, resultados, riesgos y pendientes. Separar passed, failed, skipped y not_run. Nunca declarar pruebas ejecutadas sin evidencia ni sustituir una comprobación significativa por una trivial. No aceptar una entrega con fallos críticos sin resolver o bloqueantes omitidos.
