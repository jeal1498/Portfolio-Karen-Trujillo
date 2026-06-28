import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, BookOpen, Brain, AlertCircle, CheckCircle2, ChevronDown, Facebook, Link2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

const CANONICAL_URL = `${SITE_URL}/blog/diferencia-tdah-trastorno-aprendizaje`;
const ARTICLE_HEADLINE = 'TDAH vs. trastorno del aprendizaje: ¿cómo saber cuál es?';

const faqItems = [
  {
    q: '¿Puede mi hijo tener TDAH y dislexia al mismo tiempo?',
    a: 'Sí, y es más frecuente de lo que muchos padres imaginan. Entre el 30 y el 40 % de los niños con TDAH también presentan algún trastorno del aprendizaje — dislexia, disgrafia o discalculia. Cuando coexisten, se habla de comorbilidad. La evaluación neuropsicológica es la única forma de identificar ambos diagnósticos a la vez y diseñar un plan de intervención que atienda las dos dimensiones.',
  },
  {
    q: '¿Cómo sé si el problema de mi hijo es de atención o de lectura?',
    a: 'No se puede saber sin una evaluación. Ambos producen síntomas visibles similares en el aula: no terminar el trabajo, baja comprensión, frustración con las tareas. La diferencia está en el mecanismo: el niño con TDAH puede leer con fluidez cuando está motivado y descansado; el niño con dislexia tiene dificultad para decodificar independientemente del nivel de atención. Distinguirlos requiere pruebas estandarizadas de lectura, atención y funciones ejecutivas.',
  },
  {
    q: '¿Qué tipo de apoyo da la escuela para trastornos del aprendizaje?',
    a: 'Con un informe neuropsicológico con diagnóstico formal, la escuela puede implementar adecuaciones curriculares: tiempo extendido en exámenes, materiales adaptados (audiolibros, textos con mayor interlineado), uso de computadora para escribir, evaluación oral en lugar de escrita, entre otras. La SEP reconoce estos apoyos dentro del marco de educación inclusiva. El informe debe especificar las recomendaciones para que la escuela pueda actuar.',
  },
  {
    q: '¿A qué edad se detecta la dislexia?',
    a: 'Las primeras señales pueden aparecer desde preescolar (dificultad con la conciencia fonológica, aprender el alfabeto, reconocer rimas), pero el diagnóstico formal de dislexia generalmente se realiza a partir de los 7-8 años, cuando el niño lleva al menos uno o dos ciclos escolares de lectura formal. Un diagnóstico más temprano ayuda a intervenir antes de que el niño acumule frustración y baja autoestima ligadas al rendimiento escolar.',
  },
];

const trastornosAprendizaje = [
  {
    nombre: 'Dislexia',
    icon: BookOpen,
    desc: 'Dificultad para decodificar palabras escritas, leer con fluidez y hacer correspondencia letra-sonido. Es el trastorno del aprendizaje más prevalente.',
    senales: ['Confunde letras similares (b/d, p/q)', 'Lee muy despacio aunque el texto sea sencillo', 'Omite o invierte sílabas al leer en voz alta', 'Comprensión lectora baja pese a inteligencia normal'],
  },
  {
    nombre: 'Disgrafia',
    icon: Brain,
    desc: 'Dificultad para producir escritura legible y organizada, que no se explica por falta de práctica ni por un problema motor general.',
    senales: ['Letra ilegible o muy irregular', 'No puede mantener el renglón', 'Tarda mucho más que sus compañeros en escribir', 'Evita tareas escritas y se fatiga rápido'],
  },
  {
    nombre: 'Discalculia',
    icon: AlertCircle,
    desc: 'Dificultad persistente con el sentido del número, las operaciones básicas y la comprensión de conceptos matemáticos.',
    senales: ['No reconoce cantidades de forma intuitiva', 'Confunde signos de operación (+, ×, –)', 'No puede memorizar tablas de multiplicar pese a repetición', 'Dificultad para estimar magnitudes o comparar cantidades'],
  },
];

const comparacionDiagnostica = [
  { aspecto: 'Mecanismo principal', tdah: 'Déficit en la regulación de la atención y el control de impulsos', ta: 'Dificultad específica en un proceso de aprendizaje (leer, escribir o calcular)' },
  { aspecto: 'Lectura con motivación alta', tdah: 'Puede mejorar notablemente', ta: 'La dificultad persiste independientemente del estado emocional' },
  { aspecto: 'Rendimiento en otros contextos', tdah: 'Fluctúa según el nivel de interés o la fatiga', ta: 'La dificultad específica es constante' },
  { aspecto: 'Respuesta a estrategias atencionales', tdah: 'Mejora con ajustes de entorno y estructura', ta: 'Requiere intervención específica en la habilidad afectada' },
  { aspecto: 'Instrumentos de evaluación', tdah: 'CONNERS-3, BRIEF-2, CPT-3, WISC-V', ta: 'PROLEC-R, PROESC, pruebas de velocidad lectora, WISC-V' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${CANONICAL_URL}/#article`,
      headline: ARTICLE_HEADLINE,
      description: 'Un niño con TDAH y uno con dislexia pueden verse igual en el aula: no termina el trabajo, se distrae, rinde por debajo de su potencial. La neuropsicología los distingue con evidencia.',
      image: `${SITE_URL}/blog/dark-tdah-vs-trastorno-aprendizaje-1200x675.svg`,
      datePublished: '2026-08-04',
      dateModified: '2026-08-04',
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
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function DiferenciaTDAHTrastornoAprendizaje() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <>
      <Head>
        <title>TDAH vs. trastorno del aprendizaje: ¿cómo saber cuál es? | Karen Trujillo</title>
        <meta name="description" content="Un niño con TDAH y uno con dislexia pueden verse igual en el aula: no termina el trabajo, se distrae, rinde por debajo de su potencial. La neuropsicología los distingue con evidencia. Karen Trujillo, Cancún." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="TDAH vs. trastorno del aprendizaje: ¿cómo saber cuál es?" />
        <meta property="og:description" content="Un niño con TDAH y uno con dislexia pueden verse igual en el aula: no termina el trabajo, se distrae, rinde por debajo de su potencial. La neuropsicología los distingue con evidencia." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-tdah-vs-trastorno-aprendizaje-1200x675.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — diferencia TDAH y trastorno del aprendizaje" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-08-04" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TDAH vs. trastorno del aprendizaje: ¿cómo saber cuál es? | Karen Trujillo" />
        <meta name="twitter:description" content="TDAH y dislexia producen síntomas similares en el aula. La evaluación neuropsicológica los distingue con instrumentos estandarizados. Karen Trujillo, Cancún." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-tdah-vs-trastorno-aprendizaje-1200x675.svg`} />
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
                  <li><Link href="/" className="hover:text-[#d0d0e7] transition-colors" style={{ color: 'rgba(208,208,231,0.7)' }}>Inicio</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-[#d0d0e7] transition-colors" style={{ color: 'rgba(208,208,231,0.7)' }}>Blog</Link></li>
                  <li>/</li>
                  <li className="font-medium" style={{ color: '#d0d0e7' }}>TDAH vs. trastorno del aprendizaje</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#d0d0e7' }}>
                  Diagnóstico Diferencial
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4">
                  TDAH vs. trastorno del aprendizaje: ¿cómo saber cuál es?
                </h1>
                <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  En el aula, un niño con TDAH y uno con dislexia se ven casi igual. La neuropsicología los distingue — y esa distinción importa porque el tratamiento es diferente.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-4" style={{ color: 'rgba(208,208,231,0.75)', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <span style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga · Cédula {CEDULA}</span>
                  <time dateTime="2026-08-04">4 ago 2026</time>
                  <span>Cancún, Quintana Roo</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Imagen destacada ── */}
          <section className="px-6 -mt-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_-15px_rgba(56,47,81,0.25)]">
                  <img
                    src="/blog/dark-tdah-vs-trastorno-aprendizaje-1200x675.svg"
                    alt="TDAH vs. trastorno del aprendizaje — imagen ilustrativa"
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

          {/* ── Cuerpo del artículo ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>

                {/* Por qué la confusión es tan común */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Por qué la confusión es tan común</h2>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  Imagina dos niños en tercero de primaria. Ninguno termina los ejercicios en clase. Ambos parecen distraídos cuando hay que leer en voz alta. Los dos rinden por debajo de lo que sus maestros esperarían dada su inteligencia. Uno tiene TDAH; el otro tiene dislexia. ¿Cómo saber cuál es cuál?
                </p>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  La respuesta es: sin una evaluación neuropsicológica, no se puede saber. El TDAH y los trastornos del aprendizaje producen síntomas <em>convergentes</em> en el aula — no terminar el trabajo, parecer desconcentrado, tener calificaciones que no reflejan el esfuerzo real. Pero los mecanismos que los producen son distintos, y por eso las intervenciones que funcionan también lo son.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-8">
                  Tratar a un niño con dislexia como si tuviera solo TDAH — con estrategias de atención pero sin intervención lectora — es como ponerle lentes a alguien que tiene un problema de oído. No ayuda, y puede aumentar la frustración.
                </p>

                {/* TDAH: qué es */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">TDAH: qué es y cómo afecta el rendimiento escolar</h2>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  El TDAH (Trastorno por Déficit de Atención e Hiperactividad) es un trastorno del neurodesarrollo que afecta la regulación de la atención, el control de impulsos y, en muchos casos, la actividad motora. Su base está en las funciones ejecutivas: el conjunto de procesos mentales que nos permiten planear, iniciar, sostener y cambiar de tarea.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  Lo que el TDAH <strong className="font-bold text-primary">no es</strong> es una dificultad específica para leer, escribir o calcular. Un niño con TDAH puede leer perfectamente cuando el texto lo motiva, cuando está descansado, o cuando el entorno no presenta distractores. Su problema no está en la decodificación de palabras, sino en mantener la atención el tiempo suficiente para procesar la información de forma consistente.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-8">
                  En el aula, esto se ve como: tareas a medias, errores por descuido que no reflejan lo que el niño sabe, impulsividad al responder antes de terminar de leer la pregunta, y un rendimiento que fluctúa según el nivel de interés o la hora del día.
                </p>

                {/* Trastornos del aprendizaje */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Trastornos específicos del aprendizaje: dislexia, disgrafia y discalculia</h2>
                <p className="text-foreground font-light leading-relaxed mb-6">
                  Los trastornos específicos del aprendizaje son dificultades persistentes en la adquisición de habilidades académicas — lectura, escritura o matemáticas — que no se explican por discapacidad intelectual, problemas visuales o auditivos, ni por falta de oportunidad educativa.
                </p>
                <div className="grid gap-4 mb-8">
                  {trastornosAprendizaje.map((ta) => (
                    <div key={ta.nombre} className="flex gap-4 p-5 bg-secondary rounded-xl border border-border">
                      <ta.icon className="w-5 h-5 text-accent-blue shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-primary text-sm mb-1">{ta.nombre}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed mb-3">{ta.desc}</p>
                        <ul className="space-y-1">
                          {ta.senales.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-xs text-muted-foreground font-light">
                              <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comorbilidad */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Cuando coexisten: TDAH + trastorno del aprendizaje</h2>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  Uno de los hallazgos más importantes de la investigación en neuropsicología del desarrollo es que el TDAH y los trastornos del aprendizaje coexisten con frecuencia. Las estimaciones varían según el estudio, pero se sitúan entre el 30 y el 40 % de los casos: es decir, cerca de uno de cada tres niños con TDAH también tiene dislexia, disgrafia o discalculia.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-8">
                  Cuando hay comorbilidad, los síntomas se potencian mutuamente. Un niño que no puede sostener la atención <em>y</em> tiene dificultad para decodificar palabras va a tener un rendimiento lector muy por debajo de lo esperado — más bajo que si tuviera solo uno de los dos. Por eso la evaluación neuropsicológica no puede detenerse al confirmar el TDAH: hay que continuar explorando las habilidades académicas específicas.
                </p>

                {/* Evaluación diferencial */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Cómo los distingue la evaluación neuropsicológica</h2>
                <p className="text-foreground font-light leading-relaxed mb-6">
                  La evaluación neuropsicológica aplica instrumentos estandarizados que miden diferentes funciones de forma independiente, permitiendo comparar el perfil del niño con el de otros de su misma edad y nivel educativo.
                </p>
                <div className="overflow-x-auto rounded-xl border border-border mb-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="p-4 text-left font-bold text-primary text-xs uppercase tracking-wider">Aspecto</th>
                        <th className="p-4 text-left font-bold text-accent-blue text-xs uppercase tracking-wider">TDAH</th>
                        <th className="p-4 text-left font-bold text-success text-xs uppercase tracking-wider">Trastorno del aprendizaje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparacionDiagnostica.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary'}>
                          <td className="p-4 font-bold text-primary text-xs">{row.aspecto}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.tdah}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.ta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Por qué importa */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Por qué importa el diagnóstico diferencial</h2>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  El diagnóstico diferencial no es un tecnicismo clínico: es la diferencia entre una intervención que funciona y una que no.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  El niño con dislexia necesita intervención específica en lectura — métodos como el Orton-Gillingham u otros basados en conciencia fonológica y decodificación explícita. Las estrategias de manejo de atención (rutinas, recordatorios, trabajo por bloques) ayudan, pero no resuelven la dificultad lectora.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  El niño con TDAH sin trastorno del aprendizaje puede beneficiarse de ajustes en el entorno escolar y, en algunos casos, de medicación, pero no necesita intervención fonológica especializada.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-8">
                  Y el niño con los dos diagnósticos necesita ambas cosas — en paralelo, coordinadas entre el neuropsicólogo, los terapeutas y la escuela.
                </p>

                {/* CTA para para-escuelas */}
                <div className="bg-secondary rounded-2xl border border-border p-6 mb-10">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2">Para orientadores y docentes</p>
                  <p className="text-sm text-foreground font-light leading-relaxed mb-4">
                    Si eres maestro u orientador y tienes dudas sobre un alumno cuyo rendimiento no encaja con el perfil de TDAH, la evaluación neuropsicológica puede darte respuestas concretas para diseñar el apoyo adecuado.
                  </p>
                  <Link
                    href="/para-escuelas"
                    className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                  >
                    Ver información para escuelas <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* FAQ */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Preguntas frecuentes</h2>
                <div role="list" className="mb-10">
                  {faqItems.map((faq, i) => (
                    <div key={i} role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(91,78,127,0.15)' : 'none' }}>
                      <button
                        id={`faq-btn-${i}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                        className="w-full py-5 sm:py-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                        style={{ background: 'none', border: 'none' }}
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <ChevronDown
                          className="w-5 h-5 shrink-0 text-muted-foreground"
                          style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        className="grid transition-all duration-300"
                        style={{
                          gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                          opacity: openFaq === i ? 1 : 0,
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="text-muted-foreground text-sm font-light leading-relaxed pb-5 sm:pb-6">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>
          </section>

          {/* ── Compartir ── */}
          <section className="py-8 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Comparte este artículo</span>
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

          {/* ── CTA principal ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Tu hijo tiene dificultades en la escuela?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                La Neuropsicóloga Karen Trujillo realiza evaluaciones neuropsicológicas completas en Cancún para distinguir TDAH, trastornos del aprendizaje y comorbilidades. Cédula federal {CEDULA}.
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
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/evaluacion-tdah-ninos"
                  className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg"
                >
                  Evaluación TDAH niños <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/para-escuelas"
                  className="inline-flex items-center gap-2 bg-white/10 text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  Información para escuelas <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* ── Artículos relacionados ── */}
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
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Niños de 5 a 17 años</span>
                  </div>
                </Link>
                <Link href="/evaluacion-autismo-cancun" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/blush-diagnostico-autismo-tea-640x400.svg"
                    alt="Diagnóstico Autismo (TEA) en Cancún"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Diagnóstico Autismo (TEA) en Cancún</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Desde 2 años</span>
                  </div>
                </Link>
                <Link href="/para-escuelas" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-servicio-640x400.svg"
                    alt="Información para escuelas — evaluación neuropsicológica"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Recurso</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Para escuelas y orientadores</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Adecuaciones curriculares e informes</span>
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
