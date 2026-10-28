---
name: visual-audit
description: Auditar composición, motion y consistencia usando capturas reales y referencias verificables.
---

# visual-audit

Cargar únicamente cuando la tarea lo requiera; no activa un agente adicional.

1. Leer especificación, diff y evidencia antes/después de las mismas rutas/estados/viewports; no repetir el análisis del repo.
2. Ejecutar primero controles deterministas de qa/README.md. Una comparación visual requiere referencias aprobadas y no puede regenerarlas para ocultar fallos.
3. Si no se dispone de un modelo con acceso efectivo a las capturas, declarar auditoría visual por IA no realizada. Capturas producidas no equivalen a capturas vistas.
4. Para ritmo/animación pedir clips/trazas, además de screenshots. Distinguir juicio artístico, resultados automáticos y rendimiento medido.
5. Emitir hasta cinco incidencias con severidad, ubicación, evidencia y cierre; no editar solución/baselines. Creative Director decide aceptación.
