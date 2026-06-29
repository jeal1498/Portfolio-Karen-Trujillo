import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../public');

const W = 1200;
const H = 630;

// Brandbook palette
const PLUM    = '#433860';
const PLUM_LT = '#574a72';
const LAV     = '#c6bce2';
const LAV_LT  = '#cdc4e6';
const BLUSH   = '#f9dee3';
const SAND    = '#f5e7d6';
const WHITE   = '#ffffff';
const INK2    = '#515e71';

const PAGES = [
  {
    file: 'og-homepage.png',
    bg: [PLUM_LT, PLUM],
    label: 'NEUROPSICÓLOGA EN CANCÚN',
    title: 'Valoración TDAH\ny Autismo',
    sub: 'Diagnóstico con instrumentos estandarizados · Cédula 11009616',
    accent: LAV,
    dark: true,
  },
  {
    file: 'og-tdah-ninos.png',
    bg: [LAV_LT, LAV],
    label: 'EVALUACIÓN TDAH INFANTIL',
    title: 'TDAH en Niños\ny Adolescentes',
    sub: 'CONNERS-3 · WISC-V · BRIEF-2 · CPT-3 · Edades 5–17 años',
    accent: PLUM,
    dark: false,
  },
  {
    file: 'og-tdah-adultos.png',
    bg: [PLUM_LT, PLUM],
    label: 'EVALUACIÓN TDAH ADULTOS',
    title: 'TDAH en Adultos\n+18 años',
    sub: 'CAARS-2 · WAIS-IV · BRIEF-A · Diagnóstico para adultos',
    accent: LAV,
    dark: true,
  },
  {
    file: 'og-autismo.png',
    bg: [BLUSH, '#f0d0d8'],
    label: 'EVALUACIÓN TEA · AUTISMO',
    title: 'Diagnóstico\nde Autismo',
    sub: 'ADOS-2 · WISC-V · Vineland-3 · Protocolo especializado TEA',
    accent: PLUM,
    dark: false,
  },
  {
    file: 'og-neuropsicologia-cancun.png',
    bg: [PLUM_LT, PLUM],
    label: 'NEUROPSICOLOGÍA EN CANCÚN',
    title: 'Neuropsicóloga\nClínica Cancún',
    sub: 'Evaluación neuropsicológica especializada · Karen Trujillo',
    accent: LAV,
    dark: true,
  },
  {
    file: 'og-zona-hotelera.png',
    bg: [LAV_LT, LAV],
    label: 'ZONA HOTELERA · CANCÚN',
    title: 'Neuropsicóloga\nZona Hotelera',
    sub: 'Consulta neuropsicológica · Cancún · TDAH y Autismo',
    accent: PLUM,
    dark: false,
  },
  {
    file: 'og-para-escuelas.png',
    bg: [SAND, '#eeddc8'],
    label: 'APOYO A INSTITUCIONES',
    title: 'Neuropsicología\npara Escuelas',
    sub: 'Evaluaciones para instituciones educativas · Cancún',
    accent: PLUM,
    dark: false,
  },
  {
    file: 'og-precios.png',
    bg: [PLUM_LT, PLUM],
    label: 'HONORARIOS Y PRECIOS',
    title: 'Costos de\nEvaluación',
    sub: 'Valoración TDAH y Autismo · Planes de pago disponibles',
    accent: LAV,
    dark: true,
  },
  {
    file: 'og-chetumal.png',
    bg: [LAV_LT, LAV],
    label: 'CHETUMAL · QUINTANA ROO',
    title: 'Valoración\nen Chetumal',
    sub: 'Evaluación neuropsicológica · TDAH y Autismo · Chetumal',
    accent: PLUM,
    dark: false,
  },
];

function buildSvg({ bg, label, title, sub, accent, dark }) {
  const textColor  = dark ? WHITE   : PLUM;
  const labelColor = dark ? LAV     : INK2;
  const subColor   = dark ? `${WHITE}cc` : INK2;
  const [bg0, bg1] = bg;

  const lines = title.split('\n');
  const titleY1 = lines.length === 2 ? 290 : 330;
  const titleY2 = titleY1 + 82;

  const dandelionX = 920;
  const dandelionY = 200;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg0}"/>
      <stop offset="100%" stop-color="${bg1}"/>
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${bg1}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${bg1}" stop-opacity="0.35"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#overlay)"/>

  <!-- Left accent bar -->
  <rect x="64" y="80" width="4" height="470" rx="2" fill="${accent}" opacity="0.5"/>

  <!-- Label -->
  <text x="92" y="136"
    font-family="'Outfit', 'Helvetica Neue', sans-serif"
    font-size="18" font-weight="700" letter-spacing="3"
    fill="${labelColor}" opacity="0.9">${label}</text>

  <!-- Title line 1 -->
  <text x="92" y="${titleY1}"
    font-family="'Outfit', 'Helvetica Neue', sans-serif"
    font-size="76" font-weight="700" letter-spacing="-1"
    fill="${textColor}">${lines[0]}</text>

  ${lines[1] ? `<!-- Title line 2 -->
  <text x="92" y="${titleY2}"
    font-family="'Outfit', 'Helvetica Neue', sans-serif"
    font-size="76" font-weight="700" letter-spacing="-1"
    fill="${textColor}">${lines[1]}</text>` : ''}

  <!-- Subtitle -->
  <text x="92" y="${lines[1] ? titleY2 + 64 : titleY1 + 64}"
    font-family="'Maven Pro', 'Helvetica Neue', sans-serif"
    font-size="22" font-weight="400"
    fill="${subColor}">${sub}</text>

  <!-- Dandelion illustration (decorative) -->
  <g transform="translate(${dandelionX}, ${dandelionY})" opacity="0.18">
    <!-- Stem -->
    <line x1="80" y1="340" x2="80" y2="120" stroke="${textColor}" stroke-width="3" stroke-linecap="round"/>
    <!-- Center -->
    <circle cx="80" cy="115" r="6" fill="${textColor}"/>
    <!-- Rays -->
    <g stroke="${textColor}" stroke-width="2.5" stroke-linecap="round">
      <line x1="80" y1="109" x2="80" y2="70"/>
      <line x1="80" y1="121" x2="80" y2="160"/>
      <line x1="74" y1="111" x2="45" y2="82"/>
      <line x1="86" y1="111" x2="115" y2="82"/>
      <line x1="72" y1="115" x2="33" y2="112"/>
      <line x1="88" y1="115" x2="127" y2="112"/>
      <line x1="74" y1="119" x2="45" y2="148"/>
      <line x1="86" y1="119" x2="115" y2="148"/>
    </g>
    <!-- Seed tips -->
    <g fill="${textColor}">
      <circle cx="80" cy="68" r="4"/>
      <circle cx="43" cy="80" r="3.5"/>
      <circle cx="117" cy="80" r="3.5"/>
      <circle cx="31" cy="112" r="3.5"/>
      <circle cx="129" cy="112" r="3.5"/>
      <circle cx="43" cy="150" r="3.5"/>
      <circle cx="117" cy="150" r="3.5"/>
      <circle cx="80" cy="162" r="3.5"/>
    </g>
    <!-- Floating seeds -->
    <g fill="${textColor}" opacity="0.6">
      <circle cx="150" cy="50" r="2.5"/>
      <circle cx="180" cy="30" r="2"/>
      <circle cx="200" cy="70" r="2"/>
      <circle cx="-20" cy="60" r="2"/>
      <circle cx="-40" cy="95" r="2.5"/>
    </g>
  </g>

  <!-- Bottom bar: branding -->
  <rect x="0" y="${H - 80}" width="${W}" height="80" fill="${bg1}" opacity="0.6"/>
  <text x="92" y="${H - 30}"
    font-family="'Outfit', 'Helvetica Neue', sans-serif"
    font-size="20" font-weight="700" letter-spacing="0.5"
    fill="${textColor}" opacity="0.9">Karen Trujillo · Neuropsicóloga Clínica · Cancún</text>
  <text x="${W - 92}" y="${H - 30}" text-anchor="end"
    font-family="'Maven Pro', 'Helvetica Neue', sans-serif"
    font-size="18" font-weight="400"
    fill="${textColor}" opacity="0.6">psicologakarentrujillo.com.mx</text>
</svg>`;
}

async function generateAll() {
  for (const page of PAGES) {
    const svg = buildSvg(page);
    const svgBuf = Buffer.from(svg);
    const outPath = join(OUT, page.file);
    await sharp(svgBuf)
      .resize(W, H)
      .png({ quality: 90 })
      .toFile(outPath);
    console.log(`✓ ${page.file}`);
  }
  console.log('\nDone — 9 OG images generated.');
}

generateAll().catch(console.error);
