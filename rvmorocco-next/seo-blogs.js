const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'src/app/features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

const keyword = "gestionair flotte automobile moins chere";

features.forEach(featureDir => {
    const fullDir = path.join(featuresDir, featureDir);
    const seoFile = path.join(fullDir, 'seo.js');
    
    if (fs.existsSync(seoFile)) {
        let seoContent = fs.readFileSync(seoFile, 'utf8');
        let modified = false;

        // 1. Add keyword to metadata.keywords
        if (!seoContent.includes(keyword)) {
            // Find "keywords: [" and insert the keyword right after it
            const keywordsRegex = /keywords:\s*\[/;
            if (keywordsRegex.test(seoContent)) {
                seoContent = seoContent.replace(
                    keywordsRegex, 
                    `keywords: [\n        "${keyword}",`
                );
                modified = true;
            }
        }

        // 2. Add BlogPosting schema to jsonLd
        // Check if jsonLd is an object (starts with {) and not an array
        if (seoContent.includes("export const jsonLd = {") && !seoContent.includes('"@type": "BlogPosting"')) {
            const featureDisplayName = featureDir.replace(/-/g, ' ').toUpperCase();
            
            // We'll wrap the existing jsonLd object in an array and add the BlogPosting object
            const blogSchema = `{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Guide Complet : Maîtrisez le module de ${featureDisplayName}",
    "image": "https://moroccovehicles.com/images/fleet_management_blog_hero.png",
    "wordcount": "1000",
    "keywords": "${keyword}",
    "author": {
        "@type": "Organization",
        "name": "Smart Car Location"
    }
}`;
            
            seoContent = seoContent.replace(
                "export const jsonLd = {",
                `export const jsonLd = [\n  {`
            );
            
            // we need to replace the last }; of jsonLd with }, blogSchema ];
            // Since it's at the end of the file typically:
            const lastBraceIndex = seoContent.lastIndexOf("};");
            if (lastBraceIndex !== -1) {
                seoContent = seoContent.substring(0, lastBraceIndex) + 
                             `  },\n  ${blogSchema}\n];` + 
                             seoContent.substring(lastBraceIndex + 2);
                modified = true;
            }
        } else if (seoContent.includes("export const jsonLd = [") && !seoContent.includes('"@type": "BlogPosting"')) {
             // If it's already an array but no BlogPosting (from previous runs)
             // We can insert the blog schema before the final ];
             const featureDisplayName = featureDir.replace(/-/g, ' ').toUpperCase();
             const blogSchema = `,\n  {\n    "@context": "https://schema.org",\n    "@type": "BlogPosting",\n    "headline": "Guide Complet : Maîtrisez le module de ${featureDisplayName}",\n    "image": "https://moroccovehicles.com/images/fleet_management_blog_hero.png",\n    "wordcount": "1000",\n    "keywords": "${keyword}",\n    "author": {\n        "@type": "Organization",\n        "name": "Smart Car Location"\n    }\n  }`;
             
             const lastBracketIndex = seoContent.lastIndexOf("];");
             if (lastBracketIndex !== -1) {
                seoContent = seoContent.substring(0, lastBracketIndex) + 
                             blogSchema + "\n];" + 
                             seoContent.substring(lastBracketIndex + 2);
                modified = true;
             }
        }

        if (modified) {
            fs.writeFileSync(seoFile, seoContent);
            console.log(`Updated SEO for ${featureDir}`);
        } else {
            console.log(`No changes made for ${featureDir} (already applied or regex failed)`);
        }
    }
});
