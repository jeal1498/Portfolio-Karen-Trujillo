import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, MessageCircle, Phone, Clock,
  Star, CalendarCheck, ChevronDown, Shield, BadgeCheck,
  ShieldCheck, Brain,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════ */
const CAL_URL   = 'https://cal.com/psicologa-karen-trujillo/evaluacion-tdah-infantil';
const WA_NUMBER = '529983211547';
const WA_MSG    = encodeURIComponent('Hola Karen, vi tu página y quiero saber más antes de agendar.');
const TEL       = '529983211547';

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

/* 3 señales — suficiente para el reconocimiento, sin abrumar */
const signals = [
  'La maestra dice "no pone atención" — pero en casa tampoco termina nada',
  'Tareas de 15 min se convierten en batallas de una hora que desgastan a todos',
  'Sabes que algo no cuadra, pero sin un diagnóstico formal nadie en la escuela puede ayudarte',
];

/* Lo que incluye — solo el beneficio, sin jerga clínica */
const includes = [
  'Primera cita solo contigo — Karen escucha todo antes de conocer al niño',
  'Pruebas amigables para el niño (no es un interrogatorio)',
  'Cuestionarios a los maestros incluidos — contexto escolar real',
  'Informe clínico con diagnóstico diferencial y plan de acción',
  'Sesión de devolución: te explicamos qué encontramos en lenguaje claro',
  'Validez oficial ante SEP, IMSS y cualquier escuela en México',
];

/* Reviews — outcome badge primero */
const reviews = [
  {
    outcome: 'La escuela implementó adecuaciones en dos semanas',
    text: 'Llevábamos un año yendo de médico en médico sin un papel concreto. El informe de Karen fue tan claro que la directora llamó ella misma para coordinar.',
    who: 'Mamá de Sofía, 7 años',
  },
  {
    outcome: 'Por fin entendimos por qué las estrategias no funcionaban',
    text: 'Pensábamos que era flojera. El informe mostró que tiene memoria de trabajo muy baja — eso cambia todo. Ahora usamos estrategias que sí le sirven.',
    who: 'Papá de Diego, 10 años',
  },
  {
    outcome: 'De la culpa a tener un plan claro',
    text: 'Me quitó un peso enorme. No era que yo lo estuviera haciendo mal — era que nunca nos habían dado el mapa correcto. Ahora lo tenemos.',
    who: 'Mamá de Valentina, 6 años',
  },
];

/* Solo 4 FAQs — las objeciones reales antes del clic */
const faqs = [
  {
    q: '¿A qué me comprometo al reservar?',
    a: 'Solo a una primera cita contigo — sin pruebas todavía. El anticipo de $1,000 MXN aparta tu lugar y forma parte del total ($7,000 MXN). Si cancelas con 48 hrs de anticipación, se reembolsa completo.',
  },
  {
    q: '¿Cuánto cuesta todo y cómo se paga?',
    a: '$7,000 MXN en total. Al agendar solo pagas $1,000 MXN (ya incluido en el total). El resto ($6,000 MXN) se cubre antes de la sesión de devolución. Sin costos ocultos.',
  },
  {
    q: '¿Qué pasa si el resultado no indica TDAH?',
    a: 'El informe sigue siendo valioso. Puede revelar ansiedad, dificultades de aprendizaje, altas capacidades o simplemente cómo aprende mejor tu hijo. "No tiene TDAH" no es una respuesta vacía — es el inicio de las intervenciones correctas.',
  },
  {
    q: '¿Cuánto tiempo toma el proceso completo?',
    a: 'Entre 2 y 3 semanas, en 4-5 citas presenciales en Cancún. La primera es solo con los padres. Las sesiones con el niño son breves y amigables. El informe se entrega 5-7 días después de la última sesión.',
  },
];

/* ═══════════════════════════════════════════
   HELPERS UI
   ═══════════════════════════════════════════ */

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
}

function BookingCta({
  children = 'Reservar mi primera consulta',
  className = '',
  href,
  external = false,
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
}) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 bg-gradient-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest px-7 py-4 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ' +
    className;

  if (external && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        <CalendarCheck className="w-4 h-4 shrink-0" />
        {children}
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    );
  }

  return (
    <a href="#agendar" onClick={scrollTo('agendar')} className={base}>
      <CalendarCheck className="w-4 h-4 shrink-0" />
      {children}
      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.unobserve(el); } },
      { rootMargin: '-30px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function TDAHNinosSimple() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calVisible, setCalVisible] = useState(false);
  const [calLoaded, setCalLoaded]   = useState(false);
  const heroCTARef   = useRef<HTMLDivElement>(null);
  const calRef       = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  /* Sticky CTA visibility */
  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setHeroVisible(e.isIntersecting),
      { rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Lazy-load cal iframe */
  useEffect(() => {
    const el = calRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCalVisible(true); obs.unobserve(el); } },
      { rootMargin: '500px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Valoración TDAH Infantil en Cancún · Niños 5-17 | Karen Trujillo</title>
        <meta name="description" content="Entiende a tu hijo este ciclo escolar. Valoración neuropsicológica de TDAH en Cancún (5-17 años). Informe oficial con cédula 11009616. Agenda tu primera cita hoy." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos" />
        <meta name="geo.region"    content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position"  content="21.1619;-86.8515" />
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeInUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
          @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        ` }} />
      </Head>

      <div className="antialiased w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ─────────────────────────────────────────────────
              HERO — encima del pliegue, todo lo necesario
              Headline: identidad/dolor · CTA: primer paso
          ───────────────────────────────────────────────── */}
          <section className="relative flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-soft-gradient">
            {/* Atmosphere */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/15 rounded-full blur-[130px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/20 rounded-full blur-[110px] translate-y-1/2 -translate-x-1/4" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="max-w-2xl mx-auto relative z-10 text-center">

              {/* Availability pill */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-md mb-8"
                style={{ animation: 'fadeIn .6s ease-out both' }}
              >
                <span className="w-2 h-2 rounded-full bg-warning animate-pulse shrink-0" />
                <span className="text-[9px] uppercase tracking-[.12em] font-bold text-muted-foreground">Lugares disponibles · Cancún · Niños 5–17 años</span>
              </div>

              {/* ── HEADLINE ── beneficio emocional, no el servicio */}
              <h1
                className="text-[2.1rem] sm:text-5xl font-serif font-bold text-primary leading-[1.1] mb-5 text-balance"
                style={{ animation: 'fadeInUp .75s ease-out .1s both' }}
              >
                Deja de adivinar.<br />
                <span className="italic text-primary/70">Entiende a tu hijo.</span>
              </h1>

              {/* Sub — puente dolor → outcome */}
              <p
                className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-8 max-w-xl mx-auto"
                style={{ animation: 'fadeInUp .75s ease-out .2s both' }}
              >
                Una valoración neuropsicológica formal en Cancún te da un diagnóstico claro,
                un informe que la escuela respeta y un plan de acción — no más suposiciones.
              </p>

              {/* ── CTA ── primer paso, sin compromiso */}
              <div
                ref={heroCTARef}
                className="flex flex-col items-center gap-2 mb-10"
                style={{ animation: 'fadeInUp .75s ease-out .3s both' }}
              >
                <BookingCta className="text-sm px-8 py-5">
                  Reservar mi primera consulta
                </BookingCta>
                {/* Micro-copy — elimina ansiedad del clic */}
                <p className="text-[11px] text-muted-foreground/55 font-light">
                  Sin compromiso · Cancelas con 48 hrs y te devolvemos el anticipo
                </p>
              </div>

              {/* Secondary CTA — para los que aún dudan */}
              <div style={{ animation: 'fadeIn .8s ease-out .45s both' }}>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-dashed border-muted-foreground/30 pb-0.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Tengo una duda — prefiero preguntar primero
                </a>
              </div>

              {/* Trust strip */}
              <div
                className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-muted-foreground"
                style={{ animation: 'fadeIn .8s ease-out .55s both' }}
              >
                {[
                  { icon: BadgeCheck,  label: 'Cédula Federal 11009616' },
                  { icon: Shield,      label: 'Válido ante SEP e IMSS' },
                  { icon: Clock,       label: '7+ años de experiencia' },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-primary/40" />
                    <span className="font-medium">{label}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>


          {/* ─────────────────────────────────────────────────
              SEÑALES — Reconocimiento rápido (P del PAS)
              3 bullets, sin checker ni agitación extendida
          ───────────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-secondary border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <Reveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">¿Te suena familiar?</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-8 text-center text-balance">
                  Muchos padres llegan aquí<br className="hidden sm:block" /> después de meses de incertidumbre
                </h2>
              </Reveal>

              <div className="space-y-3 mb-8">
                {signals.map((s, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border">
                      <span className="w-5 h-5 rounded-full bg-accent-blue/15 border border-accent-blue/25 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-black text-accent-blue">{i + 1}</span>
                      </span>
                      <p className="text-sm text-foreground font-light leading-snug">{s}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.25}>
                <div className="text-center">
                  <BookingCta />
                </div>
              </Reveal>
            </div>
          </section>


          {/* ─────────────────────────────────────────────────
              QUÉ INCLUYE — El producto tangible
              Lista limpia + precio claro = objeción resuelta
          ───────────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <Reveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Lo que recibes</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2 text-center">
                  Valoración completa.<br className="hidden sm:block" /> Sin sorpresas.
                </h2>
                <p className="text-muted-foreground font-light text-center text-sm mb-8">
                  $7,000 MXN · 4-5 citas · Informe clínico oficial
                </p>
              </Reveal>

              <div className="space-y-2.5 mb-8">
                {includes.map((item, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl border border-border hover:border-primary/20 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground font-light leading-snug">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Instruments — compacto, no técnico */}
              <Reveal delay={0.3}>
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3 mb-8">
                  <Brain className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    Se aplican pruebas estandarizadas internacionales: <strong className="text-primary font-semibold">CONNERS-3, WISC-V, BRIEF-2 y CPT-3</strong> — validadas para población hispanohablante. El informe tiene validez ante SEP, IMSS y colegios privados.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="text-center">
                  <BookingCta />
                </div>
              </Reveal>
            </div>
          </section>


          {/* ─────────────────────────────────────────────────
              SOCIAL PROOF — Outcomes primero, no opiniones
          ───────────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-secondary border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <Reveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Lo que cambió</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">
                  Lo que dicen los padres<br className="hidden sm:block" /> después de la valoración
                </h2>
              </Reveal>

              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="bg-card rounded-2xl border border-border p-5 hover:border-primary/20 hover:shadow-md transition-all duration-300">
                      {/* Outcome — badge visual prominente */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/8 border border-primary/10 rounded-lg mb-3">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <p className="text-xs font-bold text-primary">{r.outcome}</p>
                      </div>
                      <p className="text-sm text-muted-foreground font-light italic leading-relaxed mb-3">"{r.text}"</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-primary/50">{r.who}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-warning text-warning" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>


          {/* ─────────────────────────────────────────────────
              FAQ — Solo las 4 objeciones reales del clic
          ───────────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <Reveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-8 text-center">
                  Antes de que reserves
                </h2>
              </Reveal>

              <div className="space-y-2.5">
                {faqs.map((faq, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="bg-secondary rounded-2xl border border-border overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/60 transition-colors"
                      >
                        <span className="text-sm font-bold text-primary leading-snug">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-primary/40 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <div
                        className="grid transition-all duration-300"
                        style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5 pt-1 border-t border-border">
                            <p className="text-sm text-muted-foreground font-light leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>


          {/* ─────────────────────────────────────────────────
              BOOKING — El cierre
              Precio claro · Micro-copy · Cal.com · Alternativas
          ───────────────────────────────────────────────── */}
          <section id="agendar" className="py-16 sm:py-20 bg-soft-gradient border-t border-border scroll-mt-20">
            <div className="max-w-2xl mx-auto px-6">

              {/* Reframe final — vende el paso 1, no la valoración entera */}
              <Reveal>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-md mb-5">
                    <CalendarCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Paso 1 · Solo eliges fecha y hora</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3 text-balance">
                    El primer paso tarda<br className="hidden sm:block" /> menos de 2 minutos
                  </h2>
                  <p className="text-muted-foreground font-light text-sm max-w-md mx-auto">
                    Seleccionas un horario. Karen te escucha en la primera cita.
                    <strong className="text-primary font-semibold"> Sin pruebas todavía, sin compromisos adicionales.</strong>
                  </p>
                </div>
              </Reveal>

              {/* Precio + CTA externo — transparencia total */}
              <Reveal delay={0.1}>
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-xl shadow-primary/5 mb-5">

                  {/* Price row */}
                  <div className="flex items-end justify-between gap-4 px-6 sm:px-8 pt-7 pb-5 border-b border-border">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total de la valoración</p>
                      <p className="text-4xl font-serif font-bold text-primary">$7,000 <span className="text-base font-light text-muted-foreground">MXN</span></p>
                      <p className="text-xs text-muted-foreground/60 font-light mt-1">4-5 citas · informe · sesión de devolución</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Para apartar lugar</p>
                      <p className="text-2xl font-serif font-bold text-primary">$1,000 <span className="text-sm font-light text-muted-foreground">MXN</span></p>
                      <p className="text-[10px] text-muted-foreground/50">incluido en el total</p>
                    </div>
                  </div>

                  {/* CTA principal */}
                  <div className="px-6 sm:px-8 py-6">
                    <BookingCta
                      href={CAL_URL}
                      external
                      className="w-full text-sm py-4"
                    >
                      Ver fechas disponibles
                    </BookingCta>

                    {/* Micro-copy — una línea por objeción */}
                    <div className="mt-4 space-y-1.5 text-center">
                      <p className="text-[11px] text-muted-foreground/60">
                        🔒 Solo pagas $1,000 MXN al confirmar · El resto al final del proceso
                      </p>
                      <p className="text-[11px] text-muted-foreground/50">
                        Cancelación con reembolso completo hasta 48 hrs antes
                      </p>
                    </div>
                  </div>

                  {/* Risk reversal — highlight verde */}
                  <div className="border-t border-border bg-success/5 px-6 sm:px-8 py-3 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
                    <p className="text-xs text-success font-medium">Reserva sin riesgo — reembolso total si cancelas con 48 hrs de anticipación</p>
                  </div>
                </div>
              </Reveal>

              {/* Cal.com iframe — carga lazy */}
              <Reveal delay={0.2}>
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-lg shadow-primary/5">
                  <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <CalendarCheck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm">Selecciona fecha y hora</p>
                        <p className="text-[10px] text-muted-foreground">Cancún · Horario local</p>
                      </div>
                    </div>
                    {!calLoaded && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Cargando...
                      </div>
                    )}
                  </div>
                  <div ref={calRef} className="relative" style={{ minHeight: '620px' }}>
                    {calVisible ? (
                      <iframe
                        src={`${CAL_URL}?embed=true&layout=month_view&theme=light`}
                        className="w-full border-0"
                        style={{ height: '620px' }}
                        loading="lazy"
                        onLoad={() => setCalLoaded(true)}
                        title="Agendar valoración TDAH infantil — Neuropsicóloga Karen Trujillo"
                        allow="payment"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-[620px]">
                        <div className="text-center">
                          <CalendarCheck className="w-8 h-8 text-primary/20 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground font-light">Cargando calendario...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* Trust row */}
              <Reveal delay={0.3}>
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                  {[
                    { icon: Shield,      label: 'Pago seguro' },
                    { icon: Clock,       label: 'Cancelación 48 hrs' },
                    { icon: BadgeCheck,  label: 'Cédula 11009616' },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                      <Icon className="w-3.5 h-3.5 text-primary/40" />
                      {label}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* Alternativas de contacto — sin presión */}
              <Reveal delay={0.35}>
                <div className="mt-10 pt-8 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground font-light mb-1">¿Prefieres preguntar antes?</p>
                  <p className="text-xs text-muted-foreground/50 mb-5">Sin compromiso · Respondemos en minutos</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${TEL}`}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-card border-2 border-border hover:border-primary/40 text-primary font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <Phone className="w-4 h-4" />
                      Llamar
                    </a>
                  </div>
                  <p className="text-[10px] text-muted-foreground/40 mt-4">Lun–Vie 9:00–7:00 PM · Sáb 9:00–2:00 PM</p>
                </div>
              </Reveal>
            </div>
          </section>


          {/* ── Internal linking ── */}
          <section className="py-8 bg-card border-t border-border">
            <div className="max-w-xl mx-auto px-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Otros servicios en Cancún</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/evaluacion-tdah-adultos" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/40 shrink-0 group-hover:translate-x-1 transition-transform" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH en Adultos</span>
                    <span className="text-[10px] text-muted-foreground font-light">Valoración +18 años</span>
                  </div>
                </Link>
                <Link href="/evaluacion-autismo-cancun" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/40 shrink-0 group-hover:translate-x-1 transition-transform" />
                  <div>
                    <span className="text-sm font-bold text-primary block">Autismo (TEA)</span>
                    <span className="text-[10px] text-muted-foreground font-light">Diagnóstico con ADOS-2</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />

        {/* ── Mobile sticky CTA ── */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-5 lg:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-6 transition-all duration-300 ${
            heroVisible ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        >
          <a
            href="#agendar"
            onClick={scrollTo('agendar')}
            className="flex flex-col items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform"
          >
            <span className="text-[11px] uppercase tracking-widest">Reservar primera consulta</span>
            <span className="text-[9px] text-primary-foreground/65 font-light mt-0.5">Sin compromiso · Cancelas gratis</span>
          </a>
        </div>
      </div>
    </>
  );
}
