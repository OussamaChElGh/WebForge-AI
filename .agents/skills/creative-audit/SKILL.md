---
name: creative-audit
description: Auditar un frontend existente y persistir contexto compacto antes de proponer mejoras.
---

# creative-audit

Cargar únicamente cuando la tarea lo requiera; estas instrucciones no crean agentes adicionales.

1. Leer contexto existente y revisión base; usar diff para evitar nueva auditoría completa.
2. Si falta contexto, inspeccionar manifiesto/lockfile, rutas objetivo, estilos, assets, motion y comandos; verificar herramientas disponibles.
3. Registrar hechos con rutas en templates/client-context.md y obtener baseline real de las rutas acordadas sin editar diseño.
4. Identificar una oportunidad creativa concreta y elementos protegidos. No regenerar el proyecto, proponer APIs ni corregir backend.
5. Entregar contexto compacto, límites y siguiente decisión. No leer archive/ ni repetir árbol completo en la respuesta.
