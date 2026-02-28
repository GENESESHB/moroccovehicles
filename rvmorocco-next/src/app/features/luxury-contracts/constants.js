import { Clock, Crown, TrendingUp, Star, FileCheck, ShieldCheck, Headphones, Lock, Database, Users } from 'lucide-react';

export const STATS = [
    {
        label: 'Contrats VIP',
        value: '34',
        subtext: 'Actuellement actifs',
        trend: '+8',
        trendUp: true,
        icon: Crown,
        color: '#f59e0b'
    },
    {
        label: 'Durée Moy.',
        value: '15 jours',
        subtext: 'Par location',
        trend: '+2j',
        trendUp: true,
        icon: Clock,
        color: '#3b82f6'
    },
    {
        label: 'Satisfaction',
        value: '98%',
        subtext: 'Clients premium',
        trend: '+2%',
        trendUp: true,
        icon: Star,
        color: '#36c275'
    },
    {
        label: 'CA mensuel',
        value: '420k MAD',
        subtext: 'Segment luxe',
        trend: '+18%',
        trendUp: true,
        icon: TrendingUp,
        color: '#8b5cf6'
    }
];

export const LUXURY_CONTRACTS = [
    {
        id: 'LXC-2024-001',
        client: 'M. Alami',
        vehicle: 'Ferrari F8 Tributo',
        plaque: 'F8-1234',
        startDate: '2024-06-10',
        endDate: '2024-06-25',
        amount: '67 500 MAD',
        status: 'active',
        deposit: '45 000 MAD',
        type: 'Location courte durée'
    },
    {
        id: 'LXC-2024-002',
        client: 'Mme Benjelloun',
        vehicle: 'Rolls-Royce Ghost',
        plaque: 'RR-2023',
        startDate: '2024-06-15',
        endDate: '2024-07-15',
        amount: '195 000 MAD',
        status: 'pending_signature',
        deposit: '90 000 MAD',
        type: 'Location longue durée'
    },
    {
        id: 'LXC-2024-003',
        client: 'Groupe OCP',
        vehicle: 'Lamborghini Urus',
        plaque: 'URUS-77',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
        amount: '114 000 MAD',
        status: 'active',
        deposit: '60 000 MAD',
        type: 'Location mensuelle'
    },
    {
        id: 'LXC-2024-004',
        client: 'M. Tazi',
        vehicle: 'Bentley Continental GT',
        plaque: 'BENT-1',
        startDate: '2024-07-01',
        endDate: '2024-07-10',
        amount: '42 000 MAD',
        status: 'draft',
        deposit: '30 000 MAD',
        type: 'Location courte durée'
    }
];

export const FEATURES = [
    {
        id: 'clauses',
        icon: FileCheck,
        title: 'Clauses spécifiques',
        description: 'Contrats sur-mesure avec conditions adaptées aux véhicules de prestige'
    },
    {
        id: 'assurances',
        icon: ShieldCheck,
        title: 'Assurances renforcées',
        description: 'Couverture tous risques, franchise réduite, extension internationale'
    },
    {
        id: 'conciergerie',
        icon: Headphones,
        title: 'Service Conciergerie',
        description: 'Assistance dédiée 24/7, livraison, chauffeur, itinéraires exclusifs'
    },
    {
        id: 'securite',
        icon: Lock,
        title: 'Documents sécurisés',
        description: 'Contrats signés électroniquement, archivage inviolable, blockchain'
    },
    {
        id: 'dashboard',
        icon: Database,
        title: 'Tableau de bord exclusif',
        description: 'Accès client VIP, historique, factures, documents en temps réel'
    },
    {
        id: 'gestion',
        icon: Users,
        title: 'Gestion dédiée',
        description: 'Un conseiller personnel pour chaque client premium'
    }
];

export const getStatusColor = (status) => {
    switch (status) {
        case 'active': return '#36c275';
        case 'pending_signature': return '#f59e0b';
        case 'draft': return '#64748b';
        default: return '#64748b';
    }
};

export const getStatusLabel = (status) => {
    switch (status) {
        case 'active': return 'Actif';
        case 'pending_signature': return 'En attente signature';
        case 'draft': return 'Brouillon';
        default: return status;
    }
};
