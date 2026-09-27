const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    'home2.html',
    'about.html',
    'products.html',
    'custom-branding.html',
    'bulk-orders.html',
    'contact.html'
];

const svgLogo = `<svg width="28" height="28" viewBox="0 -4 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="brand-logomark"><path d="M6 12 L20 20 L20 36 L6 28 Z" fill="currentColor" opacity="0.4"/><path d="M20 20 L34 12 L34 28 L20 36 Z" fill="currentColor"/><path d="M20 -2 L34 6 L20 14 L6 6 Z" fill="var(--clr-gold)"/></svg>`;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Replace header logo
        content = content.replace(
            /<a href="index\.html" class="brand-logo">BoxCraft<\/a>/g,
            `<a href="index.html" class="brand-logo">${svgLogo}<span class="brand-text">Structura</span></a>`
        );

        // 2. Replace footer logo
        content = content.replace(
            /<a href="index\.html" class="footer-logo">BoxCraft Pro<\/a>/g,
            `<a href="index.html" class="footer-logo">${svgLogo}<span class="brand-text" style="margin-left: 8px;">Structura</span></a>`
        );

        // 3. Replace text references
        content = content.replace(/BoxCraft Pro/g, 'Structura');
        content = content.replace(/hello@boxcraftpro\.com/g, 'hello@structura.com');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated branding in ${file}`);
    }
});

// Remove generic pseudo-element boxes from CSS
const stylePath = path.join(__dirname, 'css/style.css');
if (fs.existsSync(stylePath)) {
    let styleContent = fs.readFileSync(stylePath, 'utf8');
    styleContent = styleContent.replace(/\.brand-logo::before\s*{[^}]*}/g, '');
    fs.writeFileSync(stylePath, styleContent, 'utf8');
    console.log(`Updated style.css`);
}

const pagesPath = path.join(__dirname, 'css/pages.css');
if (fs.existsSync(pagesPath)) {
    let pagesContent = fs.readFileSync(pagesPath, 'utf8');
    pagesContent = pagesContent.replace(/\.footer-logo::before\s*{[^}]*}/g, '');
    fs.writeFileSync(pagesPath, pagesContent, 'utf8');
    console.log(`Updated pages.css`);
}
