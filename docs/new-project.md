# Usar V1 sobre una web de Google AI Studio

## 1. Conservar el proyecto existente

Abrir el checkout exportado en una rama y conservar su gestor/lockfile, rutas, contenido, estilos e integraciones. No ejecutar create-next-app ni copiar el package.json de WebForge. En la nube trabajar en el checkout existente sin worktree salvo petición expresa. La exportación puede ser Next, React/Vite u otra configuración: verificarla antes de usar componentes.

Crear contexto con templates/client-context.md: revisión, stack/versiones, comandos reales, rutas objetivo, componentes/tokens/motion existentes, áreas protegidas, baseline y límites. Actualizar solo lo que cambie; no auditar todo el repo en cada turno.

## 2. Roles, skills y especificación

Fusionar reglas/roles/skills pertinentes con los ya existentes; no sobrescribir AGENTS.md ni .codex/.agents. Revisar confianza y capacidades reales de Codex. Director dirige e investiga, Engineer implementa, Critic revisa evidencia. Elegir skill concreta; UI UX Pro Max permanece externa bajo demanda sin duplicar sus datos. Ver integrations/README.md.

La plantilla templates/project/README.md organiza contexto/especificación/evidencia por cliente. Completar una copia de templates/enhancement-spec.json con revisión base, objetivo, archivos permitidos/protegidos, criterios visuales/motion y presupuestos. Conservar draft hasta aprobación humana trazable; cambios de revisión invalidan la aprobación anterior.

Desde el framework:

```sh
npm run spec:check -- /ruta/cliente/docs/webforge/enhancement-spec.json
```

El validador comprueba estructura y estado declarado, no autentica al aprobador ni compara por sí mismo el SHA real. Director contrasta esa evidencia. La autorización para construir V1 no autoriza rediseñar clientes.

## 3. Incorporar solo el componente necesario

En WebForge, npm ci y npm run build generan JS y tipos. Se puede usar el paquete como dependencia local/workspace, crear un tarball interno con npm pack, o copiar componentes seleccionados con sus helpers e imports relativos. package.json sigue private/UNLICENSED: no se ha publicado un paquete ni decidido licencia pública propia.

Revisar React instalado: V1 se prueba con React/ReactDOM 19. No forzar actualización de React/Tailwind; si el cliente es distinto, comprobar/adaptar una copia o continuar con patrones existentes. Incorporar con su gestor solo GSAP para TextReveal/ParallaxHero o Motion para MagneticButton; no instalar ambos para un efecto simple. Ver components/README.md y docs/dependencies.md.

Ejemplo de import por subpath en Next:

```tsx
import { TextReveal } from 'webforge-ai/components/TextReveal';

export default function ExistingSection() {
  return <TextReveal as="h2" text="El título aprobado del cliente" />;
}
```

El componente de biblioteca ya declara use client; no convertir la página entera en cliente. Callbacks de MagneticButton deben pasar desde una isla cliente. ParallaxHero admite media decorativa, incluso Next Image si se configura según su versión; el contenido esencial va en children. Estos son ejemplos de uso, no una app Next probada aquí.

Conservar tokens actuales; styles/ solo se importa si se aprueba. El adaptador de WebForge es Tailwind 4 y no debe imponerse a otra versión. No crear nuevo backend, página, checkout o proveedor para una mejora visual.

## 4. Validar y revisar

Ejecutar scripts reales del cliente de tipos/lint/build/pruebas; no sustituirlos por el check del framework. Verificar navegación, cleanup y StrictMode, contenido SSR, interacción, reduced motion y anchos críticos. Mantener baseline antes/después de los mismos estados/datos/viewports.

La fixture de WebForge demuestra funcionamiento de componentes, no el diseño de un cliente. Para comparar imágenes aportar referencias aprobadas a test:visual; no crear baselines silenciosamente. Critic debe poder VER las capturas antes de declarar auditoría visual por IA; para animación se necesitan clips/trazas y para performance mediciones del cliente.

Director acepta con evidencia según qa/README.md. No realizar despliegues ni fusionar cambios sin autorización expresa.
