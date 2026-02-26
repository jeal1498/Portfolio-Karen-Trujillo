import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { motion } from 'framer-motion';

interface RelatedArticle {
  href: string;
  label: string;
  description: string;
}

interface BlogLayoutProps {
  breadcrumb: string;
  category: string;
  categoryColor?: string;
  title: string;
  subtitle?: string;
  readTime: string;
  publishDate: string;
  children: ReactNode;
  relatedArticles?: RelatedArticle[];
  ctaText?: string;
  ctaMessage?: string;
  accentColor?: 'blue' | 'sand' | 'pink';
}

const BlogLayout = ({
  breadcrumb,
  category,
  categoryColor = 'bg-accent-blue/10 border-accent-blue/20 text-primary',
  title,
  subtitle,
  readTime,
  publishDate,
  children,
  relatedArticles = [],
  ctaText = 'Agendar Valoración',
  ctaMessage = 'Hola%20Karen,%20le%C3%AD%20tu%20blog%20y%20me%20gustar%C3%ADa%20agendar%20una%20valoraci%C3%B3n',
  accentColor = 'blue',
}: BlogLayoutProps) => {
  const accentMap = {
    blue: 'bg-accent-blue/20',
    sand: 'bg-accent-sand/30',
    pink: 'bg-accent-pink/30',
  };

  return (
    <div className="antialiased selection:bg-accent-blue selection:text-primary pb-24 lg:pb-0">
      <Navbar />
      <main>
        <section className="relative pt-36 pb-16 px-6 overflow-hidden bg-soft-gradient">
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${accentMap[accentColor]} rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 animate-pulse`} />
          <div className="max-w-3xl mx-auto relative z-10">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                <li>/</li>
                <li className="text-primary font-medium">{breadcrumb}</li>
              </ol>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-4 ${categoryColor}`}>
                {category}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-[1.15] mb-4 text-balance">{title}</h1>
              {subtitle && <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6 text-balance">{subtitle}</p>}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4 mt-4">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" aria-hidden="true" />Neuropsicóloga Karen Trujillo — Cédula 11009616</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" aria-hidden="true" />{publishDate}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" />{readTime} de lectura</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6 bg-card">
          <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="prose-blog">{children}</div>
          </motion.div>
        </section>

        <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60 mb-3">Neuropsicóloga Karen Trujillo · Cancún</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Quieres dar el primer paso?</h2>
            <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
              La Neuropsicóloga Karen Trujillo atiende en Cancún con cédula federal 11009616. Agenda una consulta inicial por WhatsApp sin compromiso.
            </p>
            <a
              href={`https://wa.me/529983211547?text=${ctaMessage}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg"
            >
              {ctaText} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        {relatedArticles.length > 0 && (
          <section className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-serif font-bold text-primary mb-6">También te puede interesar</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedArticles.map((article) => (
                  <Link key={article.href} href={article.href} className="group bg-card p-5 rounded-xl border border-border hover:border-primary hover:shadow-card transition-all">
                    <p className="font-bold text-sm text-primary mb-1 group-hover:underline">{article.label}</p>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">{article.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary/60 mt-3 group-hover:text-primary transition-colors">
                      Leer artículo <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-primary/60 hover:text-primary transition-colors">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Volver al inicio
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default BlogLayout;
