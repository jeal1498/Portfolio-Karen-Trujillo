#!/usr/bin/env python3
"""Transcribe en español con marcas de tiempo por palabra → words.json.
Uso: python3 transcribir.py <video> <words.json>
Truco: faster-whisper falla al abrir el audio (error 'metadata_errors' de la librería av),
así que se decodifica con ffmpeg y se le pasa el arreglo ya listo."""
import sys, json, subprocess, numpy as np
try:
    from faster_whisper import WhisperModel
except ImportError:
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-q', '-U', 'huggingface_hub', 'faster-whisper'], check=True)
    from faster_whisper import WhisperModel
video, out = sys.argv[1], sys.argv[2]
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-vn', '-f', 'f32le', '-ac', '1', '-ar', '16000', '-'], capture_output=True).stdout
audio = np.frombuffer(raw, dtype=np.float32)
m = WhisperModel('medium', compute_type='int8')   # 'small' falla más en palabras clínicas
seg, _ = m.transcribe(audio, language='es', word_timestamps=True,
                      initial_prompt='Consejos de una neuropsicóloga: TDAH, autismo, atención, pendientes, evaluación.')
words = [{'t': w.word.strip(), 's': round(w.start, 2), 'e': round(w.end, 2)} for s in seg for w in s.words]
json.dump(words, open(out, 'w'), ensure_ascii=False)
print(' '.join(f"{w['t']}[{w['s']}]" for w in words))
