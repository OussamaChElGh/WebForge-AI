# Primer proyecto: restaurante

> Histórico de discovery. La iteración actual implementa el framework genérico; este plan no autoriza una app ni describe su estado actual. Ver progress.md.

Fecha: 2026-10-28. Estado: propuesta de discovery; aplicación todavía no creada.

## Evidencia y alcance

El usuario ha elegido Restaurante. Los 15 adjuntos se han reconstruido en el checkout existente; no se recibió un ZIP. Se ha leído prompts/first-run.md y coordinado producto, arquitectura y dirección de arte como subagentes con tareas de análisis sin edición simultánea.

Validado documentalmente: stack previsto Next.js, React, TypeScript y Tailwind CSS; Vercel como destino futuro. Esto no acredita compatibilidad de versiones ni funcionamiento de una aplicación. Los siete archivos TOML se han parseado correctamente con tomllib; su descubrimiento automático por otra instalación de Codex no se ha comprobado.

Pendiente: nombre, audiencia, idiomas, marca, objetivo, CTA, páginas, contenidos, integraciones, mercado y responsable de aprobación. Reservas, pedidos, pagos, CMS y analítica no están incluidos por defecto.

## Hito 1 — Discovery del restaurante

Entregables: brief, sitemap, recorrido principal, alcance y exclusiones, inventario de contenidos con responsables y criterios verificables.

Información necesaria: nombre y ubicación del restaurante, locales, horarios, carta y precios, alérgenos, público e idiomas, imágenes con autorización, referencias de marca y quién mantendrá el contenido. Definir una acción principal: consultar carta, llamar, reservar o pedir. Si se requieren reservas o pedidos, identificar proveedor, operación y tratamiento de datos antes de comprometer integración.

Aceptación: responsable identificado valida objetivo, CTA, páginas, funciones y exclusiones; contenidos pendientes tienen dueño; restricciones legales según mercado e incógnitas bloqueantes quedan documentadas.

Archivos futuros: actualizar docs/project-brief.md tras validar alcance; crear docs/sitemap.md y docs/content-inventory.md; registrar decisiones aprobadas en docs/decisions.md.

Riesgos: contenido incompleto, imágenes sin derechos, datos de carta o alérgenos incorrectos, ampliación accidental hacia reservas o pedidos.

## Hito 2 — Arquitectura y dirección de arte

Entregables: arquitectura mínima, contratos de contenido, propuesta visual y especificación de componentes, pendientes de aprobación antes de implementar.

Propuesta técnica: un proyecto con Next.js App Router y TypeScript estricto; Server Components por defecto e interacción cliente solo cuando haga falta. Contenido local tipado mientras no se justifique CMS. Separar src/app, src/components, src/content y src/types. Contratos candidatos: SiteConfig, MediaAsset, RestaurantLocation, OpeningHours, MenuSection y MenuItem. El sitemap y los campos exactos dependen del hito 1. No crear backend, autenticación ni endpoints ficticios.

Propuesta de dirección de arte: separar fundamentos reutilizables de la identidad del restaurante. Roles semánticos background, surface, text, muted, brand, border, focus, success y error; valores concretos pendientes del brief. Definir escala tipográfica fluida, espaciado, contenedores, radios, bordes, elevación y movimiento reducido. Elegir fuentes con licencia y soporte de idiomas. Primitivas de botón/enlace, campos, mensajes, contenedores y tipografía; después navegación, pie y módulos de carta o ubicación según alcance. Cada componente documentará variantes, estados y comportamiento adaptable. La fotografía debe representar carta y ambiente con derechos confirmados.

Criterios visuales propuestos: WCAG AA, contraste de texto normal 4,5:1 y texto grande 3:1; contraste no textual pertinente 3:1; foco visible, teclado y errores asociados; estados comprensibles sin depender solo del color; objetivos de interacción de 24 × 24 CSS px o excepciones aplicables de WCAG 2.2; revisión a 320 CSS px y texto al 200 %, sin pérdida de contenido; respeto a prefers-reduced-motion. Estos criterios todavía no se han probado.

Aceptación: rutas y contratos corresponden al brief; estrategia de edición acordada; tokens, estados y componentes documentados; integraciones justificadas; dirección visual revisada. Versiones compatibles y gestor con lockfile se seleccionan al autorizar la creación de la app.

Archivos futuros: docs/architecture.md, docs/design-system.md y docs/decisions.md; después de autorización, package.json, lockfile, tsconfig.json, configuración de Next y lint, src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, src/components y contratos seleccionados.

Riesgos: elegir proveedores antes de resolver requisitos, tipografías o fotografías sin licencia, contenido multilingüe no dimensionado, diseño sin identidad real del restaurante.

## Hito 3 — Implementación autorizada y revisión independiente

Entregables: primer recorrido acordado, componentes responsive, evidencias y registro de QA. Frontend implementa solo después del alcance y diseño acordados. Technical QA revisa sin modificar código; Visual QA interviene cuando existan capturas reales.

Aceptación: TypeScript, lint y build ejecutados con éxito; pruebas relevantes al recorrido principal; contenido y enlaces contrastados; navegación por teclado, foco, semántica y contraste revisados; capturas en móvil, tablet y escritorio sin desbordamientos; estados y fallos del flujo comprobados; incidencias críticas resueltas o registradas como bloqueantes. Integraciones reales solo se consideran validadas después de probarlas.

Archivos futuros: rutas y componentes según sitemap, pruebas correspondientes, docs/qa-report.md y docs/progress.md. Las capturas se guardarán como artefactos de la ejecución.

Riesgos: confundir contenido de demostración con datos reales, integraciones sin credenciales o sin acceso, ausencia de capturas para QA visual. La revisión de preview y cualquier despliegue requieren un paso posterior expresamente autorizado.

## Comprobaciones realizadas

- Leídos todos los documentos y roles adjuntos.
- Reconstruida la estructura documental y de configuración sin sobrescribir archivos distintos.
- Siete archivos TOML válidos sintácticamente.
- Sin instalación de dependencias, código de aplicación, build, tests funcionales, capturas ni despliegues. No se declara la aplicación ni el entorno de desarrollo validados.

## Siguiente información necesaria

Nombre y ciudad del restaurante; objetivo principal; idiomas; disponibilidad de carta, logo y fotografías; necesidad de reservas o pedidos y proveedor existente. No introducir secretos en estos documentos.
