/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/TDAHAdultos',                       destination: '/evaluacion-tdah-adultos',               permanent: true },
      { source: '/TDAHNinos',                          destination: '/evaluacion-tdah-ninos',                 permanent: true },
      { source: '/AutismoCancun',                      destination: '/evaluacion-autismo-cancun',             permanent: true },
      { source: '/blog/TDAHNinas',                     destination: '/blog/tdah-en-ninas-sintomas',           permanent: true },
      { source: '/blog/CostoValoracionTDAH',           destination: '/blog/cuanto-cuesta-valoracion-tdah-cancun', permanent: true },
      { source: '/blog/CuantoCuestaValoracionTDAH',    destination: '/blog/cuanto-cuesta-valoracion-tdah-cancun', permanent: true },
      { source: '/blog/AdecuacionesEscolares',         destination: '/',                                     permanent: false },
    ];
  },
};

export default nextConfig;
