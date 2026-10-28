---
name: gsap-scroll-storytelling
description: Construir secuencias ScrollTrigger y parallax acotadas con cleanup y alternativas estáticas.
---

# gsap-scroll-storytelling

Cargar únicamente cuando la tarea lo requiera; no activa un agente adicional.

1. Leer especificación aprobada y mapear escenas, hitos narrativos y contenido esencial antes de programar.
2. Aislar en una frontera cliente y scope local. Reutilizar ParallaxHero o motion/gsap-presets.mjs si basta; una narrativa compleja exige receta específica, no una abstracción universal.
3. Registrar solo plugins usados; revertir contexto/matchMedia al desmontar o cambiar ruta. Nunca killAll sobre triggers ajenos.
4. Respetar reduced motion y breakpoints, mantener lectura sin JS y evitar scroll hijacking/pin por defecto. Preservar transforms mediante capas dedicadas.
5. Refrescar mediciones tras cambios de layout/assets cuando el proyecto lo necesite. Verificar desmontaje, resize, CLS, tareas largas y scroll con clips/trazas reales.
