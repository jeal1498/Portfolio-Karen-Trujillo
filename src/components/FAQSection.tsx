import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: '¿Cuántas sesiones dura una valoración de TDAH en Cancún?',
    answer: 'La valoración de TDAH incluye 4 sesiones: entrevista inicial y anamnesis, aplicación de pruebas neuropsicológicas estandarizadas (CONNERS, WISC-V, BRIEF-2 para niños; CAARS y DIVA 2.0 para adultos), análisis de resultados y sesión de devolución con informe clínico y recomendaciones. El proceso completo toma entre 2 y 3 semanas.',
  },
  {
    question: '¿A partir de qué edad se puede hacer la valoración de TDAH?',
    answer: 'La valoración de TDAH infantil se realiza a partir de los 5 años. Para adultos no hay límite de edad superior. El diagnóstico en adultos es especialmente relevante para personas que sospechan tener TDAH no diagnosticado en la infancia y llevan años con dificultades de concentración, organización o impulsividad.',
  },
  {
    question: '¿Qué incluye el diagnóstico de Autismo (TEA) para niños en Cancún?',
    answer: 'El diagnóstico de TEA incluye evaluación con instrumentos estandarizados como ADOS-2, M-CHAT-R/F, ADI-R y Vineland-3, entrevista a padres/tutores, observación conductual estructurada y elaboración de informe clínico con cédula federal 11009616, válido ante escuelas, IMSS e instituciones de apoyo. El proceso es aplicable desde los 2 años.',
  },
  {
    question: '¿El diagnóstico tiene validez oficial ante la escuela o el IMSS?',
    answer: 'Sí. Todos los informes emitidos están respaldados por cédula profesional federal 11009616 y tienen validez ante instituciones educativas, SEP, IMSS y dependencias gubernamentales. Incluyen recomendaciones de adecuaciones curriculares cuando aplica para facilitar apoyos escolares.',
  },
  {
    question: '¿Cuál es la diferencia entre TDAH y Autismo (TEA)?',
    answer: 'El TDAH afecta principalmente atención, hiperactividad, impulsividad y funciones ejecutivas; se diagnostica con pruebas de concentración, memoria de trabajo y control inhibitorio. El Autismo (TEA) impacta comunicación social, patrones de conducta repetitivos e integración sensorial; requiere evaluación de interacción social y desarrollo comunicativo. Ambos pueden coexistir (comorbilidad) y una valoración neuropsicológica diferencia ambas condiciones con precisión clínica.',
  },
  {
    question: '¿Ofreces valoraciones de TDAH o Autismo en línea?',
    answer: 'Algunas fases del proceso (entrevista inicial, sesión de devolución) pueden realizarse en línea para familias fuera de Cancún. Sin embargo, las pruebas neuropsicológicas estandarizadas requieren presencialidad en el consultorio de Cancún (SM200 M49 L2, Hacienda de Chinconcuac, 77539) para garantizar condiciones de aplicación estandarizadas y resultados válidos.',
  },
  {
    question: '¿Cuánto cuesta la valoración neuropsicológica?',
    answer: 'Los costos varían según el tipo de valoración (TDAH infantil, TDAH adultos o TEA). Contacta directamente por WhatsApp al +52 998 321 1547 para obtener información detallada y actual sobre costos. Se aceptan efectivo y transferencias bancarias.',
  },
  {
    question: '¿Garantizas confidencialidad en las evaluaciones?',
    answer: 'Sí. Toda la información clínica está protegida por secreto profesional conforme a la NOM-004-SSA3-2012. Los informes neuropsicológicos solo se entregan al paciente o tutor legal, nunca a terceros sin autorización expresa por escrito.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-32 bg-card px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground font-light">Sobre valoraciones de TDAH y Autismo en Cancún</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card hover:bg-secondary border-2 border-border hover:border-accent-blue rounded-lg transition-all data-[state=open]:border-primary data-[state=open]:bg-primary/[0.02] data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="p-6 font-bold text-primary hover:text-primary-dark transition-colors text-left [&[data-state=open]>span]:bg-primary [&[data-state=open]>span]:text-primary-foreground hover:no-underline">
                  <span className="flex-1">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground text-sm font-light leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="mt-12 p-8 bg-gradient-to-r from-accent-pink/20 to-accent-blue/10 rounded-xl border border-accent-pink/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-primary font-serif italic text-lg mb-4">"¿Tienes más preguntas sobre el proceso de valoración? Escríbeme sin compromiso."</p>
          <a
            href="https://wa.me/529983211547?text=Hola%20Karen,%20tengo%20preguntas%20sobre%20la%20valoración"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contactar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
