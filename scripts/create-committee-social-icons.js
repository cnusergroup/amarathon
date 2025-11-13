const fs = require('fs');
const path = require('path');

// 创建小红书图标（红色背景，白色logo）
const xiaohongshuSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect width="24" height="24" fill="#FF2442" rx="4"/>
  <path fill="#FFFFFF" d="M7 6h2v12H7V6zm4 0h2v12h-2V6zm4 0h2v12h-2V6z"/>
  <circle cx="8" cy="8" r="1" fill="#FFFFFF"/>
  <circle cx="12" cy="8" r="1" fill="#FFFFFF"/>
  <circle cx="16" cy="8" r="1" fill="#FFFFFF"/>
</svg>`;

// 创建CSDN图标（红色背景）
const csdnSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect width="24" height="24" fill="#FC5531" rx="4"/>
  <text x="12" y="16" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">CSDN</text>
</svg>`;

const iconsDir = path.join(__dirname, '../src/assets/images/amarothon12');

// 保存SVG文件
fs.writeFileSync(path.join(iconsDir, 'xiaohongshu.svg'), xiaohongshuSVG);
fs.writeFileSync(path.join(iconsDir, 'csdn.svg'), csdnSVG);

console.log('Committee social media icons created successfully!');
console.log('Created files:');
console.log('- xiaohongshu.svg');
console.log('- csdn.svg');
