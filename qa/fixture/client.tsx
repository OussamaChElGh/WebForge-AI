import { hydrateRoot } from 'react-dom/client';
import { App } from './App.js';

hydrateRoot(document.getElementById('root')!, <App />);

// Observabilidad exclusiva de la fixture; no forma parte de la biblioteca.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
declare global {
  interface Window {
    wfComponents: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger };
  }
}
window.wfComponents = { gsap, ScrollTrigger };
