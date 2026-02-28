import ExperienceContent from './ExperienceContent';
import styles from './experience.module.css';

// ✅ 2026: Enhanced metadata with AI search optimization
export const metadata = {
  // ✅ 2026: Optimized title with transformation keywords and ROI signals
  title: 'Expérience Client – MoroccoVehicles | Témoignages & ROI Gestion Flotte',
  
  // ✅ 2026: Enhanced description with social proof and quantified benefits
  description: 'Découvrez comment MoroccoVehicles transforme les agences de location au Maroc : +40% productivité, -30% coûts admin, 500+ véhicules gérés. Témoignages clients, études de cas et avant/après digitalisation.',
  
  // ✅ 2026: Keywords for AI context extraction
  keywords: [
    'témoignages MoroccoVehicles',
    'expérience client gestion flotte',
    'ROI logiciel location voiture',
    'transformation digitale agence location',
    'étude de cas fleet management Maroc',
    'avis clients MoroccoVehicles',
    'succès digitalisation parc automobile',
    'témoignage agence location Casablanca'
  ],
  
  // ✅ 2026: Canonical and alternates
  alternates: {
    canonical: 'https://moroccovehicles.com/experience',
    languages: {
      'fr-MA': 'https://moroccovehicles.com/experience',
      'fr-FR': 'https://moroccovehicles.com/fr/experience',
      'ar-MA': 'https://moroccovehicles.com/ar/experience',
      'en-US': 'https://moroccovehicles.com/en/experience',
    },
  },
  
  // ✅ 2026: Robots directives for AI crawlers
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // ✅ 2026: OpenGraph optimized for social proof
  openGraph: {
    title: 'L\'expérience MoroccoVehicles – Témoignages & Résultats Clients',
    description: 'Votre agence mérite mieux que Excel. Découvrez comment nos clients gagnent 20h/semaine, réduisent leurs coûts de 30% et fidélisent leurs clients. Études de cas et retours d\'expérience.',
    url: 'https://moroccovehicles.com/experience',
    siteName: 'MoroccoVehicles',
    locale: 'fr_FR',
    type: 'article', // ✅ 2026: Article type for experience stories
    countryName: 'Morocco',
    article: {
      publishedTime: '2023-01-01',
      modifiedTime: '2026-02-25',
      author: {
        name: 'MoroccoVehicles',
        url: 'https://moroccovehicles.com',
      },
      section: 'Témoignages',
      tag: ['témoignages', 'ROI', 'transformation digitale', 'gestion de flotte'],
    },
    images: [
      {
        url: 'https://moroccovehicles.com/images/og-experience.jpg',
        width: 1200,
        height: 630,
        alt: 'Témoignages clients MoroccoVehicles – Transformation digitale agences de location',
        type: 'image/jpeg',
      },
      {
        url: 'https://moroccovehicles.com/images/client-success-story.jpg',
        width: 800,
        height: 600,
        alt: 'Client satisfait MoroccoVehicles – Agence de location Casablanca',
      },
    ],
  },
  
  // ✅ 2026: Twitter/X Cards with testimonial focus
  twitter: {
    card: 'summary_large_image',
    site: '@moroccovehicles',
    creator: '@moroccovehicles',
    title: 'Expérience MoroccoVehicles – Ce que disent nos clients',
    description: '+40% productivité, -30% coûts, 500+ véhicules gérés. Découvrez les témoignages de nos clients.',
    images: ['https://moroccovehicles.com/images/og-experience.jpg'],
  },
  
  // ✅ 2026: Additional metadata for AI extraction
  other: {
    'article:published_time': '2023-01-01',
    'article:modified_time': '2026-02-25',
    'article:author': 'MoroccoVehicles',
    'article:section': 'Témoignages Clients',
    'article:tag': 'témoignages, ROI, transformation digitale',
    'business:contact_data:locality': 'Casablanca',
    'business:contact_data:country': 'Morocco',
  },
};

// ✅ 2026: Complete JSON-LD Structured Data for Experience Page
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // ============================================
    // 1. ARTICLE (Primary - for experience stories)
    // ============================================
    {
      '@type': 'Article',
      '@id': 'https://moroccovehicles.com/experience/#article',
      headline: 'L\'expérience MoroccoVehicles – Transformation digitale des agences de location',
      description: 'Découvrez comment MoroccoVehicles digitalise la gestion de flotte, attire des clients internationaux et augmente votre productivité.',
      image: {
        '@type': 'ImageObject',
        url: 'https://moroccovehicles.com/images/og-experience.jpg',
        width: 1200,
        height: 630,
      },
      author: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
        name: 'MoroccoVehicles',
        url: 'https://moroccovehicles.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://moroccovehicles.com/moroccovehicles-logo.svg',
        },
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      datePublished: '2023-01-01',
      dateModified: '2026-02-25',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://moroccovehicles.com/experience/#webpage',
      },
      articleSection: 'Témoignages Clients',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.testimonial-quote', '.roi-stat', '.experience-intro'],
      },
    },

    // ============================================
    // 2. WEB PAGE
    // ============================================
    {
      '@type': 'WebPage',
      '@id': 'https://moroccovehicles.com/experience/#webpage',
      url: 'https://moroccovehicles.com/experience',
      name: 'Expérience Client – MoroccoVehicles | Témoignages & ROI',
      description: 'Découvrez comment MoroccoVehicles transforme les agences de location au Maroc avec des témoignages clients et études de cas.',
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
        url: 'https://moroccovehicles.com/images/og-experience.jpg',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        '@id': 'https://moroccovehicles.com/experience/#breadcrumb',
      },
      datePublished: '2023-01-01',
      dateModified: '2026-02-25',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.experience-description', '.testimonial-section'],
      },
    },

    // ============================================
    // 3. BREADCRUMB LIST
    // ============================================
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://moroccovehicles.com/experience/#breadcrumb',
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
          name: 'Expérience Client',
          item: 'https://moroccovehicles.com/experience',
        },
      ],
    },

    // ============================================
    // 4. ORGANIZATION
    // ============================================
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://moroccovehicles.com/#organization',
      name: 'MoroccoVehicles',
      alternateName: 'MoroccoVehicles SARL',
      description: 'Logiciel de gestion de flotte automobile au Maroc – Solution SaaS pour loueurs et entreprises',
      url: 'https://moroccovehicles.com',
      logo: 'https://moroccovehicles.com/moroccovehicles-logo.svg',
      sameAs: [
        'https://www.linkedin.com/company/moroccovehicles',
        'https://twitter.com/moroccovehicles',
        'https://www.facebook.com/moroccovehicles',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Casablanca',
        addressCountry: 'MA',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+212-XXX-XXXXXX',
        contactType: 'Service Client',
        availableLanguage: ['French', 'Arabic', 'English'],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        bestRating: '5',
      },
    },

    // ============================================
    // 5. ITEM LIST (Experience Sections)
    // ============================================
    {
      '@type': 'ItemList',
      '@id': 'https://moroccovehicles.com/experience/#sections',
      name: 'Sections Expérience MoroccoVehicles',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Avant / Après',
          description: 'Comparez la gestion traditionnelle avec MoroccoVehicles',
          url: 'https://moroccovehicles.com/experience#avant-apres',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Témoignages clients',
          description: 'Retours d\'expérience de nos partenaires',
          url: 'https://moroccovehicles.com/experience#temoignages',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Études de cas',
          description: 'Success stories de digitalisation',
          url: 'https://moroccovehicles.com/experience#etudes-cas',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Statistiques ROI',
          description: 'Résultats quantifiés de nos clients',
          url: 'https://moroccovehicles.com/experience#roi',
        },
      ],
    },

    // ============================================
    // 6. REVIEW / TESTIMONIALS (Sample - add more as needed)
    // ============================================
    {
      '@type': 'Review',
      '@id': 'https://moroccovehicles.com/experience/#review1',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Ahmed Benali',
        jobTitle: 'Directeur Général',
        worksFor: {
          '@type': 'Organization',
          name: 'Location Auto Casablanca',
        },
      },
      reviewBody: 'MoroccoVehicles a transformé notre façon de travailler. Nous avons gagné 20 heures par semaine en gestion administrative et réduit nos erreurs de facturation de 90%. Le ROI a été immédiat.',
      datePublished: '2025-12-15',
      publisher: {
        '@type': 'Organization',
        name: 'MoroccoVehicles',
      },
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: 'MoroccoVehicles',
        applicationCategory: 'BusinessApplication',
      },
    },
    {
      '@type': 'Review',
      '@id': 'https://moroccovehicles.com/experience/#review2',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Sofia El Amrani',
        jobTitle: 'Responsable Opérations',
        worksFor: {
          '@type': 'Organization',
          name: 'Fleet Pro Maroc',
        },
      },
      reviewBody: 'Le suivi GPS en temps réel et la digitalisation des contrats ont révolutionné notre service client. Nos clients apprécient la rapidité et la professionnalité. Notre taux de fidélisation a augmenté de 35%.',
      datePublished: '2026-01-20',
      publisher: {
        '@type': 'Organization',
        name: 'MoroccoVehicles',
      },
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: 'MoroccoVehicles',
      },
    },

    // ============================================
    // 7. AGGREGATE RATING (Overall)
    // ============================================
    {
      '@type': 'AggregateRating',
      '@id': 'https://moroccovehicles.com/experience/#aggregate-rating',
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: 'MoroccoVehicles',
      },
      ratingValue: '4.8',
      reviewCount: '127',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1',
    },

    // ============================================
    // 8. HOW TO (Transformation process)
    // ============================================
    {
      '@type': 'HowTo',
      '@id': 'https://moroccovehicles.com/experience/#howto',
      name: 'Comment transformer votre agence avec MoroccoVehicles',
      description: 'Processus de digitalisation en 4 étapes simples',
      totalTime: 'P7D',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'MAD',
        value: '0',
        description: 'Essai gratuit de 14 jours',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Audit gratuit',
          text: 'Nous analysons vos processus actuels et identifions les gains potentiels',
          url: 'https://moroccovehicles.com/experience#audit',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Configuration sur mesure',
          text: 'Paramétrage du logiciel selon vos besoins spécifiques',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Formation équipe',
          text: 'Formation complète de vos collaborateurs (2h en moyenne)',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Go live & support',
          text: 'Mise en production accompagnée avec support dédié',
        },
      ],
    },

    // ============================================
    // 9. DATASET (ROI Statistics)
    // ============================================
    {
      '@type': 'Dataset',
      '@id': 'https://moroccovehicles.com/experience/#dataset',
      name: 'Statistiques ROI MoroccoVehicles',
      description: 'Données de performance des clients MoroccoVehicles',
      creator: {
        '@type': 'Organization',
        name: 'MoroccoVehicles',
      },
      datePublished: '2026-02-25',
      license: 'https://moroccovehicles.com/terms',
      distribution: {
        '@type': 'DataDownload',
        contentUrl: 'https://moroccovehicles.com/api/stats/roi',
        encodingFormat: 'JSON',
      },
      variableMeasured: [
        'Productivity Increase',
        'Cost Reduction',
        'Customer Satisfaction',
        'Time Savings',
      ],
    },

    // ============================================
    // 10. FAQ PAGE (Experience FAQs)
    // ============================================
    {
      '@type': 'FAQPage',
      '@id': 'https://moroccovehicles.com/experience/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quels résultats puis-je attendre avec MoroccoVehicles ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nos clients constatent en moyenne : +40% de productivité, -30% de coûts administratifs, -90% d\'erreurs de facturation, +35% de fidélisation client, et 20 heures économisées par semaine sur la gestion administrative.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien de temps prend la mise en place ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La mise en place standard prend 7 jours ouvrés : audit initial (1 jour), configuration (2 jours), formation (1 jour), et migration des données (3 jours). L\'essai gratuit de 14 jours permet de tester sans engagement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Y a-t-il des témoignages de clients similaires à mon activité ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, nous avons plus de 50 agences de location référencées au Maroc, de la PME familiale aux grands réseaux nationaux. Contactez-nous pour obtenir des références dans votre région et de votre taille.',
          },
        },
      ],
    },

    // ============================================
    // 11. VIDEO OBJECT (Testimonial video)
    // ============================================
    {
      '@type': 'VideoObject',
      '@id': 'https://moroccovehicles.com/experience/#video',
      name: 'Témoignage client MoroccoVehicles – Location Auto Casablanca',
      description: 'Découvrez comment Location Auto Casablanca a transformé sa gestion avec MoroccoVehicles',
      thumbnailUrl: 'https://moroccovehicles.com/images/video-testimonial-thumb.jpg',
      uploadDate: '2025-11-15',
      duration: 'PT3M45S',
      contentUrl: 'https://moroccovehicles.com/videos/testimonial-location-auto.mp4',
      embedUrl: 'https://www.youtube.com/embed/XXXXXXXX',
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: { '@type': 'WatchAction' },
        userInteractionCount: 1250,
      },
      author: {
        '@type': 'Organization',
        name: 'MoroccoVehicles',
      },
    },

    // ============================================
    // 12. SPECIAL ANNOUNCEMENT (New feature/result)
    // ============================================
    {
      '@type': 'SpecialAnnouncement',
      '@id': 'https://moroccovehicles.com/experience/#announcement',
      name: '500 000 véhicules gérés via MoroccoVehicles',
      text: 'MoroccoVehicles vient de franchir le cap des 500 000 véhicules gérés sur sa plateforme, confirmant son leadership sur le marché marocain.',
      datePosted: '2026-02-25',
      expires: '2026-12-31',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      spatialCoverage: {
        '@type': 'Country',
        name: 'Morocco',
      },
    },
  ],
};

export default function ExperiencePage() {
  return (
    <>
      {/* ✅ 2026: Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* ✅ 2026: Semantic HTML wrapper with microdata */}
      <div 
        itemScope 
        itemType="https://schema.org/Article"
        itemID="https://moroccovehicles.com/experience/#article"
      >
        <meta itemProp="headline" content="L'expérience MoroccoVehicles – Transformation digitale des agences de location" />
        <meta itemProp="description" content="Découvrez comment MoroccoVehicles digitalise la gestion de flotte et augmente votre productivité" />
        <meta itemProp="datePublished" content="2023-01-01" />
        <meta itemProp="dateModified" content="2026-02-25" />
        
        {/* Hidden structured data for AI extraction */}
        <div style={{ display: 'none' }} itemProp="author" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="MoroccoVehicles" />
        </div>

        <ExperienceContent />
      </div>
    </>
  );
}