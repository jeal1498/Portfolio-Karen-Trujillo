import { useState, useRef, useEffect } from 'react';
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

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const WA_NUMBER = '529983211547';
const PHONE_NUMBER = '529983211547';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const services = [
  {
    slug: '/evaluacion-tdah-ninos',
    icon: Users,
    label: 'TDAH Infantil',
    title: 'Valoración TDAH en Niños',
    age: '5-17 años',
    desc: 'Evaluación con CONNERS-3, WISC-V, BRIEF-2 y CPT-3. Informe con adecuaciones curriculares y validez oficial ante la escuela.',
    price: '$7,000 MXN',
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
    price: '$7,000 MXN',
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

const credentials = [
  { icon: BadgeCheck, text: 'Cédula Federal 11009616' },
  { icon: Award, text: '7+ años de experiencia' },
  { icon: Stethoscope, text: 'Pruebas estandarizadas internacionales' },
  { icon: Star, text: '47+ reseñas · 5 estrellas' },
  { icon: FileText, text: 'Informes con validez oficial SEP e IMSS' },
  { icon: CalendarCheck, text: 'Agenda en línea · Resultados en semanas' },
];

const whyNeuropsychology = [
  { title: 'Pruebas estandarizadas, no solo entrevista', desc: 'Instrumentos con normas internacionales que miden funciones cognitivas de forma objetiva y cuantificable.' },
  { title: 'Diagnóstico diferencial preciso', desc: 'Diferencia TDAH de ansiedad, autismo de timidez, burnout de déficit atencional — con datos, no con impresiones.' },
  { title: 'Informe con validez oficial', desc: 'Documento respaldado por cédula profesional federal, aceptado por escuelas, SEP, IMSS y empleadores.' },
  { title: 'Recomendaciones accionables', desc: 'No solo un diagnóstico — un plan concreto de intervención para la escuela, el trabajo y la vida diaria.' },
];

const reviews = [
  { name: 'Mamá de Sofía, 7 años', text: 'Por fin alguien nos explicó qué pasaba con nuestra hija. El informe fue tan claro que la escuela implementó las adecuaciones de inmediato.', stars: 5, service: 'TDAH Infantil' },
  { name: 'Alejandro, 34 años', text: 'Llevaba años pensando que era "flojo". El informe me mostró exactamente qué funciones ejecutivas estaban afectadas. Fue liberador.', stars: 5, service: 'TDAH Adultos' },
  { name: 'Mamá de Emilia, 6 años', text: 'Nos dijeron que solo era "tímida". El diagnóstico de TEA nivel 1 nos dio claridad total. Las recomendaciones han transformado cómo la acompañamos.', stars: 5, service: 'Autismo (TEA)' },
  { name: 'Papá de Diego, 10 años', text: 'Llevábamos dos años con dudas. Karen fue profesional, cálida y el proceso fue mucho más claro de lo que esperábamos.', stars: 5, service: 'TDAH Infantil' },
  { name: 'Mariana, 28 años', text: 'Me diagnosticaron ansiedad dos veces antes de llegar aquí. Resultó ser TDAH inatento. Por fin entiendo por qué las estrategias anteriores no funcionaban.', stars: 5, service: 'TDAH Adultos' },
  { name: 'Mamá de Santiago, 4 años', text: 'Karen nos dio respuestas en 3 semanas. El informe fue tan detallado que la escuela supo exactamente qué implementar.', stars: 5, service: 'Autismo (TEA)' },
];

const faqItems = [
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
    a: 'Sí. Todos los informes clínicos están respaldados por cédula profesional federal 11009616 emitida por la SEP. Tienen validez oficial ante instituciones educativas, la Secretaría de Educación Pública, IMSS, empleadores y dependencias gubernamentales en todo México.',
  },
  {
    q: '¿Cuánto cuesta una evaluación neuropsicológica en Cancún?',
    a: 'La valoración de TDAH (infantil o adulto) tiene un costo de $7,000 MXN. La evaluación de autismo (TEA) tiene un costo de $8,500 MXN. Ambos procesos incluyen todas las sesiones, pruebas estandarizadas, informe clínico completo y sesión de devolución. Se solicita un anticipo al agendar que forma parte del costo total.',
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
   SCHEMA LD+JSON — Organization + Person + LocalBusiness + Services
   ═══════════════════════════════════════════════════════════════ */

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    /* ── MedicalBusiness (LocalBusiness + Medical) ── */
    {
      '@type': ['MedicalBusiness', 'MedicalClinic'],
      '@id': 'https://psicologakarentrujillo.com.mx/#clinic',
      name: 'Neuropsicóloga Karen Trujillo — Consultorio de Neuropsicología',
      alternateName: 'Consultorio Neuropsicóloga Karen Trujillo',
      url: 'https://psicologakarentrujillo.com.mx',
      telephone: '+529983211547',
      image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
      description: 'Consultorio de neuropsicología clínica en Cancún, Quintana Roo. Especialista en diagnóstico de TDAH (niños y adultos) y Trastorno del Espectro Autista (TEA) con pruebas estandarizadas internacionales.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'SM200 M49 L2, Hacienda de Chinconcuac Supermanzana Circuito casa 1587B',
        addressLocality: 'Cancún',
        addressRegion: 'Quintana Roo',
        postalCode: '77539',
        addressCountry: 'MX',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.1619,
        longitude: -86.8515,
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
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '14:00',
        },
      ],
      priceRange: '$7,000 - $8,500 MXN',
      medicalSpecialty: 'Neuropsychiatry',
      currenciesAccepted: 'MXN',
      paymentAccepted: 'Efectivo, Transferencia bancaria, Tarjeta',
      areaServed: {
        '@type': 'City',
        name: 'Cancún',
        sameAs: 'https://www.wikidata.org/wiki/Q8969',
        containedInPlace: { '@type': 'State', name: 'Quintana Roo', sameAs: 'https://www.wikidata.org/wiki/Q10507' },
      },
      member: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      sameAs: [
        'https://www.facebook.com/share/1Bs93MjeKt/',
        'https://www.instagram.com/psicologakarentrujillo',
        'https://www.tiktok.com/@psic.karentrujillo',
      ],
    },
    /* ── Physician ── */
    {
      '@type': 'Physician',
      '@id': 'https://psicologakarentrujillo.com.mx/#physician',
      name: 'Karen Trujillo',
      jobTitle: 'Neuropsicóloga Clínica — Especialista en TDAH y Autismo',
      url: 'https://psicologakarentrujillo.com.mx',
      image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
      telephone: '+529983211547',
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Cédula Profesional Federal',
        credentialId: '11009616',
        issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
      },
      medicalSpecialty: 'Neuropsychiatry',
      knowsAbout: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista', sameAs: 'https://www.wikidata.org/wiki/Q38404' },
      ],
      areaServed: {
        '@type': 'City',
        name: 'Cancún',
        sameAs: 'https://www.wikidata.org/wiki/Q8969',
      },
      sameAs: [
        'https://www.facebook.com/share/1Bs93MjeKt/',
        'https://www.instagram.com/psicologakarentrujillo',
        'https://www.tiktok.com/@psic.karentrujillo',
      ],
    },
    /* ── WebSite ── */
    {
      '@type': 'WebSite',
      '@id': 'https://psicologakarentrujillo.com.mx/#website',
      name: 'Neuropsicóloga Karen Trujillo',
      url: 'https://psicologakarentrujillo.com.mx',
      inLanguage: 'es-MX',
      publisher: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
    },
    /* ── WebPage ── */
    {
      '@type': 'MedicalWebPage',
      name: 'Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo',
      url: 'https://psicologakarentrujillo.com.mx',
      description: 'Evaluaciones neuropsicológicas de TDAH en niños y adultos, y diagnóstico de autismo (TEA) con ADOS-2 en Cancún. Informes con validez oficial. Cédula 11009616.',
      inLanguage: 'es-MX',
      isPartOf: { '@id': 'https://psicologakarentrujillo.com.mx/#website' },
      about: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista', sameAs: 'https://www.wikidata.org/wiki/Q38404' },
      ],
      reviewedBy: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      lastReviewed: '2025-06-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://psicologakarentrujillo.com.mx' },
        ],
      },
    },
    /* ── Services ── */
    {
      '@type': 'MedicalProcedure',
      name: 'Valoración Neuropsicológica de TDAH Infantil',
      url: 'https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos',
      procedureType: 'Diagnostic',
      provider: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      location: { '@id': 'https://psicologakarentrujillo.com.mx/#clinic' },
      offers: { '@type': 'Offer', price: '7000', priceCurrency: 'MXN' },
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Valoración Neuropsicológica de TDAH en Adultos',
      url: 'https://psicologakarentrujillo.com.mx/evaluacion-tdah-adultos',
      procedureType: 'Diagnostic',
      provider: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      location: { '@id': 'https://psicologakarentrujillo.com.mx/#clinic' },
      offers: { '@type': 'Offer', price: '7000', priceCurrency: 'MXN' },
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Evaluación Neuropsicológica de Autismo (TEA)',
      url: 'https://psicologakarentrujillo.com.mx/evaluacion-autismo-cancun',
      procedureType: 'Diagnostic',
      provider: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      location: { '@id': 'https://psicologakarentrujillo.com.mx/#clinic' },
      offers: { '@type': 'Offer', price: '8500', priceCurrency: 'MXN' },
    },
    /* ── AggregateRating ── */
    {
      '@type': 'AggregateRating',
      itemReviewed: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    /* ── FAQ ── */
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function SectionReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { rootMargin: '-80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}s`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </div>
  );
}


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
      const pastHero = window.scrollY > heroHeight;
      const beforeFooterCta = footerCtaTop > window.innerHeight;
      setShowStickyCta(pastHero && beforeFooterCta);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo · Cédula 11009616</title>
        <meta name="description" content="Evaluaciones neuropsicológicas de TDAH en niños y adultos, y diagnóstico de autismo (TEA) con ADOS-2 en Cancún. Pruebas estandarizadas internacionales. Informes con validez oficial. Agenda en línea." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx" />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content="21.1619;-86.8515" />
        <meta name="ICBM" content="21.1619, -86.8515" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo" />
        <meta property="og:description" content="Evaluaciones neuropsicológicas con pruebas estandarizadas internacionales. TDAH niños, TDAH adultos y autismo (TEA). Informes con validez oficial." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo" />
        <meta name="twitter:description" content="Diagnóstico de TDAH y autismo con pruebas estandarizadas. Informes con validez oficial. Cancún, Q. Roo." />

        {/* AEO: Speakable */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#que-es-neuropsicologia', '#servicios', '#ubicacion'],
          },
          url: 'https://psicologakarentrujillo.com.mx',
        }) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        {/* Performance: CSS keyframes for hero animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              1 · HERO — Positioning + trust signals
              ══════════════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-blue/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pink/25 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-5xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-center">

                {/* Left: Copy */}
                <div className="text-center lg:text-left">
                  <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-primary/10">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-sm shadow-success shrink-0" />
                      <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground">Cancún, Quintana Roo · Cédula Federal 11009616</span>
                    </div>

                    <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.1] mb-4 text-balance">
                      Neuropsicóloga<br /> en Cancún
                    </h1>

                    <p className="text-lg sm:text-2xl font-serif text-primary/80 italic mb-6 max-w-xl mx-auto lg:mx-0">
                      Diagnósticos claros que transforman vidas
                    </p>

                    <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                      Evaluaciones neuropsicológicas de <strong className="text-primary font-semibold">TDAH</strong> y <strong className="text-primary font-semibold">Autismo (TEA)</strong> con pruebas estandarizadas internacionales. Informes clínicos con <strong className="text-primary font-semibold">validez oficial</strong> ante escuelas, SEP, IMSS y empleadores.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                      <a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }} className="group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-300">
                        Ver servicios
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                      <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, vi tu página y me gustaría orientación sobre qué evaluación necesito. ¿Podrías ayudarme?')}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-7 py-4 rounded-2xl border-2 border-primary/25 text-primary hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-muted-foreground animate-[fadeIn_0.8s_ease-out_0.6s_both]">
                    {[
                      { icon: BadgeCheck, text: 'Cédula 11009616' },
                      { icon: Star, text: '47+ reseñas · 5 estrellas' },
                      { icon: Stethoscope, text: 'Pruebas internacionales' },
                    ].map((badge) => (
                      <span key={badge.text} className="flex items-center gap-1.5">
                        <badge.icon className="w-3.5 h-3.5 text-primary/50" />
                        <span className="font-medium">{badge.text}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Photo */}
                <div className="hidden lg:flex justify-center animate-[fadeIn_1s_ease-out_0.4s_both]">
                  <div className="relative">
                    <div className="w-64 h-80 rounded-3xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/15">
                      <Image
                        src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                        alt="Neuropsicóloga Karen Trujillo — especialista en TDAH y autismo en Cancún"
                        width={256}
                        height={320}
                        className="w-full h-full object-cover object-top"
                        priority
                        unoptimized
                      />
                    </div>
                    <div className="absolute -bottom-5 -left-5 bg-gradient-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-xl shadow-primary/25">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-primary-foreground/70">Cédula Federal</p>
                      <p className="text-lg font-bold font-mono">11009616</p>
                    </div>
                    <div className="absolute -top-3 -right-3 bg-card border border-border rounded-2xl px-4 py-2 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                        <span className="text-sm font-bold text-primary">5.0</span>
                        <span className="text-[10px] text-muted-foreground font-light">(47+)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </section>


          {/* ══════════════════════════════════════════════════════
              1.5 · SEGMENTADOR — "¿Quién eres?" routing
              ══════════════════════════════════════════════════════ */}
          <section className="py-10 sm:py-14 bg-card border-b border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Encuentra tu evaluación</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3 text-center">¿Cuál es tu situación?</h2>
                <p className="text-muted-foreground font-light text-center max-w-lg mx-auto mb-8">Selecciona la opción que mejor te describe y te llevamos directo a la información que necesitas.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    href: '/evaluacion-tdah-ninos',
                    icon: Users,
                    emoji: '👦',
                    title: 'Soy padre/madre',
                    subtitle: 'Mi hijo tiene problemas de atención o conducta',
                    color: 'from-accent-blue/15 to-primary/10',
                    border: 'hover:border-accent-blue/60',
                  },
                  {
                    href: '/evaluacion-tdah-adultos',
                    icon: Briefcase,
                    emoji: '🧠',
                    title: 'Soy adulto',
                    subtitle: 'Sospecho que tengo TDAH no diagnosticado',
                    color: 'from-primary/15 to-accent-blue/10',
                    border: 'hover:border-primary/60',
                  },
                  {
                    href: '/evaluacion-autismo-cancun',
                    icon: Puzzle,
                    emoji: '🧩',
                    title: 'Busco diagnóstico de autismo',
                    subtitle: 'Mi hijo se relaciona de forma diferente',
                    color: 'from-accent-pink/15 to-primary/10',
                    border: 'hover:border-accent-pink/60',
                  },
                ].map((option, i) => (
                  <SectionReveal key={option.href} delay={i * 0.08}>
                    <Link
                      href={option.href}
                      className={`group flex flex-col items-center text-center gap-4 p-6 sm:p-7 bg-secondary/50 border-2 border-border rounded-2xl hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300 h-full ${option.border}`}
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-2xl`}>
                        {option.emoji}
                      </div>
                      <div>
                        <p className="font-bold text-primary text-base mb-1">{option.title}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{option.subtitle}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/50 group-hover:text-primary group-hover:gap-2.5 transition-all mt-auto">
                        Ver evaluación <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <p className="text-center text-xs text-muted-foreground/60 mt-6">
                  ¿No estás seguro? <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, no estoy seguro qué evaluación necesito. ¿Podrías orientarme?')}`} target="_blank" rel="noopener noreferrer" className="text-primary font-medium underline underline-offset-2 hover:text-primary/80 transition-colors">Escríbeme por WhatsApp</a> y te oriento sin costo.
                </p>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · SERVICES — 3 pillars
              ══════════════════════════════════════════════════════ */}
          <section id="servicios" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-5xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Servicios de evaluación neuropsicológica</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Qué necesitas evaluar?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">Cada evaluación sigue un protocolo clínico riguroso con pruebas estandarizadas internacionales. Selecciona el servicio que más se ajusta a tu situación.</p>
              </SectionReveal>

              <div className="grid md:grid-cols-3 gap-5">
                {services.map((service, i) => (
                  <SectionReveal key={service.slug} delay={i * 0.1}>
                    <Link href={service.slug} className={`group block bg-card border-2 border-border rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300 h-full ${service.borderHover}`}>
                      {/* Header */}
                      <div className="p-6 pb-4 border-b border-border relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-50`} />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                              <service.icon className="w-5 h-5 text-primary/70" />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-card/80 px-3 py-1 rounded-full border border-border">{service.age}</span>
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-1">{service.label}</p>
                          <h3 className="text-xl font-serif font-bold text-primary leading-tight">{service.title}</h3>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6 space-y-4">
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{service.desc}</p>

                        <div className="flex flex-wrap gap-1.5">
                          {service.tests.map((test) => (
                            <span key={test} className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary border border-border rounded-full text-[10px] text-muted-foreground font-medium">
                              <Brain className="w-2.5 h-2.5 text-primary/40" />
                              {test}
                            </span>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Desde</p>
                            <p className="text-lg font-serif font-bold text-primary">{service.price}</p>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                            Ver más
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>

                      {/* Emotional hook */}
                      <div className="px-6 pb-5">
                        <p className="text-xs text-primary/60 italic font-serif">{service.cta}</p>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.35}>
                <div className="mt-10 text-center">
                  <p className="text-sm text-muted-foreground font-light mb-4">¿No estás seguro cuál necesitas?</p>
                  <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, no estoy seguro qué evaluación necesito. ¿Podrías orientarme?')}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-xl border-2 border-primary/25 text-primary hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
                    <MessageCircle className="w-4 h-4" />
                    Orientación gratuita por WhatsApp
                  </a>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              2.5 · MINI-PROCESO — 3 steps to clarity
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card border-b border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Así de simple</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">3 pasos hacia la claridad</h2>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-6 sm:gap-4 relative">
                {/* Connecting line (desktop) */}
                <div className="absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden sm:block" />

                {[
                  {
                    step: '01',
                    icon: CalendarCheck,
                    title: 'Agenda tu cita',
                    desc: 'Elige fecha y hora en línea. Confirma con el anticipo y tu lugar queda reservado.',
                    accent: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
                  },
                  {
                    step: '02',
                    icon: ClipboardList,
                    title: 'Evalúa con pruebas reales',
                    desc: 'En 3-5 sesiones presenciales aplicamos pruebas estandarizadas internacionales con rigor clínico.',
                    accent: 'text-primary bg-primary/10 border-primary/20',
                  },
                  {
                    step: '03',
                    icon: FileText,
                    title: 'Recibe tu informe',
                    desc: 'Diagnóstico claro, perfil detallado y recomendaciones concretas. Informe con validez oficial.',
                    accent: 'text-success bg-success/10 border-success/20',
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.step} delay={i * 0.12}>
                    <div className="flex flex-col items-center text-center group">
                      <div className={`relative w-20 h-20 rounded-2xl border-2 ${item.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                        <item.icon className="w-8 h-8" />
                        <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-card border-2 border-border flex items-center justify-center text-[11px] font-bold text-primary shadow-sm">{item.step}</span>
                      </div>
                      <h3 className="font-bold text-primary text-base mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-[260px]">{item.desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.4}>
                <div className="mt-10 flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/8 border border-success/20 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-success" />
                    <span className="text-[10px] font-bold text-success uppercase tracking-widest">Reembolso completo si cancelas con 48 hrs</span>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · WHY NEUROPSYCHOLOGY — Differentiator
              ══════════════════════════════════════════════════════ */}
          <section id="que-es-neuropsicologia" className="py-14 sm:py-20 bg-card">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">¿Por qué neuropsicología?</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">No es lo mismo una consulta que una evaluación neuropsicológica</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">La neuropsicología mide cómo funciona tu cerebro con instrumentos objetivos. No se basa en impresiones — se basa en datos.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {whyNeuropsychology.map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-4 p-5 sm:p-6 bg-secondary/50 rounded-2xl border border-border hover:border-accent-blue/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/15 to-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="w-4 h-4 text-primary/60" />
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
              4 · ABOUT KAREN — Condensed bio
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground w-full">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-14 items-center">
                  {/* Photo — visible on all screens */}
                  <div className="flex justify-center md:justify-start">
                    <div className="relative">
                      <div className="w-44 h-44 md:w-52 md:h-52 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                        <Image
                          src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                          alt="Neuropsicóloga Karen Trujillo — Cancún"
                          width={208}
                          height={208}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/50 mb-3">La especialista</p>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Karen Trujillo</h2>
                    <p className="text-primary-foreground/70 font-light leading-relaxed mb-6">
                      Neuropsicóloga clínica con más de <strong className="text-primary-foreground font-semibold">7 años de experiencia</strong> en la evaluación y diagnóstico de TDAH y Trastorno del Espectro Autista en niños, adolescentes y adultos en Cancún. Domina instrumentos de clase mundial: CONNERS-3, WISC-V, WAIS-IV, CAARS-2, ADOS-2, ADI-R, BRIEF-2 y CPT-3. Cada evaluación combina <strong className="text-primary-foreground font-semibold">rigor clínico con calidez humana</strong> — las familias no solo reciben un diagnóstico, sino una hoja de ruta concreta.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { valor: '7+', label: 'años de experiencia' },
                        { valor: '500+', label: 'evaluaciones realizadas' },
                        { valor: '47+', label: 'reseñas 5 estrellas' },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white/10 border border-white/15 rounded-xl p-3 text-center">
                          <p className="text-xl font-serif font-bold text-primary-foreground">{stat.valor}</p>
                          <p className="text-[10px] text-primary-foreground/55 font-light mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                  {credentials.map((cred) => (
                    <div key={cred.text} className="flex items-center gap-2.5 p-3 bg-white/8 border border-white/12 rounded-xl">
                      <cred.icon className="w-4 h-4 text-accent-blue shrink-0" />
                      <span className="text-xs text-primary-foreground/80 font-medium leading-snug">{cred.text}</span>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · SOCIAL PROOF — Reviews (mixed services)
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary">
            <div className="max-w-5xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Lo que dicen quienes ya se evaluaron</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">47+ familias y adultos con claridad</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">Reseñas de evaluaciones de TDAH infantil, TDAH adulto y autismo.</p>
              </SectionReveal>

              <div className="grid md:grid-cols-3 gap-5">
                {reviews.map((review, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent-blue/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                      <div className="absolute top-3 right-4 text-6xl font-serif text-primary/5 group-hover:text-primary/10 transition-colors leading-none select-none">&ldquo;</div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.stars }).map((_, j) => (
                            <Star key={j} className="w-3.5 h-3.5 text-warning fill-warning" />
                          ))}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 bg-secondary px-2 py-0.5 rounded-full">{review.service}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-1 relative z-10">&ldquo;{review.text}&rdquo;</p>
                      <div className="flex items-center gap-2 pt-4 border-t border-border">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-blue/20 to-primary/15 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary/60">{review.name.charAt(0)}</span>
                        </div>
                        <p className="text-xs font-bold text-primary">{review.name}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6 · FAQ — General
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-10 text-center">Preguntas frecuentes</h2>
              </SectionReveal>

              <div className="space-y-2">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div className={`bg-secondary/50 border-2 rounded-2xl transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-primary/50 shadow-lg shadow-primary/8' : 'border-border hover:border-accent-blue/30 hover:shadow-sm'}`}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                        className="w-full p-5 sm:p-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? 'border-primary bg-primary/10' : 'border-border'}`}>
                          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                        </div>
                      </button>
                      <div
                        id={`faq-answer-${i}`}
                        role="region"
                        className="grid transition-all duration-300"
                        style={{
                          gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                          opacity: openFaq === i ? 1 : 0,
                          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-border/50 pt-4">
                            <p className="text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6.5 · RECURSOS — Blog / Topical authority placeholder
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary/50 border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Aprende más</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center">Recursos sobre TDAH y Autismo</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-10">Información basada en evidencia para entender mejor estas condiciones.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    href: '/blog/senales-tdah-ninos',
                    icon: Users,
                    category: 'TDAH Infantil',
                    title: '¿Tu hijo no pone atención? Señales reales de TDAH vs. comportamiento típico',
                    desc: 'Aprende a distinguir entre falta de atención normal y las señales que justifican una evaluación neuropsicológica.',
                    color: 'from-accent-blue/10 to-accent-blue/5',
                  },
                  {
                    href: '/blog/tdah-adultos-diagnostico-tardio',
                    icon: Brain,
                    category: 'TDAH Adultos',
                    title: 'TDAH en adultos: por qué miles de personas llegan al diagnóstico después de los 30',
                    desc: 'Procrastinación crónica, desorganización y bajo rendimiento laboral pueden tener una explicación neurológica.',
                    color: 'from-primary/10 to-primary/5',
                  },
                  {
                    href: '/blog/que-es-ados-2-autismo',
                    icon: Puzzle,
                    category: 'Autismo (TEA)',
                    title: '¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?',
                    desc: 'Entiende por qué esta prueba de observación directa supera cualquier método de diagnóstico basado solo en entrevista.',
                    color: 'from-accent-pink/10 to-accent-pink/5',
                  },
                ].map((resource, i) => (
                  <SectionReveal key={resource.href} delay={i * 0.08}>
                    <Link href={resource.href} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-blue/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                      {/* Top accent bar */}
                      <div className={`h-1.5 bg-gradient-to-r ${resource.color}`} />
                      <div className="p-5 sm:p-6 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <resource.icon className="w-3.5 h-3.5 text-primary/40" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{resource.category}</span>
                        </div>
                        <h3 className="font-bold text-primary text-sm leading-snug mb-2 group-hover:text-primary/80 transition-colors">{resource.title}</h3>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4 flex-1">{resource.desc}</p>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary group-hover:gap-2 transition-all">
                          Leer más <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.25}>
                <div className="text-center mt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/20 text-primary font-bold text-[11px] uppercase tracking-widest hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
                  >
                    Ver todos los artículos
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SectionReveal>

            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6.7 · UBICACIÓN — Google Maps + address + hours
              ══════════════════════════════════════════════════════ */}
          <section id="ubicacion" className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Consultorio en Cancún</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">¿Dónde estamos?</h2>
              </SectionReveal>

              <div className="grid md:grid-cols-[1fr_320px] gap-6">
                {/* Map embed */}
                <SectionReveal>
                  <div className="rounded-2xl overflow-hidden border-2 border-border shadow-lg shadow-primary/5 bg-secondary" style={{ minHeight: '380px' }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9838296344037!2d-86.89585439999999!3d21.1530418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2b10d813a9c7%3A0x4042823298a0080b!2sPsic%C3%B3loga%20Karen%20Trujillo%20%7C%20Neuropsicolog%C3%ADa%3A%20TDAH%20y%20Autismo!5e0!3m2!1ses-419!2smx!4v1772120174668!5m2!1ses-419!2smx"
                      className="w-full h-full border-0"
                      style={{ minHeight: '380px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación del consultorio de la Neuropsicóloga Karen Trujillo en Cancún"
                    />
                  </div>
                </SectionReveal>

                {/* Info card */}
                <SectionReveal delay={0.1}>
                  <div className="bg-secondary/50 border border-border rounded-2xl p-6 h-full flex flex-col justify-between">
                    {/* Address */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-primary/70" />
                        </div>
                        <p className="font-bold text-primary text-sm">Dirección</p>
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed pl-[46px]">
                        SM200 M49 L2, Hacienda de Chinconcuac<br />
                        Supermanzana Circuito casa 1587B<br />
                        Cancún, Quintana Roo · C.P. 77539
                      </p>
                    </div>

                    {/* Hours */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-accent-blue/10 border border-accent-blue/15 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-accent-blue/70" />
                        </div>
                        <p className="font-bold text-primary text-sm">Horario</p>
                      </div>
                      <div className="text-sm text-muted-foreground font-light leading-relaxed pl-[46px] space-y-1">
                        <div className="flex justify-between">
                          <span>Lunes a Viernes</span>
                          <span className="font-medium text-foreground">9:00 – 7:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sábados</span>
                          <span className="font-medium text-foreground">9:00 – 2:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Domingos</span>
                          <span className="text-muted-foreground/50">Cerrado</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact shortcuts */}
                    <div className="space-y-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=21.1530418,-86.8958544`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-card border-2 border-border rounded-xl text-primary font-bold text-[10px] uppercase tracking-widest hover:border-primary/50 hover:shadow-md transition-all active:scale-[0.98]"
                      >
                        <Navigation className="w-4 h-4" />
                        Cómo llegar
                      </a>
                      <a
                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, me gustaría agendar una cita en tu consultorio de Cancún.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              7 · CTA — Contact + quick links
              ══════════════════════════════════════════════════════ */}
          <section id="cta-final" className="py-14 sm:py-20 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">¿Lista para dar el primer paso?</h2>
                  <p className="text-muted-foreground font-light max-w-xl mx-auto">Selecciona la evaluación que necesitas o escríbeme por WhatsApp para orientación gratuita.</p>
                </div>
              </SectionReveal>

              {/* Quick service links */}
              <SectionReveal delay={0.1}>
                <div className="grid sm:grid-cols-3 gap-3 mb-10">
                  {services.map((service) => (
                    <Link key={service.slug} href={service.slug} className={`group flex flex-col items-center gap-3 p-5 bg-card border-2 border-border rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${service.borderHover}`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-5 h-5 text-primary/70" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-primary text-sm mb-0.5">{service.label}</p>
                        <p className="text-[10px] text-muted-foreground font-light">{service.age} · {service.price}</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Agendar <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </SectionReveal>

              {/* Contact */}
              <SectionReveal delay={0.2}>
                <div className="pt-8 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground font-light mb-5">¿Prefieres hablar antes de agendar?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, vi tu página y me gustaría saber más sobre las evaluaciones que ofreces.')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a href={`tel:${PHONE_NUMBER}`} className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-card border-2 border-border hover:border-primary/50 text-primary font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
                      <Phone className="w-4 h-4" />
                      Llamar
                    </a>
                  </div>
                  <p className="text-[10px] text-muted-foreground/50 text-center mt-4">Lunes a Viernes 9:00–7:00 PM · Sábados 9:00–2:00 PM</p>
                </div>
              </SectionReveal>

              {/* Trust badges */}
              <SectionReveal delay={0.3}>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><Shield className="w-3.5 h-3.5 text-primary/50" /> Cancelación con 48 hrs</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><ShieldCheck className="w-3.5 h-3.5 text-primary/50" /> Reembolso del anticipo</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><BadgeCheck className="w-3.5 h-3.5 text-primary/50" /> Cédula 11009616</span>
                </div>
              </SectionReveal>
            </div>
          </section>

        </main>

        <Footer />

        {/* ══════════════════════════════════════════════════════
            STICKY CTA — Mobile only, appears after hero
            ══════════════════════════════════════════════════════ */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
            <div className="flex gap-2.5 max-w-lg mx-auto">
              <a
                href="#servicios"
                onClick={(e) => { e.preventDefault(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary/25 text-primary font-bold text-[10px] uppercase tracking-widest rounded-xl hover:border-primary/60 transition-all active:scale-[0.97]"
              >
                <Brain className="w-4 h-4" />
                Servicios
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, vi tu página y me gustaría orientación sobre qué evaluación necesito.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-whatsapp text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-[0.97]"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
