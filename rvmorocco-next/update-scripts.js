const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'src/app/blogs');
const featuresDir = path.join(__dirname, 'src/app/features');

const keywordSlug = 'gestionair-flotte-automobile-moins-chere';

// Array of all 10 base features
const baseFeatures = [
  'assurance', 'black-list', 'calendrier', 'clients', 'contracts',
  'luxury-cars', 'luxury-contracts', 'maintenance', 'overview', 'vehicles'
];

// 1. Rename folders in src/app/blogs/
baseFeatures.forEach(feature => {
  const oldPath = path.join(blogsDir, feature);
  const newPath = path.join(blogsDir, `${feature}-power-${keywordSlug}`);

  // Rename if the old path exists (or if they are already named something else)
  // Let's just handle if oldPath exists
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed slug: ${feature} -> ${feature}-power-${keywordSlug}`);
  } else {
    // If we already renamed it or something, let's check
    console.log(`Could not find ${feature} in blogs... it may already be renamed.`);
  }
});

// 2. Add reviews to each BlogSection
const reviewTemplates = [
  { name: 'Karim B.', role: 'Gérant d’agence Premium', review: "Un outil vraiment impressionnant. L'interface est intuitive et le niveau de détail a transformé complètement la façon dont nous gérons nos voitures au quotidien." },
  { name: 'Youssef El.', role: 'Directeur d’Opérations', review: "Depuis l'implémentation de cet écosystème, nos marges ont grimpé en flèche. Le suivi est parfait et nos employés gagnent un temps précieux." },
  { name: 'Amina R.', role: 'Propriétaire Flotte 50+', review: "Excellent ! J'avais du mal à suivre tous nos sinistres et l'entretien. Ce module est la solution que je cherchais. Fortement recommandé." },
  { name: 'Tarik M.', role: 'Administrateur', review: "Je cherchais un gestionnaire de flotte automobile complet et c'est le grand gagnant. Le module est extrêmement puissant et bien pensé." }
];

baseFeatures.forEach(feature => {
  const blogSectionPath = path.join(featuresDir, feature, 'BlogSection.jsx');
  if (fs.existsSync(blogSectionPath)) {
    let content = fs.readFileSync(blogSectionPath, 'utf8');
    
    // Add review section before </article>
    if (!content.includes('⭐')) {
        const randReview = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
        const reviewHtml = `
            <div style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '24px', color: '#1e293b' }}>Avis de nos gestionnaires</h3>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#3b82f6', flexShrink: 0, fontSize: '20px' }}>
                        ${randReview.name.charAt(0)}
                    </div>
                    <div>
                        <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '8px' }}>
                            ★★★★★
                        </div>
                        <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#334155', fontStyle: 'italic', margin: '0 0 16px 0' }}>
                            "${randReview.review}"
                        </p>
                        <div style={{ fontWeight: 'bold', color: '#1e293b' }}>${randReview.name}</div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>${randReview.role}</div>
                    </div>
                </div>
            </div>
        `;
        content = content.replace('</article>', reviewHtml + '\n        </article>');
        fs.writeFileSync(blogSectionPath, content);
        console.log(`Added reviews to ${feature}`);
    }
  }
});

// 3. Update the blogs/page.js links
const blogsPagePath = path.join(blogsDir, 'page.js');
if (fs.existsSync(blogsPagePath)) {
  let pageContent = fs.readFileSync(blogsPagePath, 'utf8');
  
  // Replace old links with new links
  baseFeatures.forEach(feature => {
    // E.g. replace link: '/blogs/assurance' with link: '/blogs/assurance-power-gestionair-flotte-automobile-moins-chere'
    const oldLink = `link: '/blogs/${feature}'`;
    const newLink = `link: '/blogs/${feature}-power-${keywordSlug}'`;
    pageContent = pageContent.replace(oldLink, newLink);
  });
  
  fs.writeFileSync(blogsPagePath, pageContent);
  console.log('Updated links in blogs/page.js');
}

