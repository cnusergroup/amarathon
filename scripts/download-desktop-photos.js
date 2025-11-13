const https = require('https');
const fs = require('fs');
const path = require('path');

// 桌面版照片 URL（不带 _mobile 或 _mb 后缀）
const desktopPhotos = [
  {
    name: 'lishaoyi',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/lishaoyi.f02b678.png'
  },
  {
    name: 'xuyebao',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/xuyebao.54da634.png'
  },
  {
    name: 'zhaoanna',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhaoanna.c5eb83b.png'
  },
  {
    name: 'zhangrundi',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhangrundi.a73b145.png'
  },
  {
    name: 'maping',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/maping.0d32828.png'
  },
  {
    name: 'dannychan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/dannychan.e5e5e5e.png'
  },
  {
    name: 'kennychan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/kennychan.8c8c8c8.png'
  },
  {
    name: 'lixiaofei',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/lixiaofei.d5d5d5d.png'
  },
  {
    name: 'jiangnanxi',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E8%92%8B%E5%8D%97%E5%B8%8C%20Nancy%20Jiang.png'
  },
  {
    name: 'liweibo',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E7%82%9C%E6%B3%A2%20Weibo%20LI.png'
  },
  {
    name: 'lixiaoyu',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E6%99%93%E5%BD%A7%20Alex%20Lee.png'
  },
  {
    name: 'zhaoxueyan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E8%B5%B5%E9%9B%AA%E5%A6%8D%20Shane%20Zhao.png'
  },
  {
    name: 'lizhao',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%9D%8E%E9%92%8A%20Li%20Zhao.png'
  },
  {
    name: 'betty',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/betty.0869bfb.png'
  },
  {
    name: 'panjuan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/panjuan.3b7cc89.png'
  },
  {
    name: 'huanghaowen',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/huanghaowen.cfb3bef.png'
  },
  {
    name: 'jackychan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/jackychan.eb7fedf.png'
  },
  {
    name: 'songhongtao',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E5%AE%8B%E6%B4%AA%E6%B6%9B%20Hongtao%20Song.png'
  },
  {
    name: 'zhangfan',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E5%BC%A0%E5%B8%86%20Fan%20Zhang.png'
  },
  {
    name: 'chenlie',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E9%99%88%E7%83%88%20Charlie%20Chen.png'
  },
  {
    name: 'duanhaining',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%AE%B5%E6%B5%B7%E5%AE%81%20Duan%20Haining.png'
  },
  {
    name: 'liangjiaqi',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/%E6%A2%81%E5%8A%A0%E7%90%A6%20Liang%20Jiaqi.png'
  },
  {
    name: 'shunyoshie',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/shunyoshie.517a18e.png'
  },
  {
    name: 'smile',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/smile.eefd68e.png'
  },
  {
    name: 'liuyanglin',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/liuyanglin.e0e003a.png'
  },
  {
    name: 'tracywang',
    url: 'https://dev-media.amazoncloud.cn/client-250819071524/img/tracywang.0e20e8f.png'
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
  console.log(`Starting download of ${desktopPhotos.length} desktop photos...\n`);
  
  let successCount = 0;
  let failCount = 0;

  for (const photo of desktopPhotos) {
    try {
      const filename = `${photo.name}.png`;
      await downloadFile(photo.url, filename);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to download ${photo.name}: ${error.message}`);
      failCount++;
    }
  }

  console.log(`\n=== Download Summary ===`);
  console.log(`Total: ${desktopPhotos.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

// 执行下载
downloadAllPhotos().catch(console.error);
