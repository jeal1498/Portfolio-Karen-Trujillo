import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const WA = 'https://wa.me/529983211547?text=Hola%20Karen%2C%20le%C3%AD%20tu%20art%C3%ADculo%20sobre%20TDAH%20vs%20ansiedad%20y%20quisiera%20informaci%C3%B3n%20sobre%20la%20valoraci%C3%B3n';

const similitudes = [
  { sintoma: 'Dificultad para concentrarse', tdah: 'Por inatención neurológica — el cerebro no sostiene el foco', ansiedad: 'Por preocupación excesiva que ocupa el espacio mental' },
  { sintoma: 'Inquietud o agitación', tdah: 'Hiperactividad motora o interna constante', ansiedad: 'Tensión muscular y nerviosismo ante situaciones percibidas como amenaza' },
  { sintoma: 'Olvidos frecuentes', tdah: 'Memoria de trabajo deficiente de forma consistente', ansiedad: 'La preocupación intensa bloquea el registro de información nueva' },
  { sintoma: 'Problemas para dormir', tdah: 'Mente activa al acostarse, dificultad para "apagar"', ansiedad: 'Rumiación de preocupaciones, insomnio anticipatorio' },
  { sintoma: 'Bajo rendimiento académico o laboral', tdah: 'Dificultad estructural para sostener atención y organizar', ansiedad: 'El miedo al fracaso o la parálisis evitativa afectan el desempeño' },
];

const diferencias = [
  {
    aspecto: '¿Cuándo empieza?',
    tdah: 'Los síntomas están presentes desde la infancia, aunque no se hayan detectado antes',
    ansiedad: 'Puede aparecer en cualquier momento, frecuentemente ligada a un período de estrés o trauma',
  },
  {
    aspecto: '¿El foco mejora cuando el tema interesa?',
    tdah: 'Sí — el hiperfoco en temas de interés es una señal característica del TDAH',
    ansiedad: 'No necesariamente — la preocupación puede interferir incluso con actividades placenteras',
  },
  {
    aspecto: '¿Hay preocupación excesiva?',
    tdah: 'No como síntoma principal — la inatención no suele acompañarse de temor anticipatorio',
    ansiedad: 'Sí — la preocupación desproporcionada y el miedo al futuro son centrales',
  },
  {
    aspecto: '¿Los síntomas están siempre o solo en ciertos contextos?',
    tdah: 'Presentes en múltiples contextos (escuela, casa, trabajo, relaciones)',
    ansiedad: 'Pueden estar más ligados a situaciones específicas o períodos de estrés',
  },
  {
    aspecto: '¿Hay respuesta física de alarma?',
    tdah: 'No característicamente — no hay taquicardia, sudoración ni sensación de peligro inminente',
    ansiedad: 'Sí — síntomas físicos como taquicardia, tensión, respiración acelerada, nudo en el estómago',
  },
];

const comorbilidades = [
  'Entre el 50% y el 60% de las personas con TDAH también tienen un trastorno de ansiedad.',
  'La ansiedad puede ser consecuencia del TDAH no tratado: años de fracasos, críticas y sensación de no cumplir generan un estado ansioso crónico.',
  'El TDAH puede enmascarar la ansiedad y viceversa — por eso el diagnóstico diferencial requiere instrumentos objetivos, no solo entrevista.',
  'Tratar solo la ansiedad cuando hay TDAH subyacente suele ser insuficiente — los síntomas de inatención persisten.',
];

const faqItems = [
  {
    q: '¿Cuál es la diferencia principal entre TDAH y ansiedad?',
    a: 'La diferencia clave está en el origen de los síntomas. En el TDAH, las dificultades de atención, organización e impulsividad tienen una base neurológica presente desde la infancia y ocurren en múltiples contextos. En la ansiedad, los síntomas (incluida la dificultad para concentrarse) surgen de la preocupación excesiva y el estado de alerta constante, y suelen estar más ligados a situaciones específicas o períodos de estrés.',
  },
  {
    q: '¿Pueden coexistir TDAH y ansiedad?',
    a: 'Sí, y es muy frecuente. Entre el 50% y 60% de las personas con TDAH también tienen un trastorno de ansiedad. En muchos casos, la ansiedad es consecuencia del TDAH no diagnosticado: años de fracasos, críticas y sensación de no rendir crean un estado ansioso crónico. El diagnóstico diferencial —que distingue qué es qué y si coexisten— es precisamente lo que hace una evaluación neuropsicológica.',
  },
  {
    q: '¿Cómo sé si lo que tengo es TDAH o ansiedad?',
    a: 'La forma más confiable de saberlo es con una evaluación neuropsicológica. Algunas pistas que orientan: si la dificultad para concentrarte ha estado presente toda tu vida (no solo en períodos de estrés), si mejora notablemente cuando el tema te interesa, y si no va acompañada de preocupación excesiva o miedo anticipatorio, el perfil se parece más al TDAH. Si los síntomas aparecieron en un período específico, se acompañan de tensión física o miedo al futuro, el perfil se parece más a la ansiedad. Pero solo la evaluación puede distinguirlos con precisión.',
  },
  {
    q: '¿Por qué es importante distinguir TDAH de ansiedad?',
    a: 'Porque el tratamiento es diferente. Tratar solo la ansiedad cuando hay TDAH subyacente deja los síntomas de inatención sin resolver. Tratar solo el TDAH sin atender la ansiedad comórbida puede ser insuficiente. Un diagnóstico diferencial correcto permite diseñar un plan de intervención que aborde ambos — si es que ambos están presentes.',
  },
  {
    q: '¿Cómo se hace el diagnóstico diferencial de TDAH y ansiedad en Cancún?',
    a: 'La neuropsicóloga Karen Trujillo (cédula 11009616) realiza evaluaciones neuropsicológicas en Cancún que incluyen instrumentos estandarizados internacionales para TDAH (CONNERS-3, CAARS-2, WISC-V o WAIS-IV, BRIEF-2, CPT-3) junto con escalas de ansiedad y otros instrumentos de salud mental. El proceso dura 2-3 semanas e incluye entre 4 y 5 sesiones. El informe especifica qué condiciones están presentes, cómo se relacionan entre sí y qué intervenciones concretas se recomiendan.',
  },
  {
    q: '¿El TDAH causa ansiedad?',
    a: 'No directamente, pero el TDAH no tratado puede llevar a ansiedad con el tiempo. Años de escuchar "podrías si quisieras", de no cumplir expectativas propias y ajenas, de olvidar compromisos y decepcionar a otros — crean una carga emocional que frecuentemente se manifiesta como ansiedad. Por eso muchos adultos con TDAH no diagnosticado llegan a consulta pensando que su problema principal es la ansiedad.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': 'https://www.psicologakarentrujillo.com.mx/blog/tdah-vs-ansiedad-diferencias/#article',
      headline: '¿TDAH o ansiedad? Cómo diferenciarlos y por qué importa',
      description: 'La diferencia entre TDAH y ansiedad es crucial para el tratamiento correcto. Conoce los síntomas compartidos, las diferencias clave, y por qué pueden coexistir. Guía clínica en español.',
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
      mainEntityOfPage: 'https://www.psicologakarentrujillo.com.mx/blog/tdah-vs-ansiedad-diferencias',
      inLanguage: 'es-MX',
      about: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Trastorno de ansiedad generalizada', sameAs: 'https://www.wikidata.org/wiki/Q544006' },
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#diferencia-principal', '#tabla-comparativa', '#comorbilidad'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.psicologakarentrujillo.com.mx' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.psicologakarentrujillo.com.mx/blog' },
        { '@type': 'ListItem', position: 3, name: '¿TDAH o ansiedad? Cómo diferenciarlos', item: 'https://www.psicologakarentrujillo.com.mx/blog/tdah-vs-ansiedad-diferencias' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function TDAHvsAnsiedad() {
  return (
    <>
      <Head>
        <title>¿TDAH o Ansiedad? Diferencias y cómo saber cuál es cuál | Karen Trujillo Cancún</title>
        <meta name="description" content="El TDAH y la ansiedad comparten síntomas pero tienen causas y tratamientos distintos. Aprende las diferencias clave, por qué pueden coexistir y cómo el diagnóstico diferencial resuelve la confusión." />
        <link rel="canonical" href="https://www.psicologakarentrujillo.com.mx/blog/tdah-vs-ansiedad-diferencias" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="¿TDAH o ansiedad? Cómo diferenciarlos y por qué importa" />
        <meta property="og:description" content="Síntomas compartidos, diferencias clave y la realidad de la comorbilidad. Guía clínica completa para entender qué tienes — o si tienes los dos." />
        <meta property="og:url" content="https://www.psicologakarentrujillo.com.mx/blog/tdah-vs-ansiedad-diferencias" />
        <meta property="og:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — TDAH vs ansiedad diagnóstico diferencial" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-06-02" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¿TDAH o ansiedad? Diferencias y cómo saber cuál es cuál" />
        <meta name="twitter:description" content="Comparten síntomas pero son diferentes. Guía clínica para distinguir TDAH de ansiedad y entender por qué pueden coexistir." />
        <meta name="twitter:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />
        <main>

          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-pink/15 rounded-full blur-[100px] -translate-y-1/3 -translate-x-1/4 animate-pulse" />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li>/</li>
                  <li className="text-primary font-medium">TDAH vs Ansiedad</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-accent-pink/20 bg-accent-pink/10 text-xs font-bold uppercase tracking-widest mb-4 text-primary">
                  Diagnóstico diferencial
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-[1.15] mb-4">
                  ¿TDAH o ansiedad? Cómo saber cuál es cuál — o si son los dos
                </h1>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
                  Es una de las preguntas más frecuentes en consulta. Los síntomas se parecen, la confusión es real — pero la respuesta importa porque el tratamiento es diferente.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                  <span>Neuropsicóloga Karen Trujillo — Cédula 11009616</span>
                  <span>Cancún, Quintana Roo</span>
                  <span>9 min de lectura</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Diferencia principal ── */}
          <section id="diferencia-principal" className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">La diferencia que más importa</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  La diferencia principal entre TDAH y ansiedad está en el <strong>origen de los síntomas</strong>, no solo en los síntomas en sí.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-accent-blue" />
                      <p className="font-bold text-primary text-sm uppercase tracking-wider">TDAH</p>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Las dificultades de atención, organización e impulsividad tienen una <strong>base neurológica presente desde la infancia</strong>. Ocurren en múltiples contextos, independientemente del nivel de estrés.
                    </p>
                  </div>
                  <div className="bg-accent-pink/10 border border-accent-pink/20 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-accent-pink" />
                      <p className="font-bold text-primary text-sm uppercase tracking-wider">Ansiedad</p>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Los síntomas surgen de <strong>un estado de alerta y preocupación excesiva</strong>. La concentración falla porque la mente está ocupada procesando amenazas reales o percibidas.
                    </p>
                  </div>
                </div>
                <div className="bg-secondary border border-border rounded-xl p-5">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>En pocas palabras:</strong> en el TDAH, el cerebro no sostiene el foco por su funcionamiento neurológico. En la ansiedad, el cerebro no puede enfocarse porque está procesando una amenaza — real o percibida.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Síntomas compartidos ── */}
          <section className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Por qué se confunden tanto?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Porque comparten síntomas visibles. La diferencia está en el mecanismo que los produce — y eso solo se distingue con una evaluación objetiva.
                </p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table id="tabla-comparativa" className="w-full text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="p-4 text-left font-bold text-primary text-xs uppercase tracking-wider">Síntoma compartido</th>
                        <th className="p-4 text-left font-bold text-accent-blue text-xs uppercase tracking-wider">En TDAH</th>
                        <th className="p-4 text-left font-bold text-accent-pink text-xs uppercase tracking-wider">En Ansiedad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {similitudes.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-secondary' : 'bg-card'}>
                          <td className="p-4 font-bold text-primary text-xs">{row.sintoma}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.tdah}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.ansiedad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Diferencias clave ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-8">Las diferencias que ayudan a distinguirlos</h2>
                <div className="space-y-4">
                  {diferencias.map((item, i) => (
                    <div key={i} className="bg-secondary border border-border rounded-xl overflow-hidden">
                      <div className="bg-card px-5 py-3 border-b border-border">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.aspecto}</p>
                      </div>
                      <div className="grid sm:grid-cols-2">
                        <div className="p-4 border-b sm:border-b-0 sm:border-r border-border">
                          <p className="text-[9px] uppercase tracking-widest text-accent-blue font-bold mb-1">TDAH</p>
                          <p className="text-sm text-foreground font-light leading-relaxed">{item.tdah}</p>
                        </div>
                        <div className="p-4">
                          <p className="text-[9px] uppercase tracking-widest text-accent-pink font-bold mb-1">Ansiedad</p>
                          <p className="text-sm text-foreground font-light leading-relaxed">{item.ansiedad}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Comorbilidad ── */}
          <section id="comorbilidad" className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Pueden coexistir TDAH y ansiedad?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Sí — y es más frecuente de lo que parece. Tener los dos al mismo tiempo se llama comorbilidad, y tiene implicaciones directas para el tratamiento.
                </p>
                <div className="space-y-3 mb-6">
                  {comorbilidades.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                      <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground font-light leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">
                      <strong>Lo importante:</strong> si sospechas que tienes los dos, el paso correcto no es tratarlos por separado con diferentes especialistas sin coordinación — es hacer primero un diagnóstico diferencial completo que determine qué hay, en qué proporción y cómo se relacionan entre sí.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Qué hace la evaluación ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Cómo resuelve la evaluación neuropsicológica esta confusión?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  La evaluación neuropsicológica no se basa en impresiones ni en entrevistas aisladas. Utiliza instrumentos estandarizados que miden objetivamente la atención, las funciones ejecutivas, la memoria de trabajo y el perfil emocional. Con esos datos, el diagnóstico diferencial no es una opinión — es un perfil clínico con evidencia.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  La neuropsicóloga Karen Trujillo (cédula 11009616) atiende en Cancún, Quintana Roo. La evaluación incluye CONNERS-3 o CAARS-2 para TDAH, WISC-V o WAIS-IV para el perfil cognitivo, BRIEF-2 para funciones ejecutivas, CPT-3 para atención sostenida y escalas de salud mental para el componente emocional. El proceso dura 2-3 semanas (4-5 sesiones) y el informe final incluye diagnóstico diferencial y plan de intervención con validez oficial.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-secondary border border-border rounded-xl p-4 text-center">
                    <p className="text-2xl font-serif font-bold text-primary mb-1">2–3</p>
                    <p className="text-xs text-muted-foreground font-light">semanas de proceso</p>
                  </div>
                  <div className="bg-secondary border border-border rounded-xl p-4 text-center">
                    <p className="text-2xl font-serif font-bold text-primary mb-1">4–5</p>
                    <p className="text-xs text-muted-foreground font-light">sesiones presenciales</p>
                  </div>
                  <div className="bg-secondary border border-border rounded-xl p-4 text-center">
                    <p className="text-2xl font-serif font-bold text-primary mb-1">$8,300</p>
                    <p className="text-xs text-muted-foreground font-light">MXN · pago distribuido</p>
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
              <div className="space-y-3">
                {faqItems.map((faq, i) => (
                  <details key={i} className="group bg-card border-2 border-border hover:border-accent-blue rounded-xl transition-all open:border-primary open:shadow-lg">
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

          {/* ── CTA ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Quieres saber qué está pasando realmente?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                La neuropsicóloga Karen Trujillo realiza diagnósticos diferenciales completos de TDAH, ansiedad y condiciones relacionadas en Cancún. Cédula federal 11009616. Informe con validez oficial.
              </p>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg">
                Consultar disponibilidad <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* ── Relacionados ── */}
          <section className="py-16 px-6 bg-secondary border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-serif font-bold text-primary mb-8 text-center">También puede interesarte</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/evaluacion-tdah-adultos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Adultos en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Diagnóstico diferencial con ansiedad y burnout</span>
                </Link>
                <Link href="/blog/tdah-inatento-sintomas" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">TDAH inatento: el tipo que casi nadie detecta</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Sin hiperactividad visible</span>
                </Link>
                <Link href="/blog/tdah-adultos-diagnostico-tardio" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">TDAH en adultos: diagnóstico tardío</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Por qué miles llegan al diagnóstico después de los 30</span>
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
