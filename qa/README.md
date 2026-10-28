# QA de componentes y revisión visual

## Suite normal

```sh
npm run check
npm run test:browser
```

Playwright inicia qa/serve-fixture.mjs y lo cierra al terminar. La fixture React/SSR usa assets propios, no es una web de cliente. Se prueban desktop 1280, mobile touch 320 y tablet 768 px; los casos de motion también cambian breakpoints. El emulador móvil declara meta viewport real.

Genera test-results/**/components.png e incorpora las capturas al informe HTML. Se capturan en estado inicial con reduced motion para estabilidad, antes de ejecutar interacciones. La suite comprueba overflow del documento, errores de consola/hidratación, botón/Enter, exclusión del slot inert del Tab, touch, reduced motion en carga/cambio, montaje/desmontaje StrictMode y SSR sin JS. Los tests previos verifican contraste/compilación Tailwind y conservación de triggers ajenos.

CI usa Chromium de Playwright y sube informes/capturas incluso en éxito. En esta máquina se permite explícitamente PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium; registrar versión, pues no es el mismo binario fijado por Playwright. El servidor local liga solo 127.0.0.1 y no se debe desplegar.

## Comparación cuando existan referencias

```sh
WEBFORGE_VISUAL_REFERENCE_DIR=/ruta/absoluta/referencias npm run test:visual
```

Estructura: desktop/components.png, mobile/components.png, tablet/components.png. Referencias del mismo navegador/entorno, datos y estado; preservar capturas aprobadas antes del cambio. playwright.visual.config.ts exige ruta absoluta, usa updateSnapshots none y tolerancia maxDiffPixels 0. Si faltan imágenes, falla; no genera ni actualiza baselines. La suite normal no dispara esta comparación al no tener referencias. Nunca pasar --update-snapshots para convertir un fallo en aceptación.

No se proporcionan baselines inventados. La comparación del cliente se adapta a sus propias rutas/estados y entorno; la fixture no evalúa su diseño. Un diff de píxeles demuestra diferencia o coincidencia, no calidad artística.

## Crítica independiente

Visual Critic lee especificación/revisión/diff y ve capturas reales comparables. Si el entorno/modelo no tiene acceso efectivo a imágenes, registrar auditoría visual por IA no realizada. Producir screenshots no basta para afirmar haberlas examinado. Indicar qué imágenes se vieron y qué estados faltan.

Revisar composición, jerarquía, tipografía, coherencia, lectura, crop, foco y responsive. Para ritmo/fluidez/scroll pedir clips y trazas; screenshots estáticas no permiten aprobarlos. No editar implementación ni baselines. Entregar hasta cinco incidencias con severidad, ubicación, evidencia y cierre; Director acepta.

## Rendimiento y cliente

Usar build y dispositivo reales con varias muestras comparables para LCP/CLS, JS gzip, tareas largas y frames. Registrar condiciones y presupuesto en templates/visual-evidence.md. No declarar ahorro de tokens, fluidez ni mejora artística del cliente por pasar una fixture. Los tests de teclado/semántica no son auditoría WCAG completa; revisar también zoom, estados y contenido real.
