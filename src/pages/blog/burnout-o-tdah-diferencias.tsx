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

const WA = `https://wa.me/${WA_NUMBER}?text=Hola%20Karen%2C%20le%C3%AD%20tu%20art%C3%ADculo%20sobre%20burnout%20vs%20TDAH%20y%20quisiera%20informaci%C3%B3n%20sobre%20la%20valoraci%C3%B3n%20para%20adultos`;

const similitudes = [
  {
    sintoma: 'Dificultad para concentrarse',
    burnout: 'La mente está saturada y agotada, no puede procesar más',
    tdah: 'El cerebro no sostiene el foco por su funcionamiento neurológico, independientemente del nivel de energía',
  },
  {
    sintoma: 'Procrastinación y tareas sin terminar',
    burnout: 'La apatía y el agotamiento hacen que iniciar tareas se sienta imposible',
    tdah: 'El sistema dopaminérgico no genera suficiente motivación para arrancar — especialmente en tareas poco estimulantes',
  },
  {
    sintoma: 'Irritabilidad y bajo umbral de frustración',
    burnout: 'Las reservas emocionales están agotadas por el estrés crónico',
    tdah: 'La regulación emocional es más difícil neurológicamente — la frustración se dispara más rápido',
  },
  {
    sintoma: 'Bajo rendimiento laboral o académico',
    burnout: 'El cuerpo y la mente están en modo supervivencia, no en modo producción',
    tdah: 'Las funciones ejecutivas (planificación, inicio, seguimiento) están estructuralmente comprometidas',
  },
  {
    sintoma: 'Sensación de no cumplir el propio potencial',
    burnout: 'Sabes que antes podías más — algo cambió después de un período de estrés intenso',
    tdah: 'Siempre ha sido así — la sensación de "podría si quisiera" acompaña desde la infancia',
  },
];

const diferencias = [
  {
    aspecto: '¿Cuándo empieza?',
    burnout: 'Después de un período de estrés sostenido: un proyecto agotador, una pérdida, una etapa de sobrecarga',
    tdah: 'Siempre ha estado ahí — aunque no se diagnosticara. Los síntomas están presentes desde la infancia',
  },
  {
    aspecto: '¿Mejora con descanso?',
    burnout: 'Sí — las vacaciones, el sueño y la reducción del estrés producen recuperación real',
    tdah: 'No de forma significativa — descansar no cambia cómo funciona el cerebro con TDAH',
  },
  {
    aspecto: '¿Hay tareas en las que sí te enfocas bien?',
    burnout: 'En general no — el agotamiento afecta todo',
    tdah: 'Sí — el hiperfoco en temas de interés es una señal característica. El problema no es la atención en sí, sino regularla',
  },
  {
    aspecto: '¿Los síntomas están ligados al contexto laboral?',
    burnout: 'Principalmente sí — fuera del trabajo o en vacaciones la persona recupera algo de funcionalidad',
    tdah: 'No — las dificultades aparecen en múltiples contextos: trabajo, relaciones, finanzas, hogar',
  },
  {
    aspecto: '¿Hay historia de dificultades similares antes del trabajo?',
    burnout: 'No — antes del período de sobrecarga, la persona funcionaba bien',
    tdah: 'Sí — si se revisa la historia, hay señales desde la infancia: notas irregulares, olvidos, proyectos sin terminar',
  },
];

const senalesCoexistencia = [
  'Tenías dificultades de atención o organización antes de empezar el trabajo actual',
  'El descanso mejora tu energía pero no tu capacidad de organización o de empezar tareas',
  'Siempre has sentido que trabajas el doble que otros para lograr lo mismo',
  'La procrastinación y el caos organizacional te han acompañado en distintos trabajos y etapas de vida',
];

const faqItems = [
  {
    q: '¿Cuál es la diferencia principal entre burnout y TDAH?',
    a: 'La diferencia clave está en el origen y la historia. El burnout aparece después de un período de estrés sostenido — hubo un antes en que la persona funcionaba bien. El TDAH es una condición neurológica presente desde la infancia: si se revisa la historia, siempre hubo dificultades para organizar, empezar o terminar tareas, aunque no se identificaran como TDAH.',
  },
  {
    q: '¿Puede alguien tener burnout y TDAH al mismo tiempo?',
    a: 'Sí, y es más frecuente de lo que parece. El TDAH no diagnosticado predispone al burnout: años de trabajar el doble que otros para compensar las dificultades ejecutivas generan un agotamiento crónico. Muchos adultos llegan al burnout a los 30-40 años sin saber que el TDAH fue el motor silencioso detrás del esfuerzo desproporcionado.',
  },
  {
    q: '¿El descanso mejora el TDAH?',
    a: 'No de forma significativa. El descanso puede mejorar el estado de ánimo y la energía general, pero no cambia el funcionamiento ejecutivo del cerebro con TDAH. Si después de vacaciones o de reducir el estrés sigues igual de desorientado, con la misma dificultad para organizar y empezar tareas, el perfil se parece más al TDAH que al burnout puro.',
  },
  {
    q: '¿Cómo sé cuál tengo yo?',
    a: 'La forma más confiable es con una evaluación neuropsicológica. Algunas preguntas que orientan: ¿estas dificultades existían antes de tu trabajo actual? ¿Están presentes en múltiples áreas de tu vida (no solo en el trabajo)? ¿Hay tareas no laborales en las que sí te enfocas con facilidad (hiperfoco)? ¿Familiares de primer grado tienen TDAH o dificultades similares? Si la respuesta a varias de estas es sí, vale la pena explorar el TDAH.',
  },
  {
    q: '¿Cómo se evalúa el TDAH en adultos en Cancún?',
    a: `La neuropsicóloga Karen Trujillo (cédula ${CEDULA}) realiza evaluaciones de TDAH adulto en Cancún usando instrumentos estandarizados internacionales: CAARS-2 (escala de síntomas TDAH adulto), WAIS-IV (perfil cognitivo), BRIEF-2A (funciones ejecutivas) y CPT-3 (atención sostenida computarizada). El proceso toma 2-3 semanas en 4-5 sesiones. El informe incluye diagnóstico diferencial y tiene validez oficial.`,
  },
  {
    q: '¿El tratamiento del burnout y el TDAH es diferente?',
    a: 'Sí, y esa es exactamente la razón por la que el diagnóstico diferencial importa. El burnout responde al descanso, la reducción de carga y el apoyo psicoterapéutico. El TDAH requiere estrategias específicas para el funcionamiento ejecutivo — que pueden incluir psicoeducación, terapia cognitivo-conductual adaptada al TDAH, y en muchos casos evaluación psiquiátrica para medicación. Tratar solo uno cuando están los dos es insuficiente.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${SITE_URL}/blog/burnout-o-tdah-diferencias/#article`,
      headline: 'Burnout vs. TDAH: cómo saber cuál tienes (o si son los dos)',
      description: 'El burnout y el TDAH comparten síntomas pero tienen causas distintas. La diferencia clave: en el burnout hubo un antes. En el TDAH, siempre fue así. Diagnóstico diferencial en Cancún.',
      image: KAREN_IMAGE,
      datePublished: '2026-06-03',
      dateModified: '2026-06-03',
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
      mainEntityOfPage: `${SITE_URL}/blog/burnout-o-tdah-diferencias`,
      inLanguage: 'es-MX',
      about: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Síndrome de burnout', sameAs: 'https://www.wikidata.org/wiki/Q1515895' },
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#diferencia-principal', '#tabla-comparativa', '#coexistencia'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Burnout vs. TDAH: diferencias', item: `${SITE_URL}/blog/burnout-o-tdah-diferencias` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

const CANONICAL_URL = `${SITE_URL}/blog/burnout-o-tdah-diferencias`;
const HEADLINE = 'Burnout vs. TDAH: cómo saber cuál tienes (o si son los dos)';

export default function BurnoutVsTDAH() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <>
      <Head>
        <title>Burnout vs. TDAH: diferencias y cómo identificarlos</title>
        <meta name="description" content="El burnout y el TDAH comparten síntomas pero tienen causas distintas. La diferencia clave: en el burnout hubo un antes. En el TDAH, siempre fue así. Diagnóstico diferencial en Cancún." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Burnout vs. TDAH: diferencias y cómo identificarlos" />
        <meta property="og:description" content="Síntomas compartidos, diferencias clave y por qué el burnout y el TDAH pueden coexistir. Guía clínica completa para adultos en Cancún." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-burnout-vs-tdah-1200x675.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — burnout vs TDAH diferencias adultos" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-06-03" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Burnout vs. TDAH: cómo saber cuál tienes (o si son los dos)" />
        <meta name="twitter:description" content="Comparten síntomas pero son diferentes. Guía clínica para distinguir burnout de TDAH y entender por qué pueden coexistir." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-burnout-vs-tdah-1200x675.svg`} />
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
                  <li className="font-medium" style={{ color: '#d0d0e7' }}>Burnout vs TDAH</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#d0d0e7' }}>
                  TDAH Adultos — Diagnóstico diferencial
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4">
                  Burnout vs. TDAH: ¿por qué te sientes así y qué puedes hacer?
                </h1>
                <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Es la pregunta que más hacen los adultos en consulta. Los síntomas se parecen, la confusión es real. Pero la respuesta cambia completamente el tratamiento.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-4" style={{ color: 'rgba(208,208,231,0.75)', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <span style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga · Cédula {CEDULA}</span>
                  <time dateTime="2026-06-03">3 jun 2026</time>
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
                    src="/blog/dark-burnout-vs-tdah-1200x675.svg"
                    alt="Burnout vs. TDAH: cómo saber cuál tienes (o si son los dos) — imagen ilustrativa"
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
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Ambas condiciones hacen que concentrarse sea difícil, que las tareas se acumulen y que sientas que no das abasto. Pero el origen es radicalmente diferente — y eso define qué necesita cambiar.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-accent-pink/10 border border-accent-pink/20 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-accent-pink" />
                      <p className="font-bold text-primary text-sm uppercase tracking-wider">Burnout</p>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Es un agotamiento por sobrecarga sostenida. <strong>Hubo un antes en que funcionabas bien.</strong> El estrés crónico consumió los recursos del sistema nervioso hasta vaciarlo.
                    </p>
                  </div>
                  <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-accent-blue" />
                      <p className="font-bold text-primary text-sm uppercase tracking-wider">TDAH</p>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Es una condición neurológica del desarrollo. <strong>Siempre ha estado ahí</strong> — aunque no lo supieras. El cerebro funciona diferente desde la infancia, independientemente del estrés.
                    </p>
                  </div>
                </div>
                <div className="bg-secondary border border-border rounded-xl p-5">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>En pocas palabras:</strong> en el burnout, hubo un antes en que funcionabas bien. En el TDAH, siempre fue así — aunque no lo supieras.
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
                  Porque comparten síntomas visibles en la superficie. La diferencia está en el mecanismo que los produce — y eso solo se puede distinguir con una evaluación objetiva.
                </p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table id="tabla-comparativa" className="w-full text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="p-4 text-left font-bold text-primary text-xs uppercase tracking-wider">Síntoma</th>
                        <th className="p-4 text-left font-bold text-accent-pink text-xs uppercase tracking-wider">En burnout</th>
                        <th className="p-4 text-left font-bold text-accent-blue text-xs uppercase tracking-wider">En TDAH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {similitudes.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-secondary' : 'bg-card'}>
                          <td className="p-4 font-bold text-primary text-xs">{row.sintoma}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.burnout}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.tdah}</td>
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
                    src="/blog/sand-agotamiento-laboral-960x540.svg"
                    alt="Adulto agotado evaluando si es burnout o TDAH — imagen ilustrativa"
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
                          <p className="text-[9px] uppercase tracking-widest text-accent-pink font-bold mb-1">Burnout</p>
                          <p className="text-sm text-foreground font-light leading-relaxed">{item.burnout}</p>
                        </div>
                        <div className="p-4">
                          <p className="text-[9px] uppercase tracking-widest text-accent-blue font-bold mb-1">TDAH</p>
                          <p className="text-sm text-foreground font-light leading-relaxed">{item.tdah}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Coexistencia ── */}
          <section id="coexistencia" className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Pueden coexistir? Más frecuente de lo que crees</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  Sí — y esta combinación es especialmente frecuente en adultos de alto rendimiento que llegan a consulta exhaustos. El TDAH no diagnosticado predispone directamente al burnout: cuando tu cerebro necesita el doble de esfuerzo para sostener la atención, organizar el trabajo y gestionar el tiempo, el agotamiento no es una debilidad — es la consecuencia lógica de años de compensación invisible.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Muchos adultos llegan a los 30 o 40 años creyendo que su problema es el trabajo, el jefe o la carga. Cuando se revisa la historia con cuidado, aparece un patrón que los acompañaba mucho antes — en la universidad, en la adolescencia, incluso en la primaria.
                </p>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Señales de que pueden estar los dos</h3>
                <div className="space-y-3">
                  {senalesCoexistencia.map((senal, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                      <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground font-light leading-relaxed">{senal}</p>
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
                    src="/blog/lavender-evaluacion-neuropsicologica-960x540.svg"
                    alt="Sesión de evaluación neuropsicológica para diagnóstico diferencial de TDAH — imagen ilustrativa"
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
                  La evaluación neuropsicológica no se basa en impresiones ni en listas de síntomas autoreportados. Utiliza instrumentos estandarizados que miden objetivamente la atención sostenida, las funciones ejecutivas, la memoria de trabajo y el perfil emocional. Con esos datos, el diagnóstico diferencial no es una opinión — es un perfil clínico con evidencia.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  La neuropsicóloga Karen Trujillo (cédula {CEDULA}) atiende en Cancún, Quintana Roo. La evaluación de TDAH adulto incluye CAARS-2 para síntomas TDAH en adultos, WAIS-IV para el perfil cognitivo, BRIEF-2A para funciones ejecutivas y CPT-3 para atención sostenida computarizada. El proceso dura 2-3 semanas (4-5 sesiones) y el informe final incluye diagnóstico diferencial, historia del desarrollo y plan de intervención con validez oficial.
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
          <section id="preguntas-frecuentes" className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-accent-blue" />
                Preguntas frecuentes
              </h2>
              <div role="list">
                {faqItems.map((faq, i) => (
                  <div key={i} role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(91,78,127,0.15)' : 'none' }}>
                    <button
                      id={`faq-btn-${i}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                      className="w-full py-5 sm:py-6 flex justify-between items-center gap-4 text-left cursor-pointer font-bold text-primary text-sm sm:text-base"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className="w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300"
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
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
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
                La neuropsicóloga Karen Trujillo realiza diagnósticos diferenciales completos de TDAH, burnout y condiciones relacionadas en Cancún. Cédula federal {CEDULA}. Informe con validez oficial.
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
                <Link href="/evaluacion-tdah-adultos" className="bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-servicio-640x400.svg"
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
                <Link href="/blog/tdah-adultos-diagnostico-tardio" className="bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-articulo-640x400.svg"
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
                <Link href="/blog/tdah-vs-ansiedad-diferencias" className="bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-articulo-640x400.svg"
                    alt="¿TDAH o ansiedad? Cómo saber cuál es cuál"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">¿TDAH o ansiedad? Cómo saber cuál es cuál</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Síntomas compartidos y diferencias clave</span>
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
