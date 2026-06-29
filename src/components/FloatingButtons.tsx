import { Phone, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PHONE_E164, waUrl } from '@/lib/contact';

const WA_MSG = 'Hola Karen, vi tu página y me interesa agendar una valoración neuropsicológica. ¿Cuál es la disponibilidad?';

const FloatingButtons = () => {
  const shouldReduce = useReducedMotion();

  const bubbleVariants = {
    hidden: { opacity: 0, x: 24, scale: 0.85 },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: shouldReduce
        ? { duration: 0 }
        : { duration: 0.35, delay, ease: 'easeOut' as const },
    }),
  };

  return (
    <div className="fixed bottom-6 right-4 z-[60] flex flex-col items-end gap-2.5 lg:bottom-8 lg:right-8">
      {/* WhatsApp bubble */}
      <motion.a
        href={waUrl(WA_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex items-center gap-2 px-4 py-3 lg:w-14 lg:h-14 lg:rounded-full lg:justify-center rounded-2xl font-bold text-xs uppercase tracking-widest text-white shadow-xl active:scale-95 transition-transform hover:brightness-110"
        style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}
        variants={bubbleVariants}
        initial="hidden"
        animate="visible"
        custom={1.2}
      >
        <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="lg:hidden">WhatsApp</span>
      </motion.a>

      {/* Llamar bubble — mobile only */}
      <motion.a
        href={`tel:${PHONE_E164}`}
        aria-label="Llamar al consultorio"
        className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-transform hover:brightness-95"
        style={{
          background: 'rgba(255,255,255,0.95)',
          color: '#382f51',
          border: '1.5px solid rgba(56,47,81,0.18)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(56,47,81,0.12)',
        }}
        variants={bubbleVariants}
        initial="hidden"
        animate="visible"
        custom={1.4}
      >
        <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span>Llamar</span>
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
