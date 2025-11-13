const fs = require('fs');
const path = require('path');

// 创建小红书图标（红色背景，白色logo）
const xiaohongshuSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect width="24" height="24" fill="#FF2442" rx="4"/>
  <g fill="#FFFFFF">
    <rect x="6" y="7" width="2" height="10" rx="1"/>
    <rect x="11" y="7" width="2" height="10" rx="1"/>
    <rect x="16" y="7" width="2" height="10" rx="1"/>
    <circle cx="7" cy="9" r="0.8"/>
    <circle cx="12" cy="9" r="0.8"/>
    <circle cx="17" cy="9" r="0.8"/>
  </g>
</svg>`;

// 创建CSDN图标（红色背景）
const csdnSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect width="24" height="24" fill="#FC5531" rx="4"/>
  <text x="12" y="15.5" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">CSDN</text>
</svg>`;

// 创建抖音图标（黑色背景，彩色logo）
const douyinSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect width="24" height="24" fill="#000000" rx="4"/>
  <g transform="translate(6, 5)">
    <path d="M8 0C8 0 8.5 2 10 3.5C11.5 5 13.5 5.5 13.5 5.5V8C13.5 8 11 8 9.5 6.5V12C9.5 14.5 7.5 16.5 5 16.5C2.5 16.5 0.5 14.5 0.5 12C0.5 9.5 2.5 7.5 5 7.5V10C4 10 3 11 3 12C3 13 4 14 5 14C6 14 7 13 7 12V0H8Z" fill="#00F2EA"/>
    <path d="M8 0C8 0 8.5 2 10 3.5C11.5 5 13.5 5.5 13.5 5.5V8C13.5 8 11 8 9.5 6.5V12C9.5 14.5 7.5 16.5 5 16.5C2.5 16.5 0.5 14.5 0.5 12C0.5 9.5 2.5 7.5 5 7.5V10C4 10 3 11 3 12C3 13 4 14 5 14C6 14 7 13 7 12V0H8Z" fill="#FE2C55" transform="translate(0.5, 0.5)"/>
  </g>
</svg>`;

const iconsDir = path.join(__dirname, '../src/assets/images/amarothon12');

// 保存SVG文件
fs.writeFileSync(path.join(iconsDir, 'xiaohongshu.svg'), xiaohongshuSVG);
fs.writeFileSync(path.join(iconsDir, 'csdn.svg'), csdnSVG);
fs.writeFileSync(path.join(iconsDir, 'douyin.svg'), douyinSVG);

console.log('All committee social media icons created successfully!');
console.log('Created files:');
console.log('- xiaohongshu.svg');
console.log('- csdn.svg');
console.log('- douyin.svg');
