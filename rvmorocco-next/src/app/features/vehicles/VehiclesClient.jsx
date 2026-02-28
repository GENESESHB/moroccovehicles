'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie,
  LineChart, Line, ComposedChart
} from 'recharts';
import styles from './vehicles.module.css';
import {
  VEHICLE_STATS, VEHICLES_LIST, COLORS, Icons
} from './constants';
import { faqs } from './faqs';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, subtext, color, trend }) => (
  <div className={styles.statCard} style={{ borderLeftColor: color }}>
    <div className={styles.statIcon} style={{ backgroundColor: `${color}20`, color }}>
      <Icon />
    </div>
    <div className={styles.statInfo}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
      {subtext && <span className={styles.statSubtext}>{subtext}</span>}
      {trend && (
        <span className={`${styles.statTrend} ${trend >= 0 ? styles.positive : styles.negative}`}>
          {trend >= 0 ? <Icons.ArrowUp /> : <Icons.ArrowDown />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
  </div>
);

const CategoryDistribution = () => (
  <div className={styles.chartCard}>
    <h5><Icons.PieChart /> Répartition par Catégorie</h5>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={[
            { name: 'Citadine', value: VEHICLE_STATS.categories.citadine },
            { name: 'Berline', value: VEHICLE_STATS.categories.berline },
            { name: 'SUV', value: VEHICLE_STATS.categories.suv },
            { name: 'Luxury', value: VEHICLE_STATS.categories.luxury },
            { name: 'Van', value: VEHICLE_STATS.categories.van }
          ]}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {COLORS.categories.map((color, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    <div className={styles.categoryLegend}>
      <div className={styles.categoryItem}>
        <span className={styles.categoryDot} style={{ background: COLORS.categories[0] }}></span>
        <span>Citadine: {VEHICLE_STATS.categories.citadine}</span>
      </div>
      <div className={styles.categoryItem}>
        <span className={styles.categoryDot} style={{ background: COLORS.categories[1] }}></span>
        <span>Berline: {VEHICLE_STATS.categories.berline}</span>
      </div>
      <div className={styles.categoryItem}>
        <span className={styles.categoryDot} style={{ background: COLORS.categories[2] }}></span>
        <span>SUV: {VEHICLE_STATS.categories.suv}</span>
      </div>
      <div className={styles.categoryItem}>
        <span className={styles.categoryDot} style={{ background: COLORS.categories[3] }}></span>
        <span>Luxury: {VEHICLE_STATS.categories.luxury}</span>
      </div>
      <div className={styles.categoryItem}>
        <span className={styles.categoryDot} style={{ background: COLORS.categories[4] }}></span>
        <span>Van: {VEHICLE_STATS.categories.van}</span>
      </div>
    </div>
  </div>
);

const FleetEvolutionChart = () => (
  <div className={styles.chartCard}>
    <h5><Icons.Activity /> Évolution de la Flotte</h5>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={VEHICLE_STATS.monthlyAdditions}>
        <defs>
          <linearGradient id="colorAdded" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#36c275" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#36c275" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorRemoved" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="added" name="Ajouts" stroke="#36c275" fillOpacity={1} fill="url(#colorAdded)" />
        <Area type="monotone" dataKey="removed" name="Retraits" stroke="#ef4444" fillOpacity={1} fill="url(#colorRemoved)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const MaintenanceChart = () => (
  <div className={styles.chartCard}>
    <h5><Icons.Wrench /> Coûts de Maintenance</h5>
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={VEHICLE_STATS.maintenanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="preventive" name="Préventif" fill="#36c275" />
        <Bar yAxisId="left" dataKey="corrective" name="Correctif" fill="#f59e0b" />
        <Line yAxisId="right" type="monotone" dataKey="cost" name="Coût (MAD)" stroke="#3b82f6" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

const VehicleCard = ({ vehicle, onEdit, onView, onDelete }) => {
  const statusConfig = {
    available: { label: 'Disponible', color: '#36c275', icon: Icons.Check },
    rented: { label: 'En Location', color: '#3b82f6', icon: Icons.Clock },
    maintenance: { label: 'Maintenance', color: '#f59e0b', icon: Icons.Wrench }
  };

  const status = statusConfig[vehicle.status];
  const StatusIcon = status.icon;

  return (
    <div className={styles.vehicleCard}>
      <div className={styles.vehicleImage}>
        <div className={styles.imagePlaceholder}>
          <Icons.Car />
        </div>
        <div className={styles.vehicleBadge} style={{ backgroundColor: status.color }}>
          <StatusIcon />
          {status.label}
        </div>
        <div className={styles.vehicleActions}>
          <button onClick={() => onView(vehicle)} className={styles.actionBtn} title="Voir détails">
            <Icons.Eye />
          </button>
          <button onClick={() => onEdit(vehicle)} className={styles.actionBtn} title="Modifier">
            <Icons.Edit />
          </button>
          <button onClick={() => onDelete(vehicle.id)} className={styles.actionBtn} title="Supprimer">
            <Icons.Trash />
          </button>
        </div>
      </div>

      <div className={styles.vehicleContent}>
        <div className={styles.vehicleHeader}>
          <h4>{vehicle.brand} {vehicle.model}</h4>
          <span className={styles.vehicleYear}>{vehicle.year}</span>
        </div>

        <div className={styles.vehicleMeta}>
          <span className={styles.vehicleType}>{vehicle.type}</span>
          <span className={styles.vehiclePlate}>{vehicle.licensePlate}</span>
        </div>

        <div className={styles.vehicleSpecs}>
          <div className={styles.spec}>
            <Icons.Gauge />
            <span>{vehicle.mileage.toLocaleString()} km</span>
          </div>
          <div className={styles.spec}>
            <Icons.Fuel />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className={styles.spec}>
            <Icons.Users />
            <span>{vehicle.seats} places</span>
          </div>
        </div>

        <div className={styles.vehiclePricing}>
          <div className={styles.price}>
            <span className={styles.priceValue}>{vehicle.dailyRate} MAD</span>
            <span className={styles.priceLabel}>/jour</span>
          </div>
          <div className={styles.maintenanceInfo}>
            <Icons.Calendar />
            <span>Prochaine révision: {vehicle.nextMaintenance}</span>
          </div>
        </div>

        {vehicle.damageReports.length > 0 && (
          <div className={styles.damageAlert}>
            <Icons.AlertCircle />
            <span>{vehicle.damageReports.length} dommage(s) signalé(s)</span>
          </div>
        )}
      </div>
    </div>
  );
};

const AddVehicleFeature = () => (
  <div className={styles.featureExplanation}>
    <div className={styles.featureHeader}>
      <div className={styles.featureIconLarge} style={{ background: '#dbeafe', color: '#3b82f6' }}>
        <Icons.Plus />
      </div>
      <div>
        <h3>Ajout de Nouveaux Véhicules</h3>
        <p>Processus complet d'intégration dans le système</p>
      </div>
    </div>

    <div className={styles.featureSteps}>
      <div className={styles.step}>
        <div className={styles.stepNumber}>1</div>
        <div className={styles.stepContent}>
          <h5>Informations Générales</h5>
          <p>Saisie des données essentielles : marque, modèle, année, immatriculation, catégorie (Standard/Luxury), type (Citadine, Berline, SUV, Van) et tarification journalière.</p>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>2</div>
        <div className={styles.stepContent}>
          <h5>Caractéristiques Techniques</h5>
          <p>Enregistrement du kilométrage, type de carburant (Essence, Diesel, Hybride, Électrique), transmission (Manuelle/Automatique), nombre de places et couleur.</p>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>3</div>
        <div className={styles.stepContent}>
          <h5>Upload de Photos</h5>
          <p>Système de glisser-déposer pour ajouter jusqu'à 10 photos par véhicule (PNG, JPG jusqu'à 10MB) avec prévisualisation et redimensionnement automatique.</p>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>4</div>
        <div className={styles.stepContent}>
          <h5>Documents Légaux</h5>
          <p>Attachement des documents obligatoires : assurance, contrôle technique, carte grise avec dates d'expiration et alertes automatiques.</p>
        </div>
      </div>
    </div>

    <div className={styles.codeExample}>
      <h6><Icons.Code /> Exemple de requête API - Création Véhicule</h6>
      <pre>
{`POST /api/vehicles
{
  "brand": "Mercedes",
  "model": "Classe E",
  "year": 2023,
  "category": "luxury",
  "type": "Berline",
  "dailyRate": 1200,
  "licensePlate": "ABC-123",
  "mileage": 24500,
  "fuelType": "Diesel",
  "transmission": "Automatic",
  "seats": 5,
  "color": "Noir",
  "documents": {
    "insurance": "2024-12-31",
    "technicalControl": "2024-06-30",
    "registration": "2024-12-31"
  }
}`}
      </pre>
    </div>
  </div>
);

const EditVehicleFeature = () => (
  <div className={styles.featureExplanation}>
    <div className={styles.featureHeader}>
      <div className={styles.featureIconLarge} style={{ background: '#dcfce7', color: '#22c55e' }}>
        <Icons.Edit />
      </div>
      <div>
        <h3>Modification et Mise à Jour</h3>
        <p>Gestion du cycle de vie complet du véhicule</p>
      </div>
    </div>

    <div className={styles.updateTypes}>
      <div className={styles.updateCard}>
        <h6><Icons.Gauge /> Mise à jour Kilométrage</h6>
        <p>Suivi en temps réel du kilométrage à chaque retour de location. Calcul automatique de la prochaine révision basé sur les intervalles définis (tous les 10,000 km ou 6 mois).</p>
      </div>

      <div className={styles.updateCard}>
        <h6><Icons.DollarSign /> Ajustement Tarifaire</h6>
        <p>Modification dynamique des tarifs journaliers selon la saisonnalité, la demande et l'état du véhicule. Historique complet des changements de prix.</p>
      </div>

      <div className={styles.updateCard}>
        <h6><Icons.Activity /> Changement de Statut</h6>
        <p>Gestion des transitions de statut : Disponible → En Location → Maintenance → Disponible. Workflow validé avec vérification des prérequis (documents valides, entretien à jour).</p>
      </div>

      <div className={styles.updateCard}>
        <h6><Icons.FileText /> Renouvellement Documents</h6>
        <p>Alertes automatiques 30 jours avant expiration des documents. Upload des nouvelles versions avec conservation de l'historique pour traçabilité légale.</p>
      </div>
    </div>

    <div className={styles.workflowDiagram}>
      <h6><Icons.Layers /> Workflow de Modification</h6>
      <div className={styles.workflowSteps}>
        <div className={styles.workflowStep}>
          <span className={styles.workflowLabel}>Sélection</span>
          <small>Choix du véhicule</small>
        </div>
        <div className={styles.workflowArrow}>→</div>
        <div className={styles.workflowStep}>
          <span className={styles.workflowLabel}>Vérification</span>
          <small>Contrôle des droits</small>
        </div>
        <div className={styles.workflowArrow}>→</div>
        <div className={styles.workflowStep}>
          <span className={styles.workflowLabel}>Modification</span>
          <small>Update des champs</small>
        </div>
        <div className={styles.workflowArrow}>→</div>
        <div className={styles.workflowStep}>
          <span className={styles.workflowLabel}>Validation</span>
          <small>Check intégrité</small>
        </div>
        <div className={styles.workflowArrow}>→</div>
        <div className={styles.workflowStep}>
          <span className={styles.workflowLabel}>Audit</span>
          <small>Log des changements</small>
        </div>
      </div>
    </div>
  </div>
);

const DamageManagementFeature = () => (
  <div className={styles.featureExplanation}>
    <div className={styles.featureHeader}>
      <div className={styles.featureIconLarge} style={{ background: '#fef3c7', color: '#f59e0b' }}>
        <Icons.Alert />
      </div>
      <div>
        <h3>Gestion des Dommages</h3>
        <p>Suivi complet des incidents et réparations</p>
      </div>
    </div>

    <div className={styles.damageWorkflow}>
      <div className={styles.damagePhase}>
        <h6><Icons.Camera /> 1. Constat Initial</h6>
        <ul>
          <li>Photos du dommage (avant/après)</li>
          <li>Description détaillée de l'incident</li>
          <li>Date et lieu du constat</li>
          <li>Identification du responsable (client/interne)</li>
        </ul>
      </div>

      <div className={styles.damagePhase}>
        <h6><Icons.Tool /> 2. Évaluation</h6>
        <ul>
          <li>Estimation du coût de réparation</li>
          <li>Classification gravité (mineur/majeur/critique)</li>
          <li>Impact sur la disponibilité du véhicule</li>
          <li>Décision : réparation immédiate ou différée</li>
        </ul>
      </div>

      <div className={styles.damagePhase}>
        <h6><Icons.Wrench /> 3. Réparation</h6>
        <ul>
          <li>Choix du prestataire (interne/externe)</li>
          <li>Suivi de l'avancement des travaux</li>
          <li>Upload des factures et garanties</li>
          <li>Validation qualité post-réparation</li>
        </ul>
      </div>

      <div className={styles.damagePhase}>
        <h6><Icons.Check /> 4. Clôture</h6>
        <ul>
          <li>Mise à jour du statut "Réparé"</li>
          <li>Remise en circulation du véhicule</li>
          <li>Archivage dans l'historique</li>
          <li>Analyse statistique des coûts</li>
        </ul>
      </div>
    </div>

    <div className={styles.damageStats}>
      <div className={styles.damageStatItem}>
        <span className={styles.damageStatValue}>24</span>
        <span className={styles.damageStatLabel}>Dommages ce mois</span>
      </div>
      <div className={styles.damageStatItem}>
        <span className={styles.damageStatValue}>85%</span>
        <span className={styles.damageStatLabel}>Taux de résolution</span>
      </div>
      <div className={styles.damageStatItem}>
        <span className={styles.damageStatValue}>4,250 MAD</span>
        <span className={styles.damageStatLabel}>Coût moyen/réparation</span>
      </div>
    </div>
  </div>
);

const MaintenanceFeature = () => (
  <div className={styles.featureExplanation}>
    <div className={styles.featureHeader}>
      <div className={styles.featureIconLarge} style={{ background: '#fce7f3', color: '#ec4899' }}>
        <Icons.Wrench />
      </div>
      <div>
        <h3>Planification Maintenance</h3>
        <p>Entretiens préventifs et correctifs optimisés</p>
      </div>
    </div>

    <div className={styles.maintenanceTypes}>
      <div className={styles.maintenanceType}>
        <h6><Icons.Shield /> Maintenance Préventive</h6>
        <p>Planification automatique basée sur :</p>
        <ul>
          <li>Kilométrage parcouru (alerte tous les 10,000 km)</li>
          <li>Temps écoulé (alerte tous les 6 mois)</li>
          <li>Conditions d'utilisation (sable, montagne, ville)</li>
        </ul>
        <div className={styles.maintenanceAlert}>
          <Icons.Info /> Prochaine révision automatiquement calculée et ajoutée au calendrier
        </div>
      </div>

      <div className={styles.maintenanceType}>
        <h6><Icons.Alert /> Maintenance Corrective</h6>
        <p>Gestion des pannes imprévues :</p>
        <ul>
          <li>Signalement rapide via l'application mobile</li>
          <li>Priorisation des interventions (urgent/standard)</li>
          <li>Réservation créneaux garage partenaires</li>
          <li>Véhicule de remplacement automatiquement proposé</li>
        </ul>
      </div>
    </div>

    <div className={styles.maintenanceCalendar}>
      <h6><Icons.Calendar /> Vue Calendrier des Entretiens</h6>
      <p>Interface visuelle montrant les 30 prochains jours avec :</p>
      <div className={styles.calendarFeatures}>
        <span className={styles.calendarFeature}><Icons.Check /> Entretiens programmés</span>
        <span className={styles.calendarFeature}><Icons.Check /> Retards signalés en rouge</span>
        <span className={styles.calendarFeature}><Icons.Check /> Capacité garage restante</span>
        <span className={styles.calendarFeature}><Icons.Check /> Coûts prévisionnels</span>
      </div>
    </div>
  </div>
);

const DocumentManagementFeature = () => (
  <div className={styles.featureExplanation}>
    <div className={styles.featureHeader}>
      <div className={styles.featureIconLarge} style={{ background: '#e0e7ff', color: '#6366f1' }}>
        <Icons.FileText />
      </div>
      <div>
        <h3>Gestion Documentaire</h3>
        <p>Centralisation et conformité légale</p>
      </div>
    </div>

    <div className={styles.documentsGrid}>
      <div className={styles.documentType}>
        <div className={styles.docIconLarge}><Icons.Shield /></div>
        <h6>Assurance</h6>
        <ul>
          <li>Upload police d'assurance PDF</li>
          <li>Extraction auto dates validité (OCR)</li>
          <li>Alerte 30 jours avant expiration</li>
          <li>Historique des sinistres liés</li>
        </ul>
      </div>

      <div className={styles.documentType}>
        <div className={styles.docIconLarge}><Icons.Activity /></div>
        <h6>Contrôle Technique</h6>
        <ul>
          <li>Scan du procès-verbal</li>
          <li>Suivi des contre-visites</li>
          <li>Liste des défauts constatés</li>
          <li>Recommandations réparations</li>
        </ul>
      </div>

      <div className={styles.documentType}>
        <div className={styles.docIconLarge}><Icons.File /></div>
        <h6>Carte Grise</h6>
        <ul>
          <li>Copie certifiée conforme</li>
          <li>Suivi changements propriétaire</li>
          <li>Gestion vignettes fiscales</li>
          <li>Certificat de non-gage</li>
        </ul>
      </div>
    </div>

    <div className={styles.complianceAlert}>
      <Icons.Alert />
      <div>
        <strong>Conformité Légale</strong>
        <p>Tous les documents sont stockés de manière sécurisée avec chiffrement AES-256.
        Conservation légale de 5 ans minimum avec traçabilité complète des accès.</p>
      </div>
    </div>
  </div>
);

const ApiArchitectureFeature = () => (
  <div className={styles.featureExplanation}>
    <div className={styles.featureHeader}>
      <div className={styles.featureIconLarge} style={{ background: '#f3e8ff', color: '#a855f7' }}>
        <Icons.Server />
      </div>
      <div>
        <h3>Architecture Technique</h3>
        <p>Structure logicielle et APIs du module Véhicules</p>
      </div>
    </div>

    <div className={styles.architectureLayers}>
      <div className={styles.archLayer}>
        <h6><Icons.Globe /> Frontend Layer</h6>
        <p>Interface utilisateur React avec :</p>
        <ul>
          <li>Composants modulaires réutilisables</li>
          <li>Gestion d'état avec React Hooks (useState, useEffect, useMemo)</li>
          <li>Visualisations Recharts interactives</li>
          <li>Responsive design avec CSS Modules</li>
        </ul>
      </div>

      <div className={styles.archLayer}>
        <h6><Icons.Server /> API Layer</h6>
        <p>Endpoints RESTful principaux :</p>
        <ul>
          <li><code>GET /api/vehicles</code> - Liste avec filtres et pagination</li>
          <li><code>POST /api/vehicles</code> - Création nouveau véhicule</li>
          <li><code>PUT /api/vehicles/:id</code> - Mise à jour complète</li>
          <li><code>PATCH /api/vehicles/:id/status</code> - Changement statut rapide</li>
          <li><code>DELETE /api/vehicles/:id</code> - Suppression logique</li>
        </ul>
      </div>

      <div className={styles.archLayer}>
        <h6><Icons.Database /> Data Layer</h6>
        <p>Modèle de données relationnel :</p>
        <ul>
          <li>Table <code>vehicles</code> : informations principales</li>
          <li>Table <code>vehicle_documents</code> : documents associés</li>
          <li>Table <code>damage_reports</code> : dommages et réparations</li>
          <li>Table <code>maintenance_logs</code> : historique entretiens</li>
          <li>Relations optimisées avec indexation composite</li>
        </ul>
      </div>
    </div>

    <div className={styles.codeExample}>
      <h6><Icons.Code /> Exemple d'Intégration API</h6>
      <pre>
{`// Récupération paginée avec filtres
const fetchVehicles = async (params) => {
  const response = await api.get('/vehicles', {
    params: {
      page: 1,
      limit: 20,
      status: 'available',
      category: 'luxury',
      search: 'Mercedes'
    }
  });
  return response.data;
};

// Mise à jour statut avec vérification préalable
const updateVehicleStatus = async (id, newStatus) => {
  // Vérification documents valides
  const vehicle = await api.get(\`/vehicles/\${id}\`);
  if (!isDocumentsValid(vehicle.documents)) {
    throw new Error('Documents expirés');
  }

  // Update avec log d'audit
  return await api.patch(\`/vehicles/\${id}/status\`, {
    status: newStatus,
    timestamp: new Date().toISOString(),
    userId: currentUser.id
  });
};`}
      </pre>
    </div>
  </div>
);

export default function VehiclesClient() {
  const [vehicles, setVehicles] = useState(VEHICLES_LIST);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeFeature, setActiveFeature] = useState('add');
  const [openFaq, setOpenFaq] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Gestion du montage pour éviter les erreurs d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch =
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || vehicle.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [vehicles, searchQuery, filterStatus, filterCategory]);

  const handleDeleteVehicle = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const renderFeatureContent = () => {
    switch(activeFeature) {
      case 'add': return <AddVehicleFeature />;
      case 'edit': return <EditVehicleFeature />;
      case 'damage': return <DamageManagementFeature />;
      case 'maintenance': return <MaintenanceFeature />;
      case 'documents': return <DocumentManagementFeature />;
      case 'api': return <ApiArchitectureFeature />;
      default: return <AddVehicleFeature />;
    }
  };

  // ✅ Placeholder pendant le chargement pour éviter le layout shift
  if (!isMounted) {
    return (
      <div className={styles.vehiclesPage} style={{ minHeight: '100vh' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: '#f8fafc'
        }}>
          <div>Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.vehiclesPage} suppressHydrationWarning>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.containerContent}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>
                <Icons.Car /> Gestion de Flotte
              </span>
              <h1>Gérez Votre Parc Automobile</h1>
              <p className={styles.heroSubtitle}>
                Système complet de gestion de flotte permettant l'ajout, la modification,
                le suivi des entretiens, la gestion des disponibilités et l'historique
                complet des locations. Chaque véhicule dispose d'une fiche détaillée
                avec photos, caractéristiques techniques et documents associés.
              </p>
              <div className={styles.heroCta}>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  <Icons.Download /> Exporter l'Inventaire
                </button>
                <button className={`${styles.btn} ${styles.btnOutline}`}>
                  <Icons.Activity /> Voir les Statistiques
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className={styles.statsSection}>
        <div className={styles.containerContent}>
          <div className={styles.statsGrid}>
            <StatCard
              icon={Icons.Car}
              label="Total Véhicules"
              value={VEHICLE_STATS.total}
              subtext="Dans la flotte active"
              color="#36c275"
              trend={12.5}
            />
            <StatCard
              icon={Icons.Check}
              label="Disponibles"
              value={VEHICLE_STATS.available}
              subtext="Prêts à louer"
              color="#22c55e"
              trend={5.2}
            />
            <StatCard
              icon={Icons.Clock}
              label="En Location"
              value={VEHICLE_STATS.rented}
              subtext="Actuellement en circulation"
              color="#3b82f6"
              trend={8.1}
            />
            <StatCard
              icon={Icons.Wrench}
              label="Maintenance"
              value={VEHICLE_STATS.maintenance}
              subtext="En réparation ou révision"
              color="#f59e0b"
              trend={-2.3}
            />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className={`${styles.moduleSection} ${styles.bgLight}`}>
        <div className={styles.containerContent}>
          <div className={styles.sectionHeader}>
            <h2><Icons.BarChart /> Analyse de la Flotte</h2>
            <p>
              Visualisez la répartition de vos véhicules par catégorie,
              suivez l'évolution de votre parc et analysez les coûts de maintenance
              pour optimiser vos investissements.
            </p>
          </div>

          <div className={styles.analyticsGrid}>
            <CategoryDistribution />
            <FleetEvolutionChart />
            <MaintenanceChart />

            <div className={styles.insightCard}>
              <h5><Icons.Zap /> Insights Clés</h5>
              <ul className={styles.insightList}>
                <li>
                  <span className={styles.insightValue}>+24%</span>
                  <span className={styles.insightLabel}>Croissance du parc sur 12 mois</span>
                </li>
                <li>
                  <span className={styles.insightValue}>94.2%</span>
                  <span className={styles.insightLabel}>Taux de disponibilité moyen</span>
                </li>
                <li>
                  <span className={styles.insightValue}>12.5 jours</span>
                  <span className={styles.insightLabel}>Durée moyenne de location</span>
                </li>
                <li>
                  <span className={styles.insightValue}>8,450 MAD</span>
                  <span className={styles.insightLabel}>Coût moyen de maintenance/véhicule</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle List Section */}
      <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
        <div className={styles.containerContent}>
          <div className={styles.listHeader}>
            <div className={styles.listTitle}>
              <h2><Icons.List /> Liste des Véhicules</h2>
              <span className={styles.countBadge}>{filteredVehicles.length} véhicules affichés</span>
            </div>

            <div className={styles.listControls}>
              <div className={styles.searchBox}>
                <Icons.Search />
                <input
                  type="text"
                  placeholder="Rechercher par marque, modèle ou immatriculation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className={styles.filterGroup}>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="available">Disponible</option>
                  <option value="rented">En Location</option>
                  <option value="maintenance">Maintenance</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="regular">Standard</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Icons.Grid />
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <Icons.List />
                </button>
              </div>
            </div>
          </div>

          <div className={`${styles.vehiclesContainer} ${styles[viewMode]}`}>
            {filteredVehicles.length === 0 ? (
              <div className={styles.emptyState}>
                <Icons.Car />
                <h3>Aucun véhicule trouvé</h3>
                <p>Modifiez vos critères de recherche pour voir plus de résultats.</p>
              </div>
            ) : (
              filteredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onEdit={() => {}}
                  onView={() => {}}
                  onDelete={handleDeleteVehicle}
                />
              ))
            )}
          </div>

          <div className={styles.pagination}>
            <button className={styles.pageBtn} disabled>
              <Icons.ChevronDown style={{ transform: 'rotate(90deg)' }} /> Précédent
            </button>
            <div className={styles.pageNumbers}>
              <button className={`${styles.pageNumber} ${styles.active}`}>1</button>
              <button className={styles.pageNumber}>2</button>
              <button className={styles.pageNumber}>3</button>
              <span>...</span>
              <button className={styles.pageNumber}>8</button>
            </div>
            <button className={styles.pageBtn}>
              Suivant <Icons.ChevronDown style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Explorer Section */}
      <section className={`${styles.moduleSection} ${styles.bgLight}`}>
        <div className={styles.containerContent}>
          <div className={styles.sectionHeader}>
            <h2><Icons.Settings /> Fonctionnalités du Système</h2>
            <p>
              Explorez les capacités complètes du module de gestion des véhicules,
              de l'ajout initial au suivi avancé des opérations.
            </p>
          </div>

          <div className={styles.featureExplorer}>
            <div className={styles.featureNav}>
              <button
                className={`${styles.featureNavBtn} ${activeFeature === 'add' ? styles.active : ''}`}
                onClick={() => setActiveFeature('add')}
              >
                <Icons.Plus /> Ajout Véhicule
              </button>
              <button
                className={`${styles.featureNavBtn} ${activeFeature === 'edit' ? styles.active : ''}`}
                onClick={() => setActiveFeature('edit')}
              >
                <Icons.Edit /> Modification
              </button>
              <button
                className={`${styles.featureNavBtn} ${activeFeature === 'damage' ? styles.active : ''}`}
                onClick={() => setActiveFeature('damage')}
              >
                <Icons.Alert /> Gestion Dommages
              </button>
              <button
                className={`${styles.featureNavBtn} ${activeFeature === 'maintenance' ? styles.active : ''}`}
                onClick={() => setActiveFeature('maintenance')}
              >
                <Icons.Wrench /> Maintenance
              </button>
              <button
                className={`${styles.featureNavBtn} ${activeFeature === 'documents' ? styles.active : ''}`}
                onClick={() => setActiveFeature('documents')}
              >
                <Icons.FileText /> Documents
              </button>
              <button
                className={`${styles.featureNavBtn} ${activeFeature === 'api' ? styles.active : ''}`}
                onClick={() => setActiveFeature('api')}
              >
                <Icons.Code /> Architecture API
              </button>
            </div>

            <div className={styles.featureContent}>
              {renderFeatureContent()}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
        <div className={styles.containerContent}>
          <div className={styles.sectionHeader}>
            <h2><MessageCircleQuestion size={28} color="#36c275"/> Questions Fréquentes</h2>
            <p>Tout savoir sur la gestion de votre flotte automobile au Maroc</p>
          </div>

          <div className="faqContainer" style={{maxWidth: '800px', margin: '0 auto'}}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faqItem ${openFaq === index ? 'active' : ''}`}
                style={{
                  marginBottom: '16px',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: openFaq === index ? '#f8fafc' : 'white',
                  transition: 'all 0.3s'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: openFaq === index ? '#36c275' : '#1e293b'
                  }}
                >
                  {faq.question}
                  <ChevronDown
                    size={20}
                    style={{
                      transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s',
                      color: openFaq === index ? '#36c275' : '#64748b'
                    }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: openFaq === index ? '500px' : '0',
                    opacity: openFaq === index ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    padding: openFaq === index ? '0 20px 20px 20px' : '0 20px',
                    color: '#64748b',
                    lineHeight: '1.6'
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.containerContent}>
          <div className={styles.ctaBox}>
            <h2>Optimisez la Gestion de Votre Flotte</h2>
            <p>
              Gérez efficacement vos 156 véhicules avec notre solution complète
              de suivi, maintenance et analyse des performances. Intégration API
              disponible pour connecter vos systèmes existants.
            </p>
            <div className={styles.ctaStats}>
              <span><Icons.Check /> Ajout en 2 minutes</span>
              <span>•</span>
              <span><Icons.Shield /> Documents sécurisés</span>
              <span>•</span>
              <span><Icons.Activity /> Suivi temps réel</span>
              <span>•</span>
              <span><Icons.Database /> Backup automatique</span>
            </div>
            <button className={`${styles.btn} ${styles.btnWhite}`}>
              <Icons.Download /> Télécharger la Documentation API
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}