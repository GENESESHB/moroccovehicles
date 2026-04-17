import Head from 'next/head';
import ClientsBlogSection from '@/app/features/clients/BlogSection';
import Link from 'next/link';

export const metadata = {
  title: "Fidélisation client : Le secret de la gestion de base de données | Smart Car Location",
  description: "Créez une relation durable avec vos locataires en centralisant leurs habitudes et préférences.",
  keywords: "gestionair flotte automobile moins chere, blog, clients"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '20px 20px 0' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginBottom: '10px', transition: 'all 0.3s' }}>
              &larr; Retour à tous les articles
          </Link>
      </div>
      <ClientsBlogSection />
    </div>
  );
}
