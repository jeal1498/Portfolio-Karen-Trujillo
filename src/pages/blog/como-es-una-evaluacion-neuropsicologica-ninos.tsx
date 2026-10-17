import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, CheckCircle2, FileText, Users, Clock,
  ChevronDown, MessageCircle, BadgeCheck, Star,
  Facebook, Link2, ListChecks, ArrowLeft, BookOpen,
  ShieldCheck, Stethoscope, ClipboardList, UserCheck,
  MessagesSquare, Brain,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const CANONICAL_URL = `${SITE_URL}/blog/como-es-una-evaluacion-neuropsicologica-ninos`;
const ARTICLE_HEADLINE = '¿Cómo es una evaluación neuropsicológica para niños? Paso a paso';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const procesoPasos = [
  {
    numero: '01',
    titulo: 'Antes de la primera cita',
    icono: ClipboardList,
    descripcion: 'Qué preparar y qué decirle a tu hijo',
    detalle: [
      'Reúne boletas escolares, reportes de maestros y cualquier evaluación previa (psicopedagógica, de lenguaje, pediatría).',
      'Anota las dudas que quieres resolver: ¿cuándo empezaron las dificultades?, ¿en qué situaciones se hacen más evidentes?',
      'Habla con tu hijo antes de la cita. La frase clave: "Vamos a ver a una doctora que hace juegos de preguntas y rompecabezas. No es un examen, no hay respuestas malas y no vas a reprobar."',
      'Evita decirle "es para saber qué tiene mal" o "tienes que portarte bien". El objetivo es que llegue relajado.',
    ],
  },
  {
    numero: '02',
    titulo: 'Primera sesión: entrevista con padres (sin el niño)',
    icono: MessagesSquare,
    descripcion: '60–90 minutos solo con mamá y/o papá',
    detalle: [
      'El niño no asiste a esta primera cita. Es una conversación clínica profunda entre Karen y los padres.',
      'Se explora la historia del embarazo, parto, desarrollo temprano, hitos motores y de lenguaje.',
      'Se revisa la trayectoria escolar: desde preescolar hasta el grado actual, reportes de maestros, materias de dificultad.',
      'Se habla de conducta en casa, relaciones sociales, calidad del sueño, alimentación y antecedentes familiares relevantes.',
      'Al terminar, Karen te explicará el plan de evaluación y cuántas sesiones serán necesarias para tu hijo específicamente.',
    ],
  },
  {
    numero: '03',
    titulo: 'Sesiones 2–4: aplicación de pruebas con el niño',
    icono: Brain,
    descripcion: '60–90 minutos por sesión, con el niño',
    detalle: [
      'El niño trabaja directamente con Karen. Los padres esperan en sala (o pueden salir brevemente — lo que sea más tranquilizador para el niño).',
      'Las actividades se ven como juegos: ordenar figuras, repetir secuencias, nombrar imágenes, resolver acertijos en tabletas o con materiales de colores.',
      'Los instrumentos aplicados pueden incluir WISC-V (inteligencia y funciones cognitivas), CONNERS-3 (atención e hiperactividad), BRIEF-2 (funciones ejecutivas) y CPT-3 (atención sostenida computarizada), según lo que se necesite evaluar.',
      'La mayoría de los niños lo disfrutan. No saben que están "siendo evaluados" — solo ven actividades interesantes con una adulta amable.',
      'Si el niño se cansa o se pone ansioso, se hace una pausa. El objetivo nunca es presionarlo: los resultados solo son válidos si el niño está cómodo.',
    ],
  },
  {
    numero: '04',
    titulo: 'Cuestionarios para padres y maestros',
    icono: FileText,
    descripcion: 'Se completan en casa y en la escuela, sin cita adicional',
    detalle: [
      'Entre sesiones, Karen entregará cuestionarios estandarizados para que los llenen los padres y los maestros.',
      'Para niños: escalas de conducta, atención, funcionamiento ejecutivo y habilidades adaptativas según la edad.',
      'La perspectiva de los maestros es fundamental porque el TDAH y el autismo se manifiestan diferente en casa que en el salón de clases.',
      'No requieren visita adicional al consultorio: se entregan y regresan por correo, WhatsApp o en la siguiente sesión.',
    ],
  },
  {
    numero: '05',
    titulo: 'Sesión de devolución: solo con los padres',
    icono: UserCheck,
    descripcion: '60 minutos con Karen, sin el niño presente',
    detalle: [
      'Esta última sesión es solo para los padres. No traer al niño es deliberado: los adultos necesitan espacio para preguntar libremente y procesar la información sin preocuparse por la reacción de su hijo.',
      'Karen explica los resultados de cada prueba en lenguaje claro, sin tecnicismos innecesarios.',
      'Se presenta el diagnóstico diferencial: si hay TDAH, dificultades de aprendizaje, TEA o una combinación.',
      'Se discute el plan de acción: recomendaciones para la escuela, estrategias en casa, si se requiere terapia o valoración adicional.',
    ],
  },
];

const faqItems = [
  {
    q: '¿La evaluación neuropsicológica duele o es invasiva?',
    a: 'No. La evaluación neuropsicológica es completamente no invasiva. No hay sangre, no hay agujas, no hay aparatos en la cabeza. Son actividades cognitivas: preguntas, rompecabezas, ejercicios de atención y memoria. Los niños suelen describirlo como "juegos difíciles".',
  },
  {
    q: '¿Cuántas citas son en total?',
    a: 'El proceso completo son 4 a 5 citas: 1 entrevista con padres, 2 a 3 sesiones con el niño, y 1 sesión de devolución de resultados. Todo el proceso toma entre 2 y 3 semanas, con sesiones distribuidas para no saturar al niño.',
  },
  {
    q: '¿Mi hijo puede "fallar" las pruebas?',
    a: 'No existe fallar en una evaluación neuropsicológica. Las pruebas miden cómo funciona el cerebro de tu hijo — no qué tan listo es ni qué tan bien estudió. No hay respuesta correcta universal: el objetivo es trazar un perfil real, no calificarlo. Decirle esto al niño antes de la primera cita reduce mucho la ansiedad.',
  },
  {
    q: '¿Qué pasa si mi hijo no quiere cooperar el día de las pruebas?',
    a: 'Karen tiene amplia experiencia trabajando con niños que se ponen ansiosos, se niegan a participar o tienen dificultades de regulación. Si el niño está muy alterado, la sesión se reprograma sin costo adicional. Los resultados de una evaluación realizada bajo estrés o sin cooperación no son confiables — por eso se trabaja siempre al ritmo del niño.',
  },
  {
    q: '¿Cuánto tiempo pasa desde la primera cita hasta recibir el informe?',
    a: 'En promedio, el informe clínico está listo 5 a 7 días hábiles después de la última sesión. Recibirás el documento por escrito en la sesión de devolución, donde Karen lo explica punto por punto. Si la escuela o el médico lo solicitan urgentemente, puede acordarse una entrega provisional.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${CANONICAL_URL}/#article`,
      headline: ARTICLE_HEADLINE,
      description: 'Descubre exactamente cómo es una evaluación neuropsicológica infantil: cuántas sesiones, qué hacen en cada cita, qué sienten los niños y qué reciben los padres al final.',
      image: `${SITE_URL}/blog/dark-proceso-evaluacion-neuropsicologica-1200x675.png`,
      datePublished: '2026-07-07',
      dateModified: '2026-07-07',
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
        name: 'Evaluación neuropsicológica infantil',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: ARTICLE_HEADLINE, item: CANONICAL_URL },
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
    {
      '@type': 'HowTo',
      name: 'Cómo es una evaluación neuropsicológica para niños',
      description: 'Proceso paso a paso de la evaluación neuropsicológica infantil en Cancún',
      step: procesoPasos.map((paso) => ({
        '@type': 'HowToStep',
        name: paso.titulo,
        text: paso.detalle.join(' '),
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
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function ComoEsEvaluacionNeuropsicologicaNinos() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

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
        <title>{ARTICLE_HEADLINE}</title>
        <meta name="description" content="Descubre exactamente cómo es una evaluación neuropsicológica infantil: cuántas sesiones, qué hacen en cada cita, qué sienten los niños y qué reciben los padres al final. Karen Trujillo, neuropsicóloga en Cancún." />
        <link rel="canonical" href={CANONICAL_URL} />

        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content={ARTICLE_HEADLINE} />
        <meta property="og:description" content="Guía paso a paso de la evaluación neuropsicológica infantil: sesiones, pruebas, qué sienten los niños y qué reciben los padres al final." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-proceso-evaluacion-neuropsicologica-1200x675.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Evaluación neuropsicológica para niños — proceso paso a paso" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-07-07" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${ARTICLE_HEADLINE} | Karen Trujillo`} />
        <meta name="twitter:description" content="Guía completa: qué pasa en cada sesión de la evaluación neuropsicológica infantil, qué sienten los niños y qué incluye el informe final." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-proceso-evaluacion-neuropsicologica-1200x675.png`} />

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
              HERO
              ══════════════════════════════════════════════════════ */}
          <section className="relative pt-28 pb-14 sm:pb-20 px-6 overflow-hidden" style={{ background: '#2e2545' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />

            <div className="max-w-3xl mx-auto relative z-10">
              <nav className="flex items-center gap-2 text-xs mb-8 animate-[fadeIn_0.8s_ease-out_both]" aria-label="Breadcrumb" style={{ color: 'rgba(208,208,231,0.7)' }}>
                <Link href="/" className="hover:text-[#c6bce2] transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Inicio
                </Link>
                <span style={{ color: 'rgba(208,208,231,0.4)' }}>/</span>
                <span style={{ color: 'rgba(208,208,231,0.4)' }}>Blog</span>
                <span style={{ color: 'rgba(208,208,231,0.4)' }}>/</span>
                <span className="font-medium" style={{ color: '#c6bce2' }}>Evaluación neuropsicológica niños</span>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <BookOpen className="w-3.5 h-3.5" style={{ color: '#c6bce2' }} />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-white">Guía para familias · Proceso completo</span>
                </div>

                <h1 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.15] mb-5 text-balance">
                  ¿Cómo es una evaluación neuropsicológica para niños?<br />
                  <span style={{ color: 'rgba(208,208,231,0.72)' }}>Paso a paso, sin tecnicismos</span>
                </h1>

                <p className="text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  El mayor obstáculo para agendar una evaluación es el miedo a lo desconocido. &ldquo;¿Qué le van a hacer a mi hijo?&rdquo; Esta guía lo explica sesión por sesión, para que lleguen tranquilos.
                </p>

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
                      <time dateTime="2026-07-07">7 jul 2026</time>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-white/40" /> 8 min de lectura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              IMAGEN DESTACADA
              ══════════════════════════════════════════════════════ */}
          <section className="px-6 -mt-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <SectionReveal>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_-15px_rgba(67,56,96,0.25)]">
                  <img
                    src="/blog/dark-proceso-evaluacion-neuropsicologica-1200x675.png"
                    alt="Evaluación neuropsicológica para niños paso a paso — imagen ilustrativa"
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
                      { href: '#proceso', label: 'El proceso completo, sesión por sesión' },
                      { href: '#pruebas', label: 'Qué pruebas se aplican y qué miden' },
                      { href: '#informe', label: 'El informe clínico: qué incluye y cómo usarlo' },
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
              INTRO
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div>
                  <p className="text-muted-foreground font-light leading-relaxed text-base sm:text-lg mb-6">
                    En mi consultorio, una de las preguntas que más recibo antes de agendar no es <em className="text-primary font-medium">&ldquo;¿cuánto cuesta?&rdquo;</em>, sino: <em className="text-primary font-medium">&ldquo;¿qué le van a hacer exactamente a mi hijo?&rdquo;</em>
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-6">
                    Es una pregunta completamente válida. Los padres llegan con años de incertidumbre — reportes de maestros, noches sin dormir, dudas sobre si es TDAH, autismo, problemas de aprendizaje o simplemente &ldquo;la edad&rdquo; — y lo último que quieren es entregar a su hijo a un proceso que no entienden.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                    Esta guía describe exactamente qué pasa en cada cita: qué se hace, quién asiste, cuánto dura, cómo vive el niño la experiencia y qué reciben los padres al final. Sin tecnicismos, sin sorpresas.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              PROCESO PASO A PASO
              ══════════════════════════════════════════════════════ */}
          <section id="proceso" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">El proceso completo</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Sesión por sesión: qué pasa en cada cita</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">El proceso completo son 4 a 5 citas distribuidas en 2 a 3 semanas. Así se ve cada una.</p>
              </SectionReveal>

              <div className="space-y-6">
                {procesoPasos.map((paso, i) => (
                  <SectionReveal key={paso.titulo} delay={i * 0.08}>
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="px-6 py-5 border-b border-border flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-accent-blue/10 border border-primary/15 flex items-center justify-center shrink-0">
                          <paso.icono className="w-5 h-5 text-primary/70" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-accent-blue">Cita {paso.numero}</span>
                          </div>
                          <h3 className="font-bold text-primary text-lg leading-snug">{paso.titulo}</h3>
                          <p className="text-xs text-muted-foreground font-light mt-1">{paso.descripcion}</p>
                        </div>
                      </div>
                      <ul className="divide-y divide-border/50">
                        {paso.detalle.map((item, ii) => (
                          <li key={ii} className="flex items-start gap-3 px-6 py-4">
                            <CheckCircle2 className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                            <p className="text-sm text-muted-foreground font-light leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              IMAGEN INLINE
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(67,56,96,0.12)]">
                  <img
                    src="/blog/lavender-evaluacion-neuropsicologica-960x540.svg"
                    alt="Niño participando en sesión de evaluación neuropsicológica — imagen ilustrativa"
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
              PRUEBAS APLICADAS
              ══════════════════════════════════════════════════════ */}
          <section id="pruebas" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Instrumentos estandarizados</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Qué pruebas se aplican y qué miden?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">No todas las pruebas se aplican a todos los niños. La batería se selecciona según las preguntas clínicas de cada caso.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    nombre: 'WISC-V',
                    que_es: 'Escala de Inteligencia de Wechsler para Niños',
                    mide: 'Inteligencia global y funciones cognitivas: comprensión verbal, razonamiento, velocidad de procesamiento, memoria de trabajo.',
                    como_se_ve: 'El niño ordena cubos de colores, define palabras, completa secuencias de imágenes y repite números de memoria.',
                  },
                  {
                    nombre: 'CONNERS-3',
                    que_es: 'Escalas de Evaluación de Conners (3ª edición)',
                    mide: 'Atención, hiperactividad, impulsividad y funcionamiento ejecutivo. Incluye versiones para padres, maestros y el propio niño (mayores de 8 años).',
                    como_se_ve: 'Cuestionarios que completan padres y maestros. El niño mayor puede contestar la versión breve en forma de autoinforme.',
                  },
                  {
                    nombre: 'BRIEF-2',
                    que_es: 'Evaluación Conductual de la Función Ejecutiva',
                    mide: 'Cómo el niño usa sus funciones ejecutivas en la vida real: organización, planificación, control emocional, iniciativa, memoria de trabajo cotidiana.',
                    como_se_ve: 'Cuestionario para padres y maestros. No requiere que el niño lo haga directamente.',
                  },
                  {
                    nombre: 'CPT-3',
                    que_es: 'Test de Rendimiento Continuo (Conners)',
                    mide: 'Atención sostenida, impulsividad y velocidad de respuesta en una tarea computarizada de 14 minutos.',
                    como_se_ve: 'El niño presiona la barra espaciadora cada vez que aparece una letra en pantalla — excepto cuando aparece la letra X. Es la prueba que más parece un videojuego.',
                  },
                  {
                    nombre: 'ADOS-2',
                    que_es: 'Escala de Observación Diagnóstica para el Autismo',
                    mide: 'Comunicación social, juego simbólico, flexibilidad y conductas repetitivas. Estándar de oro para diagnóstico de TEA.',
                    como_se_ve: 'Karen juega y conversa con el niño en actividades estructuradas mientras observa patrones específicos de interacción.',
                  },
                  {
                    nombre: 'CAARS-2 / DIVA 2.0',
                    que_es: 'Instrumentos para evaluación complementaria',
                    mide: 'Cuando hay preguntas sobre comorbilidades (ansiedad, dificultades emocionales), se incorporan escalas adicionales según el perfil del niño.',
                    como_se_ve: 'Cuestionarios breves para padres o entrevista semiestructurada adicional.',
                  },
                ].map((prueba, i) => (
                  <SectionReveal key={prueba.nombre} delay={i * 0.06}>
                    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 h-full hover:border-accent-blue/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold">{prueba.nombre}</span>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">{prueba.que_es}</p>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-accent-blue mb-1">Qué mide</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{prueba.mide}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-primary/40 mb-1">Cómo lo vive el niño</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed italic">{prueba.como_se_ve}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              EL INFORME
              ══════════════════════════════════════════════════════ */}
          <section id="informe" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Al terminar el proceso</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">El informe clínico: qué incluye y cómo usarlo</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">El informe no es un papel técnico para archivar. Es la hoja de ruta que tu hijo necesita para los próximos años.</p>
              </SectionReveal>

              <div className="space-y-4 mb-12">
                {[
                  {
                    titulo: 'Diagnóstico diferencial con código CIE-10',
                    desc: 'El informe especifica qué condición (o combinación de condiciones) explica las dificultades del niño: TDAH, TEA, dificultades de aprendizaje, déficits cognitivos específicos u otro cuadro. Incluye el código diagnóstico oficial para validez ante cualquier institución.',
                  },
                  {
                    titulo: 'Perfil neuropsicológico completo',
                    desc: 'No solo "tiene TDAH": el perfil describe cuáles funciones están por debajo del promedio, cuáles están en rango típico y cuáles son fortalezas. Esta información es la que diferencia un diagnóstico clínico de un cuestionario.',
                  },
                  {
                    titulo: 'Recomendaciones para la escuela',
                    desc: 'Adecuaciones curriculares específicas que los padres pueden presentar ante la institución educativa: tiempo extra en exámenes, lugar preferencial, evaluaciones orales, reducción de estímulos, entre otras según el perfil.',
                  },
                  {
                    titulo: 'Recomendaciones para casa',
                    desc: 'Estrategias concretas para la rutina diaria: cómo estructurar las tareas, cómo manejar las transiciones, qué tipo de instrucciones funcionan mejor según el perfil cognitivo del niño.',
                  },
                  {
                    titulo: 'Derivaciones y plan de seguimiento',
                    desc: 'Si el niño necesita terapia de lenguaje, psicomotricidad, terapia psicológica o valoración médica (psiquiatría infantil para medicación), el informe lo especifica con el tipo de intervención recomendado.',
                  },
                  {
                    titulo: 'Firma y cédula profesional federal',
                    desc: `El informe está firmado por Karen Trujillo con cédula ${CEDULA}, lo que le da validez oficial ante SEP, IMSS, ISSSTE, escuelas públicas y privadas, y dependencias gubernamentales.`,
                  },
                ].map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.06}>
                    <div className="flex gap-4 p-5 bg-secondary/50 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300">
                      <CheckCircle2 className="w-5 h-5 text-primary/50 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-primary text-sm mb-1">{item.titulo}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.4}>
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 sm:p-6">
                  <p className="font-bold text-primary text-sm mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary/60" />
                    ¿Quién recibe el informe?
                  </p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    El informe es confidencial y se entrega únicamente a los padres o tutores legales del niño. Karen lo explica en la sesión de devolución y resuelve todas las preguntas. No se envía directamente a la escuela — los padres deciden qué compartir y con quién.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              FAQ
              ══════════════════════════════════════════════════════ */}
          <section id="faq-blog" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
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
                        style={{ background: 'none', border: 'none' }}
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
              COMPARTIR
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
                    href={`https://wa.me/?text=${encodeURIComponent(`${ARTICLE_HEADLINE} — ${CANONICAL_URL}`)}`}
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
              CTA FINAL
              ══════════════════════════════════════════════════════ */}
          <section id="cta-evaluacion" className="py-14 sm:py-20 bg-plum-deep border-t border-white/10">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">¿Tienes dudas sobre el proceso?</h2>
                  <p className="text-white/70 font-light max-w-xl mx-auto">Escríbeme directamente por WhatsApp. Respondo todas las preguntas antes de agendar — sin compromiso.</p>
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
                      { label: 'Pruebas', value: 'WISC-V, CONNERS-3, BRIEF-2, CPT-3' },
                      { label: 'Duración', value: '4-5 citas · 2-3 semanas' },
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
                      href="/evaluacion-tdah-ninos"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                    >
                      <Stethoscope className="w-4 h-4" />
                      Ver evaluación completa
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu guía sobre la evaluación neuropsicológica infantil y tengo dudas sobre el proceso.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Preguntar por WhatsApp
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


          {/* ══════════════════════════════════════════════════════
              RELATED
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary/50 border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Sigue aprendiendo</p>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-8 text-center">Recursos relacionados</h2>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    href: '/evaluacion-tdah-ninos',
                    category: 'Servicio',
                    title: 'Valoración TDAH Infantil en Cancún',
                    subtitle: 'Niños de 5 a 17 años',
                    img: '/blog/lavender-valoracion-tdah-infantil-640x400.svg',
                  },
                  {
                    href: '/blog/cuanto-cuesta-valoracion-tdah-cancun',
                    category: 'Guía',
                    title: '¿Cuánto cuesta una valoración de TDAH en Cancún?',
                    subtitle: 'Precios, qué incluye y pagos',
                    img: '/blog/lavender-tdah-infantil-640x400.svg',
                  },
                ].map((resource, i) => (
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
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 block mb-2">{resource.category}</span>
                        <h3 className="font-bold text-primary text-sm leading-snug mb-1 group-hover:text-primary/80 transition-colors">{resource.title}</h3>
                        <p className="text-xs text-muted-foreground font-light mb-3">{resource.subtitle}</p>
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
                href="/evaluacion-tdah-ninos"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl shadow-md active:scale-[0.97] transition-all"
              >
                <Brain className="w-4 h-4" />
                Agendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
