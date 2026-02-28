import { ShieldCheck, AlertCircle, ShieldAlert, DollarSign, FileText, Receipt, Bell, Lock } from 'lucide-react';

export const STATS = [
    {
        label: 'Contrats Assurés',
        value: '156',
        subtext: 'Actuellement actifs',
        trend: '+8%',
        trendUp: true,
        icon: ShieldCheck,
        color: '#3b82f6'
    },
    {
        label: 'Échéances -30j',
        value: '12',
        subtext: 'Renouvellements à prévoir',
        trend: '-3',
        trendUp: false,
        icon: AlertCircle,
        color: '#f59e0b'
    },
    {
        label: 'Sinistres en cours',
        value: '3',
        subtext: '2 en attente, 1 traité',
        trend: '-1',
        trendUp: false,
        icon: ShieldAlert,
        color: '#ef4444'
    },
    {
        label: 'Prime moyenne',
        value: '2 450 MAD',
        subtext: 'Par contrat',
        trend: '+2%',
        trendUp: true,
        icon: DollarSign,
        color: '#36c275'
    }
];

export const INSURANCE_CONTRACTS = [
    {
        id: 'ASS-001',
        client: 'M. Alami',
        vehicle: 'Ferrari F8 Tributo',
        plaque: 'F8-1234',
        type: 'Tous risques',
        prime: '4 500 MAD',
        echeance: '2024-07-15',
        statut: 'actif',
        franchise: '2 000 MAD'
    },
    {
        id: 'ASS-002',
        client: 'Mme Benjelloun',
        vehicle: 'Rolls-Royce Ghost',
        plaque: 'RR-2023',
        type: 'Tous risques',
        prime: '6 200 MAD',
        echeance: '2024-07-01',
        statut: 'actif',
        franchise: '3 000 MAD'
    },
    {
        id: 'ASS-003',
        client: 'Groupe OCP',
        vehicle: 'Lamborghini Urus',
        plaque: 'URUS-77',
        type: 'Tous risques',
        prime: '5 800 MAD',
        echeance: '2024-06-28',
        statut: 'echeance_proche',
        franchise: '2 500 MAD'
    },
    {
        id: 'ASS-004',
        client: 'M. Tazi',
        vehicle: 'Bentley Continental',
        plaque: 'BENT-1',
        type: 'Tierce',
        prime: '2 800 MAD',
        echeance: '2024-08-10',
        statut: 'actif',
        franchise: '5 000 MAD'
    },
    {
        id: 'ASS-005',
        client: 'Mme Berrada',
        vehicle: 'Porsche 911',
        plaque: '911-TURBO',
        type: 'Tous risques',
        prime: '3 900 MAD',
        echeance: '2024-07-05',
        statut: 'actif',
        franchise: '2 000 MAD'
    },
    {
        id: 'ASS-006',
        client: 'M. Mansouri',
        vehicle: 'Maserati MC20',
        plaque: 'MC-2024',
        type: 'Tierce',
        prime: '2 500 MAD',
        echeance: '2024-06-25',
        statut: 'echeance_imminente',
        franchise: '4 000 MAD'
    }
];

export const FEATURES = [
    {
        id: 'polices',
        icon: FileText,
        title: 'Gestion des polices',
        description: 'Centralisez toutes vos polices d\'assurance par véhicule et contrat'
    },
    {
        id: 'sinistres',
        icon: ShieldAlert,
        title: 'Suivi des sinistres',
        description: 'Déclarez et suivez l\'avancement de chaque dossier'
    },
    {
        id: 'franchises',
        icon: DollarSign,
        title: 'Franchises',
        description: 'Gérez les montants et les conditions par contrat'
    },
    {
        id: 'remboursements',
        icon: Receipt,
        title: 'Remboursements',
        description: 'Suivez les remboursements et les indemnités'
    },
    {
        id: 'alertes',
        icon: Bell,
        title: 'Alertes échéances',
        description: 'Notifications automatiques pour les renouvellements'
    },
    {
        id: 'conformite',
        icon: Lock,
        title: 'Conformité',
        description: 'Documents légaux et attestations archivés'
    }
];

export const getStatusColor = (statut) => {
    switch (statut) {
        case 'actif': return '#36c275';
        case 'echeance_proche': return '#f59e0b';
        case 'echeance_imminente': return '#ef4444';
        default: return '#64748b';
    }
};

export const getStatusLabel = (statut) => {
    switch (statut) {
        case 'actif': return 'Actif';
        case 'echeance_proche': return 'Échéance < 30j';
        case 'echeance_imminente': return 'Échéance < 7j';
        default: return statut;
    }
};
