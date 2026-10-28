# Contratos de delegación

El Orchestrator mantiene el alcance, asigna propietarios y acepta entregas. Delega cuando una tarea tiene límites claros o requiere revisión independiente; no es necesario activar todos los roles ni trabajar siempre en paralelo. Una asignación no concede permisos adicionales sobre archivos, servicios o secretos.

## Contrato obligatorio

Copiar y completar este bloque en cada asignación. Una entrada pendiente que impida comprobar la aceptación es un bloqueo, no permiso para inventarla.

```yaml
id: WF-001
role: architect
objective: Resultado concreto y limitado
inputs:
  - docs/project-brief.md aprobado
  - docs/architecture.md
allowed_files:
  - docs/architecture.md
forbidden_actions:
  - editar otros archivos
  - instalar dependencias sin justificación y autorización de la tarea
  - desplegar o modificar producción
deliverables:
  - decisión documentada y alternativas relevantes
acceptance:
  - cada decisión corresponde a un requisito del brief
  - riesgos y cuestiones abiertas identificados
validation:
  - revisión documental con referencias a requisitos
handoff:
  - archivos cambiados
  - comprobaciones ejecutadas y resultado
  - comprobaciones pendientes y motivo
  - bloqueos y decisiones necesarias
status: assigned
```

Los identificadores y campos son un contrato de trabajo escrito, no un servicio de planificación ni un mecanismo de bloqueo automático. Los nombres de rol se deben corresponder con los definidos en `.codex/config.toml`.

## Propiedad de archivos y concurrencia

1. Antes de lanzar un agente, el Orchestrator registra su ID, rol y lista concreta de archivos permitidos en la asignación y en `docs/progress.md`.
2. Cada archivo tiene un único escritor activo. Una carpeta completa asignada a un agente reserva todos sus archivos para ese agente durante la tarea. No se permiten asignaciones de escritura solapadas.
3. Las tareas que cambian un archivo compartido se ejecutan en secuencia. El Orchestrator reúne las propuestas y realiza la integración después de que termine el escritor anterior.
4. Si aparecen archivos nuevos necesarios fuera del contrato, el agente comunica el cambio y espera una reasignación para modificarlos. Puede continuar el trabajo independiente permitido.
5. Estados: `assigned` → `in_progress` → `review` → `accepted`; también `blocked` o `changes_requested`. La propiedad se libera al cerrar o reasignar explícitamente la tarea, no al interpretar un silencio como aprobación.
6. Un agente que detecta cambios inesperados detiene la edición del archivo afectado y avisa; no restaura ni sobrescribe el trabajo de otro.

## Relevo entre roles

| Rol                | Entradas mínimas                                        | Entrega esperada                                              |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------------- |
| Orchestrator       | Encargo y restricciones                                 | Alcance, asignaciones, integración y aceptación con evidencia |
| Software Architect | Brief y decisiones vigentes                             | Arquitectura, contratos y riesgos justificables               |
| Art Director       | Brief, marca y referencias autorizadas                  | Tokens, composición, estados y criterios visuales             |
| Frontend Engineer  | Alcance, arquitectura y diseño acordados                | Implementación y comprobaciones pertinentes                   |
| Visual QA          | Capturas reales, rutas, viewports y diseño acordado     | Incidencias reproducibles y criterios de corrección           |
| Technical QA       | Requisitos, revisión disponible y comandos del proyecto | Resultados técnicos, accesibilidad y fallos reproducibles     |

Las claves registradas en `.codex/config.toml` son `orchestrator`, `architect`, `art_director`, `frontend`, `visual_qa` y `technical_qa`. `orchestrator` puede actuar como hilo principal. Los nombres de presentación de la tabla no sustituyen estas claves. La configuración limita a tres hilos de subagentes concurrentes por sesión; no es una obligación de activarlos. Los roles de QA usan configuración de solo lectura y revisan sin modificar la solución.

QA revisa una entrega terminada sin editar la solución durante esa revisión. Cada incidencia incluye severidad, ruta o archivo, pasos, evidencia, resultado observado, esperado y criterio de cierre. Las correcciones vuelven al propietario de implementación; QA repite solo las comprobaciones afectadas y las de regresión justificadas. El Orchestrator acepta cuando la evidencia satisface el contrato y registra cualquier limitación.

## Evidencia y bloqueos

Registrar comando o procedimiento, directorio, resultado y alcance. Distinguir `passed`, `failed`, `skipped` y `not_run`; un puerto abierto, una prueba sin casos o un comando que nunca se ejecutó no validan el producto. La auditoría visual requiere capturas reales y la accesibilidad requiere comprobaciones pertinentes, incluidas las manuales cuando corresponda.

Si falta información, acceso o una capacidad del entorno, indicar la operación exacta bloqueada y continuar tareas independientes. Nunca incluir valores secretos en asignaciones, decisiones, capturas o logs. Aprobar una propuesta documental no prueba una integración ni autoriza un despliegue.
