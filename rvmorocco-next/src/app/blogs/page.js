import Link from 'next/link';
import styles from './blogs.module.css';

export const metadata = {
  title: 'Blog de Gestion de Flotte | Smart Car Location',
  description: 'Découvrez tous nos guides complets pour optimiser la gestion de votre flotte automobile avec les fonctionnalités avancées de Smart Car Location.',
  keywords: 'gestionair flotte automobile moins chere, blog gestion flotte, optimisation location voiture'
};

const blogs = [
  {
    id: 'assurance',
    title: 'Comment réduire vos coûts d’assurance de flotte en 2026',
    description: "Découvrez les stratégies pour optimiser les primes et gérer les sinistres plus efficacement avec un logiciel dédié.",
    image: '/compressed_videos/insurance.png',
    link: '/blogs/assurance-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'black-list',
    title: 'Protéger votre agence : La puissance d’une liste noire partagée',
    description: "Évitez les mauvais payeurs et les locataires à risque en automatisant la vérification de vos clients.",
    image: '/compressed_videos/lists-noir.png',
    link: '/blogs/black-list-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'calendrier',
    title: 'Ne perdez plus une seule réservation : Le calendrier unifié',
    description: "Maximisez le taux de rotation de vos véhicules grâce à un système de gestion de planning intelligent.",
    image: '/compressed_videos/calander.png',
    link: '/blogs/calendrier-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'clients',
    title: 'Fidélisation client : Le secret de la gestion de base de données',
    description: "Créez une relation durable avec vos locataires en centralisant leurs habitudes et préférences.",
    image: '/compressed_videos/cliens.png',
    link: '/blogs/clients-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'contracts',
    title: 'Zéro papier : Digitalisez vos contrats de location automobile',
    description: "Accélérez vos remises de clés et sécurisez vos données juridiques grâce aux contrats dématérialisés.",
    image: '/compressed_videos/smart-contra-list-components.png',
    link: '/blogs/contracts-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'luxury-cars',
    title: 'Gérer une flotte de luxe : Exigences et rentabilité',
    description: "L'entretien, le suivi kilométrique et la sécurité spécifiques aux véhicules haut de gamme.",
    image: '/compressed_videos/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png',
    link: '/blogs/luxury-cars-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'luxury-contracts',
    title: 'Cautions et contrats premium : Les meilleures pratiques',
    description: "Protégez vos actifs de grande valeur avec des contrats blindés et des garanties adaptées.",
    image: '/compressed_videos/niveau-reservoir-select-d-avence-en-debut-de-location.png',
    link: '/blogs/luxury-contracts-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'maintenance',
    title: 'Maintenance préventive vs corrective : Quel est le meilleur ROI ?',
    description: "Évitez les pannes bloquantes en automatisant les alertes de révision de vos véhicules.",
    image: '/compressed_videos/maintenance.png',
    link: '/blogs/maintenance-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'overview',
    title: 'Indicateurs clés : Analysez les performances de votre flotte',
    description: "Prenez de meilleures décisions grâce aux tableaux de bord analytiques globaux.",
    image: '/compressed_videos/chart-graphique-in-overview-part.png',
    link: '/blogs/overview-power-gestionair-flotte-automobile-moins-chere'
  },
  {
    id: 'vehicles',
    title: 'Optimisation du cycle de vie des véhicules commerciaux',
    description: "De l’achat à la revente : comment maximiser la rentabilité de chaque voiture de votre parc.",
    image: '/compressed_videos/add-vehicle-form-and-list-management-status-cars.png',
    link: '/blogs/vehicles-power-gestionair-flotte-automobile-moins-chere'
  }
,
  {
    id: "login-security",
    title: "Sécurisez votre agence : Gestion des accès et connexion",
    description: "Protégez vos données sensibles avec une architecture de connexion imperméable et un portail de configuration avancé.",
    image: "/compressed_videos/login-form.png",
    link: "/blogs/login-security-power-gestionair-flotte-automobile-moins-chere"
  },
  {
    id: "partenaires-b2b",
    title: "Développer votre réseau : Le portail partenaire B2B",
    description: "Automatisez la création de nouveaux partenariats et élargissez votre flotte grâce au formulaire d'acquisition web B2B.",
    image: "/compressed_videos/devenaire-partenaire-form.png",
    link: "/blogs/partenaires-b2b-power-gestionair-flotte-automobile-moins-chere"
  },
  {
    id: "finances-rentabilite",
    title: "Rentabilité maximale : Simuler et calculer vos revenus",
    description: "Utilisez notre calculateur de revenus intégré pour projeter votre bilan trimestriel et maximiser les marges de votre parc.",
    image: "/compressed_videos/calculateur-de-revenu.png",
    link: "/blogs/finances-rentabilite-power-gestionair-flotte-automobile-moins-chere"
  }
];

export default function BlogsPage() {
  return (
    <div className={styles.blogsPageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.containerContent}>
          <div className={styles.heroContent}>
            <h1>Notre Blog Expert</h1>
            <p>
              Parcourez nos conseils et guides pour devenir un véritable gestionnaire de flotte automobile. 
              Découvrez la manière la plus efficace d'obtenir un <strong>gestionair flotte automobile moins chere</strong> et plus intelligent.
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className={styles.blogsListSection}>
        <div className={styles.containerContent}>
          <div className={styles.grid}>
            {blogs.map((blog) => (
              <div key={blog.id} className={styles.blogCard}>
                <div className={styles.imageContainer}>
                  {/* Using standard img to support external absolute URLs like Unsplash safely */}
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className={styles.blogImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className={styles.blogCategory}>Module de gestion</div>
                </div>
                <div className={styles.blogContent}>
                  <h2 className={styles.blogTitle}>
                    <Link href={blog.link}>{blog.title}</Link>
                  </h2>
                  <p className={styles.blogExcerpt}>{blog.description}</p>
                  <div className={styles.blogFooter}>
                    <span className={styles.readTime}>10 min de lecture</span>
                    <Link href={blog.link} className={styles.readMore}>
                      Lire l'article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
