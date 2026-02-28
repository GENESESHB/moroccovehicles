import {
    Users, UserPlus, Heart, DollarSign, Database, Clock, Star, FileText, PieChart, Award
} from 'lucide-react';

export const STATS = [
    {
        label: 'Clients Actifs',
        value: '1 240',
        subtext: 'Base totale',
        trend: '+5%',
        trendUp: true,
        icon: Users,
        color: '#8b5cf6'
    },
    {
        label: 'Nouveaux / Mois',
        value: '85',
        subtext: 'Inscriptions',
        trend: '+12%',
        trendUp: true,
        icon: UserPlus,
        color: '#36c275'
    },
    {
        label: 'Rétention',
        value: '92%',
        subtext: 'Taux de fidélité',
        trend: '+2%',
        trendUp: true,
        icon: Heart,
        color: '#f59e0b'
    },
    {
        label: 'CA Moyen / Client',
        value: '18k MAD',
        subtext: 'Annuel',
        trend: '+8%',
        trendUp: true,
        icon: DollarSign,
        color: '#3b82f6'
    }
];

export const CLIENTS = [
    {
        id: 'CL-001',
        name: 'Ahmed Alami',
        company: 'Maroc Telecom',
        email: 'a.alami@maroctelecom.ma',
        phone: '+212 6 12 34 56 78',
        city: 'Casablanca',
        totalSpent: '45 000 MAD',
        lastRental: 'Ferrari F8 - 15/06/2024',
        status: 'VIP',
        avatar: '/avatars/1.jpg'
    },
    {
        id: 'CL-002',
        name: 'Fatima Benjelloun',
        company: 'OCP Group',
        email: 'f.benjelloun@ocp.ma',
        phone: '+212 6 23 45 67 89',
        city: 'Rabat',
        totalSpent: '32 500 MAD',
        lastRental: 'Rolls-Royce Ghost - 10/06/2024',
        status: 'régulier',
        avatar: '/avatars/2.jpg'
    },
    {
        id: 'CL-003',
        name: 'Youssef Tazi',
        company: 'Attijariwafa Bank',
        email: 'y.tazi@attijari.ma',
        phone: '+212 6 34 56 78 90',
        city: 'Casablanca',
        totalSpent: '28 000 MAD',
        lastRental: 'Lamborghini Urus - 05/06/2024',
        status: 'VIP',
        avatar: '/avatars/3.jpg'
    },
    {
        id: 'CL-004',
        name: 'Zineb Berrada',
        company: 'Royal Air Maroc',
        email: 'z.berrada@ram.ma',
        phone: '+212 6 45 67 89 01',
        city: 'Marrakech',
        totalSpent: '12 300 MAD',
        lastRental: 'Porsche 911 - 01/06/2024',
        status: 'nouveau',
        avatar: '/avatars/4.jpg'
    },
    {
        id: 'CL-005',
        name: 'Karim Mansouri',
        company: 'Groupe Akwa',
        email: 'k.mansouri@akwa.ma',
        phone: '+212 6 56 78 90 12',
        city: 'Tanger',
        totalSpent: '67 000 MAD',
        lastRental: 'Bentley Continental - 28/05/2024',
        status: 'VIP',
        avatar: '/avatars/5.jpg'
    },
    {
        id: 'CL-006',
        name: 'Leila Benzakour',
        company: 'ONCF',
        email: 'l.benzakour@oncf.ma',
        phone: '+212 6 67 89 01 23',
        city: 'Fès',
        totalSpent: '9 800 MAD',
        lastRental: 'Maserati MC20 - 20/05/2024',
        status: 'régulier',
        avatar: '/avatars/6.jpg'
    }
];

export const FEATURES = [
    {
        id: 'database',
        icon: Database,
        title: 'Base de données complète',
        description: 'Tous vos clients centralisés avec informations détaillées'
    },
    {
        id: 'history',
        icon: Clock,
        title: 'Historique des locations',
        description: 'Chronologie complète des réservations et contrats'
    },
    {
        id: 'preferences',
        icon: Star,
        title: 'Préférences clients',
        description: 'Véhicules favoris, options récurrentes, remarques'
    },
    {
        id: 'documents',
        icon: FileText,
        title: 'Documents d\'identité',
        description: 'CNI, passeport, permis – stockés et vérifiés'
    },
    {
        id: 'segmentation',
        icon: PieChart,
        title: 'Segmentation avancée',
        description: 'Filtres dynamiques pour campagnes marketing'
    },
    {
        id: 'loyalty',
        icon: Award,
        title: 'Programme de fidélité',
        description: 'Points, avantages, et historique des récompenses'
    }
];

export const getStatusColor = (status) => {
    switch (status) {
        case 'VIP': return '#8b5cf6';
        case 'régulier': return '#36c275';
        case 'nouveau': return '#f59e0b';
        default: return '#64748b';
    }
};
