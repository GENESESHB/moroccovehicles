import Head from 'next/head';
import AssuranceBlogSection from '@/app/features/assurance/BlogSection';
import Link from 'next/link';

export const metadata = {
  title: "Comment réduire vos coûts d’assurance de flotte en 2026 | Smart Car Location",
  description: "Découvrez les stratégies pour optimiser les primes et gérer les sinistres plus efficacement avec un logiciel dédié.",
  keywords: "gestionair flotte automobile moins chere, blog, assurance"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '20px 20px 0' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginBottom: '10px', transition: 'all 0.3s' }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <AssuranceBlogSection />
    </div>
  );
}
