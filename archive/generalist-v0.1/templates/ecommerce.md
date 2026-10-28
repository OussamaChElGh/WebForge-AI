# Especificación inicial: e-commerce

Estado: plantilla de requisitos; no crea tienda, catálogo ni checkout. La venta transaccional requiere resolver operación e integración antes de implementar.

## Objetivo y entradas

Definir vendedor, audiencia, mercados, idiomas, moneda y objetivo. Solicitar catálogo real, variantes, imágenes autorizadas, reglas de precio e impuestos, stock, envíos, devoluciones, contacto y responsables de operación. Identificar plataforma comercial o proveedor existente y verificar sus capacidades en el entorno permitido.

Distinguir catálogo informativo de compra real. Un catálogo sin pago no satisface por sí mismo un requisito de e-commerce transaccional.

## Alcance candidato

- Catálogo y detalle de producto con variantes y disponibilidad según fuentes acordadas.
- Navegación por categorías; búsqueda y filtros solo si el catálogo los justifica.
- Carrito y checkout únicamente tras elegir y validar la integración.
- Información de envío, devolución, contacto y textos legales revisados por el negocio.

Acordar exclusiones. Cuentas de usuario, favoritos, reseñas, descuentos, recomendaciones, suscripciones y multimoneda no se incluyen por defecto. Preferir pagos alojados por un proveedor adecuado; no almacenar datos de tarjeta ni inventar un backend comercial.

## Contratos candidatos

`Product`: identificador estable, título, descripción, medios, variantes y referencia a la fuente comercial. `Money`: importe y moneda con representación y redondeo definidos. `Availability`: estado y vigencia de la fuente. `CartLine`: variante y cantidad validables. La fuente autoritativa de precio, stock, impuestos y pedidos debe quedar definida en la arquitectura; el cliente no es autoridad sobre el total cobrable.

Si hay checkout, documentar límites de confianza, validación en servidor, estados de cancelación y error, confirmación autorizada y tratamiento idempotente de eventos cuando se usen webhooks. Elegir solo los mecanismos que requiera el proveedor.

## Criterios de aceptación a concretar

- Productos, variantes, precios y condiciones coinciden con la fuente aprobada.
- El recorrido acordado cubre cantidades inválidas, falta de stock, cambios de precio y productos inexistentes.
- Si existe compra real, se prueba en sandbox del proveedor el pago aceptado, rechazado y cancelado; la confirmación no depende solo de una URL controlable por el visitante.
- No aparecen claves ni datos sensibles en el cliente, logs o repositorio.
- Catálogo, controles y estados son utilizables con teclado y en móvil, tablet y escritorio.
- Build, tipos, lint y pruebas pertinentes se ejecutan; QA visual usa capturas reales. Las pruebas de sandbox no demuestran operación en producción.

## Riesgos y decisiones pendientes

Operación comercial incompleta, impuestos o envíos no definidos, stock inconsistente, acceso a sandbox ausente, confianza indebida en importes del navegador y obligaciones legales sin revisar. Una integración no comprobada permanece bloqueada; no sustituirla por un checkout ficticio presentado como funcional.
