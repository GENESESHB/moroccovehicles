import SupportContent from './SupportContent';
import styles from './support.module.css';

export const metadata = {
  title: 'Support & FAQ – MoroccoVehicles | Aide et assistance 24/7',
  description: 'Centre d’aide MoroccoVehicles : FAQ, support technique par téléphone, email et chat IA 24/7. Trouvez des réponses à vos questions sur la gestion de flotte.',
  openGraph: {
    title: 'Support MoroccoVehicles – Assistance 24/7',
    description: 'Besoin d’aide ? Consultez notre FAQ ou contactez notre équipe support.',
    url: 'https://moroccovehicles.com/support', // ✅ updated domain
    siteName: 'MoroccoVehicles',
    images: [
      {
        url: 'https://moroccovehicles.com/images/support-morocco-vehicles.jpg', // ✅ using your actual image
        width: 1200,
        height: 630,
        alt: 'MoroccoVehicles – Support et FAQ',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function SupportPage() {
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Comment réserver une démonstration de MoroccoVehicles ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vous pouvez réserver une démonstration personnalisée en remplissant le formulaire de contact ou en appelant notre équipe commerciale au +212 5XX XX XX XX. La démo dure environ 30 minutes et couvre tous les modules selon vos besoins."
                }
              },
              {
                "@type": "Question",
                "name": "Puis-je obtenir une facture personnalisée pour mon entreprise ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, MoroccoVehicles génère automatiquement des factures conformes à la législation marocaine. Vous pouvez personnaliser le logo, les mentions légales et le format. Les factures sont disponibles en PDF et peuvent être exportées vers votre logiciel comptable."
                }
              },
              {
                "@type": "Question",
                "name": "Comment modifier ou annuler une réservation de véhicule ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Connectez-vous à votre tableau de bord, accédez au module Calendrier, sélectionnez la réservation concernée et cliquez sur Modifier ou Annuler. Les annulations peuvent être soumises à des conditions selon votre contrat."
                }
              },
              {
                "@type": "Question",
                "name": "Le logiciel fonctionne-t-il hors connexion ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MoroccoVehicles est une solution cloud, mais certaines fonctionnalités comme la consultation des fiches véhicules restent accessibles en mode hors ligne sur notre application mobile. Les données se synchronisent automatiquement dès le retour de la connexion."
                }
              },
              {
                "@type": "Question",
                "name": "Comment fonctionne la Liste Noire et la sécurité ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Notre système de Liste Noire permet d'identifier les clients à risque basé sur l'historique de paiements, incidents ou comportements. Les alertes sont automatiques et partagées avec votre équipe pour sécuriser vos opérations."
                }
              },
              {
                "@type": "Question",
                "name": "Peut-on intégrer MoroccoVehicles avec d'autres logiciels ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, nous proposons une API REST complète pour connecter MoroccoVehicles à vos outils existants (comptabilité, CRM, etc.). Nous supportons également les intégrations natives avec les logiciels les plus utilisés au Maroc."
                }
              }
            ]
          })
        }}
      />
      <SupportContent />
    </>
  );
}