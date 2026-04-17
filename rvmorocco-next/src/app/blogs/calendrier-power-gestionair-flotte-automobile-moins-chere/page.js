import Head from 'next/head';
import CalendrierBlogSection from '@/app/features/calendrier/BlogSection';
import Link from 'next/link';

export const metadata = {
  title: "Ne perdez plus une seule réservation : Le calendrier unifié | Smart Car Location",
  description: "Maximisez le taux de rotation de vos véhicules grâce à un système de gestion de planning intelligent.",
  keywords: "gestionair flotte automobile moins chere, blog, calendrier"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '20px 20px 0' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginBottom: '10px', transition: 'all 0.3s' }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <CalendrierBlogSection />
    </div>
  );
}
