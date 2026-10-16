#!/bin/bash
# Uso (desde la raíz del repo, y SOLO con el copy aprobado = etapa 6):
#   guardar.sh <NN> "<Nombre del video>" <video_web.mp4> <portada.png> <copy.md> "<gancho>" [guion.md]
# Crea  marketing/videos/Marca Personal/NN - Nombre/  con video.mp4, portada.png, copy.md (y guion.md),
# agrega la fila a marketing/plan/calendario.md como «Hecho» (Publicado = No; ese lo marcan Karen o Eduardo)
# y hace UN solo commit + push a main. NN lo determina el momento de subida (01, 02, 03…).
set -e
NN="$1"; NOM="$2"; D="marketing/videos/Marca Personal/$NN - $NOM"
mkdir -p "$D"; cp "$3" "$D/video.mp4"; cp "$4" "$D/portada.png"; cp "$5" "$D/copy.md"; [ -f "$7" ] && cp "$7" "$D/guion.md"
python3 - "$NN" "$NOM" "$6" <<'PY'
import sys, urllib.parse
nn, nom, gancho = sys.argv[1:4]
carpeta = f"{nn} - {nom}"
link = "../videos/" + urllib.parse.quote("Marca Personal") + "/" + urllib.parse.quote(carpeta) + "/"
fila = f"| {nn} | [{carpeta}]({link}) | {gancho} | por definir | Hecho | No |\n"
p = "marketing/plan/calendario.md"; t = open(p).read().splitlines(keepends=True)
t = [l for l in t if not l.startswith(f"| {nn} |")]
i = max([k for k, l in enumerate(t) if l.startswith("| ") and l[2:4].isdigit()] or [len(t) - 1]) + 1
t.insert(i, fila); open(p, "w").write("".join(t))
PY
git add marketing
git commit -q -m "Video $NN - $NOM (hecho: copy aprobado)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git fetch -q origin main && git rebase --autostash origin/main && git push origin HEAD:main
