import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingButtons = () => {
  return (
    <motion.div 
      className="fixed bottom-6 left-4 right-4 z-[100] flex gap-3 lg:hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <a 
        href="tel:529983211547" 
        className="flex-1 bg-card/90 backdrop-blur-md text-primary border-2 border-card/50 py-4 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-card"
      >
        <Phone className="w-4 h-4" /> Llamar
      </a>
      <a 
        href="https://wa.me/529983211547?text=Hola%20Psicóloga%20Karen,%20vengo%20de%20tu%20web%20y%20me%20gustaría%20agendar%20una%20sesión" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[1.5] bg-whatsapp hover:opacity-90 text-primary-foreground py-4 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 whatsapp-pulse active:scale-95"
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
    </motion.div>
  );
};

export default FloatingButtons;
