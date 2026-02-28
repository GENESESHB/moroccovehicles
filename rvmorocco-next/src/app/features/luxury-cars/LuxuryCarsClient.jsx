'use client';

import React, { useState } from 'react';
import {
    FileText, PenTool, Shield, Calendar, TrendingUp, CheckCircle, Clock, DollarSign,  Settings, User,
    Search, Filter, Plus, MoreVertical, Download, Eye, Edit3, Trash2, ChevronRight, BarChart3, PieChart,
    Activity, Zap, Lock, Smartphone, Bell, Users, FileSignature, Wallet, Camera, Receipt,
    ArrowUpRight, ArrowDownRight, Minus, Star, Gem, Award, Heart, Sparkles, MapPin, ChevronDown, MessageCircleQuestion
} from 'lucide-react';
import styles from './LuxuryVehiclesPage.module.css';
import { STATS, LUXURY_VEHICLES, FEATURES, getDisponibilityColor, getDisponibilityLabel } from './constants';
import { faqs } from './faqs';

export default function LuxuryCarsClient() {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeFeature, setActiveFeature] = useState('personalisation');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const filteredVehicles = LUXURY_VEHICLES.filter(v =>
        (statusFilter === 'all' || v.disponibilite === statusFilter) &&
        (v.marque.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.modele.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.plaque.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.type.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case 'personalisation':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fef3c7', color: '#f59e0b' }}>
                                <Sparkles size={32} />
                            </div>
                            <div>
                                <h3>Personnalisation avancée</h3>
                                <p>Offrez une expérience unique avec des options sur mesure</p>
                            </div>
                        </div>
                        <div className={styles.featureSteps}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>1</div>
                                <div className={styles.stepContent}>
                                    <h5>Choix des options esthétiques</h5>
                                    <p>Couleur extérieure (plus de 50 teintes), type de jantes, sellerie cuir ou alcantara, surpiqûres contrastées.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>2</div>
                                <div className={styles.stepContent}>
                                    <h5>Équipements spécifiques</h5>
                                    <p>Toit ouvrant, systèmes audio hi-fi, sièges massants, pack carbone, étriers de frein personnalisés.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>3</div>
                                <div className={styles.stepContent}>
                                    <h5>Validation et mise à disposition</h5>
                                    <p>Le véhicule est préparé selon vos souhaits et livré avec un contrôle qualité rigoureux.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.updateTypes}>
                            <div className={styles.updateCard}>
                                <h6><Gem size={16} color="#f59e0b" /> Finitions exclusives</h6>
                                <p>Matte, satinée, nacrée – nos partenaires carrossiers réalisent des finitions uniques.</p>
                                <ul>
                                    <li>Peinture sur-mesure</li>
                                    <li>Marquage intérieur personnalisé</li>
                                    <li>Éclairage d'ambiance configurable</li>
                                </ul>
                            </div>
                            <div className={styles.updateCard}>
                                <h6><Zap size={16} color="#36c275" /> Préparation dynamique</h6>
                                <p>Réglages châssis, mode de conduite personnalisé, optimisation moteur (dans la limite légale).</p>
                                <ul>
                                    <li>Mapping moteur spécifique</li>
                                    <li>Suspensions adaptatives</li>
                                    <li>Échappement sport</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'photos':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#dbeafe', color: '#3b82f6' }}>
                                <Camera size={32} />
                            </div>
                            <div>
                                <h3>Photos haute résolution</h3>
                                <p>Immortalisez chaque véhicule sous tous les angles</p>
                            </div>
                        </div>
                        <div className={styles.workflowDiagram}>
                            <h6><Activity size={16} /> Galerie interactive</h6>
                            <div className={styles.workflowSteps}>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>4K HDR</span>
                                    <small>Plus de 50 photos</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>360°</span>
                                    <small>Vue immersive</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Vidéos</span>
                                    <small>Présentation dynamique</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Détails</span>
                                    <small>Intérieur, moteur, coffre</small>
                                </div>
                            </div>
                        </div>
                        <div className={styles.complianceAlert}>
                            <Camera size={24} />
                            <div>
                                <strong>Visuels professionnels</strong>
                                <p>Chaque véhicule est photographié par un expert, avec retouche lumière naturelle et mise en scène luxueuse.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'conditions':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#f3f4f6', color: '#374151' }}>
                                <FileText size={32} />
                            </div>
                            <div>
                                <h3>Conditions particulières</h3>
                                <p>Contrats flexibles et adaptés à une clientèle exigeante</p>
                            </div>
                        </div>
                        <div className={styles.damageStats}>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>100%</span>
                                <span className={styles.damageStatLabel}>Assurance tous risques incluse</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>0</span>
                                <span className={styles.damageStatLabel}>Franchise en option</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>24/7</span>
                                <span className={styles.damageStatLabel}>Assistance premium</span>
                            </div>
                        </div>
                        <div style={{ marginTop: '24px', background: '#f9fafb', padding: '20px', borderRadius: '12px' }}>
                            <h5 style={{ marginBottom: '16px' }}>Exemples de clauses spécifiques</h5>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="#36c275" /> Kilométrage illimité pour certains modèles</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="#36c275" /> Conducteur additionnel sans frais</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="#36c275" /> Caution réduite pour membres VIP</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="#36c275" /> Livraison et récupération à l'aéroport</li>
                            </ul>
                        </div>
                    </div>
                );
            case 'conciergerie':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fce7f3', color: '#db2777' }}>
                                <Heart size={32} />
                            </div>
                            <div>
                                <h3>Service Conciergerie</h3>
                                <p>Une expérience de location sans aucun stress</p>
                            </div>
                        </div>
                        <div className={styles.damageWorkflow}>
                            <div className={styles.damagePhase}>
                                <h6><MapPin size={16} color="#36c275" /> Livraison</h6>
                                <ul>
                                    <li>À domicile, à l'hôtel ou à l'aéroport</li>
                                    <li>Présentation du véhicule par un expert</li>
                                    <li>Remise des clés et démonstration des équipements</li>
                                </ul>
                            </div>
                            <div className={styles.damagePhase}>
                                <h6><Star size={16} color="#f59e0b" /> Pendant la location</h6>
                                <ul>
                                    <li>Assistance routière prioritaire</li>
                                    <li>Service de remplacement en cas d'incident</li>
                                    <li>Itinéraires conseillés par notre équipe</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'assurance':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#e0e7ff', color: '#6366f1' }}>
                                <Shield size={32} />
                            </div>
                            <div>
                                <h3>Assurance Premium</h3>
                                <p>Une couverture digne des plus beaux véhicules</p>
                            </div>
                        </div>
                        <div className={styles.maintenanceCalendar}>
                            <h6><Shield size={16} /> Garanties incluses</h6>
                            <div className={styles.calendarFeatures}>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Dommages tous accidents</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Vol et incendie</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Bris de glace</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Protection juridique</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Assistance 0 km</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Véhicule de remplacement</span>
                            </div>
                            <p style={{ marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
                                Option rachat total de franchise disponible (supprime toute participation en cas de sinistre).
                            </p>
                        </div>
                    </div>
                );
            case 'historique':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#f3f4f6', color: '#374151' }}>
                                <Activity size={32} />
                            </div>
                            <div>
                                <h3>Historique complet</h3>
                                <p>Transparence totale sur l'entretien et la vie du véhicule</p>
                            </div>
                        </div>
                        <div className={styles.insightCard} style={{ marginBottom: '24px' }}>
                            <h5><Lock size={16} /> Données disponibles</h5>
                            <ul className={styles.insightList}>
                                <li>
                                    <span className={styles.insightValue}>Carnet</span>
                                    <span className={styles.insightLabel}>Entretien constructeur à jour</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>Km</span>
                                    <span className={styles.insightLabel}>Kilométrage réel certifié</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>Accidents</span>
                                    <span className={styles.insightLabel}>Aucun sinistre majeur</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>Proprios</span>
                                    <span className={styles.insightLabel}>Historique des propriétaires</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.vehiclesPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroOverlay}>
                    <div className={styles.containerContent}>
                        <div className={styles.heroContent}>
                            <div className={styles.badge}>
                                <Gem size={14} />
                                Collection Prestige
                            </div>
                            <h1>Conduisez l'excellence</h1>
                            <p className={styles.heroSubtitle}>
                                Une sélection unique de voitures de prestige : Ferrari, Lamborghini, Rolls-Royce, Bentley, Porsche…
                                Chaque véhicule bénéficie d'une gestion sur-mesure, d'options de personnalisation avancées,
                                de photos haute résolution et de conditions de location exclusives.
                            </p>
                            <div className={styles.heroCta}>
                                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                    <Plus size={20} />
                                    Explorer la collection
                                </button>
                                <button className={`${styles.btn} ${styles.btnOutline}`}>
                                    <Eye size={20} />
                                    Demander un devis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.containerContent}>
                    <div className={styles.statsGrid}>
                        {STATS.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className={styles.statCard} style={{ borderLeftColor: stat.color }}>
                                    <div className={styles.statIcon} style={{ background: `${stat.color}20`, color: stat.color }}>
                                        <Icon size={24} />
                                    </div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statLabel}>{stat.label}</span>
                                        <span className={styles.statValue}>{stat.value}</span>
                                        <span className={styles.statSubtext}>{stat.subtext}</span>
                                        <span className={`${styles.statTrend} ${stat.trendUp ? styles.positive : styles.negative}`}>
                                            {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {stat.trend}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Analytics Preview */}
            <section className={`${styles.moduleSection} ${styles.bgLight}`}>
                <div className={styles.containerContent}>
                    <div className={styles.sectionHeader}>
                        <h2><BarChart3 size={28} color="#f59e0b" /> Performance du segment Prestige</h2>
                        <p>Analyse de la demande et des revenus générés par notre flotte haut de gamme</p>
                    </div>
                    <div className={styles.analyticsGrid}>
                        <div className={styles.chartCard}>
                            <h5><TrendingUp size={16} /> Évolution des réservations</h5>
                            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '20px 0' }}>
                                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'].map((month, i) => (
                                    <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${[38, 45, 52, 48, 63, 70][i]}%`,
                                            background: 'linear-gradient(to top, #f59e0b, #fbbf24)',
                                            borderRadius: '4px 4px 0 0',
                                            minHeight: '20px'
                                        }} />
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>{month}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '14px', color: '#64748b' }}>Total H1 2024</span>
                                <span style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>850k MAD</span>
                            </div>
                        </div>

                        <div className={styles.chartCard}>
                            <h5><PieChart size={16} /> Répartition par marque</h5>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="45, 100" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-45" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="15, 100" strokeDashoffset="-70" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="10, 100" strokeDashoffset="-85" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5, 100" strokeDashoffset="-95" />
                                    </svg>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{LUXURY_VEHICLES.length}</span>
                                        <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Véhicules</span>
                                    </div>
                                </div>
                                <div className={styles.categoryLegend} style={{ flex: 1 }}>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#f59e0b' }} />
                                        <span>Ferrari (45%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#3b82f6' }} />
                                        <span>Lamborghini (25%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#ef4444' }} />
                                        <span>Rolls-Royce (15%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#8b5cf6' }} />
                                        <span>Bentley (10%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#10b981' }} />
                                        <span>Porsche (5%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.insightCard}>
                            <h5><Zap size={16} /> Insights du mois</h5>
                            <ul className={styles.insightList}>
                                <li>
                                    <span className={styles.insightValue}>+43%</span>
                                    <span className={styles.insightLabel}>Demande pour les SUV de luxe</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>4,9/5</span>
                                    <span className={styles.insightLabel}>Note moyenne des véhicules</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>82%</span>
                                    <span className={styles.insightLabel}>Taux d'occupation de la flotte</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>12</span>
                                    <span className={styles.insightLabel}>Clients VIP récurrents</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Explorer */}
            <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
                <div className={styles.containerContent}>
                    <div className={styles.sectionHeader}>
                        <h2><Sparkles size={28} color="#f59e0b" /> Fonctionnalités exclusives</h2>
                        <p>Découvrez les services sur-mesure réservés à notre collection prestige</p>
                    </div>

                    <div className={styles.featureExplorer}>
                        <div className={styles.featureNav}>
                            {FEATURES.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <button
                                        key={feature.id}
                                        className={`${styles.featureNavBtn} ${activeFeature === feature.id ? styles.active : ''}`}
                                        onClick={() => setActiveFeature(feature.id)}
                                    >
                                        <Icon size={20} />
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <span style={{ fontSize: '14px' }}>{feature.title}</span>
                                            <span style={{ fontSize: '11px', opacity: 0.7, fontWeight: '400' }}>{feature.description.substring(0, 25)}...</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className={styles.featureContent}>
                            {renderFeatureContent()}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vehicles List Preview */}
            <section className={`${styles.moduleSection} ${styles.bgLight}`}>
                <div className={styles.containerContent}>
                    <div className={styles.listHeader}>
                        <div className={styles.listTitle}>
                            <h2><Star size={24} /> Nos véhicules de prestige</h2>
                            <span className={styles.countBadge}>{LUXURY_VEHICLES.length} disponibles</span>
                        </div>
                        <div className={styles.listControls}>
                            <div className={styles.searchBox}>
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Rechercher une voiture (marque, modèle...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterGroup}>
                                <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">Tous les statuts</option>
                                    <option value="disponible">Disponibles</option>
                                    <option value="reserve">Réservés</option>
                                    <option value="maintenance">En maintenance</option>
                                </select>
                            </div>
                            <div className={styles.viewToggle}>
                                <button
                                    className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
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
                                    className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
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

                    <div className={`${styles.vehiclesContainer} ${styles[viewMode]}`}>
                        {filteredVehicles.map((vehicle) => (
                            <div key={vehicle.id} className={styles.vehicleCard}>
                                <div className={styles.vehicleImage} style={{ height: '160px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ffffff80' }}>
                                        <Award size={48} />
                                        <div>
                                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>{vehicle.marque}</div>
                                            <div style={{ fontSize: '14px' }}>{vehicle.modele}</div>
                                        </div>
                                    </div>
                                    <div className={styles.vehicleBadge} style={{ background: getDisponibilityColor(vehicle.disponibilite) }}>
                                        {getDisponibilityLabel(vehicle.disponibilite)}
                                    </div>
                                    <div className={styles.vehicleActions}>
                                        <button className={styles.actionBtn} title="Voir"><Eye size={16} /></button>
                                        <button className={styles.actionBtn} title="Modifier"><Edit3 size={16} /></button>
                                        <button className={styles.actionBtn} title="Télécharger la fiche"><Download size={16} /></button>
                                    </div>
                                </div>
                                <div className={styles.vehicleContent}>
                                    <div className={styles.vehicleHeader}>
                                        <div>
                                            <h4>{vehicle.marque} {vehicle.modele}</h4>
                                            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{vehicle.type} • {vehicle.annee}</div>
                                        </div>
                                        <span className={styles.vehiclePlate}>{vehicle.plaque}</span>
                                    </div>

                                    <div className={styles.vehicleSpecs} style={{ marginBottom: '12px', paddingBottom: '12px' }}>
                                        <div className={styles.spec}>
                                            <Zap size={16} />
                                            <span>{vehicle.puissance}</span>
                                        </div>
                                        <div className={styles.spec}>
                                            <Activity size={16} />
                                            <span>{vehicle.carburant}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div className={styles.price}>
                                            <span className={styles.priceValue} style={{ fontSize: '20px', color: '#f59e0b' }}>{vehicle.prixJour}</span>
                                            <span style={{ fontSize: '13px', color: '#64748b' }}> /jour</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ flex: 1, padding: '8px 16px', fontSize: '13px' }}>
                                            <Calendar size={14} />
                                            Réserver
                                        </button>
                                        <button className={styles.actionBtn} style={{ position: 'static', opacity: 1 }}>
                                            <Heart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.pagination}>
                        <button className={styles.pageBtn} disabled>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                            Précédent
                        </button>
                        <div className={styles.pageNumbers}>
                            <button className={`${styles.pageNumber} ${styles.active}`}>1</button>
                            <button className={styles.pageNumber}>2</button>
                            <button className={styles.pageNumber}>3</button>
                            <span style={{ alignSelf: 'center', color: '#64748b' }}>...</span>
                            <button className={styles.pageNumber}>5</button>
                        </div>
                        <button className={styles.pageBtn}>
                            Suivant
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
                <div className={styles.containerContent}>
                    <div className={styles.sectionHeader} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
                        <h2><MessageCircleQuestion size={28} color="#f59e0b" /> Questions Fréquentes (Voitures de Luxe)</h2>
                        <p>Informations sur nos services VIP et conditions de réservation</p>
                    </div>

                    <div className={styles.faqContainer} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`${styles.faqItem} ${openFaq === index ? styles.active : ''}`}
                                style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => toggleFaq(index)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '24px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#1e293b',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span style={{ paddingRight: '24px' }}>{faq.question}</span>
                                    <ChevronDown
                                        size={20}
                                        style={{
                                            color: '#f59e0b',
                                            transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                                            transition: 'transform 0.3s ease',
                                            flexShrink: 0
                                        }}
                                    />
                                </button>
                                <div
                                    className={styles.faqAnswer}
                                    style={{
                                        height: openFaq === index ? 'auto' : '0',
                                        opacity: openFaq === index ? 1 : 0,
                                        padding: openFaq === index ? '0 24px 24px' : '0 24px',
                                        color: '#64748b',
                                        lineHeight: '1.6',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <p style={{ margin: 0 }}>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={`${styles.moduleSection} ${styles.bgLight}`}>
                <div className={styles.containerContent}>
                    <div className={styles.sectionHeader}>
                        <h2><Gem size={28} color="#f59e0b" /> Pourquoi choisir notre collection prestige ?</h2>
                        <p>Les avantages réservés aux amateurs de belles mécaniques</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fef3c7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#f59e0b' }}>
                                <Clock size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Disponibilité immédiate</h6>
                            <p>Oubliez les listes d'attente interminables. Conduisez le modèle de vos rêves dès demain.</p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3b82f6' }}>
                                <Settings size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Entretien rigoureux</h6>
                            <p>Maintenance stricte selon le cahier des charges constructeur. Véhicules dans un état clinique.</p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fce7f3', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#db2777' }}>
                                <User size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Accompagnement dédié</h6>
                            <p>Un conseiller unique à votre écoute pour organiser votre expérience sur mesure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.containerContent}>
                    <div className={styles.ctaBox}>
                        <h2>Prêt à vivre l'expérience ultime ?</h2>
                        <p>Contactez notre service conciergerie pour organiser la livraison de votre véhicule de prestige.</p>
                        <div className={styles.ctaStats}>
                            <span><CheckCircle size={14} /> Discrétion assurée</span>
                            <span><CheckCircle size={14} /> Service VIP 24/7</span>
                            <span><CheckCircle size={14} /> Livraison sur-mesure</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px' }}>
                            <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ background: '#fff', color: '#1e293b' }}>
                                <Filter size={20} />
                                Voir le catalogue complet
                            </button>
                            <button className={`${styles.btn} ${styles.btnOutline}`} style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                                <Bell size={20} />
                                Gérer mes alertes (VIP)
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
