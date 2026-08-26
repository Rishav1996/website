import React, { useState, useEffect, useRef } from 'react';
import './OpenSourceSection.css';

const OS_PROJECTS = [
  {
    title: "CognitoEDA",
    url: "https://github.com/Rishav1996/CognitoEDA",
    desc: "Autonomous agentic EDA pipeline using LangGraph and Python.",
    commands: [
      { type: 'input', text: `git clone https://github.com/Rishav1996/CognitoEDA.git` },
      { type: 'input', text: `cd CognitoEDA` },
      { type: 'input', text: `uv run streamlit run ./src/app.py` },
      { type: 'system', text: `[System] Initializing LangGraph state machine...` },
      { type: 'progress', text: `[Agent] Metadata Extractor Agent: Analyzing schema...` },
      { type: 'progress', text: `[Agent] Python Pandas Coder Agent: Executing Pandas queries...` },
      { type: 'progress', text: `[Agent] Structure Creator Agent: Organizing results...` },
      { type: 'progress', text: `[Agent] Python Statistics Coder Agent: Executing queries...` },
      { type: 'progress', text: `[Agent] Web Developer Agent: Creating HTML report...` },
      { type: 'success', text: `[Success] Human-readable structured document generated.` }
    ]
  },
  {
    title: "AWS-ML-Services",
    url: "https://github.com/Rishav1996/AWS-ML-Services",
    desc: "POCs for AWS Comprehend, Transcribe, and SageMaker.",
    commands: [
      { type: 'input', text: `git clone https://github.com/Rishav1996/AWS-ML-Services.git` },
      { type: 'input', text: `cd AWS-ML-Services` },
      { type: 'system', text: `[System] Authenticating with AWS services...` },
      { type: 'progress', text: `[POC] Starting Face Matching Pipeline...` },
      { type: 'observation', text: `[Resume Verifier] Matching real-time video candidate...` },
      { type: 'progress', text: `[POC] Starting Speech Recognition Pipeline...` },
      { type: 'progress', text: `[POC] Starting Text Analytics Pipeline...` },
      { type: 'observation', text: `[AWS Comprehend] Executing Named Entity Recognition (NER)...` },
      { type: 'progress', text: `[POC] Starting Transcribe Pipeline...` },
      { type: 'observation', text: `[AWS Transcribe] Converting real-time speech streams...` },
      { type: 'output', text: `[Metrics] Transcribe Short Text Accuracy: 97.25%` },
      { type: 'success', text: `[Success] All AWS ML POC pipelines executed.` }
    ]
  },
  {
    title: "PyCaret-MLOps",
    url: "https://github.com/Rishav1996/PyCaret-MLOps",
    desc: "Deployment pipelines for AWS and Hugging Face.",
    commands: [
      { type: 'input', text: `git clone https://github.com/Rishav1996/PyCaret-MLOps.git` },
      { type: 'input', text: `cd PyCaret-MLOps` },
      { type: 'input', text: `pip install PyCaret Scikit-learn boto3 fastapi python-dotenv` },
      { type: 'success', text: `[pip] Installed dependencies for Python 3.7.` },
      { type: 'input', text: `jupyter nbconvert --execute "Data Splitting Module.ipynb"` },
      { type: 'progress', text: `[Notebook] Executing data ingestion...` },
      { type: 'input', text: `jupyter nbconvert --execute "Training & Deployment Module.ipynb"` },
      { type: 'progress', text: `[Scikit-learn] Training final optimized model pipeline...` },
      { type: 'system', text: `[Docker] Containerizing deploy module...` },
      { type: 'observation', text: `[Deploy] Pushing Docker image to Hugging Face Spaces...` },
      { type: 'input', text: `jupyter nbconvert --execute "Prediction Module.ipynb"` },
      { type: 'success', text: `[Success] Model deployed on AWS and Hugging Face.` }
    ]
  },
  {
    title: "AI-MLOps-TimeSeries",
    url: "https://github.com/Rishav1996/AI-MLOps-TimeSeries",
    desc: "Self-hosted FastAPI & React MLOps platform for forecasting.",
    commands: [
      { type: 'input', text: `git clone https://github.com/Rishav1996/AI-MLOps-TimeSeries.git` },
      { type: 'input', text: `cd AI-MLOps-TimeSeries` },
      { type: 'input', text: `docker compose up --build` },
      { type: 'system', text: `[+] Running 6/6 (mysql, redis, backend, celery, frontend)` },
      { type: 'success', text: `[System] APIs available on ports 8000, 8001, 8501.` },
      { type: 'progress', text: `[Stage 1] Ingestion: CSV payload uploaded to MySQL.` },
      { type: 'observation', text: `[Stage 2] Executing Isolation Forest & Z-score detection...` },
      { type: 'observation', text: `[Stage 3] Fitting ARIMA, Prophet, ETS over expanding CV...` },
      { type: 'output', text: `[Stage 4] Metrics: Computing RMSE, MAPE, PSI, KS.` },
      { type: 'success', text: `[Success] Forecasts rendered to Streamlit visualization.` }
    ]
  }
];

const OpenSourceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const terminalRef = useRef(null);
  const listRefs = useRef([]);

  // Auto-scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (!isNaN(index)) setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    const elements = listRefs.current;
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    // Fast typing effect for terminal
    setTerminalOutput([]);
    const project = OS_PROJECTS[activeIndex];
    
    let currentCmd = 0;
    const interval = setInterval(() => {
      if (currentCmd < project.commands.length) {
        currentCmd++;
        setTerminalOutput(project.commands.slice(0, currentCmd));
        // Scroll terminal to bottom
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="opensource" className="opensource-section">
      <div className="opensource-container">
        <div className="section-header-center">
          <span className="section-tag-badge">OPEN SOURCE TOOLING</span>
          <h2 className="section-title">GitHub Open Source</h2>
          <p className="section-subtitle">Publicly available AI research & MLOps frameworks.</p>
        </div>

        <div className="opensource-layout">
          <div className="opensource-list">
            {OS_PROJECTS.map((proj, idx) => (
              <div 
                key={idx} 
                ref={(el) => (listRefs.current[idx] = el)}
                data-index={idx}
                className={`os-item ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveIndex(idx);
                  if (listRefs.current[idx]) {
                    listRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              >
                <h3>{proj.title}</h3>
                <p className="os-desc">{proj.desc}</p>
                <a
                  className="os-repo-link"
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on GitHub &rarr;
                </a>
              </div>
            ))}
          </div>
          
          <div className="os-terminal-container">
            <div className="os-terminal-header">
              <div className="os-terminal-buttons">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="os-terminal-title">bash - {OS_PROJECTS[activeIndex].title} - 80x24</div>
            </div>
            <div className="os-terminal-body code" ref={terminalRef}>
              {terminalOutput.filter(Boolean).map((line, idx) => (
                <div key={idx} className={`os-terminal-line ${line.type}`}>
                  {line.type === 'input' && <span className="prompt">rishav@lab:~$ </span>}
                  {line.text}
                </div>
              ))}
              <div className="os-cursor"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
