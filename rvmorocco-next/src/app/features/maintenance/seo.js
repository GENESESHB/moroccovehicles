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
    canonical: "https://moroccovehicles.com/features/maintenance",
  },
  openGraph: {
    title: "Logiciel Maintenance & Suivi Flotte 2026 | Smart Car Location",
    description: "Anticipez et gérez les entretiens de vos véhicules de location avec notre solution SaaS avancée.",
    url: "https://moroccovehicles.com/features/maintenance",
    siteName: "Smart Car Location",
    images: [
      {
        url: "https://moroccovehicles.com/images/og-maintenance-flotte.jpg",
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
    images: ["https://moroccovehicles.com/images/twitter-maintenance.jpg"],
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
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Smart Car Location - Module Maintenance",
  "operatingSystem": "Web, iOS, Android",
  "applicationCategory": "BusinessApplication",
  "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MAD",
    "availability": "https://schema.org/InStock",
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

// FAQ Schema Markup
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment fonctionne le logiciel de gestion de maintenance auto ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre logiciel centralise toutes les données de vos véhicules. Vous planifiez les révisions par kilométrage, par date ou temps passé (vidange, freins). Le système vous alerte automatiquement avant l'échéance et conserve un carnet numérique complet pour chaque intervention."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je suivre à la fois la maintenance préventive et curative ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument ! Le tableau de bord Smart Car Location vous permet d'équilibrer vos opérations préventives (visites de routine) et curatives (réparations imprévues), avec un reporting détaillé des coûts pour chaque type."
      }
    },
    {
      "@type": "Question",
      "name": "Est-ce adapté pour des véhicules de luxe (Ferrari, Porsche, Lamborghini) au Maroc ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, notre logiciel est parfait pour les flottes haut de gamme. Chaque véhicule dispose de son propre calendrier personnalisable, essentiel pour respecter les spécifications rigoureuses d'entretien des marques comme Ferrari, Rolls-Royce ou Maserati."
      }
    },
    {
      "@type": "Question",
      "name": "Comment le carnet d'entretien numérique impacte-t-il la valeur de revente ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un véhicule avec un historique d'entretien digitalisé, avec photos et factures attachées, rassure les futurs acheteurs. Cela peut augmenter la valeur de revente sur le marché de l'occasion jusqu'à 15%."
      }
    },
    {
      "@type": "Question",
      "name": "Comment sont envoyés les rappels de révision ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les notifications programmables sont envoyées par email, SMS, et alertes in-app à J-7, J-3, la veille et le jour J pour garantir 0 oubli et 100% de conformité technique."
      }
    }
  ]
};