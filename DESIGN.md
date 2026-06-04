---
name: Karen Trujillo — Neuropsicóloga en Cancún
description: Sitio clínico de consultoría neuropsicológica para diagnóstico de TDAH y autismo en Cancún
colors:
  plum-ink: "#382f51"
  plum-medium: "#5b4e7f"
  plum-deep: "#2b1f47"
  quiet-white: "#fafafa"
  surface: "#ffffff"
  surface-muted: "#f1f5f9"
  lavender-mist: "#d0d0e7"
  blush: "#fbdbe0"
  warm-sand: "#f5dfc5"
  ink-secondary: "#515e71"
  border-subtle: "#e2e8f0"
  success-teal: "#10b77f"
  whatsapp-green: "#25d366"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.12em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "80px"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, {colors.plum-ink} 0%, {colors.plum-medium} 100%)"
    textColor: "#ffffff"
    rounded: "{rounded.2xl}"
    padding: "16px 28px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.plum-deep}"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.2xl}"
    padding: "16px 28px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "14px 24px"
  service-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  credential-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: Karen Trujillo — Neuropsicóloga en Cancún

## 1. Overview

**Creative North Star: "La Consulta del Especialista"**

Este sistema visual funciona como una consulta médica bien llevada: el espacio es ordenado y preciso, el especialista habla tu idioma, y sales con respuestas concretas en lugar de incertidumbre. No hay ornamento innecesario — cada elemento del diseño existe porque ayuda a que la familia ansiosa tome una decisión bien fundamentada. La credibilidad no se declara; se demuestra con instrumentos específicos, credenciales reales y testimonios con nombres propios.

La paleta gira en torno a un morado ciruela oscuro (plum-ink) que transmite autoridad clínica sin caer en el azul institucional frío. Las superficies son blancas y gris-azuladas muy suaves — limpias, no estériles. Los acentos lavanda y blush diferencian las tres categorías de servicio (TDAH infantil, TDAH adultos, autismo) sin convertirse en decoración. La tipografía combina Playfair Display para headings — cálida y seria, con personalidad — con Montserrat para el cuerpo, legible y neutral.

Este sistema rechaza explícitamente: las clínicas genéricas con fotos de stock en bata blanca, las landing pages de startup SaaS con métricas hero y gradientes de texto, los sitios hospitalarios fríos con azul corporativo sin cara, y las páginas de wellness con fondos crema y tono aspiracional vago. La calidez aquí no viene de pasteles ni de frases motivacionales — viene de la precisión que tranquiliza.

**Key Characteristics:**
- Autoridad clínica sin distancia institucional
- Legibilidad primero: jerarquía de información clara, sin sobrecarga visual
- Plum ink como ancla; blanco y gris-azul como respiro
- Serif para headings (personalidad), sans para cuerpo (claridad)
- Sombras suaves solo en hover; planas en reposo
- Animaciones de entrada discretas, con soporte completo de prefers-reduced-motion

## 2. Colors

La paleta está construida sobre un único ancla cromática, el ciruela oscuro, con superficies neutras y acentos muy desaturados para las categorías de servicio.

### Primary
- **Plum Ink** (`#382f51`): Color de marca principal. Headings, texto de cuerpo en sobre-fondo oscuro, fondo de la sección bio, CTAs principales. Es el color que transmite autoridad clínica.
- **Plum Medium** (`#5b4e7f`): Extremo claro del gradiente primario. Usado exclusivamente en el gradiente del botón principal y el fondo de la sección "Sobre Karen". No se usa como color sólido de fondo en superficies grandes.
- **Plum Deep** (`#2b1f47`): Variante de mayor contraste, reservada para el estado hover del botón primario y elementos que requieren máximo peso visual.

### Secondary
- **Lavender Mist** (`#d0d0e7`): Tinta de acento para la categoría TDAH infantil. Muy desaturada — funciona como tono de fondo, nunca como color de texto sobre blanco.
- **Blush** (`#fbdbe0`): Tinta de acento para la categoría Autismo (TEA). Mismo nivel de desaturación que Lavender Mist.
- **Warm Sand** (`#f5dfc5`): Tinta de acento para la categoría TDAH Adultos en variantes secundarias. Más cálido que los otros dos acentos.

### Neutral
- **Quiet White** (`#fafafa`): Fondo base de todo el sitio. No es blanco puro — tiene una calidez imperceptible que evita la frialdad clínica.
- **Surface** (`#ffffff`): Fondo de tarjetas sobre quiet-white. El contraste entre las dos crea la capa de profundidad primaria.
- **Surface Muted** (`#f1f5f9`): Fondo de secciones alternas (secundario). Levemente azulado, casi neutro.
- **Ink Secondary** (`#515e71`): Color del texto de cuerpo descriptivo y metadatos. Contrasta a ≥4.5:1 sobre surface y quiet-white — verificado.
- **Border Subtle** (`#e2e8f0`): Separadores, bordes de tarjetas en reposo. Nunca se usa como tono de texto.

### Named Rules

**La Regla del Ancla Única.** Plum Ink es el único color saturado del sistema. Los tres acentos (lavender, blush, sand) existen como tintes de fondo y nunca compiten con el ancla en intensidad. Si un nuevo color parece necesario, primero prueba si un tinte más oscuro de plum-ink resuelve el problema.

**La Regla del Contraste No Negociable.** Ink Secondary (`#515e71`) sobre Surface (`#ffffff`) cumple 4.5:1. Plum Ink (`#382f51`) sobre cualquier superficie cumple 7:1. Antes de usar cualquier color de texto sobre fondo de color, verifica el ratio — nunca se asume.

## 3. Typography

**Display Font:** Playfair Display (con Georgia, serif como fallback)
**Body Font:** Montserrat (con sans-serif como fallback)

**Character:** Playfair Display trae autoridad editorial y calidez humana — el tipo de fuente que uno asocia con publicaciones médicas serias, no con apps. Montserrat es moderna, geométrica y completamente legible, incluso en tamaños pequeños y pesos ligeros. Juntas comunican "especialista que también es persona".

### Hierarchy

- **Display** (Playfair 700, `clamp(2rem, 5vw, 3.75rem)`, lh 1.05, ls -0.01em): Hero h1 únicamente. Máximo 6rem absoluto — por encima de eso el sitio grita.
- **Headline** (Playfair 700, `clamp(1.875rem, 4vw, 2.25rem)`, lh 1.2, ls -0.01em): Titulares de sección (h2). Siempre con `text-wrap: balance`.
- **Title** (Montserrat 700, `1.25rem`, lh 1.5): Títulos de tarjeta y subtítulos de componente (h3). Sans deliberado — crea contraste con los h2 serif.
- **Body** (Montserrat 400, `1rem` sobre base 17px = ~17px efectivos, lh 1.7): Todo el texto descriptivo. Máximo 75ch de ancho. `text-wrap: pretty` para párrafos largos.
- **Label** (Montserrat 700, `0.625rem`, lh 1.5, ls 0.12em, uppercase): Eyebrows de sección, badges de categoría, etiquetas de CTA. Uso muy restringido — máximo una instancia por sección.

### Named Rules

**La Regla del Serif para lo Importante.** Playfair Display se reserva para h1 y h2 de sección. Nunca para body copy, labels, ni botones. Su rareza en el sistema es lo que le da peso.

**La Regla del Weight Contrast.** El único size step válido entre niveles adyacentes de jerarquía es ≥1.25x. Si dos niveles de heading se ven similares, uno de ellos sobra.

## 4. Elevation

El sistema usa una estrategia híbrida: capes tonales para la jerarquía en reposo, sombras suaves como respuesta al hover. En estado normal, las tarjetas son planas sobre un fondo distinto — la diferencia de background crea la profundidad necesaria sin sombra. La sombra aparece cuando el elemento invita a interacción.

### Shadow Vocabulary

- **Hover lift** (`0 20px 60px -15px rgba(56, 47, 81, 0.12)`): Sombra de tarjeta en hover. Larga y difusa — sensación de que la tarjeta flota ligeramente. Plum-tinted, no gris genérico.
- **Soft ambient** (`0 10px 40px -10px rgba(56, 47, 81, 0.08)`): Sombra base en elementos fijos elevados (navbar sticky, sticky CTA mobile). Más sutil que hover lift.
- **Glow accent** (`0 0 20px rgba(208, 208, 231, 0.3)`): Solo para el icono de WhatsApp flotante y pulse animation. No se usa en tarjetas.

### Named Rules

**La Regla Plana en Reposo.** Las tarjetas no tienen sombra en su estado por defecto. La profundidad en reposo se logra exclusivamente con el contraste de background (surface sobre surface-muted, o surface-muted sobre quiet-white). La sombra es un estado, no un estilo base.

**La Regla del Tinte de Marca.** Todas las sombras tienen un tinte hacia plum-ink, nunca gris neutro ni negro. `rgba(56, 47, 81, 0.X)` es el único color de sombra del sistema.

## 5. Components

### Buttons

Dos variantes principales + uno contextual para WhatsApp. Los botones son elementos de acción directa — su texto es siempre verbo + objeto ("Ver servicios", "Agendar evaluación"), nunca solo "Ver más" o "OK".

- **Shape:** Gently rounded (16px — `rounded-2xl`). Pills (`rounded-full`) solo para badges y chips, nunca para botones de acción.
- **Primary:** Gradiente plum-deep → plum-medium, texto blanco, label typography (9-10px uppercase 0.12em tracking). Padding 16px 28px. Sombra `shadow-xl shadow-primary/25` en reposo, que aumenta en hover. Translate-y -4px en hover.
- **Hover / Focus:** Sombra más intensa, translate-y -4px. Focus-visible: outline 2px plum-ink offset 2px.
- **Secondary / Ghost:** Borde 2px border-subtle (plum-ink/25), texto plum-ink, fondo transparente. En hover: borde plum-ink/60, fondo plum-ink/5.
- **WhatsApp:** Background whatsapp-green sólido, texto blanco, radius 12px (`rounded-xl`). No gradiente, no sombra — el verde ya comunica.

### Chips / Badges

Etiquetas pequeñas de metadatos: categoría de servicio, nombre de instrumento de evaluación, credencial.

- **Style:** Background surface-muted o secondary/50, borde 1px border-subtle, texto ink-secondary a 10px, radius pill.
- **Credential badges:** Ghost (sin background), borde border-subtle, ícono + texto, radius pill. En la sección hero usan ring-1 ring-primary/10 para dar presencia sin peso.

### Cards / Containers

- **Corner Style:** Gently rounded — máximo 16px (`rounded-2xl`). No superar 16px en cards de contenido. Pill solo para badges.
- **Background:** Surface (`#ffffff`) sobre Surface Muted (`#f1f5f9`) para crear la capa de profundidad principal.
- **Shadow Strategy:** Ninguna en reposo. En hover: `0 20px 60px -15px rgba(56,47,81,0.12)` + translate-y -4px.
- **Border:** 1px o 2px border-subtle en reposo. En hover: borde cambia a color de acento de la categoría (lavender, blush, o sand al 50%).
- **Internal Padding:** 24px estándar. Secciones internas de la tarjeta separadas por border-t border-subtle.

### Inputs / Fields

Estilo stroke: borde 1px border-subtle, fondo surface, radius 6px (`rounded-md`). En focus: ring 2px plum-ink/30, borde plum-ink. En error: borde destructive (#ef4444). Placeholder: ink-secondary al 60%.

### Navigation

- **Style:** Fondo surface/95 con backdrop-blur-lg. Links: Montserrat 500, texto ink-secondary. En hover: texto plum-ink.
- **Active:** Indicador sutil — texto plum-ink bold.
- **Mobile:** Sheet/drawer lateral, fondo surface, links a full width.
- **Sticky behavior:** Navbar se vuelve opaca al hacer scroll, con soft ambient shadow.

### Floating Action Buttons

WhatsApp y Teléfono flotantes en mobile/desktop.

- **WhatsApp:** Background whatsapp-green, radio pill, ícono blanco. Pulse animation verde — la única animación de loop activo del sistema.
- **Teléfono:** Background plum-ink, radio pill, ícono blanco.

## 6. Do's and Don'ts

### Do:
- **Do** usar Plum Ink (`#382f51`) como el único color de acento saturado. Los tres colores de categoría (lavender, blush, sand) son tintes de fondo — nunca en texto sobre blanco.
- **Do** mantener el radius de tarjetas en 16px máximo (`rounded-2xl`). Un card con 24px+ de radio comunica app de consumo, no consultorio clínico.
- **Do** escribir labels y CTAs con verbo + objeto específico: "Ver servicios", "Agendar evaluación TDAH", "Llamar al consultorio". Nunca "Ver más" o "Click aquí".
- **Do** usar Playfair Display exclusivamente para h1 y h2. Su autoridad viene de su rareza en el sistema.
- **Do** agregar `@media (prefers-reduced-motion: reduce)` a cada animación. Las familias con hijos neurodivergentes pueden tener configurado este setting.
- **Do** verificar contraste antes de cada color de texto nuevo. Ink Secondary (`#515e71`) es el mínimo permitido sobre blanco — nunca más claro que eso.
- **Do** usar sombras con tinte plum: `rgba(56, 47, 81, 0.X)`. El gris genérico de box-shadow hace que las tarjetas parezcan templates de Figma.
- **Do** mostrar los instrumentos reales (ADOS-2, WISC-V, CAARS-2) como parte del diseño de las tarjetas. La especificidad es la credibilidad.

### Don't:
- **Don't** usar clínicas genéricas con fotos de stock en bata blanca como referencia. Este sitio tiene cara y nombre — esa es su ventaja competitiva.
- **Don't** usar el patrón hero de landing pages SaaS: métricas grandes con label pequeño, gradientes decorativos, copy de "transforma tu vida". La confianza clínica no se vende con superlativo.
- **Don't** reproducir la estética de wellness y coaching: fondos crema, tipografía delgada, tono aspiracional vago. El carácter cálido del sitio viene de respuestas precisas, no de paleta pastel.
- **Don't** aplicar `background-clip: text` con gradiente (gradient text). Si un heading necesita énfasis, se logra con Playfair en plum-ink — nunca con efecto de degradado tipográfico.
- **Don't** usar `border-left` mayor de 1px como acento decorativo en tarjetas o callouts. Los blockquotes del blog son la única excepción legítima.
- **Don't** emparejar `border: 1px solid X` con `box-shadow` de blur ≥16px en el mismo elemento. Elegir uno: borde de color de marca O sombra suave — nunca los dos juntos como decoración.
- **Don't** poner un eyebrow de texto pequeño uppercase en cada sección del sitio. Máximo una o dos secciones con eyebrow por página, en secciones donde el contexto realmente lo necesita.
- **Don't** usar un `border-radius` mayor de 16px en tarjetas de contenido. `rounded-3xl` (24px) en service cards actualmente — debe reducirse a `rounded-2xl` (16px).
- **Don't** aplicar la misma animación de entrada (fade-in-up) a cada sección como reflejo automático. Si una sección necesita énfasis, busca el tipo de reveal que se ajusta a su contenido específico.
- **Don't** gatear la visibilidad del contenido en una transición de clase. Todos los elementos deben ser visibles por defecto; las animaciones son mejora progresiva, no condición de render.
