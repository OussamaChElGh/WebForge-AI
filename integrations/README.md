# Integraciones externas: adopción selectiva

No hay conectores activos, MCPs preconfigurados ni una API de Google AI Studio asumida. WebForge trabaja sobre el checkout existente exportado por Google AI Studio u otra herramienta; preserva sus rutas, contenido, comportamiento y gestor de dependencias. No vuelve a generar la web.

## Selección por necesidad

| Necesidad aprobada                       | Primera opción                               | Escalado opcional                                                                |
| ---------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| Hover, foco y transiciones breves        | CSS y componentes existentes                 | No añadir un motor solo para este caso                                           |
| Secuencias, capas y narrativa por scroll | Presets locales y GSAP si hace falta         | ScrollTrigger con cleanup; evitar dos motores sobre la misma propiedad           |
| Microinteracciones React existentes      | Reutilizar su Motion si ya está instalado    | Componente de Motion Primitives después de revisar licencia y coste              |
| Efecto visual específico                 | Composición propia y tokens del cliente      | React Bits por componente, sin redistribuir un bundle de su catálogo             |
| Investigación tipográfica o de patrones  | Brief, referencias autorizadas y skill local | UI UX Pro Max bajo demanda; guardar solo la decisión útil                        |
| Experiencia 3D con función clara         | Evaluar si imagen, video o CSS bastan        | Three.js; Fiber si se necesita composición React y sus versiones son compatibles |

La [evaluación de las seis referencias](../docs/references.md) registra fuentes, licencias y límites. Consultar ese resumen antes de repetir investigación; actualizarlo solo si cambia la versión o la necesidad.

## Contrato de adopción

1. Creative Director define la mejora y obtiene aprobación de una especificación con alcance y referencias; no autoriza cambios a partir de una recomendación externa por sí sola.
2. Creative Engineer revisa lo que ya existe: versiones de Next/React, App o Pages Router, librerías de animación, estilos, límites cliente/servidor y scripts. Propone únicamente la dependencia o archivo necesario.
3. Registrar origen y versión/commit del componente, licencia del código y de sus assets, coste previsto y motivo para no reutilizar lo disponible. Revisar código y scripts antes de ejecutar un instalador; no usar comandos `latest` como parte de una configuración reproducible.
4. Integrar en la menor frontera cliente posible. GSAP se inicializa en lifecycle del navegador y se revierte al desmontar; no mover toda una página de servidor a cliente. Evitar importar Three.js o plugins en rutas que no los necesitan.
5. Probar en el cliente real: build existente, navegación, montaje/desmontaje, responsive, teclado, reduced motion y presupuestos acordados. Visual Critic compara capturas y clips equivalentes; ninguna biblioteca acredita por sí misma una mejora.

## Límites operativos

No se instalan todos los paquetes de la tabla ni se impone Tailwind 4 sobre un proyecto con otro sistema de estilos. No se sustituyen tokens globales ni se cambian estructura, diseño o lógica comercial sin especificación aprobada. Las opciones 3D requieren fallback estático, carga diferida, liberación de recursos y un presupuesto medido en dispositivos objetivo.

Una integración futura con un servicio o MCP requiere una necesidad concreta, capacidad disponible y autorización de acceso. No se declaran credenciales ni se configura un servidor remoto para una integración hipotética. Los resultados de pruebas, la aprobación visual y los límites de entorno se mantienen separados de esta evaluación documental.
