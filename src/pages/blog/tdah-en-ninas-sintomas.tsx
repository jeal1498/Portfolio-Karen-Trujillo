import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Brain, AlertCircle, CheckCircle2, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

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
      '@type': 'Article',
      headline: 'TDAH en niñas: síntomas que casi nadie detecta',
      url: 'https://psicologakarentrujillo.com.mx/blog/tdah-en-ninas-sintomas',
      datePublished: '2025-01-01',
      author: { '@type': 'Person', name: 'Karen Trujillo', jobTitle: 'Neuropsicóloga', hasCredential: { '@type': 'EducationalOccupationalCredential', credentialId: '11009616' } },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function TDAHNinas() {
  return (
    <>
      <Head>
        <title>TDAH en Niñas: Síntomas que Casi Nadie Detecta | Neuropsicóloga Karen Trujillo Cancún</title>
        <meta name="description" content="El TDAH en niñas se diagnostica años más tarde que en niños porque los síntomas son distintos. Inatención sin hiperactividad, hipersensibilidad emocional, agotamiento por compensación. Valoración en Cancún." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/blog/tdah-en-ninas-sintomas" />
        <meta property="og:title" content="TDAH en Niñas: Por Qué Se Detecta Tan Tarde y Cómo Identificarlo" />
        <meta property="og:description" content="El TDAH femenino es invisible al sistema: no genera disrupción, se compensa con esfuerzo, se confunde con ansiedad. Señales, consecuencias y cómo evaluar a tu hija en Cancún." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx/blog/tdah-en-ninas-sintomas" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div className="antialiased selection:bg-accent-blue selection:text-primary pb-24 lg:pb-0">
        <Navbar />
        <main>
          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-pink/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                  <li>/</li>
                  <li className="text-primary font-medium">TDAH en niñas: síntomas que casi nadie detecta</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-accent-pink/20 bg-accent-pink/10 text-[10px] font-bold uppercase tracking-widest mb-4 text-primary">
                  TDAH Femenino
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-[1.15] mb-4">
                  TDAH en niñas: síntomas que casi nadie detecta
                </h1>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
                  El TDAH femenino es invisible al sistema educativo. No genera disrupción, se enmascara con esfuerzo y durante años se confunde con ansiedad, perfeccionismo o simplemente "ser despistada".
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                  <span>Neuropsicóloga Karen Trujillo — Cédula 11009616</span>
                  <span>Cancún, Quintana Roo</span>
                </div>
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

                {/* FAQ */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Preguntas frecuentes sobre TDAH en niñas</h2>
                <div className="space-y-4">
                  {faqItems.map((faq, i) => (
                    <details key={i} className="group bg-card border-2 border-border hover:border-accent-pink rounded-xl transition-all open:border-primary open:shadow-lg">
                      <summary className="p-6 font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                        <span>{faq.q}</span>
                        <span className="text-muted-foreground shrink-0 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                      </summary>
                      <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Sospechas que tu hija podría tener TDAH?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                Una valoración neuropsicológica formal es la única forma de saberlo con certeza. La Neuropsicóloga Karen Trujillo atiende en Cancún con cédula federal 11009616.
              </p>
              <a
                href="https://wa.me/529983211547?text=Hola%20Karen,%20leí%20tu%20artículo%20sobre%20TDAH%20en%20niñas%20y%20quiero%20información"
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
                <Link href="/evaluacion-tdah-ninos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Infantil en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1">Niños y niñas de 5 a 17 años</span>
                </Link>
                <Link href="/blog/cuanto-cuesta-valoracion-tdah-cancun" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Blog</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">¿Cuánto cuesta una valoración de TDAH en Cancún?</span>
                  <span className="block text-xs text-muted-foreground mt-1">Precios y qué incluye</span>
                </Link>
                <Link href="/evaluacion-tdah-adultos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Adultos en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1">Desde 18 años</span>
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
