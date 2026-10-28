---
name: visual-review
description: Evaluar mejoras mediante evidencia visual real comparable, motion y rendimiento sin editar la solución.
---

# visual-review

Cargar únicamente cuando la tarea lo requiera; estas instrucciones no crean agentes adicionales.

1. Leer especificación, revisión, diff y evidencia relevante; no repetir el análisis completo del repo.
2. Exigir capturas antes/después de las mismas rutas/estados/viewports; para motion usar grabación/traza. Sin evidencia declarar no evaluable.
3. Seguir qa/README.md. Separar juicio artístico de resultados automatizados y presupuestos medidos.
4. Devolver hasta cinco incidencias prioritarias con ubicación, evidencia, esperado y cierre. No editar código ni aceptar nuevos baselines.
5. Recomprobar solo cambios afectados y regresión justificada; el Director decide aceptación. No convertir una fixture del framework en una web aprobada.
