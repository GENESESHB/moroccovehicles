const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'src', 'app', 'features');
const featureFolders = fs.readdirSync(featuresDir);

for (const folder of featureFolders) {
    const blogSectionPath = path.join(featuresDir, folder, 'BlogSection.jsx');
    if (fs.existsSync(blogSectionPath)) {
        let content = fs.readFileSync(blogSectionPath, 'utf8');
        
        // Check if the file has a video tag
        if (content.includes('<video ')) {
            // Replace <video ...> with <video defaultMuted ...> if it's not already there
            if (!content.includes('defaultMuted')) {
                content = content.replace(/<video /g, '<video defaultMuted ');
                fs.writeFileSync(blogSectionPath, content);
                console.log(`Updated ${blogSectionPath}`);
            }
        }
    }
}
console.log('Done adding defaultMuted to video tags!');
