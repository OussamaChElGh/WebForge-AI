'use client';

import { createElement, useEffect, useRef, type HTMLAttributes } from 'react';
import { gsap } from 'gsap';
import { mountReveal } from '../motion/gsap-presets.mjs';

export interface TextRevealProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'dangerouslySetInnerHTML'
> {
  text: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';
  distance?: number;
  duration?: number;
  stagger?: number;
}

/** Texto completo accesible; palabras visibles en SSR y animación local opt-in. */
export function TextReveal({
  text,
  as = 'p',
  distance = 24,
  duration = 0.65,
  stagger = 0.08,
  style,
  ...props
}: TextRevealProps) {
  const root = useRef<HTMLElement>(null);
  useEffect(
    () => mountReveal(gsap, root.current, { distance, duration, stagger }),
    [as, text, distance, duration, stagger],
  );
  return createElement(
    as,
    { ...props, ref: root, style: { position: 'relative', ...style } },
    <span
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clipPath: 'inset(50%)',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>,
    <span aria-hidden="true">
      {text.split(/(\s+)/u).map((part, index) =>
        /^\s+$/u.test(part) ? (
          part
        ) : (
          <span
            key={index}
            data-wf-reveal=""
            style={{
              display: 'inline-block',
              maxWidth: '100%',
              overflowWrap: 'anywhere',
            }}
          >
            {part}
          </span>
        ),
      )}
    </span>,
  );
}
