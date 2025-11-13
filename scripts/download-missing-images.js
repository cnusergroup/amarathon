const https = require('https');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://dev-media.amazoncloud.cn';
const outputDir = path.join(__dirname, '../src/assets/images/amarothon12');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 需要下载的缺失图片列表（使用URL编码的路径）
const missingImages = [
  // 组委会成员
  { name: '蒋南希 Nancy Jiang.png', encodedName: '%E8%92%8B%E5%8D%97%E5%B8%8C%20Nancy%20Jiang.png' },
  { name: '蒋南希 Nancy Jiang_mb.png', encodedName: '%E8%92%8B%E5%8D%97%E5%B8%8C%20Nancy%20Jiang_mb.png' },
  { name: '李炜波 Weibo LI.png', encodedName: '%E6%9D%8E%E7%82%9C%E6%B3%A2%20Weibo%20LI.png' },
  { name: '李炜波 Weibo LI_mb.png', encodedName: '%E6%9D%8E%E7%82%9C%E6%B3%A2%20Weibo%20LI_mb.png' },
  { name: '李晓彧 Alex Lee.png', encodedName: '%E6%9D%8E%E6%99%93%E5%BD%A7%20Alex%20Lee.png' },
  { name: '李晓彧 Alex Lee_mb.png', encodedName: '%E6%9D%8E%E6%99%93%E5%BD%A7%20Alex%20Lee_mb.png' },
  { name: '赵雪妍 Shane Zhao.png', encodedName: '%E8%B5%B5%E9%9B%AA%E5%A6%8D%20Shane%20Zhao.png' },
  { name: '赵雪妍 Shane Zhao_mb.png', encodedName: '%E8%B5%B5%E9%9B%AA%E5%A6%8D%20Shane%20Zhao_mb.png' },
  
  // 评审团成员
  { name: '李钊 Li Zhao.png', encodedName: '%E6%9D%8E%E9%92%8A%20Li%20Zhao.png' },
  { name: '李钊 Li Zhao_mb.png', encodedName: '%E6%9D%8E%E9%92%8A%20Li%20Zhao_mb.png' },
  { name: '宋洪涛 Hongtao Song.png', encodedName: '%E5%AE%8B%E6%B4%AA%E6%B6%9B%20Hongtao%20Song.png' },
  { name: '宋洪涛 Hongtao Song_mb.png', encodedName: '%E5%AE%8B%E6%B4%AA%E6%B6%9B%20Hongtao%20Song_mb.png' },
  { name: '张帆 Fan Zhang.png', encodedName: '%E5%BC%A0%E5%B8%86%20Fan%20Zhang.png' },
  { name: '张帆 Fan Zhang_mb.png', encodedName: '%E5%BC%A0%E5%B8%86%20Fan%20Zhang_mb.png' },
  { name: '陈烈 Charlie Chen.png', encodedName: '%E9%99%88%E7%83%88%20Charlie%20Chen.png' },
  { name: '陈烈 Charlie Chen_mb.png', encodedName: '%E9%99%88%E7%83%88%20Charlie%20Chen_mb.png' },
  { name: '段海宁 Duan Haining.png', encodedName: '%E6%AE%B5%E6%B5%B7%E5%AE%81%20Duan%20Haining.png' },
  { name: '段海宁 Duan Haining_mb.png', encodedName: '%E6%AE%B5%E6%B5%B7%E5%AE%81%20Duan%20Haining_mb.png' },
  { name: '梁加琦 Liang Jiaqi.png', encodedName: '%E6%A2%81%E5%8A%A0%E7%90%A6%20Liang%20Jiaqi.png' },
  { name: '梁加琦 Liang Jiaqi_mb.png', encodedName: '%E6%A2%81%E5%8A%A0%E7%90%A6%20Liang%20Jiaqi_mb.png' },
];

function downloadImage(encodedName, filename) {
  return new Promise((resolve, reject) => {
    // 使用类似的URL模式，但需要找到实际的hash值
    // 先尝试不带hash的路径
    const fullUrl = `${baseUrl}/client-250819071524/img/${encodedName}`;
    const outputPath = path.join(outputDir, filename);

    console.log(`Downloading: ${filename}`);
    console.log(`From: ${fullUrl}`);

    https.get(fullUrl, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(outputPath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${filename}`);
          resolve();
        });

        fileStream.on('error', (err) => {
          fs.unlink(outputPath, () => {});
          console.error(`✗ Error writing ${filename}:`, err.message);
          reject(err);
        });
      } else {
        console.error(`✗ Failed to download ${filename}: HTTP ${response.statusCode}`);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`✗ Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('Starting download of missing images...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const image of missingImages) {
    try {
      await downloadImage(image.encodedName, image.name);
      successCount++;
      // 添加延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      failCount++;
    }
  }

  console.log(`\n=== Download Summary ===`);
  console.log(`Total: ${missingImages.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

downloadAllImages().catch(console.error);
