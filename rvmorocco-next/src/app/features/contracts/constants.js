import { FileText, Clock, DollarSign, TrendingUp, PenTool, Shield, Camera, Receipt, Activity, CheckCircle, Zap, Lock, Smartphone, Users, BarChart3 } from 'lucide-react';

export const STATS = [
    {
        label: 'Actifs',
        value: '89',
        subtext: 'Contrats en cours',
        trend: '+12%',
        trendUp: true,
        icon: FileText,
        color: '#36c275'
    },
    {
        label: 'En Attente',
        value: '12',
        subtext: 'Signature requise',
        trend: '-3',
        trendUp: false,
        icon: Clock,
        color: '#f59e0b'
    },
    {
        label: 'CA Prévu',
        value: '180k MAD',
        subtext: 'Ce mois-ci',
        trend: '+23%',
        trendUp: true,
        icon: DollarSign,
        color: '#3b82f6'
    },
    {
        label: 'Taux Conversion',
        value: '94%',
        subtext: 'Signatures finalisées',
        trend: '+5%',
        trendUp: true,
        icon: TrendingUp,
        color: '#8b5cf6'
    }
];

export const CONTRACTS = [
    {
        id: 'CTR-2024-001',
        client: 'Maroc Telecom',
        vehicle: 'Dacia Logan 2023',
        plate: '12345-A-6',
        startDate: '2024-01-15',
        endDate: '2024-07-15',
        amount: '4500 MAD/mois',
        status: 'active',
        deposit: '9000 MAD',
        type: 'Location Longue Durée'
    },
    {
        id: 'CTR-2024-002',
        client: 'OCP Group',
        vehicle: 'Renault Clio 2024',
        plate: '67890-B-7',
        startDate: '2024-02-01',
        endDate: '2024-08-01',
        amount: '3800 MAD/mois',
        status: 'pending_signature',
        deposit: '7600 MAD',
        type: 'Location Courte Durée'
    },
    {
        id: 'CTR-2024-003',
        client: 'Attijariwafa Bank',
        vehicle: 'Peugeot 208 2023',
        plate: '11111-C-8',
        startDate: '2024-01-20',
        endDate: '2025-01-20',
        amount: '5200 MAD/mois',
        status: 'active',
        deposit: '10400 MAD',
        type: 'Location Longue Durée'
    },
    {
        id: 'CTR-2024-004',
        client: 'Royal Air Maroc',
        vehicle: 'Hyundai i20 2024',
        plate: '22222-D-9',
        startDate: '2024-03-01',
        endDate: '2024-09-01',
        amount: '4100 MAD/mois',
        status: 'draft',
        deposit: '8200 MAD',
        type: 'Location Moyenne Durée'
    }
];

export const FEATURES = [
    {
        id: 'creation',
        icon: FileText,
        title: 'Création Rapide',
        description: 'Créez des contrats en quelques clics avec nos templates intelligents'
    },
    {
        id: 'signature',
        icon: PenTool,
        title: 'Signature Électronique',
        description: 'Signatures légales et sécurisées conformes à la loi marocaine'
    },
    {
        id: 'garantie',
        icon: Shield,
        title: 'Dépôt de Garantie',
        description: 'Gestion automatique des cautions et remboursements'
    },
    {
        id: 'etat',
        icon: Camera,
        title: 'États des Lieux',
        description: 'Photos, vidéos et constats numériques intégrés'
    },
    {
        id: 'facturation',
        icon: Receipt,
        title: 'Facturation Auto',
        description: 'Génération et envoi automatique des factures récurrentes'
    },
    {
        id: 'historique',
        icon: Activity,
        title: 'Historique Complet',
        description: 'Audit trail complet pour chaque contrat et modification'
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
