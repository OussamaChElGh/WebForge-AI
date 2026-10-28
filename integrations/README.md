# Integración selectiva, sin regenerar la web

WebForge complementa el código exportado de Google AI Studio u otra herramienta. Recibe un checkout existente: no requiere API de Google, no reconstruye la web ni incorpora MCPs/servicios externos de forma implícita.

## Estado de las referencias externas

| Fuente            | Integración preparada                                 | Qué no se ha hecho                                                             |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| UI UX Pro Max     | Procedimiento de consulta como skill externa opcional | No duplicar CSV/catálogos, instalar CLI global ni asumir descubrimiento nativo |
| React Bits        | Skill y checklist de selección por componente         | No redistribuir catálogo/bundle ni ejecutar instaladores sin revisar           |
| Motion Primitives | Evaluación de arquitectura y coste de componentes     | No copiar código: texto de licencia pendiente de verificar                     |
| TweenLabs         | Evaluación de CLI y patrones GSAP en rama master      | No ejecutar CLI, instalar todos sus componentes ni copiar backend/Lenis        |

[Fuentes, commits y licencias](../docs/references.md). Las implementaciones propias de la biblioteca no son ports de esos catálogos. GSAP y Motion son motores seleccionados por funcionalidad concreta, no una autorización para añadir todos los efectos a una página.

## UI UX Pro Max como skill externa

1. Comprobar si ya está instalada y disponible en el Codex del cliente. Si existe, registrar versión/ruta y leer su SKILL.md antes de invocarla; no crear otra copia de sus datos en WebForge.
2. Si falta, evaluar una versión concreta del CLI y sus scripts antes de proponer instalación. La revisión documental observó `ui-ux-pro-max-cli` 2.5.0 y opciones locales `init --ai codex` y `--dry-run`; no se ha ejecutado ni validado esa instalación aquí. No usar `latest`, `--global` ni el modo de todos los asistentes como paso automático.
3. Previsualizar los cambios, revisar colisiones con .codex/.agents e integrar solo tras definir los paths. Confirmar después que esa instalación de Codex descubre la skill; un archivo presente no demuestra ejecución.
4. Consultar un dominio/pregunta concreto de tipografía, color o layout. Guardar conclusión útil, versión y fuente en el contexto del cliente; no pegar el catálogo entero ni convertir sus sugerencias en aprobación de diseño.

## Adopción de un componente externo

Director define intención y obtiene una especificación aprobada de revisión y scope. Engineer revisa versiones reales, router, estilos y motores existentes. Seleccionar archivo/commit exacto, inspeccionar código, utilidades, assets, licencia e imports, y comparar con una solución ya disponible.

Copiar únicamente archivos autorizados cuando la licencia lo permita, conservando avisos. Examinar antes cualquier CLI: los registros pueden escribir archivos, resolver dependencias y sobrescribir. El CLI TweenLabs inspeccionado ofrece esos comportamientos; no se usa para instalar su sitio ni un bundle completo. La ausencia de dependencias del propio CLI no acredita el coste del componente descargado.

Integrar en una isla cliente pequeña, preservando rutas, contenido y datos. No imponer Tailwind 4, React nuevo, Lenis o Motion si el efecto se resuelve mejor con lo existente. No animar la misma propiedad con varios motores. Verificar reduced motion, teclado, cleanup, responsive, build y presupuesto real del cliente.

Visual Critic requiere capturas/clips comparables antes/después para evaluar composición y ritmo. Si la instalación no dispone de acceso a esas imágenes, registrar la auditoría visual por IA como no ejecutada. Los tests deterministas o una comparación de píxeles no sustituyen esa revisión.

## Integraciones futuras

Cualquier servicio/MCP, 3D o generación de assets exige necesidad concreta, capacidad disponible, acceso y licencia. No declarar credenciales ni configurar servicios hipotéticos. Three/Fiber requieren presupuesto, carga diferida, cleanup de recursos y fallback 2D. Consultar la memoria de referencias antes de repetir investigación; actualizarla al cambiar versión o necesidad.
