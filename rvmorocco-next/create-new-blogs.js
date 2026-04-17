const fs = require('fs');
const path = require('path');

const srcApp = path.join(__dirname, 'src', 'app');
const featuresPath = path.join(srcApp, 'features');
const blogsBasePath = path.join(srcApp, 'blogs');

const NEW_BLOGS = [
  {
    id: 'login-security',
    title: 'Sécurisez votre agence : Gestion des accès et connexion',
    description: 'Protégez vos données sensibles avec une architecture de connexion imperméable et un portail de configuration avancé.',
    heroImage: '/image_fetures-logeciel-flotte_gestionaire/login-form.png',
    videoFile: '/image_fetures-logeciel-flotte_gestionaire/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite -login-setup.mp4',
    gallery: [],
    zoomTitle: 'Cryptage & Authentification',
    zoomText: 'Dans un secteur où la data client est omniprésente, un mot de passe faible est une porte ouverte. Notre système force la sécurité dès le premier écran pour vos agents.',
    content: [
      {
        h: '1. Identifier les vulnérabilités de location',
        p: 'La digitalisation de l’industrie de la location automobile implique la collecte massive de données sensibles : cartes bancaires, passeports, permis de conduire. Sans une interface de connexion blindée, vous mettez en péril non seulement vos opérations mais également la réputation de votre agence. Un module de login moderne garantit un accès limité et tracé pour chaque agent de comptoir.'
      },
      {
        h: "2. L'impact du multi-utilisateurs",
        p: 'Attribuer un compte unique par employé permet de remonter historiquement toute action (qui a validé un contrat, qui a annulé une caution). Cela évite les confusions internes et responsabilise les équipes de gestion. Notre interface de login est la première brique de ce filet de sécurité logiciel indispensable.'
      }
    ]
  },
  {
    id: 'partenaires-b2b',
    title: 'Développer votre réseau : Le portail partenaire B2B',
    description: "Automatisez la création de nouveaux partenariats et élargissez votre flotte grâce au formulaire d'acquisition web B2B.",
    heroImage: '/image_fetures-logeciel-flotte_gestionaire/devenaire-partenaire-form.png',
    videoFile: '/image_fetures-logeciel-flotte_gestionaire/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - Google Chrome 2026-04-14 18-44-35.mp4',
    gallery: [],
    zoomTitle: 'Acquisition & Onboarding Digital',
    zoomText: 'Un propriétaire externe souhaite louer sa voiture via votre agence ? Fini les paperasses ! Le formulaire Partenaire centralise la demande, son véhicule, et ses coordonnées automatiquement dans votre Dashboard.',
    content: [
      {
        h: "1. Scalabilité sans achat de nouveaux véhicules",
        p: "Le vrai secret des grandes entreprises de location modernes est la sous-location encadrée de véhicules de partenaires privés. Disposer d'un formulaire d'intégration numérique (Devenir Partenaire) accélère drastiquement ce processus d'onboarding. Vous capturez les leads 24h/24."
      },
      {
        h: "2. Structurer vos affaires B2B",
        p: "Ce module propulse l'image de votre agence. En affichant un portail pro pour les investisseurs et apporteurs d'affaires, vous transmettez le message d'une société fiable et hautement technologique. Une excellente façon d'augmenter son inventaire gratuitement."
      }
    ]
  },
  {
    id: 'finances-rentabilite',
    title: 'Rentabilité maximale : Simuler et calculer vos revenus',
    description: 'Utilisez notre calculateur de revenus intégré pour projeter votre bilan trimestriel et maximiser les marges de votre parc.',
    heroImage: '/image_fetures-logeciel-flotte_gestionaire/calculateur-de-revenu.png',
    videoFile: '/image_fetures-logeciel-flotte_gestionaire/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - Google Chrome 2026-04-14 19-02-18.mp4',
    gallery: [
      '/image_fetures-logeciel-flotte_gestionaire/evaluation-du-revenu-en-anne.png',
      '/image_fetures-logeciel-flotte_gestionaire/analyse-revenu-par-vehicles.png',
    ],
    zoomTitle: "Intelligence Artificielle & Projections Financières",
    zoomText: "Les graphiques d'évaluation du revenu annuel vous permettent d'anticiper. Plus besoin de calculer à la main vos retours sur investissement ; le système projette vos amortissements pour chaque voiture !",
    content: [
      {
        h: "1. Pourquoi simuler le revenu est capital",
        p: "Calculer la rentabilité d'une flotte automobile ne se limite pas à faire la différence entre l'achat et la location brute. Les assurances, la dépréciation, l'entretien... L'outil de calculateur de revenu absorbe tous ces coûts pour vous sortir votre ROI net."
      },
      {
        h: "2. Outils de Business Intelligence Intégrés",
        p: "Analyser le revenu par véhicule permet de repérer immédiatement la voiture à problème qui coûte plus qu'elle ne rapporte en réparation. En un coup d'œil sur la courbe d'évaluation annuelle, vous savez s'il est temps de revendre une voiture en fin de maturité financière ou de la conserver."
      }
    ]
  }
];

function generateBlogSection(blog) {
  const compName = blog.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'BlogSection';
  
  let galleryHTML = '';
  if (blog.gallery.length > 0) {
    let imagesHtml = blog.gallery.map(img => 
      '                <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", background: "white", border: "1px solid #e2e8f0" }}>\n' +
      '                  <div style={{ position: "relative", height: "200px" }}>\n' +
      '                    <img src="' + img + '" alt="Screenshot additionnel" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />\n' +
      '                  </div>\n' +
      '                </div>'
    ).join('\\n');

    galleryHTML = 
      '            {/* === SCREENSHOTS GALLERY === */}\n' +
      '            <div style={{ margin: "80px 0", padding: "40px", background: "#f8fafc", borderRadius: "24px", border: "1px solid #e2e8f0" }}>\n' +
      '              <div style={{ marginBottom: "32px", textAlign: "center" }}>\n' +
      '                 <h3 style={{ fontSize: "28px", color: "#0f172a", fontWeight: "800", marginBottom: "12px" }}>Exploration Stratégique</h3>\n' +
      '              </div>\n' +
      '              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>\n' +
      imagesHtml + '\n' +
      '              </div>\n' +
      '            </div>';
  }

  return 'import React from "react";\n\n' +
    'export default function ' + compName + '() {\n' +
    '    return (\n' +
    '        <article className="blog-section" style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>\n' +
    '            <span style={{color: "#3b82f6", fontWeight: "bold", textTransform: "uppercase", fontSize: "14px", letterSpacing: "1px", display: "block", marginBottom: "16px"}}>Dossier Technique & Stratégie</span>\n' +
    '            \n' +
    '            <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "32px", color: "#0f172a", lineHeight: "1.2" }}>\n' +
    '                ' + blog.title + '\n' +
    '            </h1>\n' +
    '            \n' +
    '            <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid #e2e8f0", paddingBottom: "20px" }}>\n' +
    '                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>\n' +
    '                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#f1f5f9", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", color: "#3b82f6" }}>MV</div>\n' +
    '                    <div>\n' +
    '                        <div style={{fontWeight: "bold", color: "#1e293b"}}>Équipe Experte MoroccoVehicles</div>\n' +
    '                        <div style={{fontSize: "14px", color: "#64748b"}}>Temps de lecture : ~8 minutes</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n\n' +
    '            <p style={{ fontSize: "22px", lineHeight: "1.7", color: "#334155", marginBottom: "40px", fontStyle: "italic", fontWeight: "500" }}>\n' +
    '                ' + blog.description + '\n' +
    '            </p>\n\n' +
    '            <img src="' + blog.heroImage + '" alt="Hero UI" style={{ width: "100%", display: "block", maxHeight: "600px", objectFit: "cover", transform: "scale(1.02)", transition: "transform 0.5s ease", marginBottom: "50px", borderRadius: "16px" }} />\n\n' +
    '            <h2 style={{ fontSize: "32px", marginBottom: "24px", color: "#1e293b", borderLeft: "4px solid #3b82f6", paddingLeft: "16px" }}>' + blog.content[0].h + '</h2>\n' +
    '            <p style={{ fontSize: "18px", lineHeight: "1.9", color: "#475569", marginBottom: "28px" }}>' + blog.content[0].p + '</p>\n\n' +
    '            <div style={{ backgroundColor: "#f8fafc", padding: "30px", borderRadius: "12px", margin: "40px 0", border: "1px solid #e2e8f0" }}>\n' +
    '                <h3 style={{ fontSize: "22px", marginBottom: "16px", color: "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}>\n' +
    '                   🔍 Zoom Stratégique : ' + blog.zoomTitle + '\n' +
    '                </h3>\n' +
    '                <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#475569", margin: 0 }}>\n' +
    '                   ' + blog.zoomText + '\n' +
    '                </p>\n' +
    '            </div>\n\n' +
    '            <h2 style={{ fontSize: "32px", marginBottom: "24px", color: "#1e293b", borderLeft: "4px solid #3b82f6", paddingLeft: "16px" }}>' + blog.content[1].h + '</h2>\n' +
    '            <p style={{ fontSize: "18px", lineHeight: "1.9", color: "#475569", marginBottom: "28px" }}>' + blog.content[1].p + '</p>\n\n' +
    '            ' + galleryHTML + '\n\n' +
    '            <div style={{ margin: "60px 0", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(145deg, #0f172a, #1e293b)", position: "relative", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)", border: "1px solid #334155" }}>\n' +
    '                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #334155", background: "rgba(255,255,255,0.02)" }}>\n' +
    '                   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>\n' +
    '                     <div style={{ height: "12px", width: "12px", borderRadius: "50%", background: "#ef4444" }}></div>\n' +
    '                     <span style={{ color: "white", fontSize: "15px", fontWeight: "600", letterSpacing: "0.5px" }}>Démonstration en direct</span>\n' +
    '                   </div>\n' +
    '                   <div style={{ color: "#94a3b8", fontSize: "13px" }}>1080p HD</div>\n' +
    '                </div>\n' +
    '                <video width="100%" controls autoPlay loop muted playsInline style={{ display: "block", width: "100%" }}>\n' +
    '                  <source src="' + blog.videoFile + '" type="video/mp4" />\n' +
    '                  Votre navigateur ne supporte pas la balise vidéo.\n' +
    '                </video>\n' +
    '            </div>\n\n' +
    '            <h2 style={{ fontSize: "32px", marginBottom: "24px", color: "#1e293b", borderLeft: "4px solid #3b82f6", paddingLeft: "16px" }}>3. Cas pratique et Retour sur Investissement</h2>\n' +
    '            <p style={{ fontSize: "18px", lineHeight: "1.9", color: "#475569", marginBottom: "28px" }}>\n' +
    '                L\'adoption du Cloud et de l\'automatisation permet un retour sur investissement immédiat. Nos experts vous accompagnent tout au long de la transition. Demandez votre démonstration personnalisée dès aujourd\'hui et libérez le plein potentiel de votre agence !\n' +
    '            </p>\n' +
    '        </article>\n' +
    '    );\n' +
    '}\n';
}

function generatePage(blog) {
  const compName = blog.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'BlogSection';
  return 'import Head from "next/head";\n' +
    'import ' + compName + ' from "@/app/features/' + blog.id + '/BlogSection";\n' +
    'import Link from "next/link";\n\n' +
    'export const metadata = {\n' +
    '  title: "' + blog.title + ' | Smart Car Location",\n' +
    '  description: "' + blog.description + '",\n' +
    '  keywords: "gestionair flotte automobile moins chere, blog, ' + blog.id.replace(/-/g, ' ') + '"\n' +
    '};\n\n' +
    'export default function BlogArticlePage() {\n' +
    '  return (\n' +
    '    <div style={{ paddingTop: "80px", backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "100px" }}>\n' +
    '      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "20px 20px 0" }}>\n' +
    '          <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#3b82f6", textDecoration: "none", fontWeight: "bold", marginBottom: "10px", transition: "all 0.3s" }}>\n' +
    '              &larr; Retour à tous les articles\n' +
    '          </Link>\n' +
    '      </div>\n' +
    '      <' + compName + ' />\n' +
    '    </div>\n' +
    '  );\n' +
    '}\n';
}

NEW_BLOGS.forEach(blog => {
  const featureDir = path.join(featuresPath, blog.id);
  if (!fs.existsSync(featureDir)) fs.mkdirSync(featureDir, { recursive: true });
  fs.writeFileSync(path.join(featureDir, 'BlogSection.jsx'), generateBlogSection(blog));
  
  const blogPageDir = path.join(blogsBasePath, blog.id + '-power-gestionair-flotte-automobile-moins-chere');
  if (!fs.existsSync(blogPageDir)) fs.mkdirSync(blogPageDir, { recursive: true });
  fs.writeFileSync(path.join(blogPageDir, 'page.js'), generatePage(blog));
  
  console.log('✅ Processed blog module: ' + blog.id);
});

const blogsPagePath = path.join(blogsBasePath, 'page.js');
let pageContent = fs.readFileSync(blogsPagePath, 'utf8');

let injectStr = NEW_BLOGS.map(b => 
  '  {\n' +
  '    id: "' + b.id + '",\n' +
  '    title: "' + b.title + '",\n' +
  '    description: "' + b.description + '",\n' +
  '    image: "' + b.heroImage + '",\n' +
  '    link: "/blogs/' + b.id + '-power-gestionair-flotte-automobile-moins-chere"\n' +
  '  }'
).join(',\n');

const injectionPointer = pageContent.lastIndexOf('];');
if (injectionPointer !== -1) {
  if (!pageContent.includes(NEW_BLOGS[0].id)) {
      let modified = pageContent.substring(0, injectionPointer) + ',\n' + injectStr + '\n];' + pageContent.substring(injectionPointer + 2);
      fs.writeFileSync(blogsPagePath, modified);
      console.log('✅ Injected new blogs into src/app/blogs/page.js');
  } else {
      console.log('⚠️ Blogs already exist in src/app/blogs/page.js');
  }
}

console.log('🚀 Successfully generated new blogs!');
