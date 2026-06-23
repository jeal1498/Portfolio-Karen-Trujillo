import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle, Brain, Zap, ChevronDown, Facebook, Link2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

const WA = `https://wa.me/${WA_NUMBER}?text=Hola%20Karen%2C%20le%C3%AD%20tu%20art%C3%ADculo%20sobre%20TDAH%20vs%20ansiedad%20y%20quisiera%20informaci%C3%B3n%20sobre%20la%20valoraci%C3%B3n`;

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
    a: `La neuropsicóloga Karen Trujillo (cédula ${CEDULA}) realiza evaluaciones neuropsicológicas en Cancún que incluyen instrumentos estandarizados internacionales para TDAH (CONNERS-3, CAARS-2, WISC-V o WAIS-IV, BRIEF-2, CPT-3) junto con escalas de ansiedad y otros instrumentos de salud mental. El proceso dura 2-3 semanas e incluye entre 4 y 5 sesiones. El informe especifica qué condiciones están presentes, cómo se relacionan entre sí y qué intervenciones concretas se recomiendan.`,
  },
  {
    q: '¿El TDAH causa ansiedad?',
    a: 'No directamente, pero el TDAH no tratado puede llevar a ansiedad con el tiempo. Años de escuchar "podrías si quisieras", de no cumplir expectativas propias y ajenas, de olvidar compromisos y decepcionar a otros — crean una carga emocional que frecuentemente se manifiesta como ansiedad. Por eso muchos adultos con TDAH no diagnosticado llegan a consulta pensando que su problema principal es la ansiedad.',
  },
];

const CANONICAL_URL = `${SITE_URL}/blog/tdah-vs-ansiedad-diferencias`;
const HEADLINE = '¿TDAH o ansiedad? Cómo saber cuál es cuál — o si son los dos';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${SITE_URL}/blog/tdah-vs-ansiedad-diferencias/#article`,
      headline: '¿TDAH o ansiedad? Cómo diferenciarlos y por qué importa',
      description: 'La diferencia entre TDAH y ansiedad es crucial para el tratamiento correcto. Conoce los síntomas compartidos, las diferencias clave, y por qué pueden coexistir. Guía clínica en español.',
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
      mainEntityOfPage: CANONICAL_URL,
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
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: '¿TDAH o ansiedad? Cómo diferenciarlos', item: CANONICAL_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function TDAHvsAnsiedad() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <>
      <Head>
        <title>¿TDAH o ansiedad? Diferencias clave y cómo distinguirlos</title>
        <meta name="description" content="El TDAH y la ansiedad comparten síntomas pero tienen causas y tratamientos distintos. Aprende las diferencias clave, por qué pueden coexistir y cómo el diagnóstico diferencial resuelve la confusión." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="¿TDAH o ansiedad? Diferencias clave y cómo distinguirlos" />
        <meta property="og:description" content="Síntomas compartidos, diferencias clave y la realidad de la comorbilidad. Guía clínica completa para entender qué tienes — o si tienes los dos." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-tdah-o-ansiedad-1200x675.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — TDAH vs ansiedad diagnóstico diferencial" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-06-02" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¿TDAH o ansiedad? Diferencias y cómo saber cuál es cuál" />
        <meta name="twitter:description" content="Comparten síntomas pero son diferentes. Guía clínica para distinguir TDAH de ansiedad y entender por qué pueden coexistir." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-tdah-o-ansiedad-1200x675.svg`} />
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
                  <li><Link href="/" className="transition-colors hover:text-[#d0d0e7]" style={{ color: 'rgba(208,208,231,0.7)' }}>Inicio</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="transition-colors hover:text-[#d0d0e7]" style={{ color: 'rgba(208,208,231,0.7)' }}>Blog</Link></li>
                  <li>/</li>
                  <li className="font-medium" style={{ color: '#d0d0e7' }}>TDAH vs Ansiedad</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#d0d0e7' }}>
                  Diagnóstico diferencial
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4">
                  ¿TDAH o ansiedad? Cómo saber cuál es cuál — o si son los dos
                </h1>
                <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Es una de las preguntas más frecuentes en consulta. Los síntomas se parecen, la confusión es real — pero la respuesta importa porque el tratamiento es diferente.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-4 rounded-2xl p-4" style={{ color: 'rgba(208,208,231,0.75)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <span className="font-bold" style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga · Cédula {CEDULA}</span>
                  <time dateTime="2026-06-02">2 jun 2026</time>
                  <span>Cancún, Quintana Roo</span>
                  <span>9 min de lectura</span>
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
                    src="/blog/dark-tdah-o-ansiedad-1200x675.svg"
                    alt="¿TDAH o ansiedad? Cómo saber cuál es cuál — o si son los dos — imagen ilustrativa"
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

          {/* ── Imagen inline 1 (placeholder) ── */}
          <section className="py-12 px-6 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                  <img
                    src="/blog/sand-sintomas-compartidos-960x540.svg"
                    alt="Síntomas compartidos entre TDAH y ansiedad — imagen ilustrativa"
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

          {/* ── Imagen inline 2 (placeholder) ── */}
          <section className="py-12 px-6 bg-card border-b border-border">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                  <img
                    src="/blog/lavender-evaluacion-neuropsicologica-960x540.svg"
                    alt="Evaluación neuropsicológica para diagnóstico diferencial de TDAH y ansiedad — imagen ilustrativa"
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

          {/* ── Qué hace la evaluación ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Cómo resuelve la evaluación neuropsicológica esta confusión?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  La evaluación neuropsicológica no se basa en impresiones ni en entrevistas aisladas. Utiliza instrumentos estandarizados que miden objetivamente la atención, las funciones ejecutivas, la memoria de trabajo y el perfil emocional. Con esos datos, el diagnóstico diferencial no es una opinión — es un perfil clínico con evidencia.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  La neuropsicóloga Karen Trujillo (cédula {CEDULA}) atiende en Cancún, Quintana Roo. La evaluación incluye CONNERS-3 o CAARS-2 para TDAH, WISC-V o WAIS-IV para el perfil cognitivo, BRIEF-2 para funciones ejecutivas, CPT-3 para atención sostenida y escalas de salud mental para el componente emocional. El proceso dura 2-3 semanas (4-5 sesiones) y el informe final incluye diagnóstico diferencial y plan de intervención con validez oficial.
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
              <div role="list">
                {faqItems.map((faq, i) => (
                  <div key={i} role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(91,78,127,0.15)' : 'none' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-${i}`}
                      className="w-full py-5 sm:py-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                    >
                      <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                      <ChevronDown
                        className="w-3.5 h-3.5 text-muted-foreground shrink-0"
                        style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                      />
                    </button>
                    <div
                      id={`faq-${i}`}
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
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Quieres saber qué está pasando realmente?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                La neuropsicóloga Karen Trujillo realiza diagnósticos diferenciales completos de TDAH, ansiedad y condiciones relacionadas en Cancún. Cédula federal {CEDULA}. Informe con validez oficial.
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
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Diagnóstico diferencial con ansiedad y burnout</span>
                  </div>
                </Link>
                <Link href="/blog/tdah-inatento-sintomas" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-tdah-inatento-640x400.svg"
                    alt="TDAH inatento: el tipo que casi nadie detecta"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">TDAH inatento: el tipo que casi nadie detecta</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Sin hiperactividad visible</span>
                  </div>
                </Link>
                <Link href="/blog/tdah-adultos-diagnostico-tardio" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-tdah-en-adultos-640x400.svg"
                    alt="TDAH en adultos: diagnóstico tardío"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">TDAH en adultos: diagnóstico tardío</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Por qué miles llegan al diagnóstico después de los 30</span>
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
