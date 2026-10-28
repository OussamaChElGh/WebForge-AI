'use client';

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type PointerEvent,
} from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'
>;
export interface MagneticButtonProps extends NativeButtonProps {
  strength?: number;
  maxDistance?: number;
  stiffness?: number;
  damping?: number;
  wrapperClassName?: string;
}

/** Button nativo: no magnetismo para touch, teclado, disabled o reduced motion. */
export function MagneticButton({
  children,
  strength = 0.2,
  maxDistance = 16,
  stiffness = 250,
  damping = 24,
  disabled,
  type = 'button',
  wrapperClassName,
  style,
  ...props
}: MagneticButtonProps) {
  if (
    ![strength, maxDistance, stiffness, damping].every(Number.isFinite) ||
    strength < 0 ||
    strength > 0.5 ||
    maxDistance < 0 ||
    maxDistance > 40 ||
    stiffness <= 0 ||
    damping <= 0
  ) {
    throw new RangeError(
      'Parámetros magnéticos fuera de rango; ver components/README.md',
    );
  }
  const wrapper = useRef<HTMLSpanElement>(null);
  const [allowed, setAllowed] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });
  useEffect(() => {
    const query = window.matchMedia(
      '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)',
    );
    const update = () => setAllowed(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!allowed || disabled) {
      x.set(0);
      y.set(0);
      springX.jump(0);
      springY.jump(0);
    }
    return () => {
      springX.stop();
      springY.stop();
    };
  }, [allowed, disabled, x, y, springX, springY]);
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const resetImmediately = () => {
    reset();
    springX.jump(0);
    springY.jump(0);
  };
  const move = (event: PointerEvent<HTMLSpanElement>) => {
    const root = wrapper.current;
    if (
      !allowed ||
      disabled ||
      event.pointerType === 'touch' ||
      !root ||
      root.contains(root.ownerDocument.activeElement)
    )
      return;
    const bounds = root.getBoundingClientRect();
    const clamp = (value: number) =>
      Math.max(-maxDistance, Math.min(maxDistance, value * strength));
    x.set(clamp(event.clientX - bounds.left - bounds.width / 2));
    y.set(clamp(event.clientY - bounds.top - bounds.height / 2));
  };
  return (
    <span
      ref={wrapper}
      className={wrapperClassName}
      style={{ display: 'inline-flex', maxWidth: '100%' }}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={resetImmediately}
      onPointerDown={resetImmediately}
      onFocusCapture={resetImmediately}
    >
      <motion.button
        {...props}
        type={type}
        disabled={disabled}
        style={{ ...style, x: springX, y: springY }}
      >
        {children}
      </motion.button>
    </span>
  );
}
