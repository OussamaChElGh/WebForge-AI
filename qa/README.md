# Visual QA y aceptación creativa

Visual Critic revisa, Creative Director acepta. No automatizar el juicio de originalidad ni sustituirlo por un diff de píxeles.

1. Congelar revisión base, ruta, datos, estado interactivo, viewport, navegador, fuentes y assets. Capturar antes/después reales; no subir datos personales.
2. Usar controles deterministas primero: build/lint/tipos/pruebas existentes del cliente; overflow, enlaces esenciales, teclado, foco, contraste y reduced motion. No ejecutar comandos ficticios si faltan scripts.
3. Comparar jerarquía, lectura editorial, composición, ritmo, coherencia de marca y relación motion/contenido con la especificación aprobada. Pedir capturas 320/768/1280 más breakpoints específicos del cliente. Revisar zoom al 200 % cuando aplique.
4. Revisar grabación y traza para scroll, capas, entrada/salida y fluidez. Verificar cleanup en navegación, ausencia de triggers duplicados, y preferencia de movimiento reducida al cargar y al cambiarla. No inferir fps de una screenshot.
5. Medir rendimiento antes/después en el mismo entorno y perfil: varias muestras y mediana para LCP/CLS, incremento JS gzip del build real, tareas largas y frames del dispositivo objetivo. Respetar presupuestos acordados en la especificación; no afirmar mejoras con mediciones ausentes.
6. Emitir máximo cinco problemas prioritarios (severidad, ubicación/estado, evidencia, esperado y criterio de cierre). No modificar código ni regenerar/aceptar snapshots. Cualquier cambio del baseline requiere revisión del Director.

Usar templates/visual-evidence.md. Los tests de tests/browser/ son fixtures de laboratorio en memoria para tokens y lifecycle GSAP, no capturas ni benchmark de una web cliente. El crítico read-only puede revisar artefactos; el ingeniero ejecuta comandos que escriben informes.

## Éxito y eficiencia

Registrar cambios observables contra criterios visuales, cleanup y budgets; componentes/presets reutilizados; rondas de crítica necesarias; tiempo y tokens solo si están medidos. No prometer reducción de iteraciones ni rendimiento por seleccionar una librería. Las comparaciones sin baseline son propuestas pendientes de validar.
