import { Html, Head, Main, NextScript } from 'next/document';

const medicalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': 'https://www.psicologakarentrujillo.com.mx/#clinic',
  name: 'Psic. Karen Trujillo — Valoraciones TDAH y Autismo en Cancún',
  image: 'https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SM200 M49 L2, Hacienda de Chinconcuac',
    addressLocality: 'Cancún',
    addressRegion: 'Quintana Roo',
    postalCode: '77539',
    addressCountry: 'MX',
  },
  url: 'https://www.psicologakarentrujillo.com.mx',
  telephone: '+529983211547',
  email: 'karentrujillopsic@gmail.com',
  priceRange: '$$',
  medicalSpecialty: 'Neuropsychiatry',
  areaServed: [
    { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
    { '@type': 'City', name: 'Playa del Carmen', sameAs: 'https://www.wikidata.org/wiki/Q505403' },
    { '@type': 'City', name: 'Tulum', sameAs: 'https://www.wikidata.org/wiki/Q697023' },
    { '@type': 'City', name: 'Mérida', sameAs: 'https://www.wikidata.org/wiki/Q15678' },
    { '@type': 'City', name: 'Isla Mujeres' },
    { '@type': 'AdministrativeArea', name: 'Quintana Roo', sameAs: 'https://www.wikidata.org/wiki/Q10507' },
    { '@type': 'AdministrativeArea', name: 'Riviera Maya' },
  ],
};

const professionalSchema = {
  '@context': 'https://schema.org',
  '@type': ['Physician', 'HealthcareProfessional'],
  '@id': 'https://www.psicologakarentrujillo.com.mx/#physician',
  name: 'Karen Trujillo',
  jobTitle: 'Neuropsicóloga Clínica — Especialista en TDAH y Autismo',
  url: 'https://www.psicologakarentrujillo.com.mx',
  image: 'https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
  description: 'Neuropsicóloga especializada en valoración de TDAH (infantil y adultos) y diagnóstico de Autismo (TEA) en Cancún. Cédula Federal 11009616. 7+ años de experiencia. Miembro del Colegio de Psicólogos de Quintana Roo.',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Cédula Profesional Federal',
    credentialId: '11009616',
    issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universidad Modelo',
    address: { '@type': 'PostalAddress', addressLocality: 'Mérida', addressRegion: 'Yucatán', addressCountry: 'MX' },
  },
  memberOf: {
    '@type': 'Organization',
    name: 'Colegio de Psicólogos de Quintana Roo',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Neuropsicóloga Clínica',
    skills: ['Evaluación neuropsicológica', 'Diagnóstico TDAH', 'Diagnóstico TEA', 'ADOS-2', 'WISC-V', 'CONNERS-3', 'CAARS-2', 'WAIS-IV'],
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
