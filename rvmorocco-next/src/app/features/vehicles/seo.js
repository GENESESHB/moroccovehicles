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
    canonical: "https://moroccovehicles.com/features/vehicles",
  },
  openGraph: {
    title: "Logiciel de Gestion de Parc Automobile | Smart Car Location",
    description: "Pilotez sereinement votre agence de location : disponibilité en temps réel, alertes d'entretien et gestion documentaire de votre flotte.",
    url: "https://moroccovehicles.com/features/vehicles",
    siteName: "Smart Car Location",
    images: [
      {
        url: "/images/og-vehicles-fleet.jpg",
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
    images: ["/images/twitter-vehicles.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Smart Car Location - Module Flotte",
      "applicationCategory": "BusinessApplication",
      "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
      "operatingSystem": "Web, iOS, Android",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MAD" },
      "featureList": [
        "Fiches véhicules détaillées avec galerie photos",
        "Suivi kilométrage et planification auto des maintenances",
        "Coffre-fort numérique pour documents légaux avec alertes d'expiration",
        "Gestion complète des sinistres et réparations"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Comment ajouter un nouveau véhicule dans le système ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Via la section 'Ajout Véhicule', vous pouvez saisir les informations générales, techniques, uploader des photos et attacher les documents légaux. Le système génère automatiquement une fiche détaillée de votre véhicule."
          }
        },
        {
          "@type": "Question",
          "name": "Quelles sont les catégories de véhicules gérées ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Notre logiciel gère 5 catégories majeures : Citadine, Berline, SUV, Luxury et Van. Chaque catégorie dispose de règles tarifaires et de cycles de maintenance propres à ses spécificités."
          }
        },
        {
          "@type": "Question",
          "name": "Comment est suivi le kilométrage et l'entretien ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le kilométrage est mis à jour à chaque retour de location. Le système utilise ces données avec la date du dernier entretien pour planifier automatiquement les prochaines révisions selon des seuils pré-définis (ex: 10,000 km ou 6 mois)."
          }
        },
        {
          "@type": "Question",
          "name": "Où sont stockés les documents légaux des véhicules ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les assurances, cartes grises et procès-verbaux de contrôle technique sont stockés de manière sécurisée (chiffrement AES-256). Vous recevrez une alerte automatique 30 jours avant l'expiration de chaque document."
          }
        },
        {
          "@type": "Question",
          "name": "Puis-je suivre les dommages survenus sur les véhicules ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, la fonctionnalité 'Gestion Dommages' permet d'enregistrer le constat, d'attacher des photos, d'estimer les coûts et de suivre l'avancement des réparations jusqu'à la remise en circulation du véhicule."
          }
        }
      ]
    }
  ]
};
