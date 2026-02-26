/**
 * Updates all critical <head> meta tags for a given route.
 * Returns a cleanup function that restores the homepage defaults.
 */

interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
}

const HOME_DEFAULTS = {
  title: 'Valoración TDAH y Autismo en Cancún | Neuropsicóloga Karen Trujillo — Neuropsicóloga',
  description: 'Evaluación neuropsicológica de TDAH (niños y adultos) y Autismo en Cancún. Diagnóstico con instrumentos estandarizados (CONNERS, WISC-V, ADOS-2). Informe clínico con cédula 11009616.',
  canonical: 'https://psicologakarentrujillo.com.mx',
  ogTitle: 'Valoración TDAH y Autismo en Cancún | Neuropsicóloga Karen Trujillo',
  ogDescription: 'Diagnóstico neuropsicológico especializado de TDAH y Autismo en Cancún. Instrumentos estandarizados. Informe con cédula 11009616.',
};

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    if (selector.startsWith('link')) {
      el = document.createElement('link') as HTMLLinkElement;
      const parts = selector.match(/\[([^\]]+)="([^\]]+)"\]/g) || [];
      parts.forEach(p => {
        const [k, v] = p.replace(/[\[\]]/g, '').split('=');
        el!.setAttribute(k, v.replace(/"/g, ''));
      });
    } else {
      el = document.createElement('meta') as HTMLMetaElement;
      const parts = selector.match(/\[([^\]]+)="([^\]]+)"\]/g) || [];
      parts.forEach(p => {
        const [k, v] = p.replace(/[\[\]]/g, '').split('=');
        el!.setAttribute(k, v.replace(/"/g, ''));
      });
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function applySeo(meta: SeoMeta): () => void {
  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description;

  document.title = meta.title;
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('link[rel="canonical"]', 'href', meta.canonical);
  setMeta('meta[property="og:title"]', 'content', ogTitle);
  setMeta('meta[property="og:description"]', 'content', ogDescription);
  setMeta('meta[property="og:url"]', 'content', meta.canonical);
  setMeta('meta[name="twitter:title"]', 'content', ogTitle);
  setMeta('meta[name="twitter:description"]', 'content', ogDescription);

  // Cleanup: restore homepage defaults
  return () => {
    document.title = HOME_DEFAULTS.title;
    setMeta('meta[name="description"]', 'content', HOME_DEFAULTS.description);
    setMeta('link[rel="canonical"]', 'href', HOME_DEFAULTS.canonical);
    setMeta('meta[property="og:title"]', 'content', HOME_DEFAULTS.ogTitle);
    setMeta('meta[property="og:description"]', 'content', HOME_DEFAULTS.ogDescription);
    setMeta('meta[property="og:url"]', 'content', HOME_DEFAULTS.canonical);
    setMeta('meta[name="twitter:title"]', 'content', HOME_DEFAULTS.ogTitle);
    setMeta('meta[name="twitter:description"]', 'content', HOME_DEFAULTS.ogDescription);
  };
}

export function injectSchema(id: string, data: object): () => void {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
  return () => document.getElementById(id)?.remove();
}
