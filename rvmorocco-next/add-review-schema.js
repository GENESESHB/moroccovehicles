const fs = require('fs');
const path = require('path');

const featuresPath = path.join(__dirname, 'src/app/features');

// Generate tailored reviews based on the feature
function getTailoredReviewData(dirName) {
    let reviewer = "Youssef K.";
    let ratingCount = 145 + Math.floor(Math.random() * 50);
    let ratingVal = "4.9";
    let body = "Application incroyablement robuste.";

    const lowerName = dirName.toLowerCase();
    
    if (lowerName.includes("assurance")) {
        reviewer = "Amine B.";
        body = "Gérer les assurances et les cas de sinistres était notre plus grande angoisse. Grâce à ce gestionair flotte automobile moins chere, nous sommes notifiés avant chaque expiration. Un outil 5 étoiles !";
    } else if (lowerName.includes("black-list")) {
        reviewer = "Karim R.";
        body = "Sécurité absolue ! Le filtre des clients bannis fonctionne à merveille. Nous n'avons plus aucune voiture volée ni facture impayée depuis son activation. Je recommande fortement.";
    } else if (lowerName.includes("calander") || lowerName.includes("calendrier")) {
        reviewer = "Mehdi T.";
        body = "Le calendrier réactif est un bijou technique. En tant qu'agence, on voit instantanément les retours de véhicules. C'est le gestionair flotte automobile moins chere le plus fluide du marché.";
    } else if (lowerName.includes("clients")) {
        reviewer = "Salma F.";
        body = "Le CRM intégré pour suivre notre clientèle est impeccable. Le fait de pouvoir attacher les passeports scannés directement sur le profil nous a sauvé beaucoup d'espace physique.";
    } else if (lowerName.includes("contr")) {
        reviewer = "Hassan O.";
        body = "L'impression des contrats PDF avec ce logiciel est parfaite. Les prolongations se font en 2 clics avec recalcul automatique des prix. Le meilleur investissement pour notre flotte.";
    } else if (lowerName.includes("maintenance")) {
        reviewer = "Adel M.";
        body = "La prévision des vidanges a rallongé la vie de nos moteurs. Nous n'avons plus de véhicules en panne chez nos locataires ! La gestion garage est excellente.";
    } else if (lowerName.includes("overview") || lowerName.includes("analytics") || lowerName.includes("finances")) {
        reviewer = "Tarik H.";
        body = "Avoir des tableaux de bord Analytics et voir le revenu journalier net est incroyable. Ce gestionair flotte automobile moins chere nous guide littéralement vers la rentabilité.";
    } else if (lowerName.includes("login") || lowerName.includes("security")) {
        reviewer = "Rachid N.";
        body = "Configuration sécurisée, employés limités selon leurs postes, aucun risque de fuite de données. Vraiment une plateforme cloud très sérieuse.";
    } else if (lowerName.includes("luxury")) {
        reviewer = "Yassine W.";
        body = "Pour notre parc de SUV Range Rover, le suivi GPS et les cautions numériques proposées par ce logiciel sont irréprochables et de niveau premium.";
    } else if (lowerName.includes("b2b")) {
        reviewer = "Kamal S.";
        body = "Le formulaire de partenariat nous a permis d'ajouter 15 voitures de collaborateurs externes en un mois, avec une intégration comptable instantanée. Formidable !";
    } else if (lowerName.includes("vehicles")) {
        reviewer = "Imane E.";
        body = "L'enregistrement d'une nouvelle voiture et de son kilométrage initial prend 30 secondes. La simplicité est vraiment le gros point fort de ce gestionnaire.";
    }

    return { reviewer, ratingCount, ratingVal, body };
}

function injectReviewSchemas() {
    const directories = fs.readdirSync(featuresPath).filter(d => {
        try { return fs.statSync(path.join(featuresPath, d)).isDirectory(); }
        catch (e) { return false; }
    });

    directories.forEach(dir => {
        const filePath = path.join(featuresPath, dir, 'BlogSection.jsx');
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');

            // Skip if SoftwareApplication/Review schema already exists to prevent duplicate injections
            if (content.includes('"@type": "SoftwareApplication"')) {
                console.log("ℹ️ Review/SoftwareSchema already exists in " + dir);
                return;
            }

            const titleText = dir.split('-').join(' ').toUpperCase();
            const revData = getTailoredReviewData(dir);

            const reviewSchemaBlock = "\n" +
            "            {/* === Schema.org SoftwareApplication & AggregateRating for SEO Stars === */}\n" +
            "            <script\n" +
            "                type=\"application/ld+json\"\n" +
            "                dangerouslySetInnerHTML={{\n" +
            "                    __html: JSON.stringify({\n" +
            "                        \"@context\": \"https://schema.org/\",\n" +
            "                        \"@type\": \"SoftwareApplication\",\n" +
            "                        \"name\": \"Module " + titleText + " - gestionair flotte automobile moins chere\",\n" +
            "                        \"operatingSystem\": \"Web, iOS, Android Windows\",\n" +
            "                        \"applicationCategory\": \"BusinessApplication\",\n" +
            "                        \"aggregateRating\": {\n" +
            "                          \"@type\": \"AggregateRating\",\n" +
            "                          \"ratingValue\": \"" + revData.ratingVal + "\",\n" +
            "                          \"ratingCount\": \"" + revData.ratingCount + "\"\n" +
            "                        },\n" +
            "                        \"offers\": {\n" +
            "                          \"@type\": \"Offer\",\n" +
            "                          \"price\": \"0\",\n" +
            "                          \"priceCurrency\": \"MAD\"\n" +
            "                        },\n" +
            "                        \"review\": [\n" +
            "                          {\n" +
            "                            \"@type\": \"Review\",\n" +
            "                            \"author\": {\n" +
            "                              \"@type\": \"Person\",\n" +
            "                              \"name\": \"" + revData.reviewer + "\"\n" +
            "                            },\n" +
            "                            \"datePublished\": \"2026-03-12\",\n" +
            "                            \"reviewBody\": \"" + revData.body + "\",\n" +
            "                            \"reviewRating\": {\n" +
            "                              \"@type\": \"Rating\",\n" +
            "                              \"bestRating\": \"5\",\n" +
            "                              \"ratingValue\": \"5\",\n" +
            "                              \"worstRating\": \"1\"\n" +
            "                            }\n" +
            "                          }\n" +
            "                        ]\n" +
            "                    })\n" +
            "                }}\n" +
            "            />\n";

            // Inject right before the closing </article> tag
            const lastArticleIndex = content.lastIndexOf('</article>');
            if (lastArticleIndex !== -1) {
                // insert it
                content = content.substring(0, lastArticleIndex) + reviewSchemaBlock + "        " + content.substring(lastArticleIndex);
                fs.writeFileSync(filePath, content);
                console.log("✅ Injected Schema Rating & Review for " + dir);
            } else {
                console.log("⚠️ Could not find </article> tag in " + dir);
            }
        }
    });

    console.log('🚀 SoftwareApplication and AggregateRating SEO enforcement completed!');
}

injectReviewSchemas();
