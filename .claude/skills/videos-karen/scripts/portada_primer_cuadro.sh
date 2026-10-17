#!/bin/bash
# Pone la portada como primer cuadro del video (0.2 s) para que TikTok, Instagram, YouTube Shorts y Facebook la tomen de portada.
# Uso: portada_primer_cuadro.sh <video.mp4> <portada.png|jpg> <salida.mp4>
# Toma los cuadros por segundo del video, así que sirve con el video ligero y con el master.
set -e
V="$1"; P="$2"; O="$3"
FPS=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$V")
ffmpeg -y -loglevel error -loop 1 -framerate "$FPS" -t 0.2 -i "$P" -f lavfi -t 0.2 -i anullsrc=r=48000:cl=stereo -i "$V" \
  -filter_complex "[0:v]scale=1080:1920,format=yuv420p,setsar=1[a];[2:v]format=yuv420p,setsar=1[b];[1:a]aresample=48000[s];[2:a]aresample=48000,aformat=channel_layouts=stereo[v2];[a][s][b][v2]concat=n=2:v=1:a=1[v][au]" \
  -map "[v]" -map "[au]" -r "$FPS" -c:v libx264 -preset medium -crf 18 -c:a aac -b:a 192k -movflags +faststart "$O"
