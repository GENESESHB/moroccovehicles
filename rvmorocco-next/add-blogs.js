const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'src/app/features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

const genericWordBlocks = [
  "L'optimisation d'une entreprise de location de véhicules est essentielle pour assurer sa pérennité et sa rentabilité dans un marché hautement concurrentiel. ",
  "De nombreux défis attendent les gestionnaires aujourd'hui, allant de la maintenance préventive à la gestion rigoureuse des contrats. ",
  "Il est primordial de s'équiper avec les meilleurs outils technologiques disponibles pour minimiser les coûts d'exploitation et augmenter la satisfaction des clients. ",
  "C'est là qu'intervient une stratégie globale et intégrée qui couvre tous les aspects de votre activité. ",
  "Adopter des solutions modernes vous permet de rester en phase avec les attentes croissantes de votre clientèle, tout en facilitant le travail quotidien de vos équipes. "
];

const wordMultiplier = (baseArray, targetWordCount) => {
  let result = "";
  let currentWords = 0;
  while(currentWords < targetWordCount) {
    const chunk = baseArray[Math.floor(Math.random() * baseArray.length)];
    result += chunk;
    currentWords += chunk.split(" ").length;
  }
  return result;
};

const createContent = (featureName) => {
    let part1 = wordMultiplier(genericWordBlocks, 200);
    let keywordPart = "En cherchant le meilleur <strong>gestionair flotte automobile moins chere</strong>, vous réaliserez que notre module de <strong>" + featureName + "</strong> surpasse de loin les solutions traditionnelles. ";
    let part2 = wordMultiplier(genericWordBlocks, 250);
    let part3 = wordMultiplier(genericWordBlocks, 250);
    let part4 = wordMultiplier(genericWordBlocks, 250);

    return `
    <div className="blog-section" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1e293b' }}>Guide Complet : Maîtrisez le module de ${featureName}</h2>
        
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#475569', marginBottom: '24px' }}>
            ${part1}
        </p>

        <div style={{ margin: '40px 0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <img src="/images/fleet_management_blog_hero.png" alt="Dashboard gestion de flotte" style={{ width: '100%', display: 'block' }} />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e293b' }}>Pourquoi optimiser la gestion de <strong>${featureName}</strong> ?</h3>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#475569', marginBottom: '24px' }}>
            ${keywordPart} ${part2}
        </p>

        <div style={{ margin: '40px 0', borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
            <video width="100%" controls poster="/images/fleet_management_blog_hero.png" style={{ display: 'block' }}>
              <source src="/videos/demo-feature.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la balise vidéo.
            </video>
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e293b' }}>Une solution performante pour votre entreprise</h3>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#475569', marginBottom: '24px' }}>
            ${part3}
        </p>
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e293b' }}>Conclusion et bénéfices à long terme</h3>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#475569', marginBottom: '24px' }}>
            ${part4}
        </p>
    </div>
    `;
};

features.forEach(featureDir => {
    const fullDir = path.join(featuresDir, featureDir);
    
    // Find Client files
    const files = fs.readdirSync(fullDir);
    const clientFile = files.find(f => f.endsWith('Client.jsx') || f.endsWith('Client.tsx') || f === 'page.js');
    
    if (clientFile) {
        const featureDisplayName = featureDir.replace(/-/g, ' ').toUpperCase();
        
        const componentContent = "import React from 'react';\\n\\nexport default function " + featureDir.replace(/-/g, '') + "BlogSection() {\\n    return (\\n" + createContent(featureDisplayName).replace(/`/g, "\\`") + "\\n    );\\n}\\n";

        const blogFileName = 'BlogSection.jsx';
        fs.writeFileSync(path.join(fullDir, blogFileName), componentContent);

        // Try to inject it into the Client file
        if (clientFile.endsWith('Client.jsx')) {
            const clientPath = path.join(fullDir, clientFile);
            let clientContent = fs.readFileSync(clientPath, 'utf8');

            if (!clientContent.includes('BlogSection')) {
                // Remove duplicated React import if exists
                if(clientContent.includes("import React, { useState } from 'react';")) {
                   clientContent = clientContent.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\\nimport BlogSection from './BlogSection';");
                } else if(clientContent.includes("import React from 'react';")) {
                   clientContent = clientContent.replace("import React from 'react';", "import React from 'react';\\nimport BlogSection from './BlogSection';");
                } else {
                   clientContent = "import BlogSection from './BlogSection';\\n" + clientContent;
                }

                // Append the component just before FAQ section or inside the last section
                if (clientContent.includes('{/* FAQ Section */}')) {
                    clientContent = clientContent.replace(
                        "{/* FAQ Section */}",
                        "<BlogSection />\\n            {/* FAQ Section */}"
                    );
                } else if (clientContent.includes('{/* CTA Section */}')) {
                    clientContent = clientContent.replace(
                        "{/* CTA Section */}",
                        "<BlogSection />\\n            {/* CTA Section */}"
                    );
                } else {
                     // Find last closing div/section before return statement ends
                     let lastTag = clientContent.lastIndexOf('</section>');
                     if(lastTag !== -1) {
                        clientContent = clientContent.slice(0, lastTag + 10) + "\\n<BlogSection />\\n" + clientContent.slice(lastTag + 10);
                     } else {
                        // Just place it before the final </div> if standard
                        let lastDiv = clientContent.lastIndexOf('</div>');
                        if (lastDiv !== -1) {
                            clientContent = clientContent.slice(0, lastDiv) + "\\n<BlogSection />\\n" + clientContent.slice(lastDiv);
                        }
                     }
                }
                
                fs.writeFileSync(clientPath, clientContent);
                console.log("Updated " + clientFile + " in " + featureDir);
            }
        }
    }
});

console.log("Blog insertion complete.");
