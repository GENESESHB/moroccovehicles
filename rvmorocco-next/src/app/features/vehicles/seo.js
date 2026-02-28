// ❌ SUPPRIMER : import { faqs } from './faqs';

export const metadata = {
  title: "Gestion de Flotte & Parc Automobile Maroc | Smart Car Location",
  description: "Système complet de gestion de parc automobile au Maroc : fiches véhicules, suivi kilométrage, gestion des documents légaux (assurances) et coûts de réparation.",
  keywords: [
    "gestion parc automobile Maroc",
    "logiciel suivi véhicules",
    "flotte automobile location",
    "fiches véhicules détaillées",
    "suivi assurance contrôle technique auto",
    "logiciel gestion dommages véhicule",
    "Smart Car Location"
  ],
  authors: [{ name: "Smart Car Location" }],
  creator: "Smart Car Location",
  publisher: "Smart Car Location",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://moroccovehicles.com/features/vehicles", // ✅ Sans espace
  },
  openGraph: {
    title: "Logiciel de Gestion de Parc Automobile | Smart Car Location",
    description: "Pilotez sereinement votre agence de location : disponibilité en temps réel, alertes d'entretien et gestion documentaire de votre flotte.",
    url: "https://moroccovehicles.com/features/vehicles", // ✅ Sans espace
    siteName: "Smart Car Location",
    images: [
      {
        url: "https://moroccovehicles.com/images/og-vehicles-fleet.jpg", // ✅ URL absolue
        width: 1200,
        height: 630,
        alt: "Interface de gestion de flotte de véhicules",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestion de Flotte Automobile | Smart Car Location",
    description: "Le suivi de votre flotte automobile simplifié avec notre solution Saas 100% connectée.",
    images: ["https://moroccovehicles.com/images/twitter-vehicles.jpg"], // ✅ URL absolue
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ✅ UNIQUEMENT SoftwareApplication - PAS de FAQPage ici
export const jsonLd = {
  "@context": "https://schema.org", // ✅ Sans espace
  "@type": "SoftwareApplication",
  "name": "Smart Car Location - Module Flotte",
  "applicationCategory": "BusinessApplication",
  "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"], // ✅ Sans espace
  "operatingSystem": "Web, iOS, Android",
  "offers": { 
    "@type": "Offer", 
    "price": "0", 
    "priceCurrency": "MAD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Fiches véhicules détaillées avec galerie photos",
    "Suivi kilométrage et planification auto des maintenances",
    "Coffre-fort numérique pour documents légaux avec alertes d'expiration",
    "Gestion complète des sinistres et réparations"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
};