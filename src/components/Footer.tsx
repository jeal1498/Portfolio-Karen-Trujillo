import Link from 'next/link';
import type { ComponentType } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { PHONE_NUMBER, waUrl, SOCIAL } from '@/lib/contact';
import { CEDULA, REVIEWS } from '@/lib/site';

const SERVICIOS = [
  { href: '/evaluacion-tdah-ninos', label: 'TDAH Infantil' },
  { href: '/evaluacion-tdah-adultos', label: 'TDAH Adultos' },
  { href: '/evaluacion-autismo-cancun', label: 'Autismo (TEA)' },
];

const INFORMACION = [
  { href: '/blog', label: 'Blog' },
  { href: '/#proceso', label: 'Proceso de evaluación' },
  { href: '/#faq', label: 'Preguntas frecuentes' },
];

// Lucide no incluye TikTok; SVG de marca propio (hereda color vía currentColor).
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const SOCIAL_LINKS: { href: string; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { href: SOCIAL.instagram, label: 'Instagram', Icon: Instagram },
  { href: SOCIAL.facebook, label: 'Facebook', Icon: Facebook },
  { href: SOCIAL.tiktok, label: 'TikTok', Icon: TikTokIcon },
];

const FooterCol = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[#d0d0e7]/50 mb-4">
      {title}
    </p>
    {children}
  </div>
);

const FooterLink = ({ href, className = '', children }: { href: string; className?: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className={`font-sans text-[0.875rem] text-white/70 hover:text-white transition-colors ${className}`}
    style={{ textDecoration: 'none' }}
  >
    {children}
  </Link>
);

const Footer = () => (
  <footer style={{ background: '#2b1f47' }} role="contentinfo">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-14 border-b border-white/10">

        {/* Brand */}
        <div>
          <p className="font-serif text-[1.35rem] text-white mb-1 leading-none">Karen Trujillo</p>
          <p className="font-sans text-[0.75rem] font-bold tracking-[0.06em] uppercase text-[#d0d0e7]/60 mb-3 mt-1">
            Neuropsicóloga en Cancún
          </p>
          <p className="font-sans text-[0.8rem] text-[#d0d0e7]/55">Cédula Federal {CEDULA}</p>
          <p className="text-amber-400 text-[0.85rem] tracking-[0.05em] mt-1">★★★★★ {REVIEWS.ratingValue}</p>
        </div>

        {/* Servicios */}
        <FooterCol title="Servicios">
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {SERVICIOS.map(({ href, label }) => (
              <li key={href}>
                <FooterLink href={href}>{label}</FooterLink>
              </li>
            ))}
          </ul>
        </FooterCol>

        {/* Información */}
        <FooterCol title="Información">
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {INFORMACION.map(({ href, label }) => (
              <li key={href}>
                <FooterLink href={href}>{label}</FooterLink>
              </li>
            ))}
          </ul>
        </FooterCol>

        {/* Contacto */}
        <FooterCol title="Contacto">
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            <li>
              <a
                href={`tel:+${PHONE_NUMBER}`}
                className="font-sans text-[0.875rem] text-white/70 hover:text-white transition-colors"
                style={{ textDecoration: 'none' }}
              >
                +52 998 321 1547
              </a>
            </li>
            <li>
              <a
                href={waUrl('Hola Karen, me interesa agendar una valoración')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[0.875rem] font-bold text-[#25d366]"
                style={{ textDecoration: 'none' }}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <span className="font-sans text-[0.875rem] text-white/55">Cancún, Quintana Roo</span>
            </li>
            <li className="pt-2">
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de Karen Trujillo`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#d0d0e7]/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </FooterCol>

      </div>

      {/* Copyright */}
      <div className="py-5 text-center">
        <p className="font-sans text-[0.78rem] text-[#d0d0e7]/40 m-0">
          © 2025 Karen Trujillo. Todos los derechos reservados.
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;
