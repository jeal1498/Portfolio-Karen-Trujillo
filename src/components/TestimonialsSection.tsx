import { Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'María G.',
    service: 'Paciente por 6 meses',
    rating: 5,
    review: '"Con Karen no solo hablé de mis problemas, aprendí herramientas prácticas para manejar la ansiedad. Su profesionalismo combinado con empatía genuina cambió mi vida. Muy recomendada."',
    bgColor: 'bg-accent-blue/20',
  },
  {
    name: 'Carlos L.',
    service: 'Evaluación TDAH',
    rating: 5,
    review: '"La evaluación neuropsicológica fue muy completa y profesional. Por fin entendí mi diagnóstico de TDAH y qué pasos seguir. Karen es excelente en su trato y conocimiento."',
    bgColor: 'bg-accent-pink/20',
  },
  {
    name: 'Sofía M.',
    service: 'Valoración TDAH Infantil',
    rating: 5,
    review: '"Por fin entendí por qué mi hijo tenía tantas dificultades en la escuela. Karen nos explicó todo con claridad y el informe nos abrió las puertas a los apoyos que necesitaba. Muy profesional y cercana."',
    bgColor: 'bg-accent-sand/20',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="py-32 bg-card px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-2 rounded-full border border-primary/10 bg-secondary text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-6 inline-block shadow-sm">
            Historias de Transformación
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Lo que dicen mis pacientes</h2>

          {/* Aggregate Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-primary">5.0</span>
            <span className="text-sm text-muted-foreground font-medium">(47 pacientes satisfechos)</span>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto font-light mt-4">Historias reales de personas que encontraron paz, clarity y transformación</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article 
              key={testimonial.name}
              className="bg-secondary rounded-xl p-8 border border-border hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${testimonial.bgColor} flex items-center justify-center`}>
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm font-light leading-relaxed italic">{testimonial.review}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
