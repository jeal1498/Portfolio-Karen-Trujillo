import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Brain, AlertCircle, CheckCircle2, Heart, Eye, ChevronDown, Facebook, Link2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

const CANONICAL_URL = `${SITE_URL}/blog/tdah-en-ninas-sintomas`;
const ARTICLE_HEADLINE = 'TDAH en niñas: síntomas que casi nadie detecta';

const diferencias = [
  { aspecto: 'Presentación predominante', ninos: 'Hiperactivo-impulsivo: se mueve, interrumpe, no puede esperar', ninas: 'Inatento: "está en las nubes", dispersa, se distrae en silencio' },
  { aspecto: 'Visibilidad en el aula', ninos: 'Alta — el maestro lo nota porque genera disrupción', ninas: 'Baja — es "tranquila pero despistada", no molesta' },
  { aspecto: 'Mecanismo de compensación', ninos: 'Raramente compensa; las dificultades son visibles', ninas: 'Compensa con esfuerzo extra, perfeccionismo o ayuda de otros' },
  { aspecto: 'Impacto emocional', ninos: 'Más externalizado: frustración, impulsividad, enojo', ninas: 'Más internalizado: ansiedad, baja autoestima, culpa crónica' },
  { aspecto: 'Edad promedio de diagnóstico', ninos: '7-8 años', ninas: '12-16 años (o nunca, si no se diagnostica en infancia)' },
];

const senalesNinas = [
  {
    categoria: 'En el ámbito escolar',
    color: 'bg-accent-blue/10 border-accent-blue/30',
    items: [
      'Sus calificaciones son irregulares — buenas en materias que le gustan, bajas en las que no',
      'Tarda el doble que sus compañeras en terminar tareas o exámenes',
      'Olvida entregar trabajos que sí hizo; pierde materiales o cuadernos',
      'Tiene dificultad para organizar su mochila, agenda o espacio de trabajo',
      'Lee pero no retiene lo que acaba de leer',
      'Le cuesta seguir instrucciones de varios pasos sin que alguien se las repita',
    ],
  },
  {
    categoria: 'En el ámbito emocional y social',
    color: 'bg-accent-pink/10 border-accent-pink/30',
    items: [
      'Es hipersensible a la crítica — una corrección menor puede hacerla llorar desproporcionadamente',
      'Se siente "tonta" aunque los adultos le digan que es inteligente',
      'Le cuesta regular emociones: pasa del entusiasmo al desánimo muy rápido',
      'Tiene pocas amigas cercanas — las relaciones sociales le resultan agotadoras',
      'En conversaciones grupales "pierde el hilo"',
      'Se esfuerza mucho para encajar; imita a otras niñas para saber cómo comportarse',
    ],
  },
  {
    categoria: 'En casa y en la vida cotidiana',
    color: 'bg-accent-sand/30 border-accent-sand',
    items: [
      'Su cuarto o escritorio siempre están desorganizados a pesar de que "lo ordenó"',
      'Empieza muchas actividades y no termina ninguna',
      'Se le olvidan compromisos, tareas del hogar o recados aunque los anotó',
      'Se distrae viendo su propia mente — "se va" a mitad de una conversación',
      'Retrasa sistemáticamente lo que no le gusta (procrastinación crónica)',
      'Al llegar a casa de la escuela está agotada — más de lo que parecería normal',
    ],
  },
];

const consecuencias = [
  { icon: Brain, titulo: 'Diagnóstico incorrecto', desc: 'Muchas niñas con TDAH son diagnosticadas primero con ansiedad, depresión o "problemas emocionales". Reciben tratamiento para el síntoma, no para la causa.' },
  { icon: Heart, titulo: 'Daño a la autoestima', desc: 'Años de esforzarse el doble sin entender por qué les cuesta más construyen una narrativa de "soy menos capaz". Esto puede persistir décadas en la adultez.' },
  { icon: Eye, titulo: 'Agotamiento crónico', desc: 'La compensación constante — disimular, esforzarse extra, enmascarar — consume una cantidad enorme de energía cognitiva y emocional todos los días.' },
  { icon: AlertCircle, titulo: 'Dificultades en la adultez', desc: 'Las niñas no diagnosticadas se convierten en mujeres adultas con TDAH sin diagnosticar: problemas de pareja, laborales, académicos y de salud mental acumulados.' },
];

const faqItems = [
  { q: '¿Las niñas también tienen TDAH?', a: 'Sí. El TDAH en niñas es igual de frecuente que en niños, pero se detecta mucho menos porque los síntomas son distintos. Mientras los niños tienden a ser hiperactivos e impulsivos, las niñas suelen presentar inatención sin hiperactividad visible.' },
  { q: '¿Por qué se diagnostica tan tarde el TDAH en niñas?', a: 'Porque la presentación predominante en niñas — inatención sin hiperactividad motora — no genera disrupción en el aula. Los sistemas de detección se diseñaron observando niños, no niñas. Además, las niñas tienden a compensar mejor con esfuerzo, perfeccionismo o imitación social.' },
  { q: '¿Qué diferencia hay entre TDAH en niñas y TDAH en niños?', a: 'La diferencia principal está en la presentación. Los niños tienden al tipo hiperactivo-impulsivo. Las niñas tienden al tipo inatento: dispersa, despistada, "en las nubes". El impacto emocional también difiere: las niñas internalizan más, desarrollan ansiedad, baja autoestima y agotamiento por compensación constante.' },
  { q: '¿A partir de qué edad se puede diagnosticar TDAH en una niña?', a: 'El diagnóstico formal de TDAH puede hacerse a partir de los 5 años, aunque muchos casos femeninos se detectan más tarde porque las señales son más sutiles.' },
  { q: '¿El TDAH en niñas se cura con el tiempo?', a: 'El TDAH no "se cura", pero sí cambia su expresión con la edad y puede gestionarse muy bien con el tratamiento adecuado. Un diagnóstico temprano con intervención cambia significativamente la trayectoria de vida de una niña con TDAH.' },
  { q: '¿Cómo se evalúa el TDAH en niñas en Cancún?', a: 'La evaluación neuropsicológica de TDAH en niñas en Cancún con la Neuropsicóloga Karen Trujillo utiliza instrumentos estandarizados específicos: CONNERS-3, WISC-V y BRIEF-2. El proceso incluye información de múltiples fuentes — la niña, los padres y los docentes.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${SITE_URL}/blog/tdah-en-ninas-sintomas/#article`,
      headline: 'TDAH en niñas: síntomas que casi nadie detecta',
      description: 'El TDAH femenino es invisible al sistema educativo. No genera disrupción, se enmascara con esfuerzo y durante años se confunde con ansiedad, perfeccionismo o simplemente "ser despistada".',
      image: KAREN_IMAGE,
      datePublished: '2025-06-01',
      dateModified: '2026-06-02',
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
        name: 'TDAH en niñas',
        sameAs: 'https://www.wikidata.org/wiki/Q206811',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: 'TDAH en niñas: síntomas que casi nadie detecta', item: CANONICAL_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function TDAHNinas() {
  const [linkCopied, setLinkCopied] = useState(false);
  return (
    <>
      <Head>
        <title>TDAH en niñas: síntomas que casi nadie detecta</title>
        <meta name="description" content="El TDAH en niñas se diagnostica años más tarde que en niños porque los síntomas son distintos. Inatención sin hiperactividad, hipersensibilidad emocional, agotamiento por compensación. Valoración en Cancún." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="TDAH en niñas: síntomas que casi nadie detecta" />
        <meta property="og:description" content="El TDAH femenino es invisible al sistema: no genera disrupción, se compensa con esfuerzo, se confunde con ansiedad. Señales, consecuencias y cómo evaluar a tu hija en Cancún." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-tdah-en-ninas-1200x675.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — TDAH en niñas" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2025-06-01" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TDAH en niñas: síntomas que casi nadie detecta | Karen Trujillo" />
        <meta name="twitter:description" content="El TDAH femenino se enmascara con esfuerzo y durante años se confunde con ansiedad. Señales y cómo evaluar a tu hija en Cancún." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-tdah-en-ninas-1200x675.svg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div className="antialiased selection:bg-accent-blue selection:text-primary pb-24 lg:pb-0">
        <Navbar />
        <main>
          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden" style={{ background: '#2b1f47' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'rgba(208,208,231,0.7)' }}>
                  <li><Link href="/" className="transition-colors hover:text-white" style={{ color: 'rgba(208,208,231,0.7)' }}>Inicio</Link></li>
                  <li>/</li>
                  <li className="font-medium" style={{ color: '#d0d0e7' }}>TDAH en niñas: síntomas que casi nadie detecta</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: '#f5dfc5', color: '#382f51' }}>
                  TDAH Femenino
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4">
                  TDAH en niñas: síntomas que casi nadie detecta
                </h1>
                <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  El TDAH femenino es invisible al sistema educativo. No genera disrupción, se enmascara con esfuerzo y durante años se confunde con ansiedad, perfeccionismo o simplemente "ser despistada".
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-4" style={{ color: 'rgba(208,208,231,0.75)', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <span style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga · Cédula {CEDULA}</span>
                  <time dateTime="2025-06-01">1 jun 2025</time>
                  <span>Cancún, Quintana Roo</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Imagen destacada (placeholder) ── */}
          <section className="px-6 -mt-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_-15px_rgba(56,47,81,0.25)]">
                  <img
                    src="/blog/dark-tdah-en-ninas-1200x675.svg"
                    alt="TDAH en niñas: síntomas que casi nadie detecta — imagen ilustrativa"
                    width={1200}
                    height={675}
                    className="w-full h-auto aspect-video object-cover"
                    loading="eager"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </motion.div>
            </div>
          </section>

          {/* ── Contenido ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>

                {/* Diferencias */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">TDAH en niños vs. TDAH en niñas</h2>
                <div className="overflow-x-auto rounded-xl border border-border mb-12">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="p-4 text-left font-bold text-primary text-xs uppercase tracking-wider">Aspecto</th>
                        <th className="p-4 text-left font-bold text-accent-blue text-xs uppercase tracking-wider">Niños</th>
                        <th className="p-4 text-left font-bold text-accent-pink text-xs uppercase tracking-wider">Niñas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diferencias.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary'}>
                          <td className="p-4 font-bold text-primary text-xs">{row.aspecto}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.ninos}</td>
                          <td className="p-4 text-foreground text-xs font-medium">{row.ninas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Imagen inline 1 (placeholder) */}
                <div className="mb-12">
                  <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                    <img
                      src="/blog/blush-tdah-femenino-960x540.svg"
                      alt="Niña con TDAH inatento en el ámbito escolar — imagen ilustrativa"
                      width={960}
                      height={540}
                      className="w-full h-auto aspect-video object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
                </div>

                {/* Señales */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Señales de TDAH en niñas por ámbito</h2>
                <div className="space-y-6 mb-12">
                  {senalesNinas.map((grupo) => (
                    <div key={grupo.categoria} className={`p-6 rounded-xl border ${grupo.color}`}>
                      <h3 className="font-bold text-primary mb-4">{grupo.categoria}</h3>
                      <ul className="space-y-2">
                        {grupo.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Consecuencias */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">¿Qué pasa cuando no se diagnostica a tiempo?</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                  {consecuencias.map((c) => (
                    <div key={c.titulo} className="p-5 bg-secondary rounded-xl border border-border">
                      <div className="flex items-center gap-3 mb-3">
                        <c.icon className="w-5 h-5 text-accent-pink shrink-0" />
                        <h3 className="font-bold text-primary text-sm">{c.titulo}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Imagen inline 2 (placeholder) */}
                <div className="mb-12">
                  <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                    <img
                      src="/blog/lavender-diagnostico-a-tiempo-960x540.svg"
                      alt="Evaluación neuropsicológica oportuna para niñas con TDAH — imagen ilustrativa"
                      width={960}
                      height={540}
                      className="w-full h-auto aspect-video object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
                </div>

                {/* FAQ */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Preguntas frecuentes sobre TDAH en niñas</h2>
                <div role="list">
                  {faqItems.map((faq, i) => (
                    <details key={i} role="listitem" className="group transition-all" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(91,78,127,0.15)' : 'none' }}>
                      <summary className="w-full py-5 sm:py-6 font-bold text-primary text-sm sm:text-base cursor-pointer list-none flex justify-between items-center gap-4 text-left">
                        <span>{faq.q}</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <p className="pb-6 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Compartir ── */}
          <section className="py-8 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
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
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Sospechas que tu hija podría tener TDAH?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                Una valoración neuropsicológica formal es la única forma de saberlo con certeza. La Neuropsicóloga Karen Trujillo atiende en Cancún con cédula federal {CEDULA}.
              </p>
              <div className="flex items-center gap-3 justify-center mb-6 text-xs text-primary-foreground/80">
                <img
                  src={KAREN_IMAGE}
                  alt="Neuropsicóloga Karen Trujillo"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover object-top border border-white/20"
                />
                <span>Karen Trujillo · Cédula {CEDULA}</span>
                <span>★ 47+ reseñas · 5.0</span>
              </div>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola%20Karen,%20leí%20tu%20artículo%20sobre%20TDAH%20en%20niñas%20y%20quiero%20información`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg"
              >
                Agendar Valoración <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* ── Relacionados ── */}
          <section className="py-16 px-6 bg-secondary border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-serif font-bold text-primary mb-8 text-center">También puede interesarte</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/evaluacion-tdah-ninos" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-valoracion-tdah-infantil-640x400.svg"
                    alt="Valoración TDAH Infantil en Cancún"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Infantil en Cancún</span>
                    <span className="block text-xs text-muted-foreground mt-1">Niños y niñas de 5 a 17 años</span>
                  </div>
                </Link>
                <Link href="/blog/cuanto-cuesta-valoracion-tdah-cancun" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/sand-costo-de-la-valoracion-640x400.svg"
                    alt="¿Cuánto cuesta una valoración de TDAH en Cancún?"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Blog</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">¿Cuánto cuesta una valoración de TDAH en Cancún?</span>
                    <span className="block text-xs text-muted-foreground mt-1">Precios y qué incluye</span>
                  </div>
                </Link>
                <Link href="/evaluacion-tdah-adultos" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-valoracion-tdah-adultos-640x400.svg"
                    alt="Valoración TDAH Adultos en Cancún"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Adultos en Cancún</span>
                    <span className="block text-xs text-muted-foreground mt-1">Desde 18 años</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
}
