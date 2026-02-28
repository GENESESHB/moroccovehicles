import { Star, TrendingUp, DollarSign, Award, Sparkles, Camera, FileText, Heart, Shield, Activity } from 'lucide-react';

export const STATS = [
    {
        label: 'Véhicules Luxe',
        value: '26',
        subtext: 'En stock immédiat',
        trend: '+4',
        trendUp: true,
        icon: Star,
        color: '#f59e0b'
    },
    {
        label: 'Marge Moyenne',
        value: '45%',
        subtext: 'Sur la location',
        trend: '+8%',
        trendUp: true,
        icon: TrendingUp,
        color: '#36c275'
    },
    {
        label: 'Prix / Jour',
        value: '2 500 MAD',
        subtext: 'En moyenne',
        trend: '+12%',
        trendUp: true,
        icon: DollarSign,
        color: '#3b82f6'
    },
    {
        label: 'Réservations VIP',
        value: '14',
        subtext: 'Ce mois-ci',
        trend: '+33%',
        trendUp: true,
        icon: Award,
        color: '#8b5cf6'
    }
];

export const LUXURY_VEHICLES = [
    {
        id: 'VH-001',
        marque: 'Ferrari',
        modele: 'F8 Tributo',
        annee: 2023,
        plaque: 'F8-1234',
        prixJour: '4 500 MAD',
        disponibilite: 'disponible',
        carburant: 'Essence',
        puissance: '720 ch',
        image: '/ferrari-f8.jpg',
        type: 'Supercar'
    },
    {
        id: 'VH-002',
        marque: 'Lamborghini',
        modele: 'Urus',
        annee: 2024,
        plaque: 'URUS-77',
        prixJour: '3 800 MAD',
        disponibilite: 'reserve',
        carburant: 'Essence',
        puissance: '650 ch',
        image: '/lamborghini-urus.jpg',
        type: 'SUV de luxe'
    },
    {
        id: 'VH-003',
        marque: 'Rolls-Royce',
        modele: 'Ghost',
        annee: 2023,
        plaque: 'RR-2023',
        prixJour: '6 500 MAD',
        disponibilite: 'disponible',
        carburant: 'Essence',
        puissance: '570 ch',
        image: '/rolls-ghost.jpg',
        type: 'Berline prestige'
    },
    {
        id: 'VH-004',
        marque: 'Bentley',
        modele: 'Continental GT',
        annee: 2024,
        plaque: 'BENT-1',
        prixJour: '4 200 MAD',
        disponibilite: 'maintenance',
        carburant: 'Essence',
        puissance: '635 ch',
        image: '/bentley-continental.jpg',
        type: 'Grand tourisme'
    },
    {
        id: 'VH-005',
        marque: 'Porsche',
        modele: '911 Turbo S',
        annee: 2023,
        plaque: '911-TURBO',
        prixJour: '3 900 MAD',
        disponibilite: 'disponible',
        carburant: 'Essence',
        puissance: '650 ch',
        image: '/porsche-911.jpg',
        type: 'Sportive'
    },
    {
        id: 'VH-006',
        marque: 'Maserati',
        modele: 'MC20',
        annee: 2024,
        plaque: 'MC-2024',
        prixJour: '4 800 MAD',
        disponibilite: 'disponible',
        carburant: 'Essence',
        puissance: '630 ch',
        image: '/maserati-mc20.jpg',
        type: 'Supercar'
    }
];

export const FEATURES = [
    {
        id: 'personalisation',
        icon: Sparkles,
        title: 'Personnalisation avancée',
        description: 'Couleur, jantes, intérieur cuir, sur-mesure pour chaque client'
    },
    {
        id: 'photos',
        icon: Camera,
        title: 'Photos haute résolution',
        description: 'Visuels 4K, galerie interactive et vidéos 360°'
    },
    {
        id: 'conditions',
        icon: FileText,
        title: 'Conditions particulières',
        description: 'Contrats spécifiques, assurances tous risques, franchise réduite'
    },
    {
        id: 'conciergerie',
        icon: Heart,
        title: 'Service Conciergerie',
        description: 'Livraison à domicile, chauffeur privé, itinéraires sur mesure'
    },
    {
        id: 'assurance',
        icon: Shield,
        title: 'Assurance Premium',
        description: 'Couverture internationale, rachat de franchise, assistance 24/7'
    },
    {
        id: 'historique',
        icon: Activity,
        title: 'Historique complet',
        description: 'Entretien, kilométrage, incidents – transparence totale'
    }
];

export const getDisponibilityColor = (dispo) => {
    switch (dispo) {
        case 'disponible': return '#36c275';
        case 'reserve': return '#f59e0b';
        case 'maintenance': return '#ef4444';
        default: return '#64748b';
    }
};

export const getDisponibilityLabel = (dispo) => {
    switch (dispo) {
        case 'disponible': return 'Disponible';
        case 'reserve': return 'Réservé';
        case 'maintenance': return 'En maintenance';
        default: return dispo;
    }
};
