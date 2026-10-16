---
name: videos-karen
description: Editar los videos de la psicóloga Karen Trujillo (9:16, ella hablando a cámara) con la identidad de su marca (ciruela y lavanda, Outfit y Maven Pro, nada que ver con Checa) y entregar video editado, portada con gancho y copy .md guardados en `videos/NN-slug/` del repo. Úsala cuando Eduardo o Karen pasen un video nuevo, pidan portada, copy, o continuar con el siguiente video. No usar `videos-checa` para esto.
---

# Videos de Karen Trujillo (Neuropsicóloga Clínica)

Flujo probado con el video 1 (`videos/01-organiza-tus-pendientes/`). Meta: **un video completo en ~40–60 min de trabajo y pocos tokens**. No leer las skills `hyperframes-*` ni `talking-head-recut` salvo que algo falle: ya están resumidas aquí y en los scripts.

## Marca (de `DESIGN.md` y `PRODUCT.md` del repo)
- Colores: ciruela `#433860` (principal), ciruela medio `#6B5F8A`, ciruela profundo `#2E2545`, lavanda `#C6BCE2`, rosa `#F9DEE3`, arena `#F5E7D6`, azul grisáceo `#E1E9EA`, éxito `#10b77f`.
- Fuentes: **Outfit** (titulares) y **Maven Pro** (texto). Ya están en `assets/fonts/`.
- Voz: clínica, confiable, cálida. Precisa sin ser fría. **Sin promesas vagas** ni «transformar vidas».
- Evitar: efectos de startup, emojis en pantalla, textos gigantes sin sentido, fotos de stock, gradientes decorativos, música fuerte.
- Público: madres y padres de hijos de 5 a 17 años con dudas de atención, conducta o comunicación, y adultos que sospechan TDAH. Ciudad: Cancún. Web: `psicologakarentrujillo.com.mx` (confirmar con ella la primera vez). WhatsApp de ventas: ver `src/components/Footer.tsx`.
- Es información de ayuda, no diagnóstico: no afirmar que algo «cura» ni diagnosticar por video.

## Antes de empezar
1. **Pedir el original sin pasar por WhatsApp.** El del chat viene a 386×686 px; el de Drive/galería trae 880×1562. Si lo pasan por la carpeta de Drive de Eduardo/Karen, ver «Drive» abajo.
2. Confirmar solo lo necesario: nada, si el estilo ya está elegido (sí lo está: **propuesta B** = subtítulos sobrios + tarjetas por idea + extras de «antes → después» y alarma/ejemplo + cierre «Guarda este video»; portada **estilo gancho 1**).

## Pasos (con scripts de `scripts/`; `SK=.claude/skills/videos-karen`)
1. **Preparar** (≈4 min): `bash $SK/scripts/preparar.sh <original.mp4> <trabajo>`
   Re-codifica a 1080×1920 (¡el celular guarda con rotación!), GOP denso, nivela la voz a −16 LUFS y transcribe con Whisper *medium* (`words.json`). Usar la carpeta de trabajo en el scratchpad, no en el repo.
2. **Revisar la transcripción** y anotar palabras dudosas (en el video 1: «honor/horario/hora específica»). Se corrigen con `correcciones` del spec y **se listan en «Por confirmar» del copy**.
3. **Escribir el spec** del video (copiar `ejemplos/video1-spec.json`): nametag, **pastillas** (una por idea numerada), **antes_despues** (ejemplos concretos que ella dice), **alarma** u otra tarjeta de ejemplo (solo si aplica; marcar «Ejemplo» y no inventar cifras reales), **cierre** (acción que ella pide), `zooms` suaves (1.0↔1.04 al cambiar de idea) y `claves` (palabras en lavanda). Los tiempos se anclan a palabras: `["escribe", 22]` = primera «escribe» después de 22 s. Si el video no tiene ejemplos, bastan nametag + pastillas + cierre.
4. **Componer**: `python3 $SK/scripts/componer.py <trabajo> spec.json` → `public/index.html` y `subtitulos.json`. Revisar que los subtítulos queden en frases cortas (2 líneas máx.).
5. **Verificar**: `cd <trabajo> && npx --yes hyperframes@0.8.163 check public` y `snapshot public --at t1,t2,…` (hoja `contact-sheet.jpg`). Mirar: nametag sin tapar manos/cara, tarjetas en la zona del torso (y 1050–1380), subtítulos en y≈1400 (zona segura: nada debajo de y≈1580 ni arriba de 220).
6. **Renderizar**: `bash $SK/scripts/renderizar.sh <trabajo> <video_web.mp4>` (≈5–6 min en software; **no esperar con `until`/grep en segundo plano**: usar `while pgrep -f "hyperframes render"`). Genera el master y una versión ligera ≈33 MB para GitHub.
7. **Portada con gancho**: `python3 $SK/scripts/portada.py --estilo 1 --video <trabajo>/public/input-video.mp4 --tiempo <s con buena cara> --hook "Frase con {palabra}" --sub "…" --tag "Consejo para TDAH" --salida portada.png`. Escoger un cuadro donde mire a cámara y sonría (probar 3–4 tiempos con ffmpeg). Estilos 2 (`--antes/--despues`) y 3 (`|` = salto de línea) si ella los pide. **Ganchos**: salen de lo que ella dice (el video 1: «Deja de confiar en tu memoria»); proponer 3 y que elija. Prohibido el clickbait que culpa o promete curas.
8. **Copy**: partir de `plantillas/copy.md`. Escribirlo con la skill `copywriting` (sin rayas largas, sin «no es X, es Y», sin listas «sin A, sin B»): título YouTube, texto IG/FB (con la lista de lo que ella dice y su llamada a guardar/compartir), texto corto TikTok, hashtags (#TDAH #neuropsicologia #saludmental #psicologia #Cancun + del tema), tabla de subtítulos (de `subtitulos.json`) y **«Por confirmar con Karen»**.
9. **Guardar y entregar**: `bash $SK/scripts/guardar.sh NN-slug <video_web.mp4> portada.png copy.md "<gancho>"` desde la raíz del repo → crea `videos/NN-slug/{video.mp4,portada.png,copy.md}`, agrega la fila a `videos/README.md` y hace push a `main` (autorizado por Eduardo). Enviar al chat con `SendUserFile` el video y la portada, y decir qué falta confirmar.

## Lecciones y trampas
- **Drive**: el conector solo recibe archivos *dentro* de la llamada (base64), así que **no se puede subir** el video ni la portada a Drive (96 MB). Para **bajar**: el conector limita a 10 MB; un archivo compartido se descarga con `curl -L "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t"`. Listar la carpeta con `search_files` y `parentId = '<ID>'`. **No usar `list_recent_files`**: devuelve documentos clínicos de pacientes; no abrirlos ni citarlos nunca.
- La carpeta en GitHub **es pública** (repo del portafolio): avisar si un video aún no debe verse. GitHub rechaza archivos >100 MB; por eso la versión web.
- `faster-whisper` falla con `metadata_errors` al abrir el audio: `transcribir.py` ya lo evita decodificando con ffmpeg. Whisper *small* se equivoca más con términos clínicos; usar *medium* con `initial_prompt`.
- La transcripción nunca es definitiva: leer el texto completo antes de componer.
- El lector de HyperFrames no expande `var(--x)` en `font-family`: el CSS ya usa nombres concretos. Elementos animados llevan `class="clip"` y `data-start/duration/track-index`.
- Si la página de instalación o el CSS parecen viejos en el teléfono, es caché (agregar `?v=`). No aplica a estos videos, solo a la web.
- Animar zoom en `#video-wrap`, no en el `<video>`. Sin `Math.random` ni `Date.now`.
- Probado de punta a punta solo en el video 1: `componer.py` y `portada.py` reproducen exactamente sus resultados; `preparar.sh`, `renderizar.sh` y `guardar.sh` juntan los comandos que sí se usaron, pero aún no se corrieron enteros. Si fallan, corregir el script y anotarlo aquí.

## Presupuesto de tiempo (referencia, video de 72 s)
Preparar 4 min · spec 10 min · componer+verificar 10 min · render 6 min · portada 5 min · copy 10 min · guardar 2 min.
