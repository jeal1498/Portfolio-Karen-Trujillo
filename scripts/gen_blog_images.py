#!/usr/bin/env python3
"""
Generate branded SVG images replacing all placehold.co URLs in blog articles.
Saves SVGs to /public/blog/ and rewrites src attributes in TSX files.
"""
import re
import os
import urllib.parse
import xml.sax.saxutils as saxutils

SRC_DIR = '/home/user/Portfolio-Karen-Trujillo/src'
OUT_DIR = '/home/user/Portfolio-Karen-Trujillo/public/blog'
os.makedirs(OUT_DIR, exist_ok=True)

COLOR_NAMES = {
    '382f51': 'dark',
    'd0d0e7': 'lavender',
    'f5dfc5': 'sand',
    'fbdbe0': 'blush',
}

def lighten(hex_color, amount=0.12):
    """Return a slightly lighter hex color for gradient effect."""
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    r = min(255, int(r + (255 - r) * amount))
    g = min(255, int(g + (255 - g) * amount))
    b = min(255, int(b + (255 - b) * amount))
    return f'{r:02x}{g:02x}{b:02x}'

def slugify(text):
    import unicodedata
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text[:50]

def make_svg(width, height, bg, fg, title):
    w, h = int(width), int(height)
    bg_light = lighten(bg)
    escaped_title = saxutils.escape(title)

    # Font size scales with image size
    base = w / 20
    font_size = max(18, min(int(base), 52))
    sub_size = max(11, int(font_size * 0.45))

    # Wrap long titles (split at spaces near midpoint)
    words = title.split()
    if len(words) > 4 and len(title) > 22:
        mid = len(words) // 2
        line1 = saxutils.escape(' '.join(words[:mid]))
        line2 = saxutils.escape(' '.join(words[mid:]))
        title_lines = f'''
    <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle"
          font-family="Georgia, 'Playfair Display', serif" font-size="{font_size}"
          font-weight="bold" fill="#{fg}" opacity="0.92">{line1}</text>
    <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle"
          font-family="Georgia, 'Playfair Display', serif" font-size="{font_size}"
          font-weight="bold" fill="#{fg}" opacity="0.92">{line2}</text>'''
        sub_y = "72%"
    else:
        title_lines = f'''
    <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle"
          font-family="Georgia, 'Playfair Display', serif" font-size="{font_size}"
          font-weight="bold" fill="#{fg}" opacity="0.92">{escaped_title}</text>'''
        sub_y = "65%"

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{escaped_title}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#{bg_light}" />
      <stop offset="100%" stop-color="#{bg}" />
    </linearGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#bg)"/>
  <rect x="0" y="{h - 4}" width="{w}" height="4" fill="#{fg}" opacity="0.20"/>
  <rect x="0" y="0" width="6" height="{h}" fill="#{fg}" opacity="0.15"/>
  {title_lines}
  <text x="50%" y="{sub_y}" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="{sub_size}"
        fill="#{fg}" opacity="0.50" letter-spacing="1">Neuropsicóloga Karen Trujillo · Cancún</text>
</svg>'''

PLACEHOLDER_RE = re.compile(
    r'https://placehold\.co/(\d+)x(\d+)/([0-9a-fA-F]{6})/([0-9a-fA-F]{6})\?text=([^"\')\s]+)'
)

url_to_path = {}  # cache url → /blog/filename.svg

def process_url(match):
    url = match.group(0)
    if url in url_to_path:
        return url_to_path[url]

    width, height, bg, fg, text_raw = match.groups()
    text = urllib.parse.unquote_plus(text_raw)

    color_name = COLOR_NAMES.get(bg.lower(), bg.lower())
    filename = f'{color_name}-{slugify(text)}-{width}x{height}.svg'
    out_path = os.path.join(OUT_DIR, filename)

    svg = make_svg(width, height, bg.lower(), fg.lower(), text)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(svg)

    public_path = f'/blog/{filename}'
    url_to_path[url] = public_path
    return public_path

tsx_files = []
for root, dirs, files in os.walk(SRC_DIR):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for fname in files:
        if fname.endswith('.tsx') or fname.endswith('.ts'):
            tsx_files.append(os.path.join(root, fname))

changed = []
for fpath in tsx_files:
    with open(fpath, encoding='utf-8') as f:
        original = f.read()

    if 'placehold.co' not in original:
        continue

    updated = PLACEHOLDER_RE.sub(lambda m: process_url(m), original)

    if updated != original:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(updated)
        changed.append(fpath.replace(SRC_DIR + '/', ''))

print(f'Generated {len(url_to_path)} SVG files in public/blog/')
print(f'Updated {len(changed)} source files:')
for f in changed:
    print(f'  {f}')

# Verify
remaining = 0
for fpath in tsx_files:
    with open(fpath) as f:
        if 'placehold.co' in f.read():
            remaining += 1
print(f'Remaining placehold.co references: {remaining} files')
