import { faqs } from './faqs';

export const metadata = {
    title: "Calendrier & Planning Location Auto Interactif | Smart Car Location",
    description: "Synchronisez vos réservations, retours et plages de maintenance grâce à un planning interactif glisser-déposer. Évitez les erreurs d'overbooking.",
    keywords: [
        "calendrier réservation voiture",
        "planning location auto maroc",
        "logiciel planning véhicules",
        "gestion flotte glisser déposer",
        "calendrier agence location iCal",
        "Smart Car Location planning"
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
        canonical: "https://moroccovehicles.com/features/calendrier",
    },
    openGraph: {
        title: "Planning Location Auto Interactif | Smart Car Location",
        description: "Synchronisez vos réservations, retours et plages de maintenance grâce à un planning interactif glisser-déposer. Évitez les erreurs d'overbooking.",
        url: "https://moroccovehicles.com/features/calendrier",
        siteName: "Smart Car Location",
        images: [
            {
                url: "/images/og-calendrier.jpg",
                width: 1200,
                height: 630,
                alt: "Interface du Calendrier interactif Smart Car Location",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Planning Location Auto | Smart Car Location",
        description: "Évitez les surréservations et exportez sur Google Agenda.",
        images: ["/images/twitter-calendrier.jpg"],
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
            "name": "Smart Car Location - Module Calendrier",
            "operatingSystem": "Web, iOS, Android",
            "applicationCategory": "BusinessApplication",
            "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "MAD"
            },
            "featureList": [
                "Vue planning interactive avec fonction Glisser-Déposer",
                "Algorithme anti-surréservation intégré",
                "Blocage automatique des périodes de maintenance",
                "Export et Synchronisation vers Google Agenda & iCal",
                "Tableau de bord temps-réel des prises en charge et retours"
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
