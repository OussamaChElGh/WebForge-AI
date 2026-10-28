# Motion library

Dos presets propios opt-in en gsap-presets.mjs: reveal de entrada y parallax por scroll en capas decorativas. GSAP 3.15.0 es devDependency para sus pruebas; el consumidor aporta gsap y, para parallax, ScrollTrigger. El módulo no importa un motor global ni accede a window al importarse; con root ausente devuelve cleanup vacío para SSR. No es una app ni un paquete publicado.

## Contrato

- root limita la búsqueda a descendientes [data-wf-reveal] o [data-wf-parallax]. No afecta el root en sí ni nodos fuera del scope.
- Contenido visible por defecto: no aplicar CSS que oculte los targets antes de cargar JS. No usar reveal para bloquear acciones esenciales ni parallax en texto/controles.
- Usar wrappers dedicados si existen transforms; no animar la misma propiedad desde otro motor.
- Devolver cleanup al desmontar y antes de reinicializar; matchMedia revierte solo sus animaciones/triggers y reacciona a cambios de reduced motion y breakpoint. No se llama killAll.
- Reveal: 24 px, 0,65 s, stagger 0,08 s; rangos acotados y validación de valores finitos.
- Parallax: ±8 % por defecto, scrub y sin pin ni suavizado global; activo desde 768 px y sin reduced motion. Amount 0–20 %; proteger clipping y contraste según la especificación.
- Scroll storytelling complejo es una receta pendiente de cada especificación, no una solución universal implementada. No se incluyen Three/Fiber ni shaders.

## Adopción Next.js (ejemplo orientativo, no ejecutado aquí)

En un componente cliente pequeño ya autorizado:

```tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { mountReveal } from './gsap-presets.mjs';

// Incorporar en el componente existente, sin reemplazar toda la página.
const root = useRef<HTMLElement>(null);
useEffect(() => mountReveal(gsap, root.current), []);
// Conectar root a un contenedor existente y data-wf-reveal al wrapper aprobado.
```

El fragmento muestra líneas dentro del componente: no es una aplicación completa. Verificar imports y versiones del cliente, contenido SSR y ciclo setup/cleanup/setup de React Strict Mode. Para parallax importar ScrollTrigger en la frontera cliente y pasar mountParallax(gsap, ScrollTrigger, root.current). Si se cargan módulos asíncronamente, gestionar la cancelación del efecto; el preset no gestiona esa carga por ti.

El código y tests de este repositorio prueban GSAP real en navegador, no un mock. Validan aislamiento, cleanup repetible, media queries y conservación de triggers ajenos. No acreditan fluidez, coste gzip final o Core Web Vitals del cliente; medirlos en su build/dispositivo antes y después. Consultar qa/README.md.
