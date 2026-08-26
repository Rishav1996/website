import React, { useState, useEffect, useRef } from 'react';
import './ProjectsSection.css';

const PROJECTS = [
  {
    title: "Gen AI Video Generation",
    category: "Agentic AI & GenAI",
    date: "Jan 2026 – Present",
    desc: "Multi-agent pipeline (Google ADK, LangGraph, GCP Vertex AI, Gemini Enterprise) ingesting meeting transcripts, summarising and storyboarding via LLM, then synthesising sales pitch videos; architecture features a token-cost observability layer (per-run cost tracking, quality-vs-cost controls) and a self-correction mechanism (automated retry on output-validation failure)."
  },
  {
    title: "Media Use Case (POC)",
    category: "Agentic AI & GenAI",
    date: "Jun 2025 – Oct 2025",
    desc: "Agentic AI system (CrewAI, LangGraph, GCP) dynamically analysing ad performance, optimising budget allocation, and recommending channel-series combinations."
  },
  {
    title: "Price Elasticity (POC)",
    category: "Causal ML & Pricing",
    date: "Jun 2025 – Jul 2025",
    desc: "Dynamic pricing engine using Hierarchical Linear Models (statsmodels, Python) with real-time competitor data ingestion and an automated MLflow retraining pipeline; modelled cross-product elasticities to recommend optimal price points."
  },
  {
    title: "Analytics Chatbot",
    category: "Agentic AI & GenAI",
    date: "Jul 2024 – Dec 2025",
    desc: "LLM-powered chatbot (LangChain, Streamlit, PostgreSQL) enabling NL querying over enterprise databases with dynamic chart generation (Plotly) and LLM-based visual summarisation for non-technical stakeholders."
  },
  {
    title: "Intelligent QA / BA Chatbot",
    category: "Agentic AI & GenAI",
    date: "Apr 2024 – Apr 2025",
    desc: "Conversational AI system (LangChain, FastAPI, Python) for internal policy Q&A, action execution, and automated test-case generation in Gherkin/TMMi formats; reduced manual QA documentation effort significantly."
  },
  {
    title: "Predictive Modelling",
    category: "Causal ML & Pricing",
    date: "Jul 2024 – Sep 2024",
    desc: "LLM-driven feature engineering pipeline converting unstructured text to numerical embeddings (OpenAI API, Scikit-Learn); incorporated SHAP explainability layer, improving model accuracy and interpretability for downstream tasks."
  },
  {
    title: "LLM Test Case Generator",
    category: "Agentic AI & GenAI",
    date: "Nov 2023 – Mar 2024",
    desc: "LLM-powered QA automation tool (LangChain, FastAPI, Python) generating test cases in Gherkin/TMMi formats from business requirements; provided intelligent, referenced Q&A, streamlining testing workflows and significantly reducing manual documentation effort."
  },
  {
    title: "Healthcare Consumer Analytics",
    category: "Causal ML & Pricing",
    date: "Jun 2022 – Oct 2023",
    desc: "Predictive promotion optimisation (Scikit-Learn, DataRobot, Azure ML) targeting account-level healthcare clients; combined customer segmentation, causal inference, and SHAP-based explainability to rank promotional strategies."
  },
  {
    title: "Demand Sensing",
    category: "Time Series & MLOps",
    date: "Mar 2020 – Jun 2022",
    desc: "End-to-end time series MLOps pipeline (PySpark, TensorFlow, MLflow, AWS SageMaker) with automated feature engineering, model selection, and continuous retraining; designed for scalable, low-touch operation across product lines."
  },
  {
    title: "Predictive Maintenance",
    category: "Time Series & MLOps",
    date: "Dec 2019 – Mar 2020",
    desc: "Time-varying survival analysis (Cox PH, XGBoost, lifelines, Python) forecasting EV component failures within specified windows; combined survival modelling with transfer-learning-enhanced gradient boosting and interactive Plotly visualisations."
  },
  {
    title: "Service Now Analytics",
    category: "Time Series & MLOps",
    date: "Oct 2019 – Dec 2019",
    desc: "Ticket volume forecasting (LSTM, MLP, TensorFlow, MySQL) with custom routing algorithms for optimal agent assignment; benchmarked deep sequence models against MLP baselines with rich client reporting."
  },
  {
    title: "Supply Chain Management (POC)",
    category: "Time Series & MLOps",
    date: "Apr 2019 – Oct 2019",
    desc: "End-to-end demand forecasting pipeline (statsmodels, NLTK Vader, pandas, Python) integrating social media sentiment as an external regressor; uni- and multi-variate models optimised via Grid Search with automated data wrangling."
  },
  {
    title: "Video Analytics Solution (POC)",
    category: "NLP & Computer Vision",
    date: "Apr 2018 – Mar 2019",
    desc: "Internal computer vision POC (OpenCV, TensorFlow, Keras, Python) for brand recognition in retail imagery; extracted and classified brand presence from individual frames to support marketing intelligence use cases."
  }
];

const DOMAINS = ["All Domains", "Agentic AI & GenAI", "Causal ML & Pricing", "Time Series & MLOps", "NLP & Computer Vision"];

const ProjectsSection = () => {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const terminalRef = useRef(null);

  const filteredProjects = selectedDomain === "All Domains"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedDomain);

  useEffect(() => {
    // Fast typing effect for terminal
    setTerminalOutput([]);
    const project = activeProject;
    
    const cmds = [
      { type: 'input', text: `cat ${project.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.md` },
      { type: 'system', text: `[System] Extracting architectural blueprints...` },
      { type: 'output', text: `DATE: ${project.date} | DOMAIN: ${project.category}` },
      { type: 'output', text: `ARCHITECTURE & APPROACH:` },
      { type: 'success', text: project.desc }
    ];

    let currentCmd = 0;
    const interval = setInterval(() => {
      if (currentCmd < cmds.length) {
        currentCmd++;
        setTerminalOutput(cmds.slice(0, currentCmd));
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeProject]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <span className="section-tag-badge">TECHNICAL FACTSHEETS</span>
          <h2 className="section-title">Project Laboratory</h2>
          <p className="section-subtitle">Technical fact-sheets focusing on architecture, design, and approach details across 13 production & research projects.</p>
        </div>

        {/* Domain Filter Pills for Recruiters */}
        <div className="project-domain-filters">
          {DOMAINS.map((domain, dIdx) => (
            <button
              key={dIdx}
              className={`domain-filter-pill ${selectedDomain === domain ? 'active' : ''}`}
              onClick={() => {
                setSelectedDomain(domain);
                const first = domain === "All Domains" ? PROJECTS[0] : PROJECTS.find(p => p.category === domain);
                if (first) setActiveProject(first);
              }}
            >
              {domain}
            </button>
          ))}
        </div>

        <div className="projects-layout">
          {/* Left: Scrollable 13 Project Items */}
          <div className="projects-list">
            {filteredProjects.map((proj, idx) => (
              <div 
                key={idx} 
                className={`project-item ${activeProject.title === proj.title ? 'active' : ''}`}
                onClick={() => setActiveProject(proj)}
              >
                <div className="project-item-top">
                  <h3>{proj.title}</h3>
                  <span className="project-cat-pill">{proj.category}</span>
                </div>
                <p className="proj-date">{proj.date}</p>
              </div>
            ))}
          </div>
          
          {/* Right: Sticky Linux Cyber Terminal */}
          <div className="terminal-container">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title">bash - {activeProject.title.replace(/[^a-zA-Z0-9]/g, '_')} - 80x24</div>
            </div>
            <div className="terminal-body code" ref={terminalRef}>
              {terminalOutput.filter(Boolean).map((line, idx) => (
                <div key={idx} className={`terminal-line ${line.type}`}>
                  {line.type === 'input' && <span className="prompt">rishav@lab:~$ </span>}
                  {line.text}
                </div>
              ))}
              <div className="cursor"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
