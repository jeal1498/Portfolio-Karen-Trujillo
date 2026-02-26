import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Brain, Users, DollarSign, Eye, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

/* ═══════════════════════════════════════════════════════════════
   DATA — ordenados por relevancia SEO
   ═══════════════════════════════════════════════════════════════ */

const posts = [
  {
    rank: 1,
    slug: '/blog/senales-tdah-ninos',
    category: 'TDAH Infantil',
    icon: Users,
    title: '¿Tu hijo no pone atención? Señales reales de TDAH en niños',
    excerpt: 'Guía para padres que sospechan: cómo diferenciar el comportamiento típico de señales que sí justifican una evaluación neuropsicológica. Por edades, con criterios clínicos reales.',
    readTime: '12 min',
    featured: true,
    accentClass: 'from-accent-blue/20 to-accent-blue/5',
    badgeClass: 'bg-accent-blue/15 text-accent-blue',
    iconBg: 'bg-accent-blue/10',
  },
  {
    rank: 2,
    slug: '/blog/cuanto-cuesta-valoracion-tdah-cancun',
    category: 'Precios y proceso',
    icon: DollarSign,
    title: '¿Cuánto cuesta una valoración de TDAH en Cancún?',
    excerpt: 'Precio real, qué incluye, cuántas sesiones son y por qué cuesta lo que cuesta. Sin letra chica: $7,000 MXN con informe clínico válido ante SEP e IMSS.',
    readTime: '7 min',
    featured: false,
    accentClass: 'from-accent-green/20 to-accent-green/5',
    badgeClass: 'bg-accent-green/15 text-accent-green',
    iconBg: 'bg-accent-green/10',
  },
  {
    rank: 3,
    slug: '/blog/tdah-adultos-diagnostico-tardio',
    category: 'TDAH Adultos',
    icon: Brain,
    title: 'TDAH en adultos: por qué miles llegan al diagnóstico después de los 30',
    excerpt: 'Te compensaste con inteligencia, te diagnosticaron ansiedad, o simplemente nadie lo vio. Las razones por las que el TDAH adulto se detecta tarde y qué hacer al respecto.',
    readTime: '10 min',
    featured: false,
    accentClass: 'from-primary/15 to-primary/5',
    badgeClass: 'bg-primary/10 text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    rank: 4,
    slug: '/blog/tdah-en-ninas-sintomas',
    category: 'TDAH en Niñas',
    icon: Sparkles,
    title: 'TDAH en niñas: los síntomas que casi nadie detecta',
    excerpt: 'Sin hiperactividad, sin disrupción, con notas aceptables. El TDAH femenino es invisible al sistema porque se compensa con esfuerzo hasta que el cuerpo no puede más.',
    readTime: '9 min',
    featured: false,
    accentClass: 'from-accent-pink/20 to-accent-pink/5',
    badgeClass: 'bg-accent-pink/15 text-accent-pink',
    iconBg: 'bg-accent-pink/10',
  },
  {
    rank: 5,
    slug: '/blog/que-es-ados-2-autismo',
    category: 'Autismo / TEA',
    icon: Eye,
    title: '¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?',
    excerpt: 'El instrumento más confiable del mundo para evaluar TEA explicado sin jerga. Qué mide, cómo se aplica, sus 4 módulos y por qué supera cualquier cuestionario.',
    readTime: '11 min',
    featured: false,
    accentClass: 'from-accent-sand/30 to-accent-sand/10',
    badgeClass: 'bg-accent-sand/30 text-primary',
    iconBg: 'bg-accent-sand/20',
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
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function BlogIndex() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Head>
        <title>Blog | Neuropsicóloga Karen Trujillo — TDAH y Autismo en Cancún</title>
        <meta
          name="description"
          content="Artículos clínicos sobre TDAH en niños, adultos y niñas, autismo y evaluación neuropsicológica en Cancún. Escritos por la Psic. Karen Trujillo, cédula 11009616."
        />
        <meta property="og:title" content="Blog sobre TDAH y Autismo | Karen Trujillo Neuropsicóloga" />
        <meta
          property="og:description"
          content="Guías y artículos basados en evidencia sobre TDAH en niños y adultos, TDAH en niñas y diagnóstico de autismo con ADOS-2 en Cancún."
        />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/blog" />
      </Head>

      <Navbar />

      <main className="antialiased min-h-screen bg-background overflow-x-hidden">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 px-6 overflow-hidden">
          {/* Blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/15 rounded-full blur-[130px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/15 rounded-full blur-[110px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4"
            >
              Neuropsicología clínica · Cancún
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight mb-5"
            >
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              Artículos basados en evidencia sobre TDAH, autismo y evaluación neuropsicológica.
              Sin alarmismo, sin letra chica.
            </motion.p>
          </div>
        </section>

        {/* ── Featured post ────────────────────────────────────── */}
        <section className="px-6 pb-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <Link href={featured.slug} className="group block">
              <div className={`relative rounded-3xl bg-gradient-to-br ${featured.accentClass} border border-border/60 p-8 md:p-12 hover:border-accent-blue/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/10`}>

                {/* Top row */}
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${featured.badgeClass}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime} lectura
                  </span>
                  <span className="ml-auto text-xs font-bold tracking-widest text-primary/30 uppercase">
                    Artículo destacado
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row md:items-end gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary leading-tight mb-4 group-hover:text-primary/80 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-2xl">
                      {featured.excerpt}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      Leer artículo <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Icon decoration */}
                <div className={`absolute top-8 right-8 md:top-10 md:right-12 w-16 h-16 rounded-2xl ${featured.iconBg} flex items-center justify-center opacity-60`}>
                  <featured.icon className="w-7 h-7 text-accent-blue" />
                </div>
              </div>
            </Link>
          </motion.div>
        </section>

        {/* ── Rest of posts ─────────────────────────────────────── */}
        <section className="px-6 pb-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
              >
                <Link href={post.slug} className="group block h-full">
                  <article className={`relative h-full rounded-2xl bg-gradient-to-br ${post.accentClass} border border-border/50 p-7 hover:border-primary/20 transition-all duration-300 hover:shadow-md flex flex-col`}>

                    {/* Icon + category */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl ${post.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <post.icon className="w-5 h-5 text-primary/70" />
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.badgeClass}`}>
                        {post.category}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg md:text-xl font-serif font-bold text-primary leading-snug mb-3 group-hover:text-primary/80 transition-colors flex-1">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs font-bold tracking-widest text-primary/30 uppercase">
                        #{post.rank}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
                        Leer <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}
