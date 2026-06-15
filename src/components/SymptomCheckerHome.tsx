'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { waUrl } from '@/lib/contact';

const tabs = [
  {
    id: 'ninos',
    label: 'TDAH Niños',
    sub: '5–17 años',
    waMsg: 'Hola Karen, mi hijo tiene varias señales de TDAH que identifiqué en tu checklist. Me gustaría agendar una valoración.',
    symptoms: [
      'No termina tareas que empezó',
      'Se distrae con cualquier cosa',
      'Olvida materiales, citas o instrucciones',
      'Se mueve constantemente o no puede estar sentado',
      'Interrumpe conversaciones o no espera su turno',
      'Tiene explosiones emocionales frecuentes',
    ],
  },
  {
    id: 'adultos',
    label: 'TDAH Adultos',
    sub: '+18 años',
    waMsg: 'Hola Karen, identifiqué varias señales de TDAH en adultos en tu checklist. Me gustaría agendar una valoración.',
    symptoms: [
      'Procrastinas cosas importantes hasta el último minuto',
      'Pierdes objetos (llaves, celular) constantemente',
      'Empiezas proyectos y no los terminas',
      'Las reuniones o lecturas largas te agotan',
      'Olvidas compromisos o citas importantes',
      'Te cuesta mantener el orden en casa o trabajo',
    ],
  },
  {
    id: 'tea',
    label: 'Autismo (TEA)',
    sub: 'Niños y adultos',
    waMsg: 'Hola Karen, identifiqué varias señales de autismo en tu checklist. Me gustaría agendar una evaluación.',
    symptoms: [
      'Prefiere jugar solo o tiene pocas amistades',
      'Le cuesta entender bromas, ironía o doble sentido',
      'Tiene rutinas rígidas o se altera mucho con cambios',
      'Sensibilidad inusual a sonidos, texturas o luces',
      'Interés muy intenso en uno o dos temas específicos',
      'Dificultad para expresar emociones o leerlas en otros',
    ],
  },
];

const THRESHOLD = 3;

export default function SymptomCheckerHome() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState<Record<number, Set<number>>>({ 0: new Set(), 1: new Set(), 2: new Set() });

  const toggle = (tabIdx: number, symptomIdx: number) => {
    setSelected((prev) => {
      const next = new Set(prev[tabIdx]);
      next.has(symptomIdx) ? next.delete(symptomIdx) : next.add(symptomIdx);
      return { ...prev, [tabIdx]: next };
    });
  };

  const currentTab = tabs[activeTab];
  const currentSelected = selected[activeTab];
  const count = currentSelected.size;
  const showCta = count >= THRESHOLD;

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex border-b border-border bg-secondary/40">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-4 px-3 text-center transition-all duration-200 relative ${
              activeTab === i
                ? 'bg-card text-primary'
                : 'text-muted-foreground hover:text-primary hover:bg-secondary/60'
            }`}
          >
            <span className="block text-xs font-bold uppercase tracking-widest leading-none mb-1">{tab.label}</span>
            <span className="block text-[10px] text-muted-foreground/70 font-medium">{tab.sub}</span>
            {activeTab === i && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
          Selecciona lo que reconozcas ({count} de 6 seleccionado{count !== 1 ? 's' : ''})
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {currentTab.symptoms.map((symptom, i) => {
            const isSelected = currentSelected.has(i);
            return (
              <button
                key={i}
                onClick={() => toggle(activeTab, i)}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 w-full ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-secondary/30 hover:border-accent/40 hover:bg-accent/5'
                }`}
              >
                <span className="shrink-0 mt-0.5">
                  {isSelected
                    ? <CheckCircle2 className="w-4 h-4 text-primary" />
                    : <Circle className="w-4 h-4 text-muted-foreground/40" />
                  }
                </span>
                <span className={`text-sm leading-snug ${isSelected ? 'text-primary font-medium' : 'text-foreground font-light'}`}>
                  {symptom}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {showCta && (
            <motion.div
              key="cta"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border-2 border-primary bg-primary/5 p-5 mb-4"
            >
              <p className="font-bold text-primary text-sm mb-1">Varias señales presentes — puede valer la pena explorar</p>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Marcaste {count} de 6. Cuando estas señales son persistentes y aparecen en más de un contexto, una evaluación neuropsicológica aporta claridad. No es un diagnóstico — es información.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={waUrl(showCta ? currentTab.waMsg : 'Hola Karen, me interesa agendar una valoración neuropsicológica.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
        >
          <MessageCircle className="w-4 h-4" />
          {showCta ? 'Consultar con Karen sobre esto' : 'Agendar valoración'}
        </a>

        <p className="text-[10px] text-muted-foreground/40 text-center mt-3">
          Herramienta orientativa — no reemplaza una evaluación clínica formal
        </p>
      </div>
    </div>
  );
}
