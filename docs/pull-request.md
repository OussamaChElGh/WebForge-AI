# Pull request preparada

Título: feat: add reusable multi-agent WebForge infrastructure

Rama: feat/multiagent-infrastructure

## Problema y resultado

El repositorio solo tenía documentos iniciales sin una infraestructura validada. Esta entrega registra seis roles Codex, formaliza los relevos y aporta tokens reutilizables, controles locales y CI, sin generar una web de demostración ni aplicaciones de clientes.

## Cambios

- Registro compatible con Codex 0.163.0: orchestrator, architect, art_director, frontend, visual_qa y technical_qa; QA read-only y máximo de tres subagentes concurrentes.
- Contratos con entradas, archivos permitidos, propiedad exclusiva, entregables, aceptación y evidencia.
- Tokens CSS semánticos y adaptación Tailwind 4; sin Next/React/Vercel instalados mientras no exista app.
- Herramientas fijadas, npm lockfile, pruebas Node, Playwright y GitHub Actions.
- Especificaciones corporativa/restaurante/e-commerce y guía de uso.

## Validación

npm ci y npm run check correctos. Tres pruebas Node y seis pruebas Playwright pasan, estas últimas con Chromium 154 instalado explícitamente. Esquema oficial Codex correcto. Auditoría del registro: cero vulnerabilidades. Revisión independiente estática sin defectos críticos.

## Límites

No se ha ejecutado GitHub Actions remotamente. La descarga del navegador fijado por Playwright está bloqueada por red; no se equipara a la versión local probada. Codex requiere confianza del proyecto para cargar sus roles. No se ha construido ni auditado una web de cliente.

La rama feat/multiagent-infrastructure está publicada; el commit de implementación es 2089de7. La API GitHub responde Forbidden, gh pr create --draft falló y el remoto solo contiene la rama de trabajo, sin rama base. Este documento es la descripción preparada, no evidencia de una PR creada. Una vez resueltos esos requisitos, abrir una PR desde la rama publicada contra la base real, sin fusionar ni desplegar automáticamente.
