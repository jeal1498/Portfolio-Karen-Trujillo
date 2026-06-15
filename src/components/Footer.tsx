import Link from 'next/link';
import { PHONE_NUMBER, waUrl } from '@/lib/contact';

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
          <p className="font-sans text-[0.8rem] text-[#d0d0e7]/55">Cédula Federal 11009616</p>
          <p className="text-amber-400 text-[0.85rem] tracking-[0.05em] mt-1">★★★★★ 5.0</p>
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
