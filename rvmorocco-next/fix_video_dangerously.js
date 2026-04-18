const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'src', 'app', 'features');
const featureFolders = fs.readdirSync(featuresDir);

for (const folder of featureFolders) {
    const blogSectionPath = path.join(featuresDir, folder, 'BlogSection.jsx');
    if (fs.existsSync(blogSectionPath)) {
        let content = fs.readFileSync(blogSectionPath, 'utf8');
        
        // Match the entire <video>...</video> block
        // It looks like: <video defaultMuted width="100%" autoPlay loop muted playsInline poster="/compressed_videos/...png" ...> ... </video>
        const videoRegex = /<video\s+[^>]*>[\s\S]*?<\/video>/g;
        
        if (videoRegex.test(content) && !content.includes('dangerouslySetInnerHTML')) {
            content = content.replace(videoRegex, (match) => {
                // Escape backticks and standard variables
                const safeHtml = match.replace(/`/g, '\\`').replace(/\$/g, '\\$');
                
                // Return wrapped in dangerouslySetInnerHTML
                return `<div dangerouslySetInnerHTML={{ __html: \`${safeHtml}\` }} />`;
            });
            fs.writeFileSync(blogSectionPath, content);
            console.log(`Updated dangerouslySetInnerHTML in ${blogSectionPath}`);
        }
    }
}
console.log('Done wrapping videos in dangerouslySetInnerHTML!');
