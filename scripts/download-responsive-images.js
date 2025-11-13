const https = require('https');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'amarothon12');

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// 响应式图片 - 这些可能需要从不同的URL获取，或者我们可以复制桌面版本作为占位符
const responsiveImages = {
  // Poster images for different breakpoints
  'poster_pad.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/poster.ee0592c.png',
  'poster_mobile.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/poster.ee0592c.png',
  
  // Home section images for different breakpoints
  'home_desc_pad.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_desc.8336b67.png',
  'home_desc_mobile.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_desc.8336b67.png',
  'home_schedule_pad.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_schedule.9910e7e.png',
  'home_schedule_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_schedule.9910e7e.png',
  'home_speaker_pad.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_speaker.556b677.png',
  'home_speaker_mobile.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_speaker.556b677.png'
};

async function downloadResponsiveImages() {
  console.log('📥 Downloading responsive images...\n');
  
  for (const [filename, url] of Object.entries(responsiveImages)) {
    const filepath = path.join(baseDir, filename);
    
    // 检查文件是否已存在
    if (fs.existsSync(filepath)) {
      console.log(`⊘ Skipped (exists): ${filename}`);
      continue;
    }
    
    try {
      await downloadFile(url, filepath);
    } catch (error) {
      console.error(`✗ Failed ${filename}:`, error.message);
      
      // 如果下载失败，尝试复制桌面版本作为占位符
      const desktopVersion = filename.replace('_pad', '').replace('_mobile', '').replace('_mb', '');
      const desktopPath = path.join(baseDir, desktopVersion);
      
      if (fs.existsSync(desktopPath)) {
        fs.copyFileSync(desktopPath, filepath);
        console.log(`  ↳ Copied from desktop version: ${filename}`);
      }
    }
  }
  
  console.log('\n✅ Responsive images download complete!');
}

downloadResponsiveImages().catch(console.error);
