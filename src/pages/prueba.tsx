import { useState, useRef, useEffect } from "react";
import {
  ArrowRight, ArrowDown, Brain, FileText, CheckCircle2,
  ShieldCheck, AlertCircle, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, BookOpen, ChevronDown,
  Shield, BadgeCheck, Heart, XCircle, Check, X,
} from "lucide-react";

/* ─── CONFIG ─────────────────────────────────────────────── */
const CAL_URL = "https://cal.com/psicologa-karen-trujillo/evaluacion-tdah-infantil";
const WA_URL  = `https://wa.me/529983211547?text=${encodeURIComponent("Hola Karen, vi tu página de valoración TDAH infantil y tengo algunas dudas antes de agendar. ¿Podrías orientarme?")}`;
const TEL     = "tel:529983211547";

/* ─── GLOBAL STYLES ──────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:         #1a1a2e;
    --ink-soft:    #4a4a6a;
    --ink-muted:   #8888aa;
    --teal:        #2d7d9a;
    --teal-light:  #e8f4f8;
    --teal-mid:    #b8dce8;
    --amber:       #d48c3a;
    --amber-light: #fdf3e3;
    --cream:       #fafaf7;
    --white:       #ffffff;
    --border:      #e8e8f0;
    --border-soft: #f0f0f8;
    --success:     #2d9a6e;
    --warn:        #d4833a;
    --serif:       'Cormorant Garamond', Georgia, serif;
    --sans:        'DM Sans', system-ui, sans-serif;
    --mono:        'DM Mono', monospace;
    --r-sm: 12px; --r-md: 16px; --r-lg: 24px; --r-xl: 32px; --r-2xl: 40px;
    --shadow-sm: 0 2px 8px rgba(26,26,46,.06);
    --shadow-md: 0 6px 24px rgba(26,26,46,.1);
    --shadow-lg: 0 16px 48px rgba(26,26,46,.14);
    --shadow-teal: 0 8px 32px rgba(45,125,154,.22);
    --transition: all .25s cubic-bezier(.4,0,.2,1);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--sans); background: var(--cream); color: var(--ink); line-height: 1.6; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* ── Animations ── */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:.4; } }
  @keyframes shimmer  { 0% { background-position: -400% 0; } 100% { background-position: 400% 0; } }
  @keyframes glow     { 0%,100% { box-shadow: 0 0 20px rgba(45,125,154,.25); } 50% { box-shadow: 0 0 40px rgba(45,125,154,.45); } }
  @keyframes floatUp  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
  @keyframes tick     { from { transform:scale(0) rotate(-20deg); } to { transform:scale(1) rotate(0deg); } }
  @keyframes barGrow  { from { width:0; } to { width:var(--bar-w); } }
  @keyframes waveIn   { 0% { clip-path:inset(0 100% 0 0); } 100% { clip-path:inset(0 0% 0 0); } }

  .reveal { opacity:0; transform:translateY(24px); transition: opacity .55s ease, transform .55s ease; }
  .reveal.visible { opacity:1; transform:none; }
  .reveal-delay-1 { transition-delay:.1s; }
  .reveal-delay-2 { transition-delay:.2s; }
  .reveal-delay-3 { transition-delay:.3s; }

  /* ── CTA Button ── */
  .cta-btn {
    display:inline-flex; align-items:center; justify-content:center; gap:10px;
    padding:16px 36px; border-radius:var(--r-lg); border:none; cursor:pointer;
    font-family:var(--sans); font-weight:700; font-size:11px; letter-spacing:.12em;
    text-transform:uppercase; text-decoration:none;
    background: linear-gradient(135deg, var(--teal) 0%, #1e6a84 100%);
    color:#fff; box-shadow: var(--shadow-teal);
    transition: var(--transition); position:relative; overflow:hidden;
  }
  .cta-btn::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);
    opacity:0; transition:opacity .2s;
  }
  .cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(45,125,154,.35); }
  .cta-btn:hover::after { opacity:1; }
  .cta-btn:active { transform:scale(.98); }
  .cta-btn.large { padding:20px 48px; font-size:12px; border-radius:var(--r-xl); animation: glow 3s ease-in-out infinite; }
  .cta-btn.ghost {
    background:transparent; color:var(--teal); border:2px solid rgba(45,125,154,.25);
    box-shadow:none;
  }
  .cta-btn.ghost:hover { border-color:var(--teal); background:var(--teal-light); box-shadow:none; transform:none; }

  /* ── Utility ── */
  .badge {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 12px; border-radius:100px; font-size:9px;
    font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  }
  .badge-teal { background:var(--teal-light); color:var(--teal); border:1px solid var(--teal-mid); }
  .badge-amber { background:var(--amber-light); color:var(--amber); border:1px solid rgba(212,140,58,.3); }
  .badge-pulse::before { content:''; display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--warn); animation:pulse 1.5s infinite; }

  .card {
    background:var(--white); border:1px solid var(--border); border-radius:var(--r-xl);
    box-shadow:var(--shadow-sm); transition:var(--transition);
  }
  .card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }

  .section-label {
    font-size:9px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
    color:var(--teal); margin-bottom:12px; display:block;
  }
  .section-title {
    font-family:var(--serif); font-size:clamp(2rem,4vw,3rem); font-weight:700;
    color:var(--ink); line-height:1.15; margin-bottom:16px;
  }
  .section-sub {
    font-size:.95rem; color:var(--ink-soft); font-weight:300; line-height:1.75;
    max-width:580px;
  }

  /* ── Divider ── */
  .ornament {
    display:flex; align-items:center; gap:16px; margin:0 auto;
    width:fit-content; opacity:.35;
  }
  .ornament::before, .ornament::after {
    content:''; display:block; width:60px; height:1px; background:var(--ink);
  }
  .ornament span { font-family:var(--serif); font-size:.7rem; letter-spacing:.3em; }

  /* ── Symptom checker ── */
  .symptom-btn {
    display:flex; align-items:center; gap:10px; padding:12px 16px;
    border-radius:var(--r-md); border:2px solid var(--border); background:var(--white);
    cursor:pointer; text-align:left; font-family:var(--sans); font-size:.825rem;
    color:var(--ink-soft); font-weight:400; transition:var(--transition); width:100%;
  }
  .symptom-btn.selected {
    border-color:var(--teal); background:var(--teal-light);
    color:var(--teal); font-weight:500;
  }
  .symptom-btn:hover:not(.selected) { border-color:var(--teal-mid); background:var(--teal-light)/50; }

  /* ── FAQ ── */
  .faq-item { border-bottom:1px solid var(--border); }
  .faq-btn {
    display:flex; align-items:center; justify-content:space-between; width:100%;
    padding:20px 0; background:none; border:none; cursor:pointer;
    font-family:var(--serif); font-size:1.15rem; font-weight:600;
    color:var(--ink); text-align:left; gap:16px;
  }
  .faq-body { overflow:hidden; transition:max-height .35s ease, opacity .3s ease; opacity:0; max-height:0; }
  .faq-body.open { opacity:1; max-height:400px; }
  .faq-body p { padding-bottom:20px; font-size:.9rem; color:var(--ink-soft); font-weight:300; line-height:1.75; }

  /* ── Comparison table ── */
  .comp-table { width:100%; border-collapse:separate; border-spacing:0; }
  .comp-table th, .comp-table td {
    padding:14px 18px; font-size:.825rem; text-align:left;
    border-bottom:1px solid var(--border);
  }
  .comp-table thead th { font-size:.7rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; background:var(--border-soft); color:var(--ink-muted); }
  .comp-table thead th:first-child { border-radius:var(--r-sm) 0 0 0; }
  .comp-table thead th:last-child  { border-radius:0 var(--r-sm) 0 0; }
  .comp-table tbody tr:hover td { background:var(--teal-light); }
  .comp-table .col-neuro { background:rgba(45,125,154,.04); }
  .comp-table .col-neuro td { color:var(--teal); font-weight:500; }

  /* ── Review cards ── */
  .review-card {
    background:var(--white); border:1px solid var(--border); border-radius:var(--r-xl);
    padding:28px; position:relative; overflow:hidden;
  }
  .review-card::before {
    content:'"'; position:absolute; top:-10px; left:16px;
    font-family:var(--serif); font-size:8rem; color:var(--teal-light);
    line-height:1; pointer-events:none;
  }

  /* ── Steps timeline ── */
  .step-line {
    position:absolute; left:20px; top:44px; bottom:-20px;
    width:2px; background:linear-gradient(to bottom,var(--teal-mid),transparent);
  }

  /* ── Price card ── */
  .price-badge {
    display:inline-block; background:linear-gradient(135deg,var(--teal),#1e6a84);
    color:#fff; font-family:var(--serif); font-size:2.8rem; font-weight:700;
    padding:2px 0; line-height:1;
  }

  /* ── Sticky CTA bar ── */
  .sticky-bar {
    position:fixed; bottom:0; left:0; right:0; z-index:200;
    padding:12px 20px 20px;
    background:linear-gradient(to top,var(--white) 70%,transparent);
    transition:opacity .35s ease, transform .35s ease;
  }
  .sticky-bar.hidden { opacity:0; transform:translateY(100%); pointer-events:none; }

  /* ── WA button ── */
  .wa-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 28px; border-radius:var(--r-lg); border:none; cursor:pointer;
    font-family:var(--sans); font-weight:700; font-size:11px; letter-spacing:.1em;
    text-transform:uppercase; text-decoration:none;
    background:#25D366; color:#fff;
    transition:var(--transition);
  }
  .wa-btn:hover { opacity:.9; transform:translateY(-1px); }

  /* ── Instruments grid ── */
  .instrument-chip {
    display:flex; flex-direction:column; gap:3px;
    padding:16px 20px; border-radius:var(--r-md);
    background:var(--teal-light); border:1px solid var(--teal-mid);
  }

  /* ── Risk-reversal strip ── */
  .guarantee-strip {
    background:linear-gradient(135deg,#e8f7f0,#d4f0e4);
    border:1px solid rgba(45,154,110,.2); border-radius:var(--r-lg);
    padding:18px 24px;
  }

  a { color:inherit; text-decoration:none; }
  img { max-width:100%; border-radius:var(--r-lg); }
  strong { font-weight:600; }

  @media(max-width:640px) {
    .hide-mobile { display:none; }
    .cta-btn.large { padding:18px 32px; }
  }
`;

/* ─── SYMPTOM CHECKER ────────────────────────────────────── */
const symptoms = [
  "No termina tareas aunque sabe hacerlas",
  "Se distrae con cualquier estímulo externo",
  "Pierde útiles, ropa o juguetes con frecuencia",
  "Interrumpe constantemente a adultos",
  "En clase parece 'estar en las nubes'",
  "Reacciona de forma exagerada ante frustraciones",
  "Le cuesta esperar su turno",
  "Los maestros lo describen como 'distraído' o 'impulsivo'",
];

function SymptomChecker({ onChange }) {
  const [selected, setSelected] = useState(new Set());

  const toggle = (i) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      onChange?.(next.size);
      return next;
    });
  };

  const n = selected.size;
  const urgency =
    n >= 5 ? { label: "Alta probabilidad · Valoración recomendada", color: "var(--warn)" }
    : n >= 3 ? { label: "Señales presentes · Vale la pena evaluar", color: "var(--teal)" }
    : n > 0  ? { label: "Pocas señales · Mantén atención", color: "var(--ink-muted)" }
    : null;

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"10px", marginBottom:"20px" }}>
        {symptoms.map((s, i) => (
          <button key={i} className={`symptom-btn${selected.has(i) ? " selected" : ""}`} onClick={() => toggle(i)}>
            <span style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${selected.has(i) ? "var(--teal)" : "var(--border)"}`, background: selected.has(i) ? "var(--teal)" : "transparent", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", transition:"var(--transition)" }}>
              {selected.has(i) && <Check size={11} color="#fff" strokeWidth={3} />}
            </span>
            {s}
          </button>
        ))}
      </div>
      {urgency && (
        <div style={{ textAlign:"center", padding:"14px 20px", borderRadius:"var(--r-md)", background:"rgba(45,125,154,.06)", border:"1px solid var(--teal-mid)", animation:"fadeIn .4s ease" }}>
          <span style={{ fontSize:".8rem", fontWeight:600, color:urgency.color }}>{urgency.label}</span>
          {n >= 3 && (
            <p style={{ fontSize:".75rem", color:"var(--ink-muted)", marginTop:6, fontWeight:300 }}>
              {n >= 5 ? "Tu hijo presenta múltiples señales que justifican una valoración formal. Cada semana sin diagnóstico es una semana de oportunidades perdidas." : "Hay señales que merecen atención profesional. Una valoración dará claridad, no importa el resultado."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── FAQ ────────────────────────────────────────────────── */
const faqs = [
  { q: "¿Qué pasa en la primera sesión?", a: "La primera cita es una entrevista de 60-90 minutos contigo como padre o madre — sin el niño presente. Hablaremos del historial de desarrollo, el contexto escolar y tus preocupaciones principales. Es una conversación, no un interrogatorio. Al final sabrás exactamente qué esperar del resto del proceso." },
  { q: "¿Cuánto tiempo toma la valoración completa?", a: "De 2 a 3 semanas distribuidas en 4-5 citas presenciales en Cancún. Incluye la entrevista inicial con padres, sesiones de pruebas con el niño, cuestionarios a maestros (que se completan de forma remota), análisis de resultados y sesión de devolución con el informe." },
  { q: "¿Cuánto cuesta y cómo se paga?", a: "La valoración completa cuesta $7,000 MXN. Al agendar se solicita un anticipo de $1,000 MXN que forma parte del total —no es un costo adicional. El saldo de $6,000 se cubre antes de la entrega del informe. Si necesitas otra estructura de pago, podemos hablarlo por WhatsApp." },
  { q: "¿El informe tiene validez oficial ante la escuela?", a: "Sí. El informe clínico está firmado con cédula profesional federal 11009616 (SEP) y es aceptado por escuelas, SEP e IMSS en todo México. Incluye recomendaciones específicas de adecuaciones curriculares que la escuela está obligada a considerar." },
  { q: "¿Qué pasa si el resultado no indica TDAH?", a: "Igualmente obtienes claridad. El informe identifica qué sí está pasando: ansiedad, trastorno del aprendizaje, altas capacidades u otra condición. Saber con certeza qué no es TDAH evita intervenciones equivocadas y te da un camino correcto para ayudar a tu hijo." },
  { q: "¿Se puede cancelar o reprogramar?", a: "Sí, con al menos 48 horas de anticipación. El anticipo es reembolsable al 100% si cancelas dentro de ese plazo. Fuera de plazo, se aplica como crédito para reagendar." },
  { q: "¿Las pruebas se pueden hacer en línea?", a: "La entrevista inicial y la sesión de devolución pueden ser en línea. Las pruebas neuropsicológicas estandarizadas (CONNERS-3, WISC-V, BRIEF-2, CPT-3) requieren presencia en el consultorio de Cancún para garantizar la validez clínica de los resultados." },
  { q: "¿A qué edad se puede diagnosticar?", a: "A partir de los 5 años. La transición a primaria es el momento más común para detectar el TDAH, porque las exigencias de atención y autorregulación aumentan de forma significativa. Antes de los 5 años los síntomas son difíciles de diferenciar del desarrollo típico." },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {faqs.map((item, i) => (
        <div key={i} className="faq-item">
          <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span style={{ flexShrink:0, width:28, height:28, borderRadius:"50%", background:"var(--teal-light)", border:"1px solid var(--teal-mid)", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s", transform: open === i ? "rotate(180deg)" : "none" }}>
              <ChevronDown size={14} color="var(--teal)" />
            </span>
          </button>
          <div className={`faq-body${open === i ? " open" : ""}`}>
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── REVEAL WRAPPER ─────────────────────────────────────── */
function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { rootMargin: "0px 0px -60px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ─── STAR RATING ────────────────────────────────────────── */
function Stars({ n = 5 }) {
  return (
    <span style={{ display:"inline-flex", gap:2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} fill="var(--amber)" color="var(--amber)" />
      ))}
    </span>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function EvaluacionTDAHNinos() {
  const [symptomCount, setSymptomCount] = useState(0);
  const [calVisible, setCalVisible] = useState(false);
  const [calLoaded, setCalLoaded] = useState(false);
  const heroCTARef = useRef(null);
  const calRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);

  /* Hero CTA visibility → sticky bar */
  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { rootMargin: "0px 0px -80px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Lazy Cal.com */
  useEffect(() => {
    const el = calRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCalVisible(true); obs.unobserve(el); } }, { rootMargin: "400px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => (e) => { e?.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ══════════════════════════════════════════════════════
          1 · HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{ position:"relative", padding:"100px 24px 80px", overflow:"hidden", background:"linear-gradient(160deg,#f5f9fb 0%,var(--cream) 50%,#fdf6ee 100%)" }}>
        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:"-80px", right:"-100px", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(45,125,154,.12),transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,140,58,.1),transparent 70%)", pointerEvents:"none" }} />
        {/* Grid texture */}
        <div style={{ position:"absolute", inset:0, opacity:.025, backgroundImage:"radial-gradient(circle,var(--ink) 1px,transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }} />

        <div style={{ maxWidth:800, margin:"0 auto", position:"relative", zIndex:1, textAlign:"center", animation:"fadeUp .9s ease-out both" }}>

          {/* Availability badge */}
          <span className="badge badge-amber badge-pulse" style={{ marginBottom:24, display:"inline-flex" }}>
            Disponibilidad limitada · Cancún · Niños 5–17 años
          </span>

          {/* H1 — SEO keyword + emotional hook */}
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(2.4rem,5.5vw,4.2rem)", fontWeight:700, lineHeight:1.08, color:"var(--ink)", marginBottom:20, textWrap:"balance" }}>
            Por fin sabrás qué le pasa<br className="hide-mobile" /> a tu hijo — y qué hacer
          </h1>

          {/* Emotional subtitle */}
          <p style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.15rem,2.5vw,1.5rem)", fontStyle:"italic", color:"var(--teal)", marginBottom:20, fontWeight:400 }}>
            Valoración TDAH infantil en Cancún con diagnóstico que la escuela respeta
          </p>

          {/* Outcome-first copy */}
          <p style={{ fontSize:"1rem", color:"var(--ink-soft)", fontWeight:300, lineHeight:1.8, maxWidth:640, margin:"0 auto 12px", textWrap:"balance" }}>
            Pruebas estandarizadas internacionales (CONNERS-3, WISC-V, BRIEF-2, CPT-3) + informe clínico con{" "}
            <strong style={{ color:"var(--ink)" }}>validez oficial ante SEP e IMSS</strong>. En 3 semanas, un mapa claro para ayudarlo de verdad.
          </p>
          <p style={{ fontSize:".8rem", color:"var(--ink-muted)", marginBottom:40 }}>
            <strong style={{ color:"var(--ink)" }}>Neuropsicóloga Karen Trujillo</strong> · Cédula Federal 11009616 · 7+ años de experiencia
          </p>

          {/* CTA cluster */}
          <div ref={heroCTARef} style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", alignItems:"center", marginBottom:48 }}>
            <a className="cta-btn large" href="#agendar" onClick={scrollTo("agendar")}>
              Ver disponibilidad ahora
              <ArrowRight size={15} />
            </a>
            <a className="cta-btn ghost" href="#sintomas" onClick={scrollTo("sintomas")}>
              ¿Mi hijo podría tener TDAH?
              <ArrowDown size={13} />
            </a>
          </div>

          {/* Trust badges */}
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"8px 28px", fontSize:".75rem", color:"var(--ink-muted)" }}>
            {[
              [BadgeCheck, "Cédula 11009616 · SEP"],
              [ShieldCheck, "Informe válido ante escuelas"],
              [CalendarCheck, "Agenda en línea · Sin llamar"],
            ].map(([Icon, text], i) => (
              <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <Icon size={14} color="var(--teal)" />{text}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          2 · PAIN POINTS (Problema)
      ══════════════════════════════════════════════════════ */}
      <section id="sintomas" style={{ padding:"80px 24px", background:"var(--white)", scrollMarginTop:24 }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">Muchos padres llegan con esta historia</span>
              <h2 className="section-title">¿Te suena familiar?</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Los síntomas del TDAH suelen confundirse con "conducta". Sin un diagnóstico formal, el problema se hereda al siguiente semestre.</p>
            </div>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16, marginBottom:32 }}>
            {[
              [BookOpen, "La escuela dice que 'no pone atención'… pero nadie te da una solución concreta"],
              [Users,   "Cada tarea es una batalla. Cuando termina el día, todos están agotados"],
              [Brain,   "Sabes que es inteligente — sus calificaciones simplemente no lo demuestran"],
              [Heart,   "Te preocupa que las etiquetas informales lo marquen de por vida"],
            ].map(([Icon, text], i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card" style={{ padding:22, display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:"var(--teal-light)", border:"1px solid var(--teal-mid)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon size={17} color="var(--teal)" />
                  </div>
                  <p style={{ fontSize:".875rem", color:"var(--ink-soft)", lineHeight:1.65, fontWeight:300 }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Agitación — costo de no actuar */}
          <Reveal delay={0.3}>
            <div style={{ padding:"20px 24px", borderRadius:"var(--r-lg)", background:"rgba(212,140,58,.06)", borderLeft:"3px solid var(--amber)", border:"1px solid rgba(212,140,58,.2)" }}>
              <p style={{ fontSize:".875rem", color:"var(--ink-soft)", fontWeight:300, lineHeight:1.75, fontStyle:"italic" }}>
                <strong style={{ color:"var(--ink)", fontStyle:"normal" }}>Cada semestre sin diagnóstico</strong> es un semestre de frustración acumulada, etiquetas informales que se adhieren y ventanas de intervención que se cierran. El mejor momento para actuar fue antes. El segundo mejor momento es hoy.
              </p>
            </div>
          </Reveal>

          {/* Symptom checker */}
          <Reveal delay={0.15} style={{ marginTop:52 }}>
            <div style={{ background:"var(--teal-light)", border:"1px solid var(--teal-mid)", borderRadius:"var(--r-xl)", padding:"32px 28px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <AlertCircle size={16} color="var(--teal)" />
                <p style={{ fontSize:".7rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--teal)" }}>Herramienta orientativa — no es diagnóstico</p>
              </div>
              <h3 style={{ fontFamily:"var(--serif)", fontSize:"1.35rem", fontWeight:600, color:"var(--ink)", marginBottom:16 }}>Selecciona las señales que reconoces en tu hijo</h3>
              <SymptomChecker onChange={setSymptomCount} />
            </div>
          </Reveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          3 · QUÉ ES EL TDAH (educativo + AEO)
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"72px 24px", background:"var(--cream)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:36 }}>
              <span className="section-label">Contexto clínico</span>
              <h2 className="section-title">¿Qué es el TDAH infantil?</h2>
            </div>
            <p style={{ fontSize:".95rem", color:"var(--ink-soft)", lineHeight:1.8, fontWeight:300, textAlign:"center", marginBottom:28 }}>
              El <strong style={{ color:"var(--ink)" }}>TDAH</strong> es una condición neurológica que afecta la corteza prefrontal — la zona responsable de planificar, organizarse y regular emociones. <strong style={{ color:"var(--ink)" }}>No es falta de inteligencia ni de disciplina.</strong> Requiere síntomas persistentes en casa y escuela por más de 6 meses (criterios DSM-5, código F90 CIE-10).
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:28 }}>
              {[["Inatento", "El niño que 'está en las nubes'"], ["Hiperactivo-impulsivo", "El que no puede quedarse quieto"], ["Combinado", "Ambas presentaciones"]].map(([label, desc]) => (
                <div key={label} style={{ padding:"12px 20px", background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--r-md)", textAlign:"center", minWidth:140 }}>
                  <span style={{ display:"block", fontSize:".825rem", fontWeight:700, color:"var(--teal)", marginBottom:2 }}>{label}</span>
                  <span style={{ fontSize:".7rem", color:"var(--ink-muted)", fontWeight:300 }}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:"18px 22px", background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"linear-gradient(to bottom,var(--teal),var(--teal-mid))", borderRadius:"4px 0 0 4px" }} />
              <p style={{ fontSize:".85rem", color:"var(--ink-soft)", fontWeight:300, lineHeight:1.75, paddingLeft:12 }}>
                En Cancún, la neuropsicóloga Karen Trujillo (cédula 11009616) aplica pruebas como <strong style={{ color:"var(--ink)" }}>CONNERS-3, WISC-V, BRIEF-2 y CPT-3</strong> para emitir un informe clínico con validez oficial ante la SEP, IMSS e instituciones educativas.
              </p>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          4 · PROCESO — 5 pasos
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", background:"var(--white)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <span className="section-label">Proceso clínico estructurado</span>
              <h2 className="section-title">¿Cómo funciona la valoración?</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Un proceso de 5 fases diseñado para ser completo, riguroso y lo menos disruptivo posible para tu familia.</p>
            </div>
          </Reveal>

          <div style={{ position:"relative" }}>
            {[
              ["01", "Sesión de descubrimiento con padres", "Anamnesis clínica, historial de desarrollo, contexto escolar y familiar. Tú hablas; Karen escucha.", "60–90 min", true],
              ["02", "Evaluación neuropsicológica del niño",  "Sesiones con CONNERS-3, WISC-V, BRIEF-2 y CPT-3. El niño trabaja con pruebas interactivas.", "2–3 sesiones", false],
              ["03", "Cuestionarios a maestros",              "Escalas de conducta y atención completadas por docentes de forma remota — sin interrumpir tu rutina.", "Remoto", false],
              ["04", "Análisis e informe clínico",            "Integración de todos los datos, diagnóstico diferencial y perfil neuropsicológico con percentiles.", "5–7 días", false],
              ["05", "Sesión de devolución",                  "Te explicamos cada resultado, las implicaciones prácticas y un plan de acción para casa y escuela.", "60 min", false],
            ].map(([n, title, desc, dur, isFirst], i, arr) => (
              <Reveal key={n} delay={i * 0.1} style={{ position:"relative", paddingLeft:64, marginBottom: i < arr.length - 1 ? 24 : 0 }}>
                {i < arr.length - 1 && <div style={{ position:"absolute", left:19, top:44, bottom:-24, width:2, background:"linear-gradient(to bottom,var(--teal-mid),transparent)" }} />}
                <div style={{ position:"absolute", left:0, top:0, width:40, height:40, borderRadius:12, background: isFirst ? "linear-gradient(135deg,var(--teal),#1e6a84)" : "var(--teal-light)", border:"2px solid var(--teal-mid)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:"var(--mono)", fontSize:".7rem", fontWeight:500, color: isFirst ? "#fff" : "var(--teal)" }}>{n}</span>
                </div>
                <div className="card" style={{ padding:"18px 20px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8, marginBottom:6 }}>
                    <h3 style={{ fontFamily:"var(--serif)", fontSize:"1.1rem", fontWeight:700, color:"var(--ink)" }}>{title}</h3>
                    <span style={{ fontSize:".7rem", fontWeight:600, color:"var(--teal)", background:"var(--teal-light)", padding:"3px 10px", borderRadius:100, border:"1px solid var(--teal-mid)", whiteSpace:"nowrap" }}>{dur}</span>
                  </div>
                  <p style={{ fontSize:".85rem", color:"var(--ink-soft)", fontWeight:300, lineHeight:1.65 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          5 · SOLUCIÓN — Qué incluye el informe
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", background:"var(--cream)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">Lo que recibes al final</span>
              <h2 className="section-title">Un informe que abre puertas</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>No solo un papel con un diagnóstico. Un documento clínico completo que la escuela implementa de inmediato.</p>
            </div>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14, marginBottom:40 }}>
            {[
              "Diagnóstico diferencial con respaldo clínico",
              "Perfil neuropsicológico completo con percentiles",
              "Recomendaciones terapéuticas específicas",
              "Adecuaciones curriculares para la escuela",
              "Plan de intervención a corto y mediano plazo",
              "Validez oficial ante SEP, IMSS e instituciones",
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"16px 18px", background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--r-md)" }}>
                  <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink:0, marginTop:2 }} />
                  <span style={{ fontSize:".85rem", color:"var(--ink-soft)", fontWeight:400, lineHeight:1.5 }}>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Instruments */}
          <Reveal delay={0.2}>
            <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--r-xl)", padding:"28px 28px 24px" }}>
              <p style={{ fontSize:".7rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--teal)", marginBottom:16 }}>Instrumentos aplicados</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12 }}>
                {[
                  ["CONNERS-3", "Escala de síntomas TDAH — padres, maestros y el niño"],
                  ["WISC-V",    "Inteligencia y perfil cognitivo: atención, memoria de trabajo"],
                  ["BRIEF-2",   "Funciones ejecutivas en contexto cotidiano"],
                  ["CPT-3",     "Prueba computarizada de atención sostenida"],
                ].map(([name, desc]) => (
                  <div key={name} className="instrument-chip">
                    <span style={{ fontFamily:"var(--mono)", fontSize:".8rem", fontWeight:500, color:"var(--teal)" }}>{name}</span>
                    <span style={{ fontSize:".7rem", color:"var(--ink-muted)", fontWeight:300, lineHeight:1.4 }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          6 · COMPARATIVA Neuropsicología vs Psicología
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", background:"var(--white)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <span className="section-label">¿Por qué neuropsicología?</span>
              <h2 className="section-title">No todos los diagnósticos son iguales</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>La diferencia entre una impresión clínica y un diagnóstico con datos objetivos.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ overflowX:"auto", borderRadius:"var(--r-xl)", border:"1px solid var(--border)", overflow:"hidden" }}>
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Aspecto</th>
                    <th>Psicología clínica</th>
                    <th style={{ color:"var(--teal)" }}>✦ Neuropsicología</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Método",              "Entrevista y observación conductual",              "Pruebas estandarizadas con normas internacionales"],
                    ["Qué mide",            "Conducta, emociones y relaciones",                 "Funciones ejecutivas: atención, memoria de trabajo, velocidad de procesamiento"],
                    ["Resultado",           "Impresión diagnóstica cualitativa",                "Perfil cognitivo cuantificable con percentiles"],
                    ["Diagnóstico dif.",    "Limitado a observación",                           "Diferencia TDAH de ansiedad, TEA o dificultades del aprendizaje con datos objetivos"],
                    ["Validez escolar",     "Variable según la institución",                    "Informe con cédula federal aceptado por SEP e IMSS"],
                  ].map(([asp, psi, neuro]) => (
                    <tr key={asp}>
                      <td style={{ fontWeight:600, color:"var(--ink)", whiteSpace:"nowrap" }}>{asp}</td>
                      <td style={{ color:"var(--ink-muted)", fontWeight:300 }}>
                        <span style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                          <X size={13} color="var(--ink-muted)" style={{ marginTop:2, flexShrink:0 }} />{psi}
                        </span>
                      </td>
                      <td className="col-neuro">
                        <span style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                          <Check size={13} color="var(--teal)" style={{ marginTop:2, flexShrink:0 }} />{neuro}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          7 · SOCIAL PROOF — Testimonios + stats
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", background:"var(--cream)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">Familias que ya obtuvieron claridad</span>
              <h2 className="section-title">Lo que cambia después de saber</h2>
            </div>
          </Reveal>

          {/* Stat bar */}
          <Reveal delay={0.1} style={{ marginBottom:36 }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center" }}>
              {[["500+","valoraciones realizadas"],["7+","años de experiencia"],["47+","reseñas 5 estrellas"],["SEP","cédula federal"]].map(([val, label]) => (
                <div key={label} style={{ textAlign:"center", padding:"20px 28px", background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", minWidth:130 }}>
                  <p style={{ fontFamily:"var(--serif)", fontSize:"2rem", fontWeight:700, color:"var(--teal)", lineHeight:1 }}>{val}</p>
                  <p style={{ fontSize:".7rem", color:"var(--ink-muted)", marginTop:4, fontWeight:300 }}>{label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Reviews */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16, marginBottom:36 }}>
            {[
              ["Mamá de Sofía, 7 años", "Por fin alguien nos explicó qué pasaba con nuestra hija. El informe fue tan claro que la escuela implementó las adecuaciones de inmediato."],
              ["Papá de Diego, 10 años", "Llevábamos dos años con dudas. Karen fue profesional, cálida y el proceso fue mucho más ordenado de lo que esperábamos."],
              ["Mamá de Valentina, 6 años", "Me dio tranquilidad tener un diagnóstico formal. Las recomendaciones transformaron la dinámica en casa y en la escuela."],
            ].map(([name, text], i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="review-card">
                  <Stars />
                  <p style={{ fontSize:".9rem", color:"var(--ink-soft)", lineHeight:1.7, fontWeight:300, margin:"14px 0 16px", position:"relative", zIndex:1 }}>"{text}"</p>
                  <p style={{ fontSize:".75rem", fontWeight:600, color:"var(--ink)" }}>{name}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Karen bio snippet */}
          <Reveal delay={0.2}>
            <div style={{ display:"flex", gap:24, alignItems:"center", flexWrap:"wrap", padding:"28px 28px", background:"var(--white)", border:"1px solid var(--border)", borderRadius:"var(--r-xl)" }}>
              <div style={{ width:80, height:80, borderRadius:"var(--r-lg)", overflow:"hidden", flexShrink:0, background:"var(--teal-light)", border:"2px solid var(--teal-mid)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <img src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" alt="Karen Trujillo" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", borderRadius:0 }} onError={(e) => { e.target.style.display="none"; }} />
              </div>
              <div style={{ flex:1, minWidth:200 }}>
                <p style={{ fontFamily:"var(--serif)", fontSize:"1.25rem", fontWeight:700, color:"var(--ink)", marginBottom:2 }}>Karen Trujillo</p>
                <p style={{ fontSize:".8rem", color:"var(--teal)", fontWeight:500, marginBottom:8 }}>Neuropsicóloga Clínica · Especialista en TDAH y Autismo</p>
                <p style={{ fontSize:".825rem", color:"var(--ink-soft)", fontWeight:300, lineHeight:1.65 }}>7+ años evaluando niños, adolescentes y adultos en Cancún. Cada familia recibe más que un diagnóstico: una hoja de ruta concreta para acompañar a su hijo de forma efectiva en casa y en la escuela.</p>
              </div>
              <div style={{ flexShrink:0, background:"linear-gradient(135deg,var(--teal),#1e6a84)", padding:"10px 16px", borderRadius:"var(--r-md)", textAlign:"center" }}>
                <p style={{ fontSize:".65rem", fontWeight:700, color:"rgba(255,255,255,.7)", letterSpacing:".1em", textTransform:"uppercase" }}>Cédula Federal</p>
                <p style={{ fontFamily:"var(--mono)", fontSize:".9rem", fontWeight:500, color:"#fff" }}>11009616</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          8 · ¿QUÉ PASA DESPUÉS?
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"72px 24px", background:"var(--white)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <span className="section-label">Sin importar el resultado</span>
              <h2 className="section-title">Siempre obtienes claridad</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Tres escenarios, una certeza: saldrás con un camino concreto para ayudar a tu hijo.</p>
            </div>
          </Reveal>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { title:"TDAH confirmado", desc:"Plan de acción concreto: recomendaciones terapéuticas, adecuaciones curriculares para la escuela y estrategias específicas para casa. El informe tiene validez oficial.", accent:"var(--teal)" },
              { title:"No es TDAH — diagnóstico diferencial", desc:"El informe identifica qué sí está pasando: ansiedad, trastorno del aprendizaje, altas capacidades u otra condición. Saber qué no es TDAH evita intervenciones equivocadas.", accent:"var(--amber)" },
              { title:"Perfil mixto o subclínico", desc:"Si tu hijo muestra rasgos sin cumplir todos los criterios, recibes orientación sobre qué monitorear, cuándo revaluar y qué apoyos preventivos implementar desde ahora.", accent:"var(--success)" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ display:"flex", gap:16, padding:"20px 22px", background:"var(--cream)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", borderLeft:`3px solid ${item.accent}` }}>
                  <Check size={16} color={item.accent} style={{ flexShrink:0, marginTop:3 }} />
                  <div>
                    <h3 style={{ fontSize:".925rem", fontWeight:700, color:"var(--ink)", marginBottom:4 }}>{item.title}</h3>
                    <p style={{ fontSize:".85rem", color:"var(--ink-soft)", fontWeight:300, lineHeight:1.65 }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          9 · PRECIO + BOOKING (la sección de conversión)
      ══════════════════════════════════════════════════════ */}
      <section id="agendar" style={{ padding:"80px 24px 100px", background:"var(--cream)", borderTop:"1px solid var(--border)", scrollMarginTop:24 }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">Primer paso — sin compromiso</span>
              <h2 className="section-title" style={{ marginBottom:12 }}>Elige tu horario<br />y aparta tu lugar</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>La primera sesión es una conversación. Sin procedimientos, sin presión. Solo claridad.</p>
            </div>
          </Reveal>

          {/* Precio + garantía */}
          <Reveal delay={0.1} style={{ marginBottom:24 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16, marginBottom:20 }}>
              <div style={{ padding:"28px 28px", background:"var(--white)", border:"2px solid var(--teal-mid)", borderRadius:"var(--r-xl)", textAlign:"center" }}>
                <p style={{ fontSize:".7rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--teal)", marginBottom:8 }}>Valoración completa</p>
                <p className="price-badge">$7,000 MXN</p>
                <p style={{ fontSize:".75rem", color:"var(--ink-muted)", marginTop:6, fontWeight:300 }}>4-5 citas · Informe oficial · Sesión de devolución</p>
                <div style={{ height:1, background:"var(--border)", margin:"16px 0" }} />
                <p style={{ fontSize:".825rem", color:"var(--ink-soft)", fontWeight:400 }}>Anticipo al agendar: <strong style={{ color:"var(--teal)" }}>$1,000 MXN</strong></p>
                <p style={{ fontSize:".7rem", color:"var(--ink-muted)", fontWeight:300, marginTop:3 }}>Forma parte del total — no es un costo extra</p>
              </div>
              <div className="guarantee-strip" style={{ padding:"24px 24px", display:"flex", flexDirection:"column", justifyContent:"center", gap:12 }}>
                {[
                  [ShieldCheck, "Cancelación con reembolso completo hasta 48 hrs antes"],
                  [BadgeCheck,  "Informe con validez oficial ante SEP e IMSS"],
                  [Clock,       "Primer resultado disponible en 3 semanas"],
                  [Shield,      "Sin costos ocultos · El anticipo descuenta del total"],
                ].map(([Icon, text], i) => (
                  <div key={i} style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <Icon size={15} color="var(--success)" style={{ flexShrink:0 }} />
                    <span style={{ fontSize:".825rem", color:"var(--ink-soft)", fontWeight:300 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Cal.com iframe */}
          <Reveal delay={0.2}>
            <div style={{ background:"var(--white)", border:"2px solid var(--border)", borderRadius:"var(--r-xl)", overflow:"hidden", boxShadow:"var(--shadow-md)" }}>
              <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--border)", background:"var(--teal-light)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <CalendarCheck size={16} color="var(--teal)" />
                  <div>
                    <p style={{ fontSize:".825rem", fontWeight:700, color:"var(--teal)" }}>Selecciona fecha y hora</p>
                    <p style={{ fontSize:".7rem", color:"var(--ink-muted)" }}>Cancún, Quintana Roo · Horario local</p>
                  </div>
                </div>
                {!calLoaded && (
                  <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:".75rem", color:"var(--ink-muted)" }}>
                    <div style={{ width:12, height:12, borderRadius:"50%", border:"2px solid var(--teal-mid)", borderTopColor:"var(--teal)", animation:"spin 1s linear infinite" }} />
                    Cargando…
                  </div>
                )}
              </div>
              <div ref={calRef} style={{ minHeight:640, position:"relative" }}>
                {calVisible ? (
                  <iframe
                    src={`${CAL_URL}?embed=true&layout=month_view&theme=light`}
                    style={{ width:"100%", height:640, border:"none", display:"block" }}
                    loading="lazy"
                    onLoad={() => setCalLoaded(true)}
                    title="Agendar valoración TDAH infantil — Neuropsicóloga Karen Trujillo"
                    allow="payment"
                  />
                ) : (
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:640, flexDirection:"column", gap:12, color:"var(--ink-muted)" }}>
                    <CalendarCheck size={28} color="var(--teal-mid)" />
                    <p style={{ fontSize:".875rem", fontWeight:300 }}>Cargando calendario…</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* Trust footer */}
          <Reveal delay={0.3} style={{ marginTop:20 }}>
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"8px 24px", fontSize:".75rem", color:"var(--ink-muted)" }}>
              {[[Shield,"Anticipo 100% seguro"],[Clock,"Cancela hasta 48 hrs antes"],[BadgeCheck,"Cédula 11009616 · SEP"]].map(([Icon, t], i) => (
                <span key={i} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"var(--white)", border:"1px solid var(--border)", borderRadius:100 }}>
                  <Icon size={12} color="var(--teal)" />{t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* WhatsApp fallback */}
          <Reveal delay={0.4} style={{ marginTop:40, paddingTop:32, borderTop:"1px solid var(--border)" }}>
            <p style={{ textAlign:"center", fontSize:".85rem", color:"var(--ink-muted)", fontWeight:300, marginBottom:20 }}>¿Prefieres hablar antes de agendar?</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
              <a className="wa-btn" href={WA_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a className="cta-btn ghost" href={TEL}>
                <Phone size={13} /> Llamar
              </a>
            </div>
            <p style={{ textAlign:"center", fontSize:".7rem", color:"var(--ink-muted)", marginTop:12, fontWeight:300 }}>Lunes a Viernes 9:00–7:00 PM · Sábados 9:00–2:00 PM</p>
          </Reveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          10 · FAQ
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"80px 24px", background:"var(--white)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">Preguntas frecuentes</span>
              <h2 className="section-title">Todo lo que necesitas saber<br />antes de agendar</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ />
          </Reveal>

          {/* Final CTA inside FAQ */}
          <Reveal delay={0.2} style={{ marginTop:48, textAlign:"center" }}>
            <p style={{ fontFamily:"var(--serif)", fontSize:"1.35rem", fontStyle:"italic", color:"var(--ink-soft)", marginBottom:24 }}>La primera sesión no te compromete a nada —<br className="hide-mobile" /> solo te da información para decidir.</p>
            <a className="cta-btn large" href="#agendar" onClick={scrollTo("agendar")}>
              {symptomCount >= 5 ? "Tu hijo muestra señales — Reservar ahora" : "Reservar primera sesión"}
              <ArrowRight size={15} />
            </a>
            <p style={{ fontSize:".7rem", color:"var(--ink-muted)", marginTop:12 }}>$1,000 MXN para apartar tu lugar · Reembolso completo si cancelas con 48 hrs</p>
          </Reveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          11 · FOOTER STRIP
      ══════════════════════════════════════════════════════ */}
      <footer style={{ padding:"28px 24px", background:"var(--cream)", borderTop:"1px solid var(--border)", textAlign:"center" }}>
        <p style={{ fontSize:".75rem", color:"var(--ink-muted)", fontWeight:300 }}>
          © Neuropsicóloga Karen Trujillo · Cancún, Quintana Roo · Cédula 11009616
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"4px 20px", marginTop:10 }}>
          {[["TDAH en Adultos", "/evaluacion-tdah-adultos"], ["Autismo (TEA)", "/evaluacion-autismo-cancun"]].map(([label, href]) => (
            <a key={href} href={href} style={{ fontSize:".75rem", color:"var(--teal)", fontWeight:500, textDecoration:"underline", textUnderlineOffset:3 }}>{label}</a>
          ))}
        </div>
      </footer>


      {/* ══════════════════════════════════════════════════════
          STICKY CTA — mobile
      ══════════════════════════════════════════════════════ */}
      <div className={`sticky-bar${heroVisible ? " hidden" : ""}`} style={{ display:"flex", justifyContent:"center" }}>
        <a className="cta-btn" href="#agendar" onClick={scrollTo("agendar")} style={{ width:"100%", maxWidth:420, justifyContent:"center", padding:"17px 24px" }}>
          {symptomCount >= 5 ? "Tu hijo muestra señales — Reservar" : "Ver disponibilidad · Agendar ahora"}
          <ArrowRight size={14} />
        </a>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </>
  );
}
