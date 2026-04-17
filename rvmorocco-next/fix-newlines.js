const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'src/app/features');
const features = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

features.forEach(featureDir => {
    const fullDir = path.join(featuresDir, featureDir);
    const files = fs.readdirSync(fullDir);
    const clientFile = files.find(f => f.endsWith('Client.jsx') || f.endsWith('Client.tsx') || f === 'page.js');
    
    if (clientFile && clientFile.endsWith('Client.jsx')) {
        const clientPath = path.join(fullDir, clientFile);
        let clientContent = fs.readFileSync(clientPath, 'utf8');

        // Fix \n issue
        if(clientContent.includes('\\n')) {
             clientContent = clientContent.replace(/\\n/g, '\n');
             fs.writeFileSync(clientPath, clientContent);
             console.log("Fixed \n in " + clientFile);
        }
    }
});
