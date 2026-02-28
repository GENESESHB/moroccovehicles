import { metadata, jsonLd } from './seo';
import VehiclesServer from './VehiclesServer';
import VehiclesClient from './VehiclesClient';

export { metadata };

export default function VehiclesPage() {
  return (
    <>
      {/* JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Contenu SEO Server-Side (visible par Googlebot immédiatement) */}
      <VehiclesServer />
      
      {/* Interface interactive Client-Side (hydratation progressive) */}
      <VehiclesClient />
    </>
  );
}