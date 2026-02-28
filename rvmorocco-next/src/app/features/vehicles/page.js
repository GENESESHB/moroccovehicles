export { metadata } from './seo';
import { jsonLd } from './seo';
import VehiclesClient from './VehiclesClient';

export default function VehiclesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VehiclesClient />
    </>
  );
}
