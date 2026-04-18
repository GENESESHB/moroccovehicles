const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'compressed_videos');
const featuresDir = path.join(__dirname, 'src', 'app', 'features');

const files = fs.readdirSync(publicDir);

for (const file of files) {
    if (!file.endsWith('.mp4')) continue;
    
    // Create a URL-safe name: lowercase, replace spaces and underscores with hyphens
    let newName = file
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/_/g, '-')
        .replace(/-+/g, '-');
        
    if (newName !== file) {
        console.log(`Renaming: "${file}" -> "${newName}"`);
        
        // 1. Rename the file
        fs.renameSync(path.join(publicDir, file), path.join(publicDir, newName));
        
        // 2. Update all BlogSection.jsx files
        const featureFolders = fs.readdirSync(featuresDir);
        for (const folder of featureFolders) {
            const blogSectionPath = path.join(featuresDir, folder, 'BlogSection.jsx');
            if (fs.existsSync(blogSectionPath)) {
                let content = fs.readFileSync(blogSectionPath, 'utf8');
                // Replace exact old filename with new filename
                const escapedOldName = file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex chars
                const regex = new RegExp(escapedOldName, 'g');
                
                if (regex.test(content)) {
                    content = content.replace(regex, newName);
                    fs.writeFileSync(blogSectionPath, content);
                    console.log(`  Updated ${blogSectionPath}`);
                }
            }
        }
    }
}
console.log('Done fixing video names!');
