import { faqs } from './faqs';

export const metadata = {
    title: "Location Voiture de Luxe Maroc : Ferrari, Porsche, Urus | Smart Car Location",
    description: "Réservez votre véhicule de prestige au Maroc. Ferrari, Lamborghini, Range Rover avec service conciergerie personnalisé et livraison VIP.",
    keywords: [
        "location voiture luxe maroc",
        "location ferrari casablanca",
        "location lamborghini marrakech",
        "voiture prestige maroc",
        "agence luxe Smart Car Location",
        "chauffeur privé luxe maroc"
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
        canonical: "https://moroccovehicles.com/features/luxury-cars",
    },
    openGraph: {
        title: "Collection Prestige - Location de Voitures de Luxe | Smart Car Location",
        description: "Conduisez l'excellence au Maroc. Flotte exclusive de Supercars et SUV Premium avec conciergerie VIP.",
        url: "https://moroccovehicles.com/features/luxury-cars",
        siteName: "Smart Car Location",
        images: [
            {
                url: "/images/og-luxury-cars.jpg",
                width: 1200,
                height: 630,
                alt: "Gamme de voitures de luxe Smart Car Location",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Location de Voitures de Prestige & Supercars",
        description: "L'expérience premium par excellence. Louez les plus belles voitures de la flotte Smart Car Location.",
        images: ["/images/twitter-luxury.jpg"],
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
            "@type": "CollectionPage",
            "name": "Collection Prestige de Voitures - Smart Car Location",
            "description": "Flotte de véhicules haut de gamme (Supercars, SUV luxe, Berlines CEO) pour la location au Maroc.",
            "url": "https://moroccovehicles.com/features/luxury-cars",
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Supercars (Ferrari, Lamborghini, Porsche)"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "SUV de Luxe (Urus, Range Rover, G-Class)"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Berlines Prestige (Rolls-Royce, Bentley)"
                    }
                ]
            }
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
