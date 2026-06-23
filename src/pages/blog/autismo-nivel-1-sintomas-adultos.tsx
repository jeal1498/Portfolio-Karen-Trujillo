import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Brain, AlertTriangle, CheckCircle2, HelpCircle, ChevronDown, Facebook, Link2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

const WA = `https://wa.me/${WA_NUMBER}?text=Hola%20Karen%2C%20le%C3%AD%20tu%20art%C3%ADculo%20sobre%20autismo%20nivel%201%20y%20quisiera%20informaci%C3%B3n%20sobre%20la%20evaluaci%C3%B3n`;

const sintomasCotidianos = [
  {
    senal: 'Las conversaciones sociales requieren un esfuerzo consciente enorme',
    ejemplo: 'Mientras los demás parecen navegar las interacciones sociales de forma intuitiva, tú procesas activamente cada señal: qué decir ahora, cómo decirlo, qué está queriendo decir la otra persona realmente. Es agotador.',
  },
  {
    senal: 'Te sientes actuando un papel en situaciones sociales',
    ejemplo: 'Has aprendido a imitar comportamientos sociales observando a otros. Sabes cómo comportarte, pero no se siente natural. Al final del día, estás exhausto de mantener el personaje.',
  },
  {
    senal: 'Tienes intereses muy intensos y específicos que te consumen',
    ejemplo: 'No es solo "te gusta" algo — es que puedes hablar horas del tema, investigas todo sobre ello, y cuando estás en ese mundo te sientes más tú mismo que en cualquier otra situación.',
  },
  {
    senal: 'Los cambios imprevistos te generan una angustia desproporcionada',
    ejemplo: 'Un plan que cambia de último momento, una ruta diferente, una rutina interrumpida — lo que para otros es un pequeño inconveniente, para ti puede arruinar todo el día.',
  },
  {
    senal: 'Procesas la información sensorial de forma diferente',
    ejemplo: 'Las luces fluorescentes te molestan más que a otros. El ruido de fondo de una cafetería te impide concentrarte. Ciertas texturas de ropa son insoportables. No es exageración — es tu sistema nervioso procesando diferente.',
  },
  {
    senal: 'Siempre has sentido que "no encajas" aunque no sabes por qué',
    ejemplo: 'No es que no quieras conectar — es que las reglas no escritas de las relaciones sociales te son opacas. Llevas años preguntándote qué es lo que los demás saben que tú no.',
  },
];

const mitos = [
  {
    mito: '"Las personas con autismo no tienen empatía"',
    realidad: 'Las personas con TEA nivel 1 frecuentemente tienen una empatía profunda — pero la procesan de forma diferente. Lo que falta no es la capacidad de sentir lo que otro siente, sino la capacidad de leer las señales sociales implícitas que otros usan para comunicar sus emociones.',
  },
  {
    mito: '"Si funcionas bien, no puede ser autismo"',
    realidad: 'El "alto funcionamiento" no significa ausencia de dificultades — significa que las dificultades están parcialmente enmascaradas. El enmascaramiento (masking) tiene un costo enorme en energía y salud mental. Muchos adultos con TEA nivel 1 funcionan bien externamente y están agotados internamente.',
  },
  {
    mito: '"El autismo se nota desde pequeño, si no te diagnosticaron antes no lo tienes"',
    realidad: 'El diagnóstico tardío de TEA nivel 1 en adultos es cada vez más frecuente. Las personas que desarrollaron estrategias de compensación efectivas, especialmente mujeres, pueden llegar a la adultez sin diagnóstico. El sistema no estaba diseñado para detectarlos.',
  },
  {
    mito: '"Asperger y autismo nivel 1 son cosas distintas"',
    realidad: 'Con el DSM-5 (2013), el síndrome de Asperger dejó de ser una categoría separada y se integró dentro del Trastorno del Espectro Autista, nivel 1. Mismo perfil, nueva nomenclatura. Si te diagnosticaron Asperger antes de 2013, hoy ese diagnóstico se traduce como TEA nivel 1.',
  },
];

const diferenciasTDAH = [
  {
    aspecto: 'Origen de las dificultades sociales',
    tea: 'Dificultad para leer señales sociales implícitas y comunicación no verbal',
    tdah: 'Impulsividad que interrumpe, distracción que da la impresión de no escuchar',
  },
  {
    aspecto: 'Intereses',
    tea: 'Intereses muy específicos e intensos, a veces inusuales',
    tdah: 'Dificultad para sostener el interés en cualquier cosa que no sea inmediatamente gratificante',
  },
  {
    aspecto: 'Rutinas y cambios',
    tea: 'Necesidad activa de rutina, malestar real ante cambios imprevistos',
    tdah: 'Aburrimiento con la rutina, busca variedad y novedad',
  },
  {
    aspecto: 'Procesamiento sensorial',
    tea: 'Diferencias sensoriales frecuentes (hiper/hiporeactividad)',
    tdah: 'Busca estimulación sensorial (no evitación)',
  },
];

const faqItems = [
  {
    q: '¿Qué es exactamente el autismo nivel 1?',
    a: 'El autismo nivel 1 (antes llamado síndrome de Asperger) es el nivel de menor soporte requerido dentro del Trastorno del Espectro Autista según el DSM-5. Las personas con TEA nivel 1 tienen lenguaje verbal desarrollado, capacidad cognitiva dentro o por encima de lo típico, pero presentan dificultades significativas en la comunicación social, flexibilidad mental y en muchos casos sensibilidades sensoriales. El "nivel 1" no significa "poco autismo" — significa que el nivel de apoyo externo requerido es menor, no que las dificultades sean menores.',
  },
  {
    q: '¿Por qué se diagnostica tarde en adultos?',
    a: 'Principalmente porque el perfil de TEA nivel 1 no coincide con la imagen pública del autismo — no hay discapacidad intelectual, hay lenguaje fluido, y muchas personas desarrollan estrategias de enmascaramiento social muy efectivas. Además, los criterios diagnósticos históricos estaban sesgados hacia el perfil masculino, lo que ha llevado a que muchas mujeres y personas no binarias lleguen al diagnóstico en la adultez.',
  },
  {
    q: '¿Cuál es la diferencia entre TEA nivel 1, TDAH y ansiedad social?',
    a: 'Las tres condiciones pueden compartir síntomas (dificultades sociales, evitación, agotamiento en situaciones grupales) pero tienen mecanismos distintos. En el TEA nivel 1, las dificultades sociales vienen de procesar diferente los códigos sociales implícitos. En el TDAH, las dificultades sociales vienen de la impulsividad y distracción. En la ansiedad social, el problema es el miedo a la evaluación negativa. Pueden coexistir las tres — el diagnóstico diferencial es clave.',
  },
  {
    q: '¿Cómo se diagnostica el autismo nivel 1 en adultos en Cancún?',
    a: 'La neuropsicóloga Karen Trujillo (cédula ' + CEDULA + ') realiza evaluaciones de TEA en Cancún usando el ADOS-2 (el estándar de oro mundial para diagnóstico de autismo), junto con ADI-R, WISC-V o WAIS-IV, Vineland-3 y SRS-2. El proceso dura 3-4 semanas (5-6 sesiones). El informe incluye diagnóstico formal según DSM-5, nivel de apoyo requerido y recomendaciones de intervención con validez oficial ante instituciones.',
  },
  {
    q: '¿Tiene sentido diagnosticarse como adulto?',
    a: 'Sí, y muchos adultos lo describen como transformador. El diagnóstico no cambia quién eres — explica por qué siempre te has sentido diferente. Permite reinterpretar toda una historia de vida ("no era pereza, era TEA"), reduce la autocrítica, y abre acceso a estrategias de apoyo específicas. Para muchos, es la primera vez que algo encaja.',
  },
  {
    q: '¿Cuánto cuesta la evaluación de autismo en Cancún?',
    a: 'La evaluación neuropsicológica completa de TEA en el consultorio de Karen Trujillo en Cancún cuesta $8,500 MXN. Incluye todas las sesiones (5-6 citas), los instrumentos estandarizados (ADOS-2, ADI-R, WISC-V, Vineland-3, SRS-2), el informe clínico completo y la sesión de devolución. El pago se distribuye a lo largo del proceso.',
  },
  {
    q: '¿El autismo nivel 1 tiene tratamiento?',
    a: 'El autismo nivel 1 no se "trata" en el sentido de eliminar — es una forma de funcionamiento neurológico diferente, no una enfermedad. Lo que se trabaja es la calidad de vida: terapias para el procesamiento sensorial, estrategias de comunicación social, apoyo para el manejo del estrés y la rigidez cognitiva. El diagnóstico es el punto de partida para encontrar las estrategias que sí funcionan para ese perfil específico.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${SITE_URL}/blog/autismo-nivel-1-sintomas-adultos/#article`,
      headline: 'Autismo nivel 1: cuando no pareces autista pero lo eres',
      description: 'El autismo nivel 1 (antes Asperger) en adultos tiene síntomas distintos al autismo clásico. Sin diagnóstico previo, muchos adultos llevan años sintiéndose diferentes sin saber por qué. Evaluación en Cancún.',
      image: KAREN_IMAGE,
      datePublished: '2026-06-02',
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
      mainEntityOfPage: `${SITE_URL}/blog/autismo-nivel-1-sintomas-adultos`,
      inLanguage: 'es-MX',
      about: {
        '@type': 'MedicalCondition',
        name: 'Trastorno del espectro autista nivel 1',
        sameAs: 'https://www.wikidata.org/wiki/Q38404',
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#sintomas-cotidianos', '#por-que-tarde', '#diferencias-tdah'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Autismo nivel 1: síntomas en adultos', item: `${SITE_URL}/blog/autismo-nivel-1-sintomas-adultos` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

const CANONICAL_URL = `${SITE_URL}/blog/autismo-nivel-1-sintomas-adultos`;
const HEADLINE = 'Autismo nivel 1: cuando no pareces autista pero lo eres';

export default function AutismoNivel1SintomasAdultos() {
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <>
      <Head>
        <title>Autismo Nivel 1 en adultos: síntomas y diagnóstico tardío</title>
        <meta name="description" content="El autismo nivel 1 (antes Asperger) en adultos tiene síntomas distintos al autismo clásico. Sin diagnóstico previo, muchos adultos llevan años sintiéndose diferentes sin saber por qué. Evaluación en Cancún." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Autismo Nivel 1 en adultos: síntomas y diagnóstico tardío" />
        <meta property="og:description" content="No hay discapacidad intelectual. Hay lenguaje fluido. Hay personas que funcionan — y se agotan en el intento. El TEA nivel 1 es el perfil que más tarda en diagnosticarse." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-autismo-nivel-1-en-adultos-1200x675.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — autismo nivel 1 adultos diagnóstico" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-06-02" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Autismo Nivel 1 en adultos: síntomas y diagnóstico tardío | Karen Trujillo" />
        <meta name="twitter:description" content="El TEA nivel 1 (antes Asperger) es el perfil autista que más tarda en diagnosticarse. Señales en adultos y cómo evaluarlo en Cancún." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-autismo-nivel-1-en-adultos-1200x675.svg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />
        <main>

          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden" style={{ background: '#2b1f47' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'rgba(208,208,231,0.7)' }}>
                  <li><Link href="/" className="hover:text-[#d0d0e7] transition-colors">Inicio</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-[#d0d0e7] transition-colors">Blog</Link></li>
                  <li>/</li>
                  <li className="font-medium" style={{ color: '#d0d0e7' }}>Autismo nivel 1</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-widest text-white" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  Autismo / TEA — Diagnóstico tardío
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4">
                  Autismo nivel 1: cuando no pareces autista pero lo eres
                </h1>
                <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  No hay discapacidad intelectual. Hay lenguaje fluido. Hay personas que funcionan — y se agotan en el intento. El TEA nivel 1 es el perfil que más tarda en diagnosticarse.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-4" style={{ color: 'rgba(208,208,231,0.75)', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga · Cédula {CEDULA}</span>
                  <time dateTime="2026-06-02">2 jun 2026</time>
                  <span>Cancún, Quintana Roo</span>
                  <span>10 min de lectura</span>
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
                    src="/blog/dark-autismo-nivel-1-en-adultos-1200x675.svg"
                    alt="Autismo nivel 1: cuando no pareces autista pero lo eres — imagen ilustrativa"
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

          {/* ── Síntomas cotidianos ── */}
          <section id="sintomas-cotidianos" className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">¿Cómo se ve el TEA nivel 1 en la vida real?</h2>
                <p className="text-muted-foreground font-light mb-8">
                  No es la imagen del autismo que muestran las películas. Es esto:
                </p>
                <div className="space-y-4">
                  {sintomasCotidianos.map((item, i) => (
                    <div key={i} className="bg-secondary border border-border rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <Brain className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-primary text-sm mb-1">{item.senal}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.ejemplo}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Qué significa nivel 1 ── */}
          <section className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Por qué se llama nivel 1? ¿Qué significa?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  Con la publicación del DSM-5 en 2013, el sistema diagnóstico del autismo cambió. Dejaron de existir categorías separadas como síndrome de Asperger o TGD-NE. Todo quedó unificado bajo el Trastorno del Espectro Autista (TEA), dividido en tres niveles según el grado de apoyo que necesita la persona — no según cuánto autismo &quot;tiene&quot;.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  El nivel 1 es el que requiere menos apoyo externo. Eso significa que la persona puede desenvolverse de forma autónoma en la mayoría de contextos — trabajo, relaciones, vida diaria. No significa que no sufra, ni que sus dificultades sean menores. Significa que sus estrategias de compensación son suficientemente efectivas para funcionar, aunque a un costo invisible para el exterior.
                </p>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">
                      <strong>Nivel 1 no significa poco autismo — significa que el apoyo requerido es diferente.</strong> Muchas personas con TEA nivel 1 pasan décadas sin diagnóstico precisamente porque el sistema no diseñó herramientas para detectarlos.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Imagen inline 1 (placeholder) ── */}
          <section className="py-12 px-6 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                  <img
                    src="/blog/sand-enmascaramiento-social-960x540.svg"
                    alt="Adulto con TEA nivel 1 procesando interacciones sociales — imagen ilustrativa"
                    width={960}
                    height={540}
                    className="w-full h-auto aspect-video object-cover"
                    loading="lazy"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </motion.div>
            </div>
          </section>

          {/* ── Por qué llega tarde ── */}
          <section id="por-que-tarde" className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Por qué el diagnóstico llega tan tarde?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  La mayoría de los adultos que llegan a un diagnóstico de TEA nivel 1 han pasado años — a veces décadas — buscando respuestas a por qué siempre se han sentido diferentes. Estas son las razones más frecuentes por las que el diagnóstico se retrasa:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-secondary border border-border rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed"><strong>Enmascaramiento social efectivo.</strong> Desde pequeños, aprenden a observar e imitar comportamientos sociales. Con los años, el enmascaramiento se vuelve tan automático que ni ellos mismos reconocen que lo hacen.</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary border border-border rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed"><strong>El perfil no encaja con la imagen pública del autismo.</strong> Hablan bien, tienen amigos, se gradúan, trabajan. La imagen que la mayoría tiene del autismo no incluye este perfil — y esa discrepancia lleva a que nadie lo considere.</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary border border-border rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed"><strong>Sesgo hacia el perfil masculino en el diagnóstico histórico.</strong> Los criterios diagnósticos originales se desarrollaron principalmente estudiando niños varones. Las mujeres y personas no binarias con TEA presentan un perfil diferente y con frecuencia más enmascarado — y los instrumentos no estaban calibrados para detectarlas.</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary border border-border rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed"><strong>Las señales se atribuyen a personalidad introvertida o ansiedad.</strong> &quot;Es muy reservado&quot;, &quot;tiene ansiedad social&quot;, &quot;es perfeccionista&quot;, &quot;es sensible&quot; — estas etiquetas acompañan a muchos adultos con TEA nivel 1 no diagnosticado durante años, desviando la atención del diagnóstico correcto.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Mitos ── */}
          <section className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-8">Lo que no es cierto sobre el autismo nivel 1</h2>
                <div className="space-y-5">
                  {mitos.map((item, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <p className="text-sm font-bold text-rose-500 mb-2 italic">{item.mito}</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.realidad}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Imagen inline 2 (placeholder) ── */}
          <section className="py-12 px-6 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                  <img
                    src="/blog/lavender-evaluacion-de-tea-con-ados-2-960x540.svg"
                    alt="Sesión de evaluación de TEA nivel 1 en adultos — imagen ilustrativa"
                    width={960}
                    height={540}
                    className="w-full h-auto aspect-video object-cover"
                    loading="lazy"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </motion.div>
            </div>
          </section>

          {/* ── Diferencias TEA vs TDAH ── */}
          <section id="diferencias-tdah" className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">TEA nivel 1 vs. TDAH: diferencias que importan</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Ambas condiciones pueden parecerse superficialmente, pero tienen mecanismos distintos — y el diagnóstico diferencial cambia completamente el abordaje terapéutico.
                </p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary border-b border-border">
                        <th className="text-left p-4 font-bold text-primary text-xs uppercase tracking-widest">Aspecto</th>
                        <th className="text-left p-4 font-bold text-accent-blue text-xs uppercase tracking-widest">TEA Nivel 1</th>
                        <th className="text-left p-4 font-bold text-primary text-xs uppercase tracking-widest">TDAH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diferenciasTDAH.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary'}>
                          <td className="p-4 font-bold text-primary text-xs align-top">{row.aspecto}</td>
                          <td className="p-4 text-muted-foreground font-light leading-relaxed text-xs align-top">{row.tea}</td>
                          <td className="p-4 text-muted-foreground font-light leading-relaxed text-xs align-top">{row.tdah}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-secondary border border-border rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <Brain className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      <strong>Importante:</strong> el TEA y el TDAH pueden coexistir en la misma persona. Una evaluación neuropsicológica completa es la única forma de distinguir qué es qué y evitar tratamientos inadecuados.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-accent-blue" />
                Preguntas frecuentes
              </h2>
              <div role="list">
                {faqItems.map((faq, i) => (
                  <details key={i} className="group" role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(91,78,127,0.15)' : 'none' }}>
                    <summary className="w-full py-5 sm:py-6 font-bold text-primary text-sm sm:text-base cursor-pointer list-none flex justify-between items-center gap-4 text-left">
                      <span>{faq.q}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="pb-5 sm:pb-6 text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
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
                  href={`https://wa.me/?text=${encodeURIComponent(`${HEADLINE} — ${CANONICAL_URL}`)}`}
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
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Crees que puede ser TEA nivel 1?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                Si llevas años sintiéndote diferente sin saber por qué, una evaluación neuropsicológica puede darte por fin una respuesta. Karen Trujillo realiza evaluaciones de TEA en Cancún con el ADOS-2, el estándar de oro mundial, y cédula federal {CEDULA}.
              </p>
              <div className="flex items-center justify-center gap-3 mb-6 text-xs text-primary-foreground/80">
                <img
                  src={KAREN_IMAGE}
                  alt="Neuropsicóloga Karen Trujillo"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover object-top"
                  loading="lazy"
                />
                <span>Karen Trujillo · Cédula {CEDULA}</span>
                <span>★ 47+ reseñas · 5.0</span>
              </div>
              <div className="flex justify-center">
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:opacity-90 transition-all">
                  Solicitar información sobre la evaluación <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* ── Relacionados ── */}
          <section className="py-16 px-6 bg-secondary border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-serif font-bold text-primary mb-8 text-center">También puede interesarte</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/evaluacion-autismo-cancun" className="bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/blush-servicio-640x400.svg"
                    alt="Evaluación de Autismo en Cancún"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Evaluación de Autismo en Cancún</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">ADOS-2 · Diagnóstico formal DSM-5 · $8,500 MXN</span>
                  </div>
                </Link>
                <Link href="/blog/que-es-ados-2-autismo" className="bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/blush-articulo-640x400.svg"
                    alt="¿Qué es el ADOS-2 y por qué importa?"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">¿Qué es el ADOS-2 y por qué importa?</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">El estándar de oro del diagnóstico de autismo</span>
                  </div>
                </Link>
                <Link href="/blog/tdah-vs-ansiedad-diferencias" className="bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-articulo-640x400.svg"
                    alt="TDAH vs. ansiedad: cómo diferenciarlos"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">TDAH vs. ansiedad: cómo diferenciarlos</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Síntomas que se parecen pero tienen causas distintas</span>
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
