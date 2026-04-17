const fs = require('fs');
const path = require('path');

const featuresPath = path.join(__dirname, 'src/app/features');

// Generate a rich SEO description tailored from the video filename / feature
function generateRichDescription(filename, featureId) {
    let baseDesc = "Intelligence Artificielle & Démonstration Complète du module " + featureId + ". ";
    let expandedContext = "";

    const lowerName = filename.toLowerCase();

    if (lowerName.includes("assurance")) {
        expandedContext = "Dans cette vidéo, nous explorons en temps réel la configuration des assurances. Visualisez comment le gestionair flotte automobile moins chere permet un affichage détaillé pour chaque véhicule de votre parc. Le paramétrage automatise les alertes avant la date d'expiration pour ne jamais rater un renouvellement, garantissant ainsi sécurité financière et couverture juridique optimale.";
    } else if (lowerName.includes("black-list")) {
        expandedContext = "La démonstration expose le validateur intelligent des clients bannis. Notre gestionair flotte automobile moins chere analyse instantanément la base de données intégrée pour bloquer toute création de nouveau dossier si le client présente un profil à risque, possède des litiges en cours ou des factures impayées. Sécurité et sérénité garanties.";
    } else if (lowerName.includes("calander") || lowerName.includes("calendrier")) {
        expandedContext = "Cette séquence détaille le calendrier interactif avec l'ensemble des tâches de réservation. Observez comment ce gestionair flotte automobile moins chere permet l'ajustement dynamique du kilométrage, le suivi des entrées/sorties en direct (in-rentals), et l'affectation immédiate des véhicules disponibles via une interface ergonomique.";
    } else if (lowerName.includes("clients")) {
        expandedContext = "Plongez dans l'architecture CRM B2C centralisée de notre gestionair flotte automobile moins chere. La vidéo navigue au travers de la base de données clients, démontrant comment ajouter, archiver et auditer la fidélité, l'historique des locations, et la gestion des documents sensibles tels que les permis de conduire et passeports internationaux.";
    } else if (lowerName.includes("contra") && !lowerName.includes("luxury")) {
        expandedContext = "Ce tutoriel met en scène la redoutable efficacité de l'éditeur de contrats de location intelligents. Imprimez, modifiez, désactivez ou effacez un contrat en quelques clics fluides. Ce gestionair flotte automobile moins chere gère également les prolongations avec actualisation automatique du tarif journalier et de la TVA.";
    } else if (lowerName.includes("maintenance")) {
        expandedContext = "Découverte complète du module mécanique et garage. Le gestionair flotte automobile moins chere liste l'intégralité des immobilisations, les révisions périodiques par kilométrage, l'édition des devis de réparation d'accident, et les notifications d'urgence pour assurer que les pneumatiques et les moteurs restent infaillibles toute l'année.";
    } else if (lowerName.includes("overview") || lowerName.includes("analytics")) {
        expandedContext = "Le tableau de bord décisionnel (Overview) en action absolue ! Cette vidéo analytique illustre à la perfection la restitution graphique des statistiques avancées de chiffre d'affaires, le taux global de disponibilité de la flotte, et l'efficacité des amortissements projetés. La Business Intelligence fusionnée au meilleur gestionair flotte automobile moins chere du marché.";
    } else if (lowerName.includes("login")) {
        expandedContext = "Au cœur de la sécurité informatique, cette scène dévoile l'écran d'authentification crypté. Découvrez comment ce gestionair flotte automobile moins chere protège l'entrée de votre système via des sessions ultra sécurisées (login-setup), limitant strictement l'accès aux employés autorisés pour garantir la confidentialité absolue du système de location.";
    } else if (lowerName.includes("vehicles-components") || lowerName.includes("smart-cars") || lowerName.includes("luxury")) {
        expandedContext = "Démonstration des fonctionnalités d'édition du parc roulant : ajouter, retirer, suspendre, activer ou désactiver un véhicule. Regardez comment le gestionair flotte automobile moins chere enregistre les plaques d'immatriculation, marques, modèles, catégories et kilométrages initiaux pour maintenir un inventaire fiable à la seconde près, qu'il s'agisse de gammes économiques ou de SUV de luxe.";
    } else {
        expandedContext = "La capture illustre le flux de paramétrage intuitif dans votre agence de location. Exploitez à 100% l'écosystème de ce puissant gestionair flotte automobile moins chere dédié aux loueurs exigeants à la pointe de la digitalisation moderne. Maximisation du retour sur investissement garantie.";
    }

    // Combine them with SEO keyword reinforcement
    return baseDesc + expandedContext + " L'idéal incontesté pour acquérir un gestionair flotte automobile moins chere robuste et scalable.";
}

function updateVideoFeatures() {
    const directories = fs.readdirSync(featuresPath).filter(d => {
        try { return fs.statSync(path.join(featuresPath, d)).isDirectory(); }
        catch (e) { return false; }
    });

    directories.forEach(dir => {
        const filePath = path.join(featuresPath, dir, 'BlogSection.jsx');
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');

            const videoRegex = /<video([\s\S]*?)<\/video>/;
            const matchVideo = content.match(videoRegex);
            
            // Also we need to replace the entire schema script to update the description!
            // First let's locate the entire <script type="application/ld+json"> block that has "VideoObject"
            const scriptRegex = /<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(\{\s*"@context"[\s\S]*?\}\)\s*\}\}\s*\/>/;
            const matchScript = content.match(scriptRegex);

            if (matchVideo && matchScript) {
                const innerVideo = matchVideo[0];
                
                // Extract video src
                const sourceMatch = innerVideo.match(/<source\s+src="([^"]+)"/);
                const videoSrc = sourceMatch ? sourceMatch[1] : '';

                if (videoSrc) {
                    const videoFilename = path.basename(videoSrc);
                    const richDesc = generateRichDescription(videoFilename, dir.split('-').join(' '));

                    // 1. UPDATE THE SCHEMA: Parse it out and rebuild it, or just use regex replace to inject the new description
                    // The easiest and safest way is to replace the "description": "..." line inside the JSON block.
                    // The previous description was: "description": "Découvrez en vidéo la puissance de notre module ... avec notre gestionair flotte automobile moins chere complet.",
                    let updatedScript = matchScript[0].replace(
                        /"description":\s*"[^"]+"/,
                        '"description": ' + JSON.stringify(richDesc)
                    );
                    
                    // Replace script in content
                    content = content.replace(scriptRegex, updatedScript);

                    // 2. MAKE VEDIO SILENT AND REMOVE CONTROLS
                    // Remove `controls` attribute globally inside the `<video ... >` tag.
                    // Also ensure `muted` and `autoPlay` are present. Add `pointerEvents: 'none'` to style to prevent clicking/right-clicking to show controls.
                    // Let's replace the opening `<video` tag entirely with a safer one.
                    const posterMatch = innerVideo.match(/poster="([^"]+)"/);
                    const posterSrc = posterMatch ? posterMatch[1] : '';
                    
                    const titleMatch = innerVideo.match(/title="([^"]+)"/);
                    const titleSrc = titleMatch ? titleMatch[1] : 'Démonstration logicielle';
                    
                    const ariaMatch = innerVideo.match(/aria-label="([^"]+)"/);
                    const ariaSrc = ariaMatch ? ariaMatch[1] : '';

                    // Construct the perfect restricted video opening tag
                    const newVideoOpeningTag = '<video width="100%" autoPlay loop muted playsInline ' +
                        'poster="' + posterSrc + '" ' +
                        'title="' + titleSrc + '" ' +
                        'aria-label="' + ariaSrc + '" ' +
                        'style={{ display: "block", width: "100%", pointerEvents: "none" }}' +
                        '>';

                    // Replace opening tag parsing
                    let replacedVideoBlock = innerVideo.replace(/<video[^>]+>/, newVideoOpeningTag);

                    // Inject new block
                    content = content.replace(videoRegex, replacedVideoBlock);
                    
                    fs.writeFileSync(filePath, content);
                    console.log("✅ Updated Schema description and silent un-clickable video for " + dir);
                }
            } else {
                console.log("⚠️ Could not find exact Video/Schema match in " + dir);
            }
        }
    });

    console.log('🚀 Enforced silent videos and injected massively contextualized SEO schema!');
}

updateVideoFeatures();
