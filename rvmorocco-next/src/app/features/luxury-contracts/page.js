export { metadata } from './seo';
import { jsonLd } from './seo';
import LuxuryContractsClient from './LuxuryContractsClient';

export default function LuxuryContractsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LuxuryContractsClient />
    </>
  );
}