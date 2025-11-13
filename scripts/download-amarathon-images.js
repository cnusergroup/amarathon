const https = require('https');
const fs = require('fs');
const path = require('path');

// 创建必要的目录
const baseDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'amarothon12');
const photoDir = path.join(baseDir, 'photo');
const photoMbDir = path.join(baseDir, 'photo_mb');

[baseDir, photoDir, photoMbDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 下载单个文件的函数
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
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// 主要图片列表
const images = {
  // Poster images (background images)
  'poster.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/poster.ee0592c.png',
  
  // Home section images
  'home_desc.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_desc.8336b67.png',
  'home_schedule.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_schedule.9910e7e.png',
  'home_speaker.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/home_speaker.556b677.png',
  
  // Partner logos
  'partner_logo_infoq.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_infoq.14eb97e.png',
  'partner_logo_infoq_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_infoq_mb.36c2697.png',
  'partner_logo_segmentfault.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_segmentfault.0446169.png',
  'partner_logo_segmentfault_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_segmentfault_mb.01afd58.png',
  'partner_logo_itpub.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_itpub.331afd5.png',
  'partner_logo_itpub_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_itpub_mb.fc2087e.png',
  'partner_logo_gitcode.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_gitcode.2482669.png',
  'partner_logo_gitcode_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_gitcode_mb.e871ac1.png',
  'partner_logo_msup.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_msup.c40080f.png',
  'partner_logo_msup_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_msup_mb.d7f5e54.png',
  'partner_logo_rte.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_rte.b581e54.png',
  'partner_logo_rte_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_rte_mb.84b6e1f.png',
  'partner_logo_simba.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_simba.50e5ee5.png',
  'partner_logo_simba_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_simba_mb.1df2419.png',
  'partner_logo_oschina.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_oschina.99845f6.png',
  'partner_logo_oschina_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_oschina_mb.8133620.png',
  'partner_logo_csdn.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_csdn.e6b08ca.png',
  'partner_logo_csdn_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/partner_logo_csdn_mb.f3ca110.png',
  
  // Social media icons
  'agenda_x.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/agenda_x.252a29b.png',
  'agenda_f.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/agenda_f.6120919.png',
  'agenda_ins.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/agenda_ins.b0c50e3.png',
  'agenda_github.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/agenda_github.6120919.png',
  'agenda_in.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/agenda_in.6120919.png',
  'agenda_www.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/agenda_www.55251be.png'
};

// Speaker photos (1-36)
const speakerPhotos = {};
for (let i = 1; i <= 36; i++) {
  const hash = [
    '4cdec65', 'c1fd9ab', 'dfa80c4', 'af70e1b', '5ea98e3', 'e82605d',
    'ac03b25', 'f3384e9', '5566cd3', '94dcd3a', 'fb814a5', 'f8e5155',
    '4949d7f', '761ff13', '6074ef8', 'c6ecb80', '6501d31', '5b45536',
    '7c734e6', '13312c9', 'f67d89b', 'b8ab802', 'dea115e', '66c2edd',
    'f53d429', 'a1294b4', 'ac186f2', 'f4bc58b', '9d34f4c', '56f2d4f',
    '6166887', 'af3b274', '5238794', 'dccd9fa', '7764a72', 'dd96f6d'
  ][i - 1];
  speakerPhotos[`photo/${i}.png`] = `https://dev-media.amazoncloud.cn/client-250819071524/img/${i}.${hash}.png`;
}

async function downloadAll() {
  console.log('🚀 Starting image download...\n');
  
  // Download main images
  console.log('📥 Downloading main images...');
  for (const [filename, url] of Object.entries(images)) {
    try {
      await downloadFile(url, path.join(baseDir, filename));
    } catch (error) {
      console.error(`✗ Failed to download ${filename}:`, error.message);
    }
  }
  
  // Download speaker photos
  console.log('\n📥 Downloading speaker photos...');
  for (const [filename, url] of Object.entries(speakerPhotos)) {
    try {
      await downloadFile(url, path.join(baseDir, filename));
    } catch (error) {
      console.error(`✗ Failed to download ${filename}:`, error.message);
    }
  }
  
  console.log('\n✅ Download complete!');
  console.log(`📁 Images saved to: ${baseDir}`);
}

downloadAll().catch(console.error);
