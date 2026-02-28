import { faqs } from './faqs';

export const metadata = {
    title: "Tableau de Bord Analytique | Gestion de Flotte Automobile Maroc",
    description: "Statistiques en temps réel pour optimiser votre flotte de véhicules au Maroc. Comparez vos revenus Luxury vs Regular, suivez le taux d'occupation et téléchargez vos KPIs 2026.",
    keywords: [
        "tableau de bord analytique flotte automobile",
        "statistiques location véhicule Maroc",
        "logiciel KPIs flotte automobile 2026",
        "optimisation taux d'occupation véhicule",
        "calcul revenu mensuel location auto",
        "comparaison véhicules de luxe vs basique",
        "rentabilité parc automobile",
        "Smart Car Location Dashboard"
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
        canonical: "https://moroccovehicles.com/features/overview", // ✅ Sans espace
    },
    openGraph: {
        title: "Tableau de Bord et KPIs Flotte Auto 2026 | Smart Car Location",
        description: "Analysez vos performances annuelles, le taux d'occupation et la croissance de vos véhicules réguliers et de luxe en un coup d'œil.",
        url: "https://moroccovehicles.com/features/overview", // ✅ Sans espace
        siteName: "Smart Car Location",
        images: [
            {
                url: "https://moroccovehicles.com/images/og-overview-dashboard.jpg", // ✅ URL absolue
                width: 1200,
                height: 630,
                alt: "Graphiques et statistiques du logiciel de location automobile",
            },
        ],
        locale: "fr_MA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Statistiques Flotte Automobile | Smart Car Location",
        description: "Les meilleurs outils analytiques 2026 pour maximiser le revenu de votre agence de location de véhicules.",
        images: ["https://moroccovehicles.com/images/twitter-overview.jpg"], // ✅ URL absolue
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

// ✅ Génération dynamique du FAQPage à partir de faqs.js
const faqSchema = {
    "@type": "FAQPage",
    "@id": "https://moroccovehicles.com/features/overview#faq",
    "mainEntity": faqs.map((faq, index) => ({
        "@type": "Question",
        "@id": `https://moroccovehicles.com/features/overview#question-${index + 1}`,
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "@id": `https://moroccovehicles.com/features/overview#answer-${index + 1}`,
            "text": faq.answer
        }
    }))
};

export const jsonLd = {
    "@context": "https://schema.org", // ✅ Sans espace
    "@graph": [
        {
            "@type": "SoftwareApplication",
            "@id": "https://moroccovehicles.com/features/overview#software",
            "name": "Smart Car Location - Module Analytique",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web, iOS, Android",
            "offers": { 
                "@type": "Offer", 
                "price": "0", 
                "priceCurrency": "MAD",
                "availability": "https://schema.org/InStock"
            },
            "featureList": [
                "Visualisations interactives Recharts (AreaChart, PieChart, ComposedChart)",
                "Filtrage dynamique Luxury vs Regular",
                "Calculs métriques avancés (growth rate, consistency score)",
                "Reportings financiers exacts avec temps réel"
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
            },
            // ✅ Lien vers le FAQ comme contenu associé
            "subjectOf": {
                "@id": "https://moroccovehicles.com/features/overview#faq"
            }
        },
        faqSchema, // ✅ Toutes les 5 FAQ incluses dynamiquement
        {
            "@type": "BreadcrumbList",
            "@id": "https://moroccovehicles.com/features/overview#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Accueil",
                    "item": "https://moroccovehicles.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Fonctionnalités",
                    "item": "https://moroccovehicles.com/features"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Vue d'ensemble",
                    "item": "https://moroccovehicles.com/features/overview"
                }
            ]
        }
    ]
};