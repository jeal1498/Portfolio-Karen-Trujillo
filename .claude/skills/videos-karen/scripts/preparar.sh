#!/bin/bash
# Uso: preparar.sh <video_original> <carpeta_trabajo>
# Re-codifica a 1080x1920 (respeta la rotación del celular), nivela la voz, copia fuentes y gsap, y transcribe.
set -e
V="$1"; W="$2"; SK="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$W/public/fonts"
cp "$SK"/assets/fonts/*.woff2 "$W/public/fonts/"; cp "$SK/assets/gsap.min.js" "$W/public/"
echo '{"$schema":"https://hyperframes.heygen.com/schema/hyperframes.json","paths":{"blocks":"compositions","components":"compositions/components","assets":"assets"},"media":{"autoProxy":true}}' > "$W/hyperframes.json"
echo '{"id":"karen","name":"karen"}' > "$W/meta.json"
ffprobe -v error -show_entries stream=width,height,duration -show_entries stream_side_data=rotation -of default=nw=1 "$V"
# GOP denso (-g 30) para que el render no congele cuadros; loudnorm = voz a -16 LUFS
ffmpeg -v error -y -i "$V" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30" \
  -c:v libx264 -crf 17 -g 30 -keyint_min 30 -pix_fmt yuv420p -af "highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9" \
  -ar 48000 -c:a aac -b:a 192k -movflags +faststart "$W/public/input-video.mp4"
python3 "$SK/scripts/transcribir.py" "$V" "$W/words.json"
