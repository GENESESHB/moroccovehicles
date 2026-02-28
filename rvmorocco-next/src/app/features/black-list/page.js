export { metadata } from './seo';
import { jsonLd } from './seo';
import BlacklistClient from './BlacklistClient';

export default function BlacklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlacklistClient />
    </>
  );
}