---
name: responsive-refinement
description: Corregir adaptación y overflow sin rehacer composición o funcionalidades aprobadas.
---

# responsive-refinement

Cargar únicamente cuando la tarea lo requiera; no activa un agente adicional.

1. Leer alcance y capturas existentes; probar desktop/mobile y puntos críticos según el contenido, no solo presets.
2. Medir overflow real, legibilidad, targets, orden y foco. Probar texto largo, zoom, preferencias de movimiento y pointer touch/fine.
3. Reutilizar CSS/tokens/breakpoints del cliente. Reducir/desactivar parallax según especificación; no esconder acciones esenciales para resolver layout.
4. Corregir únicamente archivos asignados y volver a capturar con condiciones idénticas. No actualizar referencias automáticamente.
5. Entregar diff y pruebas; una fixture responsive del framework no valida el sitio del cliente.
