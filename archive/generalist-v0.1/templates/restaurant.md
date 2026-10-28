# Especificación inicial: restaurante

Estado: plantilla de discovery; no es una web construida. El interés previo en restaurante no aprueba todavía nombre, contenido, funciones o integraciones.

## Objetivo y entradas

Definir nombre, ubicaciones, público, idiomas y acción principal: consultar carta, llamar, reservar o pedir. Solicitar horarios, excepciones, dirección y contacto público, carta con precios, moneda y alérgenos revisados por el negocio, identidad y fotografías autorizadas. Identificar quién actualiza la información y quién aprueba la entrega.

## Alcance candidato

- Inicio con identidad del restaurante y CTA acordado.
- Carta accesible y mantenible, con agrupaciones y contenido real.
- Ubicación, horarios y contacto por local si corresponde.
- Información legal aplicable al mercado.

Acordar si la carta se publica como contenido estructurado, documento accesible o ambos. Evitar depender solo de una imagen para comunicar información esencial. Reservas, pedidos, entrega, pagos, mapas embebidos, CMS y analítica requieren decisiones propias. Un enlace externo aprobado puede ser suficiente; no implementar un sistema de reservas o pedidos por defecto.

## Contratos candidatos

`RestaurantLocation`: dirección, contacto, horarios y excepciones. `MenuSection`: nombre y orden. `MenuItem`: nombre, descripción, precio y moneda si corresponde, disponibilidad e información dietética validada por el restaurante. `MediaAsset`: origen, derechos y texto alternativo. La aplicación no debe inferir alérgenos ni prometer disponibilidad en tiempo real sin una fuente válida.

## Criterios de aceptación a concretar

- Carta, precios, horarios, ubicación y alérgenos coinciden con la información aprobada.
- El CTA principal conduce al canal acordado; teléfono y enlaces se prueban.
- La carta se consulta desde móvil y con teclado, sin pérdida de contenido ni dependencia exclusiva del color.
- Imágenes tienen derechos confirmados y alternativas pertinentes.
- Si existe reserva o pedido, se prueban confirmación, rechazo, indisponibilidad y fallo del proveedor según el contrato real.
- Build, tipos, lint y pruebas relevantes se ejecutan; QA visual compara capturas reales en varios anchos.

## Riesgos y decisiones pendientes

Datos desactualizados, alérgenos incorrectos, horarios festivos sin responsable, fotografías sin licencia, reservas no atendidas y costes o límites de proveedores. Determinar el mercado y los requisitos de privacidad antes de recoger datos personales.
