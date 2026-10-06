import React, { useState, useEffect, useRef } from 'react';
import './ProjectsSection.css';

const PROJECTS = [
  {
    title: "Generative AI (GenAI) Video Generation",
    category: "Agentic AI & GenAI",
    date: "Jan 2026 – Present",
    desc: "Autonomous multi-agent pipeline using Google ADK, GCP Vertex AI (document storage), Gemini Enterprise, Agent Engine Platform, and FastMCP; features context-window summarisation, token-cost observability, dynamic prompting, and automated self-correction validation loops.",
    impact: "Slashed end-to-end delivery timeline from 5–14 days down to under 6 hours (from script generation to final video demo)."
  },
  {
    title: "Media Analytics (POC)",
    category: "Time Series & MLOps",
    date: "Jun 2025 – Oct 2025",
    desc: "Predictive ML and prompt engineering pipeline for inference explanation, insight extraction, and business KPI generation; models multi-channel budget allocation and predicts future investment growth using multi-timeseries forecasting.",
    impact: null
  },
  {
    title: "Price Elasticity (POC)",
    category: "Causal ML & Pricing",
    date: "Jun 2025 – Jul 2025",
    desc: "Dynamic pricing architecture using Hierarchical Linear Models (HLM) (statsmodels, Python, Azure ML) with automated MLflow continuous retraining pipelines to model cross-product elasticity frontiers.",
    impact: null
  },
  {
    title: "Enterprise Analytics Chatbot",
    category: "Agentic AI & GenAI",
    date: "Jul 2024 – Dec 2025",
    desc: "Conversational analytics agent (Streamlit, PostgreSQL) featuring a dedicated Intent Classifier to determine required insight types, paired with dynamic Text-to-SQL generation powered by Client Proprietary Internal LLMs.",
    impact: "Projected cycle time reduction for designing complex enterprise insights from 3 months down to under 15 days."
  },
  {
    title: "Intelligent QA / BA Chatbot",
    category: "Agentic AI & GenAI",
    date: "Apr 2024 – Apr 2025",
    desc: "Enterprise conversational system (FastAPI, Python) utilizing semantic policy retrieval, intent classifiers, and structured intent flows for automated policy Q&A and operational task execution.",
    impact: "Autonomously resolved 80% of internal policy document queries; automated RBAC-governed workflow execution and access request approvals/rejections."
  },
  {
    title: "LLM-Driven Predictive Modelling",
    category: "Causal ML & Pricing",
    date: "Jul 2024 – Sep 2024",
    desc: "Unsupervised feature extraction pipeline using open-source LLMs via Ollama to discover ticket objective classes; aggregates class occurrences into hourly instance feature vectors fed into an existing deep LSTM sequence model for enhanced predictive sequence accuracy.",
    impact: null
  },
  {
    title: "LLM-Based Test Case Generator",
    category: "Agentic AI & GenAI",
    date: "Nov 2023 – Mar 2024",
    desc: "QA automation toolchain (FastAPI, Python) parsing unstructured Business Requirement Documents (BRDs) to extract acceptance criteria and auto-generate structured Gherkin and TMMi test suites.",
    impact: "Accelerated test authoring cycle by 70%; ensured 100% test-to-requirement coverage mapping."
  },
  {
    title: "Healthcare Consumer Analytics",
    category: "Causal ML & Pricing",
    date: "Jun 2022 – Oct 2023",
    desc: "Production ML pipeline on AWS SageMaker (Scikit-Learn, DataRobot) combining customer segmentation, causal inference uplift modeling, and SHAP explainability for account-level promotional strategy ranking.",
    impact: "Delivered projected $2.3M in cost savings at 90%+ model accuracy across all account-level promotion campaigns."
  },
  {
    title: "Demand Sensing MLOps",
    category: "Time Series & MLOps",
    date: "Mar 2020 – Jun 2022",
    desc: "Distributed time series MLOps pipeline on Azure Databricks (PySpark, TensorFlow, Keras) with automated feature engineering, distributed model selection, and continuous retraining workflows.",
    impact: "Achieved 5% accuracy improvement, 10% better model selection, reduced training from 3 days to 2 hours, and 60% reduction in manual intervention."
  },
  {
    title: "Predictive Maintenance",
    category: "Time Series & MLOps",
    date: "Dec 2019 – Mar 2020",
    desc: "Time-varying survival analysis pipeline (Cox Proportional Hazards, XGBoost, lifelines, Python) predicting EV component degradation windows paired with interactive Plotly operational HUDs.",
    impact: "Achieved 82% validation accuracy for early failure prevention."
  },
  {
    title: "Service Now Ticket Analytics",
    category: "Time Series & MLOps",
    date: "Oct 2019 – Dec 2019",
    desc: "Deep learning sequence volume forecasting architecture (LSTM vs. MLP, TensorFlow, MySQL) featuring custom greedy Hungarian workload dispatch heuristics for agent routing.",
    impact: "Achieved 85% validation accuracy with intelligent routing heuristics for optimized workload dispatch."
  },
  {
    title: "Supply Chain Demand Forecasting (POC)",
    category: "Time Series & MLOps",
    date: "Apr 2019 – Oct 2019",
    desc: "Multivariate demand forecasting pipeline (statsmodels SARIMAX, pandas, Python) integrating dynamic NLTK VADER social media sentiment indices as exogenous regressors with grid-search hyperparameter optimization.",
    impact: null
  },
  {
    title: "Retail Video Analytics (POC)",
    category: "NLP & Computer Vision",
    date: "Apr 2018 – Mar 2019",
    desc: "Computer vision pipeline (OpenCV, TensorFlow, Keras, Python) featuring frame-level CNN transfer learning for brand asset detection and multi-class classification across retail video streams.",
    impact: null
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
      { type: 'success', text: project.desc },
      ...(project.impact ? [
        { type: 'output', text: `VERIFIED OPERATIONAL IMPACT:` },
        { type: 'impact', text: project.impact }
      ] : [])
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
