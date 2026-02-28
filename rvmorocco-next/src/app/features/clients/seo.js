export const metadata = {
    title: "CRM Location Voiture Maroc | Fiches Clients & Fidélité | Smart Car Location",
    description: "Fidélisez votre clientèle grâce à notre CRM dédié aux agences de location au Maroc. Historique, stockage des CIN/Permis, segmentation et suivi du CA par client.",
    keywords: [
        "CRM location voiture",
        "gestion clients agence location maroc",
        "base de données conducteurs",
        "fidélisation location auto",
        "logiciel gestion permis de conduire maroc",
        "Smart Car Location CRM"
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
        canonical: "https://moroccovehicles.com/features/clients",
    },
    openGraph: {
        title: "CRM Location Voiture Maroc | Fiches Clients & Fidélité",
        description: "Fidélisez votre clientèle grâce à notre CRM dédié aux agences de location au Maroc. Historique, stockage des CIN/Permis, segmentation et suivi du CA par client.",
        url: "https://moroccovehicles.com/features/clients",
        siteName: "Smart Car Location",
        images: [
            {
                url: "https://moroccovehicles.com/images/og-clients.jpg",
                width: 1200,
                height: 630,
                alt: "Interface du CRM Smart Car Location",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CRM Location Voiture Maroc | Fiches Clients",
        description: "Gérez l'historique de vos locataires et accélérez les créations de contrats.",
        images: ["https://moroccovehicles.com/images/twitter-clients.jpg"],
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
    "name": "Smart Car Location - Module CRM Clients",
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
        "Fiches clients détaillées avec historique des locations",
        "Stockage sécurisé des CIN, passeports et permis de conduire",
        "Segmentation avancée (Particuliers, B2B, VIP)",
        "Suivi du chiffre d'affaires et de la rentabilité par client",
        "Alertes péremption des documents d'identité"
    ]
};