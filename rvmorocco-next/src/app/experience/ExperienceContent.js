'use client';

import React, { useState } from 'react';
import {
  FileText, Search, Clock, DollarSign, Cloud, BarChart3,
  Calendar, TrendingUp, Globe, CheckCircle, ArrowRight,
  Users, Star, Zap, Shield, Award, ThumbsUp
} from 'lucide-react';
import styles from './experience.module.css';

export default function ExperienceContent() {
  const [activeTab, setActiveTab] = useState('agencies');

  const problems = [
    {
      icon: FileText,
      title: 'Gestion administrative chaotique',
      description: 'Perte de temps avec des dossiers papier, cartes grises égarées et contrats mal classés.',
      color: '#ef4444'
    },
    {
      icon: Search,
      title: 'Visibilité zéro sur la flotte',
      description: 'Impossible de savoir en temps réel quels véhicules sont disponibles, en maintenance ou loués.',
      color: '#f59e0b'
    },
    {
      icon: Clock,
      title: 'Réservations manuelles',
      description: 'Double-bookings, erreurs de planning et clients mécontents à cause d\'un calendrier mal géré.',
      color: '#3b82f6'
    },
    {
      icon: DollarSign,
      title: 'Contrôle financier difficile',
      description: 'Difficulté à suivre les paiements, les impayés et à générer des factures conformes.',
      color: '#8b5cf6'
    }
  ];

  const solutions = [
    {
      icon: Cloud,
      title: 'Digitalisation complète',
      description: 'Tous vos documents (cartes grises, contrats, assurances) centralisés et accessibles en un clic.',
      color: '#36c275'
    },
    {
      icon: BarChart3,
      title: 'Tableau de bord temps réel',
      description: 'Vue 360° de votre flotte : disponibilités, maintenance à venir, véhicules en location.',
      color: '#36c275'
    },
    {
      icon: Calendar,
      title: 'Réservations automatisées',
      description: 'Calendrier intelligent avec alertes, confirmation automatique et gestion des retards.',
      color: '#36c275'
    },
    {
      icon: TrendingUp,
      title: 'Gestion financière intégrée',
      description: 'Facturation automatique, suivi des paiements, rappels d\'échéances et reporting détaillé.',
      color: '#36c275'
    }
  ];

  const testimonials = [
    {
      quote: "Moroccovehicles a transformé notre agence. Avant, nous passions 3 heures par jour sur la paperasse. Maintenant, tout est digitalisé et nous avons gagné 40% de productivité.",
      author: "Karim Benali",
      role: "Directeur",
      company: "AutoRent Casablanca",
      image: "KB",
      stats: "150 véhicules gérés"
    },
    {
      quote: "La fonction Liste Noire nous a sauvé d'arnaqueurs à plusieurs reprises. Le système d'alerte est incroyablement efficace pour sécuriser nos locations.",
      author: "Sofia Mansouri",
      role: "Responsable Opérations",
      company: "Marrakech Premium Cars",
      image: "SM",
      stats: "Agence internationale"
    },
    {
      quote: "Nous recevons des clients européens et américains. Moroccovehicles nous permet de gérer leurs réservations en ligne, documents internationaux et assurances spécifiques sans stress.",
      author: "Youssef Alami",
      role: "Fondateur",
      company: "Atlas Drive Morocco",
      image: "YA",
      stats: "Clients de 12 pays"
    }
  ];

  const internationalFeatures = [
    {
      country: 'France',
      feature: 'Contrats bilingues FR/AR',
      icon: Globe
    },
    {
      country: 'UK & USA',
      feature: 'Documentation internationale',
      icon: Globe
    },
    {
      country: 'Allemagne',
      feature: 'Conformité UE assurances',
      icon: Shield
    },
    {
      country: 'Espagne',
      feature: 'Paiement multi-devises',
      icon: DollarSign
    },
    {
      country: 'Emirates',
      feature: 'Service client arabe 24/7',
      icon: Users
    },
    {
      country: 'International',
      feature: 'API pour agences de voyage',
      icon: Zap
    }
  ];

  const productFeatures = [
    {
      icon: Zap,
      title: 'Activation Rapide',
      description: 'Activez vos produits en un clic et commencez à louer vos véhicules immédiatement.'
    },
    {
      icon: Users,
      title: 'Gestion d\'Agence',
      description: 'Gérez votre agence de manière efficace avec des outils intuitifs pour la flotte et les clients.'
    },
    {
      icon: Globe,
      title: 'Clients Internationaux',
      description: 'Attirez des clients du monde entier venant au Maroc pour louer vos voitures.'
    },
    {
      icon: Shield,
      title: 'Sécurité Renforcée',
      description: 'Protégez votre business avec des fonctionnalités avancées de sécurité et de conformité.'
    }
  ];

  return (
    <div className={styles['experience-page']}>
      {/* Hero Section */}
      <section className={styles['experience-hero']}>
        <div className={styles.container}>
          <div className={styles['hero-content']}>
            <div className={styles['international-badge']}>
              <Globe size={18} />
              <span>Solution internationale pour agences de location</span>
            </div>
            <h1>Votre Agence Mérite Mieux que Excel</h1>
            <p className={styles['hero-subtitle']}>
              Découvrez comment moroccovehicles aide les agences de location marocaines
              à digitaliser leurs opérations, attirer des clients internationaux
              et multiplier leur chiffre d'affaires.
            </p>
            <div className={styles['hero-stats']}>
              <div className={styles.stat}>
                <strong>500+</strong>
                <span>Véhicules gérés</span>
              </div>
              <div className={styles.stat}>
                <strong>50+</strong>
                <span>Agences partenaires</span>
              </div>
              <div className={styles.stat}>
                <strong>12</strong>
                <span>Pays desservis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className={styles['problem-solution']}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            <button
              className={activeTab === 'agencies' ? styles.active : ''}
              onClick={() => setActiveTab('agencies')}
            >
              Pour les Agences de Location
            </button>
            <button
              className={activeTab === 'international' ? styles.active : ''}
              onClick={() => setActiveTab('international')}
            >
              Pour les Clients Internationaux
            </button>
          </div>

          {activeTab === 'agencies' ? (
            <div className={styles['comparison-grid']}>
              <div className={styles['problem-side']}>
                <h3>
                  <span className={`${styles.badge} ${styles.bad}`}>❌ Avant</span>
                  Sans moroccovehicles
                </h3>
                <div className={styles.cards}>
                  {problems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className={styles['problem-card']}>
                        <div className={styles['card-icon']} style={{ background: `${item.color}15`, color: item.color }}>
                          <Icon size={24} />
                        </div>
                        <div className={styles['card-content']}>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles['solution-side']}>
                <h3>
                  <span className={`${styles.badge} ${styles.good}`}>✅ Après</span>
                  Avec moroccovehicles
                </h3>
                <div className={styles.cards}>
                  {solutions.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className={styles['solution-card']}>
                        <div className={styles['card-icon']} style={{ background: '#36c27515', color: '#36c275' }}>
                          <Icon size={24} />
                        </div>
                        <div className={styles['card-content']}>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles['international-showcase']}>
              <div className={styles['intl-header']}>
                <h3>Attirez des Clients du Monde Entier</h3>
                <p>
                  moroccovehicles est conçu pour les agences qui visent l'international.
                  Notre plateforme multilingue et conforme aux standards internationaux
                  vous ouvre les marchés européens, américains et du Moyen-Orient.
                  Des clients internationaux viennent au Maroc pour louer vos voitures – soyez prêt !
                </p>
              </div>

              <div className={styles['intl-grid']}>
                {internationalFeatures.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className={styles['intl-card']}>
                      <div className={styles['intl-icon']}>
                        <Icon size={32} color="#36c275" />
                      </div>
                      <h4>{item.country}</h4>
                      <p>{item.feature}</p>
                    </div>
                  );
                })}
              </div>

              <div className={styles['intl-cta']}>
                <div className={styles['cta-box']}>
                  <h4>💡 Le Saviez-Vous ?</h4>
                  <p>
                    Les agences utilisant moroccovehicles constatent en moyenne
                    une <strong>augmentation de 35%</strong> de leurs réservations internationales
                    grâce à la confiance apportée par une plateforme professionnelle
                    et des processus digitalisés.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Experience Transformation (Before/After) */}
      <section className={styles['transformation-section']}>
        <div className={styles.container}>
          <div className={styles['section-header']}>
            <h2>L'Expérience Après moroccovehicles</h2>
            <p>Ce qui change concrètement dans votre quotidien</p>
          </div>
          <div className={styles['transformation-grid']}>
            <div className={`${styles['transfo-card']} ${styles.before}`}>
              <h4>Avant : Le Chaos</h4>
              <ul>
                <li><span>❌</span> 3 heures/jour en paperasse</li>
                <li><span>❌</span> Clients mécontents (doubles réservations)</li>
                <li><span>❌</span> Impayés non suivis</li>
                <li><span>❌</span> Maintenance oubliée → véhicules immobilisés</li>
              </ul>
            </div>
            <div className={`${styles['transfo-card']} ${styles.after}`}>
              <h4>Après : La Sérénité</h4>
              <ul>
                <li><span>✅</span> 30 min/jour suffisent</li>
                <li><span>✅</span> 100% de visibilité en temps réel</li>
                <li><span>✅</span> Paiements automatisés, zéro impayé</li>
                <li><span>✅</span> Alertes maintenance proactive</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Activation and Agency Management Section */}
      <section className={styles['product-section']}>
        <div className={styles.container}>
          <div className={styles['section-header']}>
            <h2>Gérez Votre Agence et Activez Vos Produits</h2>
            <p>Avec moroccovehicles, gérez facilement votre agence et activez vos produits pour attirer plus de clients, y compris internationaux venant au Maroc pour louer vos voitures.</p>
          </div>
          <div className={styles['product-grid']}>
            {productFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={styles['product-card']}>
                  <div className={styles['product-icon']}>
                    <Icon size={48} color="#36c275" />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles['testimonials-section']}>
        <div className={styles.container}>
          <div className={styles['section-header']}>
            <h2>Ils Ont Transformé Leur Agence</h2>
            <p>Témoignages d'agences de location partenaires</p>
          </div>
          <div className={styles['testimonials-grid']}>
            {testimonials.map((item, index) => (
              <div key={index} className={styles['testimonial-card']}>
                <div className={styles['quote-icon']}>
                  <ThumbsUp size={24} color="#36c275" />
                </div>
                <blockquote>"{item.quote}"</blockquote>
                <div className={styles['testimonial-footer']}>
                  <div className={styles['author-image']}>{item.image}</div>
                  <div className={styles['author-info']}>
                    <strong>{item.author}</strong>
                    <span>{item.role}, {item.company}</span>
                  </div>
                  <div className={styles['author-stats']}>{item.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Teaser */}
      <section className={styles['roi-section']}>
        <div className={styles.container}>
          <div className={styles['roi-box']}>
            <div className={styles['roi-content']}>
              <h3>Calculez Votre Gain de Productivité</h3>
              <p>
                Une agence de 50 véhicules économise en moyenne
                <strong> 15 heures par semaine</strong> d'administration grâce à moroccovehicles.
              </p>
              <ul>
                <li>
                  <CheckCircle size={18} color="white" />
                  <span>Fini les doubles saisies</span>
                </li>
                <li>
                  <CheckCircle size={18} color="white" />
                  <span>Fini les erreurs de facturation</span>
                </li>
                <li>
                  <CheckCircle size={18} color="white" />
                  <span>Fini les pertes de documents</span>
                </li>
              </ul>
              <button className={styles['roi-btn']}>Voir le calcul détaillé</button>
            </div>
            <div className={styles['roi-visual']}>
              <div className={styles['chart-placeholder']}>
                <div className={`${styles.bar} ${styles.before}`} style={{ height: '80%' }}>
                  <span>Avant</span>
                  <small>20h/sem</small>
                </div>
                <div className={`${styles.bar} ${styles.after}`} style={{ height: '30%' }}>
                  <span>Après</span>
                  <small>5h/sem</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles['experience-cta']}>
        <div className={styles.container}>
          <h2>Prêt à Moderniser Votre Agence ?</h2>
          <p>Rejoignez les agences leaders au Maroc et ouvrez-vous au marché international</p>
          <div className={styles['cta-buttons']}>
            <button className={`${styles.btn} ${styles['btn-primary']}`}>
              Demander une démo gratuite
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
            <button className={`${styles.btn} ${styles['btn-outline']}`}>Voir les tarifs agences</button>
          </div>
        </div>
      </section>
    </div>
  );
}