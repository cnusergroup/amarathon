/**
 * Image Download Script for Amarathon Website
 * 
 * This script helps download all required images from the original Amarathon website.
 * 
 * Usage:
 * 1. Install dependencies: npm install playwright fs-extra
 * 2. Set the AMARATHON_URL environment variable to the original website URL
 * 3. Run: node scripts/download-images.js
 */

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = process.env.AMARATHON_URL || 'https://example.com/amarathon';
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'images', 'amarothon12');

// Ensure output directories exist
async function ensureDirectories() {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.ensureDir(path.join(OUTPUT_DIR, 'photo'));
  await fs.ensureDir(path.join(OUTPUT_DIR, 'photo_mb'));
  console.log('✓ Created output directories');
}

// Download a single image
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Download poster images
async function downloadPosterImages(page) {
  console.log('\n📥 Downloading poster images...');
  
  const posterImages = [
    { selector: '.amarothon12--poster', name: 'poster.png', breakpoint: 'desktop' },
    { selector: '.amarothon12--poster', name: 'poster_pad.png', breakpoint: 'tablet' },
    { selector: '.amarothon12--poster', name: 'poster_mobile.png', breakpoint: 'mobile' }
  ];
  
  for (const img of posterImages) {
    try {
      // Set viewport for different breakpoints
      if (img.breakpoint === 'desktop') {
        await page.setViewportSize({ width: 1920, height: 1080 });
      } else if (img.breakpoint === 'tablet') {
        await page.setViewportSize({ width: 1024, height: 768 });
      } else {
        await page.setViewportSize({ width: 750, height: 1334 });
      }
      
      const element = await page.$(img.selector);
      if (element) {
        const bgImage = await element.evaluate(el => {
          const style = window.getComputedStyle(el);
          const bg = style.backgroundImage;
          const match = bg.match(/url\(['"]?([^'"]+)['"]?\)/);
          return match ? match[1] : null;
        });
        
        if (bgImage) {
          const imageUrl = new URL(bgImage, BASE_URL).href;
          await downloadImage(imageUrl, path.join(OUTPUT_DIR, img.name));
          console.log(`  ✓ Downloaded ${img.name}`);
        }
      }
    } catch (error) {
      console.error(`  ✗ Failed to download ${img.name}:`, error.message);
    }
  }
}

// Download home section images
async function downloadHomeSectionImages(page) {
  console.log('\n📥 Downloading home section images...');
  
  const sections = [
    { selector: '.amarothon12--home--desc-box--desc--text', prefix: 'home_desc' },
    { selector: '.amarothon12--home--schedule-box--desc', prefix: 'home_schedule' },
    { selector: '.amarothon12--home--speaker-box--speaker', prefix: 'home_speaker' }
  ];
  
  const breakpoints = [
    { name: '', width: 1920, height: 1080 },
    { name: '_pad', width: 1024, height: 768 },
    { name: '_mobile', width: 750, height: 1334 }
  ];
  
  for (const section of sections) {
    for (const bp of breakpoints) {
      try {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        const element = await page.$(section.selector);
        
        if (element) {
          const bgImage = await element.evaluate(el => {
            const style = window.getComputedStyle(el);
            const bg = style.backgroundImage;
            const match = bg.match(/url\(['"]?([^'"]+)['"]?\)/);
            return match ? match[1] : null;
          });
          
          if (bgImage) {
            const filename = `${section.prefix}${bp.name}.png`;
            const imageUrl = new URL(bgImage, BASE_URL).href;
            await downloadImage(imageUrl, path.join(OUTPUT_DIR, filename));
            console.log(`  ✓ Downloaded ${filename}`);
          }
        }
      } catch (error) {
        console.error(`  ✗ Failed to download ${section.prefix}${bp.name}:`, error.message);
      }
    }
  }
}

// Download speaker photos
async function downloadSpeakerPhotos(page) {
  console.log('\n📥 Downloading speaker photos (1-36)...');
  
  // Navigate to agenda tab
  await page.click('.amarothon12--tabs-box--tabs--tab:nth-child(2)');
  await page.waitForTimeout(1000);
  
  for (let id = 1; id <= 36; id++) {
    try {
      // Desktop photo
      await page.setViewportSize({ width: 1920, height: 1080 });
      const desktopImg = await page.$(`img[src*="photo/${id}.png"]`);
      if (desktopImg) {
        const src = await desktopImg.getAttribute('src');
        if (src) {
          const imageUrl = new URL(src, BASE_URL).href;
          await downloadImage(imageUrl, path.join(OUTPUT_DIR, 'photo', `${id}.png`));
          console.log(`  ✓ Downloaded photo/${id}.png`);
        }
      }
      
      // Mobile photo
      await page.setViewportSize({ width: 750, height: 1334 });
      const mobileImg = await page.$(`img[src*="photo_mb/${id}.png"]`);
      if (mobileImg) {
        const src = await mobileImg.getAttribute('src');
        if (src) {
          const imageUrl = new URL(src, BASE_URL).href;
          await downloadImage(imageUrl, path.join(OUTPUT_DIR, 'photo_mb', `${id}.png`));
          console.log(`  ✓ Downloaded photo_mb/${id}.png`);
        }
      }
    } catch (error) {
      console.error(`  ✗ Failed to download photos for speaker ${id}:`, error.message);
    }
  }
}

// Download partner logos and icons
async function downloadPartnerLogos(page) {
  console.log('\n📥 Downloading partner logos and icons...');
  
  // Navigate to home tab
  await page.click('.amarothon12--tabs-box--tabs--tab:nth-child(1)');
  await page.waitForTimeout(1000);
  
  // Get all partner logos
  const logos = await page.$$('.amarothon12--home--partner-box--item--logos--link--icon');
  
  for (let i = 0; i < logos.length; i++) {
    try {
      const src = await logos[i].getAttribute('src');
      if (src) {
        const filename = path.basename(new URL(src, BASE_URL).pathname);
        const imageUrl = new URL(src, BASE_URL).href;
        await downloadImage(imageUrl, path.join(OUTPUT_DIR, filename));
        console.log(`  ✓ Downloaded ${filename}`);
      }
    } catch (error) {
      console.error(`  ✗ Failed to download logo ${i}:`, error.message);
    }
  }
  
  // Download social media icons
  const socialIcons = [
    'agenda_x.png',
    'agenda_f.png',
    'agenda_ins.png',
    'agenda_github.png',
    'agenda_in.png',
    'agenda_www.png'
  ];
  
  for (const icon of socialIcons) {
    try {
      const img = await page.$(`img[src*="${icon}"]`);
      if (img) {
        const src = await img.getAttribute('src');
        if (src) {
          const imageUrl = new URL(src, BASE_URL).href;
          await downloadImage(imageUrl, path.join(OUTPUT_DIR, icon));
          console.log(`  ✓ Downloaded ${icon}`);
        }
      }
    } catch (error) {
      console.error(`  ✗ Failed to download ${icon}:`, error.message);
    }
  }
}

// Main function
async function main() {
  console.log('🚀 Starting Amarathon image download...');
  console.log(`📍 Source URL: ${BASE_URL}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
  
  await ensureDirectories();
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('🌐 Navigating to website...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    console.log('✓ Page loaded\n');
    
    await downloadPosterImages(page);
    await downloadHomeSectionImages(page);
    await downloadSpeakerPhotos(page);
    await downloadPartnerLogos(page);
    
    console.log('\n✅ Image download complete!');
  } catch (error) {
    console.error('\n❌ Error during download:', error);
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, downloadImage };
