import ContactForm from './ContactForm';
import styles from './contact.module.css';

export const metadata = {
  title: 'Contact – MoroccoVehicles | Logiciel de gestion de flotte au Maroc',
  description: 'Contactez l’équipe de MoroccoVehicles pour une démonstration, un devis ou toute question sur notre logiciel de gestion de flotte automobile.',
  openGraph: {
    title: 'Contactez MoroccoVehicles',
    description: 'Parlons de votre projet de digitalisation de flotte.',
    url: 'https://moroccovehicles.com/contact', // ✅ updated domain
    siteName: 'MoroccoVehicles',
    images: [
      {
        url: 'https://moroccovehicles.com/images/contact-morocco-vehicles.jpeg', // ✅ using one of your actual images
        width: 1200,
        height: 630,
        alt: 'MoroccoVehicles – Contact',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact MoroccoVehicles",
            "description": "Page de contact de MoroccoVehicles",
            "url": "https://moroccovehicles.com/contact", // ✅ updated domain
            "mainEntity": {
              "@type": "Organization",
              "name": "MoroccoVehicles",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+212-5XX-XXXXXX", // 🔁 replace with your actual number
                "contactType": "customer service",
                "availableLanguage": ["French", "Arabic"]
              }
            }
          })
        }}
      />

      <ContactForm />
    </>
  );
}