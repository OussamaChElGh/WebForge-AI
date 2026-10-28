# Sistema de diseño reutilizable

## Implementado

styles/tokens.css define valores base neutrales del framework, no la identidad aprobada de un cliente. Roles: background, surface, text, muted, brand, on-brand, border, focus, error y success. Incluye fuentes de sistema, escala de texto, espaciados, radios, sombra, contenedor y movimiento. prefers-reduced-motion elimina la duración de movimiento del token; los componentes deben consumirlo para respetar esa preferencia.

styles/tailwind.css importa Tailwind 4 y los tokens; @theme inline expone utilidades semánticas como bg-brand, text-on-brand y rounded-control. Desactiva búsqueda automática con source(none). El proyecto consumidor añade @source con las rutas reales de componentes desde su CSS de entrada; no escanear otros clientes ni depender de clases construidas dinámicamente. Los espaciados wf se pueden consumir como CSS var o utilidades arbitrarias, por ejemplo p-[var(--wf-space-4)]. Los breakpoints iniciales son los predeterminados de Tailwind 4; cambiarlos exige una necesidad documentada.

## Personalización

Copiar styles/ al proyecto cliente junto con el contrato documentado. Cargar una hoja de identidad después de tokens.css para sobrescribir variables wf sin cambiar los nombres semánticos. Si se usa el adaptador Tailwind, conservar su integración y añadir la identidad después. Definir primero marca, referencias con derechos y contenido real; revisar contraste de las nuevas combinaciones. No aprobar una identidad por reutilizar los valores base.

Cada componente futuro documentará variantes, estados (hover, foco, activo, disabled, error), comportamiento responsive y semántica. Mantener foco visible, textos alternativos pertinentes y errores asociados; usar tokens y movimiento reducido. Evitar abstracciones hasta que haya patrones repetidos reales.

## Evidencia y límites

Las pruebas Node calculan ratios WCAG de pares base y compilan utilidades reales con Tailwind. Las pruebas Playwright comprueban CSS aplicado, foco por teclado, ausencia de overflow de una fixture y preferencia de movimiento en 320, 768 y 1280 px. Esto valida infraestructura de tokens, no una interfaz de cliente ni conformidad completa WCAG. La auditoría visual necesita capturas reales de la app y revisión de sus estados; no hay app ni capturas en esta iteración.
