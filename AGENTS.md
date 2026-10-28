# WebForge AI — Creative Frontend Enhancement Framework

## Misión y límites

Elevar dirección artística, composición, tipografía, interacciones y motion de frontends funcionales generados en Google AI Studio u otras herramientas. Mejorar repositorios existentes, especialmente Next.js, sin reconstruirlos ni duplicar generación de páginas, backend, producto o deployment. No generar una web de demostración en este repositorio.

## Lectura y eficiencia

Leer primero el contexto persistido del cliente, el estado de docs/progress.md y el diff desde la revisión auditada. Para un primer encargo consultar docs/new-project.md; leer arquitectura o diseño solo cuando afecten a la tarea. No cargar archive/ ni todas las skills en cada turno. Auditar una vez por revisión base y actualizar únicamente hechos afectados por cambios. Entregar un resumen corto con evidencia, riesgos y siguiente acción; no generar informes repetidos ni estimar ahorro de tokens sin medición.

## Roles y delegación

El hilo principal actúa como creative_director y coordina. Solo tres roles: creative_director, creative_engineer y visual_critic. Instrucciones y sandbox en .codex/. Máximo de dos subagentes concurrentes, profundidad uno; no es obligatorio activar ninguno. El director conserva alcance y aceptación, el ingeniero implementa, el crítico revisa evidencia sin editar. No añadir roles generalistas sin necesidad concreta justificada.

Usar docs/delegation.md: tarea, entradas, revisión base, archivos permitidos, entregables y aceptación. Un único escritor por archivo; no reservar simultáneamente una carpeta y archivos internos a agentes distintos. Liberar propiedad antes del relevo. El contrato no es un lock del filesystem ni amplía permisos. El crítico es read-only; el ingeniero ejecuta comandos que escriban artefactos. No modificar confianza global de Codex.

## Antes de modificar un cliente

Persistir contexto con rutas, stack/versiones, comandos reales, diseño original, elementos protegidos y baseline visual/performance. Definir y obtener aprobación explícita de especificación identificada y revisada: áreas, intención visual, motion, presupuestos y criterios. La petición de migrar este framework no aprueba rediseñar una web cliente. El validador `npm run spec:check -- ruta/spec.json` comprueba estructura y trazabilidad declarada, no inventa ni autentica una aprobación humana. Si falla, no implementar. Una edición de especificación invalida la aprobación de su revisión anterior.

No sustituir estilos/tokens globales ni regenerar scaffolding. Proponer un piloto acotado y opt-in; preservar navegación, contenido, SEO, datos e integraciones ajenos al contrato. Verificar herramientas instaladas antes de usarlas. Reutilizar patrones existentes; componentes externos requieren selección, revisión de licencia y adaptación. No instalar todas las referencias.

## Motion y calidad

CSS para efectos simples; GSAP para secuencias/scroll que lo justifiquen. 3D opcional con beneficio claro, presupuesto y alternativa estática. Mantener lectura y acciones sin JS, teclado, foco, reduced motion y comportamiento móvil. Aislar animación en límites cliente, scope local y cleanup al desmontar/cambiar de ruta; no matar todos los ScrollTriggers del documento. No scroll hijacking por defecto.

Ejecutar controles deterministas relevantes antes de pedir crítica: tipos, lint, pruebas, responsive y presupuestos del cliente. Los tests del framework validan infraestructura, no calidad artística ni accesibilidad completa. Exigir evidencia real comparable y no actualizar capturas baseline automáticamente. Separar passed, failed, skipped y not_run. No declarar fluidez, mejora visual ni rendimiento sin medir/revisar el caso real.

Preservar cambios ajenos y usar ramas. En la nube trabajar en el checkout existente sin worktree salvo petición expresa. No imprimir/guardar secretos ni datos personales innecesarios. No desplegar, fusionar ni modificar producción sin autorización expresa. Registrar decisiones relevantes en docs/decisions.md y progreso compacto con evidencias.
