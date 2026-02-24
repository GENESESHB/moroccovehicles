import ExperienceContent from './ExperienceContent';
import styles from './experience.module.css';

export const metadata = {
  title: 'Expérience – MoroccoVehicles | Transformez votre agence de location',
  description: 'Découvrez comment MoroccoVehicles digitalise la gestion de flotte, attire des clients internationaux et augmente votre productivité. Témoignages et avantages.',
  openGraph: {
    title: 'L’expérience MoroccoVehicles',
    description: 'Votre agence mérite mieux que Excel. Découvrez la transformation.',
    url: 'https://moroccovehicles.com/experience', // ✅ updated domain
    siteName: 'MoroccoVehicles',
    images: [
      {
        url: 'https://moroccovehicles.com/images/og-experience.jpg', // ✅ using your actual image
        width: 1200,
        height: 630,
        alt: 'MoroccoVehicles – Expérience client',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function ExperiencePage() {
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "L'expérience MoroccoVehicles",
            "description": "Découvrez comment notre solution transforme la gestion des agences de location au Maroc.",
            "url": "https://moroccovehicles.com/experience", // ✅ updated domain
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Avant / Après",
                  "description": "Comparez la gestion traditionnelle avec MoroccoVehicles"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Témoignages clients",
                  "description": "Retours d'expérience de nos partenaires"
                }
              ]
            }
          })
        }}
      />
      <ExperienceContent />
    </>
  );
}