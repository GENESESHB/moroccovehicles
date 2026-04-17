const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'src/app/features');
const blogsData = [
  {
    id: 'assurance',
    title: 'Comment réduire vos coûts d’assurance de flotte en 2026',
    desc: "Découvrez les stratégies pour optimiser les primes et gérer les sinistres plus efficacement avec un logiciel dédié.",
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'black-list',
    title: 'Protéger votre agence : La puissance d’une liste noire partagée',
    desc: "Évitez les mauvais payeurs et les locataires à risque en automatisant la vérification de vos clients.",
    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'calendrier',
    title: 'Ne perdez plus une seule réservation : Le calendrier unifié',
    desc: "Maximisez le taux de rotation de vos véhicules grâce à un système de gestion de planning intelligent.",
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'clients',
    title: 'Fidélisation client : Le secret de la gestion de base de données',
    desc: "Créez une relation durable avec vos locataires en centralisant leurs habitudes et préférences.",
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'contracts',
    title: 'Zéro papier : Digitalisez vos contrats de location automobile',
    desc: "Accélérez vos remises de clés et sécurisez vos données juridiques grâce aux contrats dématérialisés.",
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80' // re-use or change
  },
  {
    id: 'luxury-cars',
    title: 'Gérer une flotte de luxe : Exigences et rentabilité',
    desc: "L'entretien, le suivi kilométrique et la sécurité spécifiques aux véhicules haut de gamme.",
    image: 'https://images.unsplash.com/photo-1563720225384-9ddf42ba71d7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'luxury-contracts',
    title: 'Cautions et contrats premium : Les meilleures pratiques',
    desc: "Protégez vos actifs de grande valeur avec des contrats blindés et des garanties adaptées.",
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'maintenance',
    title: 'Maintenance préventive vs corrective : Quel est le meilleur ROI ?',
    desc: "Évitez les pannes bloquantes en automatisant les alertes de révision de vos véhicules.",
    image: 'https://images.unsplash.com/photo-1486262715619-6708146145f1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'overview',
    title: 'Indicateurs clés : Analysez les performances de votre flotte',
    desc: "Prenez de meilleures décisions grâce aux tableaux de bord analytiques globaux.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'vehicles',
    title: 'Optimisation du cycle de vie des véhicules commerciaux',
    desc: "De l’achat à la revente : comment maximiser la rentabilité de chaque voiture de votre parc.",
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80'
  }
];

const genericWordBlocks = [
  "L'optimisation d'une entreprise de location de véhicules est essentielle pour assurer sa pérennité et sa rentabilité dans un marché concurrentiel. ",
  "De nombreux défis attendent les gestionnaires aujourd'hui, allant de la maintenance préventive à la gestion rigoureuse des processus administratifs. ",
  "Il est primordial de s'équiper des meilleurs outils technologiques disponibles pour minimiser les coûts d'exploitation et augmenter la satisfaction. ",
  "C'est là qu'intervient une stratégie globale et intégrée qui couvre tous les aspects de votre activité quotidienne. ",
  "Adopter des solutions modernes vous permet de rester proactif face aux attentes de la clientèle, tout en garantissant des marges plus élevées. "
];

const wordMultiplier = (targetWordCount) => {
  let result = "";
  let currentWords = 0;
  while(currentWords < targetWordCount) {
    const chunk = genericWordBlocks[Math.floor(Math.random() * genericWordBlocks.length)];
    result += chunk;
    currentWords += chunk.split(" ").length;
  }
  return result;
};

// 1. Rewrite BlogSection.jsx explicitly for each feature
blogsData.forEach(blog => {
  const fullDir = path.join(featuresDir, blog.id);
  const blogSectionPath = path.join(fullDir, 'BlogSection.jsx');
  
  if (fs.existsSync(blogSectionPath)) {
      const componentName = blog.id.replace(/-/g, '') + 'BlogSection';
      const keywordPart = "Trouver un <strong>gestionair flotte automobile moins chere</strong> est crucial, et ce guide vous montre exactement comment faire la différence grâce à l'expertise accumulée.";
      
      const content = `import React from 'react';

export default function ${componentName}() {
    return (
        <div className="blog-section" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '24px', color: '#0f172a', lineHeight: '1.2' }}>
                ${blog.title}
            </h1>
            
            <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#64748b', marginBottom: '32px' }}>
                ${blog.desc}
            </p>

            <div style={{ margin: '40px 0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                <img src="${blog.image}" alt="${blog.title}" style={{ width: '100%', display: 'block', maxHeight: '500px', objectFit: 'cover' }} />
            </div>

            <h3 style={{ fontSize: '28px', marginBottom: '16px', color: '#1e293b' }}>Introduction à l'optimisation</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#334155', marginBottom: '24px' }}>
                ${wordMultiplier(200)}
            </p>

            <h3 style={{ fontSize: '28px', marginBottom: '16px', color: '#1e293b' }}>Le rôle d'une technologie adaptée</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#334155', marginBottom: '24px' }}>
                ${keywordPart} ${wordMultiplier(250)}
            </p>

            <div style={{ margin: '40px 0', borderRadius: '16px', overflow: 'hidden', background: '#0f172a', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px' }}>Vidéo Démonstrative</div>
                <video width="100%" controls poster="${blog.image}" style={{ display: 'block' }}>
                  <source src="/videos/demo-feature.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
            </div>

            <h3 style={{ fontSize: '28px', marginBottom: '16px', color: '#1e293b' }}>Impact sur votre retour sur investissement</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#334155', marginBottom: '24px' }}>
                ${wordMultiplier(250)}
            </p>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '32px', borderRadius: '12px', marginTop: '48px', borderLeft: '4px solid #3b82f6' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#1e293b' }}>Conclusion</h3>
                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#475569', margin: 0 }}>
                    ${wordMultiplier(200)}
                </p>
            </div>
        </div>
    );
}
`;
      fs.writeFileSync(blogSectionPath, content);
      console.log('Updated BlogSection for ' + blog.id);
  }
});

// 2. We now create dynamic dedicated blog pages using Next.js routing!
// We'll create src/app/blogs/[id]/page.js for each feature
blogsData.forEach(blog => {
    const blogPageDir = path.join(__dirname, 'src', 'app', 'blogs', blog.id);
    if (!fs.existsSync(blogPageDir)) {
        fs.mkdirSync(blogPageDir, { recursive: true });
    }
    
    // We import the component from the feature path to DRY
    const componentName = blog.id.replace(/-/g, '') + 'BlogSection';
    
    const pageContent = `import Head from 'next/head';
import ${componentName} from '@/app/features/${blog.id}/BlogSection';
import Link from 'next/link';

export const metadata = {
  title: "${blog.title} | Smart Car Location",
  description: "${blog.desc}",
  keywords: "gestionair flotte automobile moins chere, blog, ${blog.id.replace(/-/g, ' ')}"
};

export default function BlogArticlePage() {
  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
          <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginBottom: '32px' }}>
              &larr; Retour aux articles
          </Link>
      </div>
      <${componentName} />
    </div>
  );
}
`;
    fs.writeFileSync(path.join(blogPageDir, 'page.js'), pageContent);
    console.log('Created dedicated blog page for ' + blog.id);
});

console.log("Re-structuring dedicated blogs complete.");
