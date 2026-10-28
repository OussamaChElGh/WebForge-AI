# Design system para enhancement

## Conservar identidad, mejorar intención

El punto de partida son tokens, componentes, fuentes y referencias del cliente. Creative Director define composición, jerarquía editorial, ritmo y lenguaje de movimiento para las áreas aprobadas. No imponer la paleta neutral del framework ni una estética idéntica a todos los clientes. No sustituir tipografía, espaciado global o globals.css sin especificación aprobada.

## Base reutilizable

styles/tokens.css conserva los roles semánticos background/surface/text/muted/brand/on-brand/border/focus/error/success y escalas de tipografía, espacio, contenedores, radios y movimiento. Son valores de laboratorio, no una identidad aprobada. Sus contrastes base se comprueban determinísticamente.

styles/tailwind.css es adaptador opcional para Tailwind 4 con source(none) y @theme inline. El consumidor añade @source con rutas reales. No introducirlo en Tailwind 3 ni reemplazar su configuración. Si hay un sistema existente, mapear los roles necesarios y mantener la fuente de verdad del cliente.

## Dirección y motion

Documentar para el piloto: orden de lectura, escala y medida tipográfica, composición de imágenes, densidad, contraste, punto focal y referencias con derechos. Motion debe reforzar jerarquía o narrativa, no esconder contenido ni competir con el CTA. Definir disparador, duración/ease, capas afectadas y alternativa estática/reduced motion.

Biblioteca components/ y presets motion/ separados de identidad: presets opt-in con motor GSAP aportado por consumidor y wrappers dedicados. El valor --wf-motion-duration de CSS no controla automáticamente un tween GSAP; estos presets usan matchMedia para preferencias. Evitar animar la misma propiedad desde CSS y varios motores.

## Aceptación

Verificar legibilidad, teclado/foco, contraste AA pertinente, objetivos de controles, zoom y responsive de la interfaz real. Verificar contenido sin JS, reduced motion y cleanup en navegación. Las pruebas de tokens no prueban accesibilidad completa ni calidad artística de un cliente. Visual Critic necesita capturas y clips comparables; el Director decide con intención y evidencias, no con la cantidad de efectos.

## Componentes V1

TextReveal conserva texto completo accesible y palabras visibles SSR. ParallaxHero mantiene primer plano estable y media decorativa aria-hidden/inert. MagneticButton conserva botón nativo y no desplaza controles con teclado/touch/reduced motion. className/style reutilizan el sistema del cliente; no se importan tokens globales por defecto. Los ejemplos están en components/README.md.
