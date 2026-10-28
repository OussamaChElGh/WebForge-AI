# Especificación inicial: web corporativa

Estado: plantilla de discovery; no es una aplicación ni un alcance aprobado. Completar el brief antes de implementar.

## Objetivo y entradas

Definir empresa, audiencia, mercados, idiomas, propuesta de valor y una conversión principal: contacto, presupuesto o reunión. Identificar responsable comercial, aprobador y persona que mantendrá el contenido.

Solicitar identidad y referencias autorizadas, servicios, sectores, casos verificables, testimonios con permiso, equipo y datos de contacto. Inventariar contenido faltante y su responsable. Definir cómo se recibe y atiende una consulta antes de incluir formularios.

## Alcance candidato

- Inicio con propuesta de valor y CTA principal.
- Listado y detalle de servicios solo cuando haya contenido suficiente.
- Empresa, casos o equipo según necesidad real.
- Contacto y textos legales aplicables al mercado.

Acordar sitemap y exclusiones. CMS, blog, búsqueda, multidioma, formularios con envío, CRM, analítica y agenda requieren decisión expresa sobre beneficio, proveedor y operación. No incluirlos automáticamente.

## Contratos candidatos

`SiteConfig`: identidad, navegación, idiomas y contacto público. `Service`: identificador, título, resumen, contenido y CTA. `CaseStudy`: afirmaciones verificables, permiso de publicación y medios autorizados. Los campos y sus reglas se concretan en la arquitectura del proyecto.

Separar contenido de presentación. Si hay formulario, definir datos mínimos, validación en servidor, destino, estados de envío, error y confirmación, política de conservación y medidas contra abuso justificadas.

## Criterios de aceptación a concretar

- Cada CTA conduce al destino acordado y el contenido coincide con el brief.
- Servicios, casos y datos de contacto están aprobados por su responsable.
- Navegación y recorrido principal funcionan con teclado y en móvil, tablet y escritorio.
- Estados de formulario, si se incluye, se prueban con envío válido, inválido y fallo del proveedor sin filtrar secretos.
- Semántica, metadatos por página, contraste y textos alternativos se revisan.
- Build, tipos, lint y pruebas relevantes se ejecutan; QA visual usa capturas reales.

## Riesgos y decisiones pendientes

Afirmaciones comerciales sin evidencia, contenido sin derechos, tratamiento de datos desconocido, dependencia de CRM o correo y exceso de páginas sin contenido. Establecer la métrica de conversión sin asumir una herramienta de analítica.
