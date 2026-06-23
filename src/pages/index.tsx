import { useState, useRef, useEffect, type ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Brain, FileText, CheckCircle2,
  ShieldCheck, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, ChevronDown,
  Shield, BadgeCheck, Puzzle, Briefcase,
  MapPin, Navigation, ClipboardList,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SymptomCheckerHome from '@/components/SymptomCheckerHome';
import { WA_NUMBER, PHONE_NUMBER, PHONE_E164, waUrl, SOCIAL_PROFILES } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE, REVIEWS, GEO, ADDRESS } from '@/lib/site';
import type { Service, Credential, Review, FaqItem } from '@/types/portfolio';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const services: Service[] = [
  {
    slug: '/evaluacion-tdah-ninos',
    icon: Users,
    label: 'TDAH Infantil',
    title: 'Valoración TDAH en Niños',
    age: '5-17 años',
    desc: 'Evaluación con CONNERS-3, WISC-V, BRIEF-2 y CPT-3. Informe con adecuaciones curriculares y validez oficial ante la escuela.',
    price: '$8,300 MXN',
    tests: ['CONNERS-3', 'WISC-V', 'BRIEF-2', 'CPT-3'],
    cta: '¿Tu hijo no pone atención?',
    color: 'from-accent-blue/15 to-primary/10',
    borderHover: 'hover:border-accent-blue/50',
  },
  {
    slug: '/evaluacion-tdah-adultos',
    icon: Briefcase,
    label: 'TDAH Adultos',
    title: 'Valoración TDAH en Adultos',
    age: '+18 años',
    desc: 'Evaluación con CAARS-2, WAIS-IV, BRIEF-2A y CPT-3. Diagnóstico diferencial frente a ansiedad, depresión y burnout.',
    price: '$8,300 MXN',
    tests: ['CAARS-2', 'WAIS-IV', 'BRIEF-2A', 'CPT-3'],
    cta: '¿Sospechas que tienes TDAH?',
    color: 'from-primary/15 to-accent-blue/10',
    borderHover: 'hover:border-primary/50',
  },
  {
    slug: '/evaluacion-autismo-cancun',
    icon: Puzzle,
    label: 'Autismo (TEA)',
    title: 'Evaluación de Autismo',
    age: 'Niños y adolescentes',
    desc: 'Diagnóstico con ADOS-2 (estándar de oro), ADI-R, WISC-V, Vineland-3 y SRS-2. Nivel de apoyo especificado.',
    price: '$8,500 MXN',
    tests: ['ADOS-2', 'ADI-R', 'WISC-V', 'Vineland-3'],
    cta: '¿Tu hijo se relaciona diferente?',
    color: 'from-accent-pink/15 to-primary/10',
    borderHover: 'hover:border-accent-pink/50',
  },
];

const credentials: Credential[] = [
  { icon: BadgeCheck,   text: `Cédula Federal ${CEDULA}` },
  { icon: Award,        text: '7+ años de experiencia' },
  { icon: Stethoscope,  text: 'Pruebas estandarizadas internacionales' },
  { icon: Star,         text: '47+ reseñas · 5 estrellas' },
  { icon: FileText,     text: 'Informes con validez oficial SEP e IMSS' },
  { icon: CalendarCheck,text: 'Agenda en línea · Resultados en semanas' },
];

const whyNeuropsychology = [
  { title: 'Pruebas estandarizadas, no solo entrevista', desc: 'Instrumentos con normas internacionales que miden funciones cognitivas de forma objetiva y cuantificable.' },
  { title: 'Diagnóstico diferencial preciso', desc: 'Diferencia TDAH de ansiedad, autismo de timidez, burnout de déficit atencional: datos objetivos, no impresiones.' },
  { title: 'Informe con validez oficial', desc: 'Documento respaldado por cédula profesional federal, aceptado por escuelas, SEP, IMSS y empleadores.' },
  { title: 'Recomendaciones accionables', desc: 'No solo un diagnóstico: un plan concreto de intervención para la escuela, el trabajo y la vida diaria.' },
];

const reviews: Review[] = [
  { name: 'Mamá de Sofía, 7 años',   text: 'Por fin alguien nos explicó qué pasaba con nuestra hija. El informe fue tan claro que la escuela implementó las adecuaciones de inmediato.', stars: 5, service: 'TDAH Infantil' },
  { name: 'Alejandro, 34 años',       text: 'Llevaba años pensando que era "flojo". El informe me mostró exactamente qué funciones ejecutivas estaban afectadas. Fue liberador.', stars: 5, service: 'TDAH Adultos' },
  { name: 'Mamá de Emilia, 6 años',   text: 'Nos dijeron que solo era "tímida". El diagnóstico de TEA nivel 1 nos dio claridad total. Las recomendaciones han transformado cómo la acompañamos.', stars: 5, service: 'Autismo (TEA)' },
  { name: 'Papá de Diego, 10 años',   text: 'Llevábamos dos años con dudas. Karen fue profesional, cálida y el proceso fue mucho más claro de lo que esperábamos.', stars: 5, service: 'TDAH Infantil' },
  { name: 'Mariana, 28 años',          text: 'Me diagnosticaron ansiedad dos veces antes de llegar aquí. Resultó ser TDAH inatento. Por fin entiendo por qué las estrategias anteriores no funcionaban.', stars: 5, service: 'TDAH Adultos' },
  { name: 'Mamá de Santiago, 4 años', text: 'Karen nos dio respuestas en 3 semanas. El informe fue tan detallado que la escuela supo exactamente qué implementar.', stars: 5, service: 'Autismo (TEA)' },
];

const faqItems: FaqItem[] = [
  {
    q: '¿Cuál es la diferencia entre un neuropsicólogo y un psicólogo?',
    a: 'Un psicólogo clínico evalúa conducta y emociones mediante entrevista y observación. Un neuropsicólogo aplica pruebas estandarizadas que miden funciones cognitivas del cerebro (atención, memoria de trabajo, velocidad de procesamiento) de forma cuantificable. Para TDAH y autismo, la evaluación neuropsicológica es el estándar clínico porque permite diagnóstico diferencial con datos objetivos.',
  },
  {
    q: '¿Qué condiciones evalúa la neuropsicóloga Karen Trujillo?',
    a: 'Las tres áreas principales de especialización son: TDAH en niños (5-17 años), TDAH en adultos (+18 años) y Trastorno del Espectro Autista (TEA). Cada evaluación utiliza instrumentos estandarizados específicos y genera un informe clínico con validez oficial.',
  },
  {
    q: '¿Los informes tienen validez oficial?',
    a: `Sí. Todos los informes clínicos están respaldados por cédula profesional federal ${CEDULA} emitida por la SEP. Tienen validez oficial ante instituciones educativas, la Secretaría de Educación Pública, IMSS, empleadores y dependencias gubernamentales en todo México.`,
  },
  {
    q: '¿Cuánto cuesta una evaluación neuropsicológica en Cancún?',
    a: 'La valoración de TDAH (infantil o adulto) tiene un costo de $8,300 MXN. La evaluación de autismo (TEA) tiene un costo de $8,500 MXN. Ambos procesos incluyen todas las sesiones, pruebas estandarizadas, informe clínico completo y sesión de devolución. Se solicita un anticipo al agendar que forma parte del costo total.',
  },
  {
    q: '¿Cuánto tiempo toma el proceso completo?',
    a: 'La valoración de TDAH toma entre 2 y 3 semanas (4-5 citas presenciales). La evaluación de autismo toma entre 3 y 4 semanas (5-6 citas presenciales). Ambos procesos incluyen entrevista inicial, aplicación de pruebas, análisis de resultados y sesión de devolución con informe.',
  },
  {
    q: '¿La evaluación se puede hacer en línea?',
    a: 'Las entrevistas iniciales y las sesiones de devolución pueden realizarse en línea. Sin embargo, las pruebas neuropsicológicas estandarizadas requieren aplicación presencial en el consultorio de Cancún, Quintana Roo, para garantizar la validez de los resultados.',
  },
  {
    q: '¿Puedo cancelar o reprogramar mi cita?',
    a: 'Sí, con al menos 48 horas de anticipación. El anticipo es reembolsable si cancelas dentro de ese plazo. Fuera de plazo, se aplica como crédito para reagendar.',
  },
  {
    q: '¿Cómo sé cuál evaluación necesito?',
    a: 'Si tu hijo tiene dificultades de atención, impulsividad o bajo rendimiento escolar, la valoración de TDAH infantil es el punto de partida. Si tú como adulto sospechas TDAH, la valoración de adultos está diseñada para ti. Si las preocupaciones son sobre comunicación social, conductas repetitivas o intereses restringidos, la evaluación de autismo es la indicada. Si tienes dudas, puedes contactar por WhatsApp para una orientación inicial sin costo.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON
   ═══════════════════════════════════════════════════════════════ */

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['MedicalBusiness', 'MedicalClinic'],
      '@id': `${SITE_URL}/#clinic`,
      name: 'Neuropsicóloga Karen Trujillo — Consultorio de Neuropsicología',
      alternateName: 'Consultorio Neuropsicóloga Karen Trujillo',
      url: SITE_URL,
      telephone: PHONE_E164,
      image: KAREN_IMAGE,
      description: 'Consultorio de neuropsicología clínica en Cancún, Quintana Roo. Especialista en diagnóstico de TDAH (niños y adultos) y Trastorno del Espectro Autista (TEA) con pruebas estandarizadas internacionales.',
      address: {
        '@type': 'PostalAddress',
        ...ADDRESS,
      },
      geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '19:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
      ],
      priceRange: '$8,300 - $8,500 MXN',
      medicalSpecialty: 'Neuropsychiatry',
      currenciesAccepted: 'MXN',
      paymentAccepted: 'Efectivo, Transferencia bancaria, Tarjeta',
      areaServed: [
        { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
        { '@type': 'City', name: 'Playa del Carmen', sameAs: 'https://www.wikidata.org/wiki/Q505403' },
        { '@type': 'City', name: 'Tulum', sameAs: 'https://www.wikidata.org/wiki/Q697023' },
        { '@type': 'City', name: 'Mérida', sameAs: 'https://www.wikidata.org/wiki/Q15678' },
        { '@type': 'City', name: 'Isla Mujeres' },
        { '@type': 'AdministrativeArea', name: 'Quintana Roo', sameAs: 'https://www.wikidata.org/wiki/Q10507' },
        { '@type': 'AdministrativeArea', name: 'Riviera Maya' },
      ],
      member: { '@id': `${SITE_URL}/#physician` },
      hasMap: 'https://maps.google.com/?cid=4630406520710891531',
      sameAs: SOCIAL_PROFILES,
    },
    {
      '@type': 'Physician',
      '@id': `${SITE_URL}/#physician`,
      name: 'Karen Trujillo',
      jobTitle: 'Neuropsicóloga Clínica — Especialista en TDAH y Autismo',
      url: SITE_URL,
      image: KAREN_IMAGE,
      telephone: PHONE_E164,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Cédula Profesional Federal',
        credentialId: CEDULA,
        issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
      },
      medicalSpecialty: 'Neuropsychiatry',
      knowsAbout: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista', sameAs: 'https://www.wikidata.org/wiki/Q38404' },
      ],
      areaServed: [
        { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
        { '@type': 'AdministrativeArea', name: 'Quintana Roo', sameAs: 'https://www.wikidata.org/wiki/Q10507' },
      ],
      memberOf: { '@type': 'Organization', name: 'Colegio de Psicólogos de Quintana Roo' },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Universidad Modelo',
        address: { '@type': 'PostalAddress', addressLocality: 'Mérida', addressRegion: 'Yucatán', addressCountry: 'MX' },
      },
      sameAs: SOCIAL_PROFILES,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Neuropsicóloga Karen Trujillo',
      url: SITE_URL,
      inLanguage: 'es-MX',
      publisher: { '@id': `${SITE_URL}/#physician` },
    },
    {
      '@type': 'MedicalWebPage',
      name: 'Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo',
      url: SITE_URL,
      description: `Evaluaciones neuropsicológicas de TDAH en niños y adultos, y diagnóstico de autismo (TEA) con ADOS-2 en Cancún. Informes con validez oficial. Cédula ${CEDULA}.`,
      inLanguage: 'es-MX',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista', sameAs: 'https://www.wikidata.org/wiki/Q38404' },
      ],
      reviewedBy: { '@id': `${SITE_URL}/#physician` },
      lastReviewed: '2026-06-04',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        ],
      },
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Valoración Neuropsicológica de TDAH Infantil',
      url: `${SITE_URL}/evaluacion-tdah-ninos`,
      procedureType: 'Diagnostic',
      provider: { '@id': `${SITE_URL}/#physician` },
      location: { '@id': `${SITE_URL}/#clinic` },
      offers: { '@type': 'Offer', price: '8300', priceCurrency: 'MXN' },
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Valoración Neuropsicológica de TDAH en Adultos',
      url: `${SITE_URL}/evaluacion-tdah-adultos`,
      procedureType: 'Diagnostic',
      provider: { '@id': `${SITE_URL}/#physician` },
      location: { '@id': `${SITE_URL}/#clinic` },
      offers: { '@type': 'Offer', price: '8300', priceCurrency: 'MXN' },
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Evaluación Neuropsicológica de Autismo (TEA)',
      url: `${SITE_URL}/evaluacion-autismo-cancun`,
      procedureType: 'Diagnostic',
      provider: { '@id': `${SITE_URL}/#physician` },
      location: { '@id': `${SITE_URL}/#clinic` },
      offers: { '@type': 'Offer', price: '8500', priceCurrency: 'MXN' },
    },
    {
      '@type': 'AggregateRating',
      itemReviewed: { '@id': `${SITE_URL}/#physician` },
      ratingValue: REVIEWS.ratingValue,
      reviewCount: REVIEWS.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    ...reviews.map((r, i) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: String(r.stars), bestRating: '5' },
      reviewBody: r.text,
      itemReviewed: { '@id': `${SITE_URL}/#clinic` },
      datePublished: `2025-0${i + 1}-15`,
    })),
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function SectionReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.unobserve(el); } },
      { rootMargin: '0px 0px 50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={revealed ? { animation: `sectionReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both` } : undefined}
    >
      {children}
    </div>
  );
}

/* ─── service badge colours (match HTML prototype) ─── */
const svcBadge = [
  { bg: '#d0d0e7', color: '#382f51', hoverBorder: '#d0d0e7cc' },
  { bg: '#f5dfc5', color: '#6b4e1a', hoverBorder: '#f5dfc5cc' },
  { bg: '#fbdbe0', color: '#7a3040', hoverBorder: '#fbdbe0cc' },
];

/* ─── about section credential list ─── */
const aboutCreds = [
  `Cédula Profesional Federal: ${CEDULA} (SEP)`,
  'Licenciada en Psicología — Universidad Modelo, Quintana Roo',
  'Especialización en TDAH infantil: CONNERS-3, WISC-V, BRIEF-2',
  'Especialización en TDAH adultos: CAARS-2, DIVA 2.0, CPT-3',
  'Especialización en TEA: ADOS-2, M-CHAT-R/F, ADI-R, Vineland-3',
  'Miembro del Colegio de Psicólogos de Quintana Roo',
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — HOME
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 600;
      const footerCta = document.getElementById('cta-final');
      const footerCtaTop = footerCta?.getBoundingClientRect().top ?? Infinity;
      setShowStickyCta(window.scrollY > heroHeight && footerCtaTop > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>{`Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo · Cédula ${CEDULA}`}</title>
        <meta name="description" content="Evaluaciones neuropsicológicas de TDAH en niños y adultos, y diagnóstico de autismo (TEA) con ADOS-2 en Cancún. Pruebas estandarizadas internacionales. Informes con validez oficial. Agenda en línea." />
        <link rel="canonical" href={`${SITE_URL}/`} />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content={`${GEO.latitude};${GEO.longitude}`} />
        <meta name="ICBM" content={`${GEO.latitude}, ${GEO.longitude}`} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo" />
        <meta property="og:description" content="Evaluaciones neuropsicológicas con pruebas estandarizadas internacionales. TDAH niños, TDAH adultos y autismo (TEA). Informes con validez oficial." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={KAREN_IMAGE} />
        <meta property="og:image:width" content="465" />
        <meta property="og:image:height" content="533" />
        <meta property="og:image:alt" content="Neuropsicóloga Karen Trujillo — Especialista en TDAH y Autismo en Cancún" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo" />
        <meta name="twitter:description" content="Diagnóstico de TDAH y autismo con pruebas estandarizadas. Informes con validez oficial. Cancún, Q. Roo." />
        <meta name="twitter:image" content={KAREN_IMAGE} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#servicios', '#sobre-mi', '#ubicacion'] },
          url: SITE_URL,
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="antialiased w-full min-w-0 overflow-x-hidden" style={{ color: '#382f51', background: '#fff' }}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-bold focus:text-sm">
          Saltar al contenido principal
        </a>
        <Navbar />

        <main id="main-content" className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              1 · HERO — dark plum, routing cards, photo badge
              ══════════════════════════════════════════════════════ */}
          <section
            id="inicio"
            aria-label="Presentación principal"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            style={{ background: '#2b1f47', paddingTop: '72px' }}
          >
            {/* Radial glow decorations */}
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-16 sm:py-20 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left: copy */}
                <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                  <div className="text-center">
                    {/* Credential bar */}
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mb-6">
                      {[`Cédula Federal ${CEDULA}`, '47+ reseñas ★ 5.0', '7+ años de experiencia'].map((item, i) => (
                        <span key={item} className="flex items-center gap-1.5 text-xs font-semibold tracking-wide" style={{ color: 'rgba(208,208,231,0.8)' }}>
                          {i > 0 && <span aria-hidden="true" className="inline-block w-1 h-1 rounded-full" style={{ background: 'rgba(208,208,231,0.45)' }} />}
                          {item}
                        </span>
                      ))}
                    </div>

                    <h1 className="font-serif font-bold text-white leading-[1.08] mb-4" style={{ fontSize: 'clamp(1.9rem, 9vw, 5rem)' }}>
                      Neuropsicóloga<br />en Cancún
                    </h1>

                    <p className="font-serif font-normal italic leading-snug mb-5" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: 'rgba(208,208,231,0.72)' }}>
                      Respuestas donde antes había incertidumbre
                    </p>

                    <p className="text-base leading-relaxed mb-8 max-w-[54ch] mx-auto" style={{ color: 'rgba(208,208,231,0.82)' }}>
                      Evaluaciones neuropsicológicas de <strong className="text-white font-semibold">TDAH</strong> y{' '}
                      <strong className="text-white font-semibold">Autismo (TEA)</strong> con pruebas estandarizadas internacionales.
                      Informes con validez oficial ante SEP, IMSS e instituciones educativas.
                    </p>
                  </div>

                  {/* Routing cards — vertical column */}
                  <div className="flex flex-col gap-2.5 mb-8 animate-[fadeIn_0.8s_ease-out_0.35s_both]">
                    {[
                      { href: '/evaluacion-tdah-ninos',     label: 'Para padres y madres', text: 'Mi hijo tiene problemas de atención o conducta' },
                      { href: '/evaluacion-tdah-adultos',   label: 'Para adultos',          text: 'Sospecho que tengo TDAH no diagnosticado' },
                      { href: '/evaluacion-autismo-cancun', label: 'Diagnóstico TEA',       text: 'Mi hijo se relaciona de forma diferente — busco diagnóstico de autismo' },
                    ].map((card) => (
                      <Link
                        key={card.href}
                        href={card.href}
                        className="group flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:translate-x-1"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(208,208,231,0.18)' }}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="block text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(208,208,231,0.65)' }}>{card.label}</span>
                          <span className="block text-sm font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.88)' }}>{card.text}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: 'rgba(208,208,231,0.5)' }} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 animate-[fadeIn_0.8s_ease-out_0.5s_both]">
                    <a
                      href={waUrl('Hola Karen, vi tu página y me gustaría agendar una valoración')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl text-white transition-all hover:-translate-y-0.5 hover:brightness-110"
                      style={{ background: '#25d366' }}
                      aria-label="Agendar cita por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Agendar por WhatsApp
                    </a>
                    <a
                      href="#servicios"
                      onClick={(e) => { e.preventDefault(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-xl transition-all hover:bg-white/10"
                      style={{ color: 'rgba(255,255,255,0.88)', border: '1.5px solid rgba(255,255,255,0.32)' }}
                    >
                      Ver servicios
                    </a>
                  </div>
                </div>

                {/* Right: photo + badge */}
                <div className="hidden lg:flex justify-end animate-[fadeIn_1s_ease-out_0.4s_both]">
                  <div className="relative inline-block">
                    <Image
                      src={KAREN_IMAGE}
                      alt="Neuropsicóloga Karen Trujillo — especialista en TDAH y Autismo en Cancún"
                      width={440}
                      height={587}
                      className="block w-full object-cover object-top"
                      style={{ maxWidth: '420px', borderRadius: '20px 20px 80px 20px', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}
                      priority
                      unoptimized
                    />
                    {/* Photo badge */}
                    <div
                      className="absolute bg-white rounded-2xl"
                      style={{ bottom: '24px', left: '-20px', padding: '14px 18px', minWidth: '210px', boxShadow: '0 8px 32px rgba(56,47,81,0.22)' }}
                    >
                      <p className="text-[11px] font-bold tracking-wide mb-1" style={{ color: '#5b4e7f' }}>Cédula {CEDULA} · SEP</p>
                      <div className="flex gap-0.5 mb-1" aria-label="5 estrellas">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" aria-hidden="true" />)}
                      </div>
                      <p className="text-[11px]" style={{ color: '#515e71' }}>47 reseñas verificadas · 5.0/5</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · STATS BAR — social proof strip
              ══════════════════════════════════════════════════════ */}
          <section aria-label="Métricas de experiencia" className="bg-white border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x divide-border">
                {[
                  { number: '7+',       label: 'Años de experiencia',      mono: false },
                  { number: '500+',     label: 'Evaluaciones completadas', mono: false },
                  { number: '47+',      label: 'Reseñas con 5 estrellas',  mono: false },
                  { number: CEDULA,     label: 'Cédula Federal SEP',        mono: true  },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center py-5 px-4 text-center">
                    <span className={`font-serif font-bold leading-none ${stat.mono ? 'text-lg sm:text-2xl' : 'text-[2.25rem]'}`} style={{ color: '#382f51' }}>
                      {stat.number}
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest mt-2 uppercase" style={{ color: '#515e71' }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · SYMPTOM CHECKER — interactive 3-tab tool
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-b border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3 text-center">¿Reconoces estas señales?</h2>
                <p className="text-muted-foreground font-light text-center max-w-lg mx-auto mb-8">Selecciona el perfil que más se parece a tu situación y marca lo que reconozcas.</p>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <SymptomCheckerHome />
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · SERVICES — clean pill-badge cards
              ══════════════════════════════════════════════════════ */}
          <section id="servicios" aria-labelledby="servicios-heading" className="py-20 scroll-mt-20" style={{ background: '#f8f7fc' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-center mb-2" style={{ color: '#5b4e7f' }}>Evaluaciones disponibles</p>
                <h2 id="servicios-heading" className="font-serif font-bold text-center leading-tight mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: '#382f51' }}>
                  Evaluaciones especializadas
                </h2>
                <div className="w-10 h-0.5 rounded-full mx-auto mb-5" style={{ background: '#5b4e7f' }} />
                <p className="text-base font-light text-center max-w-xl mx-auto mb-12" style={{ color: '#515e71' }}>
                  Cada evaluación usa instrumentos estandarizados internacionales y genera un informe con validez oficial.
                </p>
              </SectionReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <SectionReveal key={service.slug} delay={i * 0.1}>
                    <div
                      className="bg-white rounded-2xl p-7 flex flex-col transition-all duration-250 hover:-translate-y-1 group"
                      style={{ border: '1px solid rgba(56,47,81,0.07)', '--hover-border': svcBadge[i].hoverBorder } as React.CSSProperties}
                      onMouseEnter={(e) => (e.currentTarget.style.border = `1px solid ${svcBadge[i].hoverBorder}`)}
                      onMouseLeave={(e) => (e.currentTarget.style.border = '1px solid rgba(56,47,81,0.07)')}
                    >
                      <span
                        className="inline-block text-[11px] font-bold tracking-widest uppercase rounded-full px-3 py-1.5 mb-4 w-fit"
                        style={{ background: svcBadge[i].bg, color: svcBadge[i].color }}
                      >
                        {service.label}
                      </span>
                      <h3 className="font-serif font-bold text-xl mb-1" style={{ color: '#382f51' }}>{service.title}</h3>
                      <p className="text-xs font-bold mb-4" style={{ color: '#515e71', letterSpacing: '0.02em' }}>
                        {service.age}&nbsp;&nbsp;·&nbsp;&nbsp;{service.price}
                      </p>
                      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#515e71', lineHeight: '1.7' }}>
                        {service.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {service.tests.map((test) => (
                          <span
                            key={test}
                            className="text-[11px] font-bold px-2.5 py-1 rounded-md"
                            style={{ background: '#f8f7fc', color: '#5b4e7f', border: '1px solid rgba(91,78,127,0.15)' }}
                          >
                            {test}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={service.slug}
                        className="block text-center text-xs font-bold uppercase tracking-widest py-2.5 px-5 rounded-lg transition-all hover:text-white"
                        style={{ color: '#382f51', border: '1.5px solid #382f51' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#382f51'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#382f51'; }}
                      >
                        Ver evaluación
                      </Link>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.35}>
                <div className="mt-10 text-center">
                  <p className="text-sm font-light mb-4" style={{ color: '#515e71' }}>¿No estás seguro cuál necesitas?</p>
                  <a
                    href={waUrl('Hola Karen, no estoy seguro qué evaluación necesito. ¿Podrías orientarme?')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all"
                    style={{ border: '2px solid rgba(56,47,81,0.2)', color: '#382f51' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(56,47,81,0.5)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(56,47,81,0.2)')}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Orientación gratuita por WhatsApp
                  </a>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · PROCESS — numbered timeline 01-04
              ══════════════════════════════════════════════════════ */}
          <section id="proceso" aria-labelledby="proceso-heading" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#5b4e7f' }}>Paso a paso</p>
                <h2 id="proceso-heading" className="font-serif font-bold leading-tight mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: '#382f51' }}>
                  ¿Cómo es el proceso?
                </h2>
                <div className="w-10 h-0.5 rounded-full mb-5" style={{ background: '#5b4e7f' }} />
                <p className="text-base font-light max-w-[52ch] mb-14" style={{ color: '#515e71', lineHeight: '1.7' }}>
                  Un proceso claro en cuatro pasos, desde la primera consulta hasta el informe final.
                </p>
              </SectionReveal>

              <div className="flex flex-col max-w-[680px]" style={{ gap: 0 }}>
                {[
                  {
                    n: '01',
                    title: 'Entrevista inicial',
                    subtitle: '(online o presencial)',
                    desc: 'Primera sesión para conocer el motivo de consulta, historia clínica y contexto del paciente.',
                    duration: '60–90 min',
                  },
                  {
                    n: '02',
                    title: 'Aplicación de pruebas neuropsicológicas',
                    subtitle: '',
                    desc: 'Sesiones presenciales de evaluación con instrumentos estandarizados internacionales.',
                    duration: 'TDAH: 2–3 sesiones · Autismo: 3–4 sesiones',
                  },
                  {
                    n: '03',
                    title: 'Análisis e interpretación de resultados',
                    subtitle: '',
                    desc: 'Karen integra los datos de todas las pruebas en un informe clínico completo con diagnóstico diferencial.',
                    duration: '',
                  },
                  {
                    n: '04',
                    title: 'Sesión de devolución',
                    subtitle: '',
                    desc: 'Se explica el informe en detalle, se responden preguntas y se entregan recomendaciones concretas y plan terapéutico.',
                    duration: 'Presencial u online',
                  },
                ].map((step, i, arr) => (
                  <SectionReveal key={step.n} delay={i * 0.1}>
                    <div className="grid" style={{ gridTemplateColumns: '72px 1fr', gap: '1.5rem', paddingBottom: i < arr.length - 1 ? '2.5rem' : 0 }}>
                      {/* Number + connector */}
                      <div style={{ position: 'relative' }}>
                        <div className="font-serif leading-none" style={{ fontSize: '3rem', color: '#d0d0e7', lineHeight: '1' }}>{step.n}</div>
                        {i < arr.length - 1 && (
                          <div
                            style={{
                              position: 'absolute',
                              left: '36px',
                              top: '58px',
                              bottom: '-2rem',
                              width: '1px',
                              background: 'linear-gradient(to bottom, rgba(208,208,231,0.55), transparent)',
                            }}
                          />
                        )}
                      </div>
                      {/* Content */}
                      <div style={{ paddingTop: '0.25rem' }}>
                        <h3 className="font-bold mb-2" style={{ fontSize: '1.1rem', color: '#382f51' }}>
                          {step.title}{' '}
                          {step.subtitle && <span className="font-normal text-sm" style={{ color: '#515e71' }}>{step.subtitle}</span>}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: '#515e71', lineHeight: '1.7' }}>{step.desc}</p>
                        {step.duration && (
                          <span
                            className="inline-block text-xs font-semibold rounded-full mt-2.5"
                            style={{ color: '#5b4e7f', background: '#f8f7fc', border: '1px solid #d0d0e7', padding: '4px 12px', letterSpacing: '0.06em' }}
                          >
                            {step.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6 · WHY NEUROPSYCHOLOGY — differentiator
              ══════════════════════════════════════════════════════ */}
          <section id="que-es-neuropsicologia" className="py-14 sm:py-20 bg-card">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  No es lo mismo una consulta que una evaluación neuropsicológica
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">
                  La neuropsicología mide cómo funciona el cerebro con instrumentos estandarizados. Los resultados son percentiles y diagnósticos verificables, no impresiones clínicas.
                </p>
              </SectionReveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {whyNeuropsychology.map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-4 p-5 sm:p-6 bg-secondary/50 rounded-2xl border border-border hover:border-accent-blue/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/30 to-primary/20 border border-primary/25 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="w-4 h-4 text-primary/60" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-1 text-sm">{item.title}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              7 · ABOUT — dark plum, photo + credentials list
              ══════════════════════════════════════════════════════ */}
          <section id="sobre-mi" aria-labelledby="sobre-heading" className="py-20 scroll-mt-20" style={{ background: '#2b1f47' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                {/* Photo */}
                <SectionReveal className="flex justify-center lg:justify-start">
                  <Image
                    src={KAREN_IMAGE}
                    alt="Neuropsicóloga Karen Trujillo — Cancún"
                    width={400}
                    height={467}
                    className="block w-full object-cover object-top"
                    style={{ maxWidth: '380px', borderRadius: '20px 80px 20px 20px', boxShadow: '0 24px 64px rgba(0,0,0,0.28)' }}
                    loading="lazy"
                    unoptimized
                  />
                </SectionReveal>

                {/* Content */}
                <SectionReveal delay={0.1}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(208,208,231,0.6)' }}>
                    Neuropsicóloga certificada
                  </p>
                  <h2 id="sobre-heading" className="font-serif font-bold text-white leading-tight mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)' }}>
                    Conoce a Karen Trujillo
                  </h2>
                  <div className="w-10 h-0.5 rounded-full mb-6" style={{ background: 'rgba(208,208,231,0.4)' }} />

                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
                    Soy Neuropsicóloga Karen Trujillo (Cédula Federal: {CEDULA}), especializada en valoración de TDAH y Autismo, egresada de la Universidad Modelo de Quintana Roo. Con más de 7 años de experiencia en Cancún, mis diagnósticos combinan rigor científico con instrumentos estandarizados internacionales.
                  </p>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
                    Me especializo exclusivamente en evaluación neuropsicológica porque creo que un diagnóstico preciso cambia trayectorias de vida. Un niño con TDAH no diagnosticado es etiquetado como "flojo"; un adulto sin diagnóstico lleva décadas creyendo que el problema es su carácter. El diagnóstico correcto es el primer paso del tratamiento correcto.
                  </p>

                  {/* Credentials list */}
                  <div className="mb-8">
                    {aboutCreds.map((cred, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 py-2.5"
                        style={{ borderBottom: i < aboutCreds.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
                      >
                        <div
                          className="flex items-center justify-center shrink-0 mt-0.5 rounded-full"
                          style={{ width: '20px', height: '20px', background: 'rgba(208,208,231,0.14)' }}
                        >
                          <svg viewBox="0 0 12 12" fill="none" stroke="#d0d0e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '11px', height: '11px' }} aria-hidden="true">
                            <polyline points="2,6 5,9 10,3" />
                          </svg>
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.78)' }}>{cred}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini stats */}
                  <div className="flex flex-wrap gap-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    {[{ v: '7+', l: 'Años' }, { v: '500+', l: 'Evaluaciones' }, { v: '47+', l: 'Reseñas 5★' }].map((s) => (
                      <div key={s.l}>
                        <p className="font-serif font-bold text-white" style={{ fontSize: '1.8rem', lineHeight: '1' }}>{s.v}</p>
                        <p className="text-[11px] font-semibold uppercase tracking-widest mt-1" style={{ color: 'rgba(208,208,231,0.65)' }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                </SectionReveal>

              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              8 · TESTIMONIALS — featured quote + 3 cards
              ══════════════════════════════════════════════════════ */}
          <section id="testimonios" aria-labelledby="testimonios-heading" className="py-20" style={{ background: '#f8f7fc' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-center mb-2" style={{ color: '#5b4e7f' }}>Familias reales</p>
                <h2 id="testimonios-heading" className="font-serif font-bold text-center leading-tight mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: '#382f51' }}>
                  Lo que dicen las familias
                </h2>
                <div className="w-10 h-0.5 rounded-full mx-auto mb-12" style={{ background: '#5b4e7f' }} />
              </SectionReveal>

              {/* Featured quote */}
              <SectionReveal>
                <div
                  className="relative bg-white rounded-2xl overflow-hidden mx-auto mb-8"
                  style={{ maxWidth: '780px', padding: '2.5rem 2.5rem 2rem', boxShadow: '0 4px 40px rgba(56,47,81,0.08)' }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute font-serif select-none pointer-events-none leading-none"
                    style={{ top: '0.25rem', left: '1.5rem', fontSize: '7rem', lineHeight: '1', color: '#d0d0e7', opacity: 0.65 }}
                  >
                    &ldquo;
                  </div>
                  <blockquote className="relative z-10" style={{ paddingTop: '1.25rem', margin: 0 }}>
                    <p className="font-serif italic leading-relaxed mb-5" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.35rem)', color: '#382f51', lineHeight: '1.65' }}>
                      {reviews[0].text}
                    </p>
                    <footer className="flex items-center gap-3">
                      <div>
                        <cite className="not-italic font-bold text-sm" style={{ color: '#382f51' }}>{reviews[0].name}</cite>
                        <span className="text-sm" style={{ color: '#515e71' }}>&nbsp;·&nbsp;{reviews[0].service}</span>
                        <div className="flex gap-0.5 mt-1" aria-label="5 estrellas">
                          {[...Array(reviews[0].stars)].map((_, j) => (
                            <Star key={j} className="w-3.5 h-3.5 fill-warning text-warning" aria-hidden="true" />
                          ))}
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </SectionReveal>

              {/* 3 testimonial cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {reviews.slice(1, 4).map((review, i) => (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <article
                      className="bg-white rounded-2xl p-6 flex flex-col h-full transition-all hover:-translate-y-0.5"
                      style={{ border: '1px solid rgba(56,47,81,0.07)', boxShadow: '0 2px 12px rgba(56,47,81,0.04)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 10px 32px rgba(56,47,81,0.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(56,47,81,0.04)')}
                    >
                      <div className="flex gap-0.5 mb-3" aria-label={`${review.stars} estrellas`}>
                        {[...Array(review.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-warning text-warning" aria-hidden="true" />)}
                      </div>
                      <p className="text-sm leading-relaxed mb-6 flex-1 italic" style={{ color: '#515e71', lineHeight: '1.7' }}>
                        &ldquo;{review.text}&rdquo;
                      </p>
                      <div className="border-t pt-4" style={{ borderColor: 'rgba(56,47,81,0.07)' }}>
                        <p className="font-bold text-sm" style={{ color: '#382f51' }}>{review.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#515e71' }}>{review.service}</p>
                      </div>
                    </article>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <div className="mt-10 text-center">
                  <p className="text-sm font-light mb-3" style={{ color: '#515e71' }}>
                    ¿Ya te evaluaste con Karen? Tu reseña ayuda a que más familias de Cancún nos encuentren.
                  </p>
                  <a
                    href="https://maps.google.com/maps?cid=4630406520710891531&action=writeareview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all"
                    style={{ color: '#382f51', border: '1px solid rgba(56,47,81,0.2)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(56,47,81,0.5)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(56,47,81,0.2)')}
                  >
                    <Star className="w-3.5 h-3.5 fill-warning text-warning" aria-hidden="true" />
                    Dejar reseña en Google
                  </a>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              9 · FAQ — clean border-bottom accordion
              ══════════════════════════════════════════════════════ */}
          <section id="faq" aria-labelledby="faq-heading" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#5b4e7f' }}>Dudas frecuentes</p>
                <h2 id="faq-heading" className="font-serif font-bold leading-tight mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: '#382f51' }}>
                  Preguntas frecuentes
                </h2>
                <div className="w-10 h-0.5 rounded-full mb-10" style={{ background: '#5b4e7f' }} />
              </SectionReveal>

              <div style={{ maxWidth: '720px' }} role="list">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.04}>
                    <div role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(56,47,81,0.09)' : 'none' }}>
                      <button
                        id={`faq-btn-${i}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-ans-${i}`}
                        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: openFaq === i ? '#5b4e7f' : '#382f51' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#5b4e7f')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = openFaq === i ? '#5b4e7f' : '#382f51')}
                      >
                        <span className="font-semibold text-sm sm:text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>{faq.q}</span>
                        <ChevronDown
                          className="w-5 h-5 shrink-0 transition-transform duration-250"
                          style={{ color: '#5b4e7f', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        id={`faq-ans-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        className="grid transition-all duration-300"
                        style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr', opacity: openFaq === i ? 1 : 0, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
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
              10 · BLOG — image cards
              ══════════════════════════════════════════════════════ */}
          <section id="blog" aria-labelledby="blog-heading" className="py-20" style={{ background: '#f8f7fc' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <SectionReveal>
                <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#5b4e7f' }}>Recursos y artículos</p>
                    <h2 id="blog-heading" className="font-serif font-bold leading-tight" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: '#382f51' }}>
                      Del blog
                    </h2>
                    <div className="w-10 h-0.5 rounded-full mt-3" style={{ background: '#5b4e7f' }} />
                  </div>
                  <Link
                    href="/blog"
                    className="text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: '#5b4e7f', letterSpacing: '0.04em' }}
                  >
                    Ver todos los artículos →
                  </Link>
                </div>
              </SectionReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { href: '/blog/senales-tdah-ninos',       tag: 'TDAH Infantil', mins: '12', title: '¿Tu hijo no pone atención? Señales reales de TDAH en niños', imgSrc: '/blog/dark-senales-de-tdah-en-ninos-1200x675.svg' },
                  { href: '/blog/tdah-adultos-diagnostico-tardio', tag: 'TDAH Adultos', mins: '10', title: 'TDAH en adultos: por qué miles llegan al diagnóstico después de los 30', imgSrc: '/blog/dark-tdah-en-adultos-1200x675.svg' },
                  { href: '/blog/que-es-ados-2-autismo',    tag: 'Autismo / TEA', mins: '11', title: '¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?', imgSrc: '/blog/dark-que-es-el-ados-2-1200x675.svg' },
                ].map((post, i) => (
                  <SectionReveal key={post.href} delay={i * 0.1}>
                    <article
                      className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 group"
                      style={{ border: '1px solid rgba(56,47,81,0.07)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 10px 36px rgba(56,47,81,0.11)')}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.imgSrc}
                        alt={`Artículo: ${post.title}`}
                        width={400}
                        height={240}
                        className="w-full object-cover"
                        style={{ height: '180px' }}
                        loading="lazy"
                      />
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-[10px] font-bold uppercase tracking-widest rounded-full px-2.5 py-1"
                            style={{ background: '#f8f7fc', color: '#5b4e7f' }}
                          >
                            {post.tag}
                          </span>
                          <span className="text-xs" style={{ color: '#515e71' }}>{post.mins} min</span>
                        </div>
                        <h3 className="font-serif font-bold leading-snug mb-4 flex-1" style={{ fontSize: '1.05rem', color: '#382f51', lineHeight: '1.4' }}>
                          {post.title}
                        </h3>
                        <Link
                          href={post.href}
                          className="text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
                          style={{ color: '#5b4e7f', letterSpacing: '0.03em' }}
                        >
                          Leer artículo →
                        </Link>
                      </div>
                    </article>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              11 · LOCATION — Google Maps + address + hours
              ══════════════════════════════════════════════════════ */}
          <section id="ubicacion" aria-labelledby="ubicacion-heading" className="py-20 bg-white border-t border-border scroll-mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#5b4e7f' }}>Dónde encontrarnos</p>
                <h2 id="ubicacion-heading" className="font-serif font-bold leading-tight mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: '#382f51' }}>
                  Consultorio en Cancún
                </h2>
                <div className="w-10 h-0.5 rounded-full mb-10" style={{ background: '#5b4e7f' }} />
              </SectionReveal>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
                {/* Map */}
                <SectionReveal>
                  <div className="rounded-2xl overflow-hidden border-2 border-border shadow-lg" style={{ minHeight: '380px' }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9838296344037!2d-86.89585439999999!3d21.1530418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2b10d813a9c7%3A0x4042823298a0080b!2sPsic%C3%B3loga%20Karen%20Trujillo%20%7C%20Neuropsicolog%C3%ADa%3A%20TDAH%20y%20Autismo!5e0!3m2!1ses-419!2smx!4v1772120174668!5m2!1ses-419!2smx"
                      className="w-full border-0"
                      style={{ minHeight: '380px', display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación del consultorio de la Neuropsicóloga Karen Trujillo en Cancún"
                    />
                  </div>
                </SectionReveal>

                {/* Info */}
                <SectionReveal delay={0.1}>
                  <div className="flex flex-col gap-6">
                    {[
                      {
                        Icon: MapPin,
                        label: 'Dirección',
                        content: (
                          <p className="text-sm leading-relaxed" style={{ color: '#382f51', lineHeight: '1.6' }}>
                            SM200 M49 L2, Hacienda de Chinconcuac<br />
                            Supermanzana Circuito casa 1587B<br />
                            Cancún, Quintana Roo · C.P. 77539
                          </p>
                        ),
                      },
                      {
                        Icon: Clock,
                        label: 'Horario',
                        content: (
                          <div className="text-sm" style={{ color: '#382f51', lineHeight: '1.65' }}>
                            <p>Lunes–Viernes &nbsp;9:00 – 19:00</p>
                            <p>Sábados &nbsp;9:00 – 14:00</p>
                            <p style={{ color: '#515e71' }}>Domingos: cerrado</p>
                          </div>
                        ),
                      },
                      {
                        Icon: Phone,
                        label: 'Teléfono',
                        content: (
                          <a href={`tel:${PHONE_E164}`} className="text-sm font-medium hover:underline" style={{ color: '#382f51' }}>
                            +52 998 321 1547
                          </a>
                        ),
                      },
                    ].map(({ Icon, label, content }) => (
                      <div key={label} className="flex gap-4 items-start">
                        <div
                          className="flex items-center justify-center shrink-0 rounded-xl"
                          style={{ width: '42px', height: '42px', background: '#f8f7fc', border: '1px solid #d0d0e7' }}
                        >
                          <Icon className="w-4 h-4" style={{ color: '#5b4e7f' }} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#5b4e7f' }}>{label}</p>
                          {content}
                        </div>
                      </div>
                    ))}

                    <div className="flex flex-col gap-2.5 pt-2">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=21.1530418,-86.8958544"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border-2 border-border hover:border-primary/50"
                        style={{ color: '#382f51', background: '#fff' }}
                      >
                        <Navigation className="w-4 h-4" aria-hidden="true" />
                        Cómo llegar
                      </a>
                      <a
                        href={waUrl('Hola Karen, me gustaría agendar una cita en tu consultorio de Cancún.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-all hover:opacity-90"
                        style={{ background: '#25d366' }}
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              12 · CTA FINAL — closing conversion
              ══════════════════════════════════════════════════════ */}
          <section id="cta-final" className="py-14 sm:py-20 bg-gradient-to-br from-secondary to-accent-blue/20 border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">¿Lista para dar el primer paso?</h2>
                  <p className="text-muted-foreground font-light max-w-xl mx-auto">
                    Selecciona la evaluación que necesitas o escríbeme por WhatsApp para orientación gratuita.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="grid sm:grid-cols-3 gap-3 mb-10">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.slug}
                      className={`group flex flex-col items-center gap-3 p-5 bg-card border-2 border-border rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${service.borderHover}`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-5 h-5 text-primary/70" aria-hidden="true" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-primary text-sm mb-0.5">{service.label}</p>
                        <p className="text-xs text-muted-foreground font-light">{service.age} · {service.price}</p>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary/50 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Agendar <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="pt-8 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground font-light mb-5">¿Prefieres hablar antes de agendar?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={waUrl('Hola Karen, vi tu página y me gustaría saber más sobre las evaluaciones que ofreces.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-all hover:opacity-90"
                      style={{ background: '#25d366' }}
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-card border-2 border-border hover:border-primary/50 text-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      Llamar
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground/50 text-center mt-4">
                    Lunes a Viernes 9:00–7:00 PM · Sábados 9:00–2:00 PM
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                    <Shield className="w-3.5 h-3.5 text-primary/50" aria-hidden="true" /> Cancelación con 48 hrs
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary/50" aria-hidden="true" /> Reembolso del anticipo
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary/50" aria-hidden="true" /> Cédula {CEDULA}
                  </span>
                </div>
              </SectionReveal>
            </div>
          </section>

        </main>

        <Footer />

        {/* ── Sticky CTA — mobile only, appears after hero ── */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
            <div className="flex gap-2.5 max-w-lg mx-auto">
              <a
                href="#servicios"
                onClick={(e) => { e.preventDefault(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary/25 text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:border-primary/60 transition-all active:scale-[0.97]"
              >
                <Brain className="w-4 h-4" aria-hidden="true" />
                Servicios
              </a>
              <a
                href={waUrl('Hola Karen, vi tu página y me gustaría orientación sobre qué evaluación necesito.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-[0.97]"
                style={{ background: '#25d366' }}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
