import React from 'react';
import styles from './about.module.css';

export const metadata = {
  title: 'À propos – MoroccoVehicles | Logiciel de gestion de flotte au Maroc',
  description: 'Découvrez MoroccoVehicles, la solution digitale pensée pour les professionnels de la location automobile au Maroc. Interface bilingue FR/AR, hébergement local conforme, support technique Casablanca. SaaS de gestion de flotte leader au Maroc depuis 2023.',
  keywords: [
    'MoroccoVehicles',
    'logiciel gestion flotte Maroc',
    'SaaS location voiture Casablanca',
    'digitalisation parc automobile',
    'software fleet management Morocco',
    'solution bilingue arabe français',
    'hébergement local Maroc',
    'conformité fiscale marocaine',
  ],
};

export default function About() {
  return (
    <div className={styles['morocco-vehicles-page']}>
      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-overlay']}>
          <div className={styles.container}>
            <div className={styles['hero-content']}>
              <span className={styles.badge}>Logiciel de Gestion de Flotte</span>
              <h1>MoroccoVehicles</h1>
              <p className={styles['hero-subtitle']}>
                La solution digitale complète pour la gestion de parc automobile au Maroc. 
                Optimisez vos opérations, sécurisez vos actifs et digitalisez vos contrats 
                avec une plateforme pensée pour le marché marocain.
              </p>
              <div className={styles['hero-cta']}>
                <button className={`${styles.btn} ${styles['btn-primary']}`}>
                  Découvrir la Solution
                </button>
                <button className={`${styles.btn} ${styles['btn-outline']}`}>
                  Demander une Démo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles['stats-section']}>
        <div className={styles.container}>
          <div className={styles['stats-grid']}>
            <div className={styles['stat-item']}>
              <h3>500+</h3>
              <p>Véhicules Gérés</p>
            </div>
            <div className={styles['stat-item']}>
              <h3>50+</h3>
              <p>Entreprises Clientes</p>
            </div>
            <div className={styles['stat-item']}>
              <h3>100%</h3>
              <p>Conformité Légale Marocaine</p>
            </div>
            <div className={styles['stat-item']}>
              <h3>24/7</h3>
              <p>Support Technique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles['features-section']}>
        <div className={styles.container}>
          <div className={styles['section-header']}>
            <h2>Nos Modules Principaux</h2>
            <p>Une suite complète d'outils pour maîtriser chaque aspect de votre flotte</p>
          </div>
          <div className={styles['features-grid']}>
            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']} style={{ background: '#e3f2fd' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3>Vue d'ensemble</h3>
              <p>Tableau de bord centralisé avec analytics en temps réel, KPIs de performance et reporting automatisé pour une vision 360° de votre activité.</p>
            </div>

            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']} style={{ background: '#e8f5e9' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="2">
                  <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
                  <circle cx="6.5" cy="16.5" r="2.5"></circle>
                  <circle cx="16.5" cy="16.5" r="2.5"></circle>
                </svg>
              </div>
              <h3>Véhicules</h3>
              <p>Gestion complète du parc : immatriculation, documents administratifs, suivi kilométrique, état des lieux digitalisé et historique complet.</p>
            </div>

            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']} style={{ background: '#fff3e0' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Contrats</h3>
              <p>Digitalisation des contrats de location, leasing et services. Gestion des échéances, renouvellements automatiques et signatures électroniques.</p>
            </div>

            <div className={`${styles['feature-card']} ${styles.luxury}`}>
              <div className={styles['feature-icon']} style={{ background: '#f3e5f5' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7b1fa2" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3>Luxury Voitures</h3>
              <p>Module dédié aux véhicules premium et haut de gamme. Suivi spécifique, maintenance conciergerie et gestion des services VIP pour clients exigeants.</p>
            </div>

            <div className={`${styles['feature-card']} ${styles.luxury}`}>
              <div className={styles['feature-icon']} style={{ background: '#fce4ec' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c2185b" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3>Luxury Contracts</h3>
              <p>Contrats sur mesure pour le segment luxe. Conditions personnalisées, clauses spécifiques et gestion des services additionnels (chauffeur, etc.).</p>
            </div>

            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']} style={{ background: '#e0f2f1' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00796b" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3>Calendrier</h3>
              <p>Planification intelligente des réservations, maintenance et retours. Synchronisation multi-agences et gestion des disponibilités en temps réel.</p>
            </div>

            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']} style={{ background: '#e8eaf6' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#303f9f" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Clients</h3>
              <p>CRM intégré avec fiches clients détaillées, historique de locations, scoring de fidélité et gestion des entreprises partenaires.</p>
            </div>

            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']} style={{ background: '#fff8e1' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffa000" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Assurance</h3>
              <p>Suivi complet des polices d'assurance, rappels d'échéances, gestion des sinistres et snapshots d'état des véhicules assurés.</p>
            </div>

            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']} style={{ background: '#efebe9' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5d4037" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1-7.94-7.94l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77z"></path>
                </svg>
              </div>
              <h3>Maintenance</h3>
              <p>Planification préventive et curative, suivi des révisions, gestion des fournisseurs et historique complet des interventions techniques.</p>
            </div>

            <div className={`${styles['feature-card']} ${styles.warning}`}>
              <div className={styles['feature-icon']} style={{ background: '#ffebee' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3>Liste Noire</h3>
              <p>Système de vigilance et sécurité pour identifier les clients à risque, historique des incidents et protection contre les impayés récurrents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles['why-section']}>
        <div className={styles.container}>
          <div className={styles['why-grid']}>
            <div className={styles['why-content']}>
              <h2>Pourquoi Choisir MoroccoVehicles ?</h2>
              <p>
                Contrairement aux solutions génériques importées, MoroccoVehicles est développée 
                spécifiquement pour répondre aux réalités du marché marocain : conformité fiscale locale, 
                gestion des documents administratifs spécifiques (carte grise marocaine, vignette, etc.), 
                et support en français et arabe.
              </p>
              <ul className={styles['why-list']}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Interface bilingue (FR/AR)
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Hébergement sécurisé au Maroc
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Intégration avec les autorités locales
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Support technique local réactif
                </li>
              </ul>
            </div>
            <div className={styles['why-image']}>
              <div className={styles['image-placeholder']}>
                <span>Dashboard Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles['cta-section']}>
        <div className={styles.container}>
          <div className={styles['cta-box']}>
            <h2>Prêt à Digitaliser Votre Parc Automobile ?</h2>
            <p>Rejoignez les entreprises leaders au Maroc qui font confiance à MoroccoVehicles</p>
            <button className={`${styles.btn} ${styles['btn-white']}`}>Commencer Maintenant</button>
          </div>
        </div>
      </section>
    </div>
  );
}