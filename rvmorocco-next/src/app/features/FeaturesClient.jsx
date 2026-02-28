'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MODULES } from './constants';
import styles from './features.module.css';
import { Search, Compass, ArrowRight, Check } from 'lucide-react';

export default function FeaturesClient() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredModules = Object.values(MODULES).filter((module) => {
        const term = searchQuery.toLowerCase();
        return (
            module.title.toLowerCase().includes(term) ||
            module.description.toLowerCase().includes(term) ||
            module.features.some((feat) => feat.toLowerCase().includes(term)) ||
            module.tags.some((tag) => tag.toLowerCase().includes(term))
        );
    });

    return (
        <div className={styles.featuresPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.containerContent}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>
                            <Compass size={18} /> Tous Vos Outils Connectés
                        </span>
                        <h1>L'Écosystème Smart Car Location</h1>
                        <p className={styles.heroSubtitle}>
                            Une suite logicielle exhaustive conçue spécifiquement pour la location de voitures au Maroc.
                            Chaque module ci-dessous représente une brique intégrée qui collabore avec les autres pour
                            <strong> sécuriser </strong> votre parc, <strong> satisfaire </strong> vos clients et
                            <strong> accélérer </strong> votre croissance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <section className={styles.searchSection}>
                <div className={styles.searchBox}>
                    <Search color="#64748b" />
                    <input
                        type="text"
                        placeholder="Rechercher (ex: paiements, assurances, vidange, luxe...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </section>

            {/* Features Grid */}
            <div className={styles.featuresGrid}>
                {filteredModules.length > 0 ? (
                    filteredModules.map((module) => {
                        const Icon = module.icon;
                        return (
                            <Link
                                href={module.href}
                                key={module.id}
                                className={styles.featureCard}
                                style={{ '--card-accent': module.color }}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.iconWrapper} style={{ backgroundColor: module.bg, color: module.color }}>
                                        <Icon size={28} />
                                    </div>
                                    <h3>{module.title}</h3>
                                </div>

                                <p className={styles.description}>{module.description}</p>

                                <div className={styles.featuresList}>
                                    {module.features.map((feat, index) => (
                                        <div key={index} className={styles.featureLine}>
                                            <Check size={16} style={{ color: module.color, minWidth: '16px' }} />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.tagsContainer}>
                                    {module.tags.map((tag, idx) => (
                                        <span key={idx} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>

                                <div className={styles.linkArrow} style={{ color: module.color }}>
                                    <span className={styles.linkText}>Accéder au module complet</span>
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '60px', color: '#64748b' }}>
                        <Compass size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                        <h3>Aucun module ne correspond à "{searchQuery}"</h3>
                        <p>Essayez avec d'autres mots clés ou explorez les catégories principales.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
