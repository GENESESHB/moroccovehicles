export { metadata } from './seo';
import { jsonLd } from './seo';
import ContractsClient from './ContractsClient';

export default function ContractsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContractsClient />
    </>
  );
}