import Head from 'next/head';
import MaintenanceBlogSection from '@/app/features/maintenance/BlogSection';
import Link from 'next/link';

export const metadata = {
  title: "Maintenance préventive vs corrective : Quel est le meilleur ROI ? | Smart Car Location",
  description: "Évitez les pannes bloquantes en automatisant les alertes de révision de vos véhicules.",
  keywords: "gestionair flotte automobile moins chere, blog, maintenance"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '20px 20px 0' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginBottom: '10px', transition: 'all 0.3s' }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <MaintenanceBlogSection />
    </div>
  );
}
