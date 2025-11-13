const https = require('https');
const fs = require('fs');
const path = require('path');

// 从原网站提取的委员会成员照片 URL
const committeePhotos = [
  {
    name: 'lishaoyi',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/lishaoyi_mobile.ba46e6b.png'
  },
  {
    name: 'xuyebao',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/xuyebao_mobile.b85ceea.png'
  },
  {
    name: 'zhaoanna',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhaoanna_mobile.c120f08.png'
  },
  {
    name: 'zhangrundi',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhangrundi_mobile.79cdda4.png'
  },
  {
    name: 'maping',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/maping_mb.96f5597.png'
  },
  {
    name: 'dannychan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/dannychan_mb.ff26706.png'
  },
  {
    name: 'kennychan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/kennychan_mb.93d7227.png'
  },
  {
    name: 'lixiaofei',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/lixiaofei_mb.d52c9cd.png'
  },
  {
    name: 'jiangnanxi',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E8%92%8B%E5%8D%97%E5%B8%8C%20Nancy%20Jiang_mb.dbda29f.png'
  },
  {
    name: 'liweibo',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E7%82%9C%E6%B3%A2%20Weibo%20LI_mb.600a7ee.png'
  },
  {
    name: 'lixiaoyu',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E6%99%93%E5%BD%A7%20Alex%20Lee_mb.db0a099.png'
  },
  {
    name: 'zhaoxueyan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E8%B5%B5%E9%9B%AA%E5%A6%8D%20Shane%20Zhao_mb.9a16191.png'
  },
  {
    name: 'lizhao',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E9%92%8A%20Li%20Zhao_mb.8963fee.png'
  },
  {
    name: 'betty',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/betty_mb.0869bfb.png'
  },
  {
    name: 'panjuan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/panjuan_mb.3b7cc89.png'
  },
  {
    name: 'huanghaowen',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/huanghaowen_mb.cfb3bef.png'
  },
  {
    name: 'jackychan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/jackychan_mb.eb7fedf.png'
  },
  {
    name: 'songhongtao',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E5%AE%8B%E6%B4%AA%E6%B6%9B%20Hongtao%20Song_mb.f7d5bb1.png'
  },
  {
    name: 'zhangfan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E5%BC%A0%E5%B8%86%20Fan%20Zhang_mb.52afc11.png'
  },
  {
    name: 'chenlie',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E9%99%88%E7%83%88%20Charlie%20Chen_mb.f301110.png'
  },
  {
    name: 'duanhaining',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%AE%B5%E6%B5%B7%E5%AE%81%20Duan%20Haining_mb.c2abf5d.png'
  },
  {
    name: 'liangjiaqi',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%A2%81%E5%8A%A0%E7%90%A6%20Liang%20Jiaqi_mb.80be01b.png'
  },
  {
    name: 'shunyoshie',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/shunyoshie_mb.517a18e.png'
  },
  {
    name: 'smile',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/smile_mb.8925096.png'
  },
  {
    name: 'liuyanglin',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/liuyanglin_mobile.e0e003a.png'
  },
  {
    name: 'tracywang',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/tracywang_mb.0e20e8f.png'
  }
];

// 确保目标目录存在
const targetDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'amarathon12');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 下载单个文件的函数
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(targetDir, filename);
    
    // 检查文件是否已存在
    if (fs.existsSync(filePath)) {
      console.log(`✓ ${filename} already exists, skipping...`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 删除不完整的文件
      reject(err);
    });
  });
}

// 主函数
async function downloadAllPhotos() {
  console.log(`Starting download of ${committeePhotos.length} committee member photos...\n`);
  
  let successCount = 0;
  let failCount = 0;

  for (const photo of committeePhotos) {
    try {
      const ext = path.extname(new URL(photo.url).pathname);
      const filename = `${photo.name}${ext}`;
      await downloadFile(photo.url, filename);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to download ${photo.name}: ${error.message}`);
      failCount++;
    }
  }

  console.log(`\n=== Download Summary ===`);
  console.log(`Total: ${committeePhotos.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

// 执行下载
downloadAllPhotos().catch(console.error);
