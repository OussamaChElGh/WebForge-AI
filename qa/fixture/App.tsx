import { StrictMode, useEffect, useState } from 'react';
import {
  TextReveal,
  ParallaxHero,
  MagneticButton,
} from '../../components/index.js';

/** Fixture técnica con assets propios. No es plantilla de web ni diseño de cliente. */
export function App() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [clicks, setClicks] = useState(0);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <StrictMode>
      <div data-qa-ready={ready ? 'true' : 'false'}>
        <header>
          <h1>Laboratorio de componentes</h1>
          <p>Fixture técnica de WebForge AI</p>
          <button id="toggle" onClick={() => setVisible((value) => !value)}>
            Montar / desmontar
          </button>
        </header>
        <main>
          {visible && (
            <div id="components">
              <ParallaxHero
                id="hero"
                aria-label="Parallax de laboratorio"
                minHeight="24rem"
                media={
                  <>
                    {' '}
                    <svg
                      viewBox="0 0 800 600"
                      preserveAspectRatio="xMidYMid slice"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <rect width="800" height="600" fill="#e0e7ff" />
                      <circle cx="600" cy="180" r="170" fill="#a5b4fc" />
                      <path d="M0 520L800 100V600H0Z" fill="#818cf8" />
                    </svg>
                    <a
                      id="decorative-link"
                      href="#not-a-destination"
                      style={{ position: 'absolute', bottom: 0 }}
                    >
                      Descendiente decorativo de prueba
                    </a>
                  </>
                }
              >
                <div className="hero-content">
                  <TextReveal
                    as="h2"
                    text="Tipografía que conserva su voz"
                    duration={0.8}
                  />
                  <p>
                    Contenido real de prueba, visible antes de cargar
                    JavaScript.
                  </p>
                </div>
              </ParallaxHero>
              <section
                className="controls"
                aria-label="Interacción de laboratorio"
              >
                <MagneticButton
                  id="magnetic"
                  onClick={() => setClicks((value) => value + 1)}
                >
                  Acción magnética
                </MagneticButton>
                <MagneticButton disabled>Acción deshabilitada</MagneticButton>
                <p role="status">Activaciones: {clicks}</p>
                <TextReveal text="ExtraordinariamenteLargaSinSeparadoresParaComprobarElComportamientoResponsive" />
              </section>
            </div>
          )}
        </main>
      </div>
    </StrictMode>
  );
}
