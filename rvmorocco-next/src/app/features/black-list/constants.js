import { Ban, UserX, AlertTriangle, Shield, Calendar, TrendingUp, CheckCircle, Clock, DollarSign, Search, Filter, Plus, MoreVertical, Download, Eye, Edit3, Trash2, ChevronRight, BarChart3, PieChart, Activity, Zap, Lock, Bell, Users, FileText, Camera, Receipt, ArrowUpRight, ArrowDownRight, AlertCircle, FileWarning, History, Mail, Phone, MapPin, Gem, Sparkles } from 'lucide-react';

export const STATS = [
    {
        label: 'Entrées Liste',
        value: '23',
        subtext: 'Clients inscrits',
        trend: '+3',
        trendUp: true,
        icon: Ban,
        color: '#ef4444'
    },
    {
        label: 'Alertes Actives',
        value: '5',
        subtext: 'Réservations suspectes',
        trend: '+2',
        trendUp: true,
        icon: Bell,
        color: '#f59e0b'
    },
    {
        label: 'Litiges en cours',
        value: '2',
        subtext: 'Contentieux',
        trend: '-1',
        trendUp: false,
        icon: AlertTriangle,
        color: '#3b82f6'
    },
    {
        label: 'Tentatives bloquées',
        value: '12',
        subtext: 'Ce mois-ci',
        trend: '+33%',
        trendUp: true,
        icon: Shield,
        color: '#8b5cf6'
    }
];

export const BLACKLIST_ENTRIES = [
    {
        id: 'BL-001',
        client: 'Ahmed El Mansouri',
        email: 'a.elmansouri@email.com',
        phone: '+212 6 00 11 22 33',
        motif: 'Impayés (2 locations)',
        date: '2024-05-10',
        statut: 'actif',
        montant: '12 500 MAD'
    },
    {
        id: 'BL-002',
        client: 'Said Benjelloun',
        email: 's.benjelloun@email.com',
        phone: '+212 6 11 22 33 44',
        motif: 'Litige - Dégâts non couverts',
        date: '2024-04-22',
        statut: 'actif',
        montant: '23 000 MAD'
    },
    {
        id: 'BL-003',
        client: 'Karim Tazi',
        email: 'k.tazi@email.com',
        phone: '+212 6 22 33 44 55',
        motif: 'Comportement inapproprié',
        date: '2024-06-01',
        statut: 'actif',
        montant: '-'
    },
    {
        id: 'BL-004',
        client: 'Fatima Berrada',
        email: 'f.berrada@email.com',
        phone: '+212 6 33 44 55 66',
        motif: 'Chèque sans provision',
        date: '2024-03-15',
        statut: 'résolu',
        montant: '8 200 MAD'
    },
    {
        id: 'BL-005',
        client: 'Youssef Mansour',
        email: 'y.mansour@email.com',
        phone: '+212 6 44 55 66 77',
        motif: 'Location non restituée',
        date: '2024-05-28',
        statut: 'actif',
        montant: '95 000 MAD'
    },
    {
        id: 'BL-006',
        client: 'Nadia Alaoui',
        email: 'n.alaoui@email.com',
        phone: '+212 6 55 66 77 88',
        motif: 'Fausse identité',
        date: '2024-06-05',
        statut: 'actif',
        montant: '-'
    }
];

export const FEATURES = [
    {
        id: 'motifs',
        icon: FileWarning,
        title: 'Motifs d\'inscription',
        description: 'Centralisez les raisons : impayés, litiges, comportements'
    },
    {
        id: 'alertes',
        icon: Bell,
        title: 'Alertes en temps réel',
        description: 'Notifications lors de tentatives de réservation'
    },
    {
        id: 'blocage',
        icon: Shield,
        title: 'Blocage automatique',
        description: 'Empêchez les réservations des personnes inscrites'
    },
    {
        id: 'historique',
        icon: History,
        title: 'Historique des incidents',
        description: 'Suivi complet des interactions litigieuses'
    },
    {
        id: 'litiges',
        icon: AlertTriangle,
        title: 'Gestion des litiges',
        description: 'Centralisation des contentieux en cours'
    },
    {
        id: 'export',
        icon: Download,
        title: 'Export & partage',
        description: 'Partagez la liste avec d\'autres agences (optionnel)'
    }
];

export const getStatusColor = (statut) => {
    switch (statut) {
        case 'actif': return '#ef4444';
        case 'résolu': return '#36c275';
        default: return '#64748b';
    }
};

export const getStatusLabel = (statut) => {
    switch (statut) {
        case 'actif': return 'Actif';
        case 'résolu': return 'Résolu';
        default: return statut;
    }
};
