import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  CheckCircle2, ChevronDown, MessageCircle, ArrowRight,
  Shield, BadgeCheck, Clock, CreditCard,
  Brain, Puzzle, Users, Briefcase, FileText, Heart, Monitor,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { waUrl } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const CANONICAL_URL = `${SITE_URL}/precios`;

const evaluaciones = [
  {
    id: 'tdah-ninos',
    icon: Users,
    badge: 'TDAH Infantil',
    badgeColor: 'bg-accent-blue/20 text-primary',
    title: 'Valoración TDAH en Niños',
    edad: 'Niños de 5 a 17 años',
    precio: '$8,300 MXN',
    duracion: '2–3 semanas · 5 sesiones',
    href: '/evaluacion-tdah-ninos',
    instrumentos: ['CONNERS', 'EDAH', 'WISC-V', 'CUMANIN', 'CDI y Spence'],
    incluye: [
      'Entrevista clínica con padres y/o tutores',
      'Evaluación directa con el niño (múltiples sesiones)',
      'Cuestionarios para padres y maestros',
      'Informe clínico completo con perfil neuropsicológico',
      'Sesión de devolución con recomendaciones escolares',
      'Validez oficial ante SEP, IMSS e instituciones educativas',
    ],
  },
  {
    id: 'tdah-adultos',
    icon: Briefcase,
    badge: 'TDAH Adultos',
    badgeColor: 'bg-accent-sand text-primary',
    title: 'Valoración TDAH en Adultos',
    edad: 'Desde 18 años',
    precio: '$8,300 MXN',
    duracion: '2–3 semanas · 5 sesiones',
    href: '/evaluacion-tdah-adultos',
    instrumentos: ['DIVA 2.0', 'Conners Adultos', 'Cribado TDAH', 'IDARE', 'Inventario Depresión'],
    incluye: [
      'Entrevista clínica estructurada (historia de vida y síntomas)',
      'Aplicación de batería de pruebas neuropsicológicas',
      'Diagnóstico diferencial (TDAH vs ansiedad, depresión, burnout)',
      'Informe clínico con perfil cognitivo y ejecutivo detallado',
      'Sesión de devolución con plan de intervención concreto',
      'Validez oficial ante empleadores e instituciones',
    ],
  },
  {
    id: 'tea',
    icon: Puzzle,
    badge: 'Autismo (TEA)',
    badgeColor: 'bg-accent-pink/25 text-primary',
    title: 'Evaluación de Autismo (TEA)',
    edad: 'Niños y adolescentes',
    precio: '$8,500 MXN',
    duracion: '2–3 semanas · 5 sesiones',
    href: '/evaluacion-autismo-cancun',
    instrumentos: ['ADOS-2', 'ADI-R', 'AQ-10', 'WISC-V'],
    incluye: [
      'Observación estructurada directa (ADOS-2 — estándar de oro)',
      'Entrevista diagnóstica a padres/tutores (ADI-R)',
      'Evaluación de funcionamiento cognitivo (WISC-V)',
      'Evaluación de conducta adaptativa (Vineland-3)',
      'Informe con nivel de apoyo según criterios DSM-5',
      'Sesión de devolución con plan de acompañamiento familiar',
      'Validez ante SEP, IMSS e instituciones de apoyo',
    ],
  },
  {
    id: 'combo',
    icon: Brain,
    badge: 'Paquete Completo',
    badgeColor: 'bg-primary/10 text-primary',
    title: 'Valoración Completa TDAH + Autismo',
    edad: 'Evaluación integral combinada',
    precio: '$10,500 MXN',
    duracion: '3–4 semanas · 7 sesiones',
    href: '/evaluacion-autismo-cancun',
    instrumentos: ['ADOS-2', 'ADI-R', 'CONNERS', 'WISC-V', 'DIVA 2.0', 'AQ-10'],
    incluye: [
      'Proceso completo de valoración TDAH (infantil o adultos)',
      'Proceso completo de diagnóstico de Autismo (TEA)',
      'Informe neuropsicológico integrado con ambos diagnósticos',
      'Diagnóstico diferencial y de comorbilidades',
      'Sesión de devolución ampliada con plan de intervención',
      'Ahorro de $6,100 MXN vs. contratar ambas valoraciones por separado',
    ],
  },
];

const politicasPago = [
  {
    icon: CreditCard,
    title: 'Anticipo al agendar',
    desc: 'Anticipo de $1,000 MXN (TDAH) o $1,500 MXN (TEA) al confirmar la cita. Forma parte del costo total — no es un cargo adicional.',
  },
  {
    icon: FileText,
    title: 'Saldo al entregar',
    desc: 'El saldo restante se liquida al entregar el informe en la sesión de devolución.',
  },
  {
    icon: Shield,
    title: 'Métodos de pago',
    desc: 'Efectivo y transferencia bancaria (SPEI). No se acepta tarjeta de crédito/débito en consultorio.',
  },
  {
    icon: Clock,
    title: 'Cancelaciones',
    desc: 'El anticipo es 100% reembolsable si cancelas con 48 horas de anticipación. Fuera de plazo se aplica como crédito para reagendar.',
  },
  {
    icon: BadgeCheck,
    title: 'Entrega del informe',
    desc: 'El informe clínico se entrega en mano durante la sesión de devolución. Se puede emitir copia digital adicional sin costo.',
  },
  {
    icon: MessageCircle,
    title: 'Preguntas sobre costos',
    desc: 'Escríbeme directamente por WhatsApp para confirmar disponibilidad, costos actualizados y forma de pago.',
  },
];

const faqPrecios = [
  {
    q: '¿El precio incluye todas las sesiones?',
    a: 'Sí. El precio cubre la totalidad del proceso: entrevista inicial, todas las sesiones de aplicación de pruebas, el análisis de resultados, la redacción del informe clínico y la sesión de devolución. No hay costos adicionales ocultos.',
  },
  {
    q: '¿Se puede pagar en parcialidades?',
    a: 'Para valoraciones neuropsicológicas el esquema es dos pagos: un anticipo de $1,000 MXN (TDAH) o $1,500 MXN (TEA) al agendar, y el saldo restante al entregar el informe. Para sesiones psicológicas individuales se requiere pago total 2 días antes de la cita. En ningún caso se ofrecen más parcialidades.',
  },
  {
    q: '¿El informe tiene vigencia para usarse?',
    a: 'Los informes neuropsicológicos no tienen fecha de caducidad oficial, aunque la mayoría de instituciones los consideran válidos por 2-3 años. Para propósitos de adecuaciones curriculares anuales, puede requerirse actualización.',
  },
  {
    q: '¿Puedo deducir el costo en impuestos?',
    a: 'Sí. Se puede emitir recibo de honorarios (comprobante fiscal) a nombre de quien corresponda. Consulta con tu contador la aplicabilidad en tu caso particular.',
  },
  {
    q: '¿Existe algún descuento o beca?',
    a: 'En casos de vulnerabilidad económica comprobable, puedo evaluar opciones. Escríbeme directamente por WhatsApp para hablar sobre tu situación. El proceso de selección es personal y limitado.',
  },
  {
    q: '¿Cuál es la diferencia entre la valoración de TDAH y la de Autismo?',
    a: 'Aunque ambas tienen el mismo costo ($8,300 MXN), el proceso difiere. La valoración de TDAH evalúa atención, hiperactividad e impulsividad con instrumentos como CONNERS, EDAH y WISC-V. La de Autismo incluye la observación estructurada ADOS-2 (estándar de oro internacional), entrevista diagnóstica ADI-R y cribado AQ-10. Pueden realizarse de forma combinada con descuento en el Paquete Completo.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA
   ═══════════════════════════════════════════════════════════════ */
const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Precios de Evaluaciones Neuropsicológicas — Karen Trujillo Cancún',
  url: CANONICAL_URL,
  itemListElement: evaluaciones.map((ev, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Offer',
      name: ev.title,
      price: ev.precio.replace(/[^0-9]/g, ''),
      priceCurrency: 'MXN',
      url: `${SITE_URL}${ev.href}`,
      seller: {
        '@type': 'Person',
        name: 'Karen Trujillo',
        identifier: `Cédula Federal ${CEDULA}`,
      },
    },
  })),
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Precios() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Precios de Evaluaciones Neuropsicológicas en Cancún | Karen Trujillo</title>
        <meta name="description" content={`Costos de valoración de TDAH y diagnóstico de autismo (TEA) en Cancún. TDAH $8,300 MXN · TEA $8,500 MXN. Incluye todas las sesiones, pruebas e informe clínico. Cédula ${CEDULA}.`} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Precios — Neuropsicóloga Karen Trujillo Cancún" />
        <meta property="og:description" content="Valoración TDAH $8,300 MXN · Evaluación TEA $8,500 MXN. Precio todo incluido: sesiones, pruebas e informe oficial." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={KAREN_IMAGE} />
        <meta property="og:image:width" content="465" />
        <meta property="og:image:height" content="533" />
        <meta property="og:image:alt" content="Neuropsicóloga Karen Trujillo — Especialista en TDAH y Autismo en Cancún" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={KAREN_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary">
        <Navbar />
        <main>

          {/* ── Header ── */}
          <section className="pt-32 pb-16 px-6" style={{ backgroundColor: '#2b1f47' }}>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: 'rgba(208,208,231,0.65)' }}>
                Neuropsicóloga Karen Trujillo · Cancún · Cédula {CEDULA}
              </p>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                Inversión en el{' '}<br />diagnóstico correcto
              </h1>
              <p className="text-lg font-light mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Precio todo incluido: entrevista, pruebas estandarizadas, informe clínico con validez oficial y sesión de devolución.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Sin cobros ocultos',
                  'Informe con cédula federal',
                  'Validez ante SEP e IMSS',
                  'Reembolso si cancelas con 48 hrs',
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(208,208,231,0.9)', border: '1px solid rgba(208,208,231,0.2)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── Pricing cards ── */}
          <section className="py-16 sm:py-20 px-6 bg-secondary">
            <div className="max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {evaluaciones.map((ev) => (
                  <div key={ev.id} className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm hover:shadow-[0_16px_48px_-12px_rgba(56,47,81,0.14)] hover:-translate-y-1 transition-all duration-300">
                    {/* Card header */}
                    <div className="p-7 border-b border-border">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${ev.badgeColor}`}>{ev.badge}</span>
                      <h2 className="text-xl font-serif font-bold text-primary mb-1">{ev.title}</h2>
                      <p className="text-xs text-muted-foreground font-medium mb-5">{ev.edad}</p>
                      <p className="text-3xl font-serif font-bold text-primary">{ev.precio}</p>
                      <p className="text-xs text-muted-foreground mt-1">{ev.duracion}</p>
                    </div>

                    {/* Instrumentos */}
                    <div className="px-7 py-5 border-b border-border bg-secondary/30">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">Instrumentos</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ev.instrumentos.map((inst) => (
                          <span key={inst} className="text-[10px] font-bold px-2.5 py-1 rounded-md border border-border bg-card text-primary/70">
                            {inst}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Incluye */}
                    <div className="px-7 py-5 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">Incluye</p>
                      <ul className="space-y-2">
                        {ev.incluye.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTAs */}
                    <div className="px-7 py-5 border-t border-border space-y-2">
                      <a
                        href={waUrl(`Hola Karen, me interesa la ${ev.title}. ¿Podrías darme más información?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Agendar por WhatsApp
                      </a>
                      <Link
                        href={ev.href}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-border text-primary font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-all"
                      >
                        Ver proceso completo
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground/60 mt-8">
                Los precios son en pesos mexicanos (MXN) e incluyen IVA cuando aplica.{' '}
                <a href={waUrl('Hola Karen, ¿podrías confirmarme el precio actualizado de la valoración?')} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Confirmar precio actualizado por WhatsApp.</a>
              </p>
            </div>
          </section>

          {/* ── Sesiones psicológicas ── */}
          <section className="py-16 sm:py-20 px-6 bg-card border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3 text-center">Sesiones Psicológicas</h2>
              <p className="text-muted-foreground font-light text-center mb-12">Ansiedad, depresión, duelo, estrés, autoestima y manejo emocional. Presencial y virtual.</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Primera Consulta */}
                <div className="bg-secondary rounded-2xl border border-border p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/15 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary/70" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Primera consulta</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-primary">$800 <span className="text-base font-sans font-normal text-muted-foreground">MXN</span></p>
                  <p className="text-xs text-muted-foreground font-light">Sesión de evaluación inicial. Identificación de motivo de consulta y plan de tratamiento.</p>
                </div>

                {/* Sesión Presencial */}
                <div className="bg-secondary rounded-2xl border border-border p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-sand flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary/70" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Presencial</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-primary">$650 <span className="text-base font-sans font-normal text-muted-foreground">MXN</span></p>
                  <p className="text-xs text-muted-foreground font-light">Sesión individual en consultorio. Duración: 50–60 minutos.</p>
                </div>

                {/* Sesión Virtual */}
                <div className="bg-secondary rounded-2xl border border-border p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-pink/15 flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-primary/70" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Virtual</span>
                  </div>
                  <p className="text-3xl font-serif font-bold text-primary">$400 <span className="text-base font-sans font-normal text-muted-foreground">MXN</span></p>
                  <p className="text-xs text-muted-foreground font-light">Sesión individual por videollamada. Duración: 50–60 minutos.</p>
                </div>
              </div>

              {/* Paquetes */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 rounded-2xl border border-accent-blue/20 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">Paquete presencial</p>
                  <p className="text-2xl font-serif font-bold text-primary mb-1">$2,470 <span className="text-sm font-sans font-normal text-muted-foreground">MXN</span></p>
                  <p className="text-xs text-muted-foreground font-light mb-3">4 sesiones presenciales — pago total en una exhibición.</p>
                  <p className="text-xs text-success font-semibold">Ahorro de $130 vs. sesiones individuales</p>
                </div>
                <div className="bg-gradient-to-br from-accent-pink/10 to-accent-pink/5 rounded-2xl border border-accent-pink/20 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">Paquete virtual</p>
                  <p className="text-2xl font-serif font-bold text-primary mb-1">$1,520 <span className="text-sm font-sans font-normal text-muted-foreground">MXN</span></p>
                  <p className="text-xs text-muted-foreground font-light mb-3">4 sesiones virtuales — pago total en una exhibición.</p>
                  <p className="text-xs text-success font-semibold">Ahorro de $80 vs. sesiones individuales</p>
                </div>
              </div>

              {/* Certificado mascota */}
              <div className="bg-secondary rounded-2xl border border-border p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-primary mb-1">Certificado de Mascota de Apoyo Emocional</p>
                  <p className="text-xs text-muted-foreground font-light">Evaluación y emisión de certificado oficial. <strong className="text-primary">$2,500 MXN</strong> individual · <strong className="text-primary">$2,000 MXN</strong> en paquete.</p>
                </div>
                <a
                  href={`https://wa.me/529983211547?text=${encodeURIComponent('Hola Karen, me interesa el certificado de mascota de apoyo emocional.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors"
                >
                  Consultar <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Política para sesiones */}
              <div className="mt-8 p-6 rounded-xl border border-border bg-accent-sand/30">
                <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-4">Política de pago — sesiones psicológicas</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <CreditCard className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-primary mb-0.5">Pago total anticipado</p>
                      <p className="text-xs text-muted-foreground font-light">Se requiere pago completo con 2 días de anticipación vía transferencia o depósito.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-primary mb-0.5">Reagendación</p>
                      <p className="text-xs text-muted-foreground font-light">Solo con 24 horas de anticipación. La cita reagendada vence en 7 días.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <BadgeCheck className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-primary mb-0.5">Tolerancia</p>
                      <p className="text-xs text-muted-foreground font-light">Máximo 15 minutos de retraso. Fuera de este lapso la sesión se cancela sin reembolso.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Shield className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-primary mb-0.5">Comprobante</p>
                      <p className="text-xs text-muted-foreground font-light">Enviar captura del pago al WhatsApp <strong>998 321 1547</strong> para confirmar la cita.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descuento por reseña */}
              <div className="mt-4 p-6 rounded-xl border border-accent-blue/20 bg-accent-blue/5 flex flex-col sm:flex-row items-center gap-4">
                <div className="text-3xl shrink-0">⭐</div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-primary mb-1">10% de descuento en tu tercera consulta</p>
                  <p className="text-xs text-muted-foreground font-light">Deja una reseña en Facebook buscando <strong className="text-primary">&quot;Psicóloga Karen Trujillo&quot;</strong>, ve a Información → Recomendaciones, responde Sí y escribe tu comentario. Envía captura al WhatsApp para aplicar el beneficio (válido una sola vez).</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Política de pago ── */}
          <section className="py-16 sm:py-20 px-6 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3 text-center">Política de pago</h2>
              <p className="text-muted-foreground font-light text-center mb-2">Para valoraciones neuropsicológicas (TDAH y Autismo).</p>
              <p className="text-xs text-muted-foreground/60 font-light text-center mb-12">Para sesiones psicológicas individuales ver sección anterior.</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {politicasPago.map((pol) => (
                  <div key={pol.title} className="p-6 rounded-2xl border border-border bg-secondary/30 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center mb-4">
                      <pol.icon className="w-5 h-5 text-primary/60" />
                    </div>
                    <h3 className="font-bold text-primary mb-2 text-sm">{pol.title}</h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">{pol.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ precios ── */}
          <section className="py-16 sm:py-20 px-6 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">Preguntas sobre el costo</h2>

              <div role="list">
                {faqPrecios.map((faq, i) => (
                  <div key={i} role="listitem" style={{ borderBottom: i < faqPrecios.length - 1 ? '1px solid rgba(56,47,81,0.09)' : 'none' }}>
                    <button
                      id={`faq-btn-${i}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: openFaq === i ? '#5b4e7f' : '#382f51' }}
                    >
                      <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                      <ChevronDown
                        className="w-5 h-5 shrink-0 transition-transform duration-250"
                        style={{ color: '#5b4e7f', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        aria-hidden="true"
                      />
                    </button>
                    <div
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
                        <p className="text-sm leading-relaxed pb-5" style={{ color: '#515e71', lineHeight: '1.75', maxWidth: '70ch' }}>
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA final ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground/60 mb-3">
                Neuropsicóloga Karen Trujillo · Cancún
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">¿Lista para dar el primer paso?</h2>
              <p className="text-primary-foreground/75 font-light mb-8 max-w-lg mx-auto">
                Escríbeme por WhatsApp para confirmar disponibilidad, costos actualizados y agendar tu primera cita.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={waUrl('Hola Karen, vi la página de precios y quiero agendar una valoración. ¿Cuál es la disponibilidad?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp — Agendar
                </a>
                <Link
                  href="/#servicios"
                  className="inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all"
                  style={{ color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.3)' }}
                >
                  Ver servicios
                  <ArrowRight className="w-4 h-4" />
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
