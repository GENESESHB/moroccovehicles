import Head from 'next/head';
import ContractsBlogSection from '@/app/features/contracts/BlogSection';
import Link from 'next/link';

export const metadata = {
  title: "Zéro papier : Digitalisez vos contrats de location automobile | Smart Car Location",
  description: "Accélérez vos remises de clés et sécurisez vos données juridiques grâce aux contrats dématérialisés.",
  keywords: "gestionair flotte automobile moins chere, blog, contracts"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '20px 20px 0' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginBottom: '10px', transition: 'all 0.3s' }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <ContractsBlogSection />
    </div>
  );
}
