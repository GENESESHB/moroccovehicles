'use client';

import React, { useState } from 'react';
import {
    FileText, Calendar, TrendingUp, CheckCircle, Clock, DollarSign, Search, Plus, MoreVertical, Download, Eye, Edit3, ChevronRight, BarChart3, PieChart, Activity, Zap, Lock, Users, Camera, ArrowUpRight, ArrowDownRight, Star, Gem, Award, Heart, Sparkles, MapPin, ShieldCheck, FileCheck, Headphones, Database, Crown, FileSignature, ChevronDown, MessageCircleQuestion
} from 'lucide-react';
import styles from './LuxuryContractsPage.module.css';
import { STATS, LUXURY_CONTRACTS, FEATURES, getStatusColor, getStatusLabel } from './constants';
import { faqs } from './faqs';

export default function LuxuryContractsClient() {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeFeature, setActiveFeature] = useState('clauses');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const filteredContracts = LUXURY_CONTRACTS.filter(c =>
        (statusFilter === 'all' || c.status === statusFilter) &&
        (c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case 'clauses':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fef3c7', color: '#f59e0b' }}>
                                <FileCheck size={32} />
                            </div>
                            <div>
                                <h3>Clauses spécifiques</h3>
                                <p>Des contrats taillés sur mesure pour chaque véhicule de prestige</p>
                            </div>
                        </div>
                        <div className={styles.featureSteps}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>1</div>
                                <div className={styles.stepContent}>
                                    <h5>Clauses de kilométrage</h5>
                                    <p>Forfaits kilométriques adaptés (ex: 500 km/jour pour une Ferrari, illimité pour une Rolls). Pénalités de dépassement personnalisées.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>2</div>
                                <div className={styles.stepContent}>
                                    <h5>Conditions d'usage</h5>
                                    <p>Interdiction de piste, événements spéciaux autorisés sur demande, conduite accompagnée possible.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>3</div>
                                <div className={styles.stepContent}>
                                    <h5>Clauses de confidentialité</h5>
                                    <p>Protection des données client, non-divulgation des conditions contractuelles, respect de l'image de marque.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.updateTypes}>
                            <div className={styles.updateCard}>
                                <h6><Gem size={16} color="#f59e0b" /> Exemples de clauses exclusives</h6>
                                <ul>
                                    <li>Mise à disposition d'un chauffeur privé</li>
                                    <li>Accès aux salons VIP des aéroports</li>
                                    <li>Assurance annulation sans frais</li>
                                    <li>Option de prolongation prioritaire</li>
                                </ul>
                            </div>
                            <div className={styles.updateCard}>
                                <h6><Zap size={16} color="#36c275" /> Adaptées à chaque véhicule</h6>
                                <ul>
                                    <li>Limitation de vitesse spécifique (ex: Allemagne)</li>
                                    <li>Transport du véhicule par convoi exceptionnel</li>
                                    <li>Clauses pour tournages ou shootings</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'assurances':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#dbeafe', color: '#3b82f6' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h3>Assurances renforcées</h3>
                                <p>Une protection digne des plus beaux véhicules</p>
                            </div>
                        </div>
                        <div className={styles.damageStats}>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>100%</span>
                                <span className={styles.damageStatLabel}>Tous risques</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>0</span>
                                <span className={styles.damageStatLabel}>Franchise possible</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>24/7</span>
                                <span className={styles.damageStatLabel}>Assistance premium</span>
                            </div>
                        </div>
                        <div className={styles.workflowDiagram}>
                            <h6><Activity size={16} /> Couvertures incluses</h6>
                            <div className={styles.calendarFeatures}>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Dommages accidentels</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Vol et incendie</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Bris de glace</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Catastrophes naturelles</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Protection juridique</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Défense pénale</span>
                            </div>
                        </div>
                        <div className={styles.complianceAlert}>
                            <ShieldCheck size={24} />
                            <div>
                                <strong>Option rachat de franchise</strong>
                                <p>Pour 15% du montant de la location, vous réduisez votre franchise à zéro en cas de sinistre.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'conciergerie':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fce7f3', color: '#db2777' }}>
                                <Headphones size={32} />
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
            case 'securite':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#e0e7ff', color: '#6366f1' }}>
                                <Lock size={32} />
                            </div>
                            <div>
                                <h3>Documents sécurisés</h3>
                                <p>Signature électronique et archivage inviolable</p>
                            </div>
                        </div>
                        <div className={styles.maintenanceCalendar}>
                            <h6><Lock size={16} /> Sécurité renforcée</h6>
                            <div className={styles.calendarFeatures}>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Signature certifiée</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Horodatage blockchain</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Double authentification</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Archivage 10 ans</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Accès restreint</span>
                            </div>
                        </div>
                    </div>
                );
            case 'dashboard':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#f3f4f6', color: '#374151' }}>
                                <Database size={32} />
                            </div>
                            <div>
                                <h3>Tableau de bord exclusif</h3>
                                <p>Un espace client VIP pour tout gérer</p>
                            </div>
                        </div>
                        <div className={styles.insightCard} style={{ marginBottom: '24px' }}>
                            <h5><Activity size={16} /> Fonctionnalités du portail</h5>
                            <ul className={styles.insightList}>
                                <li>
                                    <span className={styles.insightValue}>Contrats</span>
                                    <span className={styles.insightLabel}>Téléchargement, renouvellement en 1 clic</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>Factures</span>
                                    <span className={styles.insightLabel}>Historique complet, reçus, avoirs</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>Véhicules</span>
                                    <span className={styles.insightLabel}>Photos, documents, carnet d'entretien</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>Messagerie</span>
                                    <span className={styles.insightLabel}>Contact direct avec le conseiller</span>
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
                                <Crown size={14} />
                                Contrats Premium
                            </div>
                            <h1>Location de prestige, contrat à la hauteur</h1>
                            <p className={styles.heroSubtitle}>
                                Contrats haut de gamme pour les locations de véhicules de luxe.
                                Incluent des clauses spécifiques, des assurances renforcées,
                                et un service de conciergerie. Tous les documents sont sécurisés
                                et accessibles depuis un tableau de bord exclusif.
                            </p>
                            <div className={styles.heroCta}>
                                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                    <Plus size={20} />
                                    Créer un contrat luxe
                                </button>
                                <button className={`${styles.btn} ${styles.btnOutline}`}>
                                    <Eye size={20} />
                                    Voir un exemple
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
                        <h2><BarChart3 size={28} color="#f59e0b" /> Performance des contrats luxe</h2>
                        <p>Analyse des locations haut de gamme et satisfaction client</p>
                    </div>
                    <div className={styles.analyticsGrid}>
                        <div className={styles.chartCard}>
                            <h5><TrendingUp size={16} /> Évolution du nombre de contrats</h5>
                            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '20px 0' }}>
                                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'].map((month, i) => (
                                    <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${[22, 28, 35, 30, 42, 48][i]}%`,
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
                                <span style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>34 contrats</span>
                            </div>
                        </div>

                        <div className={styles.chartCard}>
                            <h5><PieChart size={16} /> Répartition par durée</h5>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="50, 100" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="30, 100" strokeDashoffset="-50" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#36c275" strokeWidth="3" strokeDasharray="20, 100" strokeDashoffset="-80" />
                                    </svg>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>34</span>
                                        <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Contrats</span>
                                    </div>
                                </div>
                                <div className={styles.categoryLegend} style={{ flex: 1 }}>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#f59e0b' }} />
                                        <span>Courte durée (50%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#3b82f6' }} />
                                        <span>Longue durée (30%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#36c275' }} />
                                        <span>Très longue durée (20%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.insightCard}>
                            <h5><Zap size={16} /> Insights satisfaction</h5>
                            <ul className={styles.insightList}>
                                <li>
                                    <span className={styles.insightValue}>98%</span>
                                    <span className={styles.insightLabel}>Clients satisfaits</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>4,9/5</span>
                                    <span className={styles.insightLabel}>Note moyenne</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>100%</span>
                                    <span className={styles.insightLabel}>Renouvellement VIP</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>24/7</span>
                                    <span className={styles.insightLabel}>Assistance disponible</span>
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
                        <p>Découvrez les services réservés à nos contrats haut de gamme</p>
                    </div>

                    <div className={styles.featureExplorer}>
                        <div className={styles.featureNav}>
                            {FEATURES.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <button
                                        key={idx}
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

            {/* Contracts List Preview */}
            <section className={`${styles.moduleSection} ${styles.bgLight}`}>
                <div className={styles.containerContent}>
                    <div className={styles.listHeader}>
                        <div className={styles.listTitle}>
                            <h2><Crown size={24} /> Contrats luxe récents</h2>
                            <span className={styles.countBadge}>{LUXURY_CONTRACTS.length} actifs</span>
                        </div>
                        <div className={styles.listControls}>
                            <div className={styles.searchBox}>
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un contrat..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterGroup}>
                                <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">Tous les statuts</option>
                                    <option value="active">Actifs</option>
                                    <option value="pending_signature">En attente signature</option>
                                    <option value="draft">Brouillons</option>
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
                        {filteredContracts.map((contract) => (
                            <div key={contract.id} className={styles.vehicleCard}>
                                <div className={styles.vehicleImage} style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b' }}>
                                        <FileText size={40} opacity={0.5} />
                                        <div>
                                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{contract.id}</div>
                                            <div style={{ fontSize: '13px' }}>{contract.type}</div>
                                        </div>
                                    </div>
                                    <div className={styles.vehicleBadge} style={{ background: getStatusColor(contract.status) }}>
                                        {getStatusLabel(contract.status)}
                                    </div>
                                    <div className={styles.vehicleActions}>
                                        <button className={styles.actionBtn} title="Voir"><Eye size={16} /></button>
                                        <button className={styles.actionBtn} title="Modifier"><Edit3 size={16} /></button>
                                        <button className={styles.actionBtn} title="Télécharger"><Download size={16} /></button>
                                    </div>
                                </div>
                                <div className={styles.vehicleContent}>
                                    <div className={styles.vehicleHeader}>
                                        <div>
                                            <h4>{contract.client}</h4>
                                            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{contract.vehicle}</div>
                                        </div>
                                        <span className={styles.vehiclePlate}>{contract.plaque}</span>
                                    </div>

                                    <div className={styles.vehicleSpecs} style={{ marginBottom: '12px', paddingBottom: '12px' }}>
                                        <div className={styles.spec}>
                                            <Calendar size={16} />
                                            <span>{contract.startDate} → {contract.endDate}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div className={styles.price}>
                                            <span className={styles.priceValue}>{contract.amount}</span>
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                                            Caution: {contract.deposit}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ flex: 1, padding: '8px 16px', fontSize: '13px' }}>
                                            <FileSignature size={14} />
                                            Gérer
                                        </button>
                                        <button className={styles.actionBtn} style={{ position: 'static', opacity: 1 }}>
                                            <MoreVertical size={16} />
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
                        <h2><MessageCircleQuestion size={28} color="#f59e0b" /> Questions Fréquentes (Contrats VIP)</h2>
                        <p>Tout savoir sur nos contrats premium et nos conditions de location</p>
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
                        <h2><Gem size={28} color="#f59e0b" /> Pourquoi choisir nos contrats luxe ?</h2>
                        <p>Les avantages exclusifs pour une expérience sans égale</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fef3c7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#f59e0b' }}>
                                <FileText size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Clauses sur-mesure</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Chaque contrat est adapté au véhicule et aux besoins spécifiques du client. Rien n'est standardisé.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3b82f6' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Assurance tous risques</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Couverture complète, franchise zéro possible, assistance 24h/7 dans le monde entier.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fce7f3', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#db2777' }}>
                                <Headphones size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Conciergerie dédiée</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Un conseiller personnel disponible par téléphone, WhatsApp ou email pour répondre à toutes vos demandes.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#6366f1' }}>
                                <Lock size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Sécurité maximale</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Documents signés électroniquement, archivage inviolable, accès restreint et traçabilité complète.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dcfce7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#36c275' }}>
                                <Database size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Tableau de bord VIP</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Accès 24/7 à tous vos documents, factures, historique et messagerie dédiée.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#f3f4f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#374151' }}>
                                <TrendingUp size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Offres exclusives</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Accès prioritaire aux nouveaux modèles, tarifs préférentiels et surclassements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.containerContent}>
                    <div className={styles.ctaBox} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                        <h2>Prêt à vivre une expérience sur mesure ?</h2>
                        <p>Créez votre premier contrat luxe et bénéficiez d'un service d'exception pour vos locations de prestige.</p>
                        <div className={styles.ctaStats}>
                            <span><CheckCircle size={14} /> Contrat personnalisé</span>
                            <span><CheckCircle size={14} /> Assistance prioritaire</span>
                            <span><CheckCircle size={14} /> Assurance renforcée</span>
                            <span><CheckCircle size={14} /> Tableau de bord VIP</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className={`${styles.btn} ${styles.btnWhite}`}>
                                <Zap size={20} />
                                Créer un contrat
                            </button>
                            <button className={`${styles.btn} ${styles.btnOutline}`} style={{ borderColor: 'white', color: 'white' }}>
                                <Users size={20} />
                                Contacter un conseiller
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
