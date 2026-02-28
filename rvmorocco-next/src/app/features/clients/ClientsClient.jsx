'use client';

import React, { useState } from 'react';
import {
    Users, UserPlus, Heart, TrendingUp, CheckCircle, Clock, DollarSign,
    Search, Plus, Eye, Edit3, ChevronRight, BarChart3, PieChart, Activity,
    Zap, Shield, Database, Sparkles, Gem, FileText, ArrowUpRight, ArrowDownRight,
    Mail, Phone, MapPin, MoreVertical, ChevronDown, MessageCircleQuestion, User
} from 'lucide-react';
import './ClientsPage.css';
import { STATS, CLIENTS, FEATURES, getStatusColor } from './constants';
import { faqs } from './faqs';

export default function ClientsClient() {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeFeature, setActiveFeature] = useState('database');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const filteredClients = CLIENTS.filter(c =>
        (statusFilter === 'all' || c.status === statusFilter) &&
        (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.company.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderFeatureContent = () => {
        switch (activeFeature) {
            case 'database':
                return (
                    <div className="featureExplanation">
                        <div className="featureHeader">
                            <div className="featureIconLarge" style={{ background: '#ede9fe', color: '#8b5cf6' }}>
                                <Database size={32} />
                            </div>
                            <div>
                                <h3>Base de données centralisée</h3>
                                <p>Accédez instantanément à toutes les informations clients</p>
                            </div>
                        </div>
                        <div className="featureSteps">
                            <div className="step">
                                <div className="stepNumber">1</div>
                                <div className="stepContent">
                                    <h5>Fiche client unique</h5>
                                    <p>Coordonnées, documents, préférences, historique – tout en un clic.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="stepNumber">2</div>
                                <div className="stepContent">
                                    <h5>Recherche intelligente</h5>
                                    <p>Trouvez un client par nom, email, téléphone, véhicule loué ou numéro de contrat.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="stepNumber">3</div>
                                <div className="stepContent">
                                    <h5>Export et sauvegarde</h5>
                                    <p>Exportez vos listes clients au format CSV, Excel ou PDF en un clic.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'history':
                return (
                    <div className="featureExplanation">
                        <div className="featureHeader">
                            <div className="featureIconLarge" style={{ background: '#dbeafe', color: '#3b82f6' }}>
                                <Clock size={32} />
                            </div>
                            <div>
                                <h3>Historique complet</h3>
                                <p>Suivez chaque location passée et à venir</p>
                            </div>
                        </div>
                        <div className="workflowDiagram">
                            <h6><Activity size={16} /> Ce que vous retrouvez</h6>
                            <div className="calendarFeatures">
                                <span className="calendarFeature"><CheckCircle size={14} /> Véhicules loués</span>
                                <span className="calendarFeature"><CheckCircle size={14} /> Dates et durées</span>
                                <span className="calendarFeature"><CheckCircle size={14} /> Montants payés</span>
                                <span className="calendarFeature"><CheckCircle size={14} /> Assurances souscrites</span>
                                <span className="calendarFeature"><CheckCircle size={14} /> État des lieux</span>
                            </div>
                        </div>
                    </div>
                );
            case 'preferences':
                return (
                    <div className="featureExplanation">
                        <div className="featureHeader">
                            <div className="featureIconLarge" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                                <Star size={32} />
                            </div>
                            <div>
                                <h3>Préférences clients</h3>
                                <p>Personnalisez l'expérience de chaque client</p>
                            </div>
                        </div>
                        <div className="damageStats">
                            <div className="damageStatItem">
                                <span className="damageStatValue">Catégories</span>
                                <span className="damageStatLabel">SUV, sportive, luxe</span>
                            </div>
                            <div className="damageStatItem">
                                <span className="damageStatValue">Options</span>
                                <span className="damageStatLabel">GPS, sièges enfant, Wi-Fi</span>
                            </div>
                            <div className="damageStatItem">
                                <span className="damageStatValue">Remarques</span>
                                <span className="damageStatLabel">Notes libres</span>
                            </div>
                        </div>
                    </div>
                );
            case 'documents':
                return (
                    <div className="featureExplanation">
                        <div className="featureHeader">
                            <div className="featureIconLarge" style={{ background: '#f3f4f6', color: '#374151' }}>
                                <FileText size={32} />
                            </div>
                            <div>
                                <h3>Gestion documentaire</h3>
                                <p>Stockez et vérifiez les pièces d'identité</p>
                            </div>
                        </div>
                        <div className="complianceAlert">
                            <Shield size={24} />
                            <div>
                                <strong>Vérification automatique</strong>
                                <p>Scan de CNI, passeport, permis. Validation par OCR et alerte en cas d'expiration.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'segmentation':
                return (
                    <div className="featureExplanation">
                        <div className="featureHeader">
                            <div className="featureIconLarge" style={{ background: '#fce7f3', color: '#db2777' }}>
                                <PieChart size={32} />
                            </div>
                            <div>
                                <h3>Segmentation avancée</h3>
                                <p>Ciblez vos campagnes marketing</p>
                            </div>
                        </div>
                        <div className="insightCard">
                            <h5>Filtres disponibles</h5>
                            <ul className="insightList">
                                <li><span className="insightValue">VIP</span><span className="insightLabel">Dépense 30k MAD</span></li>
                                <li><span className="insightValue">Fidèles</span><span className="insightLabel">5 locations</span></li>
                                <li><span className="insightValue">Inactifs</span><span className="insightLabel">6 mois</span></li>
                                <li><span className="insightValue">Géographie</span><span className="insightLabel">Ville, région</span></li>
                            </ul>
                        </div>
                    </div>
                );
            case 'loyalty':
                return (
                    <div className="featureExplanation">
                        <div className="featureHeader">
                            <div className="featureIconLarge" style={{ background: '#e0e7ff', color: '#6366f1' }}>
                                <Award size={32} />
                            </div>
                            <div>
                                <h3>Programme de fidélité</h3>
                                <p>Fidélisez vos meilleurs clients</p>
                            </div>
                        </div>
                        <div className="maintenanceCalendar">
                            <h6><Gem size={16} /> Avantages exclusifs</h6>
                            <div className="calendarFeatures">
                                <span className="calendarFeature"><CheckCircle size={14} /> Surclassement gratuit</span>
                                <span className="calendarFeature"><CheckCircle size={14} /> Caution réduite</span>
                                <span className="calendarFeature"><CheckCircle size={14} /> Livraison prioritaire</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="vehiclesPage">
            {/* Hero Section */}
            <section className="heroSection">
                <div className="heroOverlay">
                    <div className="containerContent">
                        <div className="heroContent">
                            <div className="badge">
                                <Users size={14} />
                                Base Clients
                            </div>
                            <h1>Gérez vos clients comme jamais</h1>
                            <p className="heroSubtitle">
                                Base de données clients complète avec historique des locations, préférences, documents d'identité,
                                et contrat type. Segmentez votre clientèle pour des offres personnalisées et fidélisez grâce à un suivi détaillé.
                            </p>
                            <div className="heroCta">
                                <button className="btn btnPrimary">
                                    <Plus size={20} />
                                    Ajouter un client
                                </button>
                                <button className="btn btnOutline">
                                    <Eye size={20} />
                                    Explorer
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
                        {STATS.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="statCard" style={{ borderLeftColor: stat.color }}>
                                    <div className="statIcon" style={{ background: `${stat.color}20`, color: stat.color }}>
                                        <Icon size={24} />
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
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Analytics Preview */}
            <section className="moduleSection bgLight">
                <div className="containerContent">
                    <div className="sectionHeader">
                        <h2><BarChart3 size={28} color="#8b5cf6" /> Analyse client</h2>
                        <p>Suivez l'évolution de votre portefeuille clients</p>
                    </div>
                    <div className="analyticsGrid">
                        <div className="chartCard">
                            <h5><TrendingUp size={16} /> Nouveaux clients / mois</h5>
                            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', padding: '20px 0' }}>
                                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'].map((month, i) => (
                                    <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${[52, 48, 61, 58, 72, 85][i]}%`,
                                            background: 'linear-gradient(to top, #8b5cf6, #a78bfa)',
                                            borderRadius: '4px 4px 0 0',
                                            minHeight: '20px'
                                        }} />
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>{month}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '14px', color: '#64748b' }}>Total H1 2024</span>
                                <span style={{ fontSize: '18px', fontWeight: '800', color: '#8b5cf6' }}>376 nouveaux</span>
                            </div>
                        </div>

                        <div className="chartCard">
                            <h5><PieChart size={16} /> Répartition par type</h5>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="70, 100" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#36c275" strokeWidth="3" strokeDasharray="20, 100" strokeDashoffset="-70" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="10, 100" strokeDashoffset="-90" />
                                    </svg>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>1240</span>
                                        <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Clients</span>
                                    </div>
                                </div>
                                <div className="categoryLegend" style={{ flex: 1 }}>
                                    <div className="categoryItem">
                                        <div className="categoryDot" style={{ background: '#8b5cf6' }} />
                                        <span>Particuliers (70%)</span>
                                    </div>
                                    <div className="categoryItem">
                                        <div className="categoryDot" style={{ background: '#36c275' }} />
                                        <span>Entreprises (20%)</span>
                                    </div>
                                    <div className="categoryItem">
                                        <div className="categoryDot" style={{ background: '#f59e0b' }} />
                                        <span>VIP (10%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="insightCard">
                            <h5><Zap size={16} /> Insights du mois</h5>
                            <ul className="insightList">
                                <li><span className="insightValue">85</span><span className="insightLabel">Nouveaux clients</span></li>
                                <li><span className="insightValue">12</span><span className="insightLabel">Nouveaux VIP</span></li>
                                <li><span className="insightValue">4,8/5</span><span className="insightLabel">Note satisfaction</span></li>
                                <li><span className="insightValue">92%</span><span className="insightLabel">Taux de rétention</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Explorer */}
            <section className="moduleSection bgWhite">
                <div className="containerContent">
                    <div className="sectionHeader">
                        <h2><Sparkles size={28} color="#8b5cf6" /> Fonctionnalités de gestion clients</h2>
                        <p>Découvrez les outils pour fidéliser et développer votre portefeuille</p>
                    </div>

                    <div className="featureExplorer">
                        <div className="featureNav">
                            {FEATURES.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <button
                                        key={feature.id}
                                        className={`featureNavBtn ${activeFeature === feature.id ? 'active' : ''}`}
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
                        <div className="featureContent">
                            {renderFeatureContent()}
                        </div>
                    </div>
                </div>
            </section>

            {/* Clients List Preview */}
            <section className="moduleSection bgLight">
                <div className="containerContent">
                    <div className="listHeader">
                        <div className="listTitle">
                            <h2><Users size={24} /> Derniers clients</h2>
                            <span className="countBadge">1 240 total</span>
                        </div>
                        <div className="listControls">
                            <div className="searchBox">
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un client..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="filterGroup">
                                <select className="filterSelect" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">Tous les statuts</option>
                                    <option value="VIP">VIP</option>
                                    <option value="régulier">Régulier</option>
                                    <option value="nouveau">Nouveau</option>
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
                        {filteredClients.map((client) => (
                            <div key={client.id} className="vehicleCard">
                                <div className="vehicleImage" style={{ height: '100px', background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b' }}>
                                        <User size={40} opacity={0.5} />
                                        <div>
                                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{client.name}</div>
                                            <div style={{ fontSize: '13px' }}>{client.company}</div>
                                        </div>
                                    </div>
                                    <div className="vehicleBadge" style={{ background: getStatusColor(client.status) }}>
                                        {client.status}
                                    </div>
                                    <div className="vehicleActions">
                                        <button className="actionBtn" title="Voir"><Eye size={16} /></button>
                                        <button className="actionBtn" title="Modifier"><Edit3 size={16} /></button>
                                        <button className="actionBtn" title="Contacter"><Mail size={16} /></button>
                                    </div>
                                </div>
                                <div className="vehicleContent">
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                                            <Mail size={14} /> {client.email}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
                                            <Phone size={14} /> {client.phone}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                                            <MapPin size={14} /> {client.city}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div className="price">
                                            <span className="priceValue" style={{ fontSize: '18px' }}>{client.totalSpent}</span>
                                            <span style={{ fontSize: '13px', color: '#64748b' }}> total</span>
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '8px', borderRadius: '8px', marginBottom: '12px' }}>
                                        <Clock size={12} style={{ marginRight: '4px' }} />
                                        Dernière location : {client.lastRental}
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn btnPrimary" style={{ flex: 1, padding: '8px 16px', fontSize: '13px' }}>
                                            <FileText size={14} />
                                            Voir contrat
                                        </button>
                                        <button className="actionBtn" style={{ position: 'static', opacity: 1 }}>
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="moduleSection bgWhite">
                <div className="containerContent">
                    <div className="sectionHeader">
                        <h2><Gem size={28} color="#8b5cf6" /> Pourquoi gérer vos clients avec nous ?</h2>
                        <p>Les avantages d'une base clients centralisée et intelligente</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#ede9fe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#8b5cf6' }}>
                                <Database size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Tout-en-un</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Coordonnées, historique, documents, préférences – plus besoin de multiples outils.
                            </p>
                        </div>

                        <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#dbeafe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#3b82f6' }}>
                                <Shield size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Sécurité des données</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Conformité RGPD, chiffrement, accès par rôle et audit trail.
                            </p>
                        </div>

                        <div className="updateCard" style={{ textAlign: 'center', padding: '32px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#fce7f3', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#db2777' }}>
                                <Heart size={32} />
                            </div>
                            <h6 style={{ fontSize: '18px', marginBottom: '12px', color: '#1e293b' }}>Fidélisation</h6>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                Programme de fidélité intégré, offres personnalisées et suivi des préférences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="moduleSection bgLight">
                <div className="containerContent">
                    <div className="sectionHeader" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
                        <h2><MessageCircleQuestion size={28} color="#8b5cf6" /> Questions Fréquentes (CRM)</h2>
                        <p>Tout ce que vous devez savoir sur la gestion de votre clientèle avec Smart Car Location</p>
                    </div>

                    <div className="faqContainer" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faqItem ${openFaq === index ? 'active' : ''}`}
                                style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <button
                                    className="faqQuestion"
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
                                            color: '#8b5cf6',
                                            transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                                            transition: 'transform 0.3s ease',
                                            flexShrink: 0
                                        }}
                                    />
                                </button>
                                <div
                                    className="faqAnswer"
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
            <section className="ctaSection">
                <div className="containerContent">
                    <div className="ctaBox" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
                        <h2>Prêt à mieux connaître vos clients ?</h2>
                        <p>Centralisez, segmentez et fidélisez avec notre module clients. Testez-le gratuitement pendant 14 jours.</p>
                        <div className="ctaStats">
                            <span><CheckCircle size={14} /> Import CSV</span>
                            <span><CheckCircle size={14} /> Synchronisation contrats</span>
                            <span><CheckCircle size={14} /> Documents illimités</span>
                            <span><CheckCircle size={14} /> Support prioritaire</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="btn btnWhite">
                                <Zap size={20} />
                                Essai gratuit
                            </button>
                            <button className="btn btnOutline" style={{ borderColor: 'white', color: 'white' }}>
                                <Users size={20} />
                                Contacter un expert
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
