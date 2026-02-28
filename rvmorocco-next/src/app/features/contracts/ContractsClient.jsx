'use client';

import React, { useState } from 'react';
import {
    FileText, PenTool, Shield, Calendar, TrendingUp, CheckCircle, Clock, DollarSign,
    Search, Plus, MoreVertical, Download, Eye, Edit3, ChevronRight, BarChart3, PieChart,
    Activity, Zap, Lock, Smartphone, Users, FileSignature, Wallet, Camera, Receipt,
    ArrowUpRight, ArrowDownRight, ChevronDown, MessageCircleQuestion
} from 'lucide-react';
import styles from './contracts.module.css';
import { STATS, CONTRACTS, FEATURES, getStatusColor, getStatusLabel } from './constants';
import { faqs } from './faqs';

export default function ContractsClient() {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeFeature, setActiveFeature] = useState('creation');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const filteredContracts = CONTRACTS.filter(c =>
        (statusFilter === 'all' || c.status === statusFilter) &&
        (c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case 'creation':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#dcfce7', color: '#36c275' }}>
                                <FileText size={32} />
                            </div>
                            <div>
                                <h3>Création de Contrats Simplifiée</h3>
                                <p>Générez des contrats professionnels en moins de 2 minutes</p>
                            </div>
                        </div>
                        <div className={styles.featureSteps}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>1</div>
                                <div className={styles.stepContent}>
                                    <h5>Sélection du Client et Véhicule</h5>
                                    <p>Choisissez parmi votre base clients et flotte automobile. Les informations sont pré-remplies automatiquement.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>2</div>
                                <div className={styles.stepContent}>
                                    <h5>Configuration des Conditions</h5>
                                    <p>Définissez la durée, le loyer mensuel, le kilométrage inclus et les options d'assurance.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>3</div>
                                <div className={styles.stepContent}>
                                    <h5>Génération PDF Instantanée</h5>
                                    <p>Le contrat est généré avec votre branding, clauses légales marocaines et calculs automatiques.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.updateTypes}>
                            <div className={styles.updateCard}>
                                <h6><CheckCircle size={16} color="#36c275" /> Templates Personnalisables</h6>
                                <p>Créez vos propres modèles avec variables dynamiques</p>
                                <ul>
                                    <li>Clauses spécifiques par type de client</li>
                                    <li>Conditions particulières véhicules</li>
                                    <li>Multi-langues (FR/AR)</li>
                                </ul>
                            </div>
                            <div className={styles.updateCard}>
                                <h6><Zap size={16} color="#f59e0b" /> Automatisation Avancée</h6>
                                <p>Réduisez les erreurs et gagnez du temps</p>
                                <ul>
                                    <li>Calcul auto des pénalités</li>
                                    <li>Vérification des disponibilités</li>
                                    <li>Alertes conflits de dates</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'signature':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#dbeafe', color: '#3b82f6' }}>
                                <PenTool size={32} />
                            </div>
                            <div>
                                <h3>Signature Électronique Légale</h3>
                                <p>Conforme à la loi 09-08 marocaine sur la protection des données</p>
                            </div>
                        </div>
                        <div className={styles.workflowDiagram}>
                            <h6><Activity size={16} /> Processus de Signature</h6>
                            <div className={styles.workflowSteps}>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Envoi</span>
                                    <small>Email sécurisé</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Vérification</span>
                                    <small>Code SMS</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Signature</span>
                                    <small>Électronique</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Archivage</span>
                                    <small>Timestamp légal</small>
                                </div>
                            </div>
                        </div>
                        <div className={styles.complianceAlert}>
                            <Shield size={24} />
                            <div>
                                <strong>Conformité Légale Totale</strong>
                                <p>Signatures reconnues par les tribunaux marocains, horodatage RFC 3161, conservation 10 ans minimum.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'garantie':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fef3c7', color: '#d97706' }}>
                                <Wallet size={32} />
                            </div>
                            <div>
                                <h3>Gestion des Dépôts de Garantie</h3>
                                <p>Suivi complet des cautions de la collecte au remboursement</p>
                            </div>
                        </div>
                        <div className={styles.damageStats}>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>100%</span>
                                <span className={styles.damageStatLabel}>Traçabilité</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>48h</span>
                                <span className={styles.damageStatLabel}>Remboursement moyen</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>0</span>
                                <span className={styles.damageStatLabel}>Erreurs comptables</span>
                            </div>
                        </div>
                    </div>
                );
            case 'etat':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fce7f3', color: '#db2777' }}>
                                <Camera size={32} />
                            </div>
                            <div>
                                <h3>États des Lieux Numériques</h3>
                                <p>Constats avec photos, vidéos et schémas interactifs</p>
                            </div>
                        </div>
                        <div className={styles.damageWorkflow}>
                            <div className={styles.damagePhase}>
                                <h6><CheckCircle size={16} color="#36c275" /> Départ</h6>
                                <ul>
                                    <li>Photos 360° du véhicule</li>
                                    <li>Compteur kilométrique</li>
                                    <li>Niveau carburant</li>
                                    <li>Signature client sur tablette</li>
                                </ul>
                            </div>
                            <div className={styles.damagePhase}>
                                <h6><ArrowDownRight size={16} color="#ef4444" /> Retour</h6>
                                <ul>
                                    <li>Comparaison automatique</li>
                                    <li>Détection nouvelles rayures</li>
                                    <li>Calcul surcharges km</li>
                                    <li>Génération PV de restitution</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'facturation':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#e0e7ff', color: '#6366f1' }}>
                                <Receipt size={32} />
                            </div>
                            <div>
                                <h3>Facturation Automatique</h3>
                                <p>Génération et envoi des factures sans intervention manuelle</p>
                            </div>
                        </div>
                        <div className={styles.maintenanceCalendar}>
                            <h6><Calendar size={16} /> Calendrier de Facturation</h6>
                            <p>Chaque contrat génère automatiquement :</p>
                            <div className={styles.calendarFeatures}>
                                <span className={styles.calendarFeature}><Zap size={14} /> Facture initiale</span>
                                <span className={styles.calendarFeature}><Clock size={14} /> Relances auto</span>
                                <span className={styles.calendarFeature}><Bell size={14} /> Échéances</span>
                                <span className={styles.calendarFeature}><FileText size={14} /> Quittances</span>
                            </div>
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
                                <h3>Audit Trail Complet</h3>
                                <p>Historique immuable de toutes les actions sur chaque contrat</p>
                            </div>
                        </div>
                        <div className={styles.insightCard} style={{ marginBottom: '24px' }}>
                            <h5><Lock size={16} /> Sécurité et Traçabilité</h5>
                            <ul className={styles.insightList}>
                                <li>
                                    <span className={styles.insightValue}>IP</span>
                                    <span className={styles.insightLabel}>Adresse de connexion enregistrée</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>Heure</span>
                                    <span className={styles.insightLabel}>Timestamp précis à la seconde</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>User</span>
                                    <span className={styles.insightLabel}>Identifiant unique employé</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>Hash</span>
                                    <span className={styles.insightLabel}>Empreinte numérique du document</span>
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
                                <FileText size={14} />
                                Module Contrats
                            </div>
                            <h1>Gérez vos contrats de location en quelques clics</h1>
                            <p className={styles.heroSubtitle}>
                                Créez, modifiez et suivez tous vos contrats de location. Signatures électroniques,
                                dépôts de garantie, états des lieux, et facturation automatique.
                                Un historique complet est conservé pour chaque contrat.
                            </p>
                            <div className={styles.heroCta}>
                                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                    <Plus size={20} />
                                    Créer un Contrat
                                </button>
                                <button className={`${styles.btn} ${styles.btnOutline}`}>
                                    <Eye size={20} />
                                    Voir la Démo
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
                        <h2><BarChart3 size={28} color="#36c275" /> Performance des Contrats</h2>
                        <p>Analysez vos revenus et optimisez votre flotte en temps réel</p>
                    </div>
                    <div className={styles.analyticsGrid}>
                        <div className={styles.chartCard}>
                            <h5><TrendingUp size={16} /> Évolution du Chiffre d'Affaires</h5>
                            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '20px 0' }}>
                                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'].map((month, i) => (
                                    <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${[45, 52, 48, 61, 58, 72][i]}%`,
                                            background: 'linear-gradient(to top, #36c275, #5fd68f)',
                                            borderRadius: '4px 4px 0 0',
                                            minHeight: '20px'
                                        }} />
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>{month}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '14px', color: '#64748b' }}>Total H1 2024</span>
                                <span style={{ fontSize: '18px', fontWeight: '800', color: '#36c275' }}>1.2M MAD</span>
                            </div>
                        </div>

                        <div className={styles.chartCard}>
                            <h5><PieChart size={16} /> Répartition par Type</h5>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#36c275" strokeWidth="3" strokeDasharray="65, 100" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-65" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="10, 100" strokeDashoffset="-90" />
                                    </svg>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>89</span>
                                        <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Contrats</span>
                                    </div>
                                </div>
                                <div className={styles.categoryLegend} style={{ flex: 1 }}>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#36c275' }} />
                                        <span>Longue Durée (65%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#3b82f6' }} />
                                        <span>Courte Durée (25%)</span>
                                    </div>
                                    <div className={styles.categoryItem}>
                                        <div className={styles.categoryDot} style={{ background: '#f59e0b' }} />
                                        <span>Moyenne Durée (10%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.insightCard}>
                            <h5><Zap size={16} /> Insights du Mois</h5>
                            <ul className={styles.insightList}>
                                <li>
                                    <span className={styles.insightValue}>+23%</span>
                                    <span className={styles.insightLabel}>Nouveaux contrats vs mois dernier</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>4.2j</span>
                                    <span className={styles.insightLabel}>Délai moyen de signature</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>98%</span>
                                    <span className={styles.insightLabel}>Taux de renouvellement</span>
                                </li>
                                <li>
                                    <span className={styles.insightValue}>12</span>
                                    <span className={styles.insightLabel}>Contrats en attente de signature</span>
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
                        <h2><Zap size={28} color="#36c275" /> Fonctionnalités Détaillées</h2>
                        <p>Découvrez comment notre module contrats transforme votre gestion</p>
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
                            <h2><FileText size={24} /> Aperçu des Contrats</h2>
                            <span className={styles.countBadge}>89 actifs</span>
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
                                    <option value="pending_signature">En attente</option>
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
                                <div className={styles.vehicleImage} style={{ height: '120px', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
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
                                        <span className={styles.vehiclePlate}>{contract.plate}</span>
                                    </div>

                                    <div className={styles.vehicleSpecs} style={{ marginBottom: '12px', paddingBottom: '12px' }}>
                                        <div className={styles.spec}>
                                            <Calendar size={16} />
                                            <span>{contract.startDate} → {contract.endDate}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div className={styles.price}>
                                            <span className={styles.priceValue} style={{ fontSize: '18px' }}>{contract.amount}</span>
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                                            Caution: {contract.deposit}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ flex: 1, padding: '8px 16px', fontSize: '13px' }}>
                                            <FileSignature size={14} />
                                            Signer
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
                            <button className={styles.pageNumber}>12</button>
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
                        <h2><MessageCircleQuestion size={28} color="#3b82f6" /> Questions Fréquentes (Contrats)</h2>
                        <p>Informations réglementaires et processus de location</p>
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

            {/* Benefits Section */}
            <section className={`${styles.moduleSection} ${styles.bgLight}`}>
                <div className={styles.containerContent}>
                    <div className={styles.sectionHeader}>
                        <h2><CheckCircle size={28} color="#36c275" /> Pourquoi Choisir Notre Solution ?</h2>
                        <p>Les avantages concrets pour votre agence de location</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dcfce7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#36c275' }}>
                                <Clock size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Gain de Temps Massif</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Réduisez de 80% le temps de création des contrats. Passez de 45 minutes à 5 minutes par contrat grâce à l'automatisation.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3b82f6' }}>
                                <Shield size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Sécurité Juridique</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Contrats conformes à la législation marocaine, signatures électroniques légales, et archivage sécurisé pendant 10 ans.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fef3c7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#d97706' }}>
                                <Smartphone size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>100% Mobile</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Signez et gérez vos contrats depuis n'importe où. Application responsive et signatures sur tablette sur le terrain.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fce7f3', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#db2777' }}>
                                <Users size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Expérience Client</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Processus fluide et professionnel pour vos clients. Notifications automatiques et portail client dédié.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#6366f1' }}>
                                <BarChart3 size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Analytics Avancés</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Tableaux de bord en temps réel, prévisions de revenus, et identification des opportunités de renouvellement.
                            </p>
                        </div>

                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#f3f4f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#374151' }}>
                                <Lock size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Contrôle Total</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Permissions granulaires, audit trail complet, et validation en plusieurs étapes pour les contrats sensibles.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.containerContent}>
                    <div className={styles.ctaBox}>
                        <h2>Prêt à digitaliser vos contrats ?</h2>
                        <p>Passez à la gestion électronique et libérez-vous de la paperasse. Essayez gratuitement pendant 14 jours.</p>
                        <div className={styles.ctaStats}>
                            <span><CheckCircle size={14} /> Templates inclus</span>
                            <span><CheckCircle size={14} /> Signatures illimitées</span>
                            <span><CheckCircle size={14} /> Support prioritaire</span>
                            <span><CheckCircle size={14} /> Formation d'équipe</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className={`${styles.btn} ${styles.btnWhite}`}>
                                <FileSignature size={20} />
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
