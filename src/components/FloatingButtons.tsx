import { Phone, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PHONE_E164, WA_NUMBER } from '@/lib/contact';

const FloatingButtons = () => {
  const shouldReduce = useReducedMotion();

  return (
    <>
      {/* Mobile bar */}
      <motion.div
        className="fixed bottom-6 left-4 right-4 z-[100] flex gap-3 lg:hidden"
        initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduce ? { duration: 0 } : { duration: 0.5, delay: 1 }}
      >
        <a
          href={`tel:${PHONE_E164}`}
          className="flex-1 bg-card/90 backdrop-blur-md text-primary border-2 border-card/50 py-4 rounded-lg font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-card"
        >
          <Phone className="w-4 h-4" /> Llamar
        </a>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=Hola%20Psicóloga%20Karen,%20vengo%20de%20tu%20web%20y%20me%20gustaría%20agendar%20una%20sesión`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] bg-whatsapp hover:opacity-90 text-primary-foreground py-4 rounded-lg font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 whatsapp-pulse active:scale-95"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </motion.div>

      {/* Desktop floating WhatsApp button */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=Hola%20Karen%2C%20me%20gustar%C3%ADa%20agendar%20una%20consulta`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-xl hover:scale-110 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </>
  );
};

export default FloatingButtons;
