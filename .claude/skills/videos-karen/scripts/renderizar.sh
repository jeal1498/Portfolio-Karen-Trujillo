#!/bin/bash
# Uso: renderizar.sh <carpeta_trabajo> <salida_web.mp4>
# check → render (≈5-6 min por software para 72 s) → versión ligera para GitHub (≈33 MB).
set -e
W="$1"; OUT="$2"; HF="npx --yes hyperframes@0.8.163"
cd "$W"
$HF check public | tail -15
PRODUCER_BROWSER_GPU_MODE=software $HF render public --fps 30 -o master.mp4 2>&1 | tail -3
ffmpeg -v error -y -i master.mp4 -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -c:a copy -movflags +faststart "$OUT"
ls -la master.mp4 "$OUT"
