const fs = require('fs');
const path = require('path');

// 1. Update CSS for premium design
const cssPath = path.join(__dirname, 'src/app/blogs/blogs.module.css');
const cssContent = `
.blogsPageWrapper {
  min-height: 100vh;
  background: #0f172a;
  padding-top: 80px; 
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #fff;
}

.containerContent {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.heroSection {
  background: radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%);
  padding: 100px 0 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.heroSection::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 60%);
  z-index: 0;
}

.heroContent {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.heroContent h1 {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.heroContent p {
  font-size: 20px;
  line-height: 1.6;
  color: #94a3b8;
}

.heroContent strong {
  color: #38bdf8;
  font-weight: 700;
}

/* Blogs Grid */
.blogsListSection {
  padding: 80px 0 120px;
  background: #0f172a;
  position: relative;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 40px;
}

.blogCard {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.blogCard:hover {
  transform: translateY(-8px);
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.1);
}

.imageContainer {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background-color: #1e293b;
}

.imageContainer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 50%);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.blogCard:hover .imageContainer::after {
  opacity: 0.5;
}

.blogImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.blogCard:hover .blogImage {
  transform: scale(1.08);
}

.blogCategory {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(56, 189, 248, 0.2);
  border: 1px solid rgba(56, 189, 248, 0.5);
  color: #38bdf8;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 10;
  backdrop-filter: blur(4px);
}

.blogContent {
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.blogTitle {
  font-size: 22px;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 16px;
  line-height: 1.4;
}

.blogTitle a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;
}

.blogTitle a:hover {
  color: #38bdf8;
}

.blogExcerpt {
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 30px;
  flex-grow: 1;
}

.blogFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.readTime {
  font-size: 14px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.readMore {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #38bdf8;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.readMore svg {
  transition: transform 0.2s ease;
}

.readMore:hover {
  color: #7dd3fc;
}

.readMore:hover svg {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .heroContent h1 {
    font-size: 40px;
  }
  
  .heroContent p {
    font-size: 18px;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}
`;
fs.writeFileSync(cssPath, cssContent);
console.log('✅ Updated blogs.module.css with premium glassmorphism design');


// 2. Update mappings in blogs/page.js
const NEW_IMG_MAP = {
  'assurance': '/image_fetures-logeciel-flotte_gestionaire/insurance.png',
  'black-list': '/image_fetures-logeciel-flotte_gestionaire/lists-noir.png',
  'calendrier': '/image_fetures-logeciel-flotte_gestionaire/calander.png',
  'clients': '/image_fetures-logeciel-flotte_gestionaire/cliens.png',
  'maintenance': '/image_fetures-logeciel-flotte_gestionaire/maintenance.png',
};

const blogsPagePath = path.join(__dirname, 'src/app/blogs/page.js');
let blogsPageContent = fs.readFileSync(blogsPagePath, 'utf8');

Object.keys(NEW_IMG_MAP).forEach(key => {
  const newImg = NEW_IMG_MAP[key];
  const rx = new RegExp(`(id:\\s*'${key}'[\\s\\S]*?image:\\s*')[^']+(')`);
  blogsPageContent = blogsPageContent.replace(rx, `$1${newImg}$2`);
});
fs.writeFileSync(blogsPagePath, blogsPageContent);
console.log('✅ Updated src/app/blogs/page.js with new images');


// 3. Update BlogSection.jsx for these 5 modules
const base = path.join(__dirname, 'src/app/features');

Object.keys(NEW_IMG_MAP).forEach(feature => {
  const p = path.join(base, feature, 'BlogSection.jsx');
  if(!fs.existsSync(p)) return;
  
  let c = fs.readFileSync(p, 'utf8');
  
  // We need to replace the hero image (Capture Système Principale) and push the OLD hero to the gallery.
  // The hero is identified by `maxHeight: '600px'` and `Capture Système Principale`
  // Regex to extract the OLD hero src:
  const heroMatch = c.match(/<img src="([^"]+)" alt="([^"]+)" style=\{\{ width: '100%', display: 'block', maxHeight: '600px'/);
  
  if (heroMatch) {
    const oldHeroSrc = heroMatch[1];
    const newHeroSrc = NEW_IMG_MAP[feature];
    
    // Only update if they differ
    if (oldHeroSrc !== newHeroSrc) {
       // Replace the hero src
       c = c.replace(
         /<img src="[^"]+" alt="[^"]+" style=\\{\\{ width: '100%', display: 'block', maxHeight: '600px'/g,
         `<img src="${newHeroSrc}" alt="${feature}" style={{ width: '100%', display: 'block', maxHeight: '600px'`
       );
       
       // Add the OLD hero to the gallery. 
       // Look for the gallery grid and inject it
       const gridRegex = /<div style=\{\{\s*display:\s*'grid'[^>]*\}\}>/;
       if (gridRegex.test(c)) {
           // Create the new gallery item
           const newItem = `
                <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: 'white', border: '1px solid #e2e8f0' }}>
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img src="${oldHeroSrc}" alt="Screenshot additionnel" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ color: '#0f172a', fontSize: '14px', fontWeight: '600', lineHeight: '1.4' }}>Détails avancés : ${feature}</div>
                  </div>
                </div>`;
           
           c = c.replace(gridRegex, `$&
${newItem}`);
       }
    }
  }

  // Also I'll make the BlogSection article styling dark mode to match the very premium index page? No, individual articles can remain light mode or follow system. But let's leave article styles alone as per user.

  fs.writeFileSync(p, c);
  console.log(`✅ Applied new mapping for ${feature}`);
});
