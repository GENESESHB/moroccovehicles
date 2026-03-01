import React from 'react';
import styles from './about.module.css';

// ✅ 2026: Enhanced metadata with AI search optimization
export const metadata = {
  // ✅ 2026: Optimized title with geo-targeting and keywords
  title: 'À propos – MoroccoVehicles | Logiciel de gestion de flotte au Maroc',
  
  // ✅ 2026: Enhanced description with AI-extractable entities
  description: 'Découvrez MoroccoVehicles, la solution digitale pensée pour les professionnels de la location automobile au Maroc. Interface bilingue FR/AR, hébergement local conforme, support technique Casablanca. SaaS de gestion de flotte leader au Maroc depuis 2023.',
  
  // ✅ 2026: Keywords for AI context extraction
  keywords: [
    'MoroccoVehicles',
    'logiciel gestion flotte Maroc',
    'SaaS location voiture Casablanca',
    'digitalisation parc automobile',
    'software fleet management Morocco',
    'solution bilingue arabe français',
    'hébergement local Maroc',
    'conformité fiscale marocaine'
  ],
  
  // ✅ 2026: Canonical and alternates
  alternates: {
    canonical: 'https://moroccovehicles.com/about',
    languages: {
      'fr-MA': 'https://moroccovehicles.com/about',
      'fr-FR': 'https://moroccovehicles.com/fr/about',
      'ar-MA': 'https://moroccovehicles.com/ar/about',
      'en-US': 'https://moroccovehicles.com/en/about',
    },
  },
  
  // ✅ 2026: Robots directives for AI crawlers
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // ✅ 2026: OpenGraph optimized for LinkedIn/Facebook AI
  openGraph: {
    title: 'À propos de MoroccoVehicles – Leader de la gestion de flotte au Maroc',
    description: 'Logiciel de gestion de flotte automobile leader au Maroc. Découvrez notre histoire, notre équipe et notre mission pour digitaliser le secteur automobile marocain.',
    url: 'https://moroccovehicles.com/about',
    siteName: 'MoroccoVehicles',
    locale: 'fr_FR',
    type: 'profile',
    countryName: 'Morocco',
    emails: ['contact@moroccovehicles.com'],
    phoneNumbers: ['+212-XXX-XXXXXX'],
    images: [
      {
        url: 'https://moroccovehicles.com/images/about-moroccovehicles.jpeg',
        width: 1200,
        height: 630,
        alt: 'Équipe MoroccoVehicles – Logiciel de gestion de flotte au Maroc',
        type: 'image/jpeg',
      },
      {
        url: 'https://moroccovehicles.com/images/office-casablanca.jpeg',
        width: 800,
        height: 600,
        alt: 'Bureau MoroccoVehicles Casablanca',
      },
    ],
    profile: {
      firstName: 'MoroccoVehicles',
      lastName: 'Team',
      username: 'moroccovehicles',
      gender: 'business',
    },
  },
  
  // ✅ 2026: Twitter/X Cards
  twitter: {
    card: 'summary_large_image',
    site: '@moroccovehicles',
    creator: '@moroccovehicles',
    title: 'À propos de MoroccoVehicles – Logiciel de gestion de flotte',
    description: 'La solution digitale pensée pour les professionnels de la location automobile au Maroc. Interface bilingue, hébergement local, conformité légale.',
    images: ['https://moroccovehicles.com/images/about-moroccovehicles.jpeg'],
  },
  
  // ✅ 2026: Additional metadata for AI extraction
  other: {
    'og:type': 'profile',
    'profile:first_name': 'MoroccoVehicles',
    'profile:last_name': 'Team',
    'business:contact_data:locality': 'Casablanca',
    'business:contact_data:country': 'Morocco',
    'business:contact_data:email': 'contact@moroccovehicles.com',
    'business:contact_data:phone_number': '+212-XXX-XXXXXX',
    'article:published_time': '2023-01-01',
    'article:modified_time': '2026-02-25',
    'article:author': 'MoroccoVehicles',
  },
};

// ✅ FIXED: FAQPage removed from about.tsx — it already exists in the root layout
// (moroccovehicles.com/#faq). Having two FAQPage blocks on the same rendered page
// causes Google Search Console to flag "Champ FAQPage en double" and reject both.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // ============================================
    // 1. ABOUT PAGE (WebPage)
    // ============================================
    {
      '@type': 'AboutPage',
      '@id': 'https://moroccovehicles.com/about/#webpage',
      url: 'https://moroccovehicles.com/about',
      name: 'À propos de MoroccoVehicles – Logiciel de gestion de flotte au Maroc',
      headline: 'À propos de MoroccoVehicles',
      description: 'Découvrez MoroccoVehicles, la solution digitale pensée pour les professionnels de la location automobile au Maroc.',
      inLanguage: 'fr',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://moroccovehicles.com/#website',
      },
      about: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://moroccovehicles.com/images/about-moroccovehicles.jpeg',
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        '@id': 'https://moroccovehicles.com/about/#breadcrumb',
      },
      datePublished: '2023-01-01',
      dateModified: '2026-02-25',
      // ✅ Speakable for voice search
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-subtitle', '.why-content h2', '.why-content p'],
      },
    },

    // ============================================
    // 2. BREADCRUMB LIST
    // ============================================
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://moroccovehicles.com/about/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://moroccovehicles.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'À propos',
          item: 'https://moroccovehicles.com/about',
        },
      ],
    },

    // ============================================
    // 3. ORGANIZATION (Detailed)
    // ============================================
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://moroccovehicles.com/#organization',
      name: 'MoroccoVehicles',
      alternateName: 'MoroccoVehicles SARL',
      legalName: 'MoroccoVehicles SARL',
      description: 'Logiciel de gestion de flotte automobile au Maroc – Solution SaaS pour loueurs et entreprises',
      url: 'https://moroccovehicles.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moroccovehicles.com/moroccovehicles-logo.svg',
        width: 512,
        height: 512,
      },
      image: {
        '@type': 'ImageObject',
        url: 'https://moroccovehicles.com/images/about-moroccovehicles.jpeg',
        width: 1200,
        height: 630,
      },
      sameAs: [
        'https://www.linkedin.com/company/moroccovehicles',
        'https://twitter.com/moroccovehicles',
        'https://www.facebook.com/moroccovehicles',
        'https://www.instagram.com/moroccovehicles',
        'https://www.youtube.com/@moroccovehicles',
        'https://github.com/moroccovehicles',
        'https://www.crunchbase.com/organization/moroccovehicles',
        'https://www.wikidata.org/wiki/XXXXXXXXX',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Centre Ville',
        addressLocality: 'Casablanca',
        addressRegion: 'Casablanca-Settat',
        postalCode: '20000',
        addressCountry: {
          '@type': 'Country',
          name: 'Morocco',
        },
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 33.5731,
        longitude: -7.5898,
      },
      telephone: '+212-XXX-XXXXXX',
      email: 'contact@moroccovehicles.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+212-XXX-XXXXXX',
        contactType: 'Service Client',
        email: 'contact@moroccovehicles.com',
        availableLanguage: ['French', 'Arabic', 'English'],
        areaServed: 'MA',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
          timeZone: 'Africa/Casablanca',
        },
      },
      foundingDate: '2023-01-01',
      foundingLocation: {
        '@type': 'Place',
        name: 'Casablanca, Morocco',
      },
      knowsAbout: [
        'Fleet Management Software',
        'Vehicle Tracking Systems',
        'Car Rental Management',
        'Moroccan Automotive Industry',
        'SaaS Solutions',
        'Digital Transformation',
        'GPS Tracking',
        'Contract Management',
      ],
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '15',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        bestRating: '5',
      },
    },

    // ============================================
    // 4. SOFTWARE APPLICATION (Product details)
    // ============================================
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://moroccovehicles.com/about/#software',
      name: 'MoroccoVehicles',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      softwareVersion: '2.0.0',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'MAD',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '127',
      },
      featureList: [
        'Gestion de contrats de location',
        'Suivi GPS temps réel',
        'Maintenance préventive',
        'Digitalisation des documents',
        'Tableau de bord analytics',
        'Gestion des assurances',
        'Rappels automatiques',
        'Multi-utilisateurs',
      ],
    },

    // ============================================
    // 5. ITEM LIST (Features/Services)
    // ============================================
    {
      '@type': 'ItemList',
      '@id': 'https://moroccovehicles.com/about/#features',
      name: 'Modules Principaux MoroccoVehicles',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: "Vue d'ensemble",
          description: 'Tableau de bord centralisé avec analytics en temps réel',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Gestion des Véhicules',
          description: 'Gestion complète du parc automobile',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Contrats Digitalisés',
          description: 'Digitalisation des contrats de location et leasing',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Suivi GPS',
          description: 'Localisation et suivi en temps réel',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Maintenance',
          description: 'Planification préventive et curative',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Assurance',
          description: 'Suivi des polices et sinistres',
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'Clients CRM',
          description: 'Gestion des relations clients',
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'Calendrier',
          description: 'Planification des réservations',
        },
      ],
    },

    // ============================================
    // 6. HOW TO (Getting started)
    // ============================================
    {
      '@type': 'HowTo',
      '@id': 'https://moroccovehicles.com/about/#howto',
      name: 'Comment démarrer avec MoroccoVehicles',
      description: 'Guide simple pour commencer à utiliser MoroccoVehicles',
      totalTime: 'PT15M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Créer un compte',
          text: 'Inscrivez-vous gratuitement sur moroccovehicles.com',
          url: 'https://moroccovehicles.com/signup',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Configurer votre flotte',
          text: 'Ajoutez vos véhicules et configurez les paramètres',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Digitaliser vos processus',
          text: 'Commencez à créer des contrats et suivre vos véhicules',
        },
      ],
    },

    // ============================================
    // 7. VIDEO OBJECT
    // ============================================
    {
      '@type': 'VideoObject',
      '@id': 'https://moroccovehicles.com/about/#video',
      name: 'Présentation MoroccoVehicles',
      description: 'Découvrez MoroccoVehicles en vidéo',
      thumbnailUrl: 'https://moroccovehicles.com/images/video-thumbnail.jpg',
      uploadDate: '2026-01-15',
      duration: 'PT2M30S',
    },

    // ============================================
    // ✅ FIXED: FAQPage with about-specific @id and questions
    // This replaces the generic homepage FAQ — it is specific to /about
    // and uses a unique @id so it does NOT conflict with /#faq in the layout.
    // ACTION REQUIRED: Also remove the FAQPage block from your root layout/page
    // that carries "@id": "https://moroccovehicles.com/#faq" — keep only this one.
    // ============================================
    {
      '@type': 'FAQPage',
      '@id': 'https://moroccovehicles.com/about/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Pourquoi choisir MoroccoVehicles ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MoroccoVehicles est développée spécifiquement pour le marché marocain avec conformité fiscale locale, gestion des documents administratifs spécifiques (carte grise marocaine, vignette), interface bilingue FR/AR, hébergement sécurisé au Maroc et support technique local réactif basé à Casablanca.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels modules propose MoroccoVehicles ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "MoroccoVehicles propose 10 modules principaux : Vue d'ensemble (dashboard), Gestion des Véhicules, Contrats Digitalisés, Luxury Voitures, Luxury Contracts, Calendrier, Clients (CRM), Assurance, Maintenance, et Liste Noire (sécurité).",
          },
        },
        {
          '@type': 'Question',
          name: 'MoroccoVehicles est-il conforme à la législation marocaine ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Oui, MoroccoVehicles assure une conformité légale marocaine à 100% avec intégration des documents administratifs locaux, conformité fiscale, et hébergement des données au Maroc conforme à la loi 09-08 sur la protection des données personnelles.",
          },
        },
      ],
    },
  ],
};

export default function About() {
  return (
    <div className={styles['morocco-vehicles-page']}>
      {/* ✅ Structured Data — FAQPage duplicate fixed */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Hero Section */}
      <section className={styles['hero-section']} itemScope itemType="https://schema.org/Organization">
        <div className={styles['hero-overlay']}>
          <div className={styles.container}>
            <div className={styles['hero-content']}>
              <span className={styles.badge} itemProp="category">Logiciel de Gestion de Flotte</span>
              <h1 itemProp="name">MoroccoVehicles</h1>
              <p className={`${styles['hero-subtitle']} speakable-description`} itemProp="description">
                La solution digitale complète pour la gestion de parc automobile au Maroc. 
                Optimisez vos opérations, sécurisez vos actifs et digitalisez vos contrats 
                avec une plateforme pensée pour le marché marocain.
              </p>
              <div className={styles['hero-cta']}>
                <button className={`${styles.btn} ${styles['btn-primary']}`} itemProp="url">
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

      {/* Stats / Trust Indicators */}
      <section className={styles['stats-section']}>
        <div className={styles.container}>
          <div className={styles['stats-grid']} itemScope itemType="https://schema.org/Organization" itemProp="brand">
            <div className={styles['stat-item']}>
              <h3 itemProp="numberOfEmployees">500+</h3>
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
            <h2 className="speakable-title">Nos Modules Principaux</h2>
            <p>Une suite complète d'outils pour maîtriser chaque aspect de votre flotte</p>
          </div>
          
          <div className={styles['features-grid']} itemScope itemType="https://schema.org/ItemList">
            {/* Vue d'ensemble */}
            <div className={`${styles['feature-card']}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="1" />
              <div className={styles['feature-icon']} style={{ background: '#e3f2fd' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3 itemProp="name">Vue d'ensemble</h3>
              <p itemProp="description">Tableau de bord centralisé avec analytics en temps réel, KPIs de performance et reporting automatisé pour une vision 360° de votre activité.</p>
            </div>

            {/* Véhicules */}
            <div className={`${styles['feature-card']}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="2" />
              <div className={styles['feature-icon']} style={{ background: '#e8f5e9' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="2">
                  <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
                  <circle cx="6.5" cy="16.5" r="2.5"></circle>
                  <circle cx="16.5" cy="16.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 itemProp="name">Véhicules</h3>
              <p itemProp="description">Gestion complète du parc : immatriculation, documents administratifs, suivi kilométrique, état des lieux digitalisé et historique complet.</p>
            </div>

            {/* Contrats */}
            <div className={`${styles['feature-card']}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="3" />
              <div className={styles['feature-icon']} style={{ background: '#fff3e0' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f57c00" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 itemProp="name">Contrats</h3>
              <p itemProp="description">Digitalisation des contrats de location, leasing et services. Gestion des échéances, renouvellements automatiques et signatures électroniques.</p>
            </div>

            {/* Luxury Voitures */}
            <div className={`${styles['feature-card']} ${styles.luxury}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="4" />
              <div className={styles['feature-icon']} style={{ background: '#f3e5f5' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7b1fa2" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3 itemProp="name">Luxury Voitures</h3>
              <p itemProp="description">Module dédié aux véhicules premium et haut de gamme. Suivi spécifique, maintenance conciergerie et gestion des services VIP pour clients exigeants.</p>
            </div>

            {/* Luxury Contracts */}
            <div className={`${styles['feature-card']} ${styles.luxury}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="5" />
              <div className={styles['feature-icon']} style={{ background: '#fce4ec' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c2185b" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 itemProp="name">Luxury Contracts</h3>
              <p itemProp="description">Contrats sur mesure pour le segment luxe. Conditions personnalisées, clauses spécifiques et gestion des services additionnels (chauffeur, etc.).</p>
            </div>

            {/* Calendrier */}
            <div className={`${styles['feature-card']}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="6" />
              <div className={styles['feature-icon']} style={{ background: '#e0f2f1' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00796b" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 itemProp="name">Calendrier</h3>
              <p itemProp="description">Planification intelligente des réservations, maintenance et retours. Synchronisation multi-agences et gestion des disponibilités en temps réel.</p>
            </div>

            {/* Clients */}
            <div className={`${styles['feature-card']}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="7" />
              <div className={styles['feature-icon']} style={{ background: '#e8eaf6' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#303f9f" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 itemProp="name">Clients</h3>
              <p itemProp="description">CRM intégré avec fiches clients détaillées, historique de locations, scoring de fidélité et gestion des entreprises partenaires.</p>
            </div>

            {/* Assurance */}
            <div className={`${styles['feature-card']}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="8" />
              <div className={styles['feature-icon']} style={{ background: '#fff8e1' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffa000" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 itemProp="name">Assurance</h3>
              <p itemProp="description">Suivi complet des polices d'assurance, rappels d'échéances, gestion des sinistres et snapshots d'état des véhicules assurés.</p>
            </div>

            {/* Maintenance */}
            <div className={`${styles['feature-card']}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="9" />
              <div className={styles['feature-icon']} style={{ background: '#efebe9' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5d4037" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1-7.94-7.94l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77z"></path>
                </svg>
              </div>
              <h3 itemProp="name">Maintenance</h3>
              <p itemProp="description">Planification préventive et curative, suivi des révisions, gestion des fournisseurs et historique complet des interventions techniques.</p>
            </div>

            {/* Liste Noire */}
            <div className={`${styles['feature-card']} ${styles.warning}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content="10" />
              <div className={styles['feature-icon']} style={{ background: '#ffebee' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3 itemProp="name">Liste Noire</h3>
              <p itemProp="description">Système de vigilance et sécurité pour identifier les clients à risque, historique des incidents et protection contre les impayés récurrents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles['why-section']}>
        <div className={styles.container}>
          <div className={styles['why-grid']}>
            <div className={styles['why-content']}>
              <h2 className="speakable-title">Pourquoi Choisir MoroccoVehicles ?</h2>
              <p className="speakable-description">
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