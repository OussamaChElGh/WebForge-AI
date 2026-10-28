---
name: motion-design
description: Diseñar e implementar movimiento coherente con intención, accesibilidad y rendimiento.
---

# motion-design

Cargar únicamente cuando la tarea lo requiera; no activa un agente adicional.

1. Validar especificación/revisión y evidencia de aprobación; identificar propósito de cada efecto.
2. Reutilizar CSS primero. TextReveal/ParallaxHero usan GSAP; MagneticButton usa Motion. No animar la misma propiedad con dos motores.
3. Definir disparador, duración/ease, rango, jerarquía y fallback; no introducir efectos decorativos acumulativos sin intención.
4. Mantener contenido SSR visible, reduced motion en carga y cambios, cleanup/StrictMode y teclado. Usar componentes propios antes de copiar referencias.
5. Ejecutar pruebas relevantes y medir presupuesto en build/dispositivo cliente; no inferir fluidez de capturas estáticas.
