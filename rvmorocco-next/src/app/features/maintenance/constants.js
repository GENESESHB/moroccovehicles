import {
  Wrench,
  AlertCircle,
  DollarSign,
  Car,
  Calendar,
  Bell,
  FileText,
  Gauge,
  Camera
} from 'lucide-react';

export const stats = [
  {
    label: 'Entretiens préventifs',
    value: '18',
    subtext: 'Planifiés ce mois',
    trend: '+2',
    trendUp: true,
    icon: Wrench,
    color: '#36c275'
  },
  {
    label: 'Réparations curatives',
    value: '4',
    subtext: 'En cours / à venir',
    trend: '-1',
    trendUp: false,
    icon: AlertCircle,
    color: '#f59e0b'
  },
  {
    label: 'Budget mensuel',
    value: '45k MAD',
    subtext: 'Alloué à la maintenance',
    trend: '+5%',
    trendUp: true,
    icon: DollarSign,
    color: '#3b82f6'
  },
  {
    label: 'Véhicules en atelier',
    value: '3',
    subtext: 'Actuellement',
    trend: '0',
    trendUp: false,
    icon: Car,
    color: '#8b5cf6'
  }
];

export const maintenanceTasks = [
  {
    id: 'MAINT-001',
    vehicle: 'Ferrari F8 Tributo',
    plaque: 'F8-1234',
    type: 'Vidange',
    date: '2024-06-25',
    statut: 'planifié',
    cout: '2 500 MAD',
    garage: 'Ferrari Casablanca'
  },
  {
    id: 'MAINT-002',
    vehicle: 'Lamborghini Urus',
    plaque: 'URUS-77',
    type: 'Freins',
    date: '2024-06-27',
    statut: 'planifié',
    cout: '4 800 MAD',
    garage: 'Lamborghini Rabat'
  },
  {
    id: 'MAINT-003',
    vehicle: 'Rolls-Royce Ghost',
    plaque: 'RR-2023',
    type: 'Pneus',
    date: '2024-06-24',
    statut: 'en_cours',
    cout: '6 500 MAD',
    garage: 'Pneus Prestige'
  },
  {
    id: 'MAINT-004',
    vehicle: 'Bentley Continental',
    plaque: 'BENT-1',
    type: 'Batterie',
    date: '2024-06-28',
    statut: 'planifié',
    cout: '1 200 MAD',
    garage: 'Auto Élec'
  },
  {
    id: 'MAINT-005',
    vehicle: 'Porsche 911',
    plaque: '911-TURBO',
    type: 'Carrosserie',
    date: '2024-07-02',
    statut: 'planifié',
    cout: '3 200 MAD',
    garage: 'Carrosserie Luxe'
  },
  {
    id: 'MAINT-006',
    vehicle: 'Maserati MC20',
    plaque: 'MC-2024',
    type: 'Vidange',
    date: '2024-06-22',
    statut: 'terminé',
    cout: '2 800 MAD',
    garage: 'Maserati Tanger'
  }
];

export const features = [
  {
    id: 'planification',
    icon: Calendar,
    title: 'Planification',
    description: 'Organisez les entretiens par véhicule et par date'
  },
  {
    id: 'rappels',
    icon: Bell,
    title: 'Rappels automatiques',
    description: 'Notifications avant chaque échéance'
  },
  {
    id: 'historique',
    icon: FileText,
    title: 'Historique complet',
    description: 'Carnet d’entretien numérique par véhicule'
  },
  {
    id: 'cout',
    icon: DollarSign,
    title: 'Suivi des coûts',
    description: 'Analysez les dépenses par type d’intervention'
  },
  {
    id: 'preventif',
    icon: Gauge,
    title: 'Préventif vs Curatif',
    description: 'Équilibrez votre programme de maintenance'
  },
  {
    id: 'documents',
    icon: Camera,
    title: 'Photos & factures',
    description: 'Joignez les justificatifs à chaque intervention'
  }
];
