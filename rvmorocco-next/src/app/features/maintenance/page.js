export { metadata } from './seo';
import { jsonLd, faqSchema } from './seo';
import MaintenanceClient from './MaintenanceClient';

export default function MaintenancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MaintenanceClient />
    </>
  );
}
