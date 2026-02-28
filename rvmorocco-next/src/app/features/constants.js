import React from 'react';
import {
    BarChart3, Car, Wrench, Calendar, Users, FileText, Ban, ShieldCheck, Gem, FileSignature
} from 'lucide-react';

export const MODULES = [
    {
        id: 'overview',
        title: 'Vue d\'Ensemble',
        description: 'Le centre de commandement de votre agence. Il agrège en temps réel les données de vos véhicules et contrats pour fournir des métriques financières et opérationnelles.',
        features: [
            'Graphiques dynamiques des revenus mensuels/annuels',
            'Comparatif de performances (Luxe vs Standard)',
            'Analyse instantanée du taux d\'occupation',
            'Exportation simplifiée de vos KPIs en PDF/CSV'
        ],
        icon: BarChart3,
        href: '/features/overview',
        color: '#36c275',
        bg: '#ecfdf5',
        tags: ['Analytique', 'Reporting', 'KPIs']
    },
    {
        id: 'vehicles',
        title: 'Gestion de Flotte',
        description: 'Un inventaire numérisé puissant pour suivre chaque véhicule de l\'achat à la revente. Fini les fichiers Excel obsolètes, tout est centralisé.',
        features: [
            'Création et édition fiches véhicules (KM, Prix, État)',
            'Suivi en temps réel de la disponibilité de la flotte',
            'Catégorisation intelligente (Citadine, SUV, Berline)',
            'Bilan de santé global pour optimiser vos investissements'
        ],
        icon: Car,
        href: '/features/vehicles',
        color: '#3b82f6',
        bg: '#eff6ff',
        tags: ['Inventaire', 'Disponibilité', 'Technique']
    },
    {
        id: 'maintenance',
        title: 'Maintenance',
        description: 'Anticipez les pannes et prolongez la durée de vie de votre parc. Ce module automatise les rappels d\'entretien et suit vos dépenses au garage.',
        features: [
            'Planification des révisions préventives et vidanges',
            'Suivi des réparations correctives et gestion de devis',
            'Calculatrice des coûts totaux de maintenance par véhicule',
            'Alertes automatisées basées sur le kilométrage'
        ],
        icon: Wrench,
        href: '/features/maintenance',
        color: '#f59e0b',
        bg: '#fffbeb',
        tags: ['Révisions', 'Pannes', 'Coûts']
    },
    {
        id: 'calendrier',
        title: 'Calendrier des Réservations',
        description: 'Visualisez d\'un simple coup d\'œil l\'ensemble de vos engagements professionnels pour éviter les doubles réservations et organiser les livraisons.',
        features: [
            'Vue globale interactive (Jour, Semaine, Mois)',
            'Organisation facile des départs et des retours',
            'Identification rapide des périodes de forte demande',
            'Ajout rapide de réservations par glisser-déposer'
        ],
        icon: Calendar,
        href: '/features/calendrier',
        color: '#8b5cf6',
        bg: '#f5f3ff',
        tags: ['Planning', 'Réservations', 'Disponibilité']
    },
    {
        id: 'clients',
        title: 'Base Clients (CRM)',
        description: 'Fidélisez votre clientèle en connaissant son historique. Un CRM dédié à la location auto pour personnaliser vos offres et suivre vos meilleurs payeurs.',
        features: [
            'Profil complet: Permis de conduire, CIN, passeport',
            'Historique détaillé des locations précédentes',
            'Statistiques de dépenses et classification de fidélité',
            'Outils pour l\'envoi de campagnes (promos, emails)'
        ],
        icon: Users,
        href: '/features/clients',
        color: '#14b8a6',
        bg: '#f0fdfa',
        tags: ['CRM', 'Historique', 'Profils']
    },
    {
        id: 'contracts',
        title: 'Contrats de Location',
        description: 'Générez des contrats à valeur légale en un clic. Automatisez la paperasse pour réduire le temps d\'attente au comptoir.',
        features: [
            'Génération automatique de documents PDF prêts à l\'impression',
            'Processus d\'état des lieux numérique fluide',
            'Gestion complète de la facturation et des acomptes',
            'Suivi des prolongations et des clôtures de contrat'
        ],
        icon: FileText,
        href: '/features/contracts',
        color: '#6366f1',
        bg: '#eef2ff',
        tags: ['Facturation', 'PDF', 'Prolongations']
    },
    {
        id: 'assurance',
        title: 'Documents & Assurance',
        description: 'Le coffre-fort numérique de votre flotte. Ne ratez plus jamais une date d\'expiration pour un contrôle technique ou une police d\'assurance.',
        features: [
            'Stockage sécurisé des cartes grises et attestations',
            'Alertes proactives d\'expiration à 30/15/7 jours',
            'Historique du suivi pour la conformité légale totale',
            'Accès instantané aux documents en cas de sinistre'
        ],
        icon: ShieldCheck,
        href: '/features/assurance',
        color: '#ec4899',
        bg: '#fdf2f8',
        tags: ['Conformité', 'Alertes', 'Légal']
    },
    {
        id: 'black-list',
        title: 'Liste Noire (Blacklist)',
        description: 'Protégez votre investissement contre les clients à risque. Une base de données intelligente pour prévenir les comportements frauduleux.',
        features: [
            'Blocage préventif des conducteurs avec impayés',
            'Notes et rapports de sinistres graves',
            'Alertes immédiates lors de la saisie d\'un client banni',
            'Protection de votre parc contre les vols ou arnaques'
        ],
        icon: Ban,
        href: '/features/black-list',
        color: '#ef4444',
        bg: '#fef2f2',
        tags: ['Sécurité', 'Risque', 'Impayés']
    },
    {
        id: 'luxury-cars',
        title: 'Service Luxury (Véhicules)',
        description: 'Un espace exclusif pour vos véhicules de prestige. Parce qu\'une Mercedes Classe S ne se gère pas comme une citadine',
        features: [
            'Suivi avancé de la valeur locative du parc Premium',
            'Gestion des options haut de gamme (Chauffeur, Sièges auto)',
            'Évaluations pointues de l\'état de la carrosserie / jantes',
            'Conditions de location plus strictes appliquées par défaut'
        ],
        icon: Gem,
        href: '/features/luxury-cars',
        color: '#0f172a',
        bg: '#f8fafc',
        tags: ['Premium', 'VIP', 'Haut-de-gamme']
    },
    {
        id: 'luxury-contracts',
        title: 'Contrats Luxury',
        description: 'Des contrats sur-mesure pour votre clientèle VIP, exigeant un niveau de garantie et de service supérieur.',
        features: [
            'Génération de contrats incluant clauses spécifiques "Luxe"',
            'Gestion des cautions et des retenues de garanties très élevées',
            'Déclaration VIP des conducteurs secondaires (chauffeurs)',
            'Facturation personnalisable ou options confidentielles'
        ],
        icon: FileSignature,
        href: '/features/luxury-contracts',
        color: '#334155',
        bg: '#f1f5f9',
        tags: ['VIP', 'Sur-mesure', 'Cautions']
    }
];
