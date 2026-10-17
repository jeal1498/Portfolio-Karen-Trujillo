# Identidad gráfica — Karen Trujillo

Fuente única de recursos, íconos, plantillas y reglas de video. Complementa `marca-personal.md` (posicionamiento y voz) y `DESIGN.md` (sistema visual del sitio). Vista de láminas: artifact «Identidad gráfica Karen».

Archivos: `tokens.css`, `tokens.json`, `recursos/` (`neurona.svg`, `linea-conexion.svg`, `cuatro-puntos.svg`, `iconos.svg`).

## Color: el color dice de qué servicio habla la pieza

| Servicio | Fondo | Plum Ink sobre el fondo |
|---|---|---|
| TDAH infantil | Lavender Mist `#c6bce2` | 5.9:1 |
| Autismo (TEA) | Blush `#f9dee3` | 8.4:1 |
| TDAH adultos | Warm Sand `#f5e7d6` | 8.8:1 |
| Informativo (proceso, preguntas, dónde) | Blue Gray `#e1e9ea` | 8.6:1 |

- Plum Ink `#433860` escribe siempre. Los pasteles solo rellenan portadas y tarjetas.
- Ink Secondary `#515e71` no se usa sobre lavanda.
- El verde de WhatsApp `#0f7a3c` solo va en el botón de WhatsApp.
- El pilar (Explico, Aclaro, Acompaño, Muestro) se marca con etiqueta e ícono, no con color.

## Recursos propios (salen del logo: círculo punteado y ramificación)

- **Trazo de conexión** (`recursos/neurona.svg`, `linea-conexion.svg`): una ramificación que termina en nodos, y una línea que se vuelve punteada. Máximo uno por pieza.
- **Cuatro puntos** (`recursos/cuatro-puntos.svg`): tonos del logo. Separador, viñeta y barra de progreso; en la barra, lo avanzado va en Plum Ink.
- **Etiqueta de pilar:** píldora con contorno Plum Ink, ícono y nombre en mayúsculas (Maven Pro 700, tracking 0.12em).
- **Chip de servicio:** píldora rellena con el color del servicio.
- **Ficha de instrumento:** nombre (Outfit 700), qué mide, para quién. Los textos son de ejemplo hasta que Karen los confirme.

## Íconos

`recursos/iconos.svg`: 14 símbolos, viewBox 24, trazo 1.75, puntas redondeadas, estilo Lucide. Sin emoji.

## Plantillas (formatos)

Portada de video 16:9, portada vertical 9:16 (zona segura y=300–1620), carrusel «Explico» (una prueba por lámina, 4:5), carrusel «Aclaro» (mito y realidad), tarjeta de reseña 1:1 (solo con permiso), destacadas de Instagram (Proceso, Preguntas, Precios, Reseñas, Dónde), firma de correo. Detalle visual en el artifact.

## Video

La implementación vive en `jeal1498/videos-karen-trujillo` (skill `videos-karen`).

- **Apertura de 3 segundos:** gancho en pantalla con la pregunta que se hacen los padres, más el rótulo con nombre, cargo y cédula 11009616.
- **Subtítulos:** se mantiene el estilo ya aprobado en los videos (placa ciruela translúcida, texto blanco, palabra clave en lavanda). Solo se resalta el nombre del instrumento.
- **Escenas gráficas:** en lugar de tomas grabadas, el video pasa a escenas animadas que ilustran una frase del guión. Seis tipos: ficha de instrumento, lista, mito y realidad, línea de proceso, número, esquema. Una idea por escena, máximo 12 palabras, 3 a 5 s, nunca más del 40 % del video. La voz de Karen no se corta y los subtítulos siguen visibles.
- **Transición:** una línea con nodo cruza la pantalla en 380 ms y deja la escena a su paso; al terminar, regresa igual. Sin sonido. Es la única transición permitida; los punch-ins 1.0 ↔ 1.08 siguen vigentes.
- **Movimiento:** curva `cubic-bezier(.2,.8,.2,1)`, entradas de 220 a 380 ms, escalonado de 120 ms. Sin rebotes, zoom brusco, glitch ni whoosh. Con «reducir movimiento» activado, todo entra con un fundido corto.
- **Sonido:** borrador sin aprobar. Dos notas suaves (entrada do5 → sol5, cierre sol5 → do5), volumen 0.3 a 0.5, solo al abrir y cerrar; nunca sobre palabras.
- **Cierre:** tarjeta con título, acciones, web y el aviso «Este video orienta y no diagnostica».

## Reglas

Sí: Plum Ink para el texto; color según servicio; un solo trazo por pieza; instrumentos con nombre exacto (ADOS-2, WISC-V, CAARS-2); botones con verbo y objeto («Agendar evaluación»); casos ilustrativos sin datos identificables; cada escena ilustra una frase concreta del guión.

No: fotos de stock en bata blanca ni cerebros genéricos; gradientes decorativos ni «transforma tu vida»; radios mayores a 16 px (salvo píldoras y círculos); texto pastel sobre blanco; sonido sobre palabras, zoom brusco o rebotes; diagnosticar por redes o prometer resultados; transiciones con glitch o whoosh.
