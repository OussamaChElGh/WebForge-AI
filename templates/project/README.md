# Plantilla documental de proyecto

No contiene páginas, scaffolding Next, backend ni scripts de despliegue. Usar sobre el checkout existente del cliente o después de que Google AI Studio entregue una primera web funcional.

Crear una carpeta de trabajo documental, por ejemplo docs/webforge/, preservando lo existente:

```text
docs/webforge/
  context.md            Copia completada de templates/client-context.md
  enhancement-spec.json Copia de templates/enhancement-spec.json, inicialmente draft
  evidence.md           Copia de templates/visual-evidence.md
  decisions.md          Decisiones nuevas y estado de aprobación
```

No sobrescribir archivos existentes; revisar diferencias. Incorporar por separado las reglas/roles/skills pertinentes, fusionándolos con las instrucciones del cliente. No copiar .git, archive, node_modules ni el package.json maestro.

Director completa contexto, baseline, intención y archivos protegidos una sola vez por revisión. Engineer actúa solo con aprobación de especificación. Critic recibe evidencias comparables. Ver docs/new-project.md del framework para consumo de componentes, motores requeridos y control de calidad.

No hay aprobación ni licencia de assets predefinidas. La plantilla vacía no autoriza rediseñar una web ni instalar bibliotecas.
