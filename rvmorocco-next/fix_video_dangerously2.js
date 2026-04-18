const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'src', 'app', 'features');
const featureFolders = fs.readdirSync(featuresDir);

for (const folder of featureFolders) {
    const blogSectionPath = path.join(featuresDir, folder, 'BlogSection.jsx');
    if (fs.existsSync(blogSectionPath)) {
        let content = fs.readFileSync(blogSectionPath, 'utf8');
        
        // Find video block
        const videoStart = content.indexOf('<video defaultMuted');
        const videoEnd = content.indexOf('</video>', videoStart);
        
        if (videoStart !== -1 && videoEnd !== -1 && !content.includes('dangerouslySetInnerHTML={{ __html: `<video')) {
            const videoHtml = content.substring(videoStart, videoEnd + 8);
            
            // Clean up the React-specific properties into standard HTML for the string
            let cleanHtml = videoHtml
                .replace(/defaultMuted /g, '')
                .replace(/autoPlay/g, 'autoplay')
                .replace(/playsInline/g, 'playsinline')
                .replace(/style=\{\{.*?\}\}/, 'style="display: block; width: 100%; pointer-events: none;"');
            
            // Also escape any string interpolation tokens if any
            cleanHtml = cleanHtml.replace(/\$\{/g, '\\${');
            
            // Create the wrapper
            const wrapper = `<div dangerouslySetInnerHTML={{ __html: \`${cleanHtml}\` }} />`;
            
            content = content.replace(videoHtml, wrapper);
            fs.writeFileSync(blogSectionPath, content);
            console.log(`Replaced video with dangerouslySetInnerHTML in ${folder}`);
        }
    }
}
console.log('Finished wrapping all videos!');
