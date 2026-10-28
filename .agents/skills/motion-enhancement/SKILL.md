---
name: motion-enhancement
description: Aplicar motion creativo con GSAP solo a una especificación aprobada y con fallback accesible.
---

# motion-enhancement

Cargar únicamente cuando la tarea lo requiera; estas instrucciones no crean agentes adicionales.

1. Leer especificación aprobada, límites y componentes afectados; validar su gate y contrastar la aprobación humana.
2. Elegir CSS para efectos simples. Reutilizar motion/gsap-presets.mjs para reveal/parallax o definir una secuencia justificada; no instalar todos los catálogos.
3. En Next.js mantener cambios en una isla cliente, usar un efecto y devolver cleanup. Registrar plugins solo cuando se usan. No acceder a window al importar código SSR.
4. Mantener contenido visible sin JS; respetar reduced motion y cambios de preferencia; usar wrappers dedicados para no pisar transforms existentes. No scroll hijacking ni parallax en controles/texto esencial.
5. Probar mount/unmount/Strict Mode, cambios de ruta, móvil, teclado y presupuestos. No implementar 3D sin beneficio/fallback/coste aprobados.
6. Entregar diff y evidencia breve; no declarar fluidez o mejora artística solo con tests de laboratorio.
