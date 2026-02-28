export { metadata } from './seo';
import { jsonLd } from './seo';
import OverviewClient from './OverviewClient';

export default function OverviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OverviewClient />
    </>
  );
}
