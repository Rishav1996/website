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

  // 3. Process Root Homepage: dist/index.html
  const rootPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(rootPath)) {
    let rootHtml = fs.readFileSync(rootPath, 'utf8');

    const rootTitle = 'Rishav Saigal | Senior Data Scientist & AI Architect';
    const rootDesc = 'Rishav Saigal — Manager (Senior Data Scientist / AI Architect) at Cognizant & Ph.D. Candidate at IIT Patna. Architecting autonomous multi-agent systems, causal inference, and production MLOps.';
    const rootCanonical = `${DOMAIN}/`;

    rootHtml = replaceTitle(rootHtml, rootTitle);
    rootHtml = replaceMeta(rootHtml, 'title', rootTitle);
    rootHtml = replaceMeta(rootHtml, 'description', rootDesc);
    rootHtml = replaceCanonical(rootHtml, rootCanonical);

    rootHtml = replacePropertyMeta(rootHtml, 'og:title', rootTitle);
    rootHtml = replacePropertyMeta(rootHtml, 'og:description', rootDesc);
    rootHtml = replacePropertyMeta(rootHtml, 'og:url', rootCanonical);
    rootHtml = replacePropertyMeta(rootHtml, 'og:type', 'profile');

    rootHtml = replacePropertyMeta(rootHtml, 'twitter:title', rootTitle);
    rootHtml = replacePropertyMeta(rootHtml, 'twitter:description', rootDesc);
    rootHtml = replacePropertyMeta(rootHtml, 'twitter:url', rootCanonical);

    const ROOT_PROJECTS = [
      { name: "Generative AI (GenAI) Video Generation", category: "Agentic AI & GenAI", date: "Jan 2026 – Present", description: "Autonomous multi-agent pipeline using Google ADK, GCP Vertex AI (document storage), Gemini Enterprise, Agent Engine Platform, and FastMCP; features context-window summarisation, token-cost observability, dynamic prompting, and automated self-correction validation loops.", impact: "Slashed end-to-end delivery timeline from 5–14 days down to under 6 hours (from script generation to final video demo)." },
      { name: "Media Analytics (POC)", category: "Time Series & MLOps", date: "Jun 2025 – Oct 2025", description: "Predictive ML and prompt engineering pipeline for inference explanation, insight extraction, and business KPI generation; models multi-channel budget allocation and predicts future investment growth using multi-timeseries forecasting.", impact: null },
      { name: "Price Elasticity (POC)", category: "Causal ML & Pricing", date: "Jun 2025 – Jul 2025", description: "Dynamic pricing architecture using Hierarchical Linear Models (HLM) (statsmodels, Python, Azure ML) with automated MLflow continuous retraining pipelines to model cross-product elasticity frontiers.", impact: null },
      { name: "Enterprise Analytics Chatbot", category: "Agentic AI & GenAI", date: "Jul 2024 – Dec 2025", description: "Conversational analytics agent (Streamlit, PostgreSQL) featuring a dedicated Intent Classifier to determine required insight types, paired with dynamic Text-to-SQL generation powered by Client Proprietary Internal LLMs.", impact: "Projected cycle time reduction for designing complex enterprise insights from 3 months down to under 15 days." },
      { name: "Intelligent QA / BA Chatbot", category: "Agentic AI & GenAI", date: "Apr 2024 – Apr 2025", description: "Enterprise conversational system (FastAPI, Python) utilizing semantic policy retrieval, intent classifiers, and structured intent flows for automated policy Q&A and operational task execution.", impact: "Autonomously resolved 80% of internal policy document queries; automated RBAC-governed workflow execution and access request approvals/rejections." },
      { name: "LLM-Driven Predictive Modelling", category: "Causal ML & Pricing", date: "Jul 2024 – Sep 2024", description: "Unsupervised feature extraction pipeline using open-source LLMs via Ollama to discover ticket objective classes; aggregates class occurrences into hourly instance feature vectors fed into an existing deep LSTM sequence model for enhanced predictive sequence accuracy.", impact: null },
      { name: "LLM-Based Test Case Generator", category: "Agentic AI & GenAI", date: "Nov 2023 – Mar 2024", description: "QA automation toolchain (FastAPI, Python) parsing unstructured Business Requirement Documents (BRDs) to extract acceptance criteria and auto-generate structured Gherkin and TMMi test suites.", impact: "Accelerated test authoring cycle by 70%; ensured 100% test-to-requirement coverage mapping." },
      { name: "Healthcare Consumer Analytics", category: "Causal ML & Pricing", date: "Jun 2022 – Oct 2023", description: "Production ML pipeline on AWS SageMaker (Scikit-Learn, DataRobot) combining customer segmentation, causal inference uplift modeling, and SHAP explainability for account-level promotional strategy ranking.", impact: "Delivered projected $2.3M in cost savings at 90%+ model accuracy across all account-level promotion campaigns." },
      { name: "Demand Sensing MLOps", category: "Time Series & MLOps", date: "Mar 2020 – Jun 2022", description: "Distributed time series MLOps pipeline on Azure Databricks (PySpark, TensorFlow, Keras) with automated feature engineering, distributed model selection, and continuous retraining workflows.", impact: "Achieved 5% accuracy improvement, 10% better model selection, reduced training from 3 days to 2 hours, and 60% reduction in manual intervention." },
      { name: "Predictive Maintenance", category: "Time Series & MLOps", date: "Dec 2019 – Mar 2020", description: "Time-varying survival analysis pipeline (Cox Proportional Hazards, XGBoost, lifelines, Python) predicting EV component degradation windows paired with interactive Plotly operational HUDs.", impact: "Achieved 82% validation accuracy for early failure prevention." },
      { name: "Service Now Ticket Analytics", category: "Time Series & MLOps", date: "Oct 2019 – Dec 2019", description: "Deep learning sequence volume forecasting architecture (LSTM vs. MLP, TensorFlow, MySQL) featuring custom greedy Hungarian workload dispatch heuristics for agent routing.", impact: "Achieved 85% validation accuracy with intelligent routing heuristics for optimized workload dispatch." },
      { name: "Supply Chain Demand Forecasting (POC)", category: "Time Series & MLOps", date: "Apr 2019 – Oct 2019", description: "Multivariate demand forecasting pipeline (statsmodels SARIMAX, pandas, Python) integrating dynamic NLTK VADER social media sentiment indices as exogenous regressors with grid-search hyperparameter optimization.", impact: null },
      { name: "Retail Video Analytics (POC)", category: "NLP & Computer Vision", date: "Apr 2018 – Mar 2019", description: "Computer vision pipeline (OpenCV, TensorFlow, Keras, Python) featuring frame-level CNN transfer learning for brand asset detection and multi-class classification across retail video streams.", impact: null }
    ];

    const ROOT_PUBLICATIONS = [
      { name: "The Specialized Frontier: An Inquiry Into Gated AI Architectures and the Cooperative Safety Flywheel", datePublished: "2026-08", publisher: "Towards AI", url: "https://pub.towardsai.net/the-specialized-frontier-an-inquiry-into-gated-ai-architectures-and-the-cooperative-safety-0f10f1546ad6" },
      { name: "Claude Model Routing: Stop Scoring \"Complexity.\" Score These Two Things Instead.", datePublished: "2026-07", publisher: "Towards Deep Learning", url: "https://www.towardsdeeplearning.com/claude-model-routing-stop-scoring-complexity-score-these-two-things-instead-a6505c9053ce", sameAs: "https://doi.org/10.5281/zenodo.21520843" },
      { name: "LangGraph Multi-Agent Architecture: Building a Self-Critiquing AI Debate System", datePublished: "2026-05", publisher: "Towards AI", url: "https://pub.towardsai.net/langgraph-multi-agent-architecture-building-a-self-critiquing-ai-debate-system-971a7ad881d9" },
      { name: "LLM Drift Experiment: A Quantitative Framework for Measuring Behavioural Drift via Adversarial Multi-Agent Debate", datePublished: "2026-05", publisher: "Zenodo", url: "https://doi.org/10.5281/zenodo.20032071", sameAs: "https://doi.org/10.5281/zenodo.20032071" },
      { name: "Measuring Behavioral Drift in LLMs: 22 Signals, 5 Dimensions, and the Calcification Effect", datePublished: "2026-05", publisher: "Towards AI", url: "https://medium.com/towards-artificial-intelligence/measuring-behavioral-drift-in-llms-22-signals-5-dimensions-and-the-calcification-effect-aeaeb904d096" },
      { name: "LLM Drift Explained: Do AI Models Lose Themselves Under Adversarial Pressure?", datePublished: "2026-05", publisher: "Towards AI", url: "https://pub.towardsai.net/do-ai-models-lose-themselves-exploring-llm-drift-through-adversarial-debate-a37e0c75012b" },
      { name: "The $1.5 Million Difference: Why Benchmarks are Only 10% of the AI Agent Story", datePublished: "2026-03", publisher: "LinkedIn", url: "https://www.linkedin.com/pulse/15-million-difference-why-benchmarks-only-10-ai-agent-rishav-saigal-ao4jc/" },
      { name: "AutoML on Autopilot", datePublished: "2026-03", publisher: "Towards AI", url: "https://pub.towardsai.net/automl-on-autopilot-c8939bca8f8f" },
      { name: "CognitoEDA", datePublished: "2025-08", publisher: "Medium", url: "https://medium.com/@rishavsaigal/cognitoeda-bcbd3567e6d2" },
      { name: "Beyond Prediction: Generative AI's Probabilistic Future in Time Series", datePublished: "2025-06", publisher: "Medium", url: "https://medium.com/@rishavsaigal/the-generative-ai-revolution-moving-beyond-what-will-happen-to-what-could-happen-in-time-f820ed5263f1" },
      { name: "Unlocking Time Series with LLMs: A New Era with TimeCAP", datePublished: "2025-06", publisher: "Medium", url: "https://medium.com/@rishavsaigal/unlocking-time-series-with-llms-99a369f45447" }
    ];

    const ROOT_CREDENTIALS = [
      { name: "Deploy an Agent with Agent Development Kit (ADK)", recognizedBy: "Google Cloud", url: "https://www.credly.com/badges/bdc35b6d-823e-443f-8f93-47d57fbecf60/public_url", credentialCategory: "badge" },
      { name: "Evaluate and Improve Agent Development Kit Agents", recognizedBy: "Google Cloud", url: "https://www.credly.com/badges/a04fd2d7-e28d-4dd6-adda-6e6670fec84b/public_url", credentialCategory: "badge" },
      { name: "Accelerate Development with Antigravity", recognizedBy: "Google Cloud", url: "https://www.credly.com/badges/32d2eeeb-5a49-458b-8860-a644ac8d71c9/public_url", credentialCategory: "badge" },
      { name: "Build with Gemini", recognizedBy: "Google Cloud", url: "https://www.credly.com/badges/795dbf1e-32ea-4e16-bcc6-c028495fb9cc/public_url", credentialCategory: "badge" },
      { name: "Generative AI Practitioner Certificate", recognizedBy: "Dataiku Academy", url: "https://verify.skilljar.com/c/hg2aiksrvrt2", credentialCategory: "certificate" },
      { name: "Vibe Code Hackathon - Vibe Coded using Windsurf", recognizedBy: "Cognizant", url: "https://www.credly.com/badges/7fa3859e-a282-495a-97bf-9305ac3a8a3f/public_url", credentialCategory: "badge" },
      { name: "AWS Knowledge: Amazon Braket", recognizedBy: "Amazon Web Services Training & Certification", url: "https://www.credly.com/badges/556aff6b-069a-4e2f-a5b3-739337b0b18d/public_url", credentialCategory: "badge" },
      { name: "Microsoft Certified: Azure AI Fundamentals", recognizedBy: "Microsoft", url: "https://learn.microsoft.com/en-us/users/rishavsaigal-8851/credentials/3d9e3e8e7a0cb39d", credentialCategory: "certificate" },
      { name: "MLOps Practitioner Certificate", recognizedBy: "Dataiku Academy", url: "https://verify.skilljar.com/c/7djsjp74vdvj", credentialCategory: "certificate" },
      { name: "Advanced Designer Certificate", recognizedBy: "Dataiku Academy", url: "https://verify.skilljar.com/c/weie95jezjyz", credentialCategory: "certificate" },
      { name: "ML Practitioner Certificate", recognizedBy: "Dataiku Academy", url: "https://verify.skilljar.com/c/2hph8ogspvy5", credentialCategory: "certificate" },
      { name: "Core Designer Certificate", recognizedBy: "Dataiku Academy", url: "https://verify.skilljar.com/c/4ucupx9wj33r", credentialCategory: "certificate" },
      { name: "Machine Learning with Python", recognizedBy: "Coursera & authorized by IBM", url: "https://www.credly.com/badges/c3161482-efe8-4fb3-a3a4-9ac5d7682d24/public_url", credentialCategory: "badge" },
      { name: "Python for Data Science", recognizedBy: "IBM", url: "https://www.credly.com/badges/a0e4eeca-bc00-4811-bc7b-5aa8e6535178/public_url", credentialCategory: "badge" }
    ];

    const ROOT_FAQS = [
      { question: "What are Rishav Saigal's primary engineering and research specializations?", answer: "Rishav Saigal specializes in autonomous Multi-Agent Systems, Time Series Forecasting, Causal Inference, and production MLOps. His engineering focuses on architecting production-grade enterprise Agentic AI systems on Google Cloud (Vertex AI, Cloud Run, Gemini Enterprise, Agent Engine Platform, FastMCP) with autonomous self-correction validation loops, context-window summarization, and token-cost observability." },
      { question: "What is Rishav's current enterprise leadership role and organizational scope?", answer: "Rishav serves as Manager (Senior Data Scientist / AI Architect) at Cognizant (promoted November 2023). In this capacity, he is a designated Subject Matter Expert (SME) in AI Architecture Design and GenAI, spearheading architectural solution design and response strategy for multiple high-value client RFPs, managing cross-functional teams of ML/GenAI engineers, directing campus-to-corporate fresher mentorship programs, and serving as a primary hiring panellist for external lateral recruitment." },
      { question: "What is Rishav's formal academic background and doctoral research focus?", answer: "Rishav is a Ph.D. Candidate in Computer Science & Engineering at the Indian Institute of Technology Patna (IIT Patna, Jul 2026 – Jun 2029 Expected). He holds a Master of Technology (M.Tech) in Data Science & Engineering from BITS Pilani (Sep 2019 – Aug 2021) and a Bachelor of Technology (B.Tech) in Computer Science & Engineering from RCC Institute of Information Technology / MAKAUT (Aug 2013 – Jul 2017). His doctoral research investigates LLM behavioral drift, adversarial robustness, and a self-coined calcification effect in multi-agent debate systems." },
      { question: "What open research frameworks, datasets, and DOI releases has Rishav published?", answer: "Rishav has published 11 technical publications and open research releases, including two Zenodo DOI-indexed releases: the LLM Behavioral Drift Experiment framework and dataset (DOI: 10.5281/zenodo.20032071) measuring persona shift across 22 behavioral signals, and model-router (DOI: 10.5281/zenodo.21520843), an open-source capability floor vs. cost exposure routing skill for Claude Code. His independent research articles appear in Towards AI, Towards Deep Learning, and Medium." },
      { question: "What verified credentials and professional certifications does Rishav hold?", answer: "Rishav holds 14 verified industry credentials, including 8 official Credly digital badges (Google Cloud Agent Development Kit [ADK] Deployment, ADK Agent Evaluation, Antigravity Accelerated Development, Build with Gemini, Cognizant Vibe Code Hackathon, AWS Knowledge: Amazon Braket, IBM Machine Learning with Python, IBM Python for Data Science) and 6 specialized academy certificates (Microsoft Certified: Azure AI Fundamentals, Dataiku Generative AI Practitioner, Dataiku MLOps Practitioner, and Dataiku Core/Advanced/ML Designer)." }
    ];

    const ROOT_VIDEOS = [
      { name: "Rishav Saigal — Executive Overview & Agentic AI Architecture Introduction", description: "Executive video introduction to Rishav Saigal's engineering background, autonomous AI systems, and enterprise architecture.", thumbnailUrl: `${DOMAIN}/assets/hero-poster.png`, uploadDate: "2026-09-01", contentUrl: `${DOMAIN}/assets/videos/Section%201%20-%20Hero%20-%201080p.mp4` },
      { name: "Rishav Saigal — Career Retrospective & Enterprise Experience Timeline", description: "Retrospective walk-through of engineering leadership and AI systems architecture across Cognizant, Genpact, and Capgemini.", thumbnailUrl: `${DOMAIN}/assets/experience-poster.webp`, uploadDate: "2026-09-01", contentUrl: `${DOMAIN}/assets/videos/Section%206%20-%20Experience%20Timeline%201080p.mp4` },
      { name: "Rishav Saigal — Collaboration Protocol & Closing Remarks", description: "Closing remarks on enterprise AI architecture advisory, speaking engagements, and collaboration protocol.", thumbnailUrl: `${DOMAIN}/assets/contact-poster.webp`, uploadDate: "2026-09-01", contentUrl: `${DOMAIN}/assets/videos/Section%209%20-%20Contact%20-%201080p.mp4` }
    ];

    const rootGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage',
          '@id': `${DOMAIN}/#profilepage`,
          url: `${DOMAIN}/`,
          name: rootTitle,
          description: rootDesc,
          mainEntity: {
            '@id': `${DOMAIN}/#person`
          }
        },
        {
          '@type': 'Person',
          '@id': `${DOMAIN}/#person`,
          name: 'Rishav Saigal',
          url: `${DOMAIN}/`,
          image: `${DOMAIN}/assets/hero-poster.png`,
          jobTitle: 'Manager (Senior Data Scientist / AI Architect)',
          worksFor: {
            '@type': 'Organization',
            name: 'Cognizant',
            url: 'https://www.cognizant.com/'
          },
          affiliation: [
            {
              '@type': 'CollegeOrUniversity',
              name: 'Indian Institute of Technology Patna',
              department: 'Department of Computer Science & Engineering',
              description: 'Ph.D. Candidate (Jul 2026 – Jun 2029 Expected)'
            }
          ],
          alumniOf: [
            {
              '@type': 'CollegeOrUniversity',
              name: 'Birla Institute of Technology and Science, Pilani',
              description: 'M.Tech in Data Science & Engineering (2019 – 2021)'
            },
            {
              '@type': 'CollegeOrUniversity',
              name: 'RCC Institute of Information Technology',
              description: 'B.Tech in Computer Science & Engineering (2013 – 2017)'
            }
          ],
          knowsAbout: [
            "Agentic AI", "Multi-Agent Systems", "Retrieval-Augmented Generation (RAG)",
            "GCP Vertex AI", "Gemini Enterprise", "Cloud Run", "Google ADK", "FastMCP",
            "Agent Engine Platform", "LangGraph", "CrewAI", "LLM Orchestration",
            "LLM Behavioral Research", "LLM Behavioral Drift", "Time Series Forecasting",
            "Causal Inference", "Hierarchical Linear Models (HLM)", "MLOps",
            "Automated Retraining", "Model Monitoring", "SHAP (XAI)", "Explainable AI",
            "Scikit-Learn", "TensorFlow", "Keras", "PySpark", "Azure Databricks",
            "AWS SageMaker", "DataRobot", "PyCaret", "FastAPI", "Streamlit", "Docker",
            "MLflow", "Ollama", "PostgreSQL", "MySQL", "Redis", "OpenCV", "LSTM",
            "Survival Analysis", "Transfer Learning", "Feature Engineering",
            "Prompt Engineering", "AI Governance", "Responsible AI"
          ],
          sameAs: [
            "https://www.linkedin.com/in/rishav-saigal-4bb50311a/",
            "https://github.com/Rishav1996",
            "https://orcid.org/0009-0005-5548-3016",
            "https://www.credly.com/users/rishav-saigal.ae0679ae",
            "https://medium.com/@rishavsaigal",
            "https://www.linkedin.com/newsletters/algorhythm-chronicles-7480002909695438848/",
            "https://www.youtube.com/@algorythmchronicles",
            "https://doi.org/10.5281/zenodo.20032071",
            "https://doi.org/10.5281/zenodo.21520843"
          ],
          hasCredential: ROOT_CREDENTIALS.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c.name,
            credentialCategory: c.credentialCategory,
            recognizedBy: {
              '@type': 'Organization',
              name: c.recognizedBy
            },
            url: c.url
          }))
        },
        {
          '@type': 'ItemList',
          '@id': `${DOMAIN}/#projects`,
          name: 'Selected Engineering & Research Projects',
          itemListElement: ROOT_PROJECTS.map((proj, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: proj.name,
              applicationCategory: proj.category,
              dateCreated: proj.date,
              description: proj.description,
              ...(proj.impact ? { comment: proj.impact } : {})
            }
          }))
        },
        {
          '@type': 'ItemList',
          '@id': `${DOMAIN}/#publications`,
          name: 'Publications & Independent Research',
          itemListElement: ROOT_PUBLICATIONS.map((pub, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'ScholarlyArticle',
              headline: pub.name,
              datePublished: pub.datePublished,
              publisher: {
                '@type': 'Organization',
                name: pub.publisher
              },
              url: pub.url,
              ...(pub.sameAs ? { sameAs: pub.sameAs } : {})
            }
          }))
        },
        {
          '@type': 'FAQPage',
          '@id': `${DOMAIN}/#faq`,
          mainEntity: ROOT_FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        },
        ...ROOT_VIDEOS.map((vid) => ({
          '@type': 'VideoObject',
          name: vid.name,
          description: vid.description,
          thumbnailUrl: vid.thumbnailUrl,
          uploadDate: vid.uploadDate,
          contentUrl: vid.contentUrl
        }))
      ]
    };

    // Remove any existing script ld+json on root
    rootHtml = rootHtml.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
    rootHtml = injectJsonLd(rootHtml, rootGraph);

    fs.writeFileSync(rootPath, rootHtml, 'utf8');
    console.log(`✓ Enhanced metadata & complete Schema.org graph on: dist/index.html`);
  }

  console.log('\nAll pages (Root + Watches) successfully post-processed for SEO, AEO, and GEO!');
}

run().catch((err) => {
  console.error('Error post-processing static files:', err);
  process.exit(1);
});
