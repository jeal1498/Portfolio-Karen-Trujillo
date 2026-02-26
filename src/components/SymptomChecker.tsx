import { useState } from 'react';
import { ArrowRight, CheckCircle2, Circle, AlertCircle, ShieldCheck, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SymptomCheckerProps {
  title?: string;
  subtitle?: string;
  symptoms: string[];
  waMessage: string;
  thresholds?: {
    low: { max: number; label: string; description: string; color: string };
    mid: { max: number; label: string; description: string; color: string };
    high: { label: string; description: string; color: string };
  };
}

const defaultThresholds = {
  low: {
    max: 2,
    label: 'Pocos indicadores por ahora',
    description: 'Marcaste pocas señales. Puede ser algo puntual o de desarrollo. Si persisten o aumentan con el tiempo, considera una consulta.',
    color: 'border-success bg-success/5',
  },
  mid: {
    max: 5,
    label: 'Vale la pena explorar',
    description: 'Varias de estas señales presentes de forma consistente pueden indicar que una valoración formal aportaría claridad. No es diagnóstico, es información.',
    color: 'border-accent-blue bg-accent-blue/5',
  },
  high: {
    label: 'Una valoración es recomendable',
    description: 'Marcaste muchas señales que, cuando son persistentes y aparecen en más de un contexto (casa, escuela, trabajo), justifican una evaluación neuropsicológica formal.',
    color: 'border-primary bg-primary/5',
  },
};

export default function SymptomChecker({
  title,
  subtitle,
  symptoms,
  waMessage,
  thresholds = defaultThresholds,
}: SymptomCheckerProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const count = selected.size;

  const getResult = () => {
    if (count <= thresholds.low.max) return thresholds.low;
    if (count <= thresholds.mid.max) return thresholds.mid;
    return thresholds.high;
  };

  const result = getResult();

  return (
    <div className="bg-secondary rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle className="w-5 h-5 text-accent-blue shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Herramienta orientativa — No es diagnóstico
          </span>
        </div>
        {title && <h3 className="text-2xl font-serif font-bold text-primary mb-2">{title}</h3>}
        {subtitle && <p className="text-muted-foreground text-sm font-light">{subtitle}</p>}
      </div>

      {/* Symptoms grid */}
      <div className="p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
          Selecciona todo lo que reconozcas ({count} seleccionado{count !== 1 ? 's' : ''})
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {symptoms.map((s, i) => {
            const isSelected = selected.has(i);
            return (
              <motion.button
                key={i}
                onClick={() => toggle(i)}
                whileTap={{ scale: 0.97 }}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer w-full
                  ${isSelected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-card hover:border-accent-blue/50 hover:bg-accent-blue/5'
                  }`}
              >
                <span className="shrink-0 mt-0.5 transition-colors">
                  {isSelected
                    ? <CheckCircle2 className="w-4 h-4 text-primary" />
                    : <Circle className="w-4 h-4 text-muted-foreground/40" />
                  }
                </span>
                <span className={`text-sm leading-snug transition-colors ${isSelected ? 'text-primary font-medium' : 'text-foreground font-light'}`}>
                  {s}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {count > 0 && (
            <motion.div
              key={count <= thresholds.low.max ? 'low' : count <= thresholds.mid.max ? 'mid' : 'high'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl border-2 p-6 mb-6 ${result.color}`}
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-primary mb-1">{result.label}</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{result.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/529983211547?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            {count > 0 ? 'Consultar con Karen sobre esto' : 'Agendar valoración'}
          </a>
          {count > 0 && (
            <button
              onClick={() => setSelected(new Set())}
              className="px-6 py-4 rounded-lg border-2 border-border text-xs font-bold uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              Reiniciar
            </button>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground/50 text-center mt-4">
          Esta herramienta es orientativa. Solo una valoración neuropsicológica formal puede establecer un diagnóstico.
        </p>
      </div>
    </div>
  );
}
