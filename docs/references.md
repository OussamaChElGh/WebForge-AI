# Referencias oficiales — Creative Frontend Framework V1

Consulta: 2026-10-28. Investigación de archivos concretos fijados a los HEAD indicados, sin clonar repositorios completos ni ejecutar sus scripts. Se revisaron README, manifiestos, licencias disponibles y mecanismos representativos. No constituye un benchmark ni una auditoría visual ejecutada.

## UI UX Pro Max

Revisión: `28b3b8dee8c976df4fa3e94aed4e092ad43fcb03`.

- **Arquitectura:** skill de conocimiento: catálogo de datos, buscador Python y plantillas por asistente, separados del CLI instalador. No es una librería React ni un motor de animación.
- **Contenido:** orientación de tipografía, color, layout, patrones UX y design systems persistidos. Útil como consulta puntual del Director; no garantiza originalidad ni sustituye referencias del cliente.
- **Dependencias:** el buscador requiere Python 3 y biblioteca estándar según documentación y script revisado. El CLI `ui-ux-pro-max-cli` 2.5.0 declara chalk, commander, ora y prompts; sus dependencias de instalación no deben convertirse en dependencias de una web.
- **Integración:** el CLI ofrece `init --ai codex`, `--dry-run`, instalación local/global y assets empaquetados. Tratarlo como skill externa opcional: revisar una versión concreta del instalador, previsualizar sus cambios y verificar ubicación/descubrimiento en Codex. WebForge no duplica los datos ni instala el CLI globalmente. Si ya existe, consultar solo el dominio pertinente y persistir la conclusión y versión.
- **Licencia:** MIT; texto LICENSE revisado. Fuentes, iconos o referencias recomendadas pueden tener derechos propios.

Fuentes fijadas: [README](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/28b3b8dee8c976df4fa3e94aed4e092ad43fcb03/README.md), [LICENSE](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/28b3b8dee8c976df4fa3e94aed4e092ad43fcb03/LICENSE), [manifiesto CLI](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/28b3b8dee8c976df4fa3e94aed4e092ad43fcb03/cli/package.json), [entrada CLI](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/28b3b8dee8c976df4fa3e94aed4e092ad43fcb03/cli/src/index.ts), [buscador](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/28b3b8dee8c976df4fa3e94aed4e092ad43fcb03/src/ui-ux-pro-max/scripts/search.py).

## React Bits

Revisión: `e12c22192ac7b4b452c5e2feb9b586d74765d696`.

- **Arquitectura:** catálogo de componentes y herramientas, documentación Vite y registro generado con jsrepo/shadcn. Ofrece variantes JS/TS y CSS/Tailwind, no un único paquete ligero que convenga instalar entero.
- **Componentes:** texto animado, interacciones, fondos y piezas UI. Se inspeccionó `Magnet.tsx`: hooks React, arbitraje de puntero/listeners y animación por frames; el efecto debe evaluarse también en teclado, touch y reduced motion.
- **Dependencias:** el sitio raíz usa React 19, GSAP, Motion, Three/Fiber, Lenis, OGL y otras librerías de demos/herramientas. Son dependencias del catálogo completo; cada componente seleccionado exige revisar sus imports y su coste real.
- **Integración:** código manual o registros shadcn/jsrepo documentados. Registrar archivo exacto, revisión, dependencias y adaptación antes de incorporar una pieza al cliente. No ejecutar `latest` ni importar catálogo/bundles automáticamente.
- **Licencia:** texto MIT + Commons Clause revisado. Permite componentes como parte de una aplicación, pero restringe vender, sublicenciar o redistribuir componentes en sí, incluso como bundle/port; también hay restricciones sobre herramientas, sonidos y exports independientes. WebForge no incorpora código de React Bits a su biblioteca reutilizable.

Fuentes fijadas: [README](https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/README.md), [LICENSE.md](https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/LICENSE.md), [manifiesto](https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/package.json), [Magnet TS](https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/ts-default/Animations/Magnet/Magnet.tsx).

## Motion Primitives

Revisión: `120f64f6ca60348e251f929e9c81f11ccbe45eda`.

- **Arquitectura:** documentación Next/MDX, componentes cliente en `components/core` y generador de registro de componentes/hooks/ejemplos. `components.json` define aliases y CSS del proyecto.
- **Componentes:** patrones pequeños sobre Motion y Tailwind. Se inspeccionó `text-effect.tsx`: AnimatePresence/motion, variantes por palabra/carácter/línea y parámetros de timing; depende también del helper local `cn`.
- **Dependencias:** el manifiesto del sitio declara React 18, Next 15, Motion 11, Tailwind 4 y utilidades como clsx/tailwind-merge/react-use-measure. No copiar las dependencias del sitio a un cliente; revisar el componente exacto y la compatibilidad con su Motion existente.
- **Integración:** el generador produce JSON con contenido, dependencias y registryDependencies. La adopción es por archivos concretos y utilidades explícitas; no introducir otro motor para animar propiedades que ya controla GSAP.
- **Licencia pendiente:** el README declara MIT y enlaza LICENSE.md; tanto esa ruta como LICENSE devolvieron 404 en esta revisión. No se pudo verificar el texto legal del artefacto. No se copia código de este repositorio hasta resolverlo; usar la librería Motion directamente no equivale a incorporar Motion Primitives.

Fuentes fijadas: [README](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/README.md), [manifiesto](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/package.json), [registro](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/scripts/registry-build.ts), [componente](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/text-effect.tsx), [aliases](https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components.json).

## TweenLabs

Revisión: `2977c1ebe5a15cb3f81b9184c81987ebc71c593e`, rama **master**. Las consultas iniciales a main dieron 404; `git ls-remote --symref` permitió identificar la rama correcta.

- **Arquitectura:** catálogo/playground Next.js y CLI `bin/cli.js`. Son dos responsabilidades distintas; no hace falta desplegar el playground para estudiar una animación.
- **Componentes:** el README documenta reveal, parallax, texto cinético, tarjetas con scroll, cursores y docks magnéticos. Son referencias de categorías, no código incorporado a TextReveal, ParallaxHero o MagneticButton de WebForge, que son implementaciones propias.
- **Dependencias:** manifiesto raíz 0.1.6 con Next 16.2.7, React 19.2.4, GSAP 3.15, @gsap/react, Lenis y dependencias de sitio/backend como Convex y autenticación. La afirmación «CLI zero-dependency» no significa que los componentes o el playground no tengan dependencias.
- **Integración:** el CLI revisado lee configuración/aliases, consulta `/api/registry/list` y `/api/registry/<slug>` en tweenlabs.xyz, escribe archivos y puede ejecutar instalación de dependencias. `--overwrite` permite sobrescribir; no se ejecutó. Para WebForge, preferir inspección selectiva y diff autorizado; no instalar todo el registro ni adoptar Lenis/scroll smoothing como requisito.
- **Licencia:** MIT, texto LICENSE revisado. Las dependencias, plugins y assets conservan sus términos propios.

Fuentes fijadas: [README](https://github.com/TweenLabs/TweenLabs/blob/2977c1ebe5a15cb3f81b9184c81987ebc71c593e/README.md), [LICENSE](https://github.com/TweenLabs/TweenLabs/blob/2977c1ebe5a15cb3f81b9184c81987ebc71c593e/LICENSE), [manifiesto](https://github.com/TweenLabs/TweenLabs/blob/2977c1ebe5a15cb3f81b9184c81987ebc71c593e/package.json), [CLI inspeccionado](https://github.com/TweenLabs/TweenLabs/blob/2977c1ebe5a15cb3f81b9184c81987ebc71c593e/bin/cli.js).

## Selección de V1 y referencias secundarias

Los cuatro repositorios anteriores se integran como **referencias documentadas y procedimientos de adopción**, no como código copiado, servicios activos ni instaladores ejecutados. UI UX Pro Max queda como skill externa opcional; React Bits y TweenLabs son fuentes de selección por componente; Motion Primitives permanece pendiente de licencia verificable.

La biblioteca de WebForge usa implementaciones propias con React, GSAP y Motion. La lista instalada y sus usos reales se documenta en package.json y en la entrega; la investigación de un catálogo no implica su instalación ni una mejora visual validada.

Se mantiene la evaluación anterior de [GSAP](https://github.com/greensock/GSAP): el manifiesto 3.15.0 remite a la [Standard no charge license](https://gsap.com/standard-license), no a MIT. [Three.js](https://github.com/mrdoob/three.js/blob/dev/LICENSE) y [React Three Fiber](https://github.com/pmndrs/react-three-fiber/blob/master/LICENSE) tienen licencia MIT consultada en la etapa previa; siguen siendo opciones 3D no instaladas. Sus enlaces secundarios son mutables: fijar revisión y verificar compatibilidad/licencia al adoptarlos.

Por cada incorporación guardar objetivo, alternativa existente, revisión/origen, licencia, imports, archivos afectados, coste y evidencia. No confundir lectura documental, pruebas automáticas y crítica visual real. Ver [integraciones](../integrations/README.md) y [estado comprobado](progress.md).
