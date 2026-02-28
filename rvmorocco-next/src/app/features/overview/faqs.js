export const faqs = [
    {
        question: "Comment sont calculées les statistiques de revenus ?",
        answer: "Les statistiques de revenus annuels et mensuels sont calculées en temps réel à partir de vos contrats de location facturés. L'algorithme exclut automatiquement les devis non confirmés et les réservations annulées pour vous fournir une vision financière exacte (MRR/ARR)."
    },
    {
        question: "Quelle est la différence entre les segments Luxury et Regular ?",
        answer: "Le segment Luxury englobe les véhicules premium (Mercedes, BMW, etc.) avec une forte valeur locative et un rendement moyen >1000 MAD/jour. Le segment Regular concerne les véhicules standards (Dacia, Peugeot) à fort volume de rotation."
    },
    {
        question: "Comment est défini le 'Top Performeur' ?",
        answer: "Notre système attribue un score pondérant 3 facteurs clés : les revenus totaux générés, le nombre de jours de location (taux d'occupation), et le score de régularité mensuel. Le véhicule ayant le meilleur ratio global gagne le titre."
    },
    {
        question: "Puis-je exporter mes données analytiques ?",
        answer: "Oui, vous pouvez exporter l'intégralité des tableaux de bord et des comparaisons mensuelles sous format PDF, CSV ou Excel directement depuis le bouton 'Exporter les Données' situé en haut de page."
    },
    {
        question: "Les données sont-elles vraiment en temps réel ?",
        answer: "Absolument. La page 'Vue d'Ensemble' interroge votre base de données via PostgreSQL à chaque rechargement. Les KPIs comme le Taux d'Occupation (87.3%) reflètent l'état exact de votre flotte à l'instant T."
    }
];
