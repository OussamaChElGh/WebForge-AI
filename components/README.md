# Biblioteca de componentes V1

Implementaciones propias React + TypeScript estricto. Sin estilos globales impuestos, assets externos ni código copiado de catálogos. Cada archivo empieza con use client; importa el subpath del componente elegido para no cargar motores ajenos. El barrel components/index.ts es conveniente cuando se usan los tres.

## TextReveal — GSAP

```tsx
import { TextReveal } from 'webforge-ai/components/TextReveal';

<TextReveal
  as="h2"
  text="Una voz editorial propia"
  distance={24}
  duration={0.65}
  stagger={0.08}
  className="text-4xl leading-tight"
/>;
```

Parámetros: text obligatorio, as p/span/div/h1/h2/h3 (p por defecto), distance 0–80 px, duration 0,05–2 s, stagger 0–0,3 s. Acepta atributos HTML, className y style. Separa palabras conservando espacios; no intenta inferir líneas visuales o dividir grafemas. Una copia completa solo para tecnología asistiva evita leer palabra a palabra; la copia visual aria-hidden permanece visible en SSR. Cadena larga sin espacios puede partirse dentro del ancho disponible.

La entrada sucede al montar o cambiar texto/as/parámetros, no al hacer scroll. mountReveal usa matchMedia: en reduced motion no crea tweens; al cambiar la preferencia restaura estilos. El efecto devuelve cleanup para desmontaje/StrictMode. No usarlo para retrasar acciones esenciales ni añadir CSS inicial opacity:0.

## ParallaxHero — GSAP y ScrollTrigger

```tsx
import { ParallaxHero } from 'webforge-ai/components/ParallaxHero';

<ParallaxHero
  aria-labelledby="hero-title"
  amount={8}
  minWidth={768}
  minHeight="32rem"
  media={
    <img
      src="/images/approved-landscape.jpg"
      alt=""
      width={1600}
      height={1000}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  }
>
  <h1 id="hero-title">Contenido esencial estable</h1>
</ParallaxHero>;
```

media y children obligatorios. amount 0–20 % (8 por defecto); minWidth 320–3840 CSS px (768); minHeight CSS/string o número. La capa de medios es decorativa, aria-hidden e inert: sus descendientes no entran al teclado. El contenido de primer plano no se transforma. Si la imagen transmite información, mantener su alternativa en el contenido, no en la capa oculta. En Next.js se puede pasar Image como media, usando dimensiones/fill, sizes y prioridad adecuados al cliente; no se instala Next aquí.

Efecto scrub sin pin ni scroll smoothing, desactivado bajo minWidth y con reduced motion. Cleanup revierte solo su scope; no elimina triggers ajenos. Mantener position, isolation y clipping estructurales; no sustituirlos mediante style. La capa tiene overscan para el desplazamiento; el cliente valida crop y legibilidad. Refrescar ScrollTrigger tras cambios de layout dinámicos/assets si su app lo requiere.

## MagneticButton — Motion

```tsx
'use client';
import { MagneticButton } from 'webforge-ai/components/MagneticButton';

<MagneticButton
  strength={0.2}
  maxDistance={16}
  stiffness={250}
  damping={24}
  className="rounded-lg bg-blue-700 px-5 py-3 text-white focus-visible:outline"
  onClick={() => console.log('Acción del cliente')}
>
  Explorar
</MagneticButton>;
```

Native button, type button por defecto; acepta disabled, aria, eventos y estilos. strength 0–0,5, maxDistance 0–40 px por eje, stiffness/damping finitos positivos. wrapperClassName personaliza el span estable para medir puntero sin feedback del transform. El límite se refiere al destino del spring; elegir damping suficiente si se desea evitar overshoot. No pasar un transform que compita con x/y.

Solo magnetismo con puntero fino/hover y sin reduced motion. Touch no desplaza; foco/teclado y pointer down/cancel vuelven a posición estable; disabled o cambio a reduced motion resetean inmediatamente. Pointer leave vuelve mediante spring. El efecto elimina el listener de preferencia y detiene springs al desmontar. Motion gestiona sus suscripciones internas.

## Consumo y límites

Desde el framework ejecutar npm run build para obtener dist con JS ESM y declaraciones. El paquete maestro es privado; se puede referenciar como dependencia local/workspace o copiar SOLO el componente seleccionado y su helper relativo, preservando rutas y avisos. No copiar package.json completo, test server, .git o node_modules al cliente.

React/ReactDOM 19 y GSAP/Motion compatibles son peers; las versiones exactas probadas y licencias están en docs/dependencies.md. GSAP y Motion son peers opcionales por subpath: TextReveal/ParallaxHero necesitan GSAP, MagneticButton necesita Motion; el barrel necesita ambos. No actualizar React/Tailwind del cliente automáticamente: verificar compatibilidad y adaptar una copia si su versión no cumple. Tailwind no es requisito del runtime de los componentes, className permite reutilizar el instalado.

Se probaron SSR React, hidratación y StrictMode en la fixture. No se ha ejecutado un build Next.js ni una web cliente. Cada adopción requiere especificación aprobada y build/pruebas reales del proyecto. No implica una licencia pública propia: private/UNLICENSED mantiene el framework interno hasta que su propietario decida publicarlo.
