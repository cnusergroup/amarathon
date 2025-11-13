# Amarathon 12 Image Assets

This directory contains all image assets for the Amarathon 12-hour event website.

## Downloaded Images

### ✅ Successfully Downloaded

#### Poster Images
- `poster.png` - Desktop poster (1920px)
- `poster_pad.png` - Tablet poster (1024px)
- `poster_mobile.png` - Mobile poster (750px)

#### Home Section Images
- `home_desc.png`, `home_desc_pad.png`, `home_desc_mobile.png` - Description section backgrounds
- `home_schedule.png`, `home_schedule_pad.png`, `home_schedule_mb.png` - Schedule section backgrounds
- `home_speaker.png`, `home_speaker_pad.png`, `home_speaker_mobile.png` - Speaker section backgrounds

#### Partner Logos (Desktop & Mobile)
- InfoQ: `partner_logo_infoq.png`, `partner_logo_infoq_mb.png`
- SegmentFault: `partner_logo_segmentfault.png`, `partner_logo_segmentfault_mb.png`
- ITPUB: `partner_logo_itpub.png`, `partner_logo_itpub_mb.png`
- GitCode: `partner_logo_gitcode.png`, `partner_logo_gitcode_mb.png`
- MSUP: `partner_logo_msup.png`, `partner_logo_msup_mb.png`
- RTE: `partner_logo_rte.png`, `partner_logo_rte_mb.png`
- Simba: `partner_logo_simba.png`, `partner_logo_simba_mb.png`
- OSChina: `partner_logo_oschina.png`, `partner_logo_oschina_mb.png`
- CSDN: `partner_logo_csdn.png`, `partner_logo_csdn_mb.png`

#### Speaker Photos (1-36)
- Desktop: `photo/1.png` through `photo/36.png`
- Mobile: `photo_mb/1.png` through `photo_mb/36.png`

#### Social Media Icons
- `agenda_x.png` - Twitter/X icon
- `agenda_f.png` - Facebook icon (placeholder)
- `agenda_ins.png` - Instagram icon
- `agenda_github.png` - GitHub icon
- `agenda_in.png` - LinkedIn icon (placeholder)
- `agenda_www.png` - Website icon

#### Committee Member Photos
- Desktop and mobile versions for all committee members:
  - lishaoyi, xuyebao, zhaoanna, zhangrundi, maping
  - dannychan, kennychan, lixiaofei, betty, panjuan
  - huanghaowen, jackychan, shunyoshie, smile
  - liuyanglin, tracywang

### ⚠️ Placeholder Images Created

The following images were created as placeholders due to download restrictions:
- `agenda_f.png` - Facebook icon (base64 placeholder)
- `agenda_in.png` - LinkedIn icon (base64 placeholder)

### ❌ Missing Images (403 Forbidden)

The following social media icons could not be downloaded and may need to be sourced separately:
- `xiaohongshu.png` - Xiaohongshu (Little Red Book) icon
- `csdn.png` - CSDN icon
- `douyin.png` - Douyin (TikTok) icon
- `in.png` - LinkedIn icon (alternative)
- `dev.png` - Dev.to icon

## Image Organization

```
amarothon12/
├── poster.png, poster_pad.png, poster_mobile.png
├── home_*.png (various breakpoints)
├── partner_logo_*.png (desktop and mobile versions)
├── agenda_*.png (social media icons)
├── photo/
│   └── 1.png through 36.png (speaker photos - desktop)
├── photo_mb/
│   └── 1.png through 36.png (speaker photos - mobile)
└── [committee member photos]
```

## Download Scripts

The following scripts were used to download these images:
- `scripts/download-amarathon-images.js` - Main images and partner logos
- `scripts/download-mobile-images.js` - Mobile speaker photos
- `scripts/download-responsive-images.js` - Responsive breakpoint images
- `scripts/download-committee-images.js` - Committee member photos
- `scripts/create-placeholder-icons.js` - Placeholder social media icons

## Notes

1. All images are sourced from `https://dev.amazoncloud.cn/amarathon`
2. Some images use the same source for different breakpoints (responsive design handled via CSS)
3. Placeholder icons were created for images that returned 403 errors
4. Missing social media icons can be replaced with actual icons from the respective platforms

## Re-downloading Images

To re-download all images, run:
```bash
node scripts/download-amarathon-images.js
node scripts/download-mobile-images.js
node scripts/download-responsive-images.js
node scripts/download-committee-images.js
node scripts/create-placeholder-icons.js
```
