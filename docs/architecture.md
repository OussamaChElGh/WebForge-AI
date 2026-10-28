# Arquitectura V1

WebForge es el framework maestro; el cliente conserva su propia app. Complementa Google AI Studio mediante dirección, componentes y revisión, sin asumir una API de generación ni recrear rutas/backend/deployment.

| Capa               | Responsabilidad                                            | Consumo                                                                 |
| ------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| .codex/            | Tres agentes nativos y contratos                           | Hilo principal Director; Engineer/Critic solo cuando aportan valor      |
| .agents/skills/    | Siete skills solicitadas más auditoría inicial conservada  | Carga por tarea; sin datos duplicados de UI UX Pro Max                  |
| components/        | Biblioteca React TS estricta, tres componentes propios     | Subpaths para seleccionar el motor; cada componente es frontera cliente |
| motion/            | Presets GSAP con scope/matchMedia/reversión                | Reutilizados por TextReveal y ParallaxHero                              |
| styles/            | Tokens semánticos/adaptador Tailwind                       | Opt-in; mantener estilos/versiones del cliente                          |
| qa/                | Fixture React SSR, servidor local y protocolo de evidencia | Solo laboratorio, no app de cliente ni producción                       |
| templates/project/ | Inicio documental sobre una app existente                  | Sin scaffolding Next; contexto, especificación, decisiones y evidencia  |
| integrations/      | Procedimientos de referencias externas                     | No CLI ejecutado, servicios/MCP configurados ni catálogos copiados      |
| docs/              | Decisiones, fuentes a commit, licencias y progreso         | Memoria compacta; evitar repetir análisis                               |

## Agentes y compatibilidad

Creative Director coordina, investiga y especifica arte/diseño. Creative Engineer implementa frontend/GSAP/Motion y controles. Visual Critic revisa evidencia sin editar. Registro [agents.<role>] y config_file, sandbox read-only para Critic, máximo de dos subagentes y profundidad uno. No se fija modelo ni se modifica trust global. Configuración preparada para Codex 0.163.0; el esquema válido no demuestra que una instalación sin confianza cargue esos roles. Las skills requieren descubrimiento por esa instalación.

## Biblioteca y build

npm run build usa tsc para generar dist/components y dist/motion con ESM/declaraciones; preserva use client. El paquete privado declara exports por componente y peers. GSAP/Motion son opcionales por subpath; el barrel importa los tres y requiere ambos motores. React 19 es la versión probada; no se obliga a migrar otro cliente.

TextReveal compone palabras visibles SSR y texto completo accesible, con GSAP reutilizado del preset. ParallaxHero separa primer plano del slot decorativo aria-hidden/inert y solo activa ScrollTrigger cuando permiten breakpoint y movimiento. MagneticButton mantiene botón nativo, valores/springs Motion fuera del estado React de cada puntero y un wrapper estable. Limpia listener/springs; teclado, touch, disabled y reduced motion conservan posición estática.

No hay estilos globales del framework importados por componentes. className/style permiten el sistema existente, incluido Tailwind. No combinar dos motores sobre la misma propiedad. UI UX Pro Max, React Bits, Motion Primitives y TweenLabs son referencias/guías, no dependencias del runtime. [Versiones y licencias](dependencies.md).

## QA y límites

El servidor de qa/ compila la fixture local con esbuild y produce HTML SSR + hidratación React. Playwright lo inicia/cierra, comprueba errores, overflow, keyboard/touch, preferencias y ciclos StrictMode. Los assets son SVG propios; no hay servicios externos ni datos cliente. CI guarda capturas/informes como artefactos incluso en éxito.

La comparación visual usa configuración separada y referencias aprobadas externas; no crea ni actualiza baselines. Capturas no equivalen a capturas vistas: la revisión por IA exige acceso efectivo del modelo a ellas. Clips/trazas y mediciones del dispositivo cliente son necesarios para juzgar fluidez/presupuesto.

No se ejecutó una app Next.js, benchmark de Core Web Vitals ni un despliegue. El límite cliente y SSR React están comprobados; la integración específica de Next/router/versión se prueba al adoptar el componente en el cliente.

## Eficiencia y alcance

Auditar una vez por revisión, persistir contexto y delegar objetivo/diff/rutas concretas; un único escritor por archivo. No crear roles ni activar ocho skills por defecto. Reutilizar componentes y herramientas deterministas antes de pedir crítica. No atribuir ahorro de tokens o mejora visual del cliente sin baseline medido.
