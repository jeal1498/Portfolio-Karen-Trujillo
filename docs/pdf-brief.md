# Brief para generación de PDFs — Lead Magnets Karen Trujillo

> **Instrucción para Claude:** Genera los PDFs descritos abajo como HTML semántico listo para imprimir (o convertir a PDF con `@media print`). Usa solo HTML + CSS inline/embebido — sin dependencias externas. El output debe ser un archivo `.html` por PDF que al imprimirse desde el navegador (Ctrl+P → Guardar como PDF) produzca exactamente una página A4 imprimible y bien formada.

---

## Identidad visual a respetar

| Token | Valor |
|-------|-------|
| Color primario (Plum Ink) | `#382f51` |
| Color acento lavender | `#c6bce2` |
| Color acento blush | `#fbdbe0` |
| Fuente display | Playfair Display (Google Fonts) |
| Fuente body/UI | Montserrat (Google Fonts) |
| Nombre | Karen Trujillo |
| Título | Neuropsicóloga en Cancún |
| Cédula federal | 11009616 |
| Instagram | @psicologakarentrujillo |
| WhatsApp | +52 998 321 1547 |
| Sitio web | psicologakarentrujillo.com.mx |

**Tono:** Cálido, claro, profesional. No clínico-frío, no wellness-vago. Como una especialista que habla directamente a un padre preocupado y le da herramientas concretas.

---

## PDF 1 — Checklist TDAH Niños

**Nombre de archivo:** `checklist-tdah-ninos.html`
**Audiencia:** Padre/madre con hijo de 5–17 años que sospecha TDAH
**Propósito:** Darle una tarea concreta (marcar lo que observa en casa) y prepararlo para hablar con el médico o la escuela con datos específicos, no con vagos "se porta mal"

### Estructura exacta del PDF (una página A4)

**Encabezado:**
- Logo/nombre: "Karen Trujillo · Neuropsicóloga" (tipografía Playfair Display, color `#382f51`)
- Subtítulo del PDF: *"Checklist: Lo que observo en mi hijo"*
- Bajada: *"Marca lo que reconoces. Lleva este checklist a la siguiente consulta con el médico o la escuela."*

**Sección 1 — Atención (6 ítems con checkbox)**
- Le cuesta terminar tareas aunque quiera hacerlo
- Se distrae con facilidad ante cualquier estímulo externo
- Olvida materiales, instrucciones o compromisos escolares
- Parece no escuchar cuando se le habla directamente
- Evita actividades que requieren esfuerzo mental sostenido
- Comete errores por descuido en tareas o exámenes

**Sección 2 — Actividad e impulsividad (5 ítems con checkbox)**
- Se mueve constantemente o le cuesta quedarse sentado
- Habla en exceso o interrumpe conversaciones
- Actúa antes de pensar (sin medir consecuencias)
- Tiene explosiones emocionales intensas ante frustraciones pequeñas
- Le cuesta esperar su turno en juegos o conversaciones

**Sección 3 — Contextos donde ocurre (3 checkboxes)**
- En casa
- En la escuela
- En ambos contextos (importante mencionarlo al médico)

**Bloque de notas libres (pequeño):**
*"Escribe aquí ejemplos concretos que quieras mencionar:"*
[3 líneas en blanco para escribir a mano]

**Pie de página:**
> *"Si marcaste 5 o más señales en más de un contexto, una evaluación neuropsicológica formal puede darte claridad. No es un diagnóstico — es información."*
>
> Karen Trujillo · Cédula 11009616 · +52 998 321 1547 · psicologakarentrujillo.com.mx · @psicologakarentrujillo

---

## PDF 2 — Checklist TDAH Adultos

**Nombre de archivo:** `checklist-tdah-adultos.html`
**Audiencia:** Adulto de 25–45 años que sospecha que tiene TDAH no diagnosticado
**Propósito:** Ayudarlo a reconocer patrones que siempre atribuyó a "ser despistado" o "flojo", y darle un argumento concreto para buscar evaluación

### Estructura exacta del PDF (una página A4)

**Encabezado:**
- Logo/nombre: "Karen Trujillo · Neuropsicóloga"
- Subtítulo: *"Checklist: Patrones que reconozco en mí"*
- Bajada: *"El TDAH en adultos se ve diferente que en niños. Marca lo que te describe. No es diagnóstico — es el primer paso para tener claridad."*

**Sección 1 — Trabajo y productividad (5 ítems con checkbox)**
- Procrastino tareas importantes hasta el último momento, aunque quiera hacerlas antes
- Empiezo proyectos con energía y los abandono a medias
- Me cuesta mantener el orden en mi espacio de trabajo o casa
- Las reuniones largas o lecturas extensas me agotan más que a otros
- Olvido compromisos, fechas límite o citas importantes

**Sección 2 — Vida cotidiana (5 ítems con checkbox)**
- Pierdo objetos (llaves, celular, documentos) constantemente
- Me distraigo en medio de conversaciones o al leer
- Cuando me engancho en algo que me interesa, pierdo la noción del tiempo
- Tengo dificultad para dormir porque mi mente no para
- Cambio de tema abruptamente en conversaciones o pensamientos

**Sección 3 — Impacto (3 checkboxes)**
- Afecta mi rendimiento laboral
- Afecta mis relaciones personales
- Ha generado baja autoestima o sensación de "no estar a mi altura"

**Bloque de reflexión:**
*"¿Desde cuándo lo notas? ¿Lo describías como parte de tu personalidad?"*
[2 líneas en blanco]

**Pie de página:**
> *"El TDAH adulto es frecuentemente subdiagnosticado. Si reconoces estos patrones desde la infancia y en más de un área de tu vida, una evaluación formal puede cambiarlo todo."*
>
> Karen Trujillo · Cédula 11009616 · +52 998 321 1547 · psicologakarentrujillo.com.mx · @psicologakarentrujillo

---

## Notas de diseño para ambos PDFs

- Fondo blanco puro para impresión
- Checkboxes como cuadros (`□`) en tipografía o SVG simple — deben verse bien en blanco/negro
- Márgenes generosos (≥ 1.5cm todos los lados)
- Encabezado con una línea de color `#382f51` o banda lavender sutil — no imagen, solo color
- Tipografía body: Montserrat 10–11pt, line-height 1.6
- Tipografía títulos de sección: Montserrat Bold 9pt uppercase tracking-wide, color `#382f51`
- El pie de página debe caber sin corte — ajustar tamaños si es necesario
- Sin imágenes externas (la foto de Karen NO va en el PDF — solo texto, color y logo textual)

---

## Cómo convertir a PDF

Una vez generado el `.html`:
1. Abrir en Chrome
2. Ctrl+P → seleccionar "Guardar como PDF"
3. Tamaño: A4, márgenes: Ninguno o Mínimo
4. Guardar como `checklist-tdah-ninos.pdf` y `checklist-tdah-adultos.pdf`
5. Colocar ambos en `/public/downloads/` del repositorio

---

## Integración en el sitio

Los PDFs se entregan por email automático vía Resend (ver `docs/resend-setup.md`).
El formulario de captura vive en el componente `src/components/LeadMagnetForm.tsx`.
