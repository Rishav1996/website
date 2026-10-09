import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DOMAIN = 'https://rishavsaigal.web.app';
const OUT_DIR = path.resolve(__dirname, '../gh-pages-bridge');

const routes = [
  '',
  'watches',
  'watches/kenneth-cole-kcwgl2104102mn',
  'watches/fastrack-opulence-nt3315km01',
  'watches/casio-gshock-gab2100luu8a',
  'watches/timex-automatic-tw000z800',
  'watches/lee-cooper-lc07979-399',
  'watches/titan-classique-deca-90245sm01',
  'watches/police-cranium-plpewjm0081301w',
];

function generateHtml(routePath, isDynamic404 = false) {
  const targetUrl = isDynamic404
    ? TARGET_DOMAIN
    : `${TARGET_DOMAIN}/${routePath ? routePath + '/' : ''}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="${targetUrl}">
  <title>Rishav Saigal | Redirecting to Official Domain...</title>
  <style>
    body {
      background-color: #0c1017;
      color: #e6edf3;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      background: #131922;
      border: 1px solid #1e293b;
      border-radius: 9999px;
      color: #58a6ff;
      font-size: 0.82rem;
      font-weight: 600;
      margin-bottom: 20px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 12px;
      color: #f0f6fc;
    }
    p {
      color: #8b949e;
      font-size: 0.95rem;
      margin: 0 0 24px;
      max-width: 480px;
      line-height: 1.5;
    }
    a {
      color: #58a6ff;
      text-decoration: none;
      font-weight: 600;
      padding: 10px 24px;
      background: #131922;
      border: 1px solid #30363d;
      border-radius: 8px;
      transition: all 0.2s ease;
      display: inline-block;
    }
    a:hover {
      background: #1f2937;
      border-color: #58a6ff;
    }
    .spinner {
      width: 24px;
      height: 24px;
      border: 2px solid rgba(88, 166, 255, 0.2);
      border-top-color: #58a6ff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 20px auto 0;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="badge">Production Domain Relocation</div>
  <h1>Redirecting to Official Domain</h1>
  <p>Rishav Saigal's AI Architect Portfolio has permanently moved to Google Cloud Anycast edge.</p>
  <a id="targetLink" href="${targetUrl}">Continue to rishavsaigal.web.app &rarr;</a>
  <div class="spinner"></div>
  <script>
    (function() {
      ${
        isDynamic404
          ? `
      var targetBase = "${TARGET_DOMAIN}";
      var cleanPath = window.location.pathname.replace(/^\\/website/, '');
      if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
      var dest = targetBase + cleanPath + window.location.search + window.location.hash;
      document.getElementById('targetLink').href = dest;
      window.location.replace(dest);
      `
          : `
      window.location.replace("${targetUrl}");
      `
      }
    })();
  </script>
</body>
</html>
`;
}

// Clean & prepare OUT_DIR
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUT_DIR, { recursive: true });

// Generate 1-to-1 static routes
for (const r of routes) {
  const dir = r ? path.join(OUT_DIR, r) : OUT_DIR;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generateHtml(r, false), 'utf-8');
  console.log(`Generated redirect for: /website/${r ? r + '/' : ''}`);
}

// Generate 404.html for any arbitrary legacy URLs
fs.writeFileSync(path.join(OUT_DIR, '404.html'), generateHtml('', true), 'utf-8');
console.log('Generated dynamic 404.html redirector');

// Copy sitemap.xml and robots.txt
const sitemapSrc = path.resolve(__dirname, '../public/sitemap.xml');
const robotsSrc = path.resolve(__dirname, '../public/robots.txt');

if (fs.existsSync(sitemapSrc)) {
  fs.copyFileSync(sitemapSrc, path.join(OUT_DIR, 'sitemap.xml'));
  console.log('Copied sitemap.xml');
}
if (fs.existsSync(robotsSrc)) {
  fs.copyFileSync(robotsSrc, path.join(OUT_DIR, 'robots.txt'));
  console.log('Copied robots.txt');
}

// Add .nojekyll so GitHub Pages doesn't touch or hide any underscore folders
fs.writeFileSync(path.join(OUT_DIR, '.nojekyll'), '', 'utf-8');
console.log('Added .nojekyll');

console.log(`\nAll redirect bridge files generated successfully in: ${OUT_DIR}`);
