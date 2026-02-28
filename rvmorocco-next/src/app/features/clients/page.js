export { metadata } from './seo';
import { jsonLd } from './seo';
import ClientsClient from './ClientsClient';

export default function ClientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientsClient />
    </>
  );
}