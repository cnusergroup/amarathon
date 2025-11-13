const https = require('https');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'amarothon12');
const photoMbDir = path.join(baseDir, 'photo_mb');

// 确保目录存在
if (!fs.existsSync(photoMbDir)) {
  fs.mkdirSync(photoMbDir, { recursive: true });
}

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

// 移动端speaker照片 - 使用相同的hash
const mobilePhotos = {};
for (let i = 1; i <= 36; i++) {
  const hash = [
    '4cdec65', 'c1fd9ab', 'dfa80c4', 'af70e1b', '5ea98e3', 'e82605d',
    'ac03b25', 'f3384e9', '5566cd3', '94dcd3a', 'fb814a5', 'f8e5155',
    '4949d7f', '761ff13', '6074ef8', 'c6ecb80', '6501d31', '5b45536',
    '7c734e6', '13312c9', 'f67d89b', 'b8ab802', 'dea115e', '66c2edd',
    'f53d429', 'a1294b4', 'ac186f2', 'f4bc58b', '9d34f4c', '56f2d4f',
    '6166887', 'af3b274', '5238794', 'dccd9fa', '7764a72', 'dd96f6d'
  ][i - 1];
  mobilePhotos[`${i}.png`] = `https://dev-media.amazoncloud.cn/client-250819071524/img/${i}.${hash}.png`;
}

async function downloadMobilePhotos() {
  console.log('📥 Downloading mobile speaker photos...\n');
  
  for (const [filename, url] of Object.entries(mobilePhotos)) {
    try {
      await downloadFile(url, path.join(photoMbDir, filename));
    } catch (error) {
      console.error(`✗ Failed ${filename}:`, error.message);
    }
  }
  
  console.log('\n✅ Mobile photos download complete!');
}

downloadMobilePhotos().catch(console.error);
