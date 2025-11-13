const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/index.vue');

// 读取文件（UTF-8编码）
let content = fs.readFileSync(filePath, 'utf8');

// 只替换 require() 中的PNG为SVG（Committee页面使用的格式）
// 不替换直接的 src='@/assets/...' 格式（Agenda页面使用的格式）
content = content.replace(/require\('@\/assets\/images\/amarothon12\/xiaohongshu\.png'\)/g, 
                         "require('@/assets/images/amarothon12/xiaohongshu.svg')");
content = content.replace(/require\('@\/assets\/images\/amarothon12\/csdn\.png'\)/g, 
                         "require('@/assets/images/amarothon12/csdn.svg')");
content = content.replace(/require\('@\/assets\/images\/amarothon12\/douyin\.png'\)/g, 
                         "require('@/assets/images/amarothon12/douyin.svg')");
content = content.replace(/require\('@\/assets\/images\/amarothon12\/in\.png'\)/g, 
                         "require('@/assets/images/amarothon12/in.svg')");

// 保存文件（UTF-8编码，无BOM）
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Committee社交媒体图标已从PNG替换为SVG');
console.log('替换的图标：');
console.log('  - xiaohongshu.png → xiaohongshu.svg');
console.log('  - csdn.png → csdn.svg');
console.log('  - douyin.png → douyin.svg');
console.log('  - in.png → in.svg');
