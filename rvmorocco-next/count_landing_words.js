const fs = require('fs');
const path = require('path');

const targetPages = [
  'voiture-electrique-location-maroc',
  'louer-voiture-maroc-sans-frais-livraison',
  'location-voiture-casablanca-pas-cher',
  'location-voiture-casablanca-7-euro-sans-caution',
  'location-voiture-marrakech-pas-cher',
  'location-voiture-marrakech-7-euro-sans-caution',
  'location-voiture-tanger-pas-cher',
  'location-voiture-rabat-pas-cher',
  'location-voiture-fes-pas-cher',
  'location-voiture-fes-7-euro-sans-caution',
  'location-voiture-agadir-pas-cher'
];

targetPages.forEach(p => {
  const filePath = path.join(__dirname, 'src', 'app', p, 'page.js');
  if (fs.existsSync(filePath)) {
    const f = fs.readFileSync(filePath, 'utf8');
    // Extract visible text nodes
    const textNodes = [];
    const regex = />([^<>{}`]+)</g;
    let m;
    while ((m = regex.exec(f)) !== null) {
      const t = m[1].trim();
      if (t.length > 0 && !t.startsWith('//') && !t.startsWith('*')) {
        textNodes.push(t);
      }
    }
    const fullText = textNodes.join(' ');
    const words = fullText.split(/\s+/).filter(w => w.length > 0);
    console.log(`${p.padEnd(45)}: ${words.length} mots visibles`);
  } else {
    console.log(`${p.padEnd(45)}: FICHIER INTROUVABLE`);
  }
});
