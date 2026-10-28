---
name: react-bits-integration
description: Evaluar y adaptar componentes individuales de React Bits sin redistribuir catálogos.
---

# react-bits-integration

Cargar únicamente cuando la tarea lo requiera; no activa un agente adicional.

1. Identificar el efecto exacto requerido por una especificación aprobada; preferir componentes propios/existentes.
2. Consultar docs/references.md y el archivo del componente a commit fijado. Revisar dependencias, licencia MIT+Commons Clause y derechos de assets; no copiar repos completos ni bundles al framework.
3. Verificar versión React, SSR/client boundary, semántica, reduced motion y coste antes de instalar. Inspeccionar registries/instaladores como texto y revisar diff; no ejecutar latest automáticamente.
4. Adoptar solo en el cliente y archivos permitidos cuando el uso/licencia lo permita. Si falta evidencia de permiso no copiar.
5. Probar interacción, responsive, cleanup y rendimiento; registrar origen, cambios y límites. El catálogo no garantiza calidad visual ni accesibilidad.
