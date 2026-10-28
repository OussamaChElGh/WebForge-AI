'use client';

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { mountParallax } from '../motion/gsap-presets.mjs';

export interface ParallaxHeroProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'dangerouslySetInnerHTML'
> {
  media: ReactNode;
  children: ReactNode;
  amount?: number;
  minWidth?: number;
  minHeight?: string | number;
}

/** La capa media es decorativa. El contenido esencial permanece en flujo y sin transform. */
export function ParallaxHero({
  media,
  children,
  amount = 8,
  minWidth = 768,
  minHeight = 'min(70svh, 42rem)',
  style,
  ...props
}: ParallaxHeroProps) {
  const root = useRef<HTMLElement>(null);
  useEffect(
    () =>
      mountParallax(gsap, ScrollTrigger, root.current, { amount, minWidth }),
    [amount, minWidth, minHeight],
  );
  return (
    <section
      {...props}
      ref={root}
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        minHeight,
        display: 'grid',
        alignItems: 'center',
        ...style,
      }}
    >
      <div
        data-wf-parallax=""
        aria-hidden="true"
        inert
        style={{
          position: 'absolute',
          inset: '-25% 0',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        {media}
      </div>
      <div style={{ position: 'relative' }}>{children}</div>
    </section>
  );
}
