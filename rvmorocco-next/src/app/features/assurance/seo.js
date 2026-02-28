import { faqs } from './faqs';

export const metadata = {
    title: "Gestion Assurance & Sinistres Location Auto | Smart Car Location",
    description: "Gérez efficacement vos polices d'assurance automobile, anticipez les renouvellements et suivez vos dossiers de sinistres depuis un tableau de bord centralisé.",
    keywords: [
        "gestion assurance flotte automobile",
        "logiciel assurance location voiture",
        "suivi sinistre agence location",
        "renouvellement police assurance auto",
        "gestion des franchises location",
        "Smart Car Location Assurance"
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
        canonical: "https://moroccovehicles.com/features/assurance",
    },
    openGraph: {
        title: "Gestion Assurance & Sinistres Location Auto",
        description: "Gérez efficacement vos polices d'assurance automobile, anticipez les renouvellements et suivez vos dossiers de sinistres.",
        url: "https://moroccovehicles.com/features/assurance",
        siteName: "Smart Car Location",
        images: [
            {
                url: "/images/og-assurance.jpg",
                width: 1200,
                height: 630,
                alt: "Interface de gestion des assurances Smart Car Location",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gestion Assurance & Sinistres Flotte",
        description: "Anticipez vos renouvellements d'assurance et suivez l'avancement de vos sinistres en temps réel.",
        images: ["/images/twitter-assurance.jpg"],
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
            "name": "Smart Car Location - Module Assurance",
            "operatingSystem": "Web, iOS, Android",
            "applicationCategory": "BusinessApplication",
            "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "MAD"
            },
            "featureList": [
                "Gestion complète des polices et contrats d'assurance flotte",
                "Tableau de bord de suivi chronologique des dossiers sinistres",
                "Alertes de renouvellement automatisées (30J/15J/7J)",
                "Calcul des indemnités et gestion des franchises par véhicule",
                "Archivage électronique des cartes vertes et attestations"
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
