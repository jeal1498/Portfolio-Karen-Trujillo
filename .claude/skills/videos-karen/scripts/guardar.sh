#!/bin/bash
# Uso: guardar.sh <NN-slug> <video_web.mp4> <portada.png> <copy.md> "<gancho>" [Estado]   (desde la raíz del repo)
# Solo después de que el copy esté aprobado (etapa 6). Estado por defecto: Hecho. «Publicado» lo marcan Karen o Eduardo.
set -e
D="videos/$1"; mkdir -p "$D"
cp "$2" "$D/video.mp4"; cp "$3" "$D/portada.png"; cp "$4" "$D/copy.md"
[ -f videos/README.md ] || printf '# Videos\n\nUna carpeta por video, con `video.mp4`, `portada.png` y `copy.md`.\n\n| # | Carpeta | Gancho de portada | Estado |\n|---|---|---|---|\n' > videos/README.md
N="${1%%-*}"; echo "| ${N#0} | [$1]($1/) | $5 | ${6:-Hecho} |" >> videos/README.md
git add videos
git commit -q -m "Videos: $1 (video, portada y copy)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git fetch -q origin main && git rebase --autostash origin/main && git push origin HEAD:main
