import { faqs } from './faqs';

export const metadata = {
    title: "Liste Noire Clients Location Voiture & Sécurité Flotte | Smart Car Location",
    description: "Protégez votre agence contre la fraude, les impayés et les accidents grâce au module de Liste Noire. Blocage automatique et alertes en temps réel.",
    keywords: [
        "liste noire client location voiture",
        "gestion impayés loueur de voiture",
        "logiciel sécurité location auto",
        "Smart Car Location blacklist",
        "protection fraude location véhicule"
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
        canonical: "https://moroccovehicles.com/features/black-list",
    },
    openGraph: {
        title: "Sécurité & Liste Noire Clients | Smart Car Location",
        description: "Identifiez les clients à risque et empêchez formellement les locations frauduleuses.",
        url: "https://moroccovehicles.com/features/black-list",
        siteName: "Smart Car Location",
        images: [
            {
                url: "/images/og-blacklist.jpg",
                width: 1200,
                height: 630,
                alt: "Interface module liste noire et sécurité Smart Car Location",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Liste Noire et Sécurité pour Agences Auto",
        description: "Bloquez automatiquement les clients problématiques et surveillez vos contentieux.",
        images: ["/images/twitter-blacklist.jpg"],
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
            "name": "Smart Car Location - Module Liste Noire",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "MAD"
            },
            "featureList": [
                "Base de données interne des clients à risque",
                "Blocage automatique lors de la réservation en ligne",
                "Alerte de sécurité TPE/Agence",
                "Traçabilité des motifs (Impayés, Excès de vitesse, Dégradations)",
                "Réconciliation des statuts résolus"
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
