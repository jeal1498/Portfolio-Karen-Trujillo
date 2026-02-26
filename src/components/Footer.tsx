import React from "react";

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --deep:  #3c3868;
    --navy:  #3e3a6a;
    --slate: #46416f;
    --blue:  #7b9fd4;
    --pink:  #c67ba3;
    --sand:  #b0a5d8;
    --white: #f0eeff;
    --muted: rgba(220,215,255,.55);
    --line:  rgba(220,215,255,.12);
  }

  footer#contacto {
    background: linear-gradient(160deg, #383460 0%, #3e3a6a 55%, #393564 100%);
    color: var(--white);
    overflow: hidden;
    position: relative;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  footer#contacto::before {
    content: '';
    position: absolute;
    top: -160px; right: -160px;
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(91,156,246,.13) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  footer#contacto::after {
    content: '';
    position: absolute;
    bottom: -100px; left: 40%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(232,121,160,.09) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .footer-eyebrow {
    border-bottom: 1px solid var(--line);
    padding: 18px 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  .footer-eyebrow span {
    font-size: 10px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 400;
  }
  .eyebrow-dot {
    width: 5px; height: 5px;
    background: var(--blue);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .footer-main {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.6fr;
    gap: 0;
    padding: 72px 56px 64px;
    position: relative;
    z-index: 1;
  }

  .footer-col { padding-right: 48px; }
  .footer-col + .footer-col {
    border-left: 1px solid var(--line);
    padding-left: 48px;
    padding-right: 0;
  }
  .footer-col:last-child { padding-right: 0; }

  .brand-monogram {
    width: 58px; height: 58px;
    background: #ffffff;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px;
    font-style: italic;
    font-weight: 600;
    color: #2d2a4a;
    margin-bottom: 28px;
    position: relative;
  }
  .brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 21px;
    font-weight: 400;
    letter-spacing: .04em;
    margin-bottom: 6px;
    color: var(--white);
  }
  .brand-title {
    font-size: 10.5px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--blue);
    font-weight: 400;
    margin-bottom: 20px;
  }
  .brand-bio {
    font-size: 12.5px;
    line-height: 1.75;
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 32px;
    max-width: 240px;
  }

  .socials { display: flex; gap: 10px; }
  .social-btn {
    width: 42px; height: 42px;
    border: none;
    border-radius: 12px;
    background: rgba(255,255,255,.12);
    display: flex; align-items: center; justify-content: center;
    color: var(--white);
    text-decoration: none;
    transition: background .25s, transform .25s;
  }
  .social-btn:hover { background: rgba(123,159,212,.35); transform: translateY(-2px); }
  .social-btn.tiktok:hover { background: rgba(255,255,255,.22); }
  .social-btn.ig:hover { background: rgba(198,123,163,.35); }
  .social-btn svg { display: block; }

  .col-label {
    font-size: 9.5px;
    letter-spacing: .22em;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 28px;
  }
  .col-label span { color: var(--muted); }

  .nav-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 0; margin: 0;
  }
  .nav-list a {
    font-size: 13px;
    font-weight: 300;
    color: rgba(240,236,230,.6);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: color .22s, gap .22s;
    line-height: 1.4;
  }
  .nav-list a::before {
    content: '—';
    font-size: 10px;
    color: var(--sand);
    opacity: 0;
    transition: opacity .22s;
    flex-shrink: 0;
  }
  .nav-list a:hover { color: var(--white); gap: 12px; }
  .nav-list a:hover::before { opacity: 1; }

  .contact-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 18px;
    border-radius: 12px;
    text-decoration: none;
    color: var(--white);
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.08);
    transition: background .25s, transform .25s;
    margin-bottom: 12px;
  }
  .contact-card:hover { background: rgba(123,159,212,.18); transform: translateX(4px); }
  .contact-card:last-of-type:hover { background: rgba(198,123,163,.18); }

  .card-icon {
    width: 38px; height: 38px;
    background: rgba(255,255,255,.10);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: var(--blue);
    flex-shrink: 0;
  }
  .contact-card:last-of-type .card-icon { color: var(--pink); }

  .card-label {
    font-size: 9.5px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
    display: block;
  }
  .card-value { font-size: 13px; font-weight: 500; color: var(--white); }

  .hours-block {
    margin-top: 18px;
    padding: 16px 18px;
    border-radius: 12px;
    border-left: 2px solid var(--sand);
    background: rgba(255,255,255,.05);
  }
  .hours-title {
    font-size: 9.5px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--sand);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hours-title svg { flex-shrink: 0; }
  .hours-row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 300;
    color: var(--muted);
    margin-bottom: 5px;
  }
  .hours-row strong { color: rgba(240,236,230,.75); font-weight: 400; }

  .footer-bottom {
    border-top: 1px solid var(--line);
    padding: 22px 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    position: relative;
    z-index: 1;
  }
  .footer-bottom p {
    font-size: 10px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: rgba(240,236,230,.28);
    font-weight: 400;
  }
  .bottom-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(240,236,230,.28);
  }
  .badge-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--sand);
    flex-shrink: 0;
  }

  @media (max-width: 960px) {
    .footer-main {
      grid-template-columns: 1fr 1fr;
      gap: 40px 0;
      padding: 56px 32px 48px;
    }
    .footer-col { padding-right: 32px; }
    .footer-col + .footer-col { padding-left: 32px; }
    .footer-col:nth-child(3) { border-left: none; padding-left: 0; }
    .footer-eyebrow, .footer-bottom { padding: 16px 32px; }
  }
  @media (max-width: 600px) {
    .footer-main { grid-template-columns: 1fr; padding: 40px 24px; }
    .footer-col + .footer-col {
      border-left: none;
      padding-left: 0;
      border-top: 1px solid var(--line);
      padding-top: 32px;
    }
    .footer-eyebrow, .footer-bottom {
      padding: 14px 24px;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <>
      <style>{footerStyles}</style>

      <footer id="contacto">

        {/* TOP EYEBROW */}
        <div className="footer-eyebrow">
          <span>Cancún, Quintana Roo · México</span>
          <div className="eyebrow-dot" />
          <span>Cédula Federal: 11009616</span>
          <div className="eyebrow-dot" />
          <span>Neuropsicología Clínica Especializada</span>
        </div>

        {/* MAIN GRID */}
        <div className="footer-main">

          {/* ① Brand */}
          <div className="footer-col">
            <div className="brand-monogram">K</div>
            <p className="brand-name">Karen Trujillo</p>
            <p className="brand-title">Neuropsicóloga</p>
            <p className="brand-bio">
              Especialista en valoración de TDAH y Autismo en Cancún. Diagnóstico preciso con instrumentos estandarizados internacionales.
            </p>
            <div className="socials">
              <a
                href="https://www.facebook.com/share/1Bs93MjeKt/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="Facebook"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/psicologakarentrujillo"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn ig"
                title="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@psic.karentrujillo"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn tiktok"
                title="TikTok"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          {/* ② Valoraciones */}
          <div className="footer-col">
            <p className="col-label">
              <span style={{ color: "var(--blue)" }}>Valoraciones</span>
            </p>
            <ul className="nav-list">
              <li><a href="/evaluacion-tdah-ninos">Valoración TDAH Infantil</a></li>
              <li><a href="/evaluacion-tdah-adultos">Valoración TDAH Adultos</a></li>
              <li><a href="/evaluacion-autismo-cancun">Diagnóstico Autismo (TEA)</a></li>
            </ul>
          </div>

          {/* ③ Blog */}
          <div className="footer-col">
            <p className="col-label">
              <span style={{ color: "var(--pink)" }}>Blog</span>
            </p>
            <ul className="nav-list">
              <li>
                <a href="/blog/senales-tdah-ninos">
                  ¿Tu hijo no pone atención? Señales reales de TDAH vs. comportamiento típico
                </a>
              </li>
              <li>
                <a href="/blog/tdah-adultos-diagnostico-tardio">
                  TDAH en adultos: por qué miles de personas llegan al diagnóstico después de los 30
                </a>
              </li>
              <li>
                <a href="/blog/que-es-ados-2-autismo">
                  ¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?
                </a>
              </li>
            </ul>
          </div>

          {/* ④ Contact */}
          <div className="footer-col" style={{ paddingLeft: "48px" }}>
            <p className="col-label">
              <span style={{ color: "var(--blue)" }}>Contacto Directo</span>
            </p>

            <a href="tel:529983211547" className="contact-card">
              <div className="card-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.81 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <span className="card-label">Llamar</span>
                <span className="card-value">+52 998 321 1547</span>
              </div>
            </a>

            <a href="mailto:karentrujillopsic@gmail.com" className="contact-card">
              <div className="card-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span className="card-label">Email</span>
                <span className="card-value">karentrujillopsic@gmail.com</span>
              </div>
            </a>

            <div className="hours-block">
              <p className="hours-title">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Horario de atención
              </p>
              <div className="hours-row">
                <strong>Lun – Vie</strong>
                <span>9:00 AM – 8:00 PM</span>
              </div>
              <div className="hours-row">
                <strong>Sábado</strong>
                <span>9:00 AM – 2:00 PM</span>
              </div>
            </div>
          </div>

        </div>{/* /footer-main */}

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <p>© 2025 Karen Trujillo · Todos los derechos reservados</p>
          <div className="bottom-badge">
            <div className="badge-dot" />
            <span>Cancún, Quintana Roo · México</span>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;
