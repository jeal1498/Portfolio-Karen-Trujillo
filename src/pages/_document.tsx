import { Html, Head, Main, NextScript } from 'next/document';
import { PHONE_E164, SOCIAL_PROFILES } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE, ADDRESS, GEO, HOURS, REVIEWS } from '@/lib/site';

const medicalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'MedicalClinic'],
  '@id': `${SITE_URL}/#clinic`,
  name: 'Psic. Karen Trujillo — Valoraciones TDAH y Autismo en Cancún',
  alternateName: 'Neuropsicóloga Karen Trujillo Cancún',
  image: KAREN_IMAGE,
  address: {
    '@type': 'PostalAddress',
    ...ADDRESS,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  url: SITE_URL,
  telephone: PHONE_E164,
  email: 'karentrujillopsic@gmail.com',
  priceRange: '$$',
  medicalSpecialty: 'Neuropsychiatry',
  currenciesAccepted: 'MXN',
  paymentAccepted: 'Efectivo, Transferencia bancaria, Tarjeta',
  hasMap: 'https://maps.google.com/?cid=4630406520710891531',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: HOURS.weekdays.opens,
      closes: HOURS.weekdays.closes,
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: HOURS.saturday.opens,
      closes: HOURS.saturday.closes,
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
    { '@type': 'City', name: 'Playa del Carmen', sameAs: 'https://www.wikidata.org/wiki/Q505403' },
    { '@type': 'City', name: 'Tulum', sameAs: 'https://www.wikidata.org/wiki/Q697023' },
    { '@type': 'City', name: 'Mérida', sameAs: 'https://www.wikidata.org/wiki/Q15678' },
    { '@type': 'City', name: 'Isla Mujeres' },
    { '@type': 'AdministrativeArea', name: 'Quintana Roo', sameAs: 'https://www.wikidata.org/wiki/Q10507' },
    { '@type': 'AdministrativeArea', name: 'Riviera Maya' },
  ],
  sameAs: SOCIAL_PROFILES,
};

const professionalSchema = {
  '@context': 'https://schema.org',
  '@type': ['Physician', 'HealthcareProfessional'],
  '@id': `${SITE_URL}/#physician`,
  name: 'Karen Trujillo',
  jobTitle: 'Neuropsicóloga Clínica — Especialista en TDAH y Autismo',
  url: SITE_URL,
  image: KAREN_IMAGE,
  description: `Neuropsicóloga especializada en valoración de TDAH (infantil y adultos) y diagnóstico de Autismo (TEA) en Cancún. Cédula Federal ${CEDULA}. 7+ años de experiencia. Miembro del Colegio de Psicólogos de Quintana Roo.`,
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Cédula Profesional Federal',
    credentialId: CEDULA,
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
    ratingValue: REVIEWS.ratingValue,
    reviewCount: REVIEWS.reviewCount,
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: SOCIAL_PROFILES,
};

export default function Document() {
  return (
    <Html lang="es-MX" className="scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gloock&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
