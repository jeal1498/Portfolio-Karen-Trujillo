import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, MessageCircle,
  MapPin, Clock, ChevronDown, Car,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WA_NUMBER, PHONE_E164 } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE, ADDRESS, REVIEWS, GEO } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const CANONICAL_URL = `${SITE_URL}/neuropsicologia-zona-hotelera-cancun`;
const WA = `https://wa.me/${WA_NUMBER}?text=Hola%20Karen%2C%20me%20interesa%20la%20evaluaci%C3%B3n%20neuropsicol%C3%B3gica%20y%20vengo%20desde%20fuera%20de%20Canc%C3%BAn`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const ciudades = [
  {
    ciudad: 'Zona Hotelera, Cancún',
    distancia: '15–25 min en coche',
    nota: 'El consultorio está en SM200, a 20 minutos del Hotel Zone. Fácil acceso desde el bulevar Kukulcán.',
  },
  {
    ciudad: 'Playa del Carmen',
    distancia: '~60 min por la 307',
    nota: 'La evaluación se divide en 4-6 sesiones a lo largo de 2-4 semanas. Muchas familias de PDC coordinan 2 sesiones por visita.',
  },
  {
    ciudad: 'Tulum',
    distancia: '~90 min por la 307',
    nota: 'Pacientes de Tulum frecuentemente combinan la sesión con otras gestiones en Cancún o se hospedan una noche.',
  },
  {
    ciudad: 'Mérida',
    distancia: '~3 hrs por carretera',
    nota: 'Cancún tiene especialistas con instrumentos como el ADOS-2 que no siempre están disponibles en otras ciudades. Varias familias de Mérida han realizado evaluaciones con Karen.',
  },
  {
    ciudad: 'Isla Mujeres / Holbox',
    distancia: 'Ferry + traslado',
    nota: 'Coordinar las sesiones durante viajes programados a Cancún hace el proceso más manejable. Karen ayuda a organizar el calendario con flexibilidad.',
  },
];

const logistica = [
  {
    titulo: '¿Cuántas veces hay que venir a Cancún?',
    contenido:
      'La evaluación requiere entre 4 y 6 sesiones presenciales de 60–90 minutos cada una, distribuidas en 2–4 semanas. Los cuestionarios para padres o maestros se completan de forma remota, sin necesidad de visita adicional.',
  },
  {
    titulo: '¿Se pueden agrupar sesiones en el mismo día?',
    contenido:
      'Para pacientes que viajan desde fuera, Karen evalúa la posibilidad de programar una sesión en la mañana y otra en la tarde del mismo día — cuando la edad y el tipo de evaluación lo permiten. Se analiza caso por caso.',
  },
  {
    titulo: '¿Hay sesiones remotas disponibles?',
    contenido:
      'La aplicación de pruebas estandarizadas es presencial. Sin embargo, la entrevista inicial preliminar y la sesión de devolución final pueden realizarse por videollamada, reduciendo el número de viajes necesarios.',
  },
  {
    titulo: '¿Vale la pena venir desde lejos?',
    contenido:
      'El ADOS-2, el estándar de oro para diagnóstico de autismo, requiere evaluadores certificados que no son comunes en todas las ciudades. Lo mismo aplica para el WISC-V, CONNERS-3 y otros instrumentos que Karen utiliza. El diagnóstico obtenido aquí tiene la misma validez que en cualquier clínica de CDMX o Monterrey.',
  },
];

const serviciosConPrecio = [
  {
    nombre: 'Valoración TDAH Infantil',
    edad: '5–17 años',
    precio: '$8,300 MXN',
    href: '/evaluacion-tdah-ninos',
  },
  {
    nombre: 'Valoración TDAH Adultos',
    edad: '18+ años',
    precio: '$8,300 MXN',
    href: '/evaluacion-tdah-adultos',
  },
  {
    nombre: 'Diagnóstico Autismo / TEA',
    edad: 'Niños y adolescentes',
    precio: '$8,500 MXN',
    href: '/evaluacion-autismo-cancun',
  },
];

const faqItems = [
  {
    q: '¿Atiende pacientes que vienen de Playa del Carmen, Tulum o Mérida?',
    a: 'Sí. La neuropsicóloga Karen Trujillo atiende pacientes de toda la Riviera Maya y la Península de Yucatán que viajan a Cancún para la evaluación. El proceso se organiza de forma que los viajes sean lo más eficientes posible para las familias.',
  },
  {
    q: '¿Puedo hacer la primera consulta por videollamada antes de viajar?',
    a: 'Sí. La entrevista inicial preliminar puede realizarse por videollamada para revisar el motivo de consulta, aclarar dudas sobre el proceso y confirmar que la evaluación es adecuada para el caso antes de coordinar las sesiones presenciales en Cancún.',
  },
  {
    q: '¿Cuántos viajes a Cancún son necesarios?',
    a: 'Depende del tipo de evaluación y de la posibilidad de agrupar sesiones. En general, entre 3 y 5 visitas de entre 1 y 2 horas cada una, distribuidas en 2–4 semanas. Para pacientes que viajan desde lejos, se evalúa la posibilidad de hacer 2 sesiones en un mismo día cuando el caso lo permite.',
  },
  {
    q: '¿Dónde está el consultorio en Cancún?',
    a: 'El consultorio está ubicado en SM200 M49 L2, Hacienda de Chinconcuac, Cancún, Quintana Roo (CP 77539). Está a aproximadamente 20 minutos de la Zona Hotelera y tiene estacionamiento disponible. Karen comparte ubicación exacta por WhatsApp al confirmar la primera cita.',
  },
  {
    q: '¿El informe es válido en toda la República Mexicana?',
    a: `Sí. El informe neuropsicológico emitido por la psic. Karen Trujillo (cédula federal ${CEDULA}) tiene validez oficial en toda la República Mexicana ante escuelas, SEP, IMSS, ISSSTE, y empleadores.`,
  },
  {
    q: '¿Por qué no hay más neuropsicólogos con ADOS-2 en la Riviera Maya?',
    a: 'El ADOS-2 requiere capacitación certificada específica y materiales propietarios de alto costo. Es el instrumento de diagnóstico de autismo más riguroso del mundo, y su disponibilidad fuera de las ciudades principales de México es limitada. Eso explica por qué familias de Playa del Carmen, Tulum y otras ciudades eligen viajar a Cancún para obtener este tipo de evaluación.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON
   ═══════════════════════════════════════════════════════════════ */
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LandingPage',
      '@id': `${CANONICAL_URL}/#page`,
      name: 'Neuropsicóloga para la Zona Hotelera y Riviera Maya — Karen Trujillo',
      description: `Evaluaciones neuropsicológicas de TDAH y autismo en Cancún para pacientes de la Zona Hotelera, Playa del Carmen, Tulum y Riviera Maya. Karen Trujillo, cédula ${CEDULA}.`,
      url: CANONICAL_URL,
      inLanguage: 'es-MX',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#logistica', '#ciudades', '#preguntas-frecuentes'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Neuropsicóloga Zona Hotelera y Riviera Maya',
          item: CANONICAL_URL,
        },
      ],
    },
    {
      '@type': ['MedicalBusiness', 'MedicalClinic'],
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'Karen Trujillo — Neuropsicóloga Clínica en Cancún',
      image: KAREN_IMAGE,
      telephone: PHONE_E164,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: GEO.latitude,
        longitude: GEO.longitude,
      },
      hasMap: 'https://maps.google.com/?cid=4630406520710891531',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        ...ADDRESS,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '19:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '09:00',
          closes: '14:00',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
        { '@type': 'City', name: 'Zona Hotelera de Cancún' },
        { '@type': 'City', name: 'Playa del Carmen', sameAs: 'https://www.wikidata.org/wiki/Q731635' },
        { '@type': 'City', name: 'Tulum', sameAs: 'https://www.wikidata.org/wiki/Q1061862' },
        { '@type': 'City', name: 'Mérida', sameAs: 'https://www.wikidata.org/wiki/Q82010' },
        { '@type': 'City', name: 'Isla Mujeres' },
        { '@type': 'City', name: 'Holbox' },
        { '@type': 'AdministrativeArea', name: 'Riviera Maya' },
        { '@type': 'State', name: 'Quintana Roo', sameAs: 'https://www.wikidata.org/wiki/Q10507' },
        { '@type': 'State', name: 'Yucatán', sameAs: 'https://www.wikidata.org/wiki/Q3798' },
      ],
      priceRange: '$8,300–$8,500 MXN',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: REVIEWS.ratingValue,
        reviewCount: REVIEWS.reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function NeuropsicologiaZonaHoteleraCancun() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Neuropsicóloga para Zona Hotelera y Riviera Maya | Karen Trujillo Cancún</title>
        <meta
          name="description"
          content={`Evaluaciones neuropsicológicas de TDAH y autismo en Cancún para familias de la Zona Hotelera, Playa del Carmen, Tulum y Mérida. ADOS-2, WISC-V, CONNERS-3. Karen Trujillo, cédula ${CEDULA}.`}
        />
        <link
          rel="canonical"
          href={CANONICAL_URL}
        />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content={`${GEO.latitude};${GEO.longitude}`} />
        <meta name="ICBM" content={`${GEO.latitude}, ${GEO.longitude}`} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta
          property="og:title"
          content="Neuropsicóloga para Zona Hotelera y Riviera Maya | Karen Trujillo Cancún"
        />
        <meta
          property="og:description"
          content={`Evaluaciones neuropsicológicas de TDAH y autismo en Cancún para familias de la Zona Hotelera, Playa del Carmen, Tulum y Mérida. ADOS-2, WISC-V, CONNERS-3. Karen Trujillo, cédula ${CEDULA}.`}
        />
        <meta
          property="og:url"
          content={CANONICAL_URL}
        />
        <meta
          property="og:image"
          content={KAREN_IMAGE}
        />
        <meta property="og:image:width" content="465" />
        <meta property="og:image:height" content="533" />
        <meta property="og:image:alt" content="Neuropsicóloga Karen Trujillo — Especialista en TDAH y Autismo en Cancún" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Neuropsicóloga para Zona Hotelera y Riviera Maya | Karen Trujillo Cancún"
        />
        <meta
          name="twitter:description"
          content={`Evaluaciones neuropsicológicas de TDAH y autismo en Cancún para familias de la Zona Hotelera, Playa del Carmen, Tulum y Mérida. Karen Trujillo, cédula ${CEDULA}.`}
        />
        <meta name="twitter:image" content={KAREN_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `,
          }}
        />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              1 · HERO
              ══════════════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-36 pb-16 px-6 overflow-hidden" style={{ background: '#2b1f47' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />

            <div className="max-w-4xl mx-auto relative z-10 text-center">

              <nav aria-label="Breadcrumb" className="mb-6 animate-[fadeIn_0.6s_ease-out_both]">
                <ol className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(208,208,231,0.6)' }}>
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Inicio
                    </Link>
                  </li>
                  <li style={{ color: 'rgba(208,208,231,0.3)' }}>/</li>
                  <li className="text-white font-medium">Neuropsicóloga Zona Hotelera y Riviera Maya</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 max-w-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(208,208,231,0.18)' }}>
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-sm shadow-success shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-center leading-snug" style={{ color: 'rgba(208,208,231,0.8)' }}>
                    Riviera Maya · Quintana Roo
                  </span>
                </div>

                <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6 text-balance">
                  Neuropsicóloga para la Zona Hotelera y Riviera Maya
                </h1>

                <p className="text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Si estás en Playa del Carmen, Tulum, la Zona Hotelera o cualquier ciudad de la Riviera Maya — la
                  evaluación neuropsicológica de Karen Trujillo en Cancún está a{' '}
                  <strong className="text-white font-semibold">
                    menos distancia de lo que crees.
                  </strong>
                </p>
              </div>

              <div className="animate-[fadeInUp_0.8s_ease-out_0.3s_both] flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  Coordinar desde mi ciudad
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  href="/evaluacion-autismo-cancun"
                  className="group inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-wide px-6 py-4 rounded-xl border-2 border-white/30 text-white/85 hover:bg-white/10 transition-all duration-300"
                >
                  Ver evaluación de autismo (ADOS-2)
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · CIUDADES
              ══════════════════════════════════════════════════════ */}
          <section id="ciudades" className="py-14 sm:py-20 bg-card scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Distancias desde tu ciudad
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  ¿Vale la pena el viaje desde tu ciudad?
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  El consultorio de Karen está ubicado en SM200, Cancún. Aquí tienes una referencia de
                  tiempos de viaje desde los principales puntos de la Riviera Maya.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ciudades.map((item, i) => (
                  <SectionReveal key={item.ciudad} delay={i * 0.08}>
                    <div className="flex flex-col gap-4 p-5 bg-secondary border border-border rounded-2xl hover:border-accent-blue/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group h-full">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                          <MapPin className="w-4 h-4 text-primary/70" />
                        </div>
                        <div>
                          <h3 className="font-bold text-primary text-sm leading-snug">{item.ciudad}</h3>
                          <p className="text-[11px] font-semibold text-accent-blue mt-0.5 flex items-center gap-1">
                            <Car className="w-3 h-3 shrink-0" />
                            {item.distancia}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed flex-1">
                        {item.nota}
                      </p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · LOGÍSTICA
              ══════════════════════════════════════════════════════ */}
          <section id="logistica" className="py-14 sm:py-20 bg-secondary border-t border-border scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Cómo funciona
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Cómo funciona el proceso para quienes viajan
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  La distancia no tiene que ser un obstáculo. Estas son las respuestas prácticas que más
                  necesitan las familias que vienen de fuera de Cancún.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-5 mb-10">
                {logistica.map((item, i) => (
                  <SectionReveal key={item.titulo} delay={i * 0.08}>
                    <div className="flex gap-4 p-6 bg-card rounded-2xl border border-border hover:border-accent-blue/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                        <CheckCircle2 className="w-5 h-5 text-primary/70" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-primary mb-2 leading-snug text-sm">{item.titulo}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.contenido}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Callout */}
              <SectionReveal delay={0.35}>
                <div className="relative p-6 rounded-2xl bg-card border-2 border-primary/15 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/60 to-accent-blue/40 rounded-l-2xl" />
                  <p className="text-sm text-foreground leading-relaxed font-light pl-2">
                    <strong className="text-primary font-semibold">
                      La evaluación no requiere viajar todos los días.
                    </strong>{' '}
                    Con organización, la mayoría de familias de la Riviera Maya completan el proceso en
                    3–5 visitas a Cancún.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · SERVICIOS CON PRECIO
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Evaluaciones disponibles
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Evaluaciones disponibles
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  Todas las evaluaciones incluyen informe neuropsicológico con validez oficial en toda
                  la República Mexicana y sesión de devolución de resultados.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-5">
                {serviciosConPrecio.map((item, i) => (
                  <SectionReveal key={item.nombre} delay={i * 0.1}>
                    <Link
                      href={item.href}
                      className="flex flex-col gap-4 p-6 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group h-full"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-primary text-sm leading-snug flex-1">{item.nombre}</h3>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5 transition-transform group-hover:translate-x-1 group-hover:text-primary/60" />
                      </div>
                      <p className="text-xs text-muted-foreground font-light">{item.edad}</p>
                      <div className="mt-auto pt-4 border-t border-border">
                        <p className="text-lg font-serif font-bold text-primary">{item.precio}</p>
                        <p className="text-xs text-muted-foreground font-light mt-0.5">Incluye informe + devolución</p>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.35}>
                <div className="mt-10 text-center">
                  <a
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Consultar por mi caso
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · UBICACIÓN / MAPA
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Cómo llegar
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-10 text-center text-balance">
                  El consultorio en Cancún
                </h2>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  {/* Address block */}
                  <div className="p-6 flex gap-4 items-start border-b border-border">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 flex items-center justify-center shrink-0 border border-primary/10">
                      <MapPin className="w-5 h-5 text-primary/70" />
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm mb-1">Dirección</p>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        SM200 M49 L2, Hacienda de Chinconcuac<br />
                        Cancún, Quintana Roo CP 77539
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-2 font-light">
                        A ~20 minutos de la Zona Hotelera. Estacionamiento disponible en el lugar.
                        Karen comparte la ubicación exacta por WhatsApp al confirmar la primera cita.
                      </p>
                    </div>
                  </div>

                  {/* Hours table */}
                  <div className="p-6 flex gap-4 items-start border-b border-border">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 flex items-center justify-center shrink-0 border border-primary/10">
                      <Clock className="w-5 h-5 text-primary/70" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-primary text-sm mb-3">Horario de atención</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground font-light">Lunes – Viernes</span>
                          <span className="font-semibold text-primary text-xs">9:00 AM – 7:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-t border-border/50 pt-2">
                          <span className="text-muted-foreground font-light">Sábado</span>
                          <span className="font-semibold text-primary text-xs">9:00 AM – 2:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-t border-border/50 pt-2">
                          <span className="text-muted-foreground font-light">Domingo</span>
                          <span className="text-xs text-muted-foreground/60">Cerrado</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground font-light mb-4">
                      Escribe por WhatsApp para confirmar disponibilidad y recibir la ubicación exacta del consultorio.
                    </p>
                    <a
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Recibir ubicación por WhatsApp
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ── Mapa — ubicación del consultorio ── */}
          <section className="py-10 sm:py-12 border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 text-center">Ubicación del consultorio</p>
              <div className="rounded-2xl overflow-hidden border border-border shadow-md" style={{ height: 320 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9838296344037!2d-86.89585439999999!3d21.1530418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2b10d813a9c7%3A0x4042823298a0080b!2sPsic%C3%B3loga%20Karen%20Trujillo%20%7C%20Neuropsicolog%C3%ADa%3A%20TDAH%20y%20Autismo!5e0!3m2!1ses-419!2smx!4v1772120174668!5m2!1ses-419!2smx"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Consultorio Neuropsicóloga Karen Trujillo en Cancún"
                />
              </div>
              <p className="text-xs text-muted-foreground/70 text-center mt-3">SM200 M49 L2, Hacienda de Chinconcuac, Cancún · A 20 min de la Zona Hotelera</p>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6 · FAQ
              ══════════════════════════════════════════════════════ */}
          <section id="preguntas-frecuentes" className="py-14 sm:py-20 bg-secondary border-t border-border scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Preguntas frecuentes
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-10 text-center text-balance">
                  Dudas sobre viajar desde la Riviera Maya
                </h2>
              </SectionReveal>

              <div role="list">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(56,47,81,0.09)' : 'none' }}>
                      <button
                        id={`faq-btn-${i}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: openFaq === i ? '#5b4e7f' : '#382f51' }}
                      >
                        <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                        <ChevronDown
                          className="w-5 h-5 shrink-0 transition-transform duration-250"
                          style={{ color: '#5b4e7f', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        className="grid transition-all duration-300"
                        style={{
                          gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                          opacity: openFaq === i ? 1 : 0,
                          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm leading-relaxed pb-5" style={{ color: '#515e71', lineHeight: '1.75', maxWidth: '70ch' }}>
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              7 · CTA FINAL
              ══════════════════════════════════════════════════════ */}
          <section className="py-16 sm:py-24 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <SectionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.14em] font-bold text-primary-foreground/70">
                    Atendiendo pacientes de la Riviera Maya
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold italic mb-6 text-balance">
                  ¿Quieres coordinar las sesiones desde tu ciudad?
                </h2>

                <p className="text-primary-foreground/75 font-light leading-relaxed max-w-xl mx-auto mb-4">
                  Escribe por WhatsApp para revisar tu caso, resolver dudas sobre la logística del
                  proceso y organizar el calendario de sesiones desde Playa del Carmen, Tulum, Mérida
                  o la Zona Hotelera. Karen responde directamente.
                </p>

                <div className="flex items-center justify-center gap-2 mb-10 text-sm text-primary-foreground/60">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>SM200 M49 L2, Hacienda de Chinconcuac, Cancún, Q.Roo (CP 77539)</span>
                </div>

                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest px-8 py-5 rounded-2xl bg-white text-primary shadow-2xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Escribir por WhatsApp
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <p className="mt-6 text-xs text-primary-foreground/45 font-light">
                  Lunes a Viernes 9:00 – 7:00 PM · Sábados 9:00 – 2:00 PM
                </p>
              </SectionReveal>
            </div>
          </section>


          {/* ── Internal linking ── */}
          <section className="py-10 sm:py-12 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 text-center">
                Evaluaciones disponibles en Cancún
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <Link
                  href="/evaluacion-tdah-ninos"
                  className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH Infantil</span>
                    <span className="text-xs text-muted-foreground font-light">5-17 años</span>
                  </div>
                </Link>
                <Link
                  href="/evaluacion-tdah-adultos"
                  className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH Adultos</span>
                    <span className="text-xs text-muted-foreground font-light">18+ años</span>
                  </div>
                </Link>
                <Link
                  href="/evaluacion-autismo-cancun"
                  className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">Autismo (TEA)</span>
                    <span className="text-xs text-muted-foreground font-light">Diagnóstico ADOS-2</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
