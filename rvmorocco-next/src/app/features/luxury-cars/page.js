export { metadata } from './seo';
import { jsonLd } from './seo';
import LuxuryCarsClient from './LuxuryCarsClient';

export default function LuxuryCarsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LuxuryCarsClient />
    </>
  );
}