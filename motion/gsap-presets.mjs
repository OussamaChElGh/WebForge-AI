/** Presets opt-in. El consumidor aporta GSAP; este módulo no toca el DOM al importar. */
export const motionDefaults = Object.freeze({
  reveal: Object.freeze({ distance: 24, duration: 0.65, stagger: 0.08 }),
  parallax: Object.freeze({ amount: 8, minWidth: 768 }),
});

/** @param {string} name @param {number} value @param {number} min @param {number} max */
function range(name, value, min, max) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${name} debe estar entre ${min} y ${max}`);
  }
}

/** @param {ReturnType<typeof import('gsap').gsap.matchMedia>} media */
function disposer(media) {
  let disposed = false;
  return () => {
    if (!disposed) media.revert();
    disposed = true;
  };
}

/**
 * Entrada de elementos [data-wf-reveal] dentro de root, sin estilos ocultos previos.
 * Invocar desde un efecto cliente y devolver el cleanup al desmontar.
 * @param {typeof import('gsap').gsap} gsap
 * @param {Element | null | undefined} root
 * @param {{ distance?: number, duration?: number, stagger?: number }} [options]
 */
export function mountReveal(gsap, root, options = {}) {
  if (!root?.ownerDocument.defaultView) return () => {};
  const { distance, duration, stagger } = {
    ...motionDefaults.reveal,
    ...options,
  };
  range('distance', distance, 0, 80);
  range('duration', duration, 0.05, 2);
  range('stagger', stagger, 0, 0.3);
  const targets = [...root.querySelectorAll('[data-wf-reveal]')];
  if (!targets.length) return () => {};
  const media = gsap.matchMedia(root);
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(
      targets,
      { y: distance, opacity: 0 },
      { y: 0, opacity: 1, duration, stagger, ease: 'power2.out' },
    );
  });
  return disposer(media);
}

/**
 * Parallax en capas decorativas dedicadas, nunca sobre controles o texto esencial.
 * ScrollTrigger se aporta por separado y solo se registra si hay targets.
 * @param {typeof import('gsap').gsap} gsap
 * @param {typeof import('gsap/ScrollTrigger').ScrollTrigger} ScrollTrigger
 * @param {Element | null | undefined} root
 * @param {{ amount?: number, minWidth?: number }} [options]
 */
export function mountParallax(gsap, ScrollTrigger, root, options = {}) {
  if (!root?.ownerDocument.defaultView) return () => {};
  const { amount, minWidth } = { ...motionDefaults.parallax, ...options };
  range('amount', amount, 0, 20);
  range('minWidth', minWidth, 320, 3840);
  const targets = [...root.querySelectorAll('[data-wf-parallax]')];
  if (!targets.length) return () => {};
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia(root);
  media.add(
    `(prefers-reduced-motion: no-preference) and (min-width: ${minWidth}px)`,
    () => {
      for (const target of targets) {
        gsap.fromTo(
          target,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: {
              trigger: target,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }
    },
  );
  return disposer(media);
}
