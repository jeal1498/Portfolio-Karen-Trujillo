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
  streetAddress: 'SM200 M49 L2, Hacienda de Chinconcuac',
  addressLocality: 'Cancún',
  addressRegion: 'Quintana Roo',
  postalCode: '77539',
  addressCountry: 'MX',
} as const;

/** Calificación agregada (Google). Valores como string para JSON-LD. */
export const REVIEWS = {
  ratingValue: '5.0',
  reviewCount: '47',
} as const;
