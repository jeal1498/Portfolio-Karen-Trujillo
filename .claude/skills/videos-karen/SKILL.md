---
name: videos-karen
description: Editar los videos de la psicóloga Karen Trujillo (9:16, ella hablando a cámara) con la identidad de su marca (ciruela y lavanda, Outfit y Maven Pro, nada que ver con Checa) y entregar video editado, portada con gancho y copy .md guardados en `marketing/videos/Marca Personal/NN - Nombre/` del repo. Úsala cuando Eduardo o Karen pasen un video nuevo, pidan portada, copy, o continuar con el siguiente video. No usar `videos-checa` para esto.
---

# Videos de Karen Trujillo (Neuropsicóloga Clínica)

Flujo con aprobación por etapa (ver más abajo). Probado con el video 1 (`marketing/videos/Marca Personal/01 - Organiza tus pendientes/`). Meta: **un video completo en ~40–60 min de trabajo y pocos tokens**. No leer las skills `hyperframes-*` ni `talking-head-recut` salvo que algo falle: ya están resumidas aquí y en los scripts.

## Marca (de `DESIGN.md` y `PRODUCT.md` del repo)
- Colores: ciruela `#433860` (principal), ciruela medio `#6B5F8A`, ciruela profundo `#2E2545`, lavanda `#C6BCE2`, rosa `#F9DEE3`, arena `#F5E7D6`, azul grisáceo `#E1E9EA`, éxito `#10b77f`.
- Fuentes: **Outfit** (titulares) y **Maven Pro** (texto). Ya están en `assets/fonts/`.
- Voz: clínica, confiable, cálida. Precisa sin ser fría. **Sin promesas vagas** ni «transformar vidas».
- Evitar: efectos de startup, emojis en pantalla, textos gigantes sin sentido, fotos de stock, gradientes decorativos, música fuerte.
- Público: madres y padres de hijos de 5 a 17 años con dudas de atención, conducta o comunicación, y adultos que sospechan TDAH. Ciudad: Cancún. Web: `psicologakarentrujillo.com.mx` (**confirmada por Eduardo el 16 oct 2026**). WhatsApp de ventas: ver `src/components/Footer.tsx`.
- Es información de ayuda, no diagnóstico: no afirmar que algo «cura» ni diagnosticar por video.

## ⭐ Fuente de los videos (carpeta de Drive)
Todos los videos grabados por Karen se suben a esta carpeta, que es la **fuente oficial**: https://drive.google.com/drive/folders/1VUra8EiQS0sDd22CKZCnpvy4Q5XMyYKV (ID `1VUra8EiQS0sDd22CKZCnpvy4Q5XMyYKV`).
- Al empezar, listarla con `search_files` (`parentId = '1VUra8EiQS0sDd22CKZCnpvy4Q5XMyYKV'`) y comparar con los videos ya hechos en `marketing/videos/Marca Personal/` y `marketing/plan/calendario.md` para saber cuáles faltan.
- Descargar con `curl -L "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t"` (el conector limita a 10 MB). Si falla por permisos, pedir que compartan el archivo.
- Usar siempre el original de la carpeta, no el de WhatsApp. Si un video no dice a qué tema o número corresponde, preguntar antes de asignarle `NN`.

## ⭐ Antes de editar
Al empezar una sesión de videos: **`git pull origin main`** y lee la sección «Estado y pendientes» de abajo. Revisa también `marketing/plan/calendario.md` para saber qué número toca.

## ⭐ Dos versiones
La «segunda versión» de un tema es **otro video con un guion diferente que habla del mismo tema**, y se sube en otro momento en la misma cuenta. No es una subcarpeta, ni un recorte del mismo video, ni una v2 para otra cuenta. Lleva su propio número y su propia carpeta, y su `guion.md` dice de qué tema viene («Mismo tema que el 03, otro guion»). No repite el gancho, los ejemplos ni el texto del primero. Como el video lo graba Karen, la segunda versión parte de un video nuevo suyo; si solo se pide «otra versión» de un video ya editado, se pregunta qué guion se quiere antes de empezar.

## ⭐ Carpetas (Marca Personal)
Todo vive en `marketing/videos/Marca Personal/NN - Nombre del video/` (Checa usa `CHECA` y `PERSONAL`; **aquí no aplica**). **`NN` lo determina el momento en que se va a subir** (01, 02, 03… 09, 10…), no el orden en que se editó; si Karen o Eduardo cambian el orden de subida, se renombra la carpeta y se actualiza `marketing/plan/calendario.md`. Cada carpeta lleva `video.mp4`, `portada.png`, `copy.md` y `guion.md` (transcripción corregida + tabla de elementos aprobada). La fecha de subida y el estado «Hecho» / «Publicado» van solo en el calendario.

## ⭐ Git
- El `video.mp4` final se commitea **una sola vez, ya aprobado** (etapa 6). Las versiones de prueba se mandan con `SendUserFile` desde la carpeta de trabajo del scratchpad (fuera del repo) y **no se commitean**; `renders/` está en `.gitignore`. Cada re-render commiteado engorda el repo para siempre.
- Commit y push directo a `main` (así lo pidió Eduardo). GitHub rechaza archivos de más de 100 MB: la versión que se guarda es la ligera (`-crf 26`, ≈30–45 MB).

## Antes de empezar
1. **Pedir el original sin pasar por WhatsApp.** El del chat viene a 386×686 px; el de Drive/galería trae 880×1562. Viene de la carpeta de Drive: ver «Fuente de los videos».
2. Confirmar solo lo necesario: nada, si el estilo ya está elegido (sí lo está: **propuesta B** = subtítulos sobrios + tarjetas por idea + extras de «antes → después» y alarma/ejemplo + cierre «Guarda este video»; portada **estilo gancho 1**).

## ⭐ Flujo con una aprobación por etapa (como en Checa; pedido por Eduardo el 16 oct 2026)
Una etapa a la vez; **no pases a la siguiente sin su «aprobado»** y no adelantes archivos de etapas futuras (copy). El estilo visual de Karen **no cambia**: ciruela y lavanda, Outfit y Maven Pro, subtítulos sobrios, cierre sobrio.
Antes de la etapa 1 solo se hace trabajo de análisis (descargar el video, `preparar.sh`, leer la transcripción); no se compone ni se renderiza nada.
1. **Transcripción y estructura.** En el chat: el texto corregido y de corrido, las palabras dudosas marcadas, y en 3–4 líneas cómo se divide el video (ideas, ejemplos y cierre). Karen/Eduardo aprueban o corrigen el texto.
2. **Tabla de elementos por toma**, en el chat: `Segundo · Frase que dice · Elemento en pantalla` (etiqueta de tema, lista, destacado, tarjeta «antes → después», alarma/temporizador de ejemplo, cierre, zooms). Se marca con «Ejemplo» todo dato que ella no dijo. Se aprueba antes de componer.
3. **Portada** (orden nuevo, Eduardo 17 oct 2026: va **antes** del video). Se proponen 3 ganchos con su frase exacta (salen de lo que ella dice; sin «siempre» ni «todos») y el estilo 1; se hace el que elijan y se envía para aprobarla. Se saca del `input-video.mp4` que deja `preparar.sh`, así que no necesita el video renderizado. **Zona segura para todas las redes** (se publica en TikTok, Instagram, YouTube Shorts y Facebook): todo el contenido entre y=300 y y=1620, porque la cuadrícula de Instagram recorta a 3:4 (240 px arriba y abajo). `portada.py` ya la respeta.
4. **Video.** Con la tabla y la portada aprobadas: **encuadre de ojos** (`encuadre.py`, ver paso 1b), `componer.py`, `check`, `snapshot`, render y versión ligera. Se envía la **versión de prueba** con `SendUserFile` desde el scratchpad; **no se commitea** (cada re-render engorda el repo para siempre). Con portada y video aprobados, la portada se pone como **primer cuadro** del video con `bash $SK/scripts/portada_primer_cuadro.sh <video_web.mp4> portada.png <video_final.mp4>` (0.2 s, para que las redes la tomen de portada), se envía esa versión y **ese es el video que se guarda** en la etapa 6.
5. **Copy.** `copy.md` completo (título, textos por plataforma, hashtags, subtítulos, «Por confirmar con Karen»), enviado para aprobarlo.
6. **Hecho.** Con el copy aprobado se guarda con `guardar.sh` (video **con la portada incluida**, portada, copy y guion en `marketing/videos/Marca Personal/NN - Nombre/`, **un solo commit, ya aprobado**) y la fila queda como «Hecho» en `marketing/plan/calendario.md`. «Hecho» no es «Publicado»: «Publicado» solo lo marcan Karen o Eduardo al subirlo.
Si piden cambios en una etapa, se rehace solo esa etapa y no se avanza hasta su «aprobado». Si piden varios videos a la vez, cada uno lleva su propia etapa y se pueden preparar en paralelo, pero un render no empieza sin la tabla aprobada.

## Pasos técnicos (con scripts de `scripts/`; `SK=.claude/skills/videos-karen`; se ejecutan dentro de las etapas de arriba)
1. **Preparar** (≈4 min): `bash $SK/scripts/preparar.sh <original.mp4> <trabajo>`
   Re-codifica a 1080×1920 (¡el celular guarda con rotación!), GOP denso, nivela la voz a −16 LUFS y transcribe con Whisper *medium* (`words.json`). Usar la carpeta de trabajo en el scratchpad, no en el repo.
1b. **Encuadre de ojos (regla de los tercios, fijo, sin seguimiento)**, justo después de `preparar.sh` (así la portada y el video usan el mismo encuadre) y antes de `componer.py`: `python3 $SK/scripts/encuadre.py <trabajo>`. Mide la posición de los ojos (MediaPipe, mediana de todo el video) y recorta con zoom fijo 1.15 para que queden sobre la línea del tercio superior y centrados. Guarda el original en `<trabajo>/input-video-orig.mp4` y deja el reencuadrado en `public/input-video.mp4` (lo usan también la portada y el render). **Revisar `<trabajo>/tercios.png`** (cuadrícula amarilla: los ojos sobre la línea horizontal superior). Sin seguimiento de movimiento: Karen casi no se mueve y el zoom/pan variable distrae. Una sola vez por entorno: `pip install mediapipe opencv-python-headless` y `apt-get install -y libegl1 libgles2 libgl1`. Si no detecta la cara, dejar el original. Ya se aplicó a V7; los videos 01 a 05 no lo llevan.
2. **Revisar la transcripción** y anotar palabras dudosas (en el video 1: «honor/horario/hora específica»). Se corrigen con `correcciones` del spec y **se listan en «Por confirmar» del copy**.
3. **Escribir el spec** del video (copiar `ejemplos/video1-spec.json`): nametag, **pastillas** (una por idea numerada), **antes_despues** (ejemplos concretos que ella dice), **alarma** u otra tarjeta de ejemplo (solo si aplica; marcar «Ejemplo» y no inventar cifras reales), **cierre** (acción que ella pide), `zooms` suaves (1.0↔1.04 al cambiar de idea) y `claves` (palabras en lavanda). Los tiempos se anclan a palabras: `["escribe", 22]` = primera «escribe» después de 22 s. Si el video no tiene ejemplos, bastan nametag + pastillas + cierre.
4. **Componer**: `python3 $SK/scripts/componer.py <trabajo> spec.json` → `public/index.html` y `subtitulos.json`. Revisar que los subtítulos queden en frases cortas (2 líneas máx.).
5. **Verificar**: `cd <trabajo> && npx --yes hyperframes@0.8.163 check public` y `snapshot public --at t1,t2,…` (hoja `contact-sheet.jpg`). Mirar: nametag sin tapar manos/cara, tarjetas en la zona del torso (y 1050–1380), subtítulos en y≈1400 (zona segura: nada debajo de y≈1580 ni arriba de 220).
6. **Renderizar**: `bash $SK/scripts/renderizar.sh <trabajo> <video_web.mp4>` (≈5–6 min en software; **no esperar con `until`/grep en segundo plano**: usar `while pgrep -f "hyperframes render"`). Genera el master y una versión ligera ≈33 MB para GitHub.
7. **Portada con gancho** (se hace en la etapa 3, antes de componer y renderizar; el cuadro sale de `input-video.mp4`): `python3 $SK/scripts/portada.py --estilo 1 --video <trabajo>/public/input-video.mp4 --tiempo <s con buena cara> --hook "Frase con {palabra}" --sub "…" --tag "Consejo para TDAH" --salida portada.png`. Escoger un cuadro donde mire a cámara y sonría (probar 3–4 tiempos con ffmpeg). Estilos 2 (`--antes/--despues`) y 3 (`|` = salto de línea) si ella los pide. **Ganchos**: salen de lo que ella dice (el video 1: «Deja de confiar en tu memoria»); proponer 3 y que elija. Prohibido el clickbait que culpa o promete curas.
8. **Copy**: partir de `plantillas/copy.md`. Escribirlo con la skill `copywriting` (sin rayas largas, sin «no es X, es Y», sin listas «sin A, sin B»): título YouTube, texto IG/FB (con la lista de lo que ella dice y su llamada a guardar/compartir), texto corto TikTok, hashtags (#TDAH #neuropsicologia #saludmental #psicologia #Cancun + del tema), tabla de subtítulos (de `subtitulos.json`) y **«Por confirmar con Karen»**.
8b. **Portada como primer cuadro** (etapa 4, con portada y video aprobados): `bash $SK/scripts/portada_primer_cuadro.sh <video_web.mp4> portada.png <video_final.mp4>`.
9. **Guardar (etapa 6, solo con el copy aprobado)**: usa `<video_final.mp4>` (con la portada incluida) en lugar de `<video_web.mp4>`; `bash $SK/scripts/guardar.sh NN "Nombre del video" <video_web.mp4> portada.png copy.md "<gancho>" guion.md` desde la raíz del repo → crea la carpeta, agrega la fila al calendario y hace **un solo commit** a `main`. Enviar al chat con `SendUserFile` el video y la portada (ya se enviaron como pruebas en las etapas 3 y 4).

## Elementos del spec (videos 1 a 5; ver `ejemplos/videoN-spec.json`)
- `pastillas` (con `n` numeradas o sin `n` como etiqueta de tema), `antes_despues` (con `etiquetas` y `tachar:false` para «Tarea → Primer paso»), `alarma` (también sirve de temporizador: `etiqueta`, `ejemplo:false`), `listas` (chips que aparecen al decir cada palabra), `destacados` (frase clave), `cierre` (`icono:"pregunta"` o bookmark, `chips_anclas`, `titulo_tam`) y `zooms`.
- `ajustes`: `{"16.46": "acercar", "16.72": null}` cambia o quita la palabra que empieza en ese segundo (ojo: dos palabras con el mismo inicio se afectan juntas).
- Las tarjetas deben **entrar justo antes de su primer elemento** (si no, salen vacías) y no solaparse en tiempo: todas ocupan la zona y≈1050–1380.
- Los ganchos de portada salen de lo que ella dice; **no generalizar** («siempre», «todos»). Probar 3–4 cuadros y elegir uno donde sonría a cámara.

## Lecciones y trampas
- **Varios videos a la vez**: la preparación (transcripción) de un video y el render de otro pueden correr en paralelo (nohup en segundo plano); cada render tarda 8–10 min con CPU compartida. Esperar con un bucle acotado (`for i in $(seq 1 30); do pgrep … || break; sleep 15; done`), nunca con `until` sin límite.
- Los videos de la carpeta de Drive se llaman `v2.mp4`…`v5.mp4` (el primero es `2026_10_15_12_46_52 (1)~3.mp4`). Los fondos con textura (pared verde) pesan más: usar `-crf 26` para quedar en ≈30–45 MB.
- **Drive**: el conector solo recibe archivos *dentro* de la llamada (base64), así que **no se puede subir** el video ni la portada a Drive (96 MB). Para **bajar**: el conector limita a 10 MB; un archivo compartido se descarga con `curl -L "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t"`. Listar la carpeta con `search_files` y `parentId = '<ID>'`. **No usar `list_recent_files`**: devuelve documentos clínicos de pacientes; no abrirlos ni citarlos nunca.
- La carpeta en GitHub **es pública** (repo del portafolio): avisar si un video aún no debe verse. GitHub rechaza archivos >100 MB; por eso la versión web.
- `faster-whisper` falla con `metadata_errors` al abrir el audio: `transcribir.py` ya lo evita decodificando con ffmpeg. Whisper *small* se equivoca más con términos clínicos; usar *medium* con `initial_prompt`.
- La transcripción nunca es definitiva: leer el texto completo antes de componer.
- El lector de HyperFrames no expande `var(--x)` en `font-family`: el CSS ya usa nombres concretos. Elementos animados llevan `class="clip"` y `data-start/duration/track-index`.
- Si la página de instalación o el CSS parecen viejos en el teléfono, es caché (agregar `?v=`). No aplica a estos videos, solo a la web.
- Animar zoom en `#video-wrap`, no en el `<video>`. Sin `Math.random` ni `Date.now`.
- **Probado en los videos 1 a 5:** `preparar.sh`, `componer.py` (con listas, destacados, ajustes de palabras y etiquetas) y `portada.py` funcionan; el render se corrió a mano con `hyperframes@0.8.163 render` (como en `renderizar.sh`). `guardar.sh` en su versión actual (carpeta Marca Personal + calendario) **aún no se ha corrido**: probarlo con el video 06 y corregir aquí si falla.

## Presupuesto de tiempo (referencia, video de 72 s)
Preparar 4 min · spec 10 min · componer+verificar 10 min · render 6 min · portada 5 min · copy 10 min · guardar 2 min.

## Estado y pendientes (16 oct 2026, al cerrar la conversación)
- **Entregados antes del flujo por etapas (01 a 05):** 01 Organiza tus pendientes, 02 No todo olvido es TDAH, 03 Solo una tarea, no diez, 04 10 minutos que se vuelven una hora, 05 Planifica tu salida. Sus carpetas están en `marketing/videos/Marca Personal/`. Ninguno está «Publicado»; cada `copy.md` trae un «Por confirmar con Karen» sin resolver (palabras dudosas de la transcripción y datos de ejemplo).
- **Numeración:** 01 a 05 **confirmada por Eduardo**; no se renombra. Los nuevos siguen con 06, 07… según el momento de subida.
- **Origen de los videos:** carpeta de Drive oficial (ver «Fuente de los videos»). Karen sigue subiendo ahí todo lo grabado: al iniciar, listar la carpeta y detectar videos nuevos. No se puede subir nada a Drive desde aquí.
- **Segunda versión:** otro video con guion diferente sobre el mismo tema (otro número). Todavía no se ha hecho ninguna.
- **Web del cierre:** `psicologakarentrujillo.com.mx`, confirmada; ya no se pregunta ni se lista como «Por confirmar».
- **Orden nuevo (17 oct 2026, Eduardo):** guion/transcripción → tabla → **portada** → video → copy; la portada se pone como primer cuadro del video (`portada_primer_cuadro.sh`) y todo va dentro de y=300–1620 (zona segura de Instagram, TikTok, YouTube Shorts y Facebook). Los videos 01 a 05 ya guardados no se rehacen.
- **Siguiente paso:** el próximo video pasa por las 6 etapas con aprobación y se guarda como el 06 con `guardar.sh`.
- **Repo público:** los videos se pueden ver antes de publicarse; si no debe ser así, mover `marketing/videos/` a un repo privado.
