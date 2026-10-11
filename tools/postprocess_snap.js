import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const DOMAIN = 'https://rishavsaigal.web.app';

// Dynamically load WATCH_COLLECTION from src/data/watchesData.js
async function loadWatchesData() {
  const dataPath = path.resolve(__dirname, '../src/data/watchesData.js');
  const mod = await import(`file://${dataPath}`);
  return mod.WATCH_COLLECTION;
}

function replaceMeta(html, name, content) {
  const regex = new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'i');
  const newTag = `<meta name="${name}" content="${content}">`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  }
  return html.replace('</head>', `    ${newTag}\n  </head>`);
}

function replacePropertyMeta(html, property, content) {
  const regex = new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'i');
  const newTag = `<meta property="${property}" content="${content}">`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  }
  return html.replace('</head>', `    ${newTag}\n  </head>`);
}

function replaceCanonical(html, url) {
  const regex = /<link\s+rel=["']canonical["'][^>]*>/i;
  const newTag = `<link rel="canonical" href="${url}">`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  }
  return html.replace('</head>', `    ${newTag}\n  </head>`);
}

function replaceTitle(html, title) {
  const regex = /<title>[^<]*<\/title>/i;
  const newTag = `<title>${title}</title>`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  }
  return html.replace('</head>', `    ${newTag}\n  </head>`);
}

function injectJsonLd(html, jsonLdObj) {
  const scriptTag = `\n    <script type="application/ld+json">\n${JSON.stringify(jsonLdObj, null, 2)}\n    </script>\n`;
  return html.replace('</head>', `${scriptTag}  </head>`);
}

async function run() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`Dist directory not found at: ${DIST_DIR}`);
    process.exit(1);
  }

  const WATCH_COLLECTION = await loadWatchesData();
  console.log(`Loaded ${WATCH_COLLECTION.length} timepieces from watchesData.js`);

  // 1. Process Vault Index: dist/watches/index.html
  const vaultPath = path.join(DIST_DIR, 'watches/index.html');
  if (fs.existsSync(vaultPath)) {
    let vaultHtml = fs.readFileSync(vaultPath, 'utf8');

    const vaultTitle = 'The Timepiece Archive | Horological Vault & Mechanical Atelier — Rishav Saigal';
    const vaultDesc = 'A curated archive of 7 personal mechanical, solar, and high-frequency timepieces cataloged by Rishav Saigal. Featuring macro loupe studies, caliber physics, and deterministic horology.';
    const vaultCanonical = `${DOMAIN}/watches`;
    const vaultImage = `${DOMAIN}/assets/watches/cuts/cut_kc_escapement.jpg`;

    vaultHtml = replaceTitle(vaultHtml, vaultTitle);
    vaultHtml = replaceMeta(vaultHtml, 'title', vaultTitle);
    vaultHtml = replaceMeta(vaultHtml, 'description', vaultDesc);
    vaultHtml = replaceCanonical(vaultHtml, vaultCanonical);

    vaultHtml = replacePropertyMeta(vaultHtml, 'og:title', vaultTitle);
    vaultHtml = replacePropertyMeta(vaultHtml, 'og:description', vaultDesc);
    vaultHtml = replacePropertyMeta(vaultHtml, 'og:url', vaultCanonical);
    vaultHtml = replacePropertyMeta(vaultHtml, 'og:image', vaultImage);
    vaultHtml = replacePropertyMeta(vaultHtml, 'og:type', 'website');

    vaultHtml = replacePropertyMeta(vaultHtml, 'twitter:title', vaultTitle);
    vaultHtml = replacePropertyMeta(vaultHtml, 'twitter:description', vaultDesc);
    vaultHtml = replacePropertyMeta(vaultHtml, 'twitter:url', vaultCanonical);
    vaultHtml = replacePropertyMeta(vaultHtml, 'twitter:image', vaultImage);

    // Schema.org CollectionPage + ItemList
    const collectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'The Timepiece Archive & Horological Vault',
      description: vaultDesc,
      url: vaultCanonical,
      author: {
        '@type': 'Person',
        name: 'Rishav Saigal',
        url: `${DOMAIN}/`
      },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: WATCH_COLLECTION.length,
        itemListElement: WATCH_COLLECTION.map((w, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: `${w.brand} ${w.model}`,
          url: `${DOMAIN}/watches/${w.id}`,
          image: `${DOMAIN}/${w.masterImage || w.image}`
        }))
      }
    };

    vaultHtml = injectJsonLd(vaultHtml, collectionSchema);
    fs.writeFileSync(vaultPath, vaultHtml, 'utf8');
    console.log('✓ Successfully enhanced metadata & schema on: dist/watches/index.html');
  } else {
    console.warn('Warning: dist/watches/index.html not found');
  }

  // 2. Process each Sub-Watch Route: dist/watches/:watchId/index.html
  for (const watch of WATCH_COLLECTION) {
    const watchHtmlPath = path.join(DIST_DIR, `watches/${watch.id}/index.html`);
    if (!fs.existsSync(watchHtmlPath)) {
      console.warn(`Warning: Static file not found for ${watch.id} at ${watchHtmlPath}`);
      continue;
    }

    let watchHtml = fs.readFileSync(watchHtmlPath, 'utf8');

    const watchTitle = `${watch.brand} ${watch.model} (${watch.sku}) | Atelier Saigal`;
    const watchDesc = `${watch.brand} ${watch.model} [${watch.sku}]: ${watch.tagline}. Caliber: ${watch.movement?.type || 'Precision Caliber'}, ${watch.dimensions?.caseDiameter || ''} case, ${watch.materials?.waterResistance || ''}.`;
    const watchCanonical = `${DOMAIN}/watches/${watch.id}`;
    const watchImage = `${DOMAIN}/${watch.masterImage || watch.image}`;

    watchHtml = replaceTitle(watchHtml, watchTitle);
    watchHtml = replaceMeta(watchHtml, 'title', watchTitle);
    watchHtml = replaceMeta(watchHtml, 'description', watchDesc);
    watchHtml = replaceCanonical(watchHtml, watchCanonical);

    watchHtml = replacePropertyMeta(watchHtml, 'og:title', watchTitle);
    watchHtml = replacePropertyMeta(watchHtml, 'og:description', watchDesc);
    watchHtml = replacePropertyMeta(watchHtml, 'og:url', watchCanonical);
    watchHtml = replacePropertyMeta(watchHtml, 'og:image', watchImage);
    watchHtml = replacePropertyMeta(watchHtml, 'og:type', 'article');

    watchHtml = replacePropertyMeta(watchHtml, 'twitter:title', watchTitle);
    watchHtml = replacePropertyMeta(watchHtml, 'twitter:description', watchDesc);
    watchHtml = replacePropertyMeta(watchHtml, 'twitter:url', watchCanonical);
    watchHtml = replacePropertyMeta(watchHtml, 'twitter:image', watchImage);

    // Schema.org Product Schema
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${watch.brand} ${watch.model}`,
      sku: watch.sku,
      mpn: watch.sku,
      brand: {
        '@type': 'Brand',
        name: watch.brand
      },
      description: watch.tagline,
      category: watch.category,
      image: watchImage,
      url: watchCanonical,
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Movement', value: watch.movement?.type || 'N/A' },
        ...(watch.movement?.beatRate ? [{ '@type': 'PropertyValue', name: 'Oscillation Frequency', value: watch.movement.beatRate }] : []),
        ...(watch.movement?.powerReserve || watch.movement?.batteryLife
          ? [{ '@type': 'PropertyValue', name: 'Power Autonomy', value: watch.movement.powerReserve || watch.movement.batteryLife }]
          : []),
        ...(watch.movement?.jewelCount
          ? [{ '@type': 'PropertyValue', name: 'Synthetic Jewels', value: `${watch.movement.jewelCount} Synthetic Rubies` }]
          : []),
        { '@type': 'PropertyValue', name: 'Case Diameter', value: watch.dimensions?.caseDiameter || 'N/A' },
        { '@type': 'PropertyValue', name: 'Case Thickness', value: watch.dimensions?.caseThickness || 'N/A' },
        { '@type': 'PropertyValue', name: 'Case Metallurgy', value: watch.materials?.case || 'N/A' },
        { '@type': 'PropertyValue', name: 'Water Resistance', value: watch.materials?.waterResistance || 'N/A' }
      ]
    };

    // Schema.org BreadcrumbList Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Portfolio',
          item: `${DOMAIN}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Horological Vault',
          item: `${DOMAIN}/watches`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${watch.brand} ${watch.model}`,
          item: watchCanonical
        }
      ]
    };

    watchHtml = injectJsonLd(watchHtml, productSchema);
    watchHtml = injectJsonLd(watchHtml, breadcrumbSchema);

    // Schema.org FAQPage Schema (if FAQ is available)
    if (watch.faq && watch.faq.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: watch.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      };
      watchHtml = injectJsonLd(watchHtml, faqSchema);
    }

    fs.writeFileSync(watchHtmlPath, watchHtml, 'utf8');
    console.log(`✓ Enhanced metadata & schema on: dist/watches/${watch.id}/index.html`);
  }

  console.log('\nAll watch pages successfully post-processed for SEO, AEO, and GEO!');
}

run().catch((err) => {
  console.error('Error post-processing static files:', err);
  process.exit(1);
});
