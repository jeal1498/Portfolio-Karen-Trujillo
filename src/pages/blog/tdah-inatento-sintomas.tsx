import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Eye, Brain, Clock, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const WA_NINOS = 'https://wa.me/529983211547?text=Hola%20Karen%2C%20le%C3%AD%20tu%20art%C3%ADculo%20sobre%20TDAH%20inatento%20y%20quiero%20informaci%C3%B3n%20sobre%20la%20valoraci%C3%B3n%20para%20mi%20hijo';
const WA_ADULTOS = 'https://wa.me/529983211547?text=Hola%20Karen%2C%20le%C3%AD%20tu%20art%C3%ADculo%20sobre%20TDAH%20inatento%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20valoraci%C3%B3n%20para%20adultos';

const sintomasNinos = [
  {
    senal: 'Parece estar en las nubes la mayor parte del tiempo',
    ejemplo: 'No es que no le importe la clase — es que su mente se va a otro lado sin que él lo decida. Le hablas y tarda en regresar. No es rebeldía.',
  },
  {
    senal: 'Pierde el hilo de lo que está haciendo',
    ejemplo: 'Empieza la tarea, voltea un momento y ya no sabe por dónde iba. Necesita que le recuerden constantemente qué sigue.',
  },
  {
    senal: 'Comete errores por descuido aunque sabe el tema',
    ejemplo: 'Estudió bien, pero en el examen salta preguntas, no lee las instrucciones completas o escribe algo diferente a lo que quiso. Sabe más de lo que demuestra.',
  },
  {
    senal: 'Le cuesta mucho organizar sus cosas y sus tiempos',
    ejemplo: 'La mochila siempre en desorden. La tarea a medias. Los proyectos incompletos. No es flojera — su cerebro no automatiza la organización.',
  },
  {
    senal: 'Evita tareas que requieren esfuerzo mental sostenido',
    ejemplo: 'Leer varios párrafos, resolver problemas largos de matemáticas o escribir redacciones generan una resistencia desproporcionada al nivel de dificultad.',
  },
  {
    senal: 'Olvida materiales, citas y encargos con regularidad',
    ejemplo: 'Cada semana falta algo. La carta de la escuela nunca llega a casa. No es irresponsabilidad — es que su memoria de trabajo funciona diferente.',
  },
];

const sintomasAdultos = [
  {
    senal: 'Procrastinación crónica con tareas "aburridas"',
    ejemplo: 'Sabes que tienes que hacer algo, lo tienes en la mente, pero no arrancas. La urgencia activa tu cerebro, el resto del tiempo no.',
  },
  {
    senal: 'Dificultad para terminar lo que empezaste',
    ejemplo: 'Tu computadora tiene carpetas de proyectos inconclusos. Las ideas florecen, la ejecución sostenida se desvanece.',
  },
  {
    senal: 'Sensación de que el tiempo no existe hasta que ya es tarde',
    ejemplo: 'Subestimas cuánto tarda cada cosa. Llegas tarde aunque te prepares. El tiempo "antes de salir" se evapora.',
  },
  {
    senal: 'Mente que no para, pero no se enfoca',
    ejemplo: 'Pensamientos en paralelo, dificultad para "apagar" al acostarte, cambias de tema en conversaciones. No es ansiedad — aunque se parece.',
  },
  {
    senal: 'Hiperfoco en lo que te apasiona, bloqueo en lo que no',
    ejemplo: 'Puedes trabajar 6 horas sin parar en algo que te interesa. No puedes sostener 20 minutos en algo que no. Eso no es "falta de voluntad".',
  },
  {
    senal: 'Sensación de no cumplir tu potencial',
    ejemplo: 'Todos te dicen que eres inteligente. Tú sientes que algo falla. Has compensado toda la vida con esfuerzo extra — y estás agotado.',
  },
];

const mitos = [
  {
    mito: '"Si no es hiperactivo, no tiene TDAH"',
    realidad: 'El TDAH inatento (antes llamado TDA) existe sin hiperactividad visible. Es el tipo más subdiagnosticado precisamente porque el niño no genera problemas de conducta — solo bajo rendimiento silencioso.',
  },
  {
    mito: '"Es que no le interesa / es flojo"',
    realidad: 'La inatención del TDAH no se activa con voluntad. El cerebro con TDAH inatento necesita niveles altos de interés o urgencia para sostener el enfoque — no es falta de esfuerzo.',
  },
  {
    mito: '"Saca buenas calificaciones, no puede tener TDAH"',
    realidad: 'Muchos niños con TDAH inatento compensan durante años gracias a un CI alto. El diagnóstico se hace evidente cuando la exigencia académica supera su capacidad de compensación — generalmente en secundaria o preparatoria.',
  },
  {
    mito: '"Ya se le quitará con la edad"',
    realidad: 'Sin intervención adecuada, el TDAH inatento no desaparece — se adapta. En adultos se traduce en dificultades laborales, relacionales y baja autoestima acumulada por años de "podrías si quisieras".',
  },
];

const faqItems = [
  {
    q: '¿Qué es el TDAH inatento o TDA?',
    a: 'El TDAH de presentación predominantemente inatenta (antes llamado TDA o déficit de atención sin hiperactividad) es un subtipo del TDAH donde los síntomas principales son dificultades sostenidas de atención, organización y memoria de trabajo, sin la hiperactividad o impulsividad motora visible. Es el tipo más frecuente en niñas y en adultos con diagnóstico tardío.',
  },
  {
    q: '¿Cuál es la diferencia entre TDAH inatento y TDAH combinado?',
    a: 'El TDAH combinado incluye tanto síntomas de inatención como de hiperactividad e impulsividad. El TDAH inatento solo presenta el componente atencional — sin agitación motora visible, lo que lo hace más difícil de detectar. Ambos se diagnostican con los mismos instrumentos estandarizados.',
  },
  {
    q: '¿Por qué el TDAH inatento se detecta más tarde?',
    a: 'Porque el niño con TDAH inatento no genera disrupción en el aula. No interrumpe, no se levanta, no pelea. Simplemente "no rinde" o "no se esfuerza lo suficiente". Esta ausencia de problemas de conducta lleva a que los síntomas se atribuyan a personalidad, falta de motivación o ansiedad, en lugar de investigarse neurológicamente.',
  },
  {
    q: '¿El TDAH inatento afecta más a niñas?',
    a: 'Sí. El perfil inatento es significativamente más frecuente en niñas. Las niñas con TDAH tienden a compensar con esfuerzo, perfeccionismo y comportamiento social adaptado, lo que enmascara los síntomas durante años. El diagnóstico llega frecuentemente en la adolescencia o en la adultez.',
  },
  {
    q: '¿Cómo se diagnostica el TDAH inatento en Cancún?',
    a: 'La neuropsicóloga Karen Trujillo (cédula 11009616) realiza evaluaciones de TDAH en Cancún utilizando instrumentos estandarizados internacionales: CONNERS-3 para niños (5-17 años) o CAARS-2 para adultos (18+), junto con WISC-V o WAIS-IV para evaluar el perfil cognitivo, y BRIEF-2 para funciones ejecutivas. El proceso dura 2-3 semanas e incluye entre 4 y 5 sesiones.',
  },
  {
    q: '¿Se puede tener TDAH inatento y ansiedad al mismo tiempo?',
    a: 'Sí, y es muy frecuente. La inatención crónica genera frustración, sensación de fracaso y, con el tiempo, ansiedad. Además, algunos síntomas de ansiedad imitan la inatención del TDAH (dificultad para concentrarse cuando se está preocupado). El diagnóstico diferencial — distinguir qué es qué — es precisamente lo que hace una evaluación neuropsicológica completa.',
  },
  {
    q: '¿Cuánto cuesta la valoración de TDAH inatento en Cancún?',
    a: 'La valoración neuropsicológica de TDAH en el consultorio de Karen Trujillo en Cancún cuesta $8,300 MXN para niños (5-17 años) y para adultos (18+). El pago se distribuye en las sesiones del proceso. El informe tiene validez oficial ante SEP, IMSS y empleadores.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': 'https://www.psicologakarentrujillo.com.mx/blog/tdah-inatento-sintomas/#article',
      headline: 'TDAH inatento: el tipo de TDAH que casi nadie detecta',
      description: 'El TDAH inatento (antes llamado TDA) es el subtipo más subdiagnosticado. Sin hiperactividad visible, se confunde con pereza o falta de motivación. Aprende a identificarlo en niños y adultos.',
      image: 'https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
      datePublished: '2026-06-02',
      dateModified: '2026-06-02',
      author: {
        '@type': 'Person',
        '@id': 'https://www.psicologakarentrujillo.com.mx/#physician',
        name: 'Karen Trujillo',
        jobTitle: 'Neuropsicóloga Clínica',
        url: 'https://www.psicologakarentrujillo.com.mx',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.psicologakarentrujillo.com.mx/#clinic',
        name: 'Neuropsicóloga Karen Trujillo',
        url: 'https://www.psicologakarentrujillo.com.mx',
      },
      mainEntityOfPage: 'https://www.psicologakarentrujillo.com.mx/blog/tdah-inatento-sintomas',
      inLanguage: 'es-MX',
      about: {
        '@type': 'MedicalCondition',
        name: 'TDAH de presentación inatenta',
        sameAs: 'https://www.wikidata.org/wiki/Q206811',
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#definicion-tdah-inatento', '#sintomas-ninos', '#por-que-tarde'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.psicologakarentrujillo.com.mx' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.psicologakarentrujillo.com.mx/blog' },
        { '@type': 'ListItem', position: 3, name: 'TDAH inatento: el tipo que casi nadie detecta', item: 'https://www.psicologakarentrujillo.com.mx/blog/tdah-inatento-sintomas' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function TDAHInatento() {
  return (
    <>
      <Head>
        <title>TDAH Inatento: síntomas en niños y adultos | Neuropsicóloga Karen Trujillo Cancún</title>
        <meta name="description" content="El TDAH inatento (antes TDA) no tiene hiperactividad visible. Por eso casi nadie lo detecta. Conoce los síntomas en niños y adultos, por qué se diagnostica tarde y cómo evaluarlo en Cancún." />
        <link rel="canonical" href="https://www.psicologakarentrujillo.com.mx/blog/tdah-inatento-sintomas" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="TDAH Inatento: el tipo de TDAH que casi nadie detecta" />
        <meta property="og:description" content="Sin hiperactividad visible, el TDAH inatento se confunde con pereza o falta de motivación durante años. Señales en niños y adultos, y cómo evaluarlo en Cancún." />
        <meta property="og:url" content="https://www.psicologakarentrujillo.com.mx/blog/tdah-inatento-sintomas" />
        <meta property="og:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — TDAH inatento" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-06-02" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TDAH Inatento: el tipo que casi nadie detecta | Karen Trujillo" />
        <meta name="twitter:description" content="Sin hiperactividad, el TDAH inatento pasa invisible durante años. Señales en niños y adultos, y cómo evaluarlo en Cancún." />
        <meta name="twitter:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />
        <main>

          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li>/</li>
                  <li className="text-primary font-medium">TDAH inatento</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-xs font-bold uppercase tracking-widest mb-4 text-primary">
                  TDAH — Inatención
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-[1.15] mb-4">
                  TDAH inatento: el tipo que casi nadie detecta
                </h1>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
                  No hace escándalo, no interrumpe, no pelea. Simplemente parece ausente, despistado o "poco esforzado". Por eso pasa años sin diagnóstico — a veces toda la infancia.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                  <span>Neuropsicóloga Karen Trujillo — Cédula 11009616</span>
                  <span>Cancún, Quintana Roo</span>
                  <span>8 min de lectura</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Definición ── */}
          <section id="definicion-tdah-inatento" className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Qué es el TDAH inatento?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  El TDAH de presentación predominantemente inatenta — antes conocido como TDA o "déficit de atención sin hiperactividad" — es un subtipo del TDAH en el que los síntomas principales son dificultades sostenidas de atención, organización y memoria de trabajo. No hay agitación motora visible. No hay impulsividad que salte a la vista.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  Lo que sí hay: un niño que parece estar en las nubes, que pierde cosas constantemente, que no termina las tareas aunque quiera. O un adulto que procrastina sin poder evitarlo, que siente que el tiempo se le escapa, que no cumple su propio potencial.
                </p>
                <div className="bg-secondary border border-border rounded-xl p-6 mt-6">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">
                      <strong>Dato clave:</strong> El TDAH inatento es el subtipo más frecuente en niñas y en adultos con diagnóstico tardío. También es el más frecuentemente confundido con pereza, ansiedad o baja motivación — lo que retrasa el diagnóstico años o décadas.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Síntomas en niños ── */}
          <section id="sintomas-ninos" className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">Señales de TDAH inatento en niños</h2>
                <p className="text-muted-foreground font-light mb-8">
                  Estas señales son más claras cuando son consistentes en el tiempo (más de 6 meses) y aparecen en al menos dos entornos distintos (casa y escuela).
                </p>
                <div className="space-y-4">
                  {sintomasNinos.map((item, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <Eye className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-primary text-sm mb-1">{item.senal}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.ejemplo}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-5 bg-accent-pink/10 border border-accent-pink/20 rounded-xl">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>Importante:</strong> Todos los niños se distraen a veces. Lo que diferencia al TDAH inatento es la <em>intensidad, frecuencia y persistencia</em> de estas dificultades — no el hecho aislado.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Síntomas en adultos ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">Señales de TDAH inatento en adultos</h2>
                <p className="text-muted-foreground font-light mb-8">
                  En adultos, el TDAH inatento se manifiesta principalmente como dificultades ejecutivas crónicas: arrancar tareas, sostener el esfuerzo, gestionar el tiempo y organizar la vida diaria.
                </p>
                <div className="space-y-4">
                  {sintomasAdultos.map((item, i) => (
                    <div key={i} className="bg-secondary border border-border rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
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

          {/* ── Por qué se detecta tarde ── */}
          <section id="por-que-tarde" className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Por qué el TDAH inatento se detecta tan tarde?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  El sistema educativo y los entornos clínicos están mejor preparados para detectar el TDAH hiperactivo — el niño que interrumpe, que no se sienta, que genera fricción. El niño inatento no genera problemas visibles. Simplemente no rinde lo que podría.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed"><strong>El maestro lo describe como "distraído pero sin problema".</strong> Sin disrupción, no hay derivación a orientación escolar.</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed"><strong>El CI alto enmascara el impacto.</strong> Niños inteligentes compensan durante años. El diagnóstico llega cuando la exigencia supera la capacidad de compensación.</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed"><strong>En niñas, la presión social lo oculta aún más.</strong> Las niñas con TDAH inatento aprenden a fingir que siguen la clase, a pedir el material prestado antes de que se den cuenta, a parecer normales. El costo emocional es enorme.</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed"><strong>Los síntomas se atribuyen a personalidad.</strong> "Es muy soñador", "no tiene ambición", "podría si quisiera". Estas frases acompañan a muchos adultos con TDAH inatento no diagnosticado.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Mitos ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-8">Lo que no es cierto sobre el TDAH inatento</h2>
                <div className="space-y-5">
                  {mitos.map((item, i) => (
                    <div key={i} className="bg-secondary border border-border rounded-xl p-5">
                      <p className="text-sm font-bold text-rose-500 mb-2 italic">"{item.mito}"</p>
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

          {/* ── Cómo se evalúa ── */}
          <section className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Cómo se diagnostica el TDAH inatento?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  El diagnóstico de TDAH inatento requiere una evaluación neuropsicológica completa — no basta con una entrevista ni con cuestionarios aislados. La neuropsicóloga Karen Trujillo (cédula 11009616) utiliza instrumentos estandarizados internacionales que miden objetivamente la atención, la memoria de trabajo y las funciones ejecutivas.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-xs uppercase tracking-widest text-accent-blue font-bold mb-3">Para niños (5–17 años)</p>
                    <ul className="space-y-2 text-sm text-muted-foreground font-light">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> CONNERS-3 — escala de síntomas TDAH</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> WISC-V — perfil cognitivo e inteligencia</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> BRIEF-2 — funciones ejecutivas</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> CPT-3 — atención sostenida computarizada</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Para adultos (18+ años)</p>
                    <ul className="space-y-2 text-sm text-muted-foreground font-light">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> CAARS-2 — escala de síntomas TDAH adulto</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> WAIS-IV — perfil cognitivo e inteligencia</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> BRIEF-2A — funciones ejecutivas adultos</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> CPT-3 — atención sostenida computarizada</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  El proceso toma entre 2 y 3 semanas (4–5 sesiones). El informe final especifica el subtipo de TDAH, el perfil de funciones ejecutivas afectadas y recomendaciones concretas para la escuela, el trabajo y la vida diaria. Tiene validez oficial ante SEP, IMSS e instituciones.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-accent-blue" />
                Preguntas frecuentes
              </h2>
              <div className="space-y-3">
                {faqItems.map((faq, i) => (
                  <details key={i} className="group bg-secondary border-2 border-border hover:border-accent-blue rounded-xl transition-all open:border-primary open:shadow-lg">
                    <summary className="p-5 font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                      <span>{faq.q}</span>
                      <span className="text-muted-foreground shrink-0 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA Doble ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Sospechas que puede ser TDAH inatento?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                Una evaluación neuropsicológica completa da la respuesta con datos objetivos — no con impresiones. Karen Trujillo atiende en Cancún con cédula federal 11009616.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WA_NINOS} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:opacity-90 transition-all">
                  Para mi hijo (5–17 años) <ArrowRight className="w-4 h-4" />
                </a>
                <a href={WA_ADULTOS} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-primary-foreground/10 transition-all">
                  Para mí (adulto) <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* ── Relacionados ── */}
          <section className="py-16 px-6 bg-secondary border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-serif font-bold text-primary mb-8 text-center">También puede interesarte</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/evaluacion-tdah-ninos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Infantil en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Niños de 5 a 17 años · $8,300 MXN</span>
                </Link>
                <Link href="/evaluacion-tdah-adultos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Adultos en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Desde 18 años · $8,300 MXN</span>
                </Link>
                <Link href="/blog/tdah-en-ninas-sintomas" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">TDAH en niñas: síntomas que casi nadie detecta</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">El perfil invisible del TDAH femenino</span>
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
