'use client';

import React, { useState } from 'react';
import styles from './support.module.css';

export default function SupportContent() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: 1,
      category: 'Général',
      question: 'Comment réserver une démonstration de MoroccoVehicles ?',
      answer: 'Vous pouvez réserver une démonstration personnalisée en remplissant le formulaire de contact ou en appelant notre équipe commerciale au +212 5XX XX XX XX. La démo dure environ 30 minutes et couvre tous les modules selon vos besoins.'
    },
    {
      id: 2,
      category: 'Facturation',
      question: 'Puis-je obtenir une facture personnalisée pour mon entreprise ?',
      answer: 'Oui, MoroccoVehicles génère automatiquement des factures conformes à la législation marocaine. Vous pouvez personnaliser le logo, les mentions légales et le format. Les factures sont disponibles en PDF et peuvent être exportées vers votre logiciel comptable.'
    },
    {
      id: 3,
      category: 'Réservations',
      question: 'Comment modifier ou annuler une réservation de véhicule ?',
      answer: 'Connectez-vous à votre tableau de bord, accédez au module "Calendrier", sélectionnez la réservation concernée et cliquez sur "Modifier" ou "Annuler". Les annulations peuvent être soumises à des conditions selon votre contrat.'
    },
    {
      id: 4,
      category: 'Technique',
      question: 'Le logiciel fonctionne-t-il hors connexion ?',
      answer: 'MoroccoVehicles est une solution cloud, mais certaines fonctionnalités comme la consultation des fiches véhicules restent accessibles en mode hors ligne sur notre application mobile. Les données se synchronisent automatiquement dès le retour de la connexion.'
    },
    {
      id: 5,
      category: 'Sécurité',
      question: 'Comment fonctionne la Liste Noire et la sécurité ?',
      answer: 'Notre système de Liste Noire permet d\'identifier les clients à risque basé sur l\'historique de paiements, incidents ou comportements. Les alertes sont automatiques et partagées avec votre équipe pour sécuriser vos opérations.'
    },
    {
      id: 6,
      category: 'Intégration',
      question: 'Peut-on intégrer MoroccoVehicles avec d\'autres logiciels ?',
      answer: 'Oui, nous proposons une API REST complète pour connecter MoroccoVehicles à vos outils existants (comptabilité, CRM, etc.). Nous supportons également les intégrations natives avec les logiciels les plus utilisés au Maroc.'
    }
  ];

  const supportChannels = [
    {
      title: 'Chat IA 24/7',
      description: 'Notre assistant virtuel répond instantanément à vos questions techniques et fonctionnelles, jour et nuit.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M9 10h.01"></path>
          <path d="M15 10h.01"></path>
          <path d="M10 14h4"></path>
        </svg>
      ),
      action: 'Discuter maintenant',
      color: '#28a745',
      badge: 'Disponible'
    },
    {
      title: 'Support Téléphonique',
      description: 'Une équipe d\'experts basée au Maroc disponible 24h/24 pour vous accompagner par téléphone.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      action: '+212 622 283 559',
      color: '#1976d2',
      badge: '24/24'
    },
    {
      title: 'Email & Tickets',
      description: 'Ouvrez un ticket de support détaillé pour les problèmes complexes. Réponse garantie sous 4 heures.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      action: 'support@moroccovehicles.com',
      color: '#f57c00',
      badge: '< 4h'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles['support-page']}>
      {/* Hero Section */}
      <section className={styles['support-hero']}>
        <div className={styles.container}>
          <div className={styles['hero-content']}>
            <span className={styles.badge}>Centre d'Aide</span>
            <h1>Support 24/7 & Assistance IA</h1>
            <p className={styles['hero-subtitle']}>
              Notre équipe d'experts et notre intelligence artificielle sont à votre disposition 
              en permanence pour répondre à toutes vos questions sur MoroccoVehicles.
            </p>
            
            {/* Search Bar */}
            <div className={styles['search-container']}>
              <svg className={styles['search-icon']} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Rechercher une question (ex: facture, réservation, API)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className={styles['clear-search']} onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className={styles['channels-section']}>
        <div className={styles.container}>
          <div className={styles['channels-grid']}>
            {supportChannels.map((channel, index) => (
              <div key={index} className={styles['channel-card']} style={{ '--channel-color': channel.color }}>
                <div className={styles['channel-badge']} style={{ backgroundColor: channel.color }}>
                  {channel.badge}
                </div>
                <div className={styles['channel-icon']} style={{ color: channel.color }}>
                  {channel.icon}
                </div>
                <h3>{channel.title}</h3>
                <p>{channel.description}</p>
                <a href="#" className={styles['channel-action']} style={{ color: channel.color }}>
                  {channel.action}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chatbot Promo */}
      <section className={styles['ai-section']}>
        <div className={styles.container}>
          <div className={styles['ai-box']}>
            <div className={styles['ai-content']}>
              <div className={styles['ai-badge']}>
                <span className={styles.pulse}></span>
                IA Disponible 24/24
              </div>
              <h2>Besoin d'une réponse immédiate ?</h2>
              <p>
                Notre assistant virtuel intelligent est formé sur l'ensemble de la documentation 
                MoroccoVehicles. Il peut répondre instantanément à vos questions techniques, 
                vous guider dans l'utilisation des modules et même vous aider à résoudre 
                des problèmes complexes sans attendre.
              </p>
              <ul className={styles['ai-features']}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Réponses instantanées 24h/24, 7j/7
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Support multilingue (FR/AR/EN)
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Apprentissage continu des nouvelles fonctionnalités
                </li>
              </ul>
              <button className={styles['ai-cta']}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Démarrer une conversation IA
              </button>
            </div>
            <div className={styles['ai-visual']}>
              <div className={styles['chat-bubbles']}>
                <div className={`${styles.bubble} ${styles.bot}`}>
                  <span>Bonjour ! Comment puis-je vous aider avec MoroccoVehicles aujourd'hui ?</span>
                </div>
                <div className={`${styles.bubble} ${styles.user}`}>
                  <span>Comment exporter mes factures ?</span>
                </div>
                <div className={`${styles.bubble} ${styles.bot} ${styles.typing}`}>
                  <span>...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles['faq-section']}>
        <div className={styles.container}>
          <div className={styles['section-header']}>
            <h2>Questions Fréquentes</h2>
            <p>Trouvez rapidement des réponses aux questions les plus courantes</p>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className={styles['no-results']}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
                <line x1="8" y1="8" x2="14" y2="14"></line>
                <line x1="14" y1="8" x2="8" y2="14"></line>
              </svg>
              <h3>Aucun résultat trouvé</h3>
              <p>Essayez avec d'autres mots-clés ou contactez notre support IA 24/7</p>
            </div>
          ) : (
            <div className={styles['faq-list']}>
              {filteredFaqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`${styles['faq-item']} ${openFaq === faq.id ? styles.open : ''}`}
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <div className={styles['faq-header']}>
                    <span className={styles['faq-category']}>{faq.category}</span>
                    <h3>{faq.question}</h3>
                    <div className={styles['faq-toggle']}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12" className={styles.horizontal}></line>
                      </svg>
                    </div>
                  </div>
                  <div className={styles['faq-answer']}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles['faq-footer']}>
            <p>Vous ne trouvez pas votre réponse ?</p>
            <a href="#" className={styles['btn-primary']}>Contacter le support humain</a>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className={styles['quick-links']}>
        <div className={styles.container}>
          <h3>Ressources utiles</h3>
          <div className={styles['links-grid']}>
            <a href="#" className={styles['quick-link']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Documentation API</span>
            </a>
            <a href="#" className={styles['quick-link']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span>Tutoriels vidéo</span>
            </a>
            <a href="#" className={styles['quick-link']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span>Guide de démarrage</span>
            </a>
            <a href="#" className={styles['quick-link']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Communauté utilisateurs</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}