const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'src/app/features');
const IMG_BASE = '/image_fetures-logeciel-flotte_gestionaire';
const VID_BASE = '/image_fetures-logeciel-flotte_gestionaire';

// Strict Mappings
const MAPPINGS = {
  assurance: {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - assurance-setup-and-view-for-each-vehicles.mp4`,
    hero: `${IMG_BASE}/select-part-ondomage-vehicles.png`,
    gallery: [
      `${IMG_BASE}/part-select-endomage-car-for-lintegre-en-contra.png`,
      `${IMG_BASE}/add-vehicle-form-and-list-management-status-cars.png`
    ]
  },
  'black-list': {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - black-list-components-checker.mp4`,
    hero: `${IMG_BASE}/add-info-locataire-and-vehicle.png`,
    gallery: [
      `${IMG_BASE}/update-form-first-steep-in-remplie-info-for-contra-info-client.png`,
      `${IMG_BASE}/smart-contra-list-components.png`
    ]
  },
  calendrier: {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - calander-components-with-all-rental-tasks-list-with-update-kelometrage-for-in-rentals.mp4`,
    hero: `${IMG_BASE}/contra-cars-list-active-remove-update.png`,
    gallery: [
      `${IMG_BASE}/add-vehicle-form-and-list-management-status-cars.png`,
      `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`
    ]
  },
  clients: {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - clients-components.mp4`,
    hero: `${IMG_BASE}/add-info-locataire-and-vehicle.png`,
    gallery: [
      `${IMG_BASE}/add-info-vehicle-and-locature-info.png`,
      `${IMG_BASE}/update-form-first-steep-in-remplie-info-for-contra-info-client.png`
    ]
  },
  contracts: {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - lists-smart-contra-imprime-update-active-delet-update.mp4`,
    hero: `${IMG_BASE}/smart-contra-list-components.png`,
    gallery: [
      `${IMG_BASE}/contra-cars-list-active-remove-update.png`,
      `${IMG_BASE}/update-form-first-steep-in-remplie-info-for-contra-info-client.png`
    ]
  },
  'luxury-cars': {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - smart-cars-componnets-add-and-all-you-need.mp4`,
    hero: `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`,
    gallery: [
      `${IMG_BASE}/add-cars-form.png`,
      `${IMG_BASE}/add-vehicle-form-and-list-management-status-cars.png`
    ]
  },
  'luxury-contracts': {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - lists-smart-contra-imprime-update-active-delet-update.mp4`,
    hero: `${IMG_BASE}/niveau-reservoir-select-d-avence-en-debut-de-location.png`,
    gallery: [
      `${IMG_BASE}/smart-contra-list-components.png`,
      `${IMG_BASE}/add-info-vehicle-and-locature-info.png`
    ]
  },
  maintenance: {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - maintenance-components-gestion-all.mp4`,
    hero: `${IMG_BASE}/part-select-endomage-car-for-lintegre-en-contra.png`,
    gallery: [
      `${IMG_BASE}/select-part-ondomage-vehicles.png`,
      `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`
    ]
  },
  overview: {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - overview-components-and-statics-advanced.mp4`,
    hero: `${IMG_BASE}/chart-graphique-in-overview-part.png`,
    gallery: [
      `${IMG_BASE}/overwiew-see-all-revenu.png`,
      `${IMG_BASE}/analyse-revenu-par-vehicles.png`,
      `${IMG_BASE}/calculateur-de-revenu.png`,
      `${IMG_BASE}/evaluation-du-revenu-en-anne.png`
    ]
  },
  vehicles: {
    video: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - vehicles-components-add-delet-update-vehicles-and-active-or-desactive.mp4`,
    hero: `${IMG_BASE}/add-vehicle-form-and-list-management-status-cars.png`,
    gallery: [
      `${IMG_BASE}/add-cars-form.png`,
      `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`
    ]
  }
};

const IMAGE_LABELS = {
  'overwiew-see-all-revenu.png': 'Vue d\'ensemble des revenus globaux',
  'chart-graphique-in-overview-part.png': 'Tableaux de bord dynamiques et graphiques',
  'analyse-revenu-par-vehicles.png': 'Rapport détaillé : Analyse du revenu par véhicule',
  'calculateur-de-revenu.png': 'Outil de simulation : Calculateur de rentabilité',
  'evaluation-du-revenu-en-anne.png': 'Projection trimestrielle et annuelle',
  'login-form.png': 'Interface de connexion cryptée',
  'smart-contra-list-components.png': 'Module Contrats : Historique et statuts en temps réel',
  'contra-cars-list-active-remove-update.png': 'Gestion avancée des contrats actifs',
  'gere-les-voiture-add-remove-and-update-and-active-or-desactive.png': 'Centre de pilotage de la flotte automobile',
  'add-vehicle-form-and-list-management-status-cars.png': 'Fiche technique interactive et statut du parc',
  'niveau-reservoir-select-d-avence-en-debut-de-location.png': 'État des lieux numérique : Jauge de carburant',
  'add-info-locataire-and-vehicle.png': 'Liaison instantanée Locataire-Véhicule',
  'add-info-vehicle-and-locature-info.png': 'Vérification en ligne des données de location',
  'update-form-first-steep-in-remplie-info-for-contra-info-client.png': 'Automatisation de la saisie client au comptoir',
  'devenaire-partenaire-form.png': 'Portail de souscription B2B',
  'add-cars-form.png': 'Intégration accélérée d\'un nouveau véhicule',
  'part-select-endomage-car-for-lintegre-en-contra.png': 'Cartographie interactive des dommages carrosserie',
  'select-part-ondomage-vehicles.png': 'Scan visuel et verrouillage de la caution',
};

function getLabel(imgPath) {
  const fname = path.basename(imgPath);
  return IMAGE_LABELS[fname] || fname.replace(/-/g, ' ').replace('.png', '');
}

const features = Object.keys(MAPPINGS);

features.forEach(feature => {
  const filePath = path.join(BASE, feature, 'BlogSection.jsx');
  if (!fs.existsSync(filePath)) {
    console.log(`Missing: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // We match the hero div: <div style={{ margin: '0 0 50px 0', borderRadius... }}>...</div>
  // We can use regex to replace it
  const { hero, video, gallery } = MAPPINGS[feature];

  const heroHTML = `<div style={{ margin: '0 0 50px 0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 40%)', zIndex: 1 }}></div>
                <img src="${hero}" alt="${getLabel(hero)}" style={{ width: '100%', display: 'block', maxHeight: '600px', objectFit: 'cover', transform: 'scale(1.02)', transition: 'transform 0.5s ease' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', zIndex: 2 }}>
                    <span style={{ background: 'rgba(59,130,246,0.9)', color: 'white', padding: '6px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>Capture Système Principale</span>
                </div>
            </div>`;
            
  content = content.replace(
      /<div style=\{\{\s*margin:\s*'0 0 50px 0'[^>]*\}>[\s\S]*?<img src="[^"]*"[^>]*\/>\s*<\/div>/,
      heroHTML
  );

  // Replace Video block safely
  const videoHTML = `<div style={{ margin: '60px 0', borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(145deg, #0f172a, #1e293b)', position: 'relative', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #334155', background: 'rgba(255,255,255,0.02)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ height: '12px', width: '12px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }}></div>
                     <span style={{ color: 'white', fontSize: '15px', fontWeight: '600', letterSpacing: '0.5px' }}>Démonstration en direct</span>
                   </div>
                   <div style={{ color: '#94a3b8', fontSize: '13px' }}>1080p HD</div>
                </div>
                <video width="100%" controls autoPlay loop muted playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="${video}" type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
            </div>`;

  // The regex finds the existing video block container
  // It handles both my replaced block and the original
  content = content.replace(
    /<div style=\{\{\s*margin:\s*'50px 0'[^>]*\}[\s\S]*?<\/video>\s*<\/div>/,
    videoHTML
  );

  // Check if we already injected a gallery, if so remove it
  content = content.replace(/\{\/\* === REAL SCREENSHOTS GALLERY === \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*(?=<h2 style)/, '');
  
  // Also remove old gallery if user script was run partially
  content = content.replace(/<div style=\{\{ display: 'grid'[\s\S]*?<\/div>\s*<\/div>\s*<h2/, '<h2');

  // Insert Gallery before "Cas pratique" h2 
  // We'll search for <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1e293b', borderLeft: '4px solid #3b82f6', paddingLeft: '16px' }}>3. Cas pratique
  const galleryJSX = `
            {/* === REAL SCREENSHOTS GALLERY === */}
            <div style={{ margin: '80px 0', padding: '40px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                 <h3 style={{ fontSize: '28px', color: '#0f172a', fontWeight: '800', marginBottom: '12px' }}>Exploration de l'Interface Numérique</h3>
                 <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>Découvrez en images comment Smart Car Location optimise chaque micro-tâche de votre gestion quotidienne.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
${gallery.map(img => `                <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: 'white', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }} onMouseOver={e => {e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'}} onMouseOut={e => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'}}>
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img src="${img}" alt="${getLabel(img)}" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ color: '#0f172a', fontSize: '14px', fontWeight: '600', lineHeight: '1.4' }}>${getLabel(img)}</div>
                  </div>
                </div>`).join('\n')}
              </div>
            </div>`;
            
  // Find "3. Cas pratique" and insert before it
  const regexH2 = /(<h2[^>]*>3\.\s*Cas pratique[^<]*<\/h2>)/;
  if (regexH2.test(content)) {
      content = content.replace(regexH2, galleryJSX + '\n            $1');
  }

  // To make the pulse animation work smoothly without global CSS injection, let's just make sure the JSX is valid
  // (We use CSS animation 'pulse' which might need defining, or we can use a simpler visual)
  // Replaced animation with inline style if needed, but 'pulse' is usually standard in tailwind/some frameworks. Let's provide a safe fallback just in case.
  // Actually, standard CSS doesn't have pulse default. Let's remove an animation class that might throw errors or look broken.
  content = content.replace(/animation: 'pulse 2s infinite'/g, '/* animation pulse removed for safety */');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${feature}/BlogSection.jsx`);
});

// Update page.js explicitly via regex
const blogsPagePath = path.join(__dirname, 'src/app/blogs/page.js');
let blogsPageContent = fs.readFileSync(blogsPagePath, 'utf8');

// Replace standard occurrences 
Object.keys(MAPPINGS).forEach(feature => {
   const exactKey = feature;
   // we look for id: 'feature' and replace the image mapping inside that object
   const rx = new RegExp(`(id:\\s*'${exactKey}'[\\s\\S]*?image:\\s*')[^']+(')`, 'g');
   blogsPageContent = blogsPageContent.replace(rx, `$1${MAPPINGS[exactKey].hero}$2`);
});

fs.writeFileSync(blogsPagePath, blogsPageContent, 'utf8');
console.log('Updated blogs/page.js');

