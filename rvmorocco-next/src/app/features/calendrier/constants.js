import { Calendar, Clock, Car, TrendingUp, Activity, CalendarRange, AlertCircle, Bell, Download } from 'lucide-react';

export const STATS = [
    {
        label: 'Réservations',
        value: '156',
        subtext: 'Ce mois-ci',
        trend: '+12%',
        trendUp: true,
        icon: Calendar,
        color: '#3b82f6'
    },
    {
        label: "Retours Aujourd'hui",
        value: '8',
        subtext: 'À planifier',
        trend: '-2',
        trendUp: false,
        icon: Clock,
        color: '#f59e0b'
    },
    {
        label: 'Disponibles Semaine',
        value: '23',
        subtext: 'Véhicules libres',
        trend: '+5',
        trendUp: true,
        icon: Car,
        color: '#36c275'
    },
    {
        label: "Taux d'occupation",
        value: '78%',
        subtext: 'Moyenne sur 30 jours',
        trend: '+4%',
        trendUp: true,
        icon: TrendingUp,
        color: '#8b5cf6'
    }
];

export const WEEK_DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export const BOOKINGS = [
    { id: 1, vehicle: 'Ferrari F8', day: 0, start: 9, end: 12, color: '#3b82f6' },
    { id: 2, vehicle: 'Lamborghini Urus', day: 0, start: 14, end: 18, color: '#f59e0b' },
    { id: 3, vehicle: 'Rolls-Royce Ghost', day: 1, start: 10, end: 16, color: '#36c275' },
    { id: 4, vehicle: 'Bentley Continental', day: 2, start: 8, end: 12, color: '#8b5cf6' },
    { id: 5, vehicle: 'Porsche 911', day: 2, start: 13, end: 17, color: '#ef4444' },
    { id: 6, vehicle: 'Maserati MC20', day: 3, start: 9, end: 15, color: '#3b82f6' },
    { id: 7, vehicle: 'Ferrari F8', day: 4, start: 11, end: 14, color: '#f59e0b' },
    { id: 8, vehicle: 'Rolls-Royce Ghost', day: 5, start: 9, end: 13, color: '#36c275' },
    { id: 9, vehicle: 'Lamborghini Urus', day: 6, start: 15, end: 20, color: '#8b5cf6' },
];

export const UPCOMING_EVENTS = [
    { type: 'pickup', time: '09:00', vehicle: 'Ferrari F8', client: 'M. Alami', status: 'confirmé' },
    { type: 'pickup', time: '10:30', vehicle: 'Lamborghini Urus', client: 'Mme Benjelloun', status: 'confirmé' },
    { type: 'return', time: '11:45', vehicle: 'Rolls-Royce Ghost', client: 'Groupe OCP', status: 'attente' },
    { type: 'pickup', time: '14:00', vehicle: 'Bentley Continental', client: 'M. Tazi', status: 'confirmé' },
    { type: 'return', time: '16:30', vehicle: 'Porsche 911', client: 'Mme Berrada', status: 'confirmé' },
    { type: 'maintenance', time: '18:00', vehicle: 'Maserati MC20', client: 'Atelier', status: 'planifié' },
];

export const FEATURES = [
    {
        id: 'realtime',
        icon: Activity,
        title: 'Temps réel',
        description: "Mise à jour instantanée des réservations et disponibilités"
    },
    {
        id: 'planning',
        icon: CalendarRange,
        title: 'Planification intelligente',
        description: "Évite automatiquement les chevauchements"
    },
    {
        id: 'maintenance',
        icon: AlertCircle,
        title: 'Gestion maintenance',
        description: "Bloquez les périodes d'entretien directement"
    },
    {
        id: 'alerts',
        icon: Bell,
        title: 'Alertes chevauchement',
        description: 'Notifications en cas de conflit de réservation'
    },
    {
        id: 'export',
        icon: Download,
        title: 'Export iCal',
        description: 'Synchronisez avec vos agendas externes'
    },
    {
        id: 'notifications',
        icon: Clock,
        title: 'Rappels automatiques',
        description: 'Notifications pour les retours et prises en charge'
    }
];
