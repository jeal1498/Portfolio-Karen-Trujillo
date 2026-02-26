import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Brain, FileText, CheckCircle2,
  ShieldCheck, MessageCircle, Clock,
  Star, Users, BadgeCheck, Puzzle, Briefcase,
  ChevronDown, AlertTriangle, Eye,
  BookOpen, ArrowLeft, ListChecks, HelpCircle,
  Lightbulb, XCircle, Stethoscope,
  Activity, Shield, Layers,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WA_NUMBER = '529983211547';

const adosModules = [
  { module: 'Módulo 1', target: 'Niños sin lenguaje o con palabras sueltas', age: 'Desde 31 meses', method: 'Juego libre, respuesta al nombre, burbujas, juguetes de causa-efecto. El evaluador observa cómo el niño inicia interacción, señala, hace contacto visual y comparte interés.', accent: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' },
  { module: 'Módulo 2', target: 'Niños con frases pero sin fluidez verbal', age: 'Desde 31 meses', method: 'Juego simbólico, descripción de imágenes, conversación guiada. Evalúa cómo el niño usa el lenguaje para comunicarse socialmente — no solo para pedir cosas.', accent: 'text-primary bg-primary/10 border-primary/20' },
  { module: 'Módulo 3', target: 'Niños y adolescentes con lenguaje fluido', age: 'Niños mayores y adolescentes', method: 'Conversaciones sobre emociones, relaciones y situaciones sociales. Se observan narrativas, comprensión de perspectivas ajenas y manejo de ambigüedad social.', accent: 'text-success bg-success/10 border-success/20' },
  { module: 'Módulo 4', target: 'Adolescentes y adultos con lenguaje fluido', age: 'Adolescentes mayores y adultos', method: 'Entrevista semiestructurada sobre relaciones, trabajo, planes a futuro y emociones. Evalúa comunicación social sutil, reciprocidad y flexibilidad cognitiva.', accent: 'text-warning bg-warning/10 border-warning/20' },
];

const whyGoldStandard = [
  { title: 'Observación directa, no solo reporte', desc: 'A diferencia de cuestionarios, el ADOS-2 pone al niño en situaciones sociales diseñadas y observa su comportamiento real. No depende de lo que los padres recuerdan o interpretan — mide lo que el niño hace frente al evaluador.', icon: Eye },
  { title: 'Semiestructurado y estandarizado', desc: 'Cada actividad tiene un protocolo definido con criterios de puntuación objetivos. Dos evaluadores certificados que apliquen el ADOS-2 al mismo niño llegarán al mismo resultado. Eso es confiabilidad.', icon: Shield },
  { title: 'Algoritmo diagnóstico validado', desc: 'El ADOS-2 no se basa en impresiones clínicas. Tiene un algoritmo que genera puntuaciones de corte para "autismo" y "espectro autista" con sensibilidad y especificidad superiores al 90% en estudios internacionales.', icon: Activity },
  { title: 'Adaptado a cada nivel de desarrollo', desc: 'Los 4 módulos permiten evaluar desde niños sin lenguaje hasta adultos con lenguaje fluido. No es un test único — es un sistema completo que se ajusta a la persona.', icon: Layers },
  { title: 'Reconocido internacionalmente', desc: 'Es el instrumento de referencia en guías clínicas de la APA, el NHS británico, la AAP y las principales sociedades de neuropsicología. Es el estándar que usan los centros de investigación más importantes del mundo.', icon: BadgeCheck },
];

const vsOtherMethods = [
  { method: 'Solo entrevista clínica', pros: 'Rápida, accesible, permite explorar historia familiar', cons: 'Subjetiva, depende de la experiencia del clínico, no tiene criterios cuantificables. Alta tasa de falsos negativos en presentaciones sutiles.', verdict: 'Útil como primer filtro, insuficiente como único método diagnóstico.' },
  { method: 'Cuestionarios de tamizaje (M-CHAT, SCQ)', pros: 'Económicos, rápidos, aplicables en consultorios de pediatría', cons: 'Solo detectan riesgo, no diagnostican. Alta tasa de falsos positivos. Dependen del reporte de los padres, no de observación directa.', verdict: 'Buenos para tamizaje poblacional, no para diagnóstico clínico.' },
  { method: 'Evaluación con ADOS-2 + batería completa', pros: 'Observación directa estandarizada, algoritmo diagnóstico validado, especificación de nivel de apoyo, perfil cognitivo completo', cons: 'Requiere evaluador certificado, varias sesiones presenciales, mayor inversión económica.', verdict: 'Estándar de oro. Es el método con mayor evidencia científica para diagnóstico de TEA.' },
];

const fullBattery = [
  { test: 'ADOS-2', what: 'Observación directa de comunicación social y conductas restringidas/repetitivas', why: 'Es el eje central del diagnóstico. Genera la puntuación de corte para autismo.' },
  { test: 'ADI-R', what: 'Entrevista diagnóstica estructurada con los padres sobre historia del desarrollo', why: 'Complementa el ADOS-2 con información retrospectiva desde los primeros años de vida.' },
  { test: 'WISC-V', what: 'Evaluación de inteligencia y perfil cognitivo (atención, memoria de trabajo, velocidad, razonamiento)', why: 'Determina si hay discapacidad intelectual asociada y el perfil de fortalezas/debilidades cognitivas.' },
  { test: 'Vineland-3', what: 'Evaluación de conducta adaptativa (comunicación, socialización, vida diaria, motricidad)', why: 'Mide el funcionamiento real vs. la capacidad intelectual. Clave para determinar el nivel de apoyo.' },
  { test: 'SRS-2', what: 'Escala de respuesta social — cuestionario para padres y maestros', why: 'Cuantifica la gravedad de las dificultades sociales desde la perspectiva del entorno cotidiano.' },
];

const supportLevels = [
  { level: 'Nivel 1', name: 'Necesita apoyo', desc: 'Dificultades notables en comunicación social sin apoyo. Inflexibilidad en conducta causa interferencia significativa. Puede parecer "diferente" pero se comunica verbalmente.', formerly: 'Antes llamado "Asperger"', accent: 'border-accent-blue/40 bg-accent-blue/5' },
  { level: 'Nivel 2', name: 'Necesita apoyo sustancial', desc: 'Déficits marcados en comunicación verbal y no verbal. Dificultades sociales evidentes incluso con apoyo. Conductas restringidas frecuentes y visibles.', formerly: 'Autismo "clásico" moderado', accent: 'border-warning/40 bg-warning/5' },
  { level: 'Nivel 3', name: 'Necesita apoyo muy sustancial', desc: 'Déficits severos en comunicación. Inicio muy limitado de interacciones sociales. Respuesta mínima a intentos de otros. Conductas restringidas interfieren marcadamente.', formerly: 'Autismo severo', accent: 'border-rose-400/40 bg-rose-50 dark:bg-rose-500/5' },
];

const myths = [
  { myth: '"Si habla bien, no puede ser autismo"', reality: 'El autismo nivel 1 (antes "Asperger") se caracteriza por lenguaje fluido. Las dificultades están en la comunicación social: entender doble sentido, leer expresiones faciales, reciprocidad en conversación. Hablar bien no descarta autismo.' },
  { myth: '"Si tiene amigos, no es autista"', reality: 'Muchos niños con TEA quieren tener amigos pero les cuesta mantener las relaciones. Otros tienen un amigo cercano pero no navegan bien los grupos. La calidad de la interacción social importa más que la cantidad.' },
  { myth: '"Es muy cariñoso conmigo, no puede ser autismo"', reality: 'El autismo no significa ausencia de afecto. Muchos niños con TEA son muy cariñosos con su familia directa. Lo que evalúa el ADOS-2 es la comunicación social recíproca con personas fuera de su círculo íntimo.' },
  { myth: '"El autismo se cura con terapia"', reality: 'El autismo es una condición del neurodesarrollo, no una enfermedad. No se "cura" — pero con el diagnóstico correcto y las intervenciones adecuadas, la calidad de vida mejora significativamente. El diagnóstico temprano es el factor que más impacta.' },
  { myth: '"Un pediatra puede diagnosticar autismo en una consulta"', reality: 'Un pediatra puede sospechar y referir, pero el diagnóstico de TEA requiere evaluación especializada con instrumentos como el ADOS-2. Una consulta de 20 minutos no puede sustituir una evaluación de varias sesiones con pruebas estandarizadas.' },
];

const faqItems = [
  { q: '¿A qué edad se puede aplicar el ADOS-2?', a: 'El ADOS-2 puede aplicarse desde los 12 meses (módulo Toddler para bebés) y hasta la edad adulta (módulo 4). En la práctica clínica, el diagnóstico formal con mayor confiabilidad se logra a partir de los 2-3 años. Sin embargo, nunca es tarde para evaluar — adolescentes y adultos también pueden ser evaluados con el módulo correspondiente.' },
  { q: '¿Quién puede aplicar el ADOS-2?', a: 'El ADOS-2 debe ser aplicado por un profesional con entrenamiento específico en el instrumento. No cualquier psicólogo o neuropsicólogo puede aplicarlo — requiere certificación o formación especializada en su administración y calificación. La Neuropsicóloga Karen Trujillo tiene formación específica en la aplicación del ADOS-2.' },
  { q: '¿El ADOS-2 solo es suficiente para diagnosticar autismo?', a: 'El ADOS-2 es la pieza central, pero las guías clínicas recomiendan complementarlo con historia del desarrollo (ADI-R), evaluación cognitiva (WISC-V), conducta adaptativa (Vineland-3) y evaluación social (SRS-2). Este abordaje multiinstrumento permite un diagnóstico diferencial preciso y la especificación del nivel de apoyo.' },
  { q: '¿Cuánto cuesta una evaluación de autismo con ADOS-2 en Cancún?', a: 'La evaluación completa de autismo tiene un costo de $8,500 MXN. Incluye todas las sesiones (5-6 citas presenciales en 3-4 semanas), batería completa (ADOS-2, ADI-R, WISC-V, Vineland-3, SRS-2), informe clínico detallado con nivel de apoyo especificado y sesión de devolución de resultados.' },
  { q: '¿Qué incluye el informe de la evaluación de autismo?', a: 'El informe incluye: diagnóstico con código CIE-10/DSM-5, nivel de apoyo especificado (1, 2 o 3), perfil cognitivo completo, perfil de conducta adaptativa, análisis de fortalezas y áreas de necesidad, y recomendaciones detalladas para intervención escolar, terapéutica y familiar. Tiene validez oficial respaldada por cédula profesional federal.' },
  { q: '¿Puede el ADOS-2 dar un "falso negativo"?', a: 'El ADOS-2 tiene una sensibilidad superior al 90%, pero ningún instrumento es infalible. Por eso se complementa con ADI-R, Vineland-3 y la historia clínica. Las niñas y personas con alto CI son las poblaciones con mayor riesgo de falso negativo porque tienden a "camuflar" las dificultades sociales (masking).' },
];

const relatedResources = [
  { href: '/blog/senales-tdah-ninos', icon: Users, category: 'TDAH Infantil', title: '¿Tu hijo no pone atención? Señales reales de TDAH vs. comportamiento típico', color: 'from-accent-blue/10 to-accent-blue/5' },
  { href: '/blog/tdah-adultos-diagnostico-tardio', icon: Briefcase, category: 'TDAH Adultos', title: 'TDAH en adultos: por qué miles llegan al diagnóstico después de los 30', color: 'from-primary/10 to-primary/5' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Article', '@id': 'https://psicologakarentrujillo.com.mx/blog/que-es-ados-2-autismo/#article', headline: '¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?', description: 'Guía completa sobre el ADOS-2: qué evalúa, cómo se aplica, sus 4 módulos, y por qué supera cualquier otro método diagnóstico para TEA.', image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp', datePublished: '2025-06-29', dateModified: '2025-06-29', author: { '@type': 'Person', '@id': 'https://psicologakarentrujillo.com.mx/#physician', name: 'Karen Trujillo', jobTitle: 'Neuropsicóloga Clínica', url: 'https://psicologakarentrujillo.com.mx' }, publisher: { '@type': 'Organization', '@id': 'https://psicologakarentrujillo.com.mx/#clinic', name: 'Neuropsicóloga Karen Trujillo', url: 'https://psicologakarentrujillo.com.mx' }, mainEntityOfPage: 'https://psicologakarentrujillo.com.mx/blog/que-es-ados-2-autismo', inLanguage: 'es-MX', about: { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista', sameAs: 'https://www.wikidata.org/wiki/Q38404' } },
    { '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://psicologakarentrujillo.com.mx' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://psicologakarentrujillo.com.mx/blog' }, { '@type': 'ListItem', position: 3, name: 'ADOS-2 y autismo', item: 'https://psicologakarentrujillo.com.mx/blog/que-es-ados-2-autismo' } ] },
    { '@type': 'FAQPage', mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ],
};

function SectionReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } }, { rootMargin: '-80px' }); observer.observe(el); return () => observer.disconnect(); }, []);
  return (<div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}s`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>{children}</div>);
}

export default function QueEsAdos2Autismo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  useEffect(() => { const handleScroll = () => { const heroHeight = 500; const ctaFinal = document.getElementById('cta-evaluacion'); const ctaTop = ctaFinal?.getBoundingClientRect().top ?? Infinity; setShowStickyCta(window.scrollY > heroHeight && ctaTop > window.innerHeight); }; window.addEventListener('scroll', handleScroll, { passive: true }); handleScroll(); return () => window.removeEventListener('scroll', handleScroll); }, []);

  return (
    <>
      <Head>
        <title>¿Qué es el ADOS-2? Estándar de oro para diagnosticar autismo | Neuropsicóloga Karen Trujillo</title>
        <meta name="description" content="El ADOS-2 es la prueba más confiable del mundo para diagnosticar autismo (TEA). Conoce qué evalúa, cómo se aplica y por qué supera a los cuestionarios y entrevistas. Evaluación con ADOS-2 en Cancún." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/blog/que-es-ados-2-autismo" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?" />
        <meta property="og:description" content="Guía completa sobre el ADOS-2: qué evalúa, sus 4 módulos, y por qué es el instrumento más confiable para diagnosticar Trastorno del Espectro Autista." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx/blog/que-es-ados-2-autismo" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2025-06-29" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¿Qué es el ADOS-2? Estándar de oro para autismo | Karen Trujillo" />
        <meta name="twitter:description" content="Guía completa sobre la prueba más confiable del mundo para diagnosticar autismo. Qué evalúa, cómo se aplica y por qué importa." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }` }} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />
        <main className="w-full min-w-0 overflow-x-hidden">

          {/* HERO */}
          <section className="relative pt-28 pb-14 sm:pb-20 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-pink/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8 animate-[fadeIn_0.8s_ease-out_both]" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1"><ArrowLeft className="w-3 h-3" />Inicio</Link>
                <span className="text-muted-foreground/40">/</span><span className="text-muted-foreground/40">Blog</span><span className="text-muted-foreground/40">/</span><span className="text-primary font-medium">Autismo (TEA)</span>
              </nav>
              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-accent-pink/15">
                  <BookOpen className="w-3.5 h-3.5 text-accent-pink" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground">Guía clínica · Basada en evidencia</span>
                </div>
                <h1 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-serif font-bold text-primary leading-[1.15] mb-5 text-balance">¿Qué es el ADOS-2?<br /><span className="text-primary/60">El estándar de oro para diagnosticar autismo</span></h1>
                <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl">Si buscas un diagnóstico confiable de Trastorno del Espectro Autista para tu hijo, necesitas entender por qué el ADOS-2 es el instrumento más respaldado por la ciencia — y por qué una evaluación sin él es incompleta.</p>
                <div className="flex items-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border shadow-md"><Image src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" alt="Neuropsicóloga Karen Trujillo" width={48} height={48} className="w-full h-full object-cover object-top" priority unoptimized /></div>
                  <div><p className="font-bold text-primary text-sm">Neuropsicóloga Karen Trujillo</p><div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-primary/40" /> Cédula 11009616</span><span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary/40" /> 13 min de lectura</span></div></div>
                </div>
              </div>
            </div>
          </section>

          {/* TABLE OF CONTENTS */}
          <section className="py-8 bg-card border-b border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer py-2"><span className="flex items-center gap-2 text-sm font-bold text-primary"><ListChecks className="w-4 h-4 text-accent-blue" />Contenido de esta guía</span><ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" /></summary>
                  <nav className="pt-3 pb-1 space-y-1.5">
                    {[{ href: '#que-es', label: '¿Qué es el ADOS-2 y qué evalúa?' },{ href: '#modulos', label: 'Los 4 módulos del ADOS-2' },{ href: '#por-que-gold', label: '5 razones por las que es estándar de oro' },{ href: '#vs-otros', label: 'ADOS-2 vs. otros métodos diagnósticos' },{ href: '#bateria', label: 'La batería completa de evaluación' },{ href: '#niveles', label: 'Niveles de apoyo en autismo' },{ href: '#mitos', label: '5 mitos sobre autismo y diagnóstico' },{ href: '#faq-blog', label: 'Preguntas frecuentes' }].map((item) => (
                      <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="block pl-6 py-1.5 text-sm text-muted-foreground hover:text-primary font-light border-l-2 border-border hover:border-accent-blue transition-all">{item.label}</a>
                    ))}
                  </nav>
                </details>
              </SectionReveal>
            </div>
          </section>

          {/* QUÉ ES */}
          <section id="que-es" className="py-12 sm:py-16 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="prose-custom">
                  <p className="text-muted-foreground font-light leading-relaxed text-base sm:text-lg mb-6">ADOS-2 son las siglas de <strong className="text-primary font-semibold">Autism Diagnostic Observation Schedule, Second Edition</strong> (Escala de Observación para el Diagnóstico del Autismo). Es un instrumento de evaluación semiestructurado en el que el profesional <em className="text-primary font-medium">observa directamente</em> la comunicación social, la interacción y las conductas restringidas o repetitivas de la persona evaluada.</p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-6">A diferencia de los cuestionarios que llenan los padres o las entrevistas clínicas, el ADOS-2 no depende de lo que alguien recuerda o interpreta — <strong className="text-primary font-semibold">observa el comportamiento real en tiempo real</strong>. Le presenta al niño (o adulto) situaciones sociales diseñadas y mide cómo responde, con criterios de puntuación objetivos y un algoritmo diagnóstico validado.</p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">Por eso las guías clínicas internacionales lo consideran el &ldquo;estándar de oro&rdquo;: es el instrumento con mayor evidencia científica para el diagnóstico de Trastorno del Espectro Autista (TEA) a nivel mundial.</p>
                </div>
              </SectionReveal>
            </div>
          </section>

          {/* MÓDULOS */}
          <section id="modulos" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Adaptado a cada persona</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Los 4 módulos del ADOS-2</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">El evaluador selecciona el módulo según la edad y el nivel de lenguaje. No es un test único — es un sistema que se adapta a la persona.</p>
              </SectionReveal>
              <div className="space-y-4">
                {adosModules.map((mod, i) => (
                  <SectionReveal key={mod.module} delay={i * 0.08}>
                    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-accent-blue/30 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl border-2 ${mod.accent} flex items-center justify-center shrink-0`}><span className="text-sm font-bold">{i + 1}</span></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap"><h3 className="font-bold text-primary text-base">{mod.module}</h3><span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 bg-secondary px-2.5 py-0.5 rounded-full border border-border">{mod.age}</span></div>
                          <p className="text-sm text-primary/70 font-medium mb-2">{mod.target}</p>
                          <p className="text-sm text-muted-foreground font-light leading-relaxed">{mod.method}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
              <SectionReveal delay={0.4}>
                <div className="mt-8 bg-primary/5 border border-primary/15 rounded-2xl p-5 sm:p-6"><div className="flex items-start gap-3"><Lightbulb className="w-5 h-5 text-primary/50 shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground font-light leading-relaxed"><strong className="text-primary font-medium">¿Quién elige el módulo?</strong> El neuropsicólogo lo determina antes de la sesión, basándose en la edad cronológica y el nivel de lenguaje expresivo del niño. Si el módulo inicial no es el adecuado, se puede ajustar durante la evaluación.</p></div></div>
              </SectionReveal>
            </div>
          </section>

          {/* POR QUÉ GOLD STANDARD */}
          <section id="por-que-gold" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">La evidencia</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Por qué el ADOS-2 es el estándar de oro?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">No es marketing — es el consenso de la comunidad científica internacional. Estas son las 5 razones.</p>
              </SectionReveal>
              <div className="space-y-4">
                {whyGoldStandard.map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-4 p-5 sm:p-6 bg-secondary/50 rounded-2xl border border-border hover:border-accent-blue/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/15 to-primary/10 border border-accent-blue/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"><item.icon className="w-5 h-5 text-primary/60" /></div>
                      <div><h3 className="font-bold text-primary mb-1.5">{item.title}</h3><p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p></div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* VS OTROS MÉTODOS */}
          <section id="vs-otros" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Comparativa</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">ADOS-2 vs. otros métodos de diagnóstico</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">No todos los caminos al diagnóstico son iguales. Esta es la diferencia entre métodos.</p>
              </SectionReveal>
              <div className="space-y-4">
                {vsOtherMethods.map((item, i) => {
                  const isGold = i === vsOtherMethods.length - 1;
                  return (
                    <SectionReveal key={item.method} delay={i * 0.1}>
                      <div className={`bg-card border-2 rounded-2xl overflow-hidden transition-all duration-300 ${isGold ? 'border-success/50 shadow-lg shadow-success/10' : 'border-border hover:border-accent-blue/30'}`}>
                        <div className={`px-5 sm:px-6 py-4 border-b flex items-center justify-between ${isGold ? 'border-success/30 bg-success/5' : 'border-border'}`}>
                          <h3 className="font-bold text-primary text-base">{item.method}</h3>
                          {isGold && <span className="text-[9px] font-bold uppercase tracking-widest text-success bg-success/10 px-3 py-1 rounded-full border border-success/20 flex items-center gap-1"><Star className="w-3 h-3 fill-success" /> Estándar de oro</span>}
                        </div>
                        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                          <div className="px-5 sm:px-6 py-4"><p className="text-[9px] font-bold uppercase tracking-widest text-success mb-2">Ventajas</p><p className="text-sm text-muted-foreground font-light leading-relaxed">{item.pros}</p></div>
                          <div className="px-5 sm:px-6 py-4"><p className="text-[9px] font-bold uppercase tracking-widest text-rose-500 mb-2">Limitaciones</p><p className="text-sm text-muted-foreground font-light leading-relaxed">{item.cons}</p></div>
                          <div className={`px-5 sm:px-6 py-4 ${isGold ? 'bg-success/3' : 'bg-secondary/30'}`}><p className="text-[9px] font-bold uppercase tracking-widest text-primary/50 mb-2">Veredicto</p><p className={`text-sm font-light leading-relaxed ${isGold ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{item.verdict}</p></div>
                        </div>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* BATERÍA COMPLETA */}
          <section id="bateria" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Evaluación integral</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">La batería completa: no solo ADOS-2</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">El ADOS-2 es el eje central, pero un diagnóstico completo de autismo requiere complementarlo con estos instrumentos.</p>
              </SectionReveal>
              <div className="space-y-3">
                {fullBattery.map((item, i) => (
                  <SectionReveal key={item.test} delay={i * 0.06}>
                    <div className="bg-secondary/50 border border-border rounded-2xl p-5 sm:p-6 hover:border-accent-blue/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/10 to-primary/10 border border-primary/15 flex items-center justify-center shrink-0"><Brain className="w-4 h-4 text-primary/50" /></div>
                        <div>
                          <div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-primary text-sm">{item.test}</h3>{item.test === 'ADOS-2' && <span className="text-[8px] font-bold uppercase tracking-widest text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">Eje central</span>}</div>
                          <p className="text-sm text-primary/60 font-medium mb-1">{item.what}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.why}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* NIVELES DE APOYO */}
          <section id="niveles" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">El espectro</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Los 3 niveles de apoyo en autismo</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">Desde 2013, el DSM-5 clasifica el autismo por nivel de apoyo necesario — no por &ldquo;tipo&rdquo; o gravedad. El informe especifica cuál aplica.</p>
              </SectionReveal>
              <div className="grid sm:grid-cols-3 gap-4">
                {supportLevels.map((item, i) => (
                  <SectionReveal key={item.level} delay={i * 0.1}>
                    <div className={`border-2 rounded-2xl p-5 sm:p-6 h-full flex flex-col ${item.accent}`}>
                      <div className="mb-4"><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-1">{item.level}</p><h3 className="font-bold text-primary text-base">{item.name}</h3></div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4 flex-1">{item.desc}</p>
                      <div className="pt-3 border-t border-border/50"><p className="text-[10px] text-muted-foreground/60 italic">{item.formerly}</p></div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
              <SectionReveal delay={0.35}>
                <div className="mt-8 bg-warning/5 border border-warning/15 rounded-2xl p-5 sm:p-6"><div className="flex items-start gap-3"><HelpCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground font-light leading-relaxed"><strong className="text-primary font-medium">¿Ya no se dice &ldquo;Asperger&rdquo;?</strong> Correcto. Desde el DSM-5 (2013), el síndrome de Asperger se integró dentro del Trastorno del Espectro Autista nivel 1. El término clínico actual es TEA con especificación de nivel de apoyo. El informe de evaluación siempre incluye esta especificación.</p></div></div>
              </SectionReveal>
            </div>
          </section>

          {/* MITOS */}
          <section id="mitos" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Derribando mitos</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center">5 mitos sobre autismo y diagnóstico</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">Creencias que retrasan el diagnóstico o generan falsas expectativas.</p>
              </SectionReveal>
              <div className="space-y-4">
                {myths.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="bg-secondary/50 border border-border rounded-2xl p-5 sm:p-6 hover:border-accent-blue/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/25 flex items-center justify-center shrink-0"><XCircle className="w-3.5 h-3.5 text-rose-500" /></div>
                        <p className="font-bold text-primary text-sm leading-snug pt-1">{item.myth}</p>
                      </div>
                      <div className="pl-10"><div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground font-light leading-relaxed"><strong className="text-primary font-medium">Realidad:</strong> {item.reality}</p></div></div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* QUÉ HACER */}
          <section className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/50 mb-3 text-center">El siguiente paso</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-center">¿Tu hijo se relaciona de forma diferente?</h2>
                <p className="text-primary-foreground/70 font-light text-center max-w-xl mx-auto mb-10">Si las preocupaciones son sobre comunicación social, contacto visual, juego repetitivo o intereses muy focalizados — una evaluación con ADOS-2 te da respuestas concretas.</p>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className="space-y-4 mb-10">
                  {[{ step: '1', text: 'Observa si tu hijo tiene dificultad para interactuar con otros niños de su edad — no solo con adultos o familia directa.' },{ step: '2', text: 'Pregúntate si hay conductas repetitivas, intereses muy restringidos o resistencia intensa a cambios en la rutina.' },{ step: '3', text: 'Agenda una evaluación de autismo con ADOS-2. Es el único método que observa directamente la comunicación social con criterios estandarizados.' }].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 bg-white/8 border border-white/12 rounded-xl p-4"><div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0"><span className="text-sm font-bold text-primary-foreground">{item.step}</span></div><p className="text-sm text-primary-foreground/80 font-light leading-relaxed pt-1">{item.text}</p></div>
                  ))}
                </div>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <div className="text-center">
                  <Link href="/evaluacion-autismo-cancun" className="group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-8 py-4 rounded-2xl bg-white text-primary shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300">Ver evaluación de autismo<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
                  <p className="text-primary-foreground/50 text-xs font-light mt-4">$8,500 MXN · 5-6 sesiones · ADOS-2 + batería completa</p>
                </div>
              </SectionReveal>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq-blog" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal><h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">Preguntas frecuentes</h2></SectionReveal>
              <div className="space-y-2">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div className={`bg-secondary/50 border-2 rounded-2xl transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-primary/50 shadow-lg shadow-primary/8' : 'border-border hover:border-accent-blue/30 hover:shadow-sm'}`}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-blog-${i}`} className="w-full p-5 sm:p-6 flex justify-between items-center gap-4 text-left cursor-pointer">
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? 'border-primary bg-primary/10' : 'border-border'}`}><ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} /></div>
                      </button>
                      <div id={`faq-blog-${i}`} role="region" className="grid transition-all duration-300" style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr', opacity: openFaq === i ? 1 : 0, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
                        <div className="overflow-hidden"><div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-border/50 pt-4"><p className="text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p></div></div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* RELATED */}
          <section className="py-12 sm:py-16 bg-secondary/50 border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal><p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Sigue aprendiendo</p><h2 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-8 text-center">Recursos relacionados</h2></SectionReveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedResources.map((resource, i) => (
                  <SectionReveal key={resource.href} delay={i * 0.08}>
                    <Link href={resource.href} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-blue/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                      <div className={`h-1.5 bg-gradient-to-r ${resource.color}`} />
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-3"><resource.icon className="w-3.5 h-3.5 text-primary/40" /><span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{resource.category}</span></div>
                        <h3 className="font-bold text-primary text-sm leading-snug mb-3 group-hover:text-primary/80 transition-colors">{resource.title}</h3>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary group-hover:gap-2 transition-all">Leer más <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" /></span>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* CTA FINAL */}
          <section id="cta-evaluacion" className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-8"><h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">Un diagnóstico claro cambia todo</h2><p className="text-muted-foreground font-light max-w-xl mx-auto">Saber el nivel de apoyo exacto, las fortalezas y las necesidades de tu hijo te da una hoja de ruta concreta. La evaluación con ADOS-2 es el primer paso.</p></div>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className="bg-secondary/50 border-2 border-border rounded-2xl p-6 sm:p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border shadow-md shrink-0"><Image src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" alt="Neuropsicóloga Karen Trujillo" width={48} height={48} className="w-full h-full object-cover object-top" loading="lazy" unoptimized /></div>
                    <div><p className="font-bold text-primary">Neuropsicóloga Karen Trujillo</p><div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1"><span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-primary/40" /> Cédula 11009616</span><span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" /> 47+ reseñas · 5.0</span></div></div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    {[{ label: 'Pruebas', value: 'ADOS-2, ADI-R, WISC-V, Vineland-3, SRS-2' },{ label: 'Duración', value: '5-6 sesiones · 3-4 semanas' },{ label: 'Inversión', value: '$8,500 MXN todo incluido' }].map((item) => (
                      <div key={item.label} className="bg-card border border-border rounded-xl p-3 text-center"><p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-1">{item.label}</p><p className="text-xs font-medium text-primary">{item.value}</p></div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/evaluacion-autismo-cancun" className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"><Stethoscope className="w-4 h-4" />Ver evaluación completa<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
                    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu guía sobre el ADOS-2 y me gustaría agendar una evaluación de autismo para mi hijo.')}`} target="_blank" rel="noopener noreferrer" className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"><MessageCircle className="w-4 h-4" />Agendar por WhatsApp</a>
                  </div>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><ShieldCheck className="w-3.5 h-3.5 text-primary/50" /> Cancelación con 48 hrs</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><ShieldCheck className="w-3.5 h-3.5 text-primary/50" /> Reembolso del anticipo</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><BadgeCheck className="w-3.5 h-3.5 text-primary/50" /> Validez oficial SEP e IMSS</span>
                </div>
              </SectionReveal>
            </div>
          </section>

        </main>

        <Footer />

        {/* STICKY CTA — Mobile */}
        <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
            <div className="flex gap-2.5 max-w-lg mx-auto">
              <Link href="/evaluacion-autismo-cancun" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-md active:scale-[0.97] transition-all"><Puzzle className="w-4 h-4" />Evaluar TEA</Link>
              <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu guía sobre ADOS-2 y me gustaría orientación sobre la evaluación de autismo.')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-whatsapp text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-[0.97]"><MessageCircle className="w-4 h-4" />WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
