#!/usr/bin/env python3
"""Arma public/index.html (HyperFrames) para un video de Karen.
Uso: python3 componer.py <carpeta_trabajo> <spec.json>
Necesita en <carpeta_trabajo>: words.json, public/input-video.mp4, public/gsap.min.js, public/fonts/*.woff2
Escribe: public/index.html y subtitulos.json"""
import json, math, re, html, sys, os
work, specp = sys.argv[1], sys.argv[2]
SK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = json.load(open(specp)); W = json.load(open(f'{work}/words.json'))
AJ = spec.get('ajustes', {})   # {"1.16": null, "1.88": "qué"}: quitar/cambiar la palabra que empieza en ese segundo
W = [w for w in W if AJ.get(f"{w['s']:.2f}", w['t']) is not None]
for w in W: w['t'] = AJ.get(f"{w['s']:.2f}", spec.get('correcciones', {}).get(w['t'], w['t']))
FPS = 30; q = lambda x: round(round(x*FPS)/FPS, 4); esc = html.escape
norm = lambda t: re.sub(r'[.,¿?¡!«»"]', '', t).lower()
def wt(word, after=0, off=0.0):
    for w in W:
        if w['s'] >= after and norm(w['t']) == word.lower(): return w['s'] + off
    raise KeyError(f'palabra no encontrada: {word} (después de {after})')
anc = lambda a: wt(a[0], a[1], a[2] if len(a) > 2 else 0.0)
def seq(words, desde):
    # busca las palabras en orden (por posición), aunque dos empiecen en el mismo instante
    i = next(k for k, w in enumerate(W) if w['s'] >= desde); out = []
    for word in words:
        j = next((k for k in range(i, len(W)) if norm(W[k]['t']) == word.lower()), None)
        if j is None: raise KeyError(f'palabra no encontrada: {word} (después de {desde})')
        out.append(W[j]['s']); i = j + 1
    return out
# ---- subtítulos por oración, trozos balanceados ----
sents = []; cur = []
for w in W:
    cur.append(w)
    if w['t'].endswith(('.', '?')): sents.append(cur); cur = []
if cur: sents.append(cur)
KEY = {k.lower() for k in spec.get('claves', [])}
def split(ws):
    n = len(' '.join(x['t'] for x in ws)); k = max(1, math.ceil(n/47))
    if k == 1: return [ws]
    pos = []; a = 0
    for x in ws: a += len(x['t'])+1; pos.append(a)
    cuts = []
    for j in range(1, k):
        tg = n*j/k
        cuts.append(min(range(len(ws)-1), key=lambda i: abs(pos[i]-tg) - (14 if ws[i]['t'].endswith(',') else 0)) + 1)
    out = []; prev = 0
    for c in sorted(set(cuts)): out.append(ws[prev:c]); prev = c
    out.append(ws[prev:]); return [o for o in out if o]
caps = []
for s in sents:
    for g in split(s):
        caps.append({'s': g[0]['s'], 'e': g[-1]['e']+0.3, 'w': [(x['t'], norm(x['t']) in KEY) for x in g]})
for i in range(len(caps)-1): caps[i]['e'] = min(caps[i]['e'], caps[i+1]['s']-0.03)
DUR = spec['duracion']; caps[-1]['e'] = min(caps[-1]['e'], DUR-0.2)
SV = lambda d: f'<svg viewBox="0 0 24 24">{d}</svg>'
CHECK = SV('<path d="M5 12.5l4.5 4.5L19 7.5"/>'); ARROW = SV('<path d="M12 4v15m0 0l-6-6m6 6l6-6"/>')
ALARM = SV('<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4.2l2.8 1.8M4 5.5l3-2.4M20 5.5l-3-2.4"/>')
QUEST = SV('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.7 2.7 0 015.2.9c0 1.8-2.7 2.3-2.7 4M12 17.2v.1"/>')
BOOK = SV('<path d="M6.5 3.5h11a1 1 0 011 1V21l-6.5-4.5L5.5 21V4.5a1 1 0 011-1z"/>')
words = lambda t: ''.join(f'<span class="w">{esc(x)}</span> ' for x in t.split())
H = [f'<div id="video-wrap"><video id="bg-video" src="input-video.mp4" playsinline data-has-audio="true" data-start="0" data-duration="{DUR}" data-track-index="1"></video></div>']
J = ["const tl=gsap.timeline({paused:true});", "gsap.set('#video-wrap',{transformOrigin:'50% 28%'});"]
fin = lambda sel, t, y=24, d=0.45: J.append(f"tl.fromTo('{sel}',{{opacity:0,y:{y}}},{{opacity:1,y:0,duration:{d},ease:'power2.out'}},{q(t)});")
fout = lambda sel, t, d=0.35: J.append(f"tl.to('{sel}',{{opacity:0,duration:{d},ease:'power2.in'}},{q(t)});")
shake = lambda sel, t: J.append(f"tl.fromTo('{sel}',{{rotation:-12}},{{rotation:12,duration:0.09,repeat:5,yoyo:true,ease:'sine.inOut',transformOrigin:'50% 60%'}},{q(t)});")
nt = spec.get('nametag')
if nt:
    H.append(f'<div class="nametag clip" id="nt" data-start="{nt["ini"]}" data-duration="{nt["fin"]-nt["ini"]}" data-track-index="2"><i class="bar"></i><div><b>{esc(nt["nombre"])}</b><span>{esc(nt["cargo"])}</span></div></div>')
    J.append(f"tl.fromTo('#nt',{{opacity:0,x:-50}},{{opacity:1,x:0,duration:0.5,ease:'power3.out'}},{nt['ini']});"); fout('#nt', nt['fin']-0.4)
for pi, p in enumerate(spec.get('pastillas', []), 1):
    pid = f"p{pi}"; ic = f'<span class="ic" id="{pid}ic">{ALARM}</span>' if p.get('icono_alarma_en') else ''
    H.append(f'<div class="pill clip" id="{pid}" data-start="{p["ini"]}" data-duration="{round(p["fin"]-p["ini"]+0.5,2)}" data-track-index="2">{'<span class="n">'+str(p["n"])+'</span>' if p.get("n") else ''}{esc(p["texto"])}{ic}</div>')
    J.append(f"tl.fromTo('#{pid}',{{opacity:0,y:-20,scale:.94}},{{opacity:1,y:0,scale:1,duration:0.45,ease:'back.out(1.5)'}},{p['ini']});"); fout('#'+pid, p['fin'])
    if p.get('icono_alarma_en'):
        t = anc(p['icono_alarma_en']); shake(f'#{pid}ic', t); J.append(f"tl.to('#{pid}ic',{{rotation:0,duration:.1}},{q(t+0.6)});")
for b in spec.get('antes_despues', []):
    c = b['id']
    H.append(f'''<div class="card ba clip" id="{c}" data-start="{b['ini']}" data-duration="{round(b['fin']-b['ini']+0.5,2)}" data-track-index="3">
 <div class="row r1"><span class="tag">{esc(b.get("etiquetas",["Antes","Después"])[0])}</span><span class="tx" id="{c}-a"><span class="t">{esc(b['antes'])}</span><i class="strike"></i></span></div>
 <div class="arrow">{ARROW}</div>
 <div class="row r2"><span class="tag ok">{esc(b.get("etiquetas",["Antes","Después"])[1])}</span><span class="tx" id="{c}-d">{words(b['despues'])}</span><span class="chk">{CHECK}</span></div>
</div>''')
    ts = seq(b['despues_en'], b['despues_desde']); strike = anc(b['tachar_en']) - 0.1 if b.get('tachar_en') else 0
    fin(f'#{c}', b['ini']+0.05, 30, 0.5)
    J.append(f"tl.set('#{c} .r1,#{c} .arrow,#{c} .r2',{{opacity:0}},0);")
    fin(f'#{c} .r1', anc(b['antes_en']), 14, 0.4)
    if b.get('tachar', True):
        J.append(f"tl.fromTo('#{c} .strike',{{scaleX:0}},{{scaleX:1,duration:0.35,ease:'power2.inOut',transformOrigin:'0 50%'}},{q(strike)});")
        J.append(f"tl.to('#{c}-a .t',{{opacity:.45,duration:.3}},{q(strike)});")
        J.append(f"tl.to('#{c} .arrow',{{opacity:1,duration:.3}},{q(strike+0.3)});")
    else:
        J.append(f"tl.to('#{c} .arrow',{{opacity:1,duration:.3}},{q(ts[0]-0.45)});")
    J.append(f"tl.to('#{c} .r2',{{opacity:1,duration:.25}},{q(ts[0]-0.15)});")
    J.append(f"tl.set('#{c}-d .w',{{opacity:0,y:12}},0);")
    for k, tt in enumerate(ts): J.append(f"tl.to('#{c}-d .w:nth-child({k+1})',{{opacity:1,y:0,duration:0.28,ease:'power2.out'}},{q(tt-0.05)});")
    J.append(f"tl.fromTo('#{c} .chk',{{scale:0,opacity:0}},{{scale:1,opacity:1,duration:0.4,ease:'back.out(2)'}},{q(ts[-1]+0.5)});")
    fout(f'#{c}', b['fin'], 0.4)
for L in spec.get('listas', []):
    c = L['id']; items = ''.join(f'<span class="li" id="{c}-{k}">{esc(it["texto"])}</span>' for k, it in enumerate(L['items']))
    H.append(f'''<div class="card lista clip" id="{c}" data-start="{L['ini']}" data-duration="{round(L['fin']-L['ini']+0.5,2)}" data-track-index="3">
 <div class="lt">{esc(L['titulo'])}</div><div class="lis">{items}</div></div>''')
    fin(f'#{c}', L['ini']+0.05, 30, 0.5); J.append(f"tl.set('#{c} .li',{{opacity:0,scale:.9}},0);")
    for k, it in enumerate(L['items']): J.append(f"tl.to('#{c}-{k}',{{opacity:1,scale:1,duration:0.35,ease:'back.out(1.6)'}},{q(anc(it['en'])-0.1)});")
    fout(f'#{c}', L['fin'], 0.4)
for D in spec.get('destacados', []):
    c = D['id']
    H.append(f'<div class="card dest clip" id="{c}" data-start="{D["ini"]}" data-duration="{round(D["fin"]-D["ini"]+0.5,2)}" data-track-index="3"><i></i><p>{esc(D["texto"])}</p></div>')
    fin(f'#{c}', anc(D['en']) - 0.2, 30, 0.5); fout(f'#{c}', D['fin'], 0.4)
a = spec.get('alarma')
if a:
    H.append(f'''<div class="card alarm clip" id="al" data-start="{a['ini']}" data-duration="{round(a['fin']-a['ini']+0.4,2)}" data-track-index="3">
 <div class="al-top"><span class="ic">{ALARM}</span><span class="lab">{esc(a.get("etiqueta","Alarma"))}</span>{"<span class=\"ej\">Ejemplo</span>" if a.get("ejemplo", True) else ""}</div>
 <div class="al-main"><b class="time">{esc(a['hora'])}</b><div><div class="ttl">{esc(a['titulo'])}</div><div class="sub">{esc(a.get('detalle_antes',''))}<u>{esc(a['detalle'])}</u></div></div></div>
</div>''')
    fin('#al', a['ini']+0.05, 40, 0.5); J.append("tl.set('#al .al-top,#al .al-main',{opacity:1},0);"); shake('#al .ic', a['ini']+0.25)
    J.append(f"tl.fromTo('#al u',{{backgroundSize:'0% 3px'}},{{backgroundSize:'100% 3px',duration:0.6,ease:'power2.out'}},{q(anc(a['subrayar_en']))});"); fout('#al', a['fin'], 0.4)
c = spec.get('cierre')
if c:
    chips = ''.join(f'<span class="chip"><i>{i+1 if c.get("numerados", True) else ""}</i>{esc(t)}</span>' for i, t in enumerate(c['chips']))
    H.append(f'''<div class="card close clip" id="cl" data-start="{c['ini']}" data-duration="{round(DUR-c['ini'],2)}" data-track-index="3">
 <div class="cl-top"><span class="bm">{QUEST if c.get('icono')=='pregunta' else BOOK}</span><b{" style=\"font-size:"+str(c["titulo_tam"])+"px\"" if c.get("titulo_tam") else ""}>{esc(c['titulo'])}</b></div>
 <div class="chips">{chips}</div>
 <div class="url">{esc(c['url'])}</div>
</div>''')
    fin('#cl', c['ini']+0.05, 40, 0.55); tv = anc(c['icono_en']) + 0.1
    if c.get('icono') != 'pregunta': J.append(f"tl.fromTo('#cl .bm path',{{fillOpacity:0}},{{fillOpacity:1,duration:0.5,ease:'power2.out'}},{q(tv)});")
    J.append(f"tl.fromTo('#cl .bm',{{scale:1}},{{scale:1.25,duration:0.22,yoyo:true,repeat:1,ease:'power2.inOut'}},{q(tv)});")
    J.append("tl.set('#cl .chip,#cl .url',{opacity:0},0);"); te = anc(c['chips_en'])
    for k in range(len(c['chips'])):
        tk = anc(c['chips_anclas'][k]) - 0.1 if c.get('chips_anclas') else te - 0.9 + 0.3*k
        J.append(f"tl.fromTo('#cl .chip:nth-child({k+1})',{{opacity:0,y:20}},{{opacity:1,y:0,duration:0.4,ease:'power2.out'}},{q(tk)});")
    J.append(f"tl.to('#cl .url',{{opacity:1,duration:0.5}},{q(anc(c['url_en'])-0.4)});")
for (t0, t1, s) in spec.get('zooms', []): J.append(f"tl.to('#video-wrap',{{scale:{s},duration:{q(t1-t0)},ease:'power2.inOut'}},{t0});")
for i, cp in enumerate(caps):
    inner = ' '.join(f'<em>{esc(t)}</em>' if k else esc(t) for t, k in cp['w'])
    H.append(f'<div class="cap clip" id="cap{i}" data-start="{q(cp["s"])}" data-duration="{q(cp["e"]-cp["s"])}" data-track-index="5"><span class="plate">{inner}</span></div>')
    J.append(f"tl.fromTo('#cap{i} .plate',{{opacity:0,y:14}},{{opacity:1,y:0,duration:0.18,ease:'power2.out'}},{q(cp['s'])});")
J.append(f"window.__timelines=window.__timelines||{{}};window.__timelines['{spec['id']}']=tl;")
css = open(f'{SK}/plantillas/estilo.css').read()
doc = f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=1080, height=1920">
<style>
@font-face{{font-family:"Outfit";src:url("fonts/Outfit-700-latin.woff2") format("woff2");font-weight:500 700;font-display:block}}
@font-face{{font-family:"Maven Pro";src:url("fonts/MavenPro-700-latin.woff2") format("woff2");font-weight:400 700;font-display:block}}
{css}
</style></head><body>
<div id="root" data-composition-id="{spec['id']}" data-start="0" data-duration="{DUR}" data-width="1080" data-height="1920" data-fps="30">
{chr(10).join(H)}
<script src="gsap.min.js"></script>
<script>(function(){{
{chr(10).join(J)}
}})();</script>
</div></body></html>'''
open(f'{work}/public/index.html', 'w').write(doc)
json.dump([{'ini': round(c['s'], 2), 'fin': round(c['e'], 2), 'texto': ' '.join(t for t, _ in c['w'])} for c in caps], open(f'{work}/subtitulos.json', 'w'), ensure_ascii=False, indent=1)
print(len(caps), 'subtítulos →', f'{work}/public/index.html')
