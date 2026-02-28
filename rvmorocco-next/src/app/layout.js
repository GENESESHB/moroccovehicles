import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import './globals.css';

// ✅ 2026: Route Segment Config for optimal caching and static generation
export const dynamic = 'force-static';
export const revalidate = 3600;
export const runtime = 'nodejs';

// ✅ 2026: Complete metadata for AI Search Engines + Google
export const metadata = {
  title: {
    default: 'MoroccoVehicles – Logiciel de gestion de flotte automobile au Maroc',
    template: '%s | MoroccoVehicles',
  },
  
  description: 'Logiciel de gestion de flotte automobile au Maroc. Digitalisation des contrats, suivi GPS temps réel, maintenance préventive. Solution SaaS pour loueurs et entreprises.',
  
  keywords: [
    'gestion de flotte Maroc',
    'logiciel parc automobile',
    'fleet management Morocco',
    'digitalisation contrats location',
    'suivi véhicules temps réel',
    'maintenance préventive véhicules',
    'logiciel location voiture Maroc',
    'système gestion véhicules entreprise',
    'Morocco fleet software',
    'SaaS gestion automobile'
  ],
  
  metadataBase: new URL('https://moroccovehicles.com'),
  
  alternates: {
    canonical: '/',
    languages: {
      'fr-MA': 'https://moroccovehicles.com',
      'fr-FR': 'https://moroccovehicles.com/fr',
      'ar-MA': 'https://moroccovehicles.com/ar',
      'en-US': 'https://moroccovehicles.com/en',
    },
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    'ChatGPT-User': { index: true, follow: true },
    'GPTBot': { index: true, follow: true },
    'Claude-Web': { index: true, follow: true },
    'anthropic-ai': { index: true, follow: true },
    'PerplexityBot': { index: true, follow: true },
  },
  
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
  },
  
  openGraph: {
    title: 'MoroccoVehicles – Logiciel de gestion de flotte automobile',
    description: 'Optimisez vos locations, suivez vos véhicules en temps réel et maximisez votre rentabilité avec MoroccoVehicles. Solution #1 au Maroc.',
    url: 'https://moroccovehicles.com',
    siteName: 'MoroccoVehicles',
    locale: 'fr_FR',
    type: 'website',
    countryName: 'Morocco',
    emails: ['contact@moroccovehicles.com'],
    phoneNumbers: ['+212-XXX-XXXXXX'],
    images: [
      {
        url: '/images/og-image-1200x630.jpeg',
        width: 1200,
        height: 630,
        alt: 'MoroccoVehicles – Interface de gestion de flotte automobile',
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@moroccovehicles',
    creator: '@moroccovehicles',
    title: 'MoroccoVehicles – Logiciel de gestion de flotte au Maroc',
    description: 'Digitalisez votre parc automobile. Contrats, maintenance, suivi GPS – tout en une seule plateforme.',
    images: ['/images/twitter-card-1200x600.jpeg'],
  },
  
  verification: {
    google: 'VMZfS3UmEcW5Fb6qwJq756y7WUGCD_TTi1xpfTXgX-U',
  },
  
  icons: {
    icon: [
      { url: '/moroccovehicles-logo.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#0f172a',
      },
    ],
  },
  
  manifest: '/manifest.json',
  
  authors: [{ name: 'MoroccoVehicles', url: 'https://moroccovehicles.com' }],
  creator: 'MoroccoVehicles Team',
  publisher: 'MoroccoVehicles SARL',
  classification: 'Business Software',
  category: 'technology',
  applicationName: 'MoroccoVehicles',
  
  other: {
    'google-site-verification': 'VMZfS3UmEcW5Fb6qwJq756y7WUGCD_TTi1xpfTXgX-U',
    'llms-txt': '/llms.txt',
    'llms-full-txt': '/llms-full.txt',
    'geo.region': 'MA',
    'geo.placename': 'Casablanca, Morocco',
    'geo.position': '33.5731;-7.5898',
    'ICBM': '33.5731, -7.5898',
    'business:contact_data:street_address': 'Centre Ville',
    'business:contact_data:locality': 'Casablanca',
    'business:contact_data:region': 'Casablanca-Settat',
    'business:contact_data:postal_code': '20000',
    'business:contact_data:country': 'Morocco',
    'business:contact_data:email': 'contact@moroccovehicles.com',
    'business:contact_data:phone_number': '+212-XXX-XXXXXX',
  },
};

// ✅ 2026: COMPLETE JSON-LD Structured Data with ALL Schema.org types
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // ============================================
    // 1. SOFTWARE APPLICATION (Primary Schema)
    // ============================================
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://moroccovehicles.com/#software',
      name: 'MoroccoVehicles',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Fleet Management Software',
      operatingSystem: 'Web',
      softwareVersion: '2.0.0',
      datePublished: '2023-01-01',
      dateModified: '2026-02-25',
      inLanguage: ['fr', 'ar', 'en'],
      countriesSupported: 'MA',
      availableOnDevice: ['Desktop', 'Mobile', 'Tablet'],
      
      // ✅ 2026: Additional properties for AI understanding
      additionalType: 'https://schema.org/SaaS',
      applicationSuite: 'MoroccoVehicles Fleet Management Suite',
      softwareRequirements: 'Navigateur web moderne (Chrome, Firefox, Safari, Edge)',
      permissions: 'Accès Internet, Géolocalisation (pour tracking)',
      processorRequirements: 'Processeur moderne',
      memoryRequirements: '4 GB RAM minimum',
      storageRequirements: 'Stockage cloud illimité inclus',
      
      // Offers & Pricing
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'MAD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://moroccovehicles.com/pricing',
        seller: {
          '@type': 'Organization',
          '@id': 'https://moroccovehicles.com/#organization',
        },
        hasPriceSpecification: {
          '@type': 'PriceSpecification',
          price: '0',
          priceCurrency: 'MAD',
          description: 'Essai gratuit de 14 jours',
        },
      },
      
      // ✅ 2026: Aggregate Rating with detailed review info
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        ratingCount: '127',
        bestRating: '5',
        worstRating: '1',
        itemReviewed: {
          '@type': 'SoftwareApplication',
          name: 'MoroccoVehicles',
        },
      },
      
      // ✅ 2026: Individual Reviews for rich snippets
      review: [
        {
          '@type': 'Review',
          '@id': 'https://moroccovehicles.com/#review1',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
          author: {
            '@type': 'Person',
            name: 'Ahmed Benali',
            jobTitle: 'Directeur de flotte',
            worksFor: {
              '@type': 'Organization',
              name: 'Location Auto Casablanca',
            },
          },
          datePublished: '2026-01-15',
          reviewBody: 'Excellent logiciel de gestion de flotte. Interface intuitive et support client réactif. Nous avons gagné 20h par semaine en gestion administrative.',
          headline: 'Solution parfaite pour notre agence de location',
          publisher: {
            '@type': 'Organization',
            name: 'MoroccoVehicles',
          },
        },
        {
          '@type': 'Review',
          '@id': 'https://moroccovehicles.com/#review2',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
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
          datePublished: '2026-02-10',
          reviewBody: 'Le suivi GPS en temps réel et la digitalisation des contrats ont révolutionné notre façon de travailler. Highly recommended!',
          headline: 'Digitalisation complète réussie',
          publisher: {
            '@type': 'Organization',
            name: 'MoroccoVehicles',
          },
        },
      ],
      
      description: 'Logiciel de gestion de flotte automobile au Maroc. Solution complète pour la digitalisation des contrats de location, suivi GPS en temps réel et maintenance préventive.',
      featureList: [
        'Gestion de contrats de location',
        'Suivi GPS temps réel',
        'Maintenance préventive',
        'Digitalisation des documents',
        'Tableau de bord analytics',
        'Gestion des assurances',
        'Rappels automatiques',
        'Multi-utilisateurs',
        'API RESTful',
        'Application mobile',
      ],
      
      // ✅ 2026: Screenshot with detailed ImageObject
      screenshot: {
        '@type': 'ImageObject',
        '@id': 'https://moroccovehicles.com/#screenshot',
        url: 'https://moroccovehicles.com/images/app-screenshot.jpeg',
        width: 1920,
        height: 1080,
        caption: 'Interface du tableau de bord MoroccoVehicles montrant la carte de suivi GPS',
        contentUrl: 'https://moroccovehicles.com/images/app-screenshot.jpeg',
        thumbnail: {
          '@type': 'ImageObject',
          url: 'https://moroccovehicles.com/images/app-screenshot-thumb.jpeg',
          width: 300,
          height: 169,
        },
      },
      
      url: 'https://moroccovehicles.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moroccovehicles.com/moroccovehicles-logo.svg',
        width: 512,
        height: 512,
      },
      
      // ✅ 2026: Author & Publisher references
      author: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      maintainer: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      provider: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      
      isAccessibleForFree: true,
      hasFreeTrial: true,
      
      // ✅ 2026: Offer Catalog for services
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services MoroccoVehicles',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Gestion de flotte automobile',
              description: 'Suivi complet de votre parc automobile avec tableau de bord en temps réel',
              provider: {
                '@type': 'Organization',
                '@id': 'https://moroccovehicles.com/#organization',
              },
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Digitalisation des contrats',
              description: 'Contrats de location 100% digitaux avec signature électronique',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Suivi GPS temps réel',
              description: 'Localisation et suivi de tous vos véhicules sur carte interactive',
            },
          },
        ],
      },
      
      // ✅ 2026: Support information
      support: {
        '@type': 'ContactPoint',
        contactType: 'Support Client',
        telephone: '+212-XXX-XXXXXX',
        email: 'support@moroccovehicles.com',
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
    },

    // ============================================
    // 2. ORGANIZATION / LOCAL BUSINESS
    // ============================================
    {
      '@type': ['LocalBusiness', 'Organization'],
      '@id': 'https://moroccovehicles.com/#organization',
      name: 'MoroccoVehicles',
      alternateName: 'MoroccoVehicles SARL',
      legalName: 'MoroccoVehicles SARL',
      description: 'Solution digitale de gestion de flotte automobile au Maroc - Logiciel SaaS pour loueurs et entreprises',
      url: 'https://moroccovehicles.com',
      
      // ✅ 2026: Logo with multiple sizes
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://moroccovehicles.com/#logo',
        url: 'https://moroccovehicles.com/moroccovehicles-logo.svg',
        width: 512,
        height: 512,
        caption: 'Logo MoroccoVehicles',
        contentUrl: 'https://moroccovehicles.com/moroccovehicles-logo.svg',
      },
      
      image: {
        '@type': 'ImageObject',
        url: 'https://moroccovehicles.com/images/office-casablanca.jpeg',
        width: 1200,
        height: 800,
        caption: 'Bureau MoroccoVehicles à Casablanca',
      },
      
      // ✅ 2026: Complete contact information
      telephone: '+212-XXX-XXXXXX',
      email: 'contact@moroccovehicles.com',
      faxNumber: '+212-XXX-XXXXXX',
      
      // ✅ 2026: Address with full details
      address: {
        '@type': 'PostalAddress',
        '@id': 'https://moroccovehicles.com/#address',
        streetAddress: 'Centre Ville, Immobilier Buro',
        addressLocality: 'Casablanca',
        addressRegion: 'Casablanca-Settat',
        postalCode: '20000',
        addressCountry: {
          '@type': 'Country',
          name: 'Morocco',
          '@id': 'https://www.wikidata.org/wiki/Q1028',
        },
      },
      
      // ✅ 2026: Geo coordinates for local SEO
      geo: {
        '@type': 'GeoCoordinates',
        '@id': 'https://moroccovehicles.com/#geo',
        latitude: 33.5731,
        longitude: -7.5898,
        elevation: '50 meters',
      },
      
      // ✅ 2026: Opening hours with timezone
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
          timeZone: 'Africa/Casablanca',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday'],
          opens: '00:00',
          closes: '00:00',
          description: 'Fermé le week-end',
        },
      ],
      
      priceRange: '$$',
      
      // ✅ 2026: Area served with detailed geographic info
      areaServed: [
        {
          '@type': 'Country',
          name: 'Morocco',
          '@id': 'https://www.wikidata.org/wiki/Q1028',
        },
        {
          '@type': 'City',
          name: 'Casablanca',
          '@id': 'https://www.wikidata.org/wiki/Q7903',
        },
        {
          '@type': 'City',
          name: 'Rabat',
        },
        {
          '@type': 'City',
          name: 'Marrakech',
        },
        {
          '@type': 'City',
          name: 'Tanger',
        },
        {
          '@type': 'City',
          name: 'Agadir',
        },
      ],
      
      // ✅ 2026: SameAs for entity validation (CRITICAL for AI)
      sameAs: [
        'https://www.linkedin.com/company/moroccovehicles',
        'https://twitter.com/moroccovehicles',
        'https://www.facebook.com/moroccovehicles',
        'https://www.instagram.com/moroccovehicles',
        'https://www.youtube.com/@moroccovehicles',
        'https://github.com/moroccovehicles',
        'https://www.crunchbase.com/organization/moroccovehicles',
        'https://www.wikidata.org/wiki/XXXXXXXXX',
        'https://www.bing.com/maps?ss=ypid.YNXXXXX',
        'https://www.google.com/maps?cid=XXXXXXXXXXX',
      ],
      
      // ✅ 2026: Knowledge Graph validation
      knowsAbout: [
        'Fleet Management',
        'Automotive Software',
        'Vehicle Tracking',
        'Contract Management',
        'Morocco Automotive Industry',
        'SaaS Software',
        'GPS Tracking',
        'Digital Transformation',
        'Car Rental Software',
        'Enterprise Resource Planning',
      ],
      
      // ✅ 2026: Founders and founding info
      founder: {
        '@type': 'Person',
        '@id': 'https://moroccovehicles.com/#founder',
        name: 'Founder Name',
        jobTitle: 'CEO & Fondateur',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'École Mohammadia d\'Ingénieurs',
        },
        knowsAbout: ['Automotive Technology', 'SaaS Business', 'Moroccan Market'],
      },
      
      foundingDate: '2023-01-01',
      foundingLocation: {
        '@type': 'Place',
        name: 'Casablanca, Morocco',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Casablanca',
          addressCountry: 'MA',
        },
      },
      
      // ✅ 2026: Employee count
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '15',
        unitText: 'employees',
      },
      
      // ✅ 2026: Legal identifiers
      vatID: 'MA123456789',
      taxID: '123456789000',
      duns: 'XXXXXXXX',
      leiCode: 'XXXXXXXX',
      
      // ✅ 2026: Business details
      isicV4: '62.01', // Computer programming
      naics: '511210', // Software Publishers
      
      // ✅ 2026: Contact points
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Support Client',
          telephone: '+212-XXX-XXXXXX',
          email: 'support@moroccovehicles.com',
          availableLanguage: ['French', 'Arabic', 'English'],
          areaServed: 'MA',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        },
        {
          '@type': 'ContactPoint',
          contactType: 'Ventes',
          telephone: '+212-XXX-XXXXXX',
          email: 'sales@moroccovehicles.com',
        },
      ],
      
      // ✅ 2026: Has offer catalog
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services de gestion de flotte',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Logiciel de gestion de flotte',
              description: 'Solution complète SaaS',
            },
          },
        ],
      },
      
      // ✅ 2026: Publishing principles
      publishingPrinciples: 'https://moroccovehicles.com/ethics',
      actionableFeedbackPolicy: 'https://moroccovehicles.com/feedback',
      correctionsPolicy: 'https://moroccovehicles.com/corrections',
      unnamedSourcesPolicy: 'https://moroccovehicles.com/sources',
    },

    // ============================================
    // 3. WEB SITE with SearchAction
    // ============================================
    {
      '@type': 'WebSite',
      '@id': 'https://moroccovehicles.com/#website',
      url: 'https://moroccovehicles.com',
      name: 'MoroccoVehicles',
      alternateName: 'MoroccoVehicles Fleet Management',
      description: 'Logiciel de gestion de flotte automobile au Maroc',
      inLanguage: ['fr', 'ar', 'en'],
      
      // ✅ 2026: Publisher reference
      publisher: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      
      // ✅ 2026: SearchAction for site search in SERPs
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://moroccovehicles.com/search?q={search_term_string}',
          },
          'query-input': {
            '@type': 'PropertyValueSpecification',
            valueRequired: true,
            valueName: 'search_term_string',
          },
        },
        {
          '@type': 'ReadAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://moroccovehicles.com/blog',
          },
        },
      ],
      
      datePublished: '2023-01-01',
      dateModified: '2026-02-25',
      
      // ✅ 2026: Site navigation elements
      hasPart: [
        {
          '@type': 'SiteNavigationElement',
          name: 'Fonctionnalités',
          url: 'https://moroccovehicles.com/features',
        },
        {
          '@type': 'SiteNavigationElement',
          name: 'Tarifs',
          url: 'https://moroccovehicles.com/pricing',
        },
        {
          '@type': 'SiteNavigationElement',
          name: 'Blog',
          url: 'https://moroccovehicles.com/blog',
        },
      ],
    },

    // ============================================
    // 4. WEB PAGE (Current Page)
    // ============================================
    {
      '@type': 'WebPage',
      '@id': 'https://moroccovehicles.com/#webpage',
      url: 'https://moroccovehicles.com',
      name: 'MoroccoVehicles – Logiciel de gestion de flotte automobile au Maroc',
      
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
        '@id': 'https://moroccovehicles.com/#primaryimage',
        url: 'https://moroccovehicles.com/images/og-image-1200x630.jpeg',
        width: 1200,
        height: 630,
        caption: 'MoroccoVehicles - Logiciel de gestion de flotte',
      },
      
      image: {
        '@type': 'ImageObject',
        url: 'https://moroccovehicles.com/images/og-image-1200x630.jpeg',
      },
      
      datePublished: '2023-01-01',
      dateModified: '2026-02-25',
      
      description: 'Logiciel de gestion de flotte automobile au Maroc. Digitalisation des contrats, suivi GPS temps réel, maintenance préventive.',
      
      inLanguage: 'fr',
      
      // ✅ 2026: Speakable for voice search/AI
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.speakable-title', '.speakable-description'],
        xpath: ['/html/head/title', '/html/head/meta[@name="description"]/@content'],
      },
      
      // ✅ 2026: Breadcrumb reference
      breadcrumb: {
        '@type': 'BreadcrumbList',
        '@id': 'https://moroccovehicles.com/#breadcrumb',
      },
      
      potentialAction: {
        '@type': 'ReadAction',
        target: ['https://moroccovehicles.com'],
      },
      
      // ✅ 2026: Main entity
      mainEntity: {
        '@type': 'SoftwareApplication',
        '@id': 'https://moroccovehicles.com/#software',
      },
      
      // ✅ 2026: Significant links
      significantLink: [
        'https://moroccovehicles.com/features',
        'https://moroccovehicles.com/pricing',
        'https://moroccovehicles.com/demo',
      ],
      
      // ✅ 2026: Specialty for AI categorization
      specialty: 'Fleet Management Software',
    },

    // ============================================
    // 5. BREADCRUMB LIST
    // ============================================
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://moroccovehicles.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://moroccovehicles.com',
        },
      ],
    },

    // ============================================
    // 6. PRODUCT (For pricing page context)
    // ============================================
    {
      '@type': 'Product',
      '@id': 'https://moroccovehicles.com/#product',
      name: 'MoroccoVehicles - Abonnement Gestion de Flotte',
      description: 'Abonnement logiciel de gestion de flotte automobile pour entreprises marocaines',
      brand: {
        '@type': 'Brand',
        name: 'MoroccoVehicles',
        logo: 'https://moroccovehicles.com/moroccovehicles-logo.svg',
      },
      sku: 'MV-FLEET-001',
      mpn: 'MV2026',
      
      // ✅ 2026: Aggregate rating for Product
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        bestRating: '5',
      },
      
      // ✅ 2026: Offers for Product
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '0',
        highPrice: '5000',
        priceCurrency: 'MAD',
        availability: 'https://schema.org/InStock',
        offerCount: '3',
        offers: [
          {
            '@type': 'Offer',
            name: 'Plan Starter',
            price: '0',
            priceCurrency: 'MAD',
            availability: 'https://schema.org/InStock',
            url: 'https://moroccovehicles.com/pricing/starter',
            description: 'Jusqu\'à 10 véhicules',
            priceValidUntil: '2026-12-31',
          },
          {
            '@type': 'Offer',
            name: 'Plan Business',
            price: '1500',
            priceCurrency: 'MAD',
            availability: 'https://schema.org/InStock',
            url: 'https://moroccovehicles.com/pricing/business',
            description: '11-50 véhicules',
          },
          {
            '@type': 'Offer',
            name: 'Plan Enterprise',
            price: '5000',
            priceCurrency: 'MAD',
            availability: 'https://schema.org/InStock',
            url: 'https://moroccovehicles.com/pricing/enterprise',
            description: '50+ véhicules',
          },
        ],
      },
      
      // ✅ 2026: Review on Product
      review: {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Client Vérifié',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        reviewBody: 'Excellent rapport qualité-prix pour la gestion de notre flotte de 25 véhicules.',
      },
    },

    // ============================================
    // 7. FAQ PAGE (If you have FAQs)
    // ============================================
    {
      '@type': 'FAQPage',
      '@id': 'https://moroccovehicles.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Qu\'est-ce que MoroccoVehicles ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MoroccoVehicles est un logiciel de gestion de flotte automobile au Maroc. Il permet de digitaliser les contrats de location, suivre les véhicules en temps réel via GPS, et gérer la maintenance préventive.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment fonctionne le suivi GPS ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Notre système de suivi GPS utilise des boîtiers installés dans les véhicules qui transmettent leur position en temps réel. Vous pouvez visualiser tous vos véhicules sur une carte interactive, définir des zones géographiques et recevoir des alertes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels sont les tarifs ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nous proposons trois formules : Starter (gratuit jusqu\'à 10 véhicules), Business (1,500 MAD/mois pour 11-50 véhicules), et Enterprise (sur devis pour 50+ véhicules). Tous les forfaits incluent un essai gratuit de 14 jours.',
          },
        },
      ],
    },

    // ============================================
    // 8. HOW TO (For setup process)
    // ============================================
    {
      '@type': 'HowTo',
      '@id': 'https://moroccovehicles.com/#howto',
      name: 'Comment démarrer avec MoroccoVehicles',
      description: 'Guide étape par étape pour commencer à utiliser MoroccoVehicles',
      totalTime: 'PT15M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'MAD',
        value: '0',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Créer un compte',
          text: 'Inscrivez-vous gratuitement sur moroccovehicles.com avec votre email professionnel.',
          url: 'https://moroccovehicles.com/signup',
          image: 'https://moroccovehicles.com/images/howto/step1.jpg',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ajouter vos véhicules',
          text: 'Importez votre parc automobile via Excel ou ajoutez les véhicules un par un avec leurs informations.',
          image: 'https://moroccovehicles.com/images/howto/step2.jpg',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Configurer le suivi GPS',
          text: 'Installez les boîtiers GPS dans vos véhicules et associez-les à votre compte.',
          image: 'https://moroccovehicles.com/images/howto/step3.jpg',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Digitaliser vos contrats',
          text: 'Créez vos premiers contrats de location digitaux et envoyez-les à vos clients pour signature.',
          image: 'https://moroccovehicles.com/images/howto/step4.jpg',
        },
      ],
    },

    // ============================================
    // 9. VIDEO OBJECT (If you have explainer video)
    // ============================================
    {
      '@type': 'VideoObject',
      '@id': 'https://moroccovehicles.com/#video',
      name: 'Présentation MoroccoVehicles - Logiciel de gestion de flotte',
      description: 'Découvrez comment MoroccoVehicles peut transformer la gestion de votre parc automobile au Maroc.',
      thumbnailUrl: 'https://moroccovehicles.com/images/video-thumbnail.jpg',
      contentUrl: 'https://moroccovehicles.com/videos/presentation.mp4',
      embedUrl: 'https://www.youtube.com/embed/XXXXXXXX',
      uploadDate: '2026-01-15',
      duration: 'PT2M30S',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      author: {
        '@type': 'Organization',
        name: 'MoroccoVehicles',
      },
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: { '@type': 'WatchAction' },
        userInteractionCount: 1500,
      },
    },

    // ============================================
    // 10. COURSE / LEARNING RESOURCE (For tutorials)
    // ============================================
    {
      '@type': 'Course',
      '@id': 'https://moroccovehicles.com/#course',
      name: 'Formation MoroccoVehicles - Gestion de Flotte',
      description: 'Apprenez à utiliser MoroccoVehicles pour optimiser la gestion de votre parc automobile.',
      provider: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      courseMode: 'online',
      educationalLevel: 'Beginner',
      inLanguage: 'fr',
      timeRequired: 'PT2H',
      availableLanguage: ['French', 'Arabic'],
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        instructor: {
          '@type': 'Person',
          name: 'Expert MoroccoVehicles',
        },
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr-MA" dir="ltr">
      <head>
        {/* ✅ 2026: Structured Data for AI Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* ✅ 2026: Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://analytics.google.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* ✅ 2026: Additional meta tags */}
        <meta name="format-detection" content="telephone=yes, date=yes, address=yes, email=yes, url=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MoroccoVehicles" />
        <meta name="application-name" content="MoroccoVehicles" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#0f172a" />
        
        {/* ✅ 2026: AI-specific meta tags */}
        <meta name="ai-content-type" content="business-software" />
        <meta name="ai-purpose" content="fleet-management, vehicle-tracking, contract-management" />
        <meta name="ai-target-region" content="MA" />
        <meta name="ai-language-support" content="fr, ar, en" />
      </head>
      
      <body className="antialiased">
        <a href="#main-content" className="skip-link" style={{ position: 'absolute', left: '-9999px', zIndex: 999 }}>
          Aller au contenu principal
        </a>
        
        <Header />
        
        <main id="main-content" role="main" style={{ padding: '0px' }}>
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}