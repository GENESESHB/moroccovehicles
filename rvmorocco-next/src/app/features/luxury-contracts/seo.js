import { faqs } from './faqs';

export const metadata = {
    title: "Contrats de Location VIP & Prestations Luxe Maroc | Smart Car Location",
    description: "Bénéficiez de nos contrats de location sur-mesure pour véhicules de prestige : Conciergerie, Assurance Premium, discrétion absolue et flexibilité totale.",
    keywords: [
        "contrat location vip maroc",
        "location voiture luxe avec chauffeur",
        "contrat prestige Smart Car Location",
        "conciergerie automobile maroc",
        "location longue durée véhicule luxe"
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
        canonical: "https://moroccovehicles.com/features/luxury-contracts",
    },
    openGraph: {
        title: "Contrats VIP & Services Exclusifs | Smart Car Location",
        description: "Des solutions de mobilité premium avec des contrats sur-mesure pour les clients les plus exigeants.",
        url: "https://moroccovehicles.com/features/luxury-contracts",
        siteName: "Smart Car Location",
        images: [
            {
                url: "/images/og-luxury-contracts.jpg",
                width: 1200,
                height: 630,
                alt: "Signature de contrat de location VIP Smart Car Location",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gestion des Contrats de Location de Prestige",
        description: "La perfection dans les moindres détails, de la réservation à l'état des lieux VIP.",
        images: ["/images/twitter-luxury-contracts.jpg"],
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
    "@graph": [
        {
            "@type": "SoftwareApplication",
            "name": "Smart Car Location - Module Contrats VIP",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "MAD"
            },
            "featureList": [
                "Rédaction de contrats de prestige sur-mesure",
                "État des lieux digital Très Haute Résolution",
                "Gestion des cautions Premium",
                "Options Chauffeur et Sécurité Rapprochée intégrables",
                "Archivage ultra-sécurisé et confidentiel"
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        }
    ]
};
