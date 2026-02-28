'use client';

import React, { useState } from 'react';
import {
    Ban, UserX, AlertTriangle, Shield, Calendar, TrendingUp, CheckCircle, Clock, DollarSign,
    Search, Filter, Plus, MoreVertical, Download, Eye, Edit3, Trash2, ChevronRight, BarChart3, PieChart,
    Activity, Zap, Lock, Bell, Users, FileText, Camera, Receipt, ArrowUpRight, ArrowDownRight, AlertCircle,
    FileWarning, History, Mail, Phone, MapPin, Gem, Sparkles, ChevronDown, MessageCircleQuestion
} from 'lucide-react';
import styles from './page.module.css';
import { STATS, BLACKLIST_ENTRIES, FEATURES, getStatusColor, getStatusLabel } from './constants';
import { faqs } from './faqs';

export default function BlacklistClient() {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeFeature, setActiveFeature] = useState('motifs');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const filteredEntries = BLACKLIST_ENTRIES.filter(e =>
        (statusFilter === 'all' || e.statut === statusFilter) &&
        (e.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.motif.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case 'motifs':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fee2e2', color: '#ef4444' }}>
                                <FileWarning size={32} />
                            </div>
                            <div>
                                <h3>Motifs d'inscription</h3>
                                <p>Classez et documentez chaque entrée avec précision</p>
                            </div>
                        </div>
                        <div className={styles.featureSteps}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>1</div>
                                <div className={styles.stepContent}>
                                    <h5>Impayés</h5>
                                    <p>Locations non réglées, chèques sans provision, dépôts de garantie non perçus.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>2</div>
                                <div className={styles.stepContent}>
                                    <h5>Litiges</h5>
                                    <p>Dégâts non couverts, retards de restitution, contentieux en cours.</p>
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>3</div>
                                <div className={styles.stepContent}>
                                    <h5>Comportements inappropriés</h5>
                                    <p>Non-respect du code de la route, agressivité, usage illicite du véhicule.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.updateTypes}>
                            <div className={styles.updateCard}>
                                <h6><Ban size={16} color="#ef4444" /> Documents preuves</h6>
                                <p>Attachez des justificatifs (photos, échanges, constats) à chaque entrée.</p>
                            </div>
                            <div className={styles.updateCard}>
                                <h6><Zap size={16} color="#f59e0b" /> Catégorisation</h6>
                                <p>Filtrez par type d'incident pour une analyse rapide.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'alertes':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fef3c7', color: '#f59e0b' }}>
                                <Bell size={32} />
                            </div>
                            <div>
                                <h3>Alertes en temps réel</h3>
                                <p>Soyez averti instantanément lors d'une tentative de réservation</p>
                            </div>
                        </div>
                        <div className={styles.workflowDiagram}>
                            <h6><Activity size={16} /> Scénario typique</h6>
                            <div className={styles.workflowSteps}>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Tentative</span>
                                    <small>Client soumet une réservation</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Vérification</span>
                                    <small>Recherche dans la liste noire</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Alerte</span>
                                    <small>Notification envoyée</small>
                                </div>
                                <span className={styles.workflowArrow}>→</span>
                                <div className={styles.workflowStep}>
                                    <span className={styles.workflowLabel}>Blocage</span>
                                    <small>Réservation rejetée</small>
                                </div>
                            </div>
                        </div>
                        <div className={styles.complianceAlert} style={{ background: '#fee2e2', borderLeftColor: '#ef4444' }}>
                            <AlertCircle size={24} color="#ef4444" />
                            <div>
                                <strong>5 alertes actives</strong>
                                <p>Clients inscrits tentant de réserver – tous bloqués.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'blocage':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#dbeafe', color: '#3b82f6' }}>
                                <Shield size={32} />
                            </div>
                            <div>
                                <h3>Blocage automatique</h3>
                                <p>Empêchez toute nouvelle location</p>
                            </div>
                        </div>
                        <div className={styles.damageStats}>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>100%</span>
                                <span className={styles.damageStatLabel}>Détection</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>12</span>
                                <span className={styles.damageStatLabel}>Tentatives bloquées</span>
                            </div>
                            <div className={styles.damageStatItem}>
                                <span className={styles.damageStatValue}>0</span>
                                <span className={styles.damageStatLabel}>Échappées</span>
                            </div>
                        </div>
                    </div>
                );
            case 'historique':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#f3f4f6', color: '#374151' }}>
                                <History size={32} />
                            </div>
                            <div>
                                <h3>Historique des incidents</h3>
                                <p>Trace complète de chaque interaction litigieuse</p>
                            </div>
                        </div>
                        <div className={styles.insightCard}>
                            <h5>Informations tracées</h5>
                            <ul className={styles.insightList}>
                                <li><span className={styles.insightValue}>Date</span><span className={styles.insightLabel}>Inscription</span></li>
                                <li><span className={styles.insightValue}>Motif</span><span className={styles.insightLabel}>Détail</span></li>
                                <li><span className={styles.insightValue}>Montant</span><span className={styles.insightLabel}>Impayé / litige</span></li>
                                <li><span className={styles.insightValue}>Statut</span><span className={styles.insightLabel}>Actif / résolu</span></li>
                            </ul>
                        </div>
                    </div>
                );
            case 'litiges':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#fee2e2', color: '#ef4444' }}>
                                <AlertTriangle size={32} />
                            </div>
                            <div>
                                <h3>Gestion des litiges</h3>
                                <p>Suivez les contentieux en cours</p>
                            </div>
                        </div>
                        <div className={styles.maintenanceCalendar}>
                            <h6>Litiges actifs</h6>
                            <ul>
                                <li>• Client Said B. – Dégâts Ferrari – 23 000 MAD</li>
                                <li>• Client Youssef M. – Location non restituée – 95 000 MAD</li>
                            </ul>
                        </div>
                    </div>
                );
            case 'export':
                return (
                    <div className={styles.featureExplanation}>
                        <div className={styles.featureHeader}>
                            <div className={styles.featureIconLarge} style={{ background: '#e0e7ff', color: '#6366f1' }}>
                                <Download size={32} />
                            </div>
                            <div>
                                <h3>Export & partage</h3>
                                <p>Partagez la liste noire avec d'autres agences (optionnel)</p>
                            </div>
                        </div>
                        <div className={styles.complianceAlert}>
                            <Lock size={24} />
                            <div>
                                <strong>Confidentialité</strong>
                                <p>L'export est protégé et anonymisé si nécessaire. Partage sécurisé entre partenaires de confiance.</p>
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
                                <Ban size={14} />
                                Liste Noire
                            </div>
                            <h1>Protégez votre entreprise des clients à risque</h1>
                            <p className={styles.heroSubtitle}>
                                Identifiez et gérez les clients indésirables ou à risque. Centralisez les motifs d'inscription
                                (impayés, litiges, comportements inappropriés) et protégez votre entreprise en bloquant
                                automatiquement certaines réservations.
                            </p>
                            <div className={styles.heroCta}>
                                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                    <Plus size={20} />
                                    Ajouter une entrée
                                </button>
                                <button className={`${styles.btn} ${styles.btnOutline}`}>
                                    <Eye size={20} />
                                    Voir les alertes
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
                        <h2><BarChart3 size={28} color="#ef4444" /> Évolution des inscriptions</h2>
                        <p>Nouveaux inscrits par mois</p>
                    </div>
                    <div className={styles.analyticsGrid}>
                        <div className={styles.chartCard}>
                            <h5><TrendingUp size={16} /> Inscriptions mensuelles</h5>
                            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '20px 0' }}>
                                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'].map((month, i) => {
                                    const values = [0, 6, 12, 15, 18, 23];
                                    return (
                                        <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '100%',
                                                height: `${values[i]}px`,
                                                background: 'linear-gradient(to top, #ef4444, #f87171)',
                                                borderRadius: '4px 4px 0 0',
                                                minHeight: '20px'
                                            }} />
                                            <span style={{ fontSize: '12px', color: '#64748b' }}>{month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '14px', color: '#64748b' }}>Total 6 mois</span>
                                <span style={{ fontSize: '18px', fontWeight: '800', color: '#ef4444' }}>74 inscriptions</span>
                            </div>
                        </div>

                        <div className={styles.chartCard}>
                            <h5><PieChart size={16} /> Répartition par motif</h5>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="52, 100" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="30, 100" strokeDashoffset="-52" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="18, 100" strokeDashoffset="-82" />
                                    </svg>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>23</span>
                                        <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Entrées</span>
                                    </div>
                                </div>
                                <div className={styles.categoryLegend} style={{ flex: 1 }}>
                                    <div className={styles.categoryItem}><div className={styles.categoryDot} style={{ background: '#ef4444' }} /><span>Impayés (52%)</span></div>
                                    <div className={styles.categoryItem}><div className={styles.categoryDot} style={{ background: '#f59e0b' }} /><span>Litiges (30%)</span></div>
                                    <div className={styles.categoryItem}><div className={styles.categoryDot} style={{ background: '#3b82f6' }} /><span>Comportement (18%)</span></div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.insightCard}>
                            <h5><Zap size={16} /> Dernières alertes</h5>
                            <ul className={styles.insightList}>
                                <li><span className={styles.insightValue}>15/06</span><span className={styles.insightLabel}>Ahmed E. a tenté de réserver</span></li>
                                <li><span className={styles.insightValue}>14/06</span><span className={styles.insightLabel}>Said B. - tentative via WhatsApp</span></li>
                                <li><span className={styles.insightValue}>12/06</span><span className={styles.insightLabel}>Youssef M. - nouvelle location rejetée</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Explorer */}
            <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
                <div className={styles.containerContent}>
                    <div className={styles.sectionHeader}>
                        <h2><Sparkles size={28} color="#ef4444" /> Fonctionnalités de la liste noire</h2>
                        <p>Gérez les risques et protégez votre activité</p>
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

            {/* Blacklist List */}
            <section className={`${styles.moduleSection} ${styles.bgLight}`}>
                <div className={styles.containerContent}>
                    <div className={styles.listHeader}>
                        <div className={styles.listTitle}>
                            <h2><Ban size={24} /> Entrées récentes</h2>
                            <span className={styles.countBadge}>{BLACKLIST_ENTRIES.length} total</span>
                        </div>
                        <div className={styles.listControls}>
                            <div className={styles.searchBox}>
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un client..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterGroup}>
                                <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">Tous les statuts</option>
                                    <option value="actif">Actif</option>
                                    <option value="résolu">Résolu</option>
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
                        {filteredEntries.map((entry) => (
                            <div key={entry.id} className={styles.vehicleCard}>
                                <div className={styles.vehicleImage} style={{ height: '120px', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b' }}>
                                        <UserX size={40} opacity={0.5} />
                                        <div>
                                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{entry.id}</div>
                                            <div style={{ fontSize: '13px' }}>{entry.motif}</div>
                                        </div>
                                    </div>
                                    <div className={styles.vehicleBadge} style={{ background: getStatusColor(entry.statut) }}>
                                        {getStatusLabel(entry.statut)}
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
                                            <h4>{entry.client}</h4>
                                            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{entry.motif}</div>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                                            <Mail size={14} /> {entry.email}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                                            <Phone size={14} /> {entry.phone}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div className={styles.price}>
                                            <span className={styles.priceValue} style={{ fontSize: '18px', color: entry.montant !== '-' ? '#ef4444' : '#64748b' }}>
                                                {entry.montant !== '-' ? entry.montant : 'Aucun'}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                                            {entry.date}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ flex: 1, padding: '8px 16px', fontSize: '13px' }}>
                                            <AlertCircle size={14} />
                                            Détails
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
                        <h2><MessageCircleQuestion size={28} color="#ef4444" /> Questions Fréquentes (Liste Noire)</h2>
                        <p>Informations légales et fonctionnement du module</p>
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
                                            color: '#ef4444',
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
                        <h2><Gem size={28} color="#ef4444" /> Pourquoi tenir une liste noire ?</h2>
                        <p>Anticipez les risques et protégez votre activité</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fee2e2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
                                <Shield size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Sécurité</h6>
                            <p>Évitez les mauvais payeurs et les clients problématiques.</p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fef3c7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#f59e0b' }}>
                                <Bell size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Alertes</h6>
                            <p>Recevez une notification dès qu'une personne inscrite tente de réserver.</p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3b82f6' }}>
                                <FileText size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Traçabilité</h6>
                            <p>Conservez un historique détaillé des incidents.</p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fce7f3', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#db2777' }}>
                                <Ban size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Blocage automatique</h6>
                            <p>Empêchez toute nouvelle réservation.</p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#6366f1' }}>
                                <Users size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Partage sécurisé</h6>
                            <p>Échangez avec d'autres agences (optionnel).</p>
                        </div>
                        <div className={styles.updateCard} style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#f3f4f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#374151' }}>
                                <TrendingUp size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Réduction des pertes</h6>
                            <p>Limitez les impayés et les litiges.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.containerContent}>
                    <div className={styles.ctaBox}>
                        <h2>Protégez votre activité dès aujourd'hui</h2>
                        <p>Ajoutez des clients à risque et recevez des alertes automatiques. Sécurisez vos locations.</p>
                        <div className={styles.ctaStats}>
                            <span><CheckCircle size={14} /> Blocage automatique</span>
                            <span><CheckCircle size={14} /> Alertes en temps réel</span>
                            <span><CheckCircle size={14} /> Historique complet</span>
                            <span><CheckCircle size={14} /> Export sécurisé</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className={`${styles.btn} ${styles.btnWhite}`}>
                                <Zap size={20} />
                                Démarrer l'essai
                            </button>
                            <button className={`${styles.btn} ${styles.btnOutline}`} style={{ borderColor: 'white', color: 'white' }}>
                                <Ban size={20} />
                                Contacter un expert
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
