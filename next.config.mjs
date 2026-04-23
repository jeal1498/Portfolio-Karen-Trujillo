/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // ── Forzar www (sin www → con www) ──────────────────────────────────────
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'psicologakarentrujillo.com.mx' }],
        destination: 'https://www.psicologakarentrujillo.com.mx/:path*',
        permanent: true,
      },

      // ── Páginas antiguas eliminadas ──────────────────────────────────────────
      { source: '/tdah',    destination: '/evaluacion-tdah-ninos',     permanent: true },
      { source: '/tdah/',   destination: '/evaluacion-tdah-ninos',     permanent: true },
      { source: '/autismo', destination: '/evaluacion-autismo-cancun', permanent: true },
      { source: '/autismo/', destination: '/evaluacion-autismo-cancun', permanent: true },

      // ── Slugs anteriores en PascalCase ───────────────────────────────────────
      { source: '/TDAHAdultos',                    destination: '/evaluacion-tdah-adultos',               permanent: true },
      { source: '/TDAHNinos',                      destination: '/evaluacion-tdah-ninos',                 permanent: true },
      { source: '/AutismoCancun',                  destination: '/evaluacion-autismo-cancun',             permanent: true },
      { source: '/blog/TDAHNinas',                 destination: '/blog/tdah-en-ninas-sintomas',           permanent: true },
      { source: '/blog/CostoValoracionTDAH',       destination: '/blog/cuanto-cuesta-valoracion-tdah-cancun', permanent: true },
      { source: '/blog/CuantoCuestaValoracionTDAH', destination: '/blog/cuanto-cuesta-valoracion-tdah-cancun', permanent: true },

      // ── Página eliminada sin sustituto directo ───────────────────────────────
      { source: '/blog/AdecuacionesEscolares', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
