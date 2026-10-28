# WebForge AI — Creative Frontend Framework V1

Framework maestro para crear y mejorar frontend creativo sobre webs funcionales generadas con Google AI Studio u otras herramientas. Tres agentes, skills bajo demanda y componentes propios; no construye una web completa ni sustituye al generador.

## Empezar

Node.js 24 y npm, desde la raíz:

```sh
npm ci
npm run check
npx playwright install --with-deps chromium
npm run test:browser
```

En este entorno hay Chromium instalado:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:browser
```

npm run check ejecuta lint, tipos, formato, build de biblioteca y tests Node. npm run build genera dist con JS/declaraciones; no es un build Next.js. Playwright levanta y cierra una fixture local React SSR, obtiene capturas y prueba interacción. npm run qa:serve permite inspeccionarla manualmente; es un laboratorio, no una plantilla de cliente.

## Estructura

```text
.codex/                Tres roles Codex, sin modelos impuestos
.agents/skills/        Siete skills creativas + creative-audit conservada
components/           TextReveal, ParallaxHero y MagneticButton propios
motion/               Presets GSAP reutilizados por los componentes
styles/               Tokens y adaptador Tailwind opt-in
qa/                   Fixture, herramientas y protocolo de evidencia
templates/project/    Inicio documental para proyectos, sin app generada
templates/            Contexto, especificación y evidencia de cliente
integrations/         Adopción selectiva de referencias externas
docs/                 Arquitectura, licencias, referencias y estado
tests/                Node, navegador y comparación visual opcional
archive/              Historia generalista; fuera del contexto habitual
```

## Agentes y skills

Creative Director coordina, investiga y especifica diseño; Creative Frontend & Motion Engineer implementa; Visual Critic revisa evidencia sin editar. Configuración para Codex 0.163.0: revisar y confiar en el checkout para cargarla. Cada tarea usa [contrato](docs/delegation.md), un escritor por archivo y solo los agentes necesarios.

Skills: art-direction, typography-and-layout, motion-design, gsap-scroll-storytelling, react-bits-integration, visual-audit y responsive-refinement. creative-audit conserva la auditoría inicial compacta. UI UX Pro Max se integra como skill externa opcional, sin copiar sus datos. La presencia de un SKILL.md no prueba su descubrimiento en otra instalación de Codex.

## Biblioteca e integración

[API y ejemplos](components/README.md): TextReveal/ParallaxHero usan GSAP; MagneticButton usa Motion. Todos tienen SSR visible, configuración, cleanup y reduced motion. [Dependencias y licencias](docs/dependencies.md).

Sobre una web existente: seguir [la guía](docs/new-project.md), preservar stack/contenido/rutas, capturar baseline y obtener especificación aprobada antes de cambiar diseño. Incorporar solo el componente y motor necesarios; no copiar el manifiesto maestro ni regenerar Next. La [plantilla documental](templates/project/README.md) organiza ese trabajo.

Las [cuatro referencias oficiales](docs/references.md) se investigaron a commits fijados; no se copiaron sus repositorios ni se ejecutaron sus CLI. TweenLabs y React Bits son referencias de adopción selectiva; Motion Primitives está pendiente de texto de licencia verificable.

## QA visual

La suite normal genera capturas desktop/mobile/tablet y controla overflow, teclado, touch, movimiento reducido, SSR y cleanup. Comparación opcional, solo con referencias previamente revisadas:

```sh
WEBFORGE_VISUAL_REFERENCE_DIR=/ruta/absoluta/referencias npm run test:visual
```

Se esperan desktop/components.png, mobile/components.png y tablet/components.png. La comparación no crea/actualiza baselines y falla si faltan. Capturas y diff de píxeles no equivalen a auditoría artística por IA; esta exige acceso efectivo a las imágenes. [Estado y límites comprobados](docs/progress.md).
