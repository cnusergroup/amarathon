const fs = require('fs');
const path = require('path');

// 创建目录
const iconsDir = path.join(__dirname, '../src/assets/images/amarothon12');

// 社交媒体图标 SVG
const icons = {
  'agenda_f.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <rect width="24" height="24" fill="#1877F2" rx="4"/>
    <path fill="#FFFFFF" d="M13.5 21v-7.5h2.5l.4-3h-2.9V9c0-.8.2-1.4 1.4-1.4h1.6V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.5v3h2.8V21h3.2z"/>
  </svg>`,
  
  'agenda_in.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <rect width="24" height="24" fill="#0A66C2" rx="2"/>
    <path fill="#FFFFFF" d="M6.5 8.5h2.5v8h-2.5v-8zm1.3-4c.8 0 1.5.7 1.5 1.5S8.6 7.5 7.8 7.5 6.3 6.8 6.3 6s.7-1.5 1.5-1.5zm5.2 4h2.4v1.1c.3-.6 1.1-1.2 2.3-1.2 2.5 0 2.9 1.6 2.9 3.7v4.4h-2.5v-3.9c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2v4h-2.5v-8z"/>
  </svg>`,
  
  'in.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <rect width="24" height="24" fill="#0A66C2" rx="2"/>
    <path fill="#FFFFFF" d="M6.5 8.5h2.5v8h-2.5v-8zm1.3-4c.8 0 1.5.7 1.5 1.5S8.6 7.5 7.8 7.5 6.3 6.8 6.3 6s.7-1.5 1.5-1.5zm5.2 4h2.4v1.1c.3-.6 1.1-1.2 2.3-1.2 2.5 0 2.9 1.6 2.9 3.7v4.4h-2.5v-3.9c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2v4h-2.5v-8z"/>
  </svg>`
};

// 将SVG转换为PNG需要额外的库，这里我们直接保存为SVG
// 然后在代码中使用SVG
Object.keys(icons).forEach(filename => {
  const svgFilename = filename.replace('.png', '.svg');
  const filePath = path.join(iconsDir, svgFilename);
  fs.writeFileSync(filePath, icons[filename]);
  console.log(`✓ 已创建 ${svgFilename}`);
});

console.log('\n所有社交媒体图标已创建完成！');
console.log(`图标保存在: ${iconsDir}`);
console.log('\n注意：这些是SVG格式的图标。');
console.log('如果需要PNG格式，请在Vue组件中将 .png 改为 .svg');
