import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Brain, FileText, CheckCircle2,
  ShieldCheck, MessageCircle, Clock, Award,
  Star, Users, BadgeCheck, Puzzle, Briefcase,
  ChevronDown, AlertTriangle, Eye, Zap,
  BookOpen, ArrowLeft, ListChecks, HelpCircle,
  Lightbulb, XCircle, Stethoscope,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const WA_NUMBER = '529983211547';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const signals = [
  {
    category: 'Inatención',
    icon: Eye,
    accent: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
    items: [
      { signal: 'Se distrae con cualquier estímulo durante tareas escolares', example: 'Un ruido mínimo lo desconecta completamente de la tarea que estaba haciendo.' },
      { signal: 'Pierde útiles, juguetes o materiales constantemente', example: 'Cada semana pierde lápices, borradores o cuadernos. No es descuido "normal" — es un patrón.' },
      { signal: 'Parece no escuchar cuando le hablas directamente', example: 'Le dices algo mirándolo a los ojos y a los 10 segundos no recuerda qué le dijiste.' },
      { signal: 'No termina tareas o actividades que inició', example: 'Empieza la tarea con buena actitud, pero a los 5 minutos ya está haciendo otra cosa.' },
      { signal: 'Evita actividades que requieren esfuerzo mental sostenido', example: 'Leer un párrafo completo o resolver problemas de matemáticas genera resistencia desproporcionada.' },
      { signal: 'Comete errores por descuido en el trabajo escolar', example: 'Sabe la respuesta pero escribe otra cosa, se salta renglones o no lee las instrucciones completas.' },
    ],
  },
  {
    category: 'Hiperactividad',
    icon: Zap,
    accent: 'text-warning bg-warning/10 border-warning/20',
    items: [
      { signal: 'No puede permanecer sentado cuando se espera que lo esté', example: 'En clase, en restaurantes o en la iglesia — se levanta repetidamente sin motivo aparente.' },
      { signal: 'Mueve manos, pies o se retuerce en el asiento', example: 'Balancea la silla, golpetea la mesa, mueve las piernas de forma constante.' },
      { signal: 'Corre o trepa en situaciones inapropiadas', example: 'En la sala de espera del doctor o en el supermercado — la energía no se adapta al contexto.' },
      { signal: 'Habla excesivamente o tiene dificultad para jugar en silencio', example: 'No puede estar en una actividad tranquila sin narrar, hacer ruidos o buscar estímulo.' },
    ],
  },
  {
    category: 'Impulsividad',
    icon: AlertTriangle,
    accent: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20',
    items: [
      { signal: 'Responde antes de que terminen la pregunta', example: 'En clase o en casa, interrumpe con la respuesta sin esperar a que terminen de hablar.' },
      { signal: 'Dificultad para esperar su turno', example: 'En juegos, filas o conversaciones — la espera genera frustración desproporcionada.' },
      { signal: 'Interrumpe conversaciones o actividades de otros', example: 'Se mete en conversaciones ajenas o toma cosas de otros niños sin pedir permiso.' },
      { signal: 'Actúa sin pensar en las consecuencias', example: 'Dice cosas inapropiadas, toma decisiones arriesgadas o reacciona de forma exagerada sin procesarlo.' },
    ],
  },
];

const myths = [
  { myth: '"Es flojo, si quisiera podría poner atención"', reality: 'El TDAH es una condición neurológica, no un problema de voluntad. Las funciones ejecutivas del cerebro — atención, inhibición, memoria de trabajo — operan de forma diferente.' },
  { myth: '"Solo los niños hiperactivos tienen TDAH"', reality: 'Existe el TDAH predominantemente inatento (antes "TDA"), donde no hay hiperactividad visible. Es más difícil de detectar y muy común en niñas.' },
  { myth: '"Se le va a quitar cuando crezca"', reality: 'Sin intervención, el TDAH no desaparece — se transforma. Muchos adultos descubren que lo han tenido toda la vida sin saberlo.' },
  { myth: '"Saca buenas calificaciones, no puede tener TDAH"', reality: 'Niños con alto CI pueden compensar el TDAH durante años. El esfuerzo que les cuesta es invisible — hasta que la exigencia supera su capacidad de compensar.' },
  { myth: '"Es un invento de las farmacéuticas"', reality: 'El TDAH es una de las condiciones más estudiadas en neurociencia. Hay décadas de investigación con resonancias magnéticas, estudios genéticos y ensayos clínicos que confirman su base neurológica.' },
];

const ageRanges = [
  {
    range: '3 – 5 años (preescolar)',
    desc: 'A esta edad es difícil distinguir TDAH de comportamiento típico, pero hay señales que llaman la atención.',
    signs: ['Actividad motora extrema vs. otros niños de su edad', 'No sigue instrucciones simples de dos pasos', 'Dificultad para esperar turno en juegos básicos', 'Cambio constante de actividad sin completar ninguna'],
    note: 'Es normal que los niños pequeños sean activos y distraídos. La clave es si la intensidad es significativamente mayor que la de sus pares.',
  },
  {
    range: '6 – 11 años (primaria)',
    desc: 'La etapa donde más se detecta el TDAH, porque la escuela exige atención sostenida y autocontrol.',
    signs: ['Rendimiento escolar inconsistente — "puede pero no quiere"', 'Olvida tareas, pierde materiales, no anota instrucciones', 'Dificultad para organizar su mochila, cuarto o tiempo', 'Problemas sociales: interrumpe, no respeta turnos, reacciona de más'],
    note: 'Si la maestra te dice repetidamente que "puede más pero no se esfuerza", vale la pena evaluar.',
  },
  {
    range: '12 – 17 años (secundaria y prepa)',
    desc: 'En la adolescencia, la hiperactividad disminuye pero la inatención y la impulsividad persisten o se intensifican.',
    signs: ['Procrastinación crónica y dificultad para iniciar tareas', 'Problemas con la planeación a mediano plazo (proyectos, exámenes)', 'Impulsividad emocional — reacciones exageradas, frustración rápida', 'Uso excesivo de pantallas como autoestimulación'],
    note: 'Muchos adolescentes compensan con inteligencia hasta que la exigencia académica o social los supera. El "burnout escolar" puede ser TDAH no diagnosticado.',
  },
];

const faqItems = [
  {
    q: '¿A qué edad se puede diagnosticar TDAH en niños?',
    a: 'El diagnóstico neuropsicológico formal puede realizarse a partir de los 5-6 años, cuando las funciones ejecutivas tienen un nivel de desarrollo suficiente para ser evaluadas con pruebas estandarizadas. Antes de esa edad, se pueden hacer observaciones clínicas, pero un diagnóstico confiable requiere pruebas como CONNERS-3, WISC-V y CPT-3.',
  },
  {
    q: '¿Cuántas señales necesita tener mi hijo para que sea TDAH?',
    a: 'Según los criterios del DSM-5, se necesitan al menos 6 síntomas de inatención y/o 6 de hiperactividad-impulsividad, presentes por más de 6 meses, en al menos 2 contextos (por ejemplo, casa y escuela). Sin embargo, la cantidad de señales no es suficiente — se necesita una evaluación neuropsicológica que mida el impacto real en las funciones ejecutivas.',
  },
  {
    q: '¿La escuela puede diagnosticar TDAH?',
    a: 'No. La escuela puede sospechar y referir, pero el diagnóstico lo debe realizar un profesional de la salud con formación en neuropsicología o neurología. Las observaciones escolares son un insumo valioso, pero no sustituyen una evaluación con pruebas estandarizadas.',
  },
  {
    q: '¿Es lo mismo TDAH que TDA?',
    a: 'TDA (Trastorno por Déficit de Atención sin hiperactividad) era el término anterior. Actualmente, el DSM-5 lo clasifica como TDAH con presentación predominantemente inatenta. Es el mismo trastorno con diferente presentación — y es el más difícil de detectar porque no hay conductas disruptivas visibles.',
  },
  {
    q: '¿Si mi hijo tiene TDAH necesita medicamento?',
    a: 'No necesariamente. El tratamiento del TDAH es multimodal: puede incluir intervención conductual, adecuaciones escolares, terapia y, en algunos casos, medicación. La evaluación neuropsicológica no prescribe medicamento — genera un informe con recomendaciones concretas para cada área afectada. La decisión sobre medicación la toma un neurólogo o psiquiatra con base en la evaluación.',
  },
  {
    q: '¿Cuánto cuesta evaluar a mi hijo por TDAH en Cancún?',
    a: 'La valoración de TDAH infantil tiene un costo de $7,000 MXN. Incluye todas las sesiones (4-5 citas presenciales), pruebas estandarizadas (CONNERS-3, WISC-V, BRIEF-2, CPT-3), informe clínico completo y sesión de devolución con explicación de resultados y recomendaciones.',
  },
];

const relatedResources = [
  {
    href: '/blog/tdah-adultos-diagnostico-tardio',
    icon: Briefcase,
    category: 'TDAH Adultos',
    title: 'TDAH en adultos: por qué miles llegan al diagnóstico después de los 30',
    color: 'from-primary/10 to-primary/5',
  },
  {
    href: '/blog/que-es-ados-2-autismo',
    icon: Puzzle,
    category: 'Autismo (TEA)',
    title: '¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?',
    color: 'from-accent-pink/10 to-accent-pink/5',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON — Article + BreadcrumbList + FAQPage
   ═══════════════════════════════════════════════════════════════ */

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://psicologakarentrujillo.com.mx/blog/senales-tdah-ninos/#article',
      headline: 'Señales de TDAH en niños: guía para padres que sospechan',
      description: 'Guía completa para identificar señales reales de TDAH en niños de 3 a 17 años. Diferencia entre comportamiento típico y síntomas que justifican una evaluación neuropsicológica.',
      image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
      datePublished: '2025-06-15',
      dateModified: '2025-06-15',
      author: {
        '@type': 'Person',
        '@id': 'https://psicologakarentrujillo.com.mx/#physician',
        name: 'Karen Trujillo',
        jobTitle: 'Neuropsicóloga Clínica',
        url: 'https://psicologakarentrujillo.com.mx',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://psicologakarentrujillo.com.mx/#clinic',
        name: 'Neuropsicóloga Karen Trujillo',
        url: 'https://psicologakarentrujillo.com.mx',
      },
      mainEntityOfPage: 'https://psicologakarentrujillo.com.mx/blog/senales-tdah-ninos',
      inLanguage: 'es-MX',
      about: {
        '@type': 'MedicalCondition',
        name: 'TDAH en niños',
        sameAs: 'https://www.wikidata.org/wiki/Q206811',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://psicologakarentrujillo.com.mx' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://psicologakarentrujillo.com.mx/blog' },
        { '@type': 'ListItem', position: 3, name: 'Señales de TDAH en niños', item: 'https://psicologakarentrujillo.com.mx/blog/senales-tdah-ninos' },
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
   MAIN PAGE — BLOG: Señales de TDAH en Niños
   ═══════════════════════════════════════════════════════════════ */

export default function SenalesTDAHNinos() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedSignal, setExpandedSignal] = useState<string | null>(null);
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
        <title>Señales de TDAH en niños: guía para padres | Neuropsicóloga Karen Trujillo</title>
        <meta name="description" content="¿Tu hijo no pone atención, pierde cosas o no se queda quieto? Conoce las señales reales de TDAH en niños de 3 a 17 años. Guía basada en evidencia por neuropsicóloga con cédula 11009616." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/blog/senales-tdah-ninos" />

        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Señales de TDAH en niños: guía para padres que sospechan" />
        <meta property="og:description" content="Guía completa para identificar señales reales de TDAH en niños. Diferencia entre comportamiento típico y síntomas que justifican una evaluación neuropsicológica." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx/blog/senales-tdah-ninos" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2025-06-15" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Señales de TDAH en niños: guía para padres | Karen Trujillo" />
        <meta name="twitter:description" content="¿Tu hijo no pone atención? Conoce las señales reales de TDAH vs. comportamiento típico. Guía basada en evidencia." />

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
          <section className="relative pt-28 pb-14 sm:pb-20 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="max-w-3xl mx-auto relative z-10">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8 animate-[fadeIn_0.8s_ease-out_both]" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Inicio
                </Link>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-muted-foreground/40">Blog</span>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-primary font-medium">TDAH Infantil</span>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-accent-blue/15">
                  <BookOpen className="w-3.5 h-3.5 text-accent-blue" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground">Guía para padres · Basada en evidencia</span>
                </div>

                <h1 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-serif font-bold text-primary leading-[1.15] mb-5 text-balance">
                  ¿Tu hijo no pone atención?<br />
                  <span className="text-primary/60">Señales reales de TDAH vs. comportamiento típico</span>
                </h1>

                <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl">
                  Guía completa para padres que sospechan que su hijo podría tener TDAH. Aprende a identificar las señales que justifican una evaluación neuropsicológica — por edad, por tipo de presentación y con ejemplos concretos.
                </p>

                {/* Author card */}
                <div className="flex items-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border shadow-md">
                    <Image
                      src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                      alt="Neuropsicóloga Karen Trujillo"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover object-top"
                      priority
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">Neuropsicóloga Karen Trujillo</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-primary/40" /> Cédula 11009616</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary/40" /> 12 min de lectura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              TABLE OF CONTENTS — Quick navigation
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
                      { href: '#senales', label: '14 señales de TDAH por categoría' },
                      { href: '#edad', label: 'Señales según la edad de tu hijo' },
                      { href: '#normal-vs-tdah', label: '¿Cuándo es "normal" y cuándo preocuparse?' },
                      { href: '#mitos', label: '5 mitos sobre TDAH infantil' },
                      { href: '#que-hacer', label: '¿Qué hacer si reconoces estas señales?' },
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
                    Como neuropsicóloga, una de las frases que más escucho de los padres que llegan a mi consultorio es: <em className="text-primary font-medium">&ldquo;No sé si es normal o si ya debería preocuparme.&rdquo;</em>
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-6">
                    Y tiene sentido — todos los niños son distraídos en algún momento. Todos se mueven, todos interrumpen. La diferencia entre un comportamiento típico de la infancia y una señal real de TDAH está en tres factores: <strong className="text-primary font-semibold">la intensidad</strong> (qué tan fuerte es), <strong className="text-primary font-semibold">la frecuencia</strong> (qué tan seguido ocurre) y <strong className="text-primary font-semibold">el impacto</strong> (cuánto afecta su vida escolar, social o familiar).
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                    Esta guía te va a ayudar a identificar las señales que justifican una evaluación profesional. No para que diagnostiques a tu hijo en casa — sino para que sepas cuándo buscar ayuda con datos, no con dudas.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              SEÑALES — 14 signals by category
              ══════════════════════════════════════════════════════ */}
          <section id="senales" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Señales por categoría</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">14 señales de TDAH en niños que no debes ignorar</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">El TDAH tiene tres presentaciones: inatenta, hiperactiva-impulsiva, y combinada. Estas son las señales más frecuentes de cada una.</p>
              </SectionReveal>

              <div className="space-y-8">
                {signals.map((group, gi) => (
                  <SectionReveal key={group.category} delay={gi * 0.1}>
                    <div className="bg-card border border-border rounded-3xl overflow-hidden">
                      {/* Category header */}
                      <div className="px-6 py-5 border-b border-border flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl border-2 ${group.accent} flex items-center justify-center`}>
                          <group.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-primary text-lg">{group.category}</h3>
                          <p className="text-xs text-muted-foreground font-light">{group.items.length} señales principales</p>
                        </div>
                      </div>

                      {/* Signals list */}
                      <div className="divide-y divide-border">
                        {group.items.map((item, ii) => {
                          const key = `${gi}-${ii}`;
                          const isOpen = expandedSignal === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setExpandedSignal(isOpen ? null : key)}
                              className="w-full text-left px-6 py-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                            >
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-primary leading-snug">{item.signal}</p>
                                  <div
                                    className="grid transition-all duration-300"
                                    style={{
                                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                                      opacity: isOpen ? 1 : 0,
                                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                                    }}
                                  >
                                    <div className="overflow-hidden">
                                      <p className="text-xs text-muted-foreground font-light leading-relaxed mt-2 pl-0 sm:pl-0 bg-secondary/50 p-3 rounded-xl border border-border/50">
                                        <span className="font-bold text-primary/60 text-[10px] uppercase tracking-widest">Ejemplo: </span>
                                        {item.example}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/50 mt-0.5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              POR EDAD — Signals by age range
              ══════════════════════════════════════════════════════ */}
          <section id="edad" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Señales por edad</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Cómo se ve el TDAH según la edad de tu hijo?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">El TDAH no se ve igual a los 4 años que a los 14. Estas son las señales más comunes en cada etapa.</p>
              </SectionReveal>

              <div className="space-y-5">
                {ageRanges.map((age, i) => (
                  <SectionReveal key={age.range} delay={i * 0.1}>
                    <div className="bg-secondary/50 border border-border rounded-2xl p-6 sm:p-8 hover:border-accent-blue/30 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-accent-blue">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-primary text-base sm:text-lg">{age.range}</h3>
                          <p className="text-sm text-muted-foreground font-light mt-1">{age.desc}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2 mb-4 pl-0 sm:pl-14">
                        {age.signs.map((sign) => (
                          <div key={sign} className="flex items-start gap-2 text-sm text-muted-foreground font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue/50 mt-0.5 shrink-0" />
                            <span>{sign}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pl-0 sm:pl-14">
                        <div className="flex items-start gap-2 bg-warning/5 border border-warning/15 rounded-xl p-3">
                          <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground font-light leading-relaxed"><strong className="text-primary font-medium">Nota clínica:</strong> {age.note}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              NORMAL VS TDAH — Differentiation
              ══════════════════════════════════════════════════════ */}
          <section id="normal-vs-tdah" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">La pregunta clave</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Cuándo es &ldquo;cosa de niños&rdquo; y cuándo es TDAH?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">La diferencia no está en qué hace tu hijo, sino en cómo, cuánto y cuánto le afecta.</p>
              </SectionReveal>

              <div className="space-y-4">
                {[
                  { normal: 'Se distrae ocasionalmente con algo muy llamativo', tdah: 'Se distrae con cualquier estímulo, incluso en actividades que le gustan' },
                  { normal: 'Le cuesta concentrarse en tareas aburridas', tdah: 'No puede sostener la atención ni siquiera con motivación y recompensas' },
                  { normal: 'A veces olvida su lonchera o un cuaderno', tdah: 'Pierde materiales varias veces por semana, en un patrón constante' },
                  { normal: 'Se mueve mucho cuando está emocionado o cansado', tdah: 'La inquietud motora es constante, independiente del contexto o el estado emocional' },
                  { normal: 'Interrumpe cuando está muy entusiasmado', tdah: 'Interrumpe sistemáticamente, incluso cuando sabe que no debe hacerlo' },
                ].map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.06}>
                    <div className="grid sm:grid-cols-2 gap-0 sm:gap-0 bg-card border border-border rounded-2xl overflow-hidden">
                      <div className="px-5 py-4 flex items-start gap-3 border-b sm:border-b-0 sm:border-r border-border">
                        <div className="w-6 h-6 rounded-full bg-success/10 border border-success/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-success" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-success mb-1">Comportamiento típico</p>
                          <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.normal}</p>
                        </div>
                      </div>
                      <div className="px-5 py-4 flex items-start gap-3 bg-rose-50 dark:bg-rose-500/5">
                        <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/25 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertTriangle className="w-3 h-3 text-rose-500" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-rose-500 mb-1">Posible señal de TDAH</p>
                          <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.tdah}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.4}>
                <div className="mt-8 bg-primary/5 border border-primary/15 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary/50 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-primary text-sm mb-2">¿La regla de oro?</p>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        Si las señales están presentes <strong className="text-primary font-semibold">en más de un contexto</strong> (casa + escuela), llevan <strong className="text-primary font-semibold">más de 6 meses</strong>, y afectan su rendimiento escolar, sus relaciones o su autoestima — no es &ldquo;cosa de niños&rdquo;. Es momento de evaluar.
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              MITOS — Common myths debunked
              ══════════════════════════════════════════════════════ */}
          <section id="mitos" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Derribando mitos</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center">5 mitos sobre TDAH en niños</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">Creencias que retrasan el diagnóstico y causan sufrimiento innecesario.</p>
              </SectionReveal>

              <div className="space-y-4">
                {myths.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="bg-secondary/50 border border-border rounded-2xl p-5 sm:p-6 hover:border-accent-blue/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/25 flex items-center justify-center shrink-0">
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                        </div>
                        <p className="font-bold text-primary text-sm leading-snug pt-1">{item.myth}</p>
                      </div>
                      <div className="pl-10">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground font-light leading-relaxed"><strong className="text-primary font-medium">Realidad:</strong> {item.reality}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              QUÉ HACER — Actionable next steps
              ══════════════════════════════════════════════════════ */}
          <section id="que-hacer" className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/50 mb-3 text-center">El siguiente paso</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-center">¿Reconoces estas señales en tu hijo?</h2>
                <p className="text-primary-foreground/70 font-light text-center max-w-xl mx-auto mb-10">No necesitas tener certeza para buscar ayuda. Lo que necesitas es una evaluación que te dé respuestas claras.</p>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="space-y-4 mb-10">
                  {[
                    { step: '1', text: 'Observa si las señales están en más de un contexto (casa, escuela, actividades).' },
                    { step: '2', text: 'Habla con su maestra: pregunta si ha notado patrones de inatención, impulsividad o inquietud.' },
                    { step: '3', text: 'Agenda una evaluación neuropsicológica: es el único método que mide objetivamente las funciones ejecutivas de tu hijo.' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 bg-white/8 border border-white/12 rounded-xl p-4">
                      <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary-foreground">{item.step}</span>
                      </div>
                      <p className="text-sm text-primary-foreground/80 font-light leading-relaxed pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="text-center">
                  <Link
                    href="/evaluacion-tdah-ninos"
                    className="group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-8 py-4 rounded-2xl bg-white text-primary shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    Ver evaluación TDAH infantil
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-primary-foreground/50 text-xs font-light mt-4">$7,000 MXN · 4-5 sesiones · Informe con validez oficial</p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              FAQ — Blog-specific
              ══════════════════════════════════════════════════════ */}
          <section id="faq-blog" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">Preguntas frecuentes</h2>
              </SectionReveal>

              <div className="space-y-2">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div className={`bg-secondary/50 border-2 rounded-2xl transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-primary/50 shadow-lg shadow-primary/8' : 'border-border hover:border-accent-blue/30 hover:shadow-sm'}`}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-blog-${i}`}
                        className="w-full p-5 sm:p-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? 'border-primary bg-primary/10' : 'border-border'}`}>
                          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                        </div>
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
              RELATED — Internal linking to other blog posts
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary/50 border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Sigue aprendiendo</p>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-8 text-center">Recursos relacionados</h2>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {relatedResources.map((resource, i) => (
                  <SectionReveal key={resource.href} delay={i * 0.08}>
                    <Link href={resource.href} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-blue/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                      <div className={`h-1.5 bg-gradient-to-r ${resource.color}`} />
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <resource.icon className="w-3.5 h-3.5 text-primary/40" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{resource.category}</span>
                        </div>
                        <h3 className="font-bold text-primary text-sm leading-snug mb-3 group-hover:text-primary/80 transition-colors">{resource.title}</h3>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary group-hover:gap-2 transition-all">
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
              CTA FINAL — Conversion bridge to funnel
              ══════════════════════════════════════════════════════ */}
          <section id="cta-evaluacion" className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">Las dudas no se resuelven con más dudas</h2>
                  <p className="text-muted-foreground font-light max-w-xl mx-auto">Una evaluación neuropsicológica te da respuestas concretas en semanas. Si llegaste hasta aquí, probablemente es momento de dar el paso.</p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="bg-secondary/50 border-2 border-border rounded-2xl p-6 sm:p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border shadow-md shrink-0">
                      <Image
                        src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                        alt="Neuropsicóloga Karen Trujillo"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-bold text-primary">Neuropsicóloga Karen Trujillo</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-primary/40" /> Cédula 11009616</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" /> 47+ reseñas · 5.0</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'Pruebas', value: 'CONNERS-3, WISC-V, BRIEF-2, CPT-3' },
                      { label: 'Duración', value: '4-5 sesiones · 2-3 semanas' },
                      { label: 'Inversión', value: '$7,000 MXN todo incluido' },
                    ].map((item) => (
                      <div key={item.label} className="bg-card border border-border rounded-xl p-3 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-1">{item.label}</p>
                        <p className="text-xs font-medium text-primary">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/evaluacion-tdah-ninos"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                    >
                      <Stethoscope className="w-4 h-4" />
                      Ver evaluación completa
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu guía sobre señales de TDAH en niños y me gustaría agendar una evaluación para mi hijo.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Agendar por WhatsApp
                    </a>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><ShieldCheck className="w-3.5 h-3.5 text-primary/50" /> Cancelación con 48 hrs</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><ShieldCheck className="w-3.5 h-3.5 text-primary/50" /> Reembolso del anticipo</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><BadgeCheck className="w-3.5 h-3.5 text-primary/50" /> Validez oficial SEP e IMSS</span>
                </div>
              </SectionReveal>
            </div>
          </section>

        </main>

        <Footer />

        {/* ══════════════════════════════════════════════════════
            STICKY CTA — Mobile only
            ══════════════════════════════════════════════════════ */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
            <div className="flex gap-2.5 max-w-lg mx-auto">
              <Link
                href="/evaluacion-tdah-ninos"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-md active:scale-[0.97] transition-all"
              >
                <Brain className="w-4 h-4" />
                Evaluar TDAH
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu guía sobre TDAH en niños y me gustaría orientación.')}`}
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
