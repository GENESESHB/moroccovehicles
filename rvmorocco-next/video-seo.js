const fs = require('fs');
const path = require('path');

const featuresPath = path.join(__dirname, 'src/app/features');

function injectVideoSEO() {
    const directories = fs.readdirSync(featuresPath).filter(d => {
        try { return fs.statSync(path.join(featuresPath, d)).isDirectory(); }
        catch (e) { return false; }
    });

    directories.forEach(dir => {
        const filePath = path.join(featuresPath, dir, 'BlogSection.jsx');
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');

            const heroImgRegex = /<img\s+src="([^"]+)"/;
            const matchHero = content.match(/<img\s+src="([^"]+)"[^>]+maxHeight:\s*'600px'/);
            const fallbackMatch = content.match(/<img\s+src="([^"]+)"/);
            const posterSrc = matchHero ? matchHero[1] : (fallbackMatch ? fallbackMatch[1] : '');

            const videoRegex = /<video([\s\S]*?)<\/video>/;
            const matchVideo = content.match(videoRegex);

            if (matchVideo && !content.includes('"@type": "VideoObject"')) {
                const innerVideo = matchVideo[1];
                
                const sourceMatch = innerVideo.match(/<source\s+src="([^"]+)"/);
                const videoSrc = sourceMatch ? sourceMatch[1] : '';

                if (videoSrc) {
                    const titleText = dir.split('-').join(' ').toUpperCase();

                    const seoScript = "\n" +
            "            {/* === Schema.org VideoObject for SEO === */}\n" +
            "            <script\n" +
            "                type=\"application/ld+json\"\n" +
            "                dangerouslySetInnerHTML={{\n" +
            "                    __html: JSON.stringify({\n" +
            "                        \"@context\": \"https://schema.org\",\n" +
            "                        \"@type\": \"VideoObject\",\n" +
            "                        \"name\": \"Démonstration détaillée : gestionair flotte automobile moins chere (" + titleText + ")\",\n" +
            "                        \"description\": \"Intelligence Artificielle & Démonstration Complète du module " + titleText + ". Cette vidéo montre pas-à-pas comment utiliser notre gestionair flotte automobile moins chere pour réduire vos coûts opérationnels, gagner un temps précieux et automatiser l'encadrement en ligne.\",\n" +
            "                        \"thumbnailUrl\": [\n" +
            "                            \"https://www.moroccovehicles.com" + posterSrc + "\"\n" +
            "                        ],\n" +
            "                        \"uploadDate\": \"2026-04-15T08:00:00+01:00\",\n" +
            "                        \"duration\": \"PT3M30S\",\n" +
            "                        \"contentUrl\": \"https://www.moroccovehicles.com" + videoSrc + "\",\n" +
            "                        \"embedUrl\": \"https://www.moroccovehicles.com/blogs/" + dir + "-power-gestionair-flotte-automobile-moins-chere\"\n" +
            "                    })\n" +
            "                }}\n" +
            "            />\n";
                    
                    let newVideoBlock = matchVideo[0].replace(
                        /<video\s+/, 
                        '<video poster="' + posterSrc + '" title="Démonstration logicielle du gestionair flotte automobile moins chere" aria-label="Vidéo démonstrative complète expliquant le fonctionnement exact du module ' + titleText + ' et ses bénéfices opérationnels" '
                    );

                    newVideoBlock = newVideoBlock.replace(
                        /(<\/video>)/,
                        "Votre navigateur ne supporte pas l'affichage de notre vidéo pour le gestionair flotte automobile moins chere. <br/><strong>Contexte de la vidéo :</strong> Ce clip explique en détail le fonctionnement du module " + titleText + " pour digitaliser votre agence.\n$1"
                    );

                    content = content.replace(videoRegex, seoScript + newVideoBlock);
                    
                    fs.writeFileSync(filePath, content);
                    console.log("✅ Applied VideoObject SEO schema & poster to " + dir + "/BlogSection.jsx");
                }
            } else if (content.includes('"@type": "VideoObject"')) {
                console.log("ℹ️ VideoObject already exists in " + dir + "/BlogSection.jsx");
            } else {
                console.log("⚠️ No video found in " + dir + "/BlogSection.jsx");
            }
        }
    });

    console.log('🚀 Video SEO optimization completed for all blogs!');
}

injectVideoSEO();
