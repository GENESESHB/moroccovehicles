export const metadata = {
    title: "Fonctionnalités du Logiciel de Location de Voitures | Smart Car Location",
    description: "Découvrez toutes les fonctionnalités de notre écosystème : gestion de flotte, CRM client, génération de contrats, calendriers de disponibilité et parc Luxury.",
    keywords: [
        "logiciel location voiture Maroc",
        "fonctionnalités gestion de flotte",
        "CRM de location de véhicules",
        "calendrier location voiture en ligne",
        "plateforme SaaS location auto",
        "modules Smart Car Location"
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
        canonical: "https://moroccovehicles.com/features",
    },
    openGraph: {
        title: "Nos Modules et Fonctionnalités 2026 | Smart Car Location",
        description: "Explorez nos modules dédiés pour optimiser et scaler votre agence de location de véhicules (Standard ou Premium).",
        url: "https://moroccovehicles.com/features",
        siteName: "Smart Car Location",
        images: [
            {
                url: "/images/og-features-hub.jpg",
                width: 1200,
                height: 630,
                alt: "La suite de logiciels proposée par Smart Car Location",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Fonctionnalités Smart Car Location",
        description: "Des outils intelligents pour faire croître votre agence de location de voitures sereinement.",
        images: ["/images/twitter-features.jpg"],
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
            "@type": "CollectionPage",
            "name": "Catalogue des Fonctionnalités - Smart Car Location",
            "description": "Portail d'accès de l'ensemble des modules d'administration",
            "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
            "url": "https://moroccovehicles.com/features"
        },
        {
            "@type": "ItemList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "url": "https://moroccovehicles.com/features/overview" },
                { "@type": "ListItem", "position": 2, "url": "https://moroccovehicles.com/features/vehicles" },
                { "@type": "ListItem", "position": 3, "url": "https://moroccovehicles.com/features/maintenance" },
                { "@type": "ListItem", "position": 4, "url": "https://moroccovehicles.com/features/calendrier" },
                { "@type": "ListItem", "position": 5, "url": "https://moroccovehicles.com/features/clients" },
                { "@type": "ListItem", "position": 6, "url": "https://moroccovehicles.com/features/contracts" },
                { "@type": "ListItem", "position": 7, "url": "https://moroccovehicles.com/features/assurance" },
                { "@type": "ListItem", "position": 8, "url": "https://moroccovehicles.com/features/black-list" },
                { "@type": "ListItem", "position": 9, "url": "https://moroccovehicles.com/features/luxury-cars" },
                { "@type": "ListItem", "position": 10, "url": "https://moroccovehicles.com/features/luxury-contracts" }
            ]
        }
    ]
};
