#!/usr/bin/env python3
"""Portada con gancho (1080x1920) para un video de Karen.
Estilos: 1 = foto completa + titular abajo (el que eligió Karen en el video 1)
         2 = foto arriba + «Así NO…» con ejemplo tachado/correcto
         3 = fondo arena + arco con foto (frase emocional)
Zona segura (Eduardo, 16 oct 2026): todo el contenido entre y=300 y y=1620 (Instagram recorta a 3:4 en el perfil).
En --hook, lo que va entre {llaves} es la palabra resaltada.
Ejemplo:
  portada.py --estilo 1 --video trabajo/public/input-video.mp4 --tiempo 3.2 \\
     --hook "Deja de confiar en tu {memoria}" --sub "3 formas de organizar tus pendientes" \\
     --tag "Consejo para TDAH" --salida portada.png"""
import argparse, os, re, subprocess, tempfile, shutil
ap = argparse.ArgumentParser()
ap.add_argument('--estilo', type=int, default=1); ap.add_argument('--video'); ap.add_argument('--tiempo', type=float, default=3.0)
ap.add_argument('--foto'); ap.add_argument('--hook', required=True); ap.add_argument('--sub', default=''); ap.add_argument('--tag', default='')
ap.add_argument('--antes', default=''); ap.add_argument('--despues', default=''); ap.add_argument('--salida', required=True)
a = ap.parse_args()
SK = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); T = tempfile.mkdtemp()
for f in os.listdir(f'{SK}/assets/fonts'): shutil.copy(f'{SK}/assets/fonts/{f}', T)
foto = f'{T}/foto.jpg'
if a.foto: shutil.copy(a.foto, foto)
else: subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(a.tiempo), '-i', a.video, '-frames:v', '1', '-q:v', '2', foto], check=True)
hl = lambda s, tag='em': re.sub(r'\{(.+?)\}', rf'<{tag}>\1</{tag}>', s)
BASE = '''@font-face{font-family:Outfit;src:url(Outfit-700-latin.woff2);font-weight:500 700}
@font-face{font-family:"Maven Pro";src:url(MavenPro-700-latin.woff2);font-weight:400 700}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;overflow:hidden}
.stage{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:"Maven Pro",sans-serif}
.ph{position:absolute;inset:0;background:url(foto.jpg) 50% 20%/cover}'''
if a.estilo == 1:
    body = f'''<style>{BASE} body{{background:#1E1730}}
.g{{position:absolute;left:0;right:0;bottom:0;height:1100px;background:linear-gradient(to top,#1E1730 0%,rgba(30,23,48,.92) 45%,rgba(30,23,48,0) 100%)}}
.k{{position:absolute;left:60px;top:310px;background:#F5E7D6;color:#2E2545;font:700 34px/1 "Maven Pro";letter-spacing:.12em;padding:16px 28px;border-radius:40px;text-transform:uppercase}}
h1{{font:700 150px/1.02 Outfit;color:#fff;letter-spacing:-.02em}}
.tx{{position:absolute;left:60px;right:60px;bottom:330px}}
h1 em{{font-style:normal;background:#F5E7D6;color:#2E2545;padding:0 22px;border-radius:24px;-webkit-box-decoration-break:clone;box-decoration-break:clone}}
.s{{margin:30px 0 0 2px;font:700 46px/1.25 "Maven Pro";color:#C6BCE2}}</style>
<div class=stage><div class=ph></div><div class=g></div>{f'<div class=k>{a.tag}</div>' if a.tag else ''}<div class=tx><h1>{hl(a.hook)}</h1><div class=s>{a.sub}</div></div></div>'''
elif a.estilo == 2:
    body = f'''<style>{BASE} body{{background:#2E2545}} .stage{{background:#2E2545}}
.ph{{inset:0 0 auto 0;height:1000px;background-position:50% 12%}}
.fade{{position:absolute;left:0;right:0;top:640px;height:380px;background:linear-gradient(to bottom,rgba(46,37,69,0),#2E2545)}}
h1{{position:absolute;left:60px;right:60px;top:880px;font:700 124px/1.03 Outfit;color:#fff;letter-spacing:-.02em}}
h1 em{{font-style:normal;color:#F5E7D6;text-decoration:underline;text-decoration-thickness:10px;text-underline-offset:12px;text-decoration-color:#C0392B}}
.bx{{position:absolute;left:60px;right:60px;top:1190px;display:grid;gap:18px}}
.c{{display:flex;align-items:center;gap:20px;border-radius:26px;padding:22px 30px;font:700 52px/1.1 Outfit}}
.c1{{background:rgba(245,231,214,.14);color:#E6E0F3;text-decoration:line-through;text-decoration-color:#E0574A;text-decoration-thickness:7px;width:max-content}}
.c2{{background:#F5E7D6;color:#2E2545}}.c2 b{{flex:none;display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:#10b77f}}
.c2 svg{{width:34px;height:34px;stroke:#fff;stroke-width:4;fill:none;stroke-linecap:round;stroke-linejoin:round}}</style>
<div class=stage><div class=ph></div><div class=fade></div><h1>{hl(a.hook)}</h1>
<div class=bx><div class="c c1">{a.antes}</div><div class="c c2"><b><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></b>{a.despues}</div></div></div>'''
else:
    body = f'''<style>{BASE} body{{background:#F5E7D6}} .stage{{background:#F5E7D6}}
h1{{position:absolute;left:60px;right:60px;top:310px;font:700 132px/1.2 Outfit;color:#2E2545;letter-spacing:-.02em}}
h1 em{{font-style:normal;color:#fff;background:#433860;padding:0 20px;border-radius:22px;-webkit-box-decoration-break:clone;box-decoration-break:clone}}
.arch{{position:absolute;left:110px;right:110px;top:700px;height:860px;border-radius:430px 430px 44px 44px;overflow:hidden;box-shadow:0 30px 60px rgba(46,37,69,.3);border:10px solid #C6BCE2}}
.arch div{{position:absolute;inset:0;background:url(foto.jpg) 50% 22%/cover}}
.s{{position:absolute;left:0;right:0;top:1580px;text-align:center;font:700 40px/1.2 "Maven Pro";color:#433860}}</style>
<div class=stage><h1>{hl(a.hook).replace('|','<br>')}</h1><div class=arch><div></div></div><div class=s>{a.sub}</div></div>'''
open(f'{T}/p.html', 'w').write(f'<!doctype html><meta charset=utf-8>{body}')
js = f'''const {{chromium}}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{{const b=await chromium.launch();const p=await b.newPage({{viewport:{{width:1080,height:1920}}}});
await p.goto('file://{T}/p.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
await p.screenshot({{path:{a.salida!r}}});await b.close();}})();'''
open(f'{T}/s.js', 'w').write(js); subprocess.run(['node', f'{T}/s.js'], check=True); print('portada →', a.salida)
