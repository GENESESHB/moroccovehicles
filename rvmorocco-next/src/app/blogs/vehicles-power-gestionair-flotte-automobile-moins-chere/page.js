import Head from 'next/head';
import VehiclesBlogSection from '@/app/features/vehicles/BlogSection';
import Link from 'next/link';

export const metadata = {
  title: "Optimisation du cycle de vie des véhicules commerciaux | Smart Car Location",
  description: "De l’achat à la revente : comment maximiser la rentabilité de chaque voiture de votre parc.",
  keywords: "gestionair flotte automobile moins chere, blog, vehicles"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '20px 20px 0' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginBottom: '10px', transition: 'all 0.3s' }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <VehiclesBlogSection />
    </div>
  );
}
