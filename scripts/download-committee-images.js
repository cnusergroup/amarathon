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

// 组委会成员照片
const committeeImages = {
  'lishaoyi.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/lishaoyi.f02b678.png',
  'lishaoyi_mobile.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/lishaoyi.f02b678.png',
  'xuyebao.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/xuyebao.54da634.png',
  'xuyebao_mobile.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/xuyebao.54da634.png',
  'zhaoanna.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhaoanna.c5eb83b.png',
  'zhaoanna_mobile.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhaoanna.c5eb83b.png',
  'zhangrundi.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhangrundi.a73b145.png',
  'zhangrundi_mobile.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/zhangrundi.a73b145.png',
  'maping.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/maping.0d32828.png',
  'maping_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/maping.0d32828.png',
  'dannychan.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/dannychan.2a41a4c.png',
  'dannychan_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/dannychan.2a41a4c.png',
  'kennychan.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/kennychan.30b3551.png',
  'kennychan_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/kennychan.30b3551.png',
  'lixiaofei.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/lixiaofei.3f09bc6.png',
  'lixiaofei_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/lixiaofei.3f09bc6.png',
  'betty.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/betty.749af37.png',
  'betty_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/betty.749af37.png',
  'panjuan.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/panjuan.4fde5fe.png',
  'panjuan_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/panjuan.4fde5fe.png',
  'huanghaowen.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/huanghaowen.670fe31.png',
  'huanghaowen_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/huanghaowen.670fe31.png',
  'jackychan.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/jackychan.d74a183.png',
  'jackychan_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/jackychan.d74a183.png',
  'shunyoshie.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/shunyoshie.4966c04.png',
  'shunyoshie_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/shunyoshie.4966c04.png',
  'smile.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/smile.eefd68e.png',
  'smile_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/smile.eefd68e.png',
  'liuyanglin.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/liuyanglin.db9181d.png',
  'liuyanglin_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/liuyanglin.db9181d.png',
  'tracywang.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/tracywang.9c74edb.png',
  'tracywang_mb.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/tracywang.9c74edb.png',
  
  // 其他社交媒体图标
  'xiaohongshu.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/xiaohongshu.png',
  'csdn.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/csdn.png',
  'douyin.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/douyin.png',
  'in.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/in.png',
  'dev.png': 'https://dev-media.amazoncloud.cn/client-250819071524/img/dev.png'
};

async function downloadCommitteeImages() {
  console.log('📥 Downloading committee member photos and icons...\n');
  
  for (const [filename, url] of Object.entries(committeeImages)) {
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
    }
  }
  
  console.log('\n✅ Committee images download complete!');
}

downloadCommitteeImages().catch(console.error);
