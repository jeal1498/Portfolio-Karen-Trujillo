import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Clock, Brain, Users, DollarSign, Eye, Sparkles, Zap, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { waUrl } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   DATA — ordenados por relevancia SEO
   ═══════════════════════════════════════════════════════════════ */

type FilterCategory = 'TDAH Infantil' | 'TDAH Adultos' | 'Autismo / TEA' | 'Diagnóstico' | 'Precios';

const FILTERS: ('Todos' | FilterCategory)[] = [
  'Todos',
  'TDAH Infantil',
  'TDAH Adultos',
  'Autismo / TEA',
  'Diagnóstico',
  'Precios',
];

const BADGE_BY_FILTER: Record<FilterCategory, string> = {
  'TDAH Infantil': 'bg-accent-blue/20 text-primary',
  'TDAH Adultos': 'bg-primary/10 text-primary',
  'Autismo / TEA': 'bg-accent-pink/15 text-accent-pink',
  Diagnóstico: 'bg-primary text-primary-foreground',
  Precios: 'bg-accent-green/15 text-accent-green',
};

const posts = [
  {
    rank: 1,
    slug: '/blog/senales-tdah-ninos',
    category: 'TDAH Infantil',
    filterCategory: 'TDAH Infantil' as FilterCategory,
    icon: Users,
    title: '¿Tu hijo no pone atención? Señales reales de TDAH en niños',
    excerpt: 'Guía para padres que sospechan: cómo diferenciar el comportamiento típico de señales que sí justifican una evaluación neuropsicológica. Por edades, con criterios clínicos reales.',
    readTime: '12 min',
    img: '/blog/lavender-tdah-en-ninos-900x500.svg',
  },
  {
    rank: 2,
    slug: '/blog/cuanto-cuesta-valoracion-tdah-cancun',
    category: 'Precios y proceso',
    filterCategory: 'Precios' as FilterCategory,
    icon: DollarSign,
    title: '¿Cuánto cuesta una valoración de TDAH en Cancún?',
    excerpt: 'Precio real, qué incluye, cuántas sesiones son y por qué cuesta lo que cuesta. Sin letra chica: $8,300 MXN con informe clínico válido ante SEP e IMSS.',
    readTime: '7 min',
    img: '/blog/sand-costo-tdah-600x340.svg',
  },
  {
    rank: 3,
    slug: '/blog/tdah-adultos-diagnostico-tardio',
    category: 'TDAH Adultos',
    filterCategory: 'TDAH Adultos' as FilterCategory,
    icon: Brain,
    title: 'TDAH en adultos: por qué miles llegan al diagnóstico después de los 30',
    excerpt: 'Te compensaste con inteligencia, te diagnosticaron ansiedad, o simplemente nadie lo vio. Las razones por las que el TDAH adulto se detecta tarde y qué hacer al respecto.',
    readTime: '10 min',
    img: '/blog/5b4e7f-tdah-adultos-600x340.svg',
    popular: true,
  },
  {
    rank: 4,
    slug: '/blog/tdah-en-ninas-sintomas',
    category: 'TDAH en Niñas',
    filterCategory: 'TDAH Infantil' as FilterCategory,
    icon: Sparkles,
    title: 'TDAH en niñas: los síntomas que casi nadie detecta',
    excerpt: 'Sin hiperactividad, sin disrupción, con notas aceptables. El TDAH femenino es invisible al sistema porque se compensa con esfuerzo hasta que el cuerpo no puede más.',
    readTime: '9 min',
    img: '/blog/lavender-tdah-en-ninas-600x340.svg',
    popular: true,
  },
  {
    rank: 5,
    slug: '/blog/que-es-ados-2-autismo',
    category: 'Autismo / TEA',
    filterCategory: 'Autismo / TEA' as FilterCategory,
    icon: Eye,
    title: '¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?',
    excerpt: 'El instrumento más confiable del mundo para evaluar TEA explicado sin jerga. Qué mide, cómo se aplica, sus 4 módulos y por qué supera cualquier cuestionario.',
    readTime: '11 min',
    img: '/blog/blush-ados-2-600x340.svg',
    popular: true,
  },
  {
    rank: 6,
    slug: '/blog/cuanto-cuesta-evaluacion-autismo-mexico',
    category: 'Autismo / TEA — Precios',
    filterCategory: 'Precios' as FilterCategory,
    icon: DollarSign,
    title: '¿Cuánto cuesta una evaluación de autismo en México?',
    excerpt: 'Precio real, sin letra chica. $8,500 MXN que incluye ADOS-2, ADI-R, WISC-V, Vineland-3 y sesión de devolución. Por qué cuesta lo que cuesta y qué pasa si no se hace.',
    readTime: '8 min',
    img: '/blog/blush-costo-autismo-600x340.svg',
  },
  {
    rank: 7,
    slug: '/blog/autismo-nivel-1-sintomas-adultos',
    category: 'Autismo / TEA',
    filterCategory: 'Autismo / TEA' as FilterCategory,
    icon: Brain,
    title: 'Autismo nivel 1: cuando no pareces autista pero lo eres',
    excerpt: 'Sin discapacidad intelectual, con lenguaje fluido — y sintiéndose diferente toda la vida sin saber por qué. El TEA nivel 1 (antes Asperger) es el perfil que más tarda en diagnosticarse.',
    readTime: '10 min',
    img: '/blog/2b1f47-autismo-nivel-1-600x340.svg',
  },
  {
    rank: 8,
    slug: '/blog/tdah-inatento-sintomas',
    category: 'TDAH Inatento',
    filterCategory: 'TDAH Infantil' as FilterCategory,
    icon: Clock,
    title: 'TDAH inatento: el tipo que casi nadie detecta',
    excerpt: 'Sin hiperactividad, sin escándalo, sin diagnóstico. El TDAH inatento pasa años invisible en niños y adultos porque se confunde con pereza o falta de motivación. Señales reales y cómo evaluarlo.',
    readTime: '8 min',
    img: '/blog/lavender-tdah-inatento-600x340.svg',
  },
  {
    rank: 9,
    slug: '/blog/tdah-vs-ansiedad-diferencias',
    category: 'Diagnóstico diferencial',
    filterCategory: 'Diagnóstico' as FilterCategory,
    icon: Zap,
    title: '¿TDAH o ansiedad? Cómo saber cuál es cuál — o si son los dos',
    excerpt: 'Comparten síntomas pero tienen causas distintas y tratamientos diferentes. Tabla comparativa completa, la realidad de la comorbilidad y por qué el diagnóstico diferencial cambia todo.',
    readTime: '9 min',
    img: '/blog/f8f7fc-tdah-vs-ansiedad-600x340.svg',
  },
  {
    rank: 10,
    slug: '/blog/burnout-o-tdah-diferencias',
    category: 'TDAH Adultos',
    filterCategory: 'TDAH Adultos' as FilterCategory,
    icon: Brain,
    title: 'Burnout vs. TDAH: ¿por qué te sientes así y qué puedes hacer?',
    excerpt: 'Los síntomas se parecen pero el origen es diferente. La diferencia clave: en el burnout hubo un antes en que funcionabas bien. En el TDAH, siempre fue así — aunque no lo supieras.',
    readTime: '9 min',
    img: '/blog/5b4e7f-burnout-vs-tdah-600x340.svg',
  },
  {
    rank: 11,
    slug: '/blog/donde-evaluar-tdah-cancun',
    category: 'Guía local · Cancún',
    filterCategory: 'Diagnóstico' as FilterCategory,
    icon: Eye,
    title: 'Dónde evaluar TDAH en Cancún: qué buscar (y qué evitar)',
    excerpt: 'Ya decidiste que quieres una evaluación. ¿Cómo elegir bien? Los 5 criterios de una evaluación confiable, las señales de alerta y cómo es el proceso en Cancún.',
    readTime: '7 min',
    img: '/blog/dark-cancun-600x340.svg',
  },
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function BlogIndex() {
  const [activeFilter, setActiveFilter] = useState<'Todos' | FilterCategory>('Todos');

  const featured = posts[0];
  const rest = posts.slice(1);

  const showFeatured = activeFilter === 'Todos' || featured.filterCategory === activeFilter;
  const filteredRest = activeFilter === 'Todos' ? rest : rest.filter((p) => p.filterCategory === activeFilter);
  const isEmpty = !showFeatured && filteredRest.length === 0;

  return (
    <>
      <Head>
        <title>Blog sobre TDAH y Autismo en Cancún | Karen Trujillo</title>
        <meta
          name="description"
          content={`Artículos clínicos sobre TDAH en niños, adultos y niñas, autismo y evaluación neuropsicológica en Cancún. Escritos por la Psic. Karen Trujillo, cédula ${CEDULA}.`}
        />
        <meta property="og:title" content="Blog sobre TDAH y Autismo en Cancún | Karen Trujillo" />
        <meta
          property="og:description"
          content="Guías y artículos basados en evidencia sobre TDAH en niños y adultos, TDAH en niñas y diagnóstico de autismo con ADOS-2 en Cancún."
        />
        <meta property="og:image" content={KAREN_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={KAREN_IMAGE} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
      </Head>

      <Navbar />

      <main className="antialiased min-h-screen bg-background overflow-x-hidden">

        {/* ── Page header + filtros ────────────────────────────── */}
        <section className="relative pt-28 pb-12 px-6 bg-plum-deep overflow-hidden" aria-labelledby="blog-heading">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[0.625rem] font-bold tracking-[0.12em] uppercase text-accent-blue/80 mb-3"
            >
              Blog · Neuropsicología
            </motion.p>
            <motion.h1
              id="blog-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-4 max-w-xl"
            >
              Recursos sobre TDAH y Autismo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm md:text-base text-white/80 max-w-lg leading-relaxed mb-10"
            >
              Información clínica, consejos para padres y guías para navegar el proceso de diagnóstico.
              Escrito por la Neuropsicóloga Karen Trujillo.
            </motion.p>

            <div
              role="group"
              aria-label="Filtrar artículos por categoría"
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2 ${
                    activeFilter === filter
                      ? 'bg-white text-primary border-white'
                      : 'bg-transparent text-white/85 border-white/30 hover:bg-white/10 hover:border-white/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contenido + sidebar ──────────────────────────────── */}
        <div className="px-6 py-12 max-w-6xl mx-auto lg:flex lg:items-start lg:gap-12">

          <div className="flex-1 min-w-0">

            {/* Featured post */}
            {showFeatured && (
              <motion.section
                key={featured.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
                aria-label="Artículo destacado"
              >
                <Link href={featured.slug} className="group block">
                  <article className="relative rounded-2xl bg-card border border-border/60 overflow-hidden flex flex-col lg:flex-row hover:border-primary/30 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(56,47,81,0.12)]">
                    <div className="lg:w-2/5 shrink-0">
                      <img
                        src={featured.img}
                        alt={`Ilustración del artículo: ${featured.title}`}
                        className="w-full h-full object-cover aspect-video lg:aspect-auto"
                        loading="eager"
                      />
                    </div>
                    <div className="flex-1 p-7 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-5 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.625rem] font-bold uppercase tracking-[0.08em] ${BADGE_BY_FILTER[featured.filterCategory]}`}>
                          <featured.icon className="w-3 h-3" aria-hidden="true" />
                          {featured.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {featured.readTime} lectura
                        </span>
                        <span className="ml-auto text-[0.625rem] font-bold tracking-[0.1em] text-primary/30 uppercase">
                          Artículo destacado
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary leading-tight mb-4 group-hover:text-primary/80 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-7 max-w-xl">
                        {featured.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold w-fit group-hover:gap-3 transition-all duration-200">
                        Leer artículo <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.section>
            )}

            {/* Grid de artículos */}
            {!isEmpty ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredRest.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={fadeUp}
                  >
                    <Link href={post.slug} className="group block h-full">
                      <article className="relative h-full rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-md flex flex-col">
                        {post.popular && (
                          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-primary text-primary-foreground text-[0.625rem] font-bold uppercase tracking-[0.06em] px-3 py-1 rounded-full">
                            <span aria-hidden="true">🔥</span> Más leído
                          </span>
                        )}
                        <img
                          src={post.img}
                          alt={`Ilustración del artículo: ${post.title}`}
                          className="w-full aspect-video object-cover"
                          loading="lazy"
                        />
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.625rem] font-bold uppercase tracking-[0.06em] ${BADGE_BY_FILTER[post.filterCategory]}`}>
                              <post.icon className="w-3 h-3" aria-hidden="true" />
                              {post.category}
                            </span>
                            <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" aria-hidden="true" /> {post.readTime}
                            </span>
                          </div>

                          <h3 className="text-lg font-serif font-bold text-primary leading-snug mb-3 group-hover:text-primary/80 transition-colors flex-1">
                            {post.title}
                          </h3>

                          <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-end mt-auto">
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
                              Leer artículo <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div role="status" aria-live="polite" className="py-16 text-center">
                <p className="font-serif text-xl text-primary mb-2">No hay artículos en esta categoría todavía.</p>
                <button
                  type="button"
                  onClick={() => setActiveFilter('Todos')}
                  className="text-sm font-semibold text-primary/70 underline underline-offset-4 hover:text-primary"
                >
                  Ver todos los artículos
                </button>
              </div>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="mt-12 lg:mt-0 lg:w-72 lg:shrink-0 lg:sticky lg:top-24 space-y-4" aria-label="Acciones rápidas y servicios">

            <div className="bg-card border border-border/60 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-primary mb-3">¿Listo para agendar?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Habla directamente con Karen por WhatsApp. Responde dudas sobre el proceso y agenda la fecha que mejor te funcione.
              </p>
              <a
                href={waUrl('Hola Karen, leí tu blog y me gustaría agendar una valoración')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:opacity-90 text-primary-foreground py-3 rounded-full text-sm font-bold transition-opacity"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" /> Escribir por WhatsApp
              </a>
            </div>

            <div className="bg-card border border-border/60 rounded-2xl p-6">
              <h2 className="font-serif font-bold text-primary mb-3">Servicios disponibles</h2>
              <nav aria-label="Servicios de evaluación neuropsicológica" className="flex flex-col">
                {[
                  { href: '/evaluacion-tdah-ninos', label: 'Evaluación TDAH Niños' },
                  { href: '/evaluacion-tdah-adultos', label: 'Evaluación TDAH Adultos' },
                  { href: '/evaluacion-autismo-cancun', label: 'Evaluación Autismo (TEA)' },
                ].map((service, i) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className={`flex items-center gap-2 py-3 text-sm font-semibold text-primary hover:text-primary/70 transition-colors ${i > 0 ? 'border-t border-border' : ''}`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                    {service.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="bg-gradient-to-br from-primary to-plum-deep rounded-2xl p-6">
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.1em] text-white/70 mb-2">
                Cédula Profesional
              </p>
              <p className="font-serif text-lg text-white mb-2">{CEDULA}</p>
              <p className="text-xs text-white/80 leading-relaxed">
                Neuropsicología clínica · ADOS-2, WISC-V, CAARS-2, CONNERS-3, BRIEF-2, CPT-3
              </p>
            </div>

          </aside>
        </div>

        {/* ── CTA final ─────────────────────────────────────────── */}
        <section className="bg-plum-deep py-16 px-6 text-center">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              ¿Tienes dudas sobre el diagnóstico de tu hijo?
            </h2>
            <p className="text-white/80 leading-relaxed mb-8">
              Habla con Karen por WhatsApp y obtén orientación inicial sin costo.
            </p>
            <a
              href={waUrl('Hola Karen, leí tu blog y tengo dudas sobre un diagnóstico')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-whatsapp hover:opacity-90 text-primary-foreground px-8 py-4 rounded-full text-sm font-bold transition-opacity"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" /> Escribir por WhatsApp
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}
