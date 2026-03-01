import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import './globals.css';

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
    phoneNumbers: ['+212622283559'],
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
    'business:contact_data:phone_number': '+212622283559',
  },
};

// ✅ Structured Data WITHOUT FAQPage
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
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
      additionalType: 'https://schema.org/SaaS',
      applicationSuite: 'MoroccoVehicles Fleet Management Suite',
      softwareRequirements: 'Navigateur web moderne (Chrome, Firefox, Safari, Edge)',
      permissions: 'Accès Internet, Géolocalisation (pour tracking)',
      processorRequirements: 'Processeur moderne',
      memoryRequirements: '4 GB RAM minimum',
      storageRequirements: 'Stockage cloud illimité inclus',
      
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
      
      support: {
        '@type': 'ContactPoint',
        contactType: 'Support Client',
        telephone: '+212622283559',
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

    {
      '@type': ['LocalBusiness', 'Organization'],
      '@id': 'https://moroccovehicles.com/#organization',
      name: 'MoroccoVehicles',
      alternateName: 'MoroccoVehicles SARL',
      legalName: 'MoroccoVehicles SARL',
      description: 'Solution digitale de gestion de flotte automobile au Maroc - Logiciel SaaS pour loueurs et entreprises',
      url: 'https://moroccovehicles.com',
      
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
      
      telephone: '+212622283559',
      email: 'contact@moroccovehicles.com',
      
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
        },
      },
      
      geo: {
        '@type': 'GeoCoordinates',
        '@id': 'https://moroccovehicles.com/#geo',
        latitude: 33.5731,
        longitude: -7.5898,
        elevation: '50 meters',
      },
      
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
      
      areaServed: [
        {
          '@type': 'Country',
          name: 'Morocco',
        },
        {
          '@type': 'City',
          name: 'Casablanca',
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
      
      sameAs: [
        'https://www.linkedin.com/company/moroccovehicles',
        'https://twitter.com/moroccovehicles',
        'https://www.facebook.com/moroccovehicles',
        'https://www.instagram.com/moroccovehicles',
        'https://www.youtube.com/@moroccovehicles',
        'https://github.com/moroccovehicles',
      ],
      
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
      
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '15',
        unitText: 'employees',
      },
      
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Support Client',
          telephone: '+212622283559',
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
          telephone: '+212622283559',
          email: 'sales@moroccovehicles.com',
        },
      ],
      
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
    },

    {
      '@type': 'WebSite',
      '@id': 'https://moroccovehicles.com/#website',
      url: 'https://moroccovehicles.com',
      name: 'MoroccoVehicles',
      alternateName: 'MoroccoVehicles Fleet Management',
      description: 'Logiciel de gestion de flotte automobile au Maroc',
      inLanguage: ['fr', 'ar', 'en'],
      
      publisher: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      
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
    },

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
      
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.speakable-title', '.speakable-description'],
      },
      
      breadcrumb: {
        '@type': 'BreadcrumbList',
        '@id': 'https://moroccovehicles.com/#breadcrumb',
      },
      
      potentialAction: {
        '@type': 'ReadAction',
        target: ['https://moroccovehicles.com'],
      },
      
      mainEntity: {
        '@type': 'SoftwareApplication',
        '@id': 'https://moroccovehicles.com/#software',
      },
      
      significantLink: [
        'https://moroccovehicles.com/features',
        'https://moroccovehicles.com/pricing',
        'https://moroccovehicles.com/demo',
      ],
      
      specialty: 'Fleet Management Software',
    },

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
      
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        bestRating: '5',
      },
      
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
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ajouter vos véhicules',
          text: 'Importez votre parc automobile via Excel ou ajoutez les véhicules un par un avec leurs informations.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Configurer le suivi GPS',
          text: 'Installez les boîtiers GPS dans vos véhicules et associez-les à votre compte.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Digitaliser vos contrats',
          text: 'Créez vos premiers contrats de location digitaux et envoyez-les à vos clients pour signature.',
        },
      ],
    },

    {
      '@type': 'VideoObject',
      '@id': 'https://moroccovehicles.com/#video',
      name: 'Présentation MoroccoVehicles - Logiciel de gestion de flotte',
      description: 'Découvrez comment MoroccoVehicles peut transformer la gestion de votre parc automobile au Maroc.',
      thumbnailUrl: 'https://moroccovehicles.com/images/video-thumbnail.jpg',
      contentUrl: 'https://moroccovehicles.com/videos/presentation.mp4',
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
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr-MA" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <meta name="format-detection" content="telephone=yes, date=yes, address=yes, email=yes, url=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MoroccoVehicles" />
        <meta name="application-name" content="MoroccoVehicles" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#0f172a" />
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