const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'index.vue');
let content = fs.readFileSync(filePath, 'utf8');

// 定义所有需要替换的图片名称
const imageNames = [
  'lishaoyi', 'xuyebao', 'zhaoanna', 'zhangrundi', 'maping',
  'dannychan', 'kennychan', 'lixiaofei', 'jiangnanxi', 'liweibo',
  'lixiaoyu', 'zhaoxueyan', 'lizhao', 'betty', 'panjuan',
  'huanghaowen', 'jackychan', 'songhongtao', 'zhangfan', 'chenlie',
  'duanhaining', 'liangjiaqi', 'shunyoshie', 'smile', 'liuyanglin',
  'tracywang'
];

// 替换所有图片路径
imageNames.forEach(name => {
  // 替换桌面版路径（不带_mobile或_mb后缀）
  const desktopPattern1 = new RegExp(`require\\('@/assets/images/amarathon12/${name}\\.png'\\)`, 'g');
  const desktopReplacement = `require('@/assets/images/amarathon12/desktop/${name}.png')`;
  
  // 替换移动版路径（带_mobile后缀）
  const mobilePattern1 = new RegExp(`require\\('@/assets/images/amarathon12/${name}_mobile\\.png'\\)`, 'g');
  const mobileReplacement = `require('@/assets/images/amarathon12/mobile/${name}.png')`;
  
  // 替换移动版路径（带_mb后缀）
  const mobilePattern2 = new RegExp(`require\\('@/assets/images/amarathon12/${name}_mb\\.png'\\)`, 'g');
  
  // 先替换移动版（避免被桌面版替换覆盖）
  content = content.replace(mobilePattern1, mobileReplacement);
  content = content.replace(mobilePattern2, mobileReplacement);
  
  // 再替换桌面版
  content = content.replace(desktopPattern1, desktopReplacement);
});

// 写回文件
fs.writeFileSync(filePath, content, 'utf8');

console.log('✓ All image paths updated successfully!');
console.log('  - Desktop images: @/assets/images/amarathon12/desktop/');
console.log('  - Mobile images: @/assets/images/amarathon12/mobile/');
