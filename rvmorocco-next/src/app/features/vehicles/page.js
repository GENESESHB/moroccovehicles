import { metadata, jsonLd } from './seo';
import VehiclesClient from './VehiclesClient';
import VehiclesServerContent from './VehiclesServer';

export { metadata };

export default function VehiclesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Contenu SEO server-side pour Googlebot */}
      <VehiclesServerContent />
      {/* Interface interactive client-side */}
      <VehiclesClient />
    </>
  );
}