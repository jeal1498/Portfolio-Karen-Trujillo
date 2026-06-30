import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Brain, FileText, CheckCircle2,
  ShieldCheck, MessageCircle, Clock,
  Star, BadgeCheck, Briefcase,
  ChevronDown, BookOpen, ArrowLeft, ListChecks, HelpCircle,
  Users, Facebook, Link2, Stethoscope, DollarSign,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const CANONICAL_URL = `${SITE_URL}/blog/evaluacion-neuropsicologica-adultos-cancun`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const whenToConsider = [
  {
    signal: 'Procrastinación crónica que afecta tu trabajo o tus finanzas',
    detail: 'No es pereza — es una dificultad real para iniciar tareas sin urgencia. Si esto ha sido un patrón constante desde la adolescencia o antes, vale la pena investigarlo.',
  },
  {
    signal: 'Dificultad sostenida para mantener la atención',
    detail: 'Reuniones, lecturas largas, trámites: la atención se va. No siempre, pero sí en contextos de baja estimulación. Y cuando algo te interesa, puedes pasar horas sin parar.',
  },
  {
    signal: 'Relaciones que se tensan repetidamente por los mismos patrones',
    detail: 'Tu pareja dice que nunca escuchas, olvidas compromisos, reaccionas de forma desproporcionada. No es falta de interés — puede ser desregulación emocional asociada a TDAH.',
  },
  {
    signal: 'Sensación de rendir por debajo de tu potencial',
    detail: 'Sabes que puedes más. Lo has sabido siempre. Pero hay algo que no encaja entre lo que eres capaz de hacer en teoría y lo que logras en la práctica.',
  },
  {
    signal: 'Diagnósticos previos que no explicaron del todo lo que te pasa',
    detail: 'Ansiedad, depresión, burnout… tratamientos que ayudaron a medias. Si algo siempre se quedó sin explicar, el diagnóstico neuropsicológico puede ser la pieza faltante.',
  },
];

const processSteps = [
  {
    num: '1',
    title: 'Entrevista diagnóstica (DIVA 2.0)',
    desc: 'Entrevista estructurada retrospectiva que recoge síntomas de TDAH en la infancia y en la adultez, en los dos dominios principales: inatención e hiperactividad-impulsividad. Es el punto de partida del diagnóstico diferencial.',
    duration: 'Sesión 1 — 60-90 min',
  },
  {
    num: '2',
    title: 'Escalas de síntomas TDAH (CAARS-2)',
    desc: 'La Conners Adult ADHD Rating Scale (2ª edición) es el cuestionario estandarizado de referencia para TDAH en adultos. Incluye autoinforme y reporte de un observador. Mide intensidad y frecuencia de síntomas con normas por edad y sexo.',
    duration: 'Sesión 1-2 — autoadministrada',
  },
  {
    num: '3',
    title: 'Perfil cognitivo completo (WAIS-IV)',
    desc: 'La Wechsler Adult Intelligence Scale (4ª edición) es el estándar de oro para evaluar el perfil intelectual en adultos. Mide razonamiento verbal, perceptual, memoria de trabajo y velocidad de procesamiento — los cuatro índices que el TDAH puede afectar de forma diferencial.',
    duration: 'Sesión 2 — 60-90 min',
  },
  {
    num: '4',
    title: 'Funciones ejecutivas (BRIEF-2A)',
    desc: 'El Behavior Rating Inventory of Executive Function (versión adultos) mide ocho funciones ejecutivas en la vida cotidiana: inhibición, flexibilidad, control emocional, iniciativa, memoria de trabajo, planificación, organización y monitoreo.',
    duration: 'Sesión 2-3 — autoadministrada',
  },
  {
    num: '5',
    title: 'Atención sostenida computarizada (CPT-3)',
    desc: 'El Conners Continuous Performance Test (3ª edición) mide objetivamente la atención sostenida durante 14 minutos de tarea computarizada. No depende del autoinforme — registra tiempo de reacción, errores de omisión y comisión con normas internacionales.',
    duration: 'Sesión 3 — 20 min',
  },
];

const reportUses = [
  {
    area: 'Laboral',
    icon: Briefcase,
    items: [
      'Solicitar adecuaciones razonables ante el empleador',
      'Justificar necesidades específicas ante el IMSS o seguridad social',
      'Respaldo oficial para procesos de incapacidad temporal si aplica',
    ],
  },
  {
    area: 'Salud',
    icon: Stethoscope,
    items: [
      'Insumo clínico para psiquiatra o neurólogo que evalúe medicación',
      'Base para psicoterapia cognitivo-conductual enfocada en TDAH adulto',
      'Identificación de comorbilidades: ansiedad, depresión, dificultades de sueño',
    ],
  },
  {
    area: 'Personal',
    icon: Brain,
    items: [
      'Claridad sobre por qué ciertas cosas siempre han costado más trabajo',
      'Fin a la autocrítica: entender que no es pereza ni falta de voluntad',
      'Punto de partida para construir estrategias que sí funcionan para tu cerebro',
    ],
  },
];

const faqItems = [
  {
    q: '¿Hay lista de espera para la evaluación?',
    a: 'El consultorio tiene agenda limitada. La disponibilidad varía según la temporada. La forma más rápida de conocer la próxima fecha disponible es contactar directamente por WhatsApp — Karen responde el mismo día en horario de atención.',
  },
  {
    q: '¿Se puede hacer la evaluación en línea?',
    a: 'La mayoría de las pruebas de la batería requieren presencia física en el consultorio — especialmente el CPT-3 y las tareas del WAIS-IV que requieren materiales manipulativos. La entrevista inicial (DIVA 2.0) y la sesión de devolución de resultados pueden hacerse por videollamada si el paciente viene de fuera de Cancún.',
  },
  {
    q: '¿Lo cubre el IMSS o el seguro médico?',
    a: 'El IMSS no cubre evaluaciones neuropsicológicas de manera rutinaria. Algunos seguros de gastos médicos mayores pueden cubrir parcialmente la evaluación con recibo desglosado; es necesario verificar con tu aseguradora. Karen emite recibo por cada pago para facilitar el trámite.',
  },
  {
    q: '¿Cuánto dura el proceso completo?',
    a: 'Entre 2 y 3 semanas desde la primera sesión. El proceso incluye 4-5 citas de 60-90 minutos cada una. Después de la última sesión de evaluación, Karen toma 5-7 días hábiles para el análisis clínico y la elaboración del informe. La sesión de devolución se agenda al finalizar ese período.',
  },
  {
    q: '¿El informe tiene validez oficial?',
    a: `Sí. El informe clínico está respaldado por cédula profesional federal ${CEDULA} emitida por la SEP. Tiene validez ante empleadores, universidades, IMSS e instituciones gubernamentales. Incluye diagnóstico formal con código CIE-10, perfil de funciones ejecutivas, instrumentos utilizados con edición y norma, y recomendaciones de intervención.`,
  },
  {
    q: '¿Es normal sentirse nervioso antes de la evaluación?',
    a: 'Completamente. Muchos adultos llegan con años de duda y cierta angustia de "qué van a encontrar". La primera sesión (DIVA 2.0) es una conversación estructurada — no hay respuestas correctas ni incorrectas. El objetivo no es "pasar" una prueba, sino recopilar información para que el diagnóstico sea lo más preciso posible.',
  },
];

const relatedResources = [
  {
    href: '/blog/tdah-adultos-diagnostico-tardio',
    icon: Users,
    category: 'TDAH Adultos',
    title: 'TDAH en adultos: por qué miles llegan al diagnóstico después de los 30',
    img: '/blog/lavender-tdah-adultos-640x400.svg',
  },
  {
    href: '/blog/burnout-o-tdah-diferencias',
    icon: Brain,
    category: 'TDAH vs Burnout',
    title: 'Burnout o TDAH: cómo distinguirlos cuando los síntomas se parecen',
    img: '/blog/sand-burnout-o-tdah-640x400.svg',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON — Article + FAQPage
   ═══════════════════════════════════════════════════════════════ */

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${CANONICAL_URL}/#article`,
      headline: 'Evaluación neuropsicológica para adultos en Cancún: qué incluye y cómo agendarla',
      description: 'Si crees que puedes tener TDAH, autismo o simplemente quieres entender mejor cómo funciona tu cerebro, una evaluación neuropsicológica para adultos te da respuestas con evidencia. Karen Trujillo, Cancún.',
      image: `${SITE_URL}/blog/dark-evaluacion-neuropsicologica-adultos-1200x675.png`,
      datePublished: '2026-09-01',
      dateModified: '2026-09-01',
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#physician`,
        name: 'Karen Trujillo',
        jobTitle: 'Neuropsicóloga Clínica',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#clinic`,
        name: 'Neuropsicóloga Karen Trujillo',
        url: SITE_URL,
      },
      mainEntityOfPage: CANONICAL_URL,
      inLanguage: 'es-MX',
      about: {
        '@type': 'MedicalCondition',
        name: 'TDAH',
        sameAs: 'https://www.wikidata.org/wiki/Q206811',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Evaluación neuropsicológica adultos Cancún', item: CANONICAL_URL },
      ],
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
   MAIN PAGE — BLOG: Evaluación neuropsicológica adultos Cancún
   ═══════════════════════════════════════════════════════════════ */

export default function EvaluacionNeuropsicologicaAdultosCancun() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedWhen, setExpandedWhen] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 500;
      const ctaFinal = document.getElementById('cta-evaluacion');
      const ctaTop = ctaFinal?.getBoundingClientRect().top ?? Infinity;
      const pastHero = window.scrollY > heroHeight;
      const beforeCta = ctaTop > window.innerHeight;
      setShowStickyCta(pastHero && beforeCta);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Evaluación neuropsicológica para adultos en Cancún: qué incluye y cómo agendarla</title>
        <meta name="description" content="Si crees que puedes tener TDAH, autismo o simplemente quieres entender mejor cómo funciona tu cerebro, una evaluación neuropsicológica para adultos te da respuestas con evidencia. Karen Trujillo, Cancún." />
        <link rel="canonical" href={CANONICAL_URL} />

        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Evaluación neuropsicológica para adultos en Cancún: qué incluye y cómo agendarla" />
        <meta property="og:description" content="Si crees que puedes tener TDAH, autismo o simplemente quieres entender mejor cómo funciona tu cerebro, una evaluación neuropsicológica para adultos te da respuestas con evidencia. Karen Trujillo, Cancún." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-evaluacion-neuropsicologica-adultos-1200x675.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Evaluación neuropsicológica para adultos en Cancún — Karen Trujillo, Neuropsicóloga" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-09-01" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Evaluación neuropsicológica adultos Cancún | Karen Trujillo" />
        <meta name="twitter:description" content="¿Crees que puedes tener TDAH? Una evaluación neuropsicológica para adultos te da respuestas con evidencia. Proceso, instrumentos y precio en Cancún." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-evaluacion-neuropsicologica-adultos-1200x675.png`} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              HERO — Article header
              ══════════════════════════════════════════════════════ */}
          <section className="relative pt-28 pb-14 sm:pb-20 px-6 overflow-hidden" style={{ background: '#2e2545' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />

            <div className="max-w-3xl mx-auto relative z-10">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs mb-8 animate-[fadeIn_0.8s_ease-out_both]" aria-label="Breadcrumb" style={{ color: 'rgba(208,208,231,0.7)' }}>
                <Link href="/" className="hover:text-[#c6bce2] transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Inicio
                </Link>
                <span style={{ color: 'rgba(208,208,231,0.4)' }}>/</span>
                <span style={{ color: 'rgba(208,208,231,0.4)' }}>Blog</span>
                <span style={{ color: 'rgba(208,208,231,0.4)' }}>/</span>
                <span className="font-medium" style={{ color: '#c6bce2' }}>Evaluación adultos Cancún</span>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <BookOpen className="w-3.5 h-3.5" style={{ color: '#c6bce2' }} />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-white">Guía para adultos · Evaluación neuropsicológica</span>
                </div>

                <h1 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.15] mb-5 text-balance">
                  Evaluación neuropsicológica para adultos en Cancún:<br />
                  <span style={{ color: 'rgba(208,208,231,0.72)' }}>qué incluye y cómo agendarla</span>
                </h1>

                <p className="text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Hay personas que llegan a los 35, 40 o 45 años sin saber que tienen TDAH. La evaluación neuropsicológica en adultos existe exactamente para esto: para dar respuestas con evidencia, no con suposiciones.
                </p>

                {/* Author card */}
                <div className="flex items-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both] rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/20 shadow-md">
                    <Image
                      src={KAREN_IMAGE}
                      alt="Neuropsicóloga Karen Trujillo"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover object-top"
                      priority
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga</p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(208,208,231,0.75)' }}>
                      <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-white/40" /> Cédula {CEDULA}</span>
                      <time dateTime="2026-09-01">1 sep 2026</time>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-white/40" /> 10 min de lectura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              IMAGEN DESTACADA — Hero image
              ══════════════════════════════════════════════════════ */}
          <section className="px-6 -mt-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <SectionReveal>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_-15px_rgba(67,56,96,0.25)]">
                  <img
                    src="/blog/dark-evaluacion-neuropsicologica-adultos-1200x675.png"
                    alt="Evaluación neuropsicológica para adultos en Cancún — imagen ilustrativa"
                    width={1200}
                    height={675}
                    className="w-full h-auto aspect-video object-cover"
                    loading="eager"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              TABLE OF CONTENTS
              ══════════════════════════════════════════════════════ */}
          <section className="py-8 bg-card border-b border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer py-2">
                    <span className="flex items-center gap-2 text-sm font-bold text-primary">
                      <ListChecks className="w-4 h-4 text-accent-blue" />
                      Contenido de esta guía
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <nav className="pt-3 pb-1 space-y-1.5">
                    {[
                      { href: '#para-que-sirve', label: '¿Para qué sirve una evaluación neuropsicológica en adultos?' },
                      { href: '#cuando-considerarla', label: '¿Cuándo considerarla? Señales que lo sugieren' },
                      { href: '#diferencia-tdah-cognitiva', label: 'Diferencia entre evaluación TDAH y evaluación cognitiva general' },
                      { href: '#proceso', label: 'Proceso completo: sesiones, instrumentos y tiempo' },
                      { href: '#el-informe', label: 'El informe y para qué sirve' },
                      { href: '#precio', label: 'Precio y cómo se paga' },
                      { href: '#faq-blog', label: 'Preguntas frecuentes' },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                        className="block pl-6 py-1.5 text-sm text-muted-foreground hover:text-primary font-light border-l-2 border-border hover:border-accent-blue transition-all"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </details>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              INTRO — Context paragraph
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="prose-custom">
                  <p className="text-muted-foreground font-light leading-relaxed text-base sm:text-lg mb-6">
                    Hay personas que llegan a los 35, 40 o 45 años cargando una sospecha que nunca fue confirmada. <em className="text-primary font-medium">&ldquo;Siempre me ha costado más que a los demás. Nunca supe por qué.&rdquo;</em>
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-6">
                    La evaluación neuropsicológica para adultos existe exactamente para esto: para convertir años de incertidumbre en un perfil clínico con datos objetivos. No es una opinión ni una entrevista de 30 minutos — es una batería de instrumentos estandarizados que mide cómo funciona tu cerebro en atención, memoria, funciones ejecutivas y velocidad de procesamiento.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                    Esta guía explica para qué sirve, cuándo vale la pena hacerla, cómo es el proceso completo y qué obtienes al final.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              PARA QUÉ SIRVE
              ══════════════════════════════════════════════════════ */}
          <section id="para-que-sirve" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Propósito clínico</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Para qué sirve una evaluación neuropsicológica en adultos?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  No es un test de inteligencia ni una consulta psicológica. Es un mapa detallado de cómo funciona tu cerebro en las áreas que más importan para la vida cotidiana.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Diagnóstico',
                    icon: FileText,
                    desc: 'Identifica si hay TDAH, dificultades cognitivas, o condiciones del neurodesarrollo que no han sido detectadas. El diagnóstico diferencial descarta otras causas y determina qué es qué.',
                  },
                  {
                    title: 'Claridad',
                    icon: Brain,
                    desc: 'Termina con años de preguntas sin respuesta. Muchos adultos describen el diagnóstico como un antes y un después: por fin tienen un nombre para algo que siempre estuvo ahí.',
                  },
                  {
                    title: 'Plan de acción',
                    icon: CheckCircle2,
                    desc: 'El informe no solo dice qué hay — dice qué hacer. Recomendaciones concretas para el trabajo, la salud y la vida personal adaptadas al perfil específico de cada persona.',
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent-blue/10 border border-primary/15 flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-primary/60" />
                      </div>
                      <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              CUÁNDO CONSIDERARLA
              ══════════════════════════════════════════════════════ */}
          <section id="cuando-considerarla" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Señales de alerta</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Cuándo considerar una evaluación neuropsicológica?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  No necesitas tener certeza para buscar orientación. Estas son las señales más frecuentes que llevan a adultos a la evaluación.
                </p>
              </SectionReveal>

              <div className="space-y-3">
                {whenToConsider.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.07}>
                    <button
                      onClick={() => setExpandedWhen(expandedWhen === i ? null : i)}
                      className="w-full text-left bg-secondary/50 border border-border rounded-2xl px-5 py-4 hover:border-primary/30 hover:bg-secondary transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary leading-snug">{item.signal}</p>
                          <div
                            className="grid transition-all duration-300"
                            style={{
                              gridTemplateRows: expandedWhen === i ? '1fr' : '0fr',
                              opacity: expandedWhen === i ? 1 : 0,
                              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                          >
                            <div className="overflow-hidden">
                              <p className="text-xs text-muted-foreground font-light leading-relaxed mt-2 bg-card p-3 rounded-xl border border-border/50">
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/50 mt-0.5 shrink-0 transition-transform duration-300 ${expandedWhen === i ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              IMAGEN INLINE 1
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(67,56,96,0.12)]">
                  <img
                    src="/blog/lavender-evaluacion-neuropsicologica-960x540.svg"
                    alt="Sesión de evaluación neuropsicológica para adultos — imagen ilustrativa"
                    width={960}
                    height={540}
                    className="w-full h-auto aspect-video object-cover"
                    loading="lazy"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              DIFERENCIA TDAH VS COGNITIVA GENERAL
              ══════════════════════════════════════════════════════ */}
          <section id="diferencia-tdah-cognitiva" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Dos tipos de evaluación</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Evaluación de TDAH adulto vs. evaluación cognitiva general</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  No son lo mismo. La diferencia está en los instrumentos, el enfoque y lo que el informe puede responder.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="p-4 text-left font-bold text-primary text-xs uppercase tracking-wider">Aspecto</th>
                        <th className="p-4 text-left font-bold text-accent-blue text-xs uppercase tracking-wider">Evaluación TDAH adulto</th>
                        <th className="p-4 text-left font-bold text-primary/60 text-xs uppercase tracking-wider">Evaluación cognitiva general</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { aspecto: 'Pregunta principal', tdah: '¿Hay TDAH? ¿Qué funciones ejecutivas están afectadas?', cognitiva: '¿Cómo es el perfil intelectual general?' },
                        { aspecto: 'Instrumentos clave', tdah: 'DIVA 2.0, CAARS-2, BRIEF-2A, CPT-3', cognitiva: 'WAIS-IV (solo), pruebas de memoria' },
                        { aspecto: 'Historia retrospectiva', tdah: 'Obligatoria — síntomas desde infancia (DSM-5 requiere inicio antes de los 12)', cognitiva: 'No siempre incluida' },
                        { aspecto: 'Diagnóstico diferencial', tdah: 'Sí — descarta ansiedad, depresión, burnout como causa principal', cognitiva: 'No es el enfoque principal' },
                        { aspecto: 'Validez oficial', tdah: 'Sí — informe con cédula federal, código CIE-10', cognitiva: 'Depende del evaluador' },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary'}>
                          <td className="p-4 font-bold text-primary text-xs">{row.aspecto}</td>
                          <td className="p-4 text-muted-foreground font-light text-xs leading-relaxed">{row.tdah}</td>
                          <td className="p-4 text-muted-foreground font-light text-xs leading-relaxed">{row.cognitiva}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="mt-6 bg-primary/5 border border-primary/15 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary/50 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      <strong className="text-primary font-medium">¿Cuál necesitas?</strong> Si la sospecha es TDAH, la evaluación específica de TDAH adulto incluye los instrumentos que el diagnóstico diferencial requiere. La{' '}
                      <Link href="/evaluacion-tdah-adultos" className="text-primary font-semibold underline decoration-primary/30 hover:decoration-primary transition-all">
                        evaluación neuropsicológica de TDAH para adultos
                      </Link>{' '}
                      de Karen Trujillo cubre ambos niveles: el perfil cognitivo general (WAIS-IV) y los instrumentos específicos de TDAH.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              PROCESO COMPLETO
              ══════════════════════════════════════════════════════ */}
          <section id="proceso" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Paso a paso</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Proceso completo: sesiones, instrumentos y tiempo</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">
                  La evaluación neuropsicológica de TDAH adulto requiere entre 4 y 5 sesiones presenciales distribuidas en 2 a 3 semanas. Esto es lo que sucede en cada una.
                </p>
              </SectionReveal>

              <div className="space-y-4">
                {processSteps.map((step, i) => (
                  <SectionReveal key={step.num} delay={i * 0.08}>
                    <div className="flex gap-4 p-5 sm:p-6 bg-secondary/50 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent-blue/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-sm font-bold text-primary/70">{step.num}</span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                          <h3 className="font-bold text-primary">{step.title}</h3>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 bg-secondary px-2 py-0.5 rounded-full border border-border">{step.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.5}>
                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Sesiones', value: '4–5 citas' },
                    { label: 'Duración total', value: '2–3 semanas' },
                    { label: 'Entrega del informe', value: '5–7 días hábiles después' },
                  ].map((item) => (
                    <div key={item.label} className="bg-secondary/50 border border-border rounded-xl p-4 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-primary">{item.value}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              IMAGEN INLINE 2
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(67,56,96,0.12)]">
                  <img
                    src="/blog/sand-vida-diaria-con-tdah-960x540.svg"
                    alt="Adulto revisando informe de evaluación neuropsicológica — imagen ilustrativa"
                    width={960}
                    height={540}
                    className="w-full h-auto aspect-video object-cover"
                    loading="lazy"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              EL INFORME
              ══════════════════════════════════════════════════════ */}
          <section id="el-informe" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">El resultado</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">El informe: para qué sirve y qué contiene</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  El informe neuropsicológico es el documento que transforma los datos de las pruebas en información útil para tu vida. Tiene validez oficial respaldada por cédula profesional federal.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {reportUses.map((area, i) => (
                  <SectionReveal key={area.area} delay={i * 0.08}>
                    <div className="bg-secondary/50 border border-border rounded-2xl p-5 sm:p-6 h-full hover:border-primary/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                          <area.icon className="w-4 h-4 text-primary/60" />
                        </div>
                        <h3 className="font-bold text-primary text-sm">{area.area}</h3>
                      </div>
                      <ul className="space-y-2">
                        {area.items.map((item, ii) => (
                          <li key={ii} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary/40 mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground font-light leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    <strong className="text-primary font-medium">Qué incluye el informe:</strong> diagnóstico con código CIE-10, perfil de funciones ejecutivas (por índice), resultados cuantitativos de cada instrumento con percentil y nivel, diagnóstico diferencial explícito, y recomendaciones de intervención específicas por área (laboral, terapéutica, personal). Firma y cédula profesional federal {CEDULA}.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              PRECIO
              ══════════════════════════════════════════════════════ */}
          <section id="precio" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Inversión</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center">Precio y forma de pago</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-10">
                  Precio transparente, sin costos ocultos. El pago se distribuye a lo largo de las sesiones para que no sea un desembolso único.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-primary">$8,300</span>
                    <span className="text-lg text-muted-foreground font-light">MXN</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-6">Evaluación neuropsicológica de TDAH adulto — precio total</p>

                  <div className="space-y-3 mb-6">
                    {[
                      'Todas las sesiones del proceso (4–5 citas presenciales)',
                      'Batería completa: DIVA 2.0, CAARS-2, WAIS-IV, BRIEF-2A, CPT-3',
                      'Informe clínico detallado con diagnóstico diferencial',
                      'Sesión de devolución de resultados presencial',
                      'Validez oficial ante SEP, IMSS e instituciones',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground font-light">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-secondary border border-border rounded-xl p-4 flex items-start gap-3">
                    <DollarSign className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      <strong className="text-primary font-medium">Pago distribuido:</strong> Se solicita un anticipo de $1,000 MXN para apartar la primera cita. El resto se divide entre las sesiones del proceso. No es un pago único de $8,300.
                    </p>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="text-center">
                  <Link
                    href="/evaluacion-tdah-adultos"
                    className="group inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    Ver evaluación TDAH adultos
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              FAQ
              ══════════════════════════════════════════════════════ */}
          <section id="faq-blog" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">Preguntas frecuentes</h2>
              </SectionReveal>

              <div role="list">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(91,78,127,0.15)' : 'none' }}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-blog-${i}`}
                        className="w-full py-5 sm:py-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <ChevronDown
                          className="w-3.5 h-3.5 text-muted-foreground shrink-0"
                          style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                        />
                      </button>
                      <div
                        id={`faq-blog-${i}`}
                        role="region"
                        className="grid transition-all duration-300"
                        style={{
                          gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                          opacity: openFaq === i ? 1 : 0,
                          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-5 sm:pb-6">
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
              COMPARTIR — Social share
              ══════════════════════════════════════════════════════ */}
          <section className="py-8 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Comparte esta guía</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CANONICAL_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Compartir en Facebook"
                    className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Evaluación neuropsicológica para adultos en Cancún: qué incluye y cómo agendarla — ${CANONICAL_URL}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Compartir por WhatsApp"
                    className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(CANONICAL_URL);
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2000);
                    }}
                    aria-label="Copiar enlace"
                    className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>
                  {linkCopied && <span className="text-xs text-success font-medium">¡Enlace copiado!</span>}
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              RELATED — Internal linking
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary/50 border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Sigue aprendiendo</p>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-8 text-center">Recursos relacionados</h2>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {relatedResources.map((resource, i) => (
                  <SectionReveal key={resource.href} delay={i * 0.08}>
                    <Link href={resource.href} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-blue/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                      <img
                        src={resource.img}
                        alt={resource.title}
                        width={640}
                        height={400}
                        className="w-full h-auto aspect-video object-cover"
                        loading="lazy"
                      />
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <resource.icon className="w-3.5 h-3.5 text-primary/40" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{resource.category}</span>
                        </div>
                        <h3 className="font-bold text-primary text-sm leading-snug mb-3 group-hover:text-primary/80 transition-colors">{resource.title}</h3>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary group-hover:gap-2 transition-all">
                          Leer más <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              CTA FINAL
              ══════════════════════════════════════════════════════ */}
          <section id="cta-evaluacion" className="py-14 sm:py-20 bg-plum-deep border-t border-white/10">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Dejar de preguntarte es más fácil que seguir con la duda</h2>
                  <p className="text-white/70 font-light max-w-xl mx-auto">Una evaluación neuropsicológica te da respuestas en semanas. Si llegaste hasta aquí, probablemente ya sabes lo que necesitas.</p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="bg-white/8 border border-white/15 rounded-2xl p-6 sm:p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/20 shadow-md shrink-0">
                      <Image
                        src={KAREN_IMAGE}
                        alt="Neuropsicóloga Karen Trujillo"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">Neuropsicóloga Karen Trujillo</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 mt-1">
                        <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-white/40" /> Cédula {CEDULA}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" /> 47+ reseñas · 5.0</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'Pruebas', value: 'DIVA 2.0, CAARS-2, WAIS-IV, BRIEF-2A, CPT-3' },
                      { label: 'Duración', value: '4-5 sesiones · 2-3 semanas' },
                      { label: 'Inversión', value: '$8,300 MXN todo incluido' },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/8 border border-white/15 rounded-xl p-3 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">{item.label}</p>
                        <p className="text-xs font-medium text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/evaluacion-tdah-adultos"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                    >
                      <Stethoscope className="w-4 h-4" />
                      Ver evaluación completa
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu guía sobre evaluación neuropsicológica para adultos y me gustaría agendar una evaluación.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Agendar por WhatsApp
                    </a>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-white/70">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-white/8 rounded-full border border-white/15"><ShieldCheck className="w-3.5 h-3.5 text-white/50" /> Cancelación con 48 hrs</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-white/8 rounded-full border border-white/15"><ShieldCheck className="w-3.5 h-3.5 text-white/50" /> Reembolso del anticipo</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-white/8 rounded-full border border-white/15"><BadgeCheck className="w-3.5 h-3.5 text-white/50" /> Validez oficial SEP e IMSS</span>
                </div>
              </SectionReveal>
            </div>
          </section>

        <section className="max-w-2xl mx-auto px-4 pb-12">
          <LeadMagnetForm
            lead="tdah-adultos"
            headline="Descarga el checklist gratuito"
            description="Para llevar a tu próxima consulta y tener claridad sobre lo que vives."
          />
        </section>
        </main>

        <FloatingButtons />
        <Footer />

        {/* ══════════════════════════════════════════════════════
            STICKY CTA — Mobile only
            ══════════════════════════════════════════════════════ */}
        <div
          data-sticky-cta="" className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
            <div className="max-w-lg mx-auto">
              <Link
                href="/evaluacion-tdah-adultos"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl shadow-md active:scale-[0.97] transition-all"
              >
                <Brain className="w-4 h-4" />
                Evaluarme
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
