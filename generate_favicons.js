import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121624"/>
      <stop offset="50%" stop-color="#090a10"/>
      <stop offset="100%" stop-color="#050608"/>
    </linearGradient>

    <!-- Border Glow Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="45%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#00ffaa"/>
    </linearGradient>

    <!-- R Gradient -->
    <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <!-- S Gradient -->
    <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>

    <!-- Neon Glow Filter -->
    <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Base Squircle Container with High-Tech Glow Border -->
  <rect x="20" y="20" width="472" height="472" rx="104" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="14"/>

  <!-- Cybernetic Grid & Tech Accents -->
  <path d="M 60 96 L 60 60 L 96 60" fill="none" stroke="#00f0ff" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
  <path d="M 452 416 L 452 452 L 416 452" fill="none" stroke="#a855f7" stroke-width="5" stroke-linecap="round" opacity="0.6"/>

  <!-- Active AI Status Indicator (Top Right) -->
  <circle cx="418" cy="94" r="15" fill="#00ffaa" filter="url(#neonGlow)"/>
  <circle cx="418" cy="94" r="6" fill="#ffffff"/>

  <!-- Crisp Modern RS Monogram with Negative Space Separation -->
  <!-- R Path (Left) -->
  <path d="M 88 140
           H 194
           C 234 140, 260 165, 260 202
           C 260 234, 236 256, 202 262
           L 264 372
           H 204
           L 148 274
           H 144
           V 372
           H 88
           Z
           M 144 190
           V 226
           H 188
           C 204 226, 212 216, 212 208
           C 212 200, 204 190, 188 190
           Z"
        fill="url(#rGrad)"/>

  <!-- S Path (Right) -->
  <path d="M 416 190
           L 374 204
           C 368 192, 356 182, 340 182
           C 320 182, 310 192, 310 206
           C 310 220, 322 228, 350 236
           C 392 248, 426 268, 426 312
           C 426 354, 390 382, 338 382
           C 290 382, 258 356, 248 322
           L 290 308
           C 296 328, 312 340, 336 340
           C 356 340, 372 328, 372 314
           C 372 298, 358 290, 328 282
           C 288 270, 256 250, 256 208
           C 256 166, 290 140, 338 140
           C 378 140, 408 162, 416 190
           Z"
        fill="url(#sGrad)"/>
</svg>`;

const outputDir = path.resolve('public');
fs.writeFileSync(path.join(outputDir, 'favicon.svg'), svgContent.trim());

async function generatePngs() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const html = `<!DOCTYPE html><html><head><style>body { margin: 0; padding: 0; background: transparent; overflow: hidden; }</style></head><body>${svgContent}</body></html>`;
  await page.setContent(html);

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'favicon-512x512.png', size: 512 }
  ];

  for (const { name, size } of sizes) {
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    const svgElem = await page.$('svg');
    await svgElem.evaluate((el, s) => {
      el.setAttribute('width', s);
      el.setAttribute('height', s);
    }, size);
    
    const filePath = path.join(outputDir, name);
    await page.screenshot({
      path: filePath,
      omitBackground: true,
      clip: { x: 0, y: 0, width: size, height: size }
    });
  }

  await browser.close();
}

generatePngs().catch(console.error);
