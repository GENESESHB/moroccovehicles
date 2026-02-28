import ContactForm from './ContactForm';
import styles from './contact.module.css';

// ✅ 2026: Enhanced metadata with AI search optimization
export const metadata = {
  // ✅ 2026: Optimized title with action keywords and geo-targeting
  title: 'Contact – MoroccoVehicles | Démo & Devis Gestion de Flotte Maroc',
  
  // ✅ 2026: Enhanced description with contact intent and local signals
  description: 'Contactez MoroccoVehicles à Casablanca pour une démonstration gratuite ou un devis personnalisé. Notre équipe de conseillers flotte répond sous 24h. Support FR/AR. Tél: +212-XXX-XXXXXX.',
  
  // ✅ 2026: Keywords for AI context extraction
  keywords: [
    'contact MoroccoVehicles',
    'démonstration logiciel flotte Maroc',
    'devis gestion parc automobile',
    'support client Casablanca',
    'contact SaaS fleet management',
    'assistance technique Maroc',
    'rdv présentation MoroccoVehicles',
    'service client gestion flotte'
  ],
  
  // ✅ 2026: Canonical and alternates
  alternates: {
    canonical: 'https://moroccovehicles.com/contact',
    languages: {
      'fr-MA': 'https://moroccovehicles.com/contact',
      'fr-FR': 'https://moroccovehicles.com/fr/contact',
      'ar-MA': 'https://moroccovehicles.com/ar/contact',
      'en-US': 'https://moroccovehicles.com/en/contact',
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
  
  // ✅ 2026: OpenGraph optimized for contact intent
  openGraph: {
    title: 'Contactez MoroccoVehicles – Démo Gratuite & Devis',
    description: 'Parlons de votre projet de digitalisation de flotte. Démonstration personnalisée, devis sur mesure, support technique FR/AR. Basés à Casablanca, intervention sur tout le Maroc.',
    url: 'https://moroccovehicles.com/contact',
    siteName: 'MoroccoVehicles',
    locale: 'fr_FR',
    type: 'website',
    countryName: 'Morocco',
    emails: ['contact@moroccovehicles.com', 'support@moroccovehicles.com', 'sales@moroccovehicles.com'],
    phoneNumbers: ['+212-XXX-XXXXXX', '+212-XXX-XXXXXX'],
    faxNumbers: ['+212-XXX-XXXXXX'],
    images: [
      {
        url: 'https://moroccovehicles.com/images/contact-morocco-vehicles.jpeg',
        width: 1200,
        height: 630,
        alt: 'Équipe support MoroccoVehicles – Contact et assistance client',
        type: 'image/jpeg',
      },
      {
        url: 'https://moroccovehicles.com/images/office-casablanca-team.jpeg',
        width: 800,
        height: 600,
        alt: 'Bureau MoroccoVehicles Casablanca – Équipe commerciale',
      },
    ],
  },
  
  // ✅ 2026: Twitter/X Cards
  twitter: {
    card: 'summary_large_image',
    site: '@moroccovehicles',
    creator: '@moroccovehicles',
    title: 'Contact MoroccoVehicles – Démo & Devis Gratuit',
    description: 'Besoin d\'une solution de gestion de flotte ? Contactez notre équipe à Casablanca. Démo personnalisée et devis sous 24h.',
    images: ['https://moroccovehicles.com/images/contact-morocco-vehicles.jpeg'],
  },
  
  // ✅ 2026: Additional metadata for local SEO and AI extraction
  other: {
    'business:contact_data:street_address': 'Centre Ville',
    'business:contact_data:locality': 'Casablanca',
    'business:contact_data:region': 'Casablanca-Settat',
    'business:contact_data:postal_code': '20000',
    'business:contact_data:country': 'Morocco',
    'business:contact_data:email': 'contact@moroccovehicles.com',
    'business:contact_data:phone_number': '+212-XXX-XXXXXX',
    'geo.region': 'MA',
    'geo.placename': 'Casablanca, Morocco',
    'geo.position': '33.5731;-7.5898',
    'ICBM': '33.5731, -7.5898',
    'og:email': 'contact@moroccovehicles.com',
    'og:phone_number': '+212-XXX-XXXXXX',
    'og:fax_number': '+212-XXX-XXXXXX',
  },
};

// ✅ 2026: Complete JSON-LD Structured Data for Contact Page
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // ============================================
    // 1. CONTACT PAGE (Primary)
    // ============================================
    {
      '@type': 'ContactPage',
      '@id': 'https://moroccovehicles.com/contact/#webpage',
      url: 'https://moroccovehicles.com/contact',
      name: 'Contact – MoroccoVehicles | Démo & Devis Gestion de Flotte',
      headline: 'Contactez MoroccoVehicles',
      description: 'Contactez l\'équipe de MoroccoVehicles pour une démonstration, un devis ou toute question sur notre logiciel de gestion de flotte automobile.',
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
        url: 'https://moroccovehicles.com/images/contact-morocco-vehicles.jpeg',
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        '@id': 'https://moroccovehicles.com/contact/#breadcrumb',
      },
      datePublished: '2023-01-01',
      dateModified: '2026-02-25',
      // ✅ 2026: Speakable for voice search
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.contact-intro', '.contact-info'],
      },
      mainEntity: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
    },

    // ============================================
    // 2. BREADCRUMB LIST
    // ============================================
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://moroccovehicles.com/contact/#breadcrumb',
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
          name: 'Contact',
          item: 'https://moroccovehicles.com/contact',
        },
      ],
    },

    // ============================================
    // 3. ORGANIZATION with Detailed Contact
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
        url: 'https://moroccovehicles.com/images/contact-morocco-vehicles.jpeg',
        width: 1200,
        height: 630,
      },
      // ✅ 2026: SameAs for entity validation
      sameAs: [
        'https://www.linkedin.com/company/moroccovehicles',
        'https://twitter.com/moroccovehicles',
        'https://www.facebook.com/moroccovehicles',
        'https://www.instagram.com/moroccovehicles',
        'https://www.youtube.com/@moroccovehicles',
        'https://github.com/moroccovehicles',
        'https://www.crunchbase.com/organization/moroccovehicles',
      ],
      // ✅ 2026: Complete address
      address: {
        '@type': 'PostalAddress',
        '@id': 'https://moroccovehicles.com/#address',
        streetAddress: 'Centre Ville, Immobilier Bureau',
        addressLocality: 'Casablanca',
        addressRegion: 'Casablanca-Settat',
        postalCode: '20000',
        addressCountry: {
          '@type': 'Country',
          name: 'Morocco',
        },
      },
      // ✅ 2026: Geo coordinates
      geo: {
        '@type': 'GeoCoordinates',
        '@id': 'https://moroccovehicles.com/#geo',
        latitude: 33.5731,
        longitude: -7.5898,
      },
      // ✅ 2026: Multiple contact points
      contactPoint: [
        {
          '@type': 'ContactPoint',
          '@id': 'https://moroccovehicles.com/#contact-sales',
          telephone: '+212-XXX-XXXXXX',
          contactType: 'Ventes',
          email: 'sales@moroccovehicles.com',
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
        {
          '@type': 'ContactPoint',
          '@id': 'https://moroccovehicles.com/#contact-support',
          telephone: '+212-XXX-XXXXXX',
          contactType: 'Support Technique',
          email: 'support@moroccovehicles.com',
          availableLanguage: ['French', 'Arabic', 'English'],
          areaServed: 'MA',
          contactOption: 'TollFree',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
            timeZone: 'Africa/Casablanca',
          },
        },
        {
          '@type': 'ContactPoint',
          '@id': 'https://moroccovehicles.com/#contact-general',
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
      ],
      // ✅ 2026: Opening hours specification
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
          timeZone: 'Africa/Casablanca',
        },
      ],
      // ✅ 2026: Price range
      priceRange: '$$',
      // ✅ 2026: Currencies accepted
      currenciesAccepted: 'MAD',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    },

    // ============================================
    // 4. WEB PAGE (Contact Context)
    // ============================================
    {
      '@type': 'WebPage',
      '@id': 'https://moroccovehicles.com/contact/#webpage-context',
      url: 'https://moroccovehicles.com/contact',
      name: 'Contact MoroccoVehicles',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://moroccovehicles.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://moroccovehicles.com/images/contact-morocco-vehicles.jpeg',
      },
      datePublished: '2023-01-01',
      dateModified: '2026-02-25',
      potentialAction: [
        {
          '@type': 'CommunicateAction',
          name: 'Contacter par email',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'mailto:contact@moroccovehicles.com',
          },
        },
        {
          '@type': 'CommunicateAction',
          name: 'Appeler',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'tel:+212-XXX-XXXXXX',
          },
        },
      ],
    },

    // ============================================
    // 5. FAQ PAGE (Contact FAQs)
    // ============================================
    {
      '@type': 'FAQPage',
      '@id': 'https://moroccovehicles.com/contact/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Comment contacter MoroccoVehicles ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vous pouvez nous contacter par téléphone au +212-XXX-XXXXXX, par email à contact@moroccovehicles.com, ou via le formulaire de contact sur cette page. Notre équipe basée à Casablanca répond sous 24h ouvrées.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quels sont les horaires du support client ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Notre support technique est disponible 24/7 pour les clients. Le service commercial est ouvert du lundi au vendredi de 9h à 18h (heure du Maroc, GMT+1).',
          },
        },
        {
          '@type': 'Question',
          name: 'Proposez-vous des démonstrations gratuites ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui, nous proposons des démonstrations personnalisées gratuites de 30 minutes. Vous pouvez réserver votre créneau via le formulaire de contact ou en appelant directement notre équipe commerciale.',
          },
        },
        {
          '@type': 'Question',
          name: 'Où est situé MoroccoVehicles ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Notre siège social est situé au Centre Ville de Casablanca, Maroc. Nous intervenons sur tout le territoire marocain avec des équipes à Rabat, Marrakech, Tanger et Agadir.',
          },
        },
      ],
    },

    // ============================================
    // 6. HOW TO (Request demo)
    // ============================================
    {
      '@type': 'HowTo',
      '@id': 'https://moroccovehicles.com/contact/#howto',
      name: 'Comment demander une démonstration MoroccoVehicles',
      description: 'Étapes simples pour obtenir une démo personnalisée',
      totalTime: 'PT5M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Remplir le formulaire',
          text: 'Complétez le formulaire de contact avec vos informations et vos besoins.',
          url: 'https://moroccovehicles.com/contact#form',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choisir un créneau',
          text: 'Sélectionnez la date et l\'heure qui vous conviennent pour la démo.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Confirmer le rendez-vous',
          text: 'Recevez la confirmation par email avec le lien de connexion pour la démo en ligne.',
        },
      ],
    },

    // ============================================
    // 7. SERVICE (Contact Service)
    // ============================================
    {
      '@type': 'Service',
      '@id': 'https://moroccovehicles.com/contact/#service',
      name: 'Service Client MoroccoVehicles',
      description: 'Support et assistance pour la gestion de flotte automobile',
      provider: {
        '@type': 'Organization',
        '@id': 'https://moroccovehicles.com/#organization',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Morocco',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services de contact',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Démonstration gratuite',
              description: 'Présentation personnalisée du logiciel',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Devis personnalisé',
              description: 'Estimation sur mesure selon votre flotte',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Support technique',
              description: 'Assistance 24/7 pour les clients',
            },
          },
        ],
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      {/* ✅ 2026: Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* ✅ 2026: Semantic HTML wrapper for ContactForm */}
      <div itemScope itemType="https://schema.org/ContactPage">
        <meta itemProp="name" content="Contact MoroccoVehicles" />
        <meta itemProp="description" content="Page de contact pour démonstration et devis" />
        <meta itemProp="url" content="https://moroccovehicles.com/contact" />
        
        {/* Hidden contact info for AI extraction */}
        <div style={{ display: 'none' }} itemProp="mainEntity" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="MoroccoVehicles" />
          <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <meta itemProp="contactType" content="customer service" />
            <meta itemProp="telephone" content="+212-XXX-XXXXXX" />
            <meta itemProp="email" content="contact@moroccovehicles.com" />
            <meta itemProp="availableLanguage" content="French, Arabic, English" />
          </div>
        </div>

        <ContactForm />
      </div>
    </>
  );
}