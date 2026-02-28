// src/app/components/FleetSoftwareShowcase.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Legend
} from 'recharts';
import { 
  Car, Users, FileText, Crown, Calendar, Shield, Wrench, AlertTriangle, 
  TrendingUp, Activity, MapPin, Clock, CheckCircle, 
  Zap, BarChart3, ArrowRight, Sparkles, ShieldCheck, Download,
  Play, Ban, Star, CreditCard, BadgeCheck
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const fleetStatusData = [
  { name: 'Disponible', value: 45, color: '#10b981' },
  { name: 'En location', value: 89, color: '#36c275' },
  { name: 'Maintenance', value: 22, color: '#f59e0b' },
  { name: 'Réservé', value: 15, color: '#8b5cf6' }
];

const occupancyTrendData = [
  { day: 'Lun', rate: 65 },
  { day: 'Mar', rate: 72 },
  { day: 'Mer', rate: 78 },
  { day: 'Jeu', rate: 85 },
  { day: 'Ven', rate: 92 },
  { day: 'Sam', rate: 95 },
  { day: 'Dim', rate: 70 }
];

const vehicleTypesData = [
  { name: 'Citadine', count: 45, avgPrice: 250 },
  { name: 'Berline', count: 38, avgPrice: 450 },
  { name: 'SUV', count: 42, avgPrice: 650 },
  { name: 'Luxury', count: 26, avgPrice: 2500 },
  { name: 'Van', count: 15, avgPrice: 800 }
];

const revenueData = [
  { month: 'Jan', revenue: 185, contracts: 45, target: 200 },
  { month: 'Fév', revenue: 210, contracts: 52, target: 210 },
  { month: 'Mar', revenue: 195, contracts: 48, target: 220 },
  { month: 'Avr', revenue: 245, contracts: 61, target: 230 },
  { month: 'Mai', revenue: 230, contracts: 58, target: 240 },
  { month: 'Juin', revenue: 280, contracts: 72, target: 250 }
];

const luxuryFleetData = [
  { subject: 'Mercedes', A: 8, fullMark: 10 },
  { subject: 'BMW', A: 6, fullMark: 10 },
  { subject: 'Audi', A: 5, fullMark: 10 },
  { subject: 'Porsche', A: 3, fullMark: 10 },
  { subject: 'Range Rover', A: 4, fullMark: 10 }
];

const luxuryRevenueData = [
  { month: 'Jan', standard: 120, luxury: 65 },
  { month: 'Fév', standard: 135, luxury: 75 },
  { month: 'Mar', standard: 128, luxury: 67 },
  { month: 'Avr', standard: 145, luxury: 100 },
  { month: 'Mai', standard: 140, luxury: 90 },
  { month: 'Juin', standard: 155, luxury: 125 }
];

const calendarData = [
  { day: 'Lun', bookings: 12, returns: 8 },
  { day: 'Mar', bookings: 15, returns: 10 },
  { day: 'Mer', bookings: 18, returns: 12 },
  { day: 'Jeu', bookings: 22, returns: 15 },
  { day: 'Ven', bookings: 28, returns: 18 },
  { day: 'Sam', bookings: 35, returns: 25 },
  { day: 'Dim', bookings: 20, returns: 12 }
];

const clientGrowthData = [
  { month: 'Jan', new: 45, retained: 85 },
  { month: 'Fév', new: 52, retained: 87 },
  { month: 'Mar', new: 48, retained: 89 },
  { month: 'Avr', new: 65, retained: 88 },
  { month: 'Mai', new: 72, retained: 90 },
  { month: 'Juin', new: 85, retained: 92 }
];

const clientSegmentsData = [
  { segment: 'Particuliers', value: 65, color: '#36c275' },
  { segment: 'Entreprises', value: 25, color: '#10b981' },
  { segment: 'VIP', value: 10, color: '#8b5cf6' }
];

const insuranceData = [
  { name: 'Tous risques', value: 85, color: '#10b981' },
  { name: 'Tierce', value: 45, color: '#36c275' },
  { name: 'Échéance <30j', value: 12, color: '#f59e0b' },
  { name: 'Échéance <7j', value: 5, color: '#ef4444' }
];

const maintenanceData = [
  { type: 'Vidange', count: 45, cost: 450 },
  { type: 'Freins', count: 12, cost: 1200 },
  { type: 'Pneus', count: 28, cost: 2800 },
  { type: 'Batterie', count: 8, cost: 800 },
  { type: 'Carrosserie', count: 5, cost: 2500 }
];

const blacklistData = [
  { month: 'Jan', count: 18, severity: 'low' },
  { month: 'Fév', count: 19, severity: 'low' },
  { month: 'Mar', count: 20, severity: 'medium' },
  { month: 'Avr', count: 21, severity: 'medium' },
  { month: 'Mai', count: 22, severity: 'high' },
  { month: 'Juin', count: 23, severity: 'high' }
];

// --- CHART COMPONENTS ---
const OverviewChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={fleetStatusData}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={120}
        paddingAngle={4}
        dataKey="value"
      >
        {fleetStatusData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
        ))}
      </Pie>
      <RechartsTooltip 
        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
        itemStyle={{ color: '#1e293b' }}
      />
      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#1e293b' }} />
    </PieChart>
  </ResponsiveContainer>
);

const VehiclesChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <ComposedChart data={vehicleTypesData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
      <XAxis dataKey="name" stroke="#475569" fontSize={13} tickLine={false} />
      <YAxis stroke="#475569" fontSize={13} tickLine={false} />
      <RechartsTooltip 
        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
        itemStyle={{ color: '#1e293b' }}
      />
      <Bar dataKey="count" fill="#36c275" radius={[8, 8, 0, 0]} barSize={50} />
      <Line type="monotone" dataKey="avgPrice" stroke="#f59e0b" strokeWidth={4} dot={{ fill: '#f59e0b', r: 6 }} />
    </ComposedChart>
  </ResponsiveContainer>
);

const ContractsChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={revenueData}>
      <defs>
        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
      <XAxis dataKey="month" stroke="#475569" fontSize={13} tickLine={false} />
      <YAxis stroke="#475569" fontSize={13} tickLine={false} />
      <RechartsTooltip 
        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
        itemStyle={{ color: '#1e293b' }}
      />
      <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
      <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
    </AreaChart>
  </ResponsiveContainer>
);

const LuxuryCarsChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={luxuryFleetData}>
      <PolarGrid stroke="#cbd5e1" />
      <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 13 }} />
      <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
      <Radar name="Fleet" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} strokeWidth={3} />
      <RechartsTooltip 
        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
        itemStyle={{ color: '#1e293b' }}
      />
    </RadarChart>
  </ResponsiveContainer>
);

const LuxuryContractsChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={luxuryRevenueData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
      <XAxis dataKey="month" stroke="#475569" fontSize={13} tickLine={false} />
      <YAxis stroke="#475569" fontSize={13} tickLine={false} />
      <RechartsTooltip 
        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
        itemStyle={{ color: '#1e293b' }}
      />
      <Bar dataKey="standard" stackId="a" fill="#94a3b8" radius={[0, 0, 4, 4]} barSize={50} name="Standard" />
      <Bar dataKey="luxury" stackId="a" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={50} name="Luxe" />
      <Legend wrapperStyle={{ color: '#1e293b' }} />
    </BarChart>
  </ResponsiveContainer>
);

const CalendarChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <ComposedChart data={calendarData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
      <XAxis dataKey="day" stroke="#475569" fontSize={13} tickLine={false} />
      <YAxis stroke="#475569" fontSize={13} tickLine={false} />
      <RechartsTooltip 
        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
        itemStyle={{ color: '#1e293b' }}
      />
      <Bar dataKey="bookings" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={30} name="Prises en charge" />
      <Bar dataKey="returns" fill="#64748b" radius={[6, 6, 0, 0]} barSize={30} name="Retours" />
      <Legend wrapperStyle={{ color: '#1e293b' }} />
    </ComposedChart>
  </ResponsiveContainer>
);

const ClientsChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={clientSegmentsData}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={110}
        paddingAngle={5}
        dataKey="value"
      >
        {clientSegmentsData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
        ))}
      </Pie>
      <RechartsTooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }} />
      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#1e293b' }} />
    </PieChart>
  </ResponsiveContainer>
);

const InsuranceChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={insuranceData}
        cx="50%"
        cy="50%"
        outerRadius={110}
        dataKey="value"
        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        labelLine={false}
      >
        {insuranceData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
        ))}
      </Pie>
      <RechartsTooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }} />
      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#1e293b' }} />
    </PieChart>
  </ResponsiveContainer>
);

const MaintenanceChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={maintenanceData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
      <XAxis dataKey="type" stroke="#475569" fontSize={12} tickLine={false} />
      <YAxis stroke="#475569" fontSize={13} tickLine={false} />
      <RechartsTooltip 
        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }}
        itemStyle={{ color: '#1e293b' }}
      />
      <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={50} />
    </BarChart>
  </ResponsiveContainer>
);

const BlacklistChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={blacklistData}>
      <defs>
        <linearGradient id="colorBlacklist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
      <XAxis dataKey="month" stroke="#475569" fontSize={13} tickLine={false} />
      <YAxis stroke="#475569" fontSize={13} tickLine={false} />
      <RechartsTooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1e293b' }} />
      <Area type="monotone" dataKey="count" stroke="#dc2626" strokeWidth={4} fill="url(#colorBlacklist)" />
    </AreaChart>
  </ResponsiveContainer>
);

// --- MODULES CONFIGURATION ---
// Added href property for internal links - SEO 2026 Optimized
const modules = [
  { 
    name: 'Vue d\'ensemble', 
    href: '/features/overview',
    description: 'Tableau de bord centralisé affichant les indicateurs clés de votre activité : nombre de contrats actifs, taux d\'occupation des véhicules, chiffre d\'affaires mensuel, et alertes importantes. Visualisez en un coup d\'œil la santé de votre entreprise.',
    gradient: 'linear-gradient(135deg, #36c275, #2a9e5c)',
    chart: OverviewChart,
    icon: Activity,
    stats: [
      { label: 'Véhicules', value: 156 },
      { label: 'Taux Occupation', value: '78%' },
      { label: 'CA Mensuel', value: '245k MAD' }
    ]
  },
  { 
    name: 'Véhicules', 
    href: '/features/vehicles',
    description: 'Gérez l\'intégralité de votre flotte : ajout, modification, suivi des entretiens, disponibilité, et historique des locations. Chaque véhicule dispose d\'une fiche détaillée avec photos, caractéristiques et documents associés.',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    chart: VehiclesChart,
    icon: Car,
    stats: [
      { label: 'Disponibles', value: 45 },
      { label: 'En Location', value: 89 },
      { label: 'Maintenance', value: 22 }
    ]
  },
  { 
    name: 'Contrats', 
    href: '/features/contracts',
    description: 'Créez, modifiez et suivez tous vos contrats de location en quelques clics. Gérez les signatures électroniques, les dépôts de garantie, les états des lieux, et la facturation automatique. Un historique complet est conservé pour chaque contrat.',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    chart: ContractsChart,
    icon: FileText,
    stats: [
      { label: 'Actifs', value: 89 },
      { label: 'En Attente', value: 12 },
      { label: 'CA Prévu', value: '180k MAD' }
    ]
  },
  { 
    name: 'Luxury Voitures', 
    href: '/features/luxury-cars',
    description: 'Une section dédiée aux véhicules de prestige : Ferrari, Lamborghini, Rolls-Royce, etc. Bénéficiez d\'une gestion spécifique avec des options de personnalisation avancées, des photos haute résolution et des conditions de location particulières.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    chart: LuxuryCarsChart,
    icon: Crown,
    stats: [
      { label: 'Véhicules Luxe', value: 26 },
      { label: 'Marge Moyenne', value: '45%' },
      { label: 'Prix/Jour', value: '2500 MAD' }
    ]
  },
  { 
    name: 'Luxury Contracts', 
    href: '/features/luxury-contracts',
    description: 'Contrats haut de gamme pour les locations de véhicules de luxe. Incluent des clauses spécifiques, des assurances renforcées, et un service de conciergerie. Tous les documents sont sécurisés et accessibles depuis un tableau de bord exclusif.',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    chart: LuxuryContractsChart,
    icon: Star,
    stats: [
      { label: 'Contrats VIP', value: 34 },
      { label: 'Durée Moy.', value: '15 jours' },
      { label: 'Satisfaction', value: '98%' }
    ]
  },
  { 
    name: 'Calendrier', 
    href: '/features/calendrier',
    description: 'Visualisez en temps réel les réservations et la disponibilité de vos véhicules. Le calendrier interactif vous permet de planifier les locations, d\'éviter les chevauchements et de gérer les périodes de maintenance.',
    gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    chart: CalendarChart,
    icon: Calendar,
    stats: [
      { label: 'Réservations', value: 156 },
      { label: 'Retours Jour', value: 8 },
      { label: 'Dispo Semaine', value: 23 }
    ]
  },
  { 
    name: 'Clients', 
    href: '/features/clients',
    description: 'Base de données clients complète avec historique des locations, préférences, documents d\'identité, et contrat type. Segmentez votre clientèle pour des offres personnalisées et fidélisez grâce à un suivi détaillé.',
    gradient: 'linear-gradient(135deg, #f97316, #fb923c)',
    chart: ClientsChart,
    icon: Users,
    stats: [
      { label: 'Clients Actifs', value: 1240 },
      { label: 'Nouveaux/Mois', value: 85 },
      { label: 'Rétention', value: '92%' }
    ]
  },
  { 
    name: 'Assurance', 
    href: '/features/assurance',
    description: 'Gérez les polices d\'assurance liées à chaque véhicule et à chaque contrat. Suivez les sinistres, les franchises, et les remboursements. Une interface claire vous aide à rester conforme et à protéger votre activité.',
    gradient: 'linear-gradient(135deg, #ef4444, #f87171)',
    chart: InsuranceChart,
    icon: Shield,
    stats: [
      { label: 'Contrats Actifs', value: 156 },
      { label: 'Échéances 30j', value: 12 },
      { label: 'Sinistres', value: 3 }
    ]
  },
  { 
    name: 'Maintenance', 
    href: '/features/maintenance',
    description: 'Planifiez et suivez les opérations d\'entretien de votre flotte : révisions, contrôles techniques, réparations. Recevez des rappels automatiques et conservez un historique complet pour chaque véhicule.',
    gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
    chart: MaintenanceChart,
    icon: Wrench,
    stats: [
      { label: 'Préventifs', value: 18 },
      { label: 'Curatifs', value: 4 },
      { label: 'Budget/Mois', value: '45k MAD' }
    ]
  },
  { 
    name: 'Liste Noire', 
    href: '/features/black-list',
    description: 'Identifiez et gérez les clients indésirables ou à risque. Centralisez les motifs d\'inscription (impayés, litiges, comportements inappropriés) et protégez votre entreprise en bloquant automatiquement certaines réservations.',
    gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
    chart: BlacklistChart,
    icon: AlertTriangle,
    stats: [
      { label: 'Entrées Liste', value: 23 },
      { label: 'Alertes Actives', value: 5 },
      { label: 'Litiges', value: 2 }
    ]
  }
];

// --- STRUCTURED DATA JSON-LD ---
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MoroccoVehicles",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "MAD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "500"
  },
  "description": "Logiciel de gestion de flotte automobile au Maroc pour agences de location",
  "url": "https://moroccovehicles.com",
  "provider": {
    "@type": "Organization",
    "name": "MoroccoVehicles",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MA"
    }
  }
};

// --- MAIN COMPONENT ---
export default function FleetSoftwareShowcase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="landing-page">
        {/* Hero Section - Semantic HTML5 */}
        <header className="hero-section" role="banner">
          <div className="hero-overlay">
            <div className="container">
              <div className="container-content">
                <div className="hero-content">
                  <span className="badge">
                    <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} aria-hidden="true" />
                    Logiciel innovant
                  </span>
                  <h1>MoroccoVehicles - Logiciel de Gestion de Flotte Automobile au Maroc</h1>
                  <p className="hero-subtitle">
                    La solution complète pour la gestion de votre flotte automobile au Maroc. 
                    Optimisez vos locations, suivez vos véhicules en temps réel et maximisez votre rentabilité.
                  </p>
                  <div className="hero-cta">
                    <Link href="/demo" className="btn btn-primary" aria-label="Découvrir la solution MoroccoVehicles">
                      Découvrir la Solution
                      <ArrowRight size={18} style={{ marginLeft: '8px' }} aria-hidden="true" />
                    </Link>
                    <Link href="/contact" className="btn btn-outline" aria-label="Demander une démonstration">
                      <Play size={18} style={{ marginRight: '8px' }} aria-hidden="true" />
                      Demander une Démo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main id="main-content">
          {/* Stats / Trust Indicators */}
          <section className="stats-section" aria-label="Statistiques clés">
            <div className="container">
              <div className="container-content">
                <div className="stats-grid">
                  <article className="stat-item">
                    <h3>500+</h3>
                    <p>Agences partenaires</p>
                  </article>
                  <article className="stat-item">
                    <h3>15k+</h3>
                    <p>Véhicules gérés</p>
                  </article>
                  <article className="stat-item">
                    <h3>98%</h3>
                    <p>Taux de satisfaction</p>
                  </article>
                  <article className="stat-item">
                    <h3>24/7</h3>
                    <p>Support technique</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section" aria-labelledby="features-heading">
            <div className="container">
              <div className="container-content">
                <header className="section-header">
                  <h2 id="features-heading">Fonctionnalités clés de notre logiciel de gestion de flotte</h2>
                  <p>Tout ce dont vous avez besoin pour gérer votre agence de location automobile au Maroc</p>
                </header>

                <div className="features-grid">
                  <article className="feature-card">
                    <div className="feature-icon" style={{ background: '#e0e7ff' }}>
                      <BarChart3 size={24} color="#6366f1" aria-hidden="true" />
                    </div>
                    <h3>Analytics temps réel</h3>
                    <p>Tableaux de bord interactifs avec KPIs essentiels pour piloter votre activité au quotidien.</p>
                  </article>

                  <article className="feature-card">
                    <div className="feature-icon" style={{ background: '#dbeafe' }}>
                      <Car size={24} color="#36c275" aria-hidden="true" />
                    </div>
                    <h3>Gestion complète du parc automobile</h3>
                    <p>Suivi détaillé de chaque véhicule : disponibilité, entretien, historique et documents.</p>
                  </article>

                  <article className="feature-card">
                    <div className="feature-icon" style={{ background: '#fef3c7' }}>
                      <FileText size={24} color="#f59e0b" aria-hidden="true" />
                    </div>
                    <h3>Contrats de location digitalisés</h3>
                    <p>Création, signature électronique et archivage automatique de tous vos contrats.</p>
                  </article>

                  <article className="feature-card">
                    <div className="feature-icon" style={{ background: '#fce7f3' }}>
                      <Crown size={24} color="#ec4899" aria-hidden="true" />
                    </div>
                    <h3>Segment Premium et Luxe</h3>
                    <p>Gestion spécifique des véhicules de luxe avec service conciergerie intégré.</p>
                  </article>

                  <article className="feature-card">
                    <div className="feature-icon" style={{ background: '#d1fae5' }}>
                      <ShieldCheck size={24} color="#10b981" aria-hidden="true" />
                    </div>
                    <h3>Sécurité et Conformité légale</h3>
                    <p>Protection des données, gestion des assurances et conformité légale garanties.</p>
                  </article>

                  <article className="feature-card">
                    <div className="feature-icon" style={{ background: '#cffafe' }}>
                      <Zap size={24} color="#06b6d4" aria-hidden="true" />
                    </div>
                    <h3>Automatisation intelligente</h3>
                    <p>Alertes automatiques, relances clients et planification des entretiens sans effort.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* Module Sections with Charts - SEO Optimized with Internal Links */}
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            const ChartComponent = module.chart;
            const isEven = index % 2 === 0;
            
            return (
              <section 
                key={module.name} 
                className={`module-section ${isEven ? 'bg-light' : 'bg-white'}`}
                aria-labelledby={`module-heading-${index}`}
              >
                <div className="container">
                  <div className="container-content">
                    <div className={`module-grid ${isEven ? '' : 'module-grid-reverse'}`}>
                      <div className="module-content">
                        <header className="module-header">
                          <div className="module-icon" style={{ background: module.gradient }} aria-hidden="true">
                            <IconComponent size={28} color="white" />
                          </div>
                          <h2 id={`module-heading-${index}`}>{module.name}</h2>
                        </header>
                        <p>{module.description}</p>
                        
                        <div className="module-stats">
                          {module.stats.map((stat, idx) => (
                            <div key={idx} className="module-stat">
                              <span className="stat-value">{stat.value}</span>
                              <span className="stat-label">{stat.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* SEO 2026: Internal Link with descriptive anchor text */}
                        <Link 
                          href={module.href} 
                          className="btn btn-primary module-cta"
                          style={{ marginTop: '24px' }}
                          aria-label={`En savoir plus sur ${module.name}`}
                        >
                          En savoir plus sur {module.name}
                          <ArrowRight size={16} style={{ marginLeft: '8px' }} aria-hidden="true" />
                        </Link>
                      </div>
                      
                      <div className="module-chart-container" aria-hidden="true">
                        <div className="chart-wrapper">
                          <ChartComponent />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

          {/* Why Choose Us - Semantic HTML */}
          <section className="why-section" aria-labelledby="why-heading">
            <div className="container">
              <div className="container-content">
                <div className="why-grid">
                  <div className="why-content">
                    <h2 id="why-heading">Pourquoi choisir MoroccoVehicles pour votre agence de location ?</h2>
                    <p>
                      MoroccoVehicles est le logiciel de gestion de flotte automobile leader au Maroc, 
                      conçu spécifiquement pour les agences de location. Nous comprenons les défis du marché 
                      marocain et offrons une solution robuste, évolutive et parfaitement adaptée à vos besoins.
                    </p>
                    <ul className="why-list">
                      <li>
                        <CheckCircle size={20} color="#10b981" aria-hidden="true" />
                        <span>Interface en français et arabe pour le marché marocain</span>
                      </li>
                      <li>
                        <CheckCircle size={20} color="#10b981" aria-hidden="true" />
                        <span>Conforme à la législation marocaine des véhicules</span>
                      </li>
                      <li>
                        <CheckCircle size={20} color="#10b981" aria-hidden="true" />
                        <span>Paiement en MAD Dirhams et gestion multi-devises</span>
                      </li>
                      <li>
                        <CheckCircle size={20} color="#10b981" aria-hidden="true" />
                        <span>Support technique local disponible 24h/24 et 7j/7</span>
                      </li>
                      <li>
                        <CheckCircle size={20} color="#10b981" aria-hidden="true" />
                        <span>Hébergement sécurisé au Maroc avec protection des données</span>
                      </li>
                      <li>
                        <CheckCircle size={20} color="#10b981" aria-hidden="true" />
                        <span>Intégration avec les principaux assureurs locaux</span>
                      </li>
                    </ul>
                  </div>
                  <aside className="why-image">
                    <div className="image-placeholder" style={{ 
                      background: 'linear-gradient(135deg, #36c275 0%, #2a9e5c 50%, #1e7b45 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      padding: '40px',
                      borderRadius: '12px'
                    }}>
                      <BarChart3 size={64} style={{ marginBottom: '20px', opacity: 0.9 }} aria-hidden="true" />
                      <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Tableau de bord unifié</h3>
                      <p style={{ opacity: 0.8, textAlign: 'center' }}>Toutes vos données de gestion de flotte en un seul endroit</p>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section" aria-label="Appel à l'action">
            <div className="container">
              <div className="container-content">
                <div className="cta-box">
                  <h2>Prêt à transformer la gestion de votre flotte automobile ?</h2>
                  <p>Rejoignez plus de 500 agences de location au Maroc qui utilisent déjà MoroccoVehicles pour optimiser leur rentabilité.</p>
                  <Link href="/signup" className="btn btn-white" aria-label="Commencer maintenant avec MoroccoVehicles">
                    Commencer maintenant
                    <ArrowRight size={18} style={{ marginLeft: '8px' }} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}