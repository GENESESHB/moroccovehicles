export const metadata = {
    title: "Gestion des Contrats de Location Auto & e-Signature | Smart Car Location",
    description: "Digitalisez vos contrats de location avec signature électronique (Loi marocaine), états des lieux numériques photos, et facturation automatique pour LLD/LCD.",
    keywords: [
        "logiciel contrat location voiture",
        "signature electronique contrat auto",
        "etat des lieux numérique location",
        "gestion contrat LLD Maroc",
        "générateur contrat location auto",
        "Smart Car Location contrats"
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
        canonical: "https://moroccovehicles.com/features/contracts",
    },
    openGraph: {
        title: "Contrats de Location Auto Dématérialisés | Smart Car Location",
        description: "Édition de contrats, e-signature à valeur légale, et états des lieux sur tablette pour les agences de location au Maroc.",
        url: "https://moroccovehicles.com/features/contracts",
        siteName: "Smart Car Location",
        images: [
            {
                url: "https://moroccovehicles.com/images/og-contracts.jpg",
                width: 1200,
                height: 630,
                alt: "Génération de contrats de location avec e-signature Smart Car Location",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contrats de Location & Signature Électronique",
        description: "Zéro papier ! Digitalisez vos contrats de l'état des lieux à la signature sur tablette.",
        images: ["https://moroccovehicles.com/images/twitter-contracts.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        }
    }
};

export const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Smart Car Location - Module Contrats",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "MAD",
        "availability": "https://schema.org/InStock"
    },
    "featureList": [
        "Création de contrats dynamiques (LCD, LLD)",
        "Signature électronique légale (Loi 53-05 Maroc)",
        "États des lieux numériques avec photos 360°",
        "Facturation récurrente automatisée",
        "Prise d'empreinte bancaire et cautions intégrées"
    ]
};