import { Html, Head, Main, NextScript } from 'next/document';

const medicalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Psic. Karen Trujillo — Valoraciones TDAH y Autismo en Cancún',
  image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SM200 M49 L2, Hacienda de Chinconcuac',
    addressLocality: 'Cancún',
    addressRegion: 'Quintana Roo',
    postalCode: '77539',
    addressCountry: 'MX',
  },
  url: 'https://psicologakarentrujillo.com.mx',
  telephone: '+529983211547',
  email: 'karentrujillopsic@gmail.com',
  priceRange: '$$',
  medicalSpecialty: 'Neuropsychiatry',
};

const professionalSchema = {
  '@context': 'https://schema.org',
  '@type': ['Physician', 'HealthcareProfessional'],
  name: 'Karen Trujillo',
  jobTitle: 'Neuropsicóloga Clínica — Especialista en TDAH y Autismo',
  url: 'https://psicologakarentrujillo.com.mx',
  image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
  description: 'Neuropsicóloga especializada en valoración de TDAH (infantil y adultos) y diagnóstico de Autismo (TEA) en Cancún. Cédula Federal 11009616. 7+ años de experiencia.',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Cédula Profesional Federal',
    credentialId: '11009616',
    issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.facebook.com/share/1Bs93MjeKt/',
    'https://www.instagram.com/psicologakarentrujillo',
    'https://www.tiktok.com/@psic.karentrujillo',
  ],
};

export default function Document() {
  return (
    <Html lang="es" className="scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalSchema) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
