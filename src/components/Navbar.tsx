import { useState, useEffect } from 'react';
import { Menu, Phone, X, ChevronDown, ChevronRight, Brain, User, Puzzle, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showValoraciones, setShowValoraciones] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [router.pathname]);

  const sectionLinks = [
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#faq', label: 'FAQ' },
  ];

  const valoraciones = [
    { href: '/evaluacion-tdah-ninos',    label: 'TDAH Infantil', sub: 'Niños 5-17 años',  icon: Brain },
    { href: '/evaluacion-tdah-adultos',  label: 'TDAH Adultos',  sub: 'Desde 18 años',    icon: User  },
    { href: '/evaluacion-autismo-cancun',label: 'Autismo (TEA)', sub: 'Desde 2 años',     icon: Puzzle},
  ];

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const sectionHref = (hash: string) => isHome ? hash : `/${hash}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300">
      <nav className={`glass max-w-6xl mx-auto rounded-2xl px-6 py-4 flex justify-between items-center transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-soft'}`}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-serif font-bold italic text-lg transition-transform group-hover:scale-110 group-hover:rotate-6">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-primary text-sm uppercase tracking-widest leading-none">Karen Trujillo</span>
            <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-[0.2em] mt-1">Neuropsicología · TDAH · Autismo</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setShowValoraciones(true)}
            onMouseLeave={() => setShowValoraciones(false)}
          >
            <button
              className="flex items-center gap-1 px-5 py-2 text-xs font-bold uppercase tracking-widest text-primary/70 hover:text-primary hover:bg-secondary rounded-lg transition-all"
              aria-haspopup="true"
              aria-expanded={showValoraciones}
            >
              Valoraciones <ChevronDown className={`w-3 h-3 transition-transform ${showValoraciones ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showValoraciones && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 pt-2 w-56"
                >
                  <div className="bg-card rounded-xl shadow-2xl border border-border p-2">
                    {valoraciones.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="flex flex-col px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <span className="text-xs font-bold text-primary">{v.label}</span>
                        <span className="text-[10px] text-muted-foreground">{v.sub}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              onClick={(e) => handleSectionClick(e, link.href)}
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-primary/70 hover:text-primary hover:bg-secondary rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:529983211547"
            className="px-4 py-2 text-xs font-bold text-primary hover:bg-secondary rounded-lg transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Llamar
          </a>
          <a
            href="https://wa.me/529983211547?text=Hola%20Karen,%20me%20interesa%20agendar%20una%20valoración"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground text-[11px] font-bold px-6 py-3 rounded-lg transition-all uppercase tracking-widest shadow-lg shadow-primary/20 transform hover:-translate-y-0.5"
          >
            Agendar Valoración
          </a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Menú"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu — glassmorphism */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1,    y: 0    }}
            exit={{   opacity: 0, scale: 0.96, y: -12  }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-20 left-4 right-4 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(91,83,160,0.72) 0%, rgba(72,68,140,0.80) 50%, rgba(100,90,170,0.72) 100%)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            {/* Ambient blobs */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(120,160,255,0.35) 0%, transparent 70%)' }} />
            <div className="pointer-events-none absolute -bottom-12 left-8 w-40 h-40 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(220,160,100,0.25) 0%, transparent 70%)' }} />

            <div className="relative z-10 p-6 flex flex-col gap-3">

              {/* Header: logo + close */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold italic text-xl"
                    style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                    K
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-widest leading-none">Karen Trujillo</p>
                    <p className="text-[9px] uppercase tracking-[0.18em] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      Neuropsicología · TDAH · Autismo
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
                  aria-label="Cerrar menú"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Valoraciones — icon cards */}
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] px-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Valoraciones
              </p>
              <div className="grid grid-cols-3 gap-2">
                {valoraciones.map((v) => {
                  const Icon = v.icon;
                  return (
                    <Link
                      key={v.href}
                      href={v.href}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl text-center transition-all active:scale-95"
                      style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.14)' }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-bold text-[10px] leading-tight">{v.label}</span>
                      <span className="text-[9px] leading-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>{v.sub}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Section links */}
              <div className="flex flex-col gap-0.5 mt-1">
                {sectionLinks.map((link) => (
                  <a
                    key={link.href}
                    href={sectionHref(link.href)}
                    onClick={(e) => handleSectionClick(e, link.href)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl transition-all active:scale-[0.98]"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-sm font-bold uppercase tracking-widest text-white">{link.label}</span>
                    <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                  </a>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-2 mt-1">
                <a
                  href="tel:529983211547"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <Phone className="w-4 h-4" />
                  Llamar
                </a>
                <a
                  href="https://wa.me/529983211547?text=Hola%20Karen,%20quiero%20agendar%20una%20valoración"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs text-white transition-all active:scale-95"
                  style={{ background: 'rgba(60,55,120,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <CalendarDays className="w-4 h-4" />
                  Agendar Valoración
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
