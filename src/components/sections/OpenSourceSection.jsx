import React, { useState, useEffect, useRef } from 'react';
import './OpenSourceSection.css';

const OS_PROJECTS = [
  {
    title: "LLMDriftExperiment",
    desc: "High-fidelity research platform for quantifying LLM Drift.",
    commands: [
      { type: 'input', text: `git clone https://github.com/Rishav1996/LLMDriftExperiment.git` },
      { type: 'input', text: `cd LLMDriftExperiment` },
      { type: 'input', text: `uv sync && cp .env.example .env` },
      { type: 'system', text: `[uv] Installed 34 packages in 0.82s` },
      { type: 'input', text: `uv run python -m debate_agents.main` },
      { type: 'system', text: `[System] Initializing LangGraph-based multi-agent debate engine...` },
      { type: 'observation', text: `[Pros Agent] Adopting PROTECT posture. Prioritizing logical defense...` },
      { type: 'observation', text: `[Cons Agent] Adopting ATTACK posture. Launching character-consistent assault...` },
      { type: 'progress', text: `[Debate] Round 1: Analyzing arguments via shared_memory.json...` },
      { type: 'system', text: `[Metrics] Calculating Affective, Cognitive/Structural, and Social/Relational signals...` },
      { type: 'output', text: `[Output] Analyzing final metrics for Persona deviation...` },
      { type: 'success', text: `[Success] Simulation complete. Memory snapshots archived to Research Runs/` }
    ]
  },
  {
    title: "PyCaretAgent",
    desc: "Autonomous AI agent framework extending PyCaret.",
    commands: [
      { type: 'input', text: `git clone https://github.com/Rishav1996/PyCaretAgent.git` },
      { type: 'input', text: `cd PyCaretAgent && uv pip install .` },
      { type: 'success', text: `[uv] Installed PyCaretAgent and 15 dependencies.` },
      { type: 'input', text: `python -c "from pycaretagent.agent import root_agent; root_agent('classification')"` },
      { type: 'observation', text: `[Supervisor] Validating dataset via file_validator_tool...` },
      { type: 'progress', text: `[Router] Request routed to Classification Agent.` },
      { type: 'system', text: `[Planner] Allocating BuiltInPlanner with 4096 thinking budget...` },
      { type: 'progress', text: `[Tool] Executing csv_analytics_tool: retrieving schemas...` },
      { type: 'system', text: `[Execution] Generating Markdown Code Blocks via google-adk...` },
      { type: 'output', text: `[Output] Saving pipeline to runs/WHGV1L/models/final_pipeline.pkl` },
      { type: 'progress', text: `[Deploy] Generating FastAPI REST wrapper and dockerfile...` },
      { type: 'success', text: `[Success] Production-ready ML system built.` }
    ]
  },
  {
    title: "CognitoEDA",
    desc: "Agentic workflow for automated EDA.",
    commands: [
      { type: 'input', text: `git clone https://github.com/Rishav1996/CognitoEDA.git` },
      { type: 'input', text: `cd CognitoEDA` },
      { type: 'input', text: `uv add -r requirements.txt` },
      { type: 'success', text: `[uv] Installed LangChain, LangGraph, Streamlit...` },
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
    }, 400); // 400ms per line simulation

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="opensource" className="opensource-section">
      <div className="opensource-container">
        <div className="opensource-header">
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
              </div>
            ))}
          </div>
          
          <div className="os-terminal-container">
            <div className="os-terminal-header">
              <div className="os-terminal-buttons">
                <span className="close"></span>
                <span className="minimize"></span>
                <span className="maximize"></span>
              </div>
              <div className="os-terminal-title">bash - {OS_PROJECTS[activeIndex].title} - 80x24</div>
            </div>
            <div className="os-terminal-body" ref={terminalRef}>
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
