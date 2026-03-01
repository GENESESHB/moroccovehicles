'use client';

import React, { useState } from 'react';
import {
  Wrench,
  Toolbox,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Download,
  Eye,
  Edit3,
  Trash2,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Bell,
  Users,
  FileText,
  Camera,
  ArrowUpRight,
  ArrowDownRight,
  Car,
  Gauge,
  Droplet,
  Battery,
  Brush,
  Shield,
  Gem,
  Sparkles
} from 'lucide-react';
import { stats, maintenanceTasks, features } from './constants';
import './maintenance.css';

export default function MaintenanceClient() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeFeature, setActiveFeature] = useState('planification');

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'planifié': return '#3b82f6';
      case 'en_cours': return '#f59e0b';
      case 'terminé': return '#36c275';
      default: return '#64748b';
    }
  };

  const getStatusLabel = (statut) => {
    switch (statut) {
      case 'planifié': return 'Planifié';
      case 'en_cours': return 'En cours';
      case 'terminé': return 'Terminé';
      default: return statut;
    }
  };

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'planification':
        return (
          <div className="featureExplanation">
            <div className="featureHeader">
              <div className="featureIconLarge" style={{ background: '#dbeafe', color: '#3b82f6' }}>
                <Calendar size={32} />
              </div>
              <div>
                <h3>Planification intelligente</h3>
                <p>Organisez les interventions sans chevauchement</p>
              </div>
            </div>
            <div className="featureSteps">
              <div className="step">
                <div className="stepNumber">1</div>
                <div className="stepContent">
                  <h5>Calendrier interactif</h5>
                  <p>Visualisez toutes les opérations par jour, semaine ou mois. Glissez-déposez pour ajuster.</p>
                </div>
              </div>
              <div className="step">
                <div className="stepNumber">2</div>
                <div className="stepContent">
                  <h5>Disponibilité des véhicules</h5>
                  <p>Le système vérifie automatiquement si le véhicule est libre avant de planifier.</p>
                </div>
              </div>
              <div className="step">
                <div className="stepNumber">3</div>
                <div className="stepContent">
                  <h5>Récurrences</h5>
                  <p>Définissez des intervalles (ex : vidange tous les 10 000 km) pour générer automatiquement les prochaines tâches.</p>
                </div>
              </div>
            </div>
            <div className="updateTypes">
              <div className="updateCard">
                <h6><Wrench size={16} color="#3b82f6" /> Types d'intervention</h6>
                <p>Vidange, freins, pneus, batterie, carrosserie, climatisation, etc.</p>
              </div>
              <div className="updateCard">
                <h6><Zap size={16} color="#36c275" /> Ateliers partenaires</h6>
                <p>Gérez vos garages agréés et leurs disponibilités.</p>
              </div>
            </div>
          </div>
        );
      case 'rappels':
        return (
          <div className="featureExplanation">
            <div className="featureHeader">
              <div className="featureIconLarge" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                <Bell size={32} />
              </div>
              <div>
                <h3>Rappels automatiques</h3>
                <p>Ne manquez plus jamais un entretien</p>
              </div>
            </div>
            <div className="maintenanceCalendar">
              <h6><Activity size={16} /> Notifications programmées</h6>
              <div className="calendarFeatures">
                <span className="calendarFeature"><CheckCircle size={14} /> 7 jours avant</span>
                <span className="calendarFeature"><CheckCircle size={14} /> 3 jours avant</span>
                <span className="calendarFeature"><CheckCircle size={14} /> La veille</span>
                <span className="calendarFeature"><CheckCircle size={14} /> Le jour J</span>
              </div>
              <p style={{ marginTop: '24px' }}>Rappels par email, SMS et dans l'application. Possibilité d'envoyer une notification au client si nécessaire.</p>
            </div>
          </div>
        );
      case 'historique':
        return (
          <div className="featureExplanation">
            <div className="featureHeader">
              <div className="featureIconLarge" style={{ background: '#f3f4f6', color: '#374151' }}>
                <FileText size={32} />
              </div>
              <div>
                <h3>Historique complet</h3>
                <p>Carnet d'entretien numérique pour chaque véhicule</p>
              </div>
            </div>
            <div className="insightCard">
              <h5>Informations tracées</h5>
              <ul className="insightList">
                <li><span className="insightValue">Date</span><span className="insightLabel">Intervention</span></li>
                <li><span className="insightValue">Type</span><span className="insightLabel">Préventif / Curatif</span></li>
                <li><span className="insightValue">Kilométrage</span><span className="insightLabel">Au moment de l'intervention</span></li>
                <li><span className="insightValue">Coût</span><span className="insightLabel">Main-d'œuvre + pièces</span></li>
                <li><span className="insightValue">Garage</span><span className="insightLabel">Prestataire</span></li>
              </ul>
            </div>
          </div>
        );
      case 'cout':
        return (
          <div className="featureExplanation">
            <div className="featureHeader">
              <div className="featureIconLarge" style={{ background: '#dcfce7', color: '#36c275' }}>
                <DollarSign size={32} />
              </div>
              <div>
                <h3>Suivi des coûts</h3>
                <p>Maîtrisez votre budget maintenance</p>
              </div>
            </div>
            <div className="damageStats">
              <div className="damageStatItem">
                <span className="damageStatValue">45k</span>
                <span className="damageStatLabel">Budget mensuel</span>
              </div>
              <div className="damageStatItem">
                <span className="damageStatValue">32k</span>
                <span className="damageStatLabel">Dépensé ce mois</span>
              </div>
              <div className="damageStatItem">
                <span className="damageStatValue">13k</span>
                <span className="damageStatLabel">Restant</span>
              </div>
            </div>
          </div>
        );
      case 'preventif':
        return (
          <div className="featureExplanation">
            <div className="featureHeader">
              <div className="featureIconLarge" style={{ background: '#e0e7ff', color: '#6366f1' }}>
                <Gauge size={32} />
              </div>
              <div>
                <h3>Préventif vs Curatif</h3>
                <p>Équilibrez votre programme pour réduire les pannes</p>
              </div>
            </div>
            <div className="workflowDiagram">
              <h6>Répartition actuelle</h6>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '20px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: '#36c275' }} />
                </div>
                <span style={{ fontSize: '14px' }}>82% préventif</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
                <div style={{ flex: 1, height: '20px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: '18%', height: '100%', background: '#f59e0b' }} />
                </div>
                <span style={{ fontSize: '14px' }}>18% curatif</span>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="featureExplanation">
            <div className="featureHeader">
              <div className="featureIconLarge" style={{ background: '#fce7f3', color: '#db2777' }}>
                <Camera size={32} />
              </div>
              <div>
                <h3>Photos et factures</h3>
                <p>Tous les justificatifs attachés aux interventions</p>
              </div>
            </div>
            <div className="complianceAlert">
              <Camera size={24} />
              <div>
                <strong>Archives centralisées</strong>
                <p>Photos des réparations, factures scannées, bons d'intervention. Accessible depuis la fiche véhicule.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="vehiclesPage">
        {/* Hero Section */}
        <section className="heroSection">
          <div className="heroOverlay">
            <div className="containerContent">
              <div className="heroContent">
                <div className="badge">
                  <Wrench size={14} />
                  Gestion de la maintenance
                </div>
                <h1>Gardez votre flotte en parfait état</h1>
                <p className="heroSubtitle">
                  Planifiez et suivez les opérations d'entretien de votre flotte : révisions, contrôles techniques, réparations.
                  Recevez des rappels automatiques et conservez un historique complet pour chaque véhicule.
                </p>
                <div className="heroCta">
                  <button className="btn btnPrimary">
                    <Plus size={20} />
                    Planifier une intervention
                  </button>
                  <button className="btn btnOutline">
                    <Eye size={20} />
                    Voir le calendrier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="statsSection">
          <div className="containerContent">
            <div className="statsGrid">
              {stats.map((stat, index) => (
                <div key={index} className="statCard" style={{ borderLeftColor: stat.color }}>
                  <div className="statIcon" style={{ background: `${stat.color}20`, color: stat.color }}>
                    <stat.icon size={24} />
                  </div>
                  <div className="statInfo">
                    <span className="statLabel">{stat.label}</span>
                    <span className="statValue">{stat.value}</span>
                    <span className="statSubtext">{stat.subtext}</span>
                    <span className={`statTrend ${stat.trendUp ? 'positive' : 'negative'}`}>
                      {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {stat.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analytics Preview */}
        <section className="moduleSection bgLight">
          <div className="containerContent">
            <div className="sectionHeader">
              <h2><BarChart3 size={28} color="#36c275" /> Analyse de la maintenance</h2>
              <p>Répartition des interventions et suivi budgétaire</p>
            </div>
            <div className="analyticsGrid">
              <div className="chartCard">
                <h5><PieChart size={16} /> Types d'intervention</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#36c275" strokeWidth="3" strokeDasharray="40, 100" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-40" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="15, 100" strokeDashoffset="-65" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="10, 100" strokeDashoffset="-80" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="10, 100" strokeDashoffset="-90" />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>22</span>
                      <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Interventions</span>
                    </div>
                  </div>
                  <div className="categoryLegend" style={{ flex: 1 }}>
                    <div className="categoryItem"><div className="categoryDot" style={{ background: '#36c275' }} /><span>Vidange (40%)</span></div>
                    <div className="categoryItem"><div className="categoryDot" style={{ background: '#3b82f6' }} /><span>Freins (25%)</span></div>
                    <div className="categoryItem"><div className="categoryDot" style={{ background: '#f59e0b' }} /><span>Pneus (15%)</span></div>
                    <div className="categoryItem"><div className="categoryDot" style={{ background: '#ef4444' }} /><span>Batterie (10%)</span></div>
                    <div className="categoryItem"><div className="categoryDot" style={{ background: '#8b5cf6' }} /><span>Carrosserie (10%)</span></div>
                  </div>
                </div>
              </div>

              <div className="chartCard">
                <h5><TrendingUp size={16} /> Évolution des coûts</h5>
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '20px 0' }}>
                  {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'].map((month, i) => (
                    <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '100%',
                        height: `${[32, 28, 35, 41, 38, 45][i] * 2}%`,
                        background: 'linear-gradient(to top, #36c275, #5fd68f)',
                        borderRadius: '4px 4px 0 0',
                        minHeight: '20px'
                      }} />
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{month}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                  <span>Total 6 mois</span>
                  <span style={{ fontWeight: '800', color: '#36c275' }}>243k MAD</span>
                </div>
              </div>

              <div className="insightCard">
                <h5><Zap size={16} /> Prochaines interventions</h5>
                <ul className="insightList">
                  <li><span className="insightValue">25/06</span><span className="insightLabel">Vidange Ferrari F8</span></li>
                  <li><span className="insightValue">27/06</span><span className="insightLabel">Freins Urus</span></li>
                  <li><span className="insightValue">28/06</span><span className="insightLabel">Batterie Bentley</span></li>
                  <li><span className="insightValue">02/07</span><span className="insightLabel">Carrosserie Porsche</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Explorer */}
        <section className="moduleSection bgWhite">
          <div className="containerContent">
            <div className="sectionHeader">
              <h2><Sparkles size={28} color="#36c275" /> Fonctionnalités maintenance</h2>
              <p>Optimisez la durée de vie de votre flotte</p>
            </div>

            <div className="featureExplorer">
              <div className="featureNav">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    className={`featureNavBtn ${activeFeature === feature.id ? 'active' : ''}`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <feature.icon size={20} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '14px' }}>{feature.title}</span>
                      <span style={{ fontSize: '11px', opacity: 0.7, fontWeight: '400' }}>{feature.description.substring(0, 25)}...</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="featureContent">
                {renderFeatureContent()}
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Tasks List */}
        <section className="moduleSection bgLight">
          <div className="containerContent">
            <div className="listHeader">
              <div className="listTitle">
                <h2><Wrench size={24} /> Interventions à venir</h2>
                <span className="countBadge">22 planifiées</span>
              </div>
              <div className="listControls">
                <div className="searchBox">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher une intervention..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="filterGroup">
                  <select className="filterSelect" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">Tous les statuts</option>
                    <option value="planifié">Planifié</option>
                    <option value="en_cours">En cours</option>
                    <option value="terminé">Terminé</option>
                  </select>
                </div>
                <div className="viewToggle">
                  <button
                    className={`viewBtn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', width: '16px', height: '16px' }}>
                      <div style={{ background: 'currentColor', borderRadius: '1px' }} />
                      <div style={{ background: 'currentColor', borderRadius: '1px' }} />
                      <div style={{ background: 'currentColor', borderRadius: '1px' }} />
                      <div style={{ background: 'currentColor', borderRadius: '1px' }} />
                    </div>
                  </button>
                  <button
                    className={`viewBtn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '16px', height: '16px' }}>
                      <div style={{ background: 'currentColor', height: '3px', borderRadius: '1px' }} />
                      <div style={{ background: 'currentColor', height: '3px', borderRadius: '1px' }} />
                      <div style={{ background: 'currentColor', height: '3px', borderRadius: '1px' }} />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className={`vehiclesContainer ${viewMode}`}>
              {maintenanceTasks.map((task) => (
                <div key={task.id} className="vehicleCard">
                  <div className="vehicleImage" style={{ height: '120px', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b' }}>
                      <Wrench size={40} opacity={0.5} />
                      <div>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{task.id}</div>
                        <div style={{ fontSize: '13px' }}>{task.type}</div>
                      </div>
                    </div>
                    <div className="vehicleBadge" style={{ background: getStatusColor(task.statut) }}>
                      {getStatusLabel(task.statut)}
                    </div>
                    <div className="vehicleActions">
                      <button className="actionBtn" title="Voir"><Eye size={16} /></button>
                      <button className="actionBtn" title="Modifier"><Edit3 size={16} /></button>
                      <button className="actionBtn" title="Télécharger"><Download size={16} /></button>
                    </div>
                  </div>
                  <div className="vehicleContent">
                    <div className="vehicleHeader">
                      <div>
                        <h4>{task.vehicle}</h4>
                        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{task.plaque}</div>
                      </div>
                    </div>

                    <div className="vehicleSpecs" style={{ marginBottom: '12px', paddingBottom: '12px' }}>
                      <div className="spec">
                        <Calendar size={16} />
                        <span>{task.date}</span>
                      </div>
                      <div className="spec">
                        <DollarSign size={16} />
                        <span>{task.cout}</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
                      <Toolbox size={14} style={{ marginRight: '4px' }} />
                      {task.garage}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btnPrimary" style={{ flex: 1, padding: '8px 16px', fontSize: '13px' }}>
                        <Eye size={14} />
                        Détails
                      </button>
                      <button className="actionBtn" style={{ position: 'static', opacity: 1 }}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button className="pageBtn" disabled>
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                Précédent
              </button>
              <div className="pageNumbers">
                <button className="pageNumber active">1</button>
                <button className="pageNumber">2</button>
                <button className="pageNumber">3</button>
                <span style={{ alignSelf: 'center', color: '#64748b' }}>...</span>
                <button className="pageNumber">8</button>
              </div>
              <button className="pageBtn">
                Suivant
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="moduleSection bgWhite">
          <div className="containerContent">
            <div className="sectionHeader">
              <h2><Gem size={28} color="#36c275" /> Pourquoi optimiser votre maintenance ?</h2>
              <p>Réduisez les pannes, prolongez la durée de vie de vos véhicules</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: '#dcfce7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#36c275' }}>
                  <Calendar size={32} />
                </div>
                <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Zéro oubli</h6>
                <p>Rappels automatiques pour chaque échéance d'entretien.</p>
              </div>
              <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3b82f6' }}>
                  <FileText size={32} />
                </div>
                <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Carnet numérique</h6>
                <p>Historique complet, accessible à tout moment.</p>
              </div>
              <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: '#fef3c7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#f59e0b' }}>
                  <DollarSign size={32} />
                </div>
                <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Maîtrise des coûts</h6>
                <p>Analyse des dépenses et optimisation du budget.</p>
              </div>
              <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: '#fce7f3', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#db2777' }}>
                  <Gauge size={32} />
                </div>
                <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Préventif & Curatif</h6>
                <p>Équilibrez vos interventions pour minimiser les pannes.</p>
              </div>
              <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#6366f1' }}>
                  <Camera size={32} />
                </div>
                <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Preuves photos</h6>
                <p>Attachez des photos des réparations et factures.</p>
              </div>
              <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                <div style={{ width: '64px', height: '64px', background: '#f3f4f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#374151' }}>
                  <TrendingUp size={32} />
                </div>
                <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Valeur revente</h6>
                <p>Un historique d'entretien complet augmente la valeur de revente.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="ctaSection">
          <div className="containerContent">
            <div className="ctaBox" style={{ background: 'linear-gradient(135deg, #36c275 0%, #2a9e5c 100%)' }}>
              <h2>Prêt à simplifier votre maintenance ?</h2>
              <p>Planifiez, suivez et maîtrisez vos coûts d'entretien. Essayez gratuitement pendant 14 jours.</p>
              <div className="ctaStats">
                <span><CheckCircle size={14} /> Rappels automatiques</span>
                <span><CheckCircle size={14} /> Carnet numérique</span>
                <span><CheckCircle size={14} /> Suivi budgétaire</span>
                <span><CheckCircle size={14} /> Photos & factures</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btnWhite">
                  <Zap size={20} />
                  Démarrer l'essai
                </button>
                <button className="btn btnOutline" style={{ borderColor: 'white', color: 'white' }}>
                  <Wrench size={20} />
                  Contacter un expert
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}