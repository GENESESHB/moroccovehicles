import Head from 'next/head';
import LuxurycarsBlogSection from '@/app/features/luxury-cars/BlogSection';
import Link from 'next/link';

export const metadata = {
  title: "Gérer une flotte de luxe : Exigences et rentabilité | Smart Car Location",
  description: "L'entretien, le suivi kilométrique et la sécurité spécifiques aux véhicules haut de gamme.",
  keywords: "gestionair flotte automobile moins chere, blog, luxury cars"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '20px 20px 0' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginBottom: '10px', transition: 'all 0.3s' }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <LuxurycarsBlogSection />
    </div>
  );
}
