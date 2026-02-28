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
        canonical: "https://moroccovehicles.com/features/overview",
    },
    openGraph: {
        title: "Tableau de Bord et KPIs Flotte Auto 2026 | Smart Car Location",
        description: "Analysez vos performances annuelles, le taux d'occupation et la croissance de vos véhicules réguliers et de luxe en un coup d'œil.",
        url: "https://moroccovehicles.com/features/overview",
        siteName: "Smart Car Location",
        images: [
            {
                url: "/images/og-overview-dashboard.jpg",
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
        images: ["/images/twitter-overview.jpg"],
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
            "name": "Smart Car Location - Module Analytique",
            "applicationCategory": "BusinessApplication",
            "sameAs": ["https://www.linkedin.com/in/morocco-vehicles/"],
            "operatingSystem": "Web, iOS, Android",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MAD" },
            "featureList": [
                "Visualisations interactives Recharts (AreaChart, PieChart, ComposedChart)",
                "Filtrage dynamique Luxury vs Regular",
                "Calculs métriques avancés (growth rate, consistency score)",
                "Reportings financiers exacts avec temps réel"
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Comment sont calculées les statistiques de revenus ?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Les statistiques de revenus annuels et mensuels sont calculées en temps réel à partir de vos contrats de location facturés. L'algorithme exclut automatiquement les devis non confirmés et les réservations annulées pour vous fournir une vision financière exacte (MRR/ARR)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quelle est la différence entre les segments Luxury et Regular ?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Le segment Luxury (smart) englobe les véhicules premium (Mercedes, BMW, etc.) avec une forte valeur locative et un rendement moyen >1000 MAD/jour. Le segment Regular concerne les véhicules standards (Dacia, Peugeot) à fort volume de rotation."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Comment est défini le 'Meilleur Véhicule de l'Année' ?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Notre IA attribue un score composé pondérant 3 facteurs clés : les revenus totaux générés, le nombre de jours de location (taux d'occupation), et le score de régularité mensuel. Le véhicule ayant le meilleur ratio global gagne le titre."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Puis-je exporter mes données analytiques ?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Oui, vous pouvez exporter l'intégralité des tableaux de bord et des comparaisons mensuelles sous format PDF, CSV ou Excel directement depuis le bouton 'Exporter les Données' situé en haut de page."
                    }
                }
            ]
        }
    ]
};
