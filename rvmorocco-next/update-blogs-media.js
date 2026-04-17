const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'src/app/features');
const IMG_BASE = '/image_fetures-logeciel-flotte_gestionaire';
const VID_BASE = '/image_fetures-logeciel-flotte_gestionaire';

// Full video filenames (in the same folder as images)
const VIDEOS = {
  assurance: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - assurance-setup-and-view-for-each-vehicles.mp4`,
  'black-list': `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - black-list-components-checker.mp4`,
  calendrier: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - calander-components-with-all-rental-tasks-list-with-update-kelometrage-for-in-rentals.mp4`,
  clients: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - clients-components.mp4`,
  contracts: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - lists-smart-contra-imprime-update-active-delet-update.mp4`,
  'luxury-cars': `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - smart-cars-componnets-add-and-all-you-need.mp4`,
  'luxury-contracts': `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - lists-smart-contra-imprime-update-active-delet-update.mp4`,
  maintenance: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite - maintenance-components-gestion-all.mp4`,
  overview: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite -overview-components_advanced-analytics.mp4`,
  vehicles: `${VID_BASE}/MoroccoVehicles - Location sans frais de livraison _ Gestion de parc gratuite -vehicles-components-add-delet-update-vehicles-and-active-or-desactive.mp4`,
};

// Images per blog (multiple screenshots to show in a gallery)
const IMAGES = {
  assurance: [
    `${IMG_BASE}/login-form.png`,
    `${IMG_BASE}/overwiew-see-all-revenu.png`,
    `${IMG_BASE}/chart-graphique-in-overview-part.png`,
  ],
  'black-list': [
    `${IMG_BASE}/smart-contra-list-components.png`,
    `${IMG_BASE}/contra-cars-list-active-remove-update.png`,
    `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`,
  ],
  calendrier: [
    `${IMG_BASE}/niveau-reservoir-select-d-avence-en-debut-de-location.png`,
    `${IMG_BASE}/add-info-locataire-and-vehicle.png`,
    `${IMG_BASE}/add-info-vehicle-and-locature-info.png`,
  ],
  clients: [
    `${IMG_BASE}/add-info-locataire-and-vehicle.png`,
    `${IMG_BASE}/update-form-first-steep-in-remplie-info-for-contra-info-client.png`,
    `${IMG_BASE}/devenaire-partenaire-form.png`,
  ],
  contracts: [
    `${IMG_BASE}/smart-contra-list-components.png`,
    `${IMG_BASE}/contra-cars-list-active-remove-update.png`,
    `${IMG_BASE}/update-form-first-steep-in-remplie-info-for-contra-info-client.png`,
  ],
  'luxury-cars': [
    `${IMG_BASE}/add-cars-form.png`,
    `${IMG_BASE}/add-vehicle-form-and-list-management-status-cars.png`,
    `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`,
  ],
  'luxury-contracts': [
    `${IMG_BASE}/add-info-locataire-and-vehicle.png`,
    `${IMG_BASE}/part-select-endomage-car-for-lintegre-en-contra.png`,
    `${IMG_BASE}/select-part-ondomage-vehicles.png`,
  ],
  maintenance: [
    `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`,
    `${IMG_BASE}/add-vehicle-form-and-list-management-status-cars.png`,
    `${IMG_BASE}/chart-graphique-in-overview-part.png`,
  ],
  overview: [
    `${IMG_BASE}/overwiew-see-all-revenu.png`,
    `${IMG_BASE}/chart-graphique-in-overview-part.png`,
    `${IMG_BASE}/analyse-revenu-par-vehicles.png`,
    `${IMG_BASE}/calculateur-de-revenu.png`,
    `${IMG_BASE}/evaluation-du-revenu-en-anne.png`,
  ],
  vehicles: [
    `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`,
    `${IMG_BASE}/add-vehicle-form-and-list-management-status-cars.png`,
    `${IMG_BASE}/add-cars-form.png`,
  ],
};

// Hero image (first image of each) for the blogs index card
const BLOG_INDEX_IMAGES = {
  assurance: `${IMG_BASE}/login-form.png`,
  'black-list': `${IMG_BASE}/smart-contra-list-components.png`,
  calendrier: `${IMG_BASE}/niveau-reservoir-select-d-avence-en-debut-de-location.png`,
  clients: `${IMG_BASE}/add-info-locataire-and-vehicle.png`,
  contracts: `${IMG_BASE}/smart-contra-list-components.png`,
  'luxury-cars': `${IMG_BASE}/add-cars-form.png`,
  'luxury-contracts': `${IMG_BASE}/add-info-locataire-and-vehicle.png`,
  maintenance: `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`,
  overview: `${IMG_BASE}/overwiew-see-all-revenu.png`,
  vehicles: `${IMG_BASE}/gere-les-voiture-add-remove-and-update-and-active-or-desactive.png`,
};

// Labels per image filename
const IMAGE_LABELS = {
  'overwiew-see-all-revenu.png': 'Vue d\'ensemble des revenus',
  'chart-graphique-in-overview-part.png': 'Graphiques analytiques de la flotte',
  'analyse-revenu-par-vehicles.png': 'Analyse du revenu par véhicule',
  'calculateur-de-revenu.png': 'Calculateur de revenu intégré',
  'evaluation-du-revenu-en-anne.png': 'Évaluation annuelle du revenu',
  'login-form.png': 'Connexion sécurisée au logiciel',
  'smart-contra-list-components.png': 'Liste intelligente des contrats',
  'contra-cars-list-active-remove-update.png': 'Gestion active des contrats voitures',
  'gere-les-voiture-add-remove-and-update-and-active-or-desactive.png': 'Gestion complète de la flotte',
  'add-vehicle-form-and-list-management-status-cars.png': 'Formulaire d\'ajout et statut des véhicules',
  'niveau-reservoir-select-d-avence-en-debut-de-location.png': 'Sélection du niveau de réservoir en début de location',
  'add-info-locataire-and-vehicle.png': 'Enregistrement locataire et véhicule',
  'add-info-vehicle-and-locature-info.png': 'Informations véhicule et location',
  'update-form-first-steep-in-remplie-info-for-contra-info-client.png': 'Mise à jour des informations client du contrat',
  'devenaire-partenaire-form.png': 'Formulaire partenaire',
  'add-cars-form.png': 'Formulaire d\'ajout de véhicule',
  'part-select-endomage-car-for-lintegre-en-contra.png': 'Sélection des dommages véhicule pour le contrat',
  'select-part-ondomage-vehicles.png': 'Identification des parties endommagées',
};

function getLabel(imgPath) {
  const fname = path.basename(imgPath);
  return IMAGE_LABELS[fname] || fname.replace(/-/g, ' ').replace('.png', '');
}

function buildImageGallery(images) {
  return `
            {/* === REAL SCREENSHOTS GALLERY === */}
            <div style={{ margin: '50px 0' }}>
              <h3 style={{ fontSize: '26px', marginBottom: '24px', color: '#1e293b', borderLeft: '4px solid #3b82f6', paddingLeft: '16px' }}>
                📸 Captures d'écran du logiciel
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
${images.map(img => `                <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                  <img src="${img}" alt="${getLabel(img)}" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '12px 16px', backgroundColor: '#f8fafc', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                    ${getLabel(img)}
                  </div>
                </div>`).join('\n')}
              </div>
            </div>`;
}

function buildVideo(feature) {
  const videoSrc = VIDEOS[feature];
  return `
            {/* === REAL DEMO VIDEO === */}
            <div style={{ margin: '50px 0', borderRadius: '16px', overflow: 'hidden', background: '#0f172a', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(59, 130, 246, 0.9)', color: 'white', padding: '6px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', zIndex: 2 }}>
                🎬 Démonstration en direct
              </div>
              <video
                width="100%"
                controls
                muted
                autoPlay={false}
                playsInline
                style={{ display: 'block' }}
              >
                <source src="${videoSrc}" type="video/mp4" />
                Votre navigateur ne supporte pas la balise vidéo.
              </video>
            </div>`;
}

function buildHeroImage(feature) {
  const img = IMAGES[feature][0];
  return `<img src="${img}" alt="${getLabel(img)}" style={{ width: '100%', display: 'block', maxHeight: '550px', objectFit: 'cover' }} />`;
}

// Now patch each BlogSection.jsx
const features = Object.keys(IMAGES);

features.forEach(feature => {
  const filePath = path.join(BASE, feature, 'BlogSection.jsx');
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Missing: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace the main hero image (Unsplash) with first real screenshot
  const heroImg = IMAGES[feature][0];
  const heroLabel = getLabel(heroImg);
  content = content.replace(
    /<img src="https:\/\/images\.unsplash\.com[^"]*" alt="[^"]*" style=\{\{ width: '100%', display: 'block', maxHeight: '550px', objectFit: 'cover' \}\} \/>/,
    `<img src="${heroImg}" alt="${heroLabel}" style={{ width: '100%', display: 'block', maxHeight: '550px', objectFit: 'cover' }} />`
  );

  // 2. Replace the video block with real muted video + real src
  const videoSrc = VIDEOS[feature];
  // Replace old video block (with demo-feature.mp4 or unsplash poster) with new real video
  content = content.replace(
    /<div style=\{\{ margin: '50px 0', borderRadius: '16px', overflow: 'hidden', background: '#0f172a', position: 'relative' \}\}>[\s\S]*?<\/div>\s*\n\s*<\/div>/,
    `<div style={{ margin: '50px 0', borderRadius: '16px', overflow: 'hidden', background: '#0f172a', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(59, 130, 246, 0.9)', color: 'white', padding: '6px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', zIndex: 2 }}>🎬 Démonstration en direct</div>
                <video width="100%" controls muted autoPlay={false} playsInline style={{ display: 'block' }}>
                  <source src="${videoSrc}" type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo.
                </video>
            </div>`
  );

  // 3. Insert gallery BEFORE the video block section heading (h2 "3. Cas pratique...")
  const galleryMarker = `<h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1e293b', borderLeft: '4px solid #3b82f6', paddingLeft: '16px' }}>3. Cas pratique et Retour sur Investissement</h2>`;
  
  if (content.includes(galleryMarker) && !content.includes('📸 Captures')) {
    const gallery = `
            {/* === REAL SCREENSHOTS GALLERY === */}
            <div style={{ margin: '50px 0' }}>
              <h3 style={{ fontSize: '26px', marginBottom: '24px', color: '#1e293b', borderLeft: '4px solid #3b82f6', paddingLeft: '16px' }}>📸 Captures d'écran du logiciel</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
${IMAGES[feature].map(img => `                <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                  <img src="${img}" alt="${getLabel(img)}" style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '12px 16px', backgroundColor: '#f8fafc', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>${getLabel(img)}</div>
                </div>`).join('\n')}
              </div>
            </div>
\n            ` + galleryMarker;

    content = content.replace(galleryMarker, gallery);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated: ${feature}/BlogSection.jsx`);
});

// ---- UPDATE blogs/page.js to use real images ----
const blogsPagePath = path.join(__dirname, 'src/app/blogs/page.js');
let blogsPageContent = fs.readFileSync(blogsPagePath, 'utf8');

// Replace each Unsplash image with the real local image
const replacements = [
  { id: 'assurance', old: `image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['assurance']}'` },
  { id: 'black-list', old: `image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['black-list']}'` },
  { id: 'calendrier', old: `image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['calendrier']}'` },
  { id: 'clients', old: `image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['clients']}'` },
  { id: 'contracts', old: `image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['contracts']}'` },
  { id: 'luxury-cars', old: `image: 'https://images.unsplash.com/photo-1563720225384-9ddf42ba71d7?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['luxury-cars']}'` },
  { id: 'luxury-contracts', old: `image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['luxury-contracts']}'` },
  { id: 'maintenance', old: `image: 'https://images.unsplash.com/photo-1486262715619-6708146145f1?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['maintenance']}'` },
  { id: 'overview', old: `image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['overview']}'` },
  { id: 'vehicles', old: `image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80'`, new: `image: '${BLOG_INDEX_IMAGES['vehicles']}'` },
];

replacements.forEach(r => {
  if (blogsPageContent.includes(r.old)) {
    blogsPageContent = blogsPageContent.replace(r.old, r.new);
    console.log(`✅ blogs/page.js: replaced image for ${r.id}`);
  } else {
    console.log(`⚠️  blogs/page.js: could not find image for ${r.id}`);
  }
});

fs.writeFileSync(blogsPagePath, blogsPageContent, 'utf8');
console.log(`✅ Updated: blogs/page.js`);

console.log('\n🎉 All done! All BlogSection.jsx files and blogs/page.js have been updated with real images and muted videos.');
