const https = require('https');
const fs = require('fs');
const path = require('path');

// 桌面版照片 URL（360×480，竖向）- 从原网站获取的真实URL
const desktopPhotos = [
  { name: 'lishaoyi', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/lishaoyi.f02b678.png' },
  { name: 'xuyebao', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/xuyebao.54da634.png' },
  { name: 'zhaoanna', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhaoanna.c5eb83b.png' },
  { name: 'zhangrundi', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhangrundi.a73b145.png' },
  { name: 'maping', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/maping.0d32828.png' },
  { name: 'dannychan', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/dannychan.2a41a4c.png' },
  { name: 'kennychan', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/kennychan.30b3551.png' },
  { name: 'lixiaofei', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/lixiaofei.3f09bc6.png' },
  { name: 'jiangnanxi', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E8%92%8B%E5%8D%97%E5%B8%8C%20Nancy%20Jiang.84e7de8.png' },
  { name: 'liweibo', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E7%82%9C%E6%B3%A2%20Weibo%20LI.56e1838.png' },
  { name: 'lixiaoyu', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E6%99%93%E5%BD%A7%20Alex%20Lee.fc8c0cb.png' },
  { name: 'zhaoxueyan', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E8%B5%B5%E9%9B%AA%E5%A6%8D%20Shane%20Zhao.acfd7c4.png' },
  { name: 'lizhao', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E9%92%8A%20Li%20Zhao.0f94c54.png' },
  { name: 'betty', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/betty.749af37.png' },
  { name: 'panjuan', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/panjuan.4fde5fe.png' },
  { name: 'huanghaowen', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/huanghaowen.670fe31.png' },
  { name: 'jackychan', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/jackychan.d74a183.png' },
  { name: 'songhongtao', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E5%AE%8B%E6%B4%AA%E6%B6%9B%20Hongtao%20Song.a0d6333.png' },
  { name: 'zhangfan', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E5%BC%A0%E5%B8%86%20Fan%20Zhang.a8fa8db.png' },
  { name: 'chenlie', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E9%99%88%E7%83%88%20Charlie%20Chen.f12f9bf.png' },
  { name: 'duanhaining', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%AE%B5%E6%B5%B7%E5%AE%81%20Duan%20Haining.f624936.png' },
  { name: 'liangjiaqi', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%A2%81%E5%8A%A0%E7%90%A6%20Liang%20Jiaqi.773138e.png' },
  { name: 'shunyoshie', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/shunyoshie.4966c04.png' },
  { name: 'smile', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/smile.eefd68e.png' },
  { name: 'liuyanglin', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/liuyanglin.db9181d.png' },
  { name: 'tracywang', url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/tracywang.9c74edb.png' }
];

const targetDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'amarathon12', 'desktop');

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(targetDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        reject(new Error(`Failed: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(filePath).size;
        if (size === 0) {
          console.log(`✗ Downloaded but empty: ${filename}`);
          reject(new Error('Empty file'));
        } else {
          console.log(`✓ Downloaded: ${filename} (${size} bytes)`);
          resolve();
        }
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      reject(err);
    });
  });
}

async function downloadDesktopPhotos() {
  console.log(`Downloading ${desktopPhotos.length} desktop photos (360×480)...\n`);
  
  let successCount = 0;
  let failCount = 0;

  for (const photo of desktopPhotos) {
    try {
      const filename = `${photo.name}.png`;
      await downloadFile(photo.url, filename);
      successCount++;
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`✗ Failed: ${photo.name} - ${error.message}`);
      failCount++;
    }
  }

  console.log(`\n=== Desktop Photos Download Summary ===`);
  console.log(`Total: ${desktopPhotos.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

downloadDesktopPhotos().catch(console.error);
