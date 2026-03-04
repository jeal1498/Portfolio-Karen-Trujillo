import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, MessageCircle, Phone, Clock,
  Star, CalendarCheck, ChevronDown, Shield, BadgeCheck,
  ShieldCheck, Heart,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════ */
const CAL_URL   = 'https://cal.com/psicologa-karen-trujillo/evaluacion-tdah-infantil';
const WA_NUMBER = '529983211547';
const WA_MSG    = encodeURIComponent('Hola Karen, leí el artículo de TDAH y quiero agendar una valoración para mi hijo. ¿Puedes orientarme?');
const TEL       = '529983211547';

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

/* Lo que obtienen — copy de beneficio, sin jerga */
const includes = [
  'Primera cita solo contigo — sin el niño — Karen escucha todo',
  'Pruebas amigables para el niño (no es un interrogatorio)',
  'Input de los maestros incluido — perspectiva escolar real',
  'Informe clínico con diagnóstico diferencial y plan de acción',
  'Sesión de devolución en lenguaje claro — sabes exactamente qué sigue',
  'Validez oficial ante SEP, IMSS y cualquier escuela de México',
];

/* Reviews — resultado primero, opinión después */
const reviews = [
  {
    outcome: 'La escuela implementó adecuaciones en dos semanas',
    text: 'El informe de Karen fue tan claro que la directora llamó ella misma para coordinar el apoyo. Por fin teníamos un papel concreto.',
    who: 'Mamá de Sofía, 7 años',
  },
  {
    outcome: 'Dejamos de pelear con él — empezamos a ayudarlo',
    text: 'El informe mostró que tiene memoria de trabajo baja. Eso lo cambia todo. Ahora usamos estrategias que sí funcionan para su perfil.',
    who: 'Papá de Diego, 10 años',
  },
];

/* FAQs — solo las objeciones reales del último segundo */
const faqs = [
  {
    q: '¿A qué me comprometo al reservar ahora?',
    a: 'Solo a una primera cita contigo — sin pruebas, sin el niño todavía. El anticipo de $1,000 MXN aparta tu lugar y ya forma parte del total ($7,000 MXN). Si cancelas con 48 hrs de anticipación, se reembolsa completo. Sin excepciones.',
  },
  {
    q: '¿Cuánto es el costo total y cómo se paga?',
    a: '$7,000 MXN en total — 4 a 5 citas, pruebas, informe y sesión de devolución. Al reservar solo pagas $1,000 MXN (ya incluido en el total). El resto ($6,000 MXN) se cubre antes de recibir el informe. Sin costos ocultos.',
  },
  {
    q: '¿Qué pasa si el resultado no indica TDAH?',
    a: 'El informe igualmente aporta claridad. Puede revelar ansiedad, dificultades de aprendizaje o simplemente cómo aprende mejor tu hijo. "No tiene TDAH" no es una respuesta vacía — es el punto de partida para las intervenciones correctas.',
  },
];

/* ═══════════════════════════════════════════
   UI HELPERS
   ═══════════════════════════════════════════ */

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref  = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.unobserve(el); } },
      { rootMargin: '-20px' }
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
        transform: on ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity .55s cubic-bezier(.22,1,.36,1) ${delay}s,
                     transform .55s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function TDAHCierre() {
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const [calVisible, setCalVisible] = useState(false);
  const [calLoaded,  setCalLoaded]  = useState(false);
  const heroCTARef  = useRef<HTMLDivElement>(null);
  const calRef      = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  /* Sticky CTA */
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

  /* Lazy cal — rootMargin agresivo para usuario caliente */
  useEffect(() => {
    const el = calRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCalVisible(true); obs.unobserve(el); } },
      { rootMargin: '600px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToCal = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Agenda tu Valoración TDAH Infantil en Cancún | Karen Trujillo</title>
        <meta name="description" content="Reserva tu primera consulta de valoración TDAH infantil en Cancún. Informe oficial, cédula 11009616. $1,000 MXN para apartar lugar, cancelación gratuita." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos" />
        <meta name="geo.region"    content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
          @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        ` }} />
      </Head>

      <div className="antialiased w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════
              HERO — confirmación, no persuasión
              El usuario ya está convencido. Solo necesita
              sentir que llegó al lugar correcto y actuar.
          ══════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-28 pb-14 px-6 overflow-hidden bg-soft-gradient">

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/12 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-accent-pink/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="max-w-xl mx-auto relative z-10 text-center">

              {/* Confirmación de contexto — "viniste del blog" */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-md mb-7"
                style={{ animation: 'fadeIn .5s ease-out both' }}
              >
                <Heart className="w-3.5 h-3.5 text-primary/50 shrink-0" />
                <span className="text-[9px] uppercase tracking-[.13em] font-bold text-muted-foreground">
                  Tomaste la decisión correcta · Cancún · Niños 5–17 años
                </span>
              </div>

              {/*
                HEADLINE DE CIERRE
                No vende — confirma. El visitante ya se convenció
                leyendo el blog. Aquí validamos su decisión y
                reducimos el miedo al "qué pasa si doy clic".
              */}
              <h1
                className="text-[2rem] sm:text-[2.8rem] font-serif font-bold text-primary leading-[1.1] mb-5 text-balance"
                style={{ animation: 'fadeInUp .65s ease-out .1s both' }}
              >
                Ya sabes lo que ves.<br />
                <span className="italic text-primary/65">Ahora ponle nombre.</span>
              </h1>

              <p
                className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-8 max-w-lg mx-auto"
                style={{ animation: 'fadeInUp .65s ease-out .2s both' }}
              >
                La primera cita es solo una conversación.
                Karen escucha todo lo que has vivido con tu hijo —{' '}
                <strong className="text-primary font-semibold">sin pruebas todavía, sin compromisos adicionales.</strong>
              </p>

              {/* CTA — verbo de acción mínima */}
              <div
                ref={heroCTARef}
                className="flex flex-col items-center gap-2.5"
                style={{ animation: 'fadeInUp .65s ease-out .3s both' }}
              >
                <a
                  href="#agendar"
                  onClick={scrollToCal}
                  className="group inline-flex items-center gap-2.5 bg-gradient-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest px-8 py-5 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" />
                  Elegir mi fecha — es el primer paso
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>

                {/* Micro-copy — la única ansiedad que queda */}
                <p className="text-[11px] text-muted-foreground/55 font-light">
                  Solo $1,000 MXN para apartar · Cancelación con reembolso completo hasta 48 hrs antes
                </p>
              </div>

            </div>
          </section>


          {/* ══════════════════════════════════════════════
              PRECIO + QUÉ INCLUYE + CAL.COM
              Todo en la misma sección — el foco es el calendario
          ══════════════════════════════════════════════ */}
          <section id="agendar" className="py-14 sm:py-20 bg-secondary border-t border-border scroll-mt-20">
            <div className="max-w-2xl mx-auto px-6 space-y-5">

              {/* Precio + inclusiones */}
              <Reveal>
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-xl shadow-primary/5">

                  <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-border">
                    <div className="flex items-end justify-between gap-4 mb-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Valoración completa</p>
                        <p className="text-4xl font-serif font-bold text-primary">
                          $7,000 <span className="text-base font-light text-muted-foreground">MXN</span>
                        </p>
                        <p className="text-xs text-muted-foreground/60 font-light mt-1">4–5 citas · informe clínico · sesión de devolución</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Para apartar lugar</p>
                        <p className="text-2xl font-serif font-bold text-primary">
                          $1,000 <span className="text-sm font-light text-muted-foreground">MXN</span>
                        </p>
                        <p className="text-[10px] text-muted-foreground/50">incluido en el total</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {includes.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground font-light leading-snug">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 py-4 bg-secondary/40 flex flex-wrap gap-x-6 gap-y-2">
                    {[
                      { icon: BadgeCheck, label: 'Cédula Federal 11009616' },
                      { icon: Shield,     label: 'Válido ante SEP e IMSS' },
                      { icon: Clock,      label: '7+ años de experiencia' },
                    ].map(({ icon: Icon, label }) => (
                      <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon className="w-3.5 h-3.5 text-primary/40" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Puente hacia el calendario */}
              <Reveal delay={0.08}>
                <div className="text-center py-2">
                  <p className="text-sm font-serif font-bold text-primary mb-0.5">
                    Selecciona el horario que mejor te acomoda
                  </p>
                  <p className="text-xs text-muted-foreground/60 font-light">
                    La primera cita es solo contigo · Cancún, Quintana Roo
                  </p>
                </div>
              </Reveal>

              {/* Cal.com */}
              <Reveal delay={0.12}>
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-lg shadow-primary/5">

                  <div className="px-5 py-4 border-b border-border bg-secondary/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <CalendarCheck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm">Agenda tu primera cita</p>
                        <p className="text-[10px] text-muted-foreground">Horario local · Cancún</p>
                      </div>
                    </div>
                    {!calLoaded && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Cargando...
                      </div>
                    )}
                  </div>

                  <div ref={calRef} style={{ minHeight: '620px' }}>
                    {calVisible ? (
                      <iframe
                        src={`${CAL_URL}?embed=true&layout=month_view&theme=light`}
                        className="w-full border-0"
                        style={{ height: '620px' }}
                        loading="eager"
                        onLoad={() => setCalLoaded(true)}
                        title="Agendar valoración TDAH infantil — Neuropsicóloga Karen Trujillo"
                        allow="payment"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-[620px]">
                        <div className="text-center">
                          <CalendarCheck className="w-8 h-8 text-primary/20 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground font-light">Preparando el calendario...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border bg-success/5 px-6 py-3 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
                    <p className="text-xs text-success font-medium">
                      Reserva sin riesgo — reembolso completo si cancelas con 48 hrs de anticipación
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Contacto alternativo — para el que aún duda */}
              <Reveal delay={0.18}>
                <div className="pt-4 text-center">
                  <p className="text-sm text-muted-foreground font-light mb-1">¿Prefieres hablar antes de reservar?</p>
                  <p className="text-xs text-muted-foreground/50 mb-5">Respondemos en minutos · Sin presión de ventas</p>
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


          {/* ══════════════════════════════════════════════
              SOCIAL PROOF — después del calendario
              Función: resolver la duda del que se frenó
              justo antes de confirmar
          ══════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <Reveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Lo que cambió después</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-8 text-center">
                  Otros padres ya dieron este paso
                </h2>
              </Reveal>

              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="bg-secondary rounded-2xl border border-border p-5">
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


          {/* ══════════════════════════════════════════════
              FAQ — Solo objeciones de compra del último segundo
          ══════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <Reveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-7 text-center">
                  Antes de confirmar
                </h2>
              </Reveal>

              <div className="space-y-2.5 mb-8">
                {faqs.map((faq, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="bg-card rounded-2xl border border-border overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/50 transition-colors"
                      >
                        <span className="text-sm font-bold text-primary leading-snug">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-primary/40 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <div
                        className="grid transition-all duration-300"
                        style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr', transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}
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

              {/* CTA de remate — después de resolver la última duda */}
              <Reveal delay={0.2}>
                <div className="text-center">
                  <a
                    href="#agendar"
                    onClick={scrollToCal}
                    className="group inline-flex items-center gap-2.5 bg-gradient-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
                  >
                    <CalendarCheck className="w-4 h-4 shrink-0" />
                    Volver al calendario — elegir mi fecha
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <p className="text-[11px] text-muted-foreground/50 font-light mt-2">
                    Sin compromiso · Reembolso completo hasta 48 hrs antes
                  </p>
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
          style={{ transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}
        >
          <a
            href="#agendar"
            onClick={scrollToCal}
            className="flex flex-col items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform"
          >
            <span className="text-[11px] uppercase tracking-widest">Elegir mi fecha</span>
            <span className="text-[9px] text-primary-foreground/60 font-light mt-0.5">
              Solo $1,000 MXN para apartar · Cancelas gratis
            </span>
          </a>
        </div>

      </div>
    </>
  );
}
