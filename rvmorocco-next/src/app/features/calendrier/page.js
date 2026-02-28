export { metadata } from './seo';
import { jsonLd } from './seo';
import CalendrierClient from './CalendrierClient';

export default function CalendrierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalendrierClient />
    </>
  );
}