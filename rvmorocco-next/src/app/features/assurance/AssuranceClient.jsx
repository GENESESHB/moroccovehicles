'use client';

import React, { useState } from 'react';
import {
    Shield, ShieldCheck, ShieldAlert, TrendingUp, CheckCircle, Clock,
    DollarSign, Search, Plus, MoreVertical, Download, Eye, Edit3,
    ChevronRight, BarChart3, PieChart, Activity, Zap, Lock, Bell,
    FileText, Receipt, ArrowUpRight, ArrowDownRight, Calendar,
    AlertCircle, AlertTriangle, Gem, ChevronDown, MessageCircleQuestion
} from 'lucide-react';
import styles from './assurance.module.css';
import { STATS, INSURANCE_CONTRACTS, FEATURES, getStatusColor, getStatusLabel } from './constants';
import { faqs } from './faqs';

export default function AssuranceClient() {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeFeature, setActiveFeature] = useState('polices');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const filteredContracts = INSURANCE_CONTRACTS.filter(c =>
        (statusFilter === 'all' || c.statut === statusFilter) &&
        (c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.plaque.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case 'polices':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#dbeafe', color: '#3b82f6' }}>
                                <FileText size={32} />
                            </div>
                            <div>
                                <h3>Gestion centralisée des polices</h3>
                                <p>Toutes vos assurances, par véhicule et par contrat, en un seul endroit</p>
                            </div>
                        </div>
                        <div className={styles.featureSteps}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>1</div>
                                <div className={styles.stepContent}>
                                    <h5>Création d'une police</h5>
                                    <p>Associez une assurance à un véhicule ou directement à un contrat de location. Saisissez les informations : type, prime, franchise, dates.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>2</div>
                                <div className={styles.stepContent}>
                                    <h5>Documents attachés</h5>
                                    <p>Téléchargez les conditions générales, l'attestation, et tout document justificatif. Accès rapide depuis la fiche.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>3</div>
                                <div className={styles.stepContent}>
                                    <h5>Historique complet</h5>
                                    <p>Consultez l'historique des modifications, des sinistres et des remboursements pour chaque police.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.updateTypes}>
                            <div className={styles.updateCard}>
                                <h6><ShieldCheck size={16} color="#3b82f6" /> Types d'assurance</h6>
                                <p>Tierce, Tous risques, Vol, Incendie, Bris de glace, etc.</p>
                            </div>
                            <div className={styles.updateCard}>
                                <h6><Zap size={16} color="#36c275" /> Intégration contrats</h6>
                                <p>Lors de la création d'un contrat, la police peut être automatiquement liée.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'sinistres':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fee2e2', color: '#ef4444' }}>
                                <ShieldAlert size={32} />
                            </div>
                            <div>
                                <h3>Suivi des sinistres</h3>
                                <p>Déclarez, gérez et suivez chaque sinistre pas à pas</p>
                            </div>
                        </div>
                        <div className={styles.workflowDiagram}>
                            <h6><Activity size={16} /> Cycle de vie d'un sinistre</h6>
                            <div className={styles.workflowSteps}>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Déclaration</span>
                                    <small>Client / agence</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Expertise</span>
                                    <small>Rendez-vous</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Indemnisation</span>
                                    <small>Calcul</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Remboursement</span>
                                    <small>Réparation</small>
                                </div>
                            </div>
                        </div>
                        <div className={styles.complianceAlert} style={{ background: '#fee2e2', borderLeftColor: '#ef4444' }}>
                            <AlertTriangle size={24} color="#ef4444" />
                            <div>
                                <strong>3 sinistres en cours</strong>
                                <p>2 en attente d'expertise, 1 en cours d'indemnisation.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'franchises':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fef3c7', color: '#f59e0b' }}>
                                <DollarSign size={32} />
                            </div>
                            <div>
                                <h3>Gestion des franchises</h3>
                                <p>Configurez et appliquez les franchises par contrat</p>
                            </div>
                        </div>
                        <div className={styles.damageStats}>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>1 500</span>
                                <span className={styles.damageStatLabel}>Franchise mini</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>5 000</span>
                                <span className={styles.damageStatLabel}>Franchise maxi</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>12</span>
                                <span className={styles.damageStatLabel}>Contrats avec option rachat</span>
                            </div>
                        </div>
                    </div>
                );
            case 'remboursements':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#dcfce7', color: '#36c275' }}>
                                <Receipt size={32} />
                            </div>
                            <div>
                                <h3>Remboursements et indemnités</h3>
                                <p>Suivi des montants perçus et des réparations</p>
                            </div>
                        </div>
                        <div className={styles.insightCard}>
                            <h5>Statistiques</h5>
                            <ul className={styles.insightList}>
                                <li><span className={styles.insightValue}>45k</span><span className={styles.insightLabel}>Indemnisé ce mois</span></li>
                                <li><span className={styles.insightValue}>8</span><span className={styles.insightLabel}>Dossiers remboursés</span></li>
                                <li><span className={styles.insightValue}>12j</span><span className={styles.insightLabel}>Délai moyen</span></li>
                            </ul>
                        </div>
                    </div>
                );
            case 'alertes':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#dbeafe', color: '#3b82f6' }}>
                                <Bell size={32} />
                            </div>
                            <div>
                                <h3>Alertes échéances</h3>
                                <p>Ne manquez jamais un renouvellement</p>
                            </div>
                        </div>
                        <div className={styles.maintenanceCalendar}>
                            <h6><Calendar size={16} /> Notifications programmées</h6>
                            <div className={styles.calendarFeatures}>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> 30 jours avant</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> 15 jours avant</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> 7 jours avant</span>
                                <span className={styles.calendarFeature}><CheckCircle size={14} /> Le jour J</span>
                            </div>
                            <p style={{ marginTop: '24px' }}>Alertes par email, SMS et dans l'application.</p>
                        </div>
                    </div>
                );
            case 'conformite':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#f3f4f6', color: '#374151' }}>
                                <Lock size={32} />
                            </div>
                            <div>
                                <h3>Conformité et archivage</h3>
                                <p>Tous vos documents légaux en sécurité</p>
                            </div>
                        </div>
                        <div className={styles.complianceAlert}>
                            <Shield size={24} />
                            <div>
                                <strong>Archivage 10 ans</strong>
                                <p>Attestations, conditions générales, avenants – horodatés et inviolables.</p>
                            </div>
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
                                <Shield size={14} />
                                Gestion des assurances
                            </div>
                            <h1>Protégez votre activité en toute simplicité</h1>
                            <p className={styles.heroSubtitle}>
                                Gérez les polices d'assurance liées à chaque véhicule et à chaque contrat.
                                Suivez les sinistres, les franchises, et les remboursements.
                                Une interface claire vous aide à rester conforme et à protéger votre activité.
                            </p>
                            <div className={styles.heroCta}>
                                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                    <Plus size={20} />
                                    Nouvelle police
                                </button>
                                <button className={`${styles.btn} ${styles.btnOutline}`}>
                                    <Eye size={20} />
                                    Voir les sinistres
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
                        <h2><BarChart3 size={28} color="#3b82f6" /> Analyse des assurances</h2>
                        <p>Répartition des types de contrat et suivi des échéances</p>
                    </div>
                    <div className={styles.analyticsGrid}>
                        <div className={styles.chartCard}>
                            <h5><PieChart size={16} /> Répartition par type</h5>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="75, 100" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#36c275" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-75" />
                                    </svg>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>156</span>
                                        <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Contrats</span>
                                    </div>
                                </div>
                                <div className={styles.categoryLegend} style={{ flex: 1 }}>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#3b82f6' }} />
                                        <span>Tous risques (75%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#36c275' }} />
                                        <span>Tierce (25%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.chartCard}>
                            <h5><Clock size={16} /> Échéances à venir</h5>
                            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '20px 0' }}>
                                {['Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'].map((month, i) => (
                                    <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${[24, 18, 12, 9, 6, 3][i] * 10}%`,
                                            background: 'linear-gradient(to top, #3b82f6, #60a5fa)',
                                            borderRadius: '4px 4px 0 0',
                                            minHeight: '20px'
                                        }} />
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>{month}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '16px', textAlign: 'center', color: '#64748b' }}>12 échéances dans les 30 prochains jours</div>
                        </div>

                        <div className={styles.insightCard}>
                            <h5><Zap size={16} /> Indicateurs clés</h5>
                            <ul className={styles.insightList}>
                                <li>
                                    <span className={styles.insightValue}>156</span>
                                    <span className={styles.insightLabel}>Contrats actifs</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>3</span>
                                    <span className={styles.insightLabel}>Sinistres ouverts</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>12</span>
                                    <span className={styles.insightLabel}>Échéances ≤30j</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>2</span>
                                    <span className={styles.insightLabel}>Échéances ≤7j</span>
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
                        <h2><Shield size={28} color="#3b82f6" /> Fonctionnalités avancées</h2>
                        <p>Maîtrisez tous les aspects de votre gestion d'assurance</p>
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

            {/* Contracts List Preview */}
            <section className={`${styles.moduleSection} ${styles.bgLight}`}>
                <div className={styles.containerContent}>
                    <div className={styles.listHeader}>
                        <div className={styles.listTitle}>
                            <h2><Shield size={24} /> Polices récentes</h2>
                            <span className={styles.countBadge}>156 actives</span>
                        </div>
                        <div className={styles.listControls}>
                            <div className={styles.searchBox}>
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Rechercher une police..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterGroup}>
                                <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">Tous les statuts</option>
                                    <option value="actif">Actif</option>
                                    <option value="echeance_proche">Échéance proche</option>
                                    <option value="echeance_imminente">Échéance imminente</option>
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
                                <div className={styles.vehicleImage} style={{ height: '120px', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b' }}>
                                        <Shield size={40} opacity={0.5} />
                                        <div>
                                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{contract.id}</div>
                                            <div style={{ fontSize: '13px' }}>{contract.type}</div>
                                        </div>
                                    </div>
                                    <div className={styles.vehicleBadge} style={{ background: getStatusColor(contract.statut) }}>
                                        {getStatusLabel(contract.statut)}
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
                                            <DollarSign size={16} />
                                            <span>Prime {contract.prime}</span>
                                        </div>
                                        <div className={styles.spec}>
                                            <AlertCircle size={16} />
                                            <span>Franchise {contract.franchise}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div className={styles.price}>
                                            <Calendar size={16} />
                                            <span style={{ fontSize: '14px', marginLeft: '4px' }}>Échéance {contract.echeance}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ flex: 1, padding: '8px 16px', fontSize: '13px' }}>
                                            <FileText size={14} />
                                            Voir détails
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
                            <button className={styles.pageNumber}>7</button>
                        </div>
                        <button className={styles.pageBtn}>
                            Suivant
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
                <div className={styles.containerContent}>
                    <div className={styles.sectionHeader}>
                        <h2><Gem size={28} color="#3b82f6" /> Pourquoi gérer vos assurances avec nous ?</h2>
                        <p>Sécurité, traçabilité et gain de temps</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3b82f6' }}>
                                <FileText size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Centralisation</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Toutes vos polices au même endroit, liées aux véhicules et contrats.
                            </p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fee2e2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
                                <ShieldAlert size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Suivi des sinistres</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Ne perdez plus une trace, chaque dossier est suivi de A à Z.
                            </p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fef3c7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#f59e0b' }}>
                                <Bell size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Alertes automatiques</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Recevez des notifications avant chaque échéance pour ne jamais être pris au dépourvu.
                            </p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dcfce7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#36c275' }}>
                                <Receipt size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Remboursements</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Suivez les montants perçus et les réparations effectuées.
                            </p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#f3f4f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#374151' }}>
                                <Lock size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Archivage légal</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Documents conservés 10 ans, horodatés et inviolables.
                            </p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#6366f1' }}>
                                <TrendingUp size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Rapports et analyses</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Visualisez vos coûts d'assurance et optimisez votre stratégie.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={`${styles.moduleSection} ${styles.bgLight}`}>
                <div className={styles.containerContent}>
                    <div className={styles.sectionHeader} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
                        <h2><MessageCircleQuestion size={28} color="#3b82f6" /> Questions Fréquentes (Assurances)</h2>
                        <p>Tout comprendre sur la couverture de vos véhicules</p>
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
                                            color: '#3b82f6',
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

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.containerContent}>
                    <div className={styles.ctaBox}>
                        <h2>Protégez votre flotte dès maintenant</h2>
                        <p>Gérez vos assurances en toute sérénité. Essayez gratuitement pendant 14 jours.</p>
                        <div className={styles.ctaStats}>
                            <span><CheckCircle size={14} /> Import de polices existantes</span>
                            <span><CheckCircle size={14} /> Alertes échéances</span>
                            <span><CheckCircle size={14} /> Gestion sinistres</span>
                            <span><CheckCircle size={14} /> Support dédié</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className={`${styles.btn} ${styles.btnWhite}`}>
                                <Zap size={20} />
                                Démarrer l'essai
                            </button>
                            <button className={`${styles.btn} ${styles.btnOutline}`} style={{ borderColor: 'white', color: 'white' }}>
                                <Shield size={20} />
                                Contacter un expert
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
