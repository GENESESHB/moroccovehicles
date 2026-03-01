export const metadata = {
  title: "Logiciel Gestion Maintenance & Flotte Auto Maroc 2026 | Smart Car Location",
  description: "Solution n°1 au Maroc en 2026 pour la gestion de l'entretien de flotte automobile. Planifiez vos révisions, recevez des alertes automatiques, suivez le carnet d'entretien numérique et optimisez vos coûts (préventif vs curatif).",
  keywords: [
    "gestion maintenance flotte automobile",
    "logiciel entretien véhicule 2026",
    "suivi maintenance voiture Maroc",
    "carnet entretien numérique",
    "gestion de flotte auto",
    "planification révisions véhicules",
    "Smart Car Location",
    "optimisation coûts entretien auto",
    "rappels automatiques vidange",
    "logiciel gestion parc automobile",
    "suivi curatif et préventif flotte",
    "application garage auto",
    "entretien auto de luxe",
    "entretien Ferrari Lamborghini Porsche Maroc"
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
    canonical: "https://moroccovehicles.com/features/maintenance ",
  },
  openGraph: {
    title: "Logiciel Maintenance & Suivi Flotte 2026 | Smart Car Location",
    description: "Anticipez et gérez les entretiens de vos véhicules de location avec notre solution SaaS avancée.",
    url: "https://moroccovehicles.com/features/maintenance ",
    siteName: "Smart Car Location",
    images: [
      {
        url: "https://moroccovehicles.com/images/og-maintenance-flotte.jpg ",
        width: 1200,
        height: 630,
        alt: "Tableau de bord de gestion de maintenance automobile Smart Car Location",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logiciel Entretien Flotte Auto 2026 | Smart Car Location",
    description: "Gérez l'entretien de vos véhicules facilement : révisions prioritaires, rappels automatiques, suivi budgétaire 100% cloud.",
    images: ["https://moroccovehicles.com/images/twitter-maintenance.jpg "],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "technology",
};

// JSON-LD structured data for Google Rich Results (SEO Schema Markup)
export const jsonLd = {
  "@context": "https://schema.org ",
  "@type": "SoftwareApplication",
  "name": "Smart Car Location - Module Maintenance",
  "operatingSystem": "Web, iOS, Android",
  "applicationCategory": "BusinessApplication",
  "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/ "],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MAD",
    "availability": "https://schema.org/InStock ",
    "description": "Essai gratuit de 14 jours"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "128"
  },
  "description": "Logiciel de gestion de maintenance pour flotte automobile au Maroc. Planification des révisions, rappels automatiques et carnet d'entretien numérique.",
  "publisher": {
    "@type": "Organization",
    "name": "Smart Car Location",
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MA"
      }
    }
  }
};