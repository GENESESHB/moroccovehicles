const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, 'src/app/features');
const dirs = fs.readdirSync(base).filter(d => {
    try {
        return fs.statSync(path.join(base, d)).isDirectory();
    } catch(e) { return false; }
});

dirs.forEach(d => {
  const p = path.join(base, d, 'BlogSection.jsx');
  if(fs.existsSync(p)){
    let c = fs.readFileSync(p, 'utf8');
    // Remove the event handlers that cause Server Component errors
    c = c.replace(/onMouseOver=\{[^}]+\}\s*onMouseOut=\{[^}]+\}/g, '');
    // Just in case it's on multiple lines or missed something
    c = c.replace(/onMouseOver=\{e\s*=>\s*\{[^}]+\}\}/g, '');
    c = c.replace(/onMouseOut=\{e\s*=>\s*\{[^}]+\}\}/g, '');
    fs.writeFileSync(p, c);
    console.log(`Fixed ${d}/BlogSection.jsx`);
  }
});
