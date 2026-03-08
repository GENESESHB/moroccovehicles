const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'Dashboard');

function processDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let changed = false;
      const original = content;

      // Fix contexts/AuthContext
      content = content.replace(/['"]\.\.\/\.\.\/\.\.\/contexts\/AuthContext['"]/g, "'../../contexts/AuthContext'");
      content = content.replace(/['"]\.\.\/\.\.\/contexts\/AuthContext['"]/g, "'../contexts/AuthContext'");
      
      // Fix utils/api
      content = content.replace(/['"]\.\.\/\.\.\/\.\.\/\.\.\/utils\/api['"]/g, "'../../../utils/api'");
      content = content.replace(/['"]\.\.\/\.\.\/\.\.\/utils\/api['"]/g, "'../../utils/api'");
      content = content.replace(/['"]\.\.\/\.\.\/utils\/api['"]/g, "'../utils/api'");
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed', fullPath);
      }
    }
  }
}

processDir(dir);
console.log('Done fixing paths');
