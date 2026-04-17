const fs = require('fs');
const path = require('path');

// 1. Revert CSS to simple/clean light theme
const cssPath = path.join(__dirname, 'src/app/blogs/blogs.module.css');
const simpleCss = `
.blogsPageWrapper {
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 60px;
  font-family: inherit;
}

.containerContent {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.heroSection {
  background: #ffffff;
  padding: 80px 0 60px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.heroContent {
  max-width: 800px;
  margin: 0 auto;
}

.heroContent h1 {
  font-size: 48px;
  font-weight: bold;
  color: #0f172a;
  margin-bottom: 20px;
}

.heroContent p {
  font-size: 18px;
  color: #64748b;
  line-height: 1.6;
}

.blogsListSection {
  padding: 60px 0 100px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

.blogCard {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blogCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.imageContainer {
  position: relative;
  width: 100%;
  height: 220px;
}

.blogImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blogCategory {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #3b82f6;
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.blogContent {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.blogTitle {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
}

.blogTitle a {
  text-decoration: none;
  color: inherit;
}

.blogTitle a:hover {
  color: #3b82f6;
}

.blogExcerpt {
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
}

.blogFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}

.readTime {
  font-size: 14px;
  color: #94a3b8;
}

.readMore {
  color: #3b82f6;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.readMore:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .heroContent h1 {
    font-size: 36px;
  }
}
`;
fs.writeFileSync(cssPath, simpleCss);
console.log('✅ Reverted blogs.module.css');

// 2. Update the 5 feature images
const NEW_IMG_MAP = {
  'assurance': '/image_fetures-logeciel-flotte_gestionaire/insurance.png',
  'black-list': '/image_fetures-logeciel-flotte_gestionaire/lists-noir.png',
  'calendrier': '/image_fetures-logeciel-flotte_gestionaire/calander.png',
  'clients': '/image_fetures-logeciel-flotte_gestionaire/cliens.png',
  'maintenance': '/image_fetures-logeciel-flotte_gestionaire/maintenance.png',
};

const base = path.join(__dirname, 'src/app/features');

Object.keys(NEW_IMG_MAP).forEach(feature => {
  const p = path.join(base, feature, 'BlogSection.jsx');
  if(!fs.existsSync(p)) return;
  
  let c = fs.readFileSync(p, 'utf8');
  const newImg = NEW_IMG_MAP[feature];

  // Regex to find: <img src="..." alt="..." style={{ width: '100%', display: 'block', maxHeight: '600px', ...
  // It's the ONLY image with maxHeight: '600px'
  // I will use a very flexible regex to match it.
  const regex = /<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+style=\{\{\s*width:\s*'100%',\s*display:\s*'block',\s*maxHeight:\s*'600px'/;
  
  const match = c.match(regex);
  if (match) {
    const currentSrc = match[1];
    if (currentSrc !== newImg) {
      c = c.replace(currentSrc, newImg);
      // We will ensure it changed in the source
      fs.writeFileSync(p, c);
      console.log(`✅ Updated BlogSection image for ${feature}`);
    } else {
      console.log(`ℹ️ BlogSection for ${feature} already has correct image`);
    }
  } else {
     console.log(`⚠️ Could not find exact hero image match in ${feature}`);
     // let's try a simpler fallback matching "Capture Système Principale" surrounding code.
     // Find the `<img src=... maxHeight: '600px'` anywhere around the wrapper.
     // In react, it is: <img src="/image..." alt="..." style={{ width: '100%', display: 'block', maxHeight: '600px', objectFit: 'cover', transform: 'scale(1.02)', transition: 'transform 0.5s ease' }} />
     
     const fallbackRegex = /<img\s+src="\/image_fetures-logeciel-flotte_gestionaire\/[^"]+"\s+alt="[^"]+"\s+style=\{\{ width: '100%', display: 'block', maxHeight: '600px'/;
     if(fallbackRegex.test(c)){
         c = c.replace(/\/image_fetures-logeciel-flotte_gestionaire\/[^"]+/, newImg);
         fs.writeFileSync(p, c);
         console.log(`✅ Updated BlogSection (via fallback) for ${feature}`);
     }
  }
});
