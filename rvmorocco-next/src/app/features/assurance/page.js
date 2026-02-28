export { metadata } from './seo';
import { jsonLd } from './seo';
import AssuranceClient from './AssuranceClient';

export default function AssurancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AssuranceClient />
    </>
  );
}