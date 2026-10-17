#!/usr/bin/env python3
"""Regla de los tercios para los ojos de Karen (encuadre FIJO, sin seguimiento).
Uso: python3 encuadre.py <trabajo>
Lee <trabajo>/public/input-video.mp4 (1080x1920, de preparar.sh), mide dónde están sus ojos (mediana del video),
y recorta con un zoom fijo para que queden sobre la línea del tercio superior y centrados.
El original se guarda en <trabajo>/input-video-orig.mp4 (idempotente: si ya existe, parte de él).
Dependencias (una vez): pip install mediapipe opencv-python-headless; apt-get install -y libegl1 libgles2 libgl1"""
import sys, os, subprocess, shutil, urllib.request
import numpy as np, cv2, mediapipe as mp
from mediapipe.tasks import python as mpp
from mediapipe.tasks.python import vision
ZOOM = 1.15                                  # fijo; subir solo si hace falta
W_OUT, H_OUT = 1080, 1920
work = sys.argv[1]; pub = f'{work}/public/input-video.mp4'; orig = f'{work}/input-video-orig.mp4'
if not os.path.exists(orig): shutil.move(pub, orig)
MODEL = '/tmp/face_landmarker.task'
if not os.path.exists(MODEL):
    urllib.request.urlretrieve('https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task', MODEL)
lm = vision.FaceLandmarker.create_from_options(vision.FaceLandmarkerOptions(
    base_options=mpp.BaseOptions(model_asset_path=MODEL), running_mode=vision.RunningMode.IMAGE, num_faces=1))
cap = cv2.VideoCapture(orig); E = []; i = 0
while True:
    ok, f = cap.read()
    if not ok: break
    if i % 3 == 0:                           # una de cada 3 cuadros basta
        r = lm.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(f, cv2.COLOR_BGR2RGB)))
        if r.face_landmarks:                 # 468 y 473 = centros de los iris
            p = r.face_landmarks[0]; E.append(((p[468].x + p[473].x) / 2 * W_OUT, (p[468].y + p[473].y) / 2 * H_OUT))
    i += 1
if len(E) < 30: sys.exit('No se detectó la cara: dejar el encuadre original (renombrar input-video-orig.mp4).')
ex, ey = np.median(np.array(E), 0)
cw, ch = W_OUT / ZOOM, H_OUT / ZOOM
x0 = min(max(ex - (W_OUT / 2) / ZOOM, 0), W_OUT - cw)          # ojos al centro horizontal
y0 = min(max(ey - (H_OUT / 3) / ZOOM, 0), H_OUT - ch)          # ojos en la línea del tercio superior
print(f'ojos ({ex:.0f},{ey:.0f}) → recorte {cw:.0f}x{ch:.0f} en ({x0:.0f},{y0:.0f}); caras {len(E)}')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', orig, '-vf', f'crop={cw:.0f}:{ch:.0f}:{x0:.0f}:{y0:.0f},scale={W_OUT}:{H_OUT}:flags=lanczos',
    '-c:v', 'libx264', '-crf', '17', '-g', '30', '-keyint_min', '30', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', pub], check=True)
os.system(f'ffmpeg -v error -y -ss 20 -i "{pub}" -frames:v 1 -vf "scale=540:-1,drawgrid=w=iw/3:h=ih/3:t=1:c=yellow" "{work}/tercios.png"')
print(f'Revisar {work}/tercios.png: los ojos deben quedar sobre la línea horizontal superior.')
