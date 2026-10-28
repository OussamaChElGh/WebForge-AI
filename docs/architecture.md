# Arquitectura del framework

## Implementado

Un repositorio de infraestructura, sin servidor, app Next.js ni motor propio de agentes. Codex coordina los roles nativos registrados en .codex/config.toml; cada config_file relativo a .codex apunta a instrucciones y sandbox del rol. Orchestrator incorpora discovery; la configuración adjunta anterior product_strategist se sustituye por los seis roles solicitados. Los modelos se heredan, sin proveedores ni credenciales embebidos.

Límite de tres subagentes concurrentes y profundidad V1 de uno. Los roles de implementación pueden escribir dentro del sandbox de workspace y de su contrato; QA es read-only. El contrato de archivos es una regla de coordinación, no un lock del sistema operativo. La confianza del checkout se configura por el usuario en Codex, nunca se concede desde el repositorio.

## Capas

- .codex/: registro de seis roles y capas de configuración compatibles con CLI 0.163.0.
- docs/ y templates/: fuente compartida de requisitos, decisiones y contratos.
- styles/: tokens CSS y adaptador Tailwind 4; sin React ni layout de cliente.
- tests/: pruebas Node para roles, contraste y compilación Tailwind; Playwright para consumo CSS, teclado y movimiento reducido en tres viewports con fixture en memoria.
- .github/workflows/: controles con Node 24, npm ci y Chromium Playwright. Sin despliegues, secretos ni permisos de escritura.

## Dependencias justificadas

TypeScript comprueba configuración y pruebas Playwright; ESLint + typescript-eslint analizan JS/TS; Prettier comprueba formato; smol-toml verifica roles en tests Node; Tailwind y su CLI prueban compilación de los tokens; @playwright/test ejecuta pruebas en navegador. No se añaden React, Next.js, SDK Vercel, CMS ni backend porque no hay código que los use.

TypeScript 6.0.3 está fijado: la versión actual 7 supera el rango de compatibilidad declarado por typescript-eslint. Versiones y dependencias transitivas quedan en package-lock.json. Node 24 está declarado en .nvmrc y engines.

## Validación de Codex

Las siete configuraciones pasan el esquema oficial de la etiqueta rust-v0.163.0 (https://raw.githubusercontent.com/openai/codex/rust-v0.163.0/codex-rs/core/config.schema.json). El app-server instalado responde a config/read con cwd explícito y confirma que esta máquina omite la capa del proyecto por falta de confianza. No se alteró la configuración global para forzarla. La compatibilidad del formato está verificada; el uso nativo de los roles en una sesión que confíe en este checkout sigue pendiente. Los subagentes de esta sesión fueron delegados mediante las herramientas disponibles, sin afirmar que provinieran del registro local.

## Extensión futura

Cada cliente empieza con brief y especificación vertical. Tras definir el alcance se crea una app Next.js App Router, React, TS y Tailwind con contenido tipado y Server Components por defecto. Se fijan versiones compatibles al crearla; se añaden scripts dev/build y pruebas de flujos reales. CMS, autenticación, reservas, pedidos y pagos requieren requisitos y proveedores concretos. Vercel se configura cuando exista una app, con autorización para desplegar. No existe todavía evidencia de build de Next.js ni de despliegue.
