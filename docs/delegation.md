# Delegación creativa

Creative Director mantiene alcance, coordinación y aceptación. No activar todos los agentes por defecto. Usar solo creative_engineer para un cambio aprobado o visual_critic para una revisión independiente de evidencia terminada.

## Contrato breve

```yaml
id: WF-001
role: creative_engineer
objective: Resultado artístico concreto
base_revision: SHA auditada del cliente
inputs:
  - contexto persistido y diff relevante
  - especificación aprobada, revisión y referencia de aprobación
  - skill de motion solo si hace falta
allowed_files:
  - src/components/ExistingHero.tsx
protected_files:
  - src/app/layout.tsx
deliverables:
  - diff acotado y evidencia antes/después
acceptance:
  - criterio visual/motion comprobable y presupuesto acordado
validation:
  - comandos reales del proyecto y casos afectados
handoff:
  - resultado, evidencia, riesgos y siguiente acción
status: assigned
```

El ejemplo no autoriza editar ese archivo en ningún cliente. Pasar rutas concretas, no todo el repositorio. El Director registra asignación y propietario en el contexto/progreso. Estados: assigned → in_progress → review → accepted; blocked y changes_requested cuando corresponda. Un cambio de alcance/revisión exige nueva aprobación.

## Propiedad y relevos

Un escritor por archivo. Reservar una carpeta incluye sus archivos internos: no permitir reservas solapadas. Si hay salida compartida, secuenciar tareas y liberar propiedad antes de integrar. Un agente no edita fuera del contrato ni sobrescribe cambios inesperados; informa y continúa solo trabajo independiente. La configuración permite como máximo dos subagentes, sin obligar a usarlos ni ampliar permisos.

Creative Director aprueba especificación e integra; Creative Engineer implementa, ejecuta comandos y captura artefactos; Visual Critic es read-only, no corrige ni actualiza snapshots. Si necesita escritura para un comando, revisa los artefactos generados por el ingeniero. El Director toma la decisión final con evidencia.

## Entrega y consumo de contexto

Entregar resultado, archivos cambiados, comandos/resultados, hasta cinco riesgos/incidencias prioritarios y siguiente acción. Evitar reproducir el contexto completo o rehacer discovery de producto. Las skills son manuales de trabajo bajo demanda, no subtareas obligatorias.

Separar passed/failed/skipped/not_run y propuestas de hechos. Capturas reales comparables acreditan apariencia; grabación/traza permite revisar motion; mediciones del build y dispositivo objetivo acreditan presupuesto. Tests de fixtures no equivalen a una mejora del cliente. Sin evidencia, declarar no evaluable y pedir solo lo que desbloquee la decisión.
