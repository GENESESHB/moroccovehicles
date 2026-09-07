// src/app/search/page.js
import { Suspense } from 'react';
import SearchPage from '@/app/components/Booking/SearchPage';

export const metadata = {
  title: 'MoroccoVehicles – Résultats de recherche',
  description: 'Consultez les véhicules disponibles pour votre recherche au Maroc.',
};

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '16px' }}>Chargement des résultats...</div>}>
      <SearchPage />
    </Suspense>
  );
}
