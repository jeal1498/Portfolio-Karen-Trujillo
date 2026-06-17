/**
 * Datos de identidad del negocio — única fuente de verdad.
 * Usados en JSON-LD (schema.org), meta tags (canonical/OG) y texto visible.
 * Cambiar aquí se propaga a todo el sitio.
 */

/** Dominio canónico, sin barra final. Base para canonical, OG, @id e imágenes. */
export const SITE_URL = 'https://www.psicologakarentrujillo.com.mx';

/** Cédula profesional federal de Karen Trujillo (SEP). */
export const CEDULA = '11009616';

/** Ruta relativa de la foto de Karen (para <img src>). */
export const KAREN_IMAGE_PATH = '/Psicologa_Karen_Trujillo.webp';

/** URL absoluta de la foto de Karen (para schema image, OG y Twitter). */
export const KAREN_IMAGE = `${SITE_URL}${KAREN_IMAGE_PATH}`;

/** Dirección postal del consultorio (campos de PostalAddress en schema.org). */
export const ADDRESS = {
  streetAddress: 'SM200 M49 L2, Hacienda de Chinconcuac, Circuito casa 1587B',
  addressLocality: 'Cancún',
  addressRegion: 'Quintana Roo',
  postalCode: '77539',
  addressCountry: 'MX',
} as const;

/** Coordenadas GPS del consultorio (del pin verificado en GBP). */
export const GEO = { latitude: 21.1530418, longitude: -86.8958544 } as const;

/** Horarios de atención. Fuente única para UI y schema OpeningHoursSpecification. */
export const HOURS = {
  weekdays: { opens: '09:00', closes: '19:00', display: '9:00 AM – 7:00 PM' },
  saturday: { opens: '09:00', closes: '14:00', display: '9:00 AM – 2:00 PM' },
} as const;

/** Calificación agregada (Google). Valores como string para JSON-LD. */
export const REVIEWS = {
  ratingValue: '5.0',
  reviewCount: '47',
} as const;
