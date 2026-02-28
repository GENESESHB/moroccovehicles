export { metadata } from './seo';
import { jsonLd } from './seo';
import FeaturesClient from './FeaturesClient';

export default function FeaturesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FeaturesClient />
        </>
    );
}
