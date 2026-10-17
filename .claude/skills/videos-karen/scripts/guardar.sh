#!/bin/bash
# Uso (SOLO con el copy aprobado = etapa 6; se puede correr desde cualquier carpeta):
#   guardar.sh <NN> "<Nombre del video>" <video.mp4> <portada.png> <copy.md> "<gancho>" [guion.md]
# Guarda en el repo privado de videos (jeal1498/videos-karen-trujillo): carpeta "NN - Nombre/" con video.mp4, portada.png,
# copy.md (y guion.md), agrega la fila a calendario.md como «Hecho» (Publicado = No; ese lo marcan Karen o Eduardo)
# y hace UN solo commit + push a main. NN lo determina el momento de subida (01, 02, 03…).
# Variable opcional: VIDEOS_REPO (por defecto /home/user/videos-karen-trujillo; se clona si no existe).
set -e
NN="$1"; NOM="$2"; V="$(realpath "$3")"; P="$(realpath "$4")"; C="$(realpath "$5")"; G="$6"; GU="${7:+$(realpath "$7")}"
R="${VIDEOS_REPO:-/home/user/videos-karen-trujillo}"
[ -d "$R/.git" ] || git clone -q https://github.com/jeal1498/videos-karen-trujillo "$R"
cd "$R"; git pull -q --rebase origin main
D="$NN - $NOM"; mkdir -p "$D"; cp "$V" "$D/video.mp4"; cp "$P" "$D/portada.png"; cp "$C" "$D/copy.md"; [ -n "$GU" ] && cp "$GU" "$D/guion.md"
python3 - "$NN" "$NOM" "$G" <<'PY'
import sys, urllib.parse
nn, nom, gancho = sys.argv[1:4]
carpeta = f"{nn} - {nom}"
fila = f"| {nn} | [{carpeta}](./{urllib.parse.quote(carpeta)}/) | {gancho} | por definir | Hecho | No |\n"
p = "calendario.md"; t = open(p, encoding="utf-8").read().splitlines(keepends=True)
t = [l for l in t if not l.startswith(f"| {nn} |")]
i = max([k for k, l in enumerate(t) if l.startswith("| ") and l[2:4].isdigit()] or [len(t) - 1]) + 1
t.insert(i, fila); open(p, "w", encoding="utf-8").write("".join(t))
PY
git add -A
git commit -q -m "Video $NN - $NOM (hecho: copy aprobado)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git push origin HEAD:main
