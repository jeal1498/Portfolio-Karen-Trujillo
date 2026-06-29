import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, CheckCircle2, Clock, Users,
  ChevronDown, MessageCircle, BadgeCheck, Star,
  Facebook, Link2, ListChecks, ArrowLeft, BookOpen,
  ShieldCheck, Brain, AlertTriangle, Eye, XCircle,
  Lightbulb, FileText,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const CANONICAL_URL = `${SITE_URL}/blog/tdah-ninas-diagnostico-tardio-cancun`;
const ARTICLE_HEADLINE = 'TDAH en niñas: por qué se diagnostica tarde y cómo reconocerlo';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const senalesAlerta = [
  {
    senal: 'Parece "soñadora" o "en su mundo"',
    detalle: 'No alborota la clase, no molesta, pero tampoco está presente mentalmente. Mira por la ventana, se pierde en sus pensamientos y cuando la llamas parece que "vuelve" de otro lugar.',
  },
  {
    senal: 'Tarda mucho más de lo razonable en hacer tareas sencillas',
    detalle: 'Una tarea que debería tomar 20 minutos se convierte en una batalla de 2 horas. No es que no quiera hacerla — su cerebro no logra sostenerse en la tarea sin supervisión constante.',
  },
  {
    senal: 'Se esfuerza el doble que sus compañeras para obtener resultados similares',
    detalle: 'Estudia mucho, trabaja duro, pero los resultados no reflejan el esfuerzo. Los maestros dicen "podría dar más" sin saber que ya está dando todo.',
  },
  {
    senal: 'Es muy sensible a críticas o correcciones',
    detalle: 'Reacciona con intensidad cuando se le corrige, incluso en cosas pequeñas. Lo que parece "dramatismo" puede ser disregulación emocional, un síntoma central del TDAH que en niñas se internaliza como vergüenza.',
  },
  {
    senal: 'Perfeccionismo que paraliza en lugar de impulsar',
    detalle: 'Borra y rehace el mismo trabajo múltiples veces. Tarda tanto en "hacerlo bien" que no termina. El perfeccionismo es una estrategia compensatoria: si lo hago perfecto, nadie notará que me cuesta.',
  },
  {
    senal: 'Dificultad para organizarse a pesar de intentarlo',
    detalle: 'Cuaderno desordenado, mochila que es un caos, materiales que desaparecen, olvida entregar tareas que ya terminó. No es descuido: su cerebro no automatiza la organización.',
  },
  {
    senal: 'Ansiedad frecuente sin causa aparente',
    detalle: 'Nerviosismo antes de exámenes aunque haya estudiado, preocupación excesiva por lo que piensan sus compañeras, dificultad para dormir. La ansiedad en niñas con TDAH no diagnosticado suele ser consecuencia, no causa.',
  },
  {
    senal: 'Agotamiento al final del día escolar',
    detalle: 'Llega a casa "vaciada" emocionalmente. Ha estado compensando todo el día — prestando atención con esfuerzo, controlando impulsos, manteniendo la apariencia de que todo está bien. El enmascaramiento cuesta energía.',
  },
];

const comparativaSymptoms = [
  {
    aspecto: 'Presentación más frecuente',
    ninos: 'TDAH combinado (inatención + hiperactividad)',
    ninas: 'TDAH inatento (sin hiperactividad visible)',
  },
  {
    aspecto: 'Hiperactividad',
    ninos: 'Motora y observable: se mueven, interrumpen, se levantan del asiento',
    ninas: 'Verbal o interna: hablan mucho en contextos seguros, pensamientos acelerados',
  },
  {
    aspecto: 'Impulsividad',
    ninos: 'Conductual: actúan sin pensar, toman riesgos físicos',
    ninas: 'Emocional: reacciones intensas, cambios de humor, hipersensibilidad',
  },
  {
    aspecto: 'Cómo lo ven los adultos',
    ninos: '"Inquieto", "no para", "interrumpe"',
    ninas: '"Dispersa", "soñadora", "ansiosa", "inmadura"',
  },
  {
    aspecto: 'Estrategia de compensación',
    ninos: 'Poca o ninguna — el problema es visible desde el inicio',
    ninas: 'Masking intenso: perfeccionismo, esfuerzo extra, imitación social',
  },
  {
    aspecto: 'Edad promedio de diagnóstico',
    ninos: '7–8 años',
    ninas: '12–14 años (o en la adultez)',
  },
];

const faqItems = [
  {
    q: '¿El TDAH en niñas es diferente al de niños?',
    a: 'Sí. Aunque comparten el mismo diagnóstico, la presentación es diferente. Las niñas tienen con más frecuencia la presentación inatenta (sin hiperactividad visible), compensan mejor con estrategias de enmascaramiento y sus síntomas se internalizan como ansiedad, vergüenza y perfeccionismo. Por eso pasan desapercibidas mucho más tiempo.',
  },
  {
    q: '¿A qué edad se puede diagnosticar TDAH en niñas?',
    a: 'El TDAH puede diagnosticarse desde los 5-6 años si los síntomas son suficientemente claros y consistentes. En niñas, sin embargo, el diagnóstico frecuentemente se hace más tarde porque los síntomas son menos visibles. Si tienes dudas, la edad ideal para evaluar es antes de que los años de compensación sin apoyo hayan generado problemas de autoestima o ansiedad secundaria.',
  },
  {
    q: '¿Puede mi hija tener TDAH y ansiedad al mismo tiempo?',
    a: 'Sí, y es muy común. Las niñas con TDAH no diagnosticado desarrollan ansiedad secundaria como consecuencia de años de esfuerzo compensatorio y de sentirse "diferentes". El diagnóstico diferencial que hace una evaluación neuropsicológica determina si la ansiedad es la condición primaria o si es consecuencia del TDAH subyacente. Esta distinción cambia completamente la estrategia de intervención.',
  },
  {
    q: '¿La evaluación de TDAH es diferente para niñas?',
    a: 'El proceso es el mismo, pero la interpretación clínica requiere considerar diferencias de género. Karen usa el CONNERS-3 con las normas diferenciadas por sexo que el instrumento establece, incluye la perspectiva de maestras además de maestros, y explora específicamente señales de enmascaramiento y compensación. Los cuestionarios para maestros son especialmente importantes en niñas porque los síntomas pueden ser más visibles en el salón que en casa.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${CANONICAL_URL}/#article`,
      headline: ARTICLE_HEADLINE,
      description: 'Las niñas con TDAH suelen pasar desapercibidas porque sus síntomas son diferentes. Aprende a reconocer el TDAH inatento en niñas y por qué el diagnóstico temprano cambia su trayectoria.',
      image: `${SITE_URL}/blog/dark-tdah-en-ninas-diagnostico-tardio-1200x675.png`,
      datePublished: '2026-07-14',
      dateModified: '2026-07-14',
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

export default function TDAHNinasDiagnosticoTardio() {
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
        <meta name="description" content="Las niñas con TDAH suelen pasar desapercibidas porque sus síntomas son diferentes. Aprende a reconocer el TDAH inatento en niñas y por qué el diagnóstico temprano cambia su trayectoria. Neuropsicóloga Karen Trujillo, Cancún." />
        <link rel="canonical" href={CANONICAL_URL} />

        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content={ARTICLE_HEADLINE} />
        <meta property="og:description" content="Las niñas con TDAH pasan años desapercibidas. Sus síntomas son diferentes: más internos, más compensados. Guía clínica para reconocer el TDAH inatento en niñas." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-tdah-en-ninas-diagnostico-tardio-1200x675.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="TDAH en niñas: diagnóstico tardío y señales de alerta" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-07-14" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${ARTICLE_HEADLINE} | Karen Trujillo`} />
        <meta name="twitter:description" content="Las niñas con TDAH llevan años siendo catalogadas de distraídas o ansiosas. Sus síntomas son reales — solo son diferentes. Guía clínica para reconocerlos." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-tdah-en-ninas-diagnostico-tardio-1200x675.png`} />

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
                <span className="font-medium" style={{ color: '#c6bce2' }}>TDAH en niñas</span>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <BookOpen className="w-3.5 h-3.5" style={{ color: '#c6bce2' }} />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-white">Guía clínica · TDAH infantil</span>
                </div>

                <h1 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.15] mb-5 text-balance">
                  TDAH en niñas:<br />
                  <span style={{ color: 'rgba(208,208,231,0.72)' }}>por qué se diagnostica tarde y cómo reconocerlo</span>
                </h1>

                <p className="text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Las niñas con TDAH llevan años siendo catalogadas de &ldquo;distraídas&rdquo;, &ldquo;soñadoras&rdquo; o &ldquo;ansiosas&rdquo;. No porque sus síntomas sean menos reales, sino porque son diferentes — y el sistema no estaba entrenado para verlos.
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
                      <time dateTime="2026-07-14">14 jul 2026</time>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-white/40" /> 10 min de lectura</span>
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
                    src="/blog/dark-tdah-en-ninas-diagnostico-tardio-1200x675.png"
                    alt="TDAH en niñas: por qué se diagnostica tarde — imagen ilustrativa"
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
                      { href: '#por-que-invisibles', label: 'Por qué las niñas pasan desapercibidas' },
                      { href: '#diferencias', label: 'Síntomas en niños vs. niñas: tabla comparativa' },
                      { href: '#inatento', label: 'El TDAH inatento: la presentación más frecuente en niñas' },
                      { href: '#consecuencias', label: 'Qué pasa si no se diagnostica a tiempo' },
                      { href: '#senales', label: '8 señales de alerta específicas en niñas' },
                      { href: '#evaluacion', label: 'Cómo es la evaluación de TDAH en niñas' },
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
                    Durante décadas, el TDAH fue considerado una condición de niños inquietos. Las imágenes de diagnóstico mostraban a un niño que no podía quedarse sentado, que interrumpía constantemente, que corría cuando debía caminar. Ese niño era visible. Era fácil de identificar.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-6">
                    La niña con TDAH, en cambio, estaba sentada en la misma aula mirando por la ventana. No molestaba a nadie. Sus maestras escribían en el cuaderno: <em className="text-primary font-medium">&ldquo;es inteligente pero le falta concentración&rdquo;</em>, <em className="text-primary font-medium">&ldquo;es soñadora&rdquo;</em>, <em className="text-primary font-medium">&ldquo;se distrae con facilidad&rdquo;</em>.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                    Nadie decía TDAH. Porque el TDAH se veía diferente en ella — y nadie estaba entrenado para reconocer esa diferencia.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              POR QUÉ INVISIBLES
              ══════════════════════════════════════════════════════ */}
          <section id="por-que-invisibles" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">El diagnóstico invisible</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Por qué las niñas con TDAH pasan desapercibidas</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">No es que el TDAH sea menos severo en niñas. Es que su expresión es diferente — y los sistemas de detección se diseñaron con base en niños.</p>
              </SectionReveal>

              <div className="space-y-4">
                {[
                  {
                    titulo: 'Masking: el enmascaramiento como estrategia de supervivencia',
                    icono: Eye,
                    desc: 'Las niñas aprenden muy pronto a ocultar sus dificultades para encajar socialmente. Observan cómo se comportan sus compañeras y las imitan. Compensan con reglas, listas y estrategias que funcionan hasta que la exigencia aumenta. El resultado: desde afuera parecen "bien" cuando por dentro están agotadas de sostener la apariencia.',
                  },
                  {
                    titulo: 'Perfeccionismo compensatorio',
                    icono: AlertTriangle,
                    desc: 'Muchas niñas con TDAH desarrollan perfeccionismo como respuesta adaptativa: si lo hago todo perfecto, nadie notará que me cuesta más que a los demás. Estudian más horas, rehaen los trabajos varias veces, se exigen sin límite. Esto las mantiene con buenas calificaciones durante años — hasta que la carga cognitiva supera la capacidad de compensación.',
                  },
                  {
                    titulo: 'Síntomas internalizados, no externalizados',
                    icono: Brain,
                    desc: 'El TDAH en niñas se vive hacia adentro: ansiedad, rumiación, autocrítica intensa, baja autoestima. En niños, el TDAH se expresa hacia afuera: conducta disruptiva, conflictos con maestros, quejas frecuentes. Los síntomas externos generan más derivaciones clínicas. Los internos pasan como "personalidad" o "timidez".',
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.titulo} delay={i * 0.08}>
                    <div className="flex gap-4 p-5 sm:p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent-blue/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <item.icono className="w-5 h-5 text-primary/60" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-2 leading-snug">{item.titulo}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              COMPARATIVA NIÑOS VS NIÑAS
              ══════════════════════════════════════════════════════ */}
          <section id="diferencias" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Tabla comparativa</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">TDAH en niños vs. TDAH en niñas</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">Mismo diagnóstico, expresión completamente diferente.</p>
              </SectionReveal>

              <SectionReveal>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="p-4 text-left font-bold text-primary text-xs uppercase tracking-wider w-1/3">Aspecto</th>
                        <th className="p-4 text-left font-bold text-accent-blue text-xs uppercase tracking-wider w-1/3">Niños</th>
                        <th className="p-4 text-left font-bold text-primary text-xs uppercase tracking-wider w-1/3">Niñas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparativaSymptoms.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}>
                          <td className="p-4 font-bold text-primary text-xs">{row.aspecto}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light leading-relaxed">{row.ninos}</td>
                          <td className="p-4 text-foreground text-xs font-medium leading-relaxed">{row.ninas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              IMAGEN INLINE
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(67,56,96,0.12)]">
                  <img
                    src="/blog/sand-vida-diaria-con-tdah-960x540.svg"
                    alt="Niña con TDAH en su vida cotidiana — imagen ilustrativa"
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
              TDAH INATENTO
              ══════════════════════════════════════════════════════ */}
          <section id="inatento" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">La presentación más frecuente</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">El TDAH inatento: cuando la hiperactividad no es visible</h2>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="space-y-4 mb-10">
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                    El DSM-5 reconoce tres presentaciones del TDAH: combinado (inatención + hiperactividad), predominantemente hiperactivo-impulsivo, y <strong className="text-primary font-semibold">predominantemente inatento</strong>. Esta última es la más frecuente en niñas.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                    En el TDAH inatento, no hay hiperactividad motora visible. La niña no se levanta, no interrumpe, no hace ruido. Lo que ocurre está dentro de su cabeza: una mente que salta de un pensamiento a otro, que no logra anclar la atención en la tarea, que procesa información de forma no lineal cuando el salón exige linealidad.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                    Los maestros lo reportan como &ldquo;falta de concentración&rdquo; o &ldquo;despiste&rdquo;. Los padres lo notan como &ldquo;tarda mucho en hacer todo&rdquo;. Ninguno de los dos piensa en TDAH porque no hay nada que &ldquo;se vea&rdquo; como TDAH.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 sm:p-6 mb-10">
                  <p className="font-bold text-primary text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary/60" />
                    ¿Por qué se confunde con ansiedad o timidez?
                  </p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Una niña que no termina las tareas, que parece ida en clase, que llora con facilidad ante exigencias y que se siente &ldquo;diferente&rdquo; a sus compañeras fácilmente recibe un diagnóstico de ansiedad o se explica como personalidad introvertida. El TDAH inatento y la ansiedad comparten síntomas superficiales — pero tienen orígenes neurológicos distintos que requieren intervenciones diferentes.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              CONSECUENCIAS DEL NO-DIAGNÓSTICO
              ══════════════════════════════════════════════════════ */}
          <section id="consecuencias" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">El costo silencioso</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Qué pasa cuando el TDAH en niñas no se diagnostica a tiempo</h2>
              </SectionReveal>

              <div className="space-y-4">
                {[
                  {
                    titulo: 'Adolescencia especialmente difícil',
                    desc: 'Al llegar a secundaria, la exigencia académica y social aumenta mientras las estrategias de compensación se agotan. Las calificaciones caen, las relaciones se complican, la autoexigencia se intensifica. Es frecuente que el primer desplome sea visible justo aquí.',
                    icono: AlertTriangle,
                  },
                  {
                    titulo: 'Ciclo de autocrítica: "soy floja" / "soy tonta"',
                    desc: 'Cuando una niña se esfuerza más que sus compañeras y obtiene peores resultados, la narrativa que construye sobre sí misma es devastadora. Sin diagnóstico, no hay manera de atribuir el problema a su cerebro — solo a su carácter. Ese relato interno puede persistir hasta la adultez.',
                    icono: XCircle,
                  },
                  {
                    titulo: 'Mayor riesgo de ansiedad y depresión',
                    desc: 'Las adolescentes con TDAH no diagnosticado tienen tasas significativamente más altas de ansiedad generalizada, depresión y baja autoestima que sus pares. No porque el TDAH cause directamente estas condiciones, sino porque años de esfuerzo sin reconocimiento ni herramientas las generan.',
                    icono: Brain,
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.titulo} delay={i * 0.08}>
                    <div className="flex gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/25 flex items-center justify-center shrink-0">
                        <item.icono className="w-4 h-4 text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary text-sm mb-1.5">{item.titulo}</h3>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.4}>
                <div className="mt-8 bg-warning/5 border border-warning/15 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      <strong className="text-primary font-medium">La buena noticia:</strong> el diagnóstico a cualquier edad cambia la trayectoria. Las niñas que reciben un diagnóstico temprano tienen acceso a estrategias de compensación conscientes, adecuaciones escolares y una narrativa sobre sí mismas radicalmente diferente: <em>&ldquo;mi cerebro funciona de otra manera&rdquo;</em>, no <em>&ldquo;soy menos que los demás&rdquo;</em>.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              SEÑALES DE ALERTA
              ══════════════════════════════════════════════════════ */}
          <section id="senales" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Lista de verificación</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">8 señales de alerta de TDAH en niñas</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">Si tu hija muestra 4 o más de estas señales de manera consistente y en diferentes contextos (casa y escuela), vale la pena una evaluación.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {senalesAlerta.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.06}>
                    <div className="bg-secondary/50 border border-border rounded-2xl p-5 h-full hover:border-primary/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary/70">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <p className="font-bold text-primary text-sm leading-snug">{item.senal}</p>
                      </div>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed pl-10">{item.detalle}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.5}>
                <div className="mt-8 bg-primary/5 border border-primary/15 rounded-2xl p-5 sm:p-6">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    <strong className="text-primary font-medium">Importante:</strong> esta lista es orientativa, no diagnóstica. Muchos de estos comportamientos pueden tener otras explicaciones. Solo una evaluación neuropsicológica completa puede determinar si estamos ante TDAH, otro cuadro o una combinación de factores.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              EVALUACIÓN EN NIÑAS
              ══════════════════════════════════════════════════════ */}
          <section id="evaluacion" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">El proceso de evaluación</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Cómo es la evaluación de TDAH en niñas</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">El proceso es el mismo que para cualquier niño — pero la interpretación clínica requiere considerar cómo se expresa el TDAH de manera diferente en niñas.</p>
              </SectionReveal>

              <div className="space-y-4 mb-10">
                {[
                  {
                    instrumento: 'CONNERS-3',
                    descripcion: 'Escala de evaluación de TDAH con normas diferenciadas por sexo. Las respuestas de padres y maestras se interpretan con los percentiles correspondientes a niñas de la misma edad — no con normas unificadas que subrepresentan la expresión femenina del TDAH.',
                    icono: FileText,
                  },
                  {
                    instrumento: 'WISC-V',
                    descripcion: 'Evaluación de inteligencia y funciones cognitivas que permite identificar el perfil de procesamiento: puede revelar que una niña con calificaciones promedio tiene recursos cognitivos superiores que está compensando con esfuerzo. Esta discrepancia entre potencial y rendimiento es una señal clínica importante.',
                    icono: Brain,
                  },
                  {
                    instrumento: 'BRIEF-2',
                    descripcion: 'Evaluación del funcionamiento ejecutivo en contexto real. Las versiones para padres y para maestras permiten comparar cómo se manifiestan las dificultades ejecutivas en casa versus en el salón — diferencia especialmente relevante en niñas que compensan bien en uno de los dos contextos.',
                    icono: Users,
                  },
                  {
                    instrumento: 'Perspectiva de maestras',
                    descripcion: 'En la evaluación de niñas, se solicita explícitamente la opinión de maestras además de maestros. Las señales de TDAH inatento pueden ser más visibles para docentes que conocen bien el funcionamiento de la niña en tareas sostenidas. Los cuestionarios estandarizados para maestros son parte central del proceso.',
                    icono: CheckCircle2,
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.instrumento} delay={i * 0.06}>
                    <div className="flex gap-4 p-5 bg-card rounded-2xl border border-border hover:border-accent-blue/30 hover:shadow-md transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                        <item.icono className="w-4 h-4 text-primary/60" />
                      </div>
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-accent-blue/10 text-accent-blue rounded text-[10px] font-bold uppercase tracking-wider mb-2">{item.instrumento}</span>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.descripcion}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
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
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">¿Crees que tu hija podría tener TDAH?</h2>
                  <p className="text-white/70 font-light max-w-xl mx-auto">El diagnóstico no cambia quién es ella — le da un nombre a algo que ya estaba ahí, y le abre el acceso a estrategias reales.</p>
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
                      { label: 'Pruebas', value: 'CONNERS-3, WISC-V, BRIEF-2, CPT-3' },
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
                      href="/evaluacion-tdah-ninos"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                    >
                      <Users className="w-4 h-4" />
                      Ver evaluación TDAH infantil
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu artículo sobre TDAH en niñas y me gustaría información sobre la evaluación para mi hija.')}`}
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
                    subtitle: 'Niños y niñas de 5 a 17 años',
                    img: '/blog/lavender-valoracion-tdah-infantil-640x400.svg',
                  },
                  {
                    href: '/blog/tdah-adultos-diagnostico-tardio',
                    category: 'Artículo relacionado',
                    title: 'TDAH en adultos: por qué miles llegan al diagnóstico después de los 30',
                    subtitle: 'La niña de hoy, la adulta de mañana',
                    img: '/blog/lavender-evaluacion-neuropsicologica-960x540.svg',
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
                Evaluar a mi hija
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
