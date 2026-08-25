import React, { useState, useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import GlowCard from '../ui/GlowCard';
import './ProjectsSection.css';

const projects = [
  {
    title: "AI Project Fact-Sheet - Agentic AI",
    category: "Agentic AI",
    problem: "Enterprise workflows required dynamic multi-model reasoning, tool synthesis, and continuous evaluation across complex multi-step tasks.",
    architecture: "Engineered stateful multi-agent supervisors using LangGraph, Gemini 1.5 Pro, and vector memory retrieval with self-correcting validation loops.",
    deployment: "Deployed containerized FastAPI microservices orchestrated on GCP Vertex AI with real-time telemetry and streaming WebSocket responses.",
    tags: ["LangGraph", "GCP Vertex AI", "Gemini Pro", "Multi-Agent Supervisor", "FastAPI"]
  },
  {
    title: "AI Project Fact-Sheet - Causal ML / Dynamic Pricing",
    category: "Causal ML",
    problem: "Pricing decisions across 500+ product categories lacked elasticity sensitivity and causal treatment attribution under market volatility.",
    architecture: "Constructed Hierarchical Linear Models (HLM) combined with double machine learning (DML) causal inference to isolate pure price elasticity.",
    deployment: "Automated MLflow experiment tracking registry with automated scheduled retraining and drift monitoring alerts on cloud infrastructure.",
    tags: ["Hierarchical Linear Models", "Causal Inference", "MLflow", "Elasticity Engine", "Python"]
  },
  {
    title: "AI Project Fact-Sheet - Time-Series Survival Analysis",
    category: "Time Series",
    problem: "Predicting enterprise customer churn and asset component failure risks required time-to-event probabilistic estimations.",
    architecture: "Implemented Cox Proportional Hazards and gradient-boosted survival trees to output continuous survival curves and hazard ratios.",
    deployment: "Integrated with PySpark large-scale distributed data pipelines for batch scoring over 10M+ daily telemetry records.",
    tags: ["Survival Analysis", "Cox Proportional Hazards", "PySpark", "XGBoost", "Batch Pipelines"]
  },
  {
    title: "AI Project Fact-Sheet - GenAI Video Synthesis",
    category: "Multimodal AI",
    problem: "Manual generation of targeted marketing video variants was slow, expensive, and difficult to scale across product catalogs.",
    architecture: "Spearheaded an automated GenAI video pipeline integrating text-to-video diffusion models, dynamic audio synthesis, and automated FFmpeg composition.",
    deployment: "Dockerized GPU pipeline with asynchronous Celery worker queues and real-time cloud storage sync.",
    tags: ["Generative Video", "Diffusion Models", "FFmpeg", "Celery", "GPU Accelerated"]
  },
  {
    title: "AI Project Fact-Sheet - Multimodal Document Extraction",
    category: "Computer Vision / NLP",
    problem: "Unstructured complex enterprise PDFs, invoices, and contracts contained mixed tabular, handwritten, and hierarchical textual data.",
    architecture: "Constructed OCR + vision-language model (VLM) extraction pipelines with layout-aware spatial embeddings and confidence scoring.",
    deployment: "Scalable REST APIs serving sub-second parsed JSON schemas with automated human-in-the-loop exception routing.",
    tags: ["Vision-Language Models", "OCR", "LayoutLM", "Schema Enforcement", "FastAPI"]
  }
];

const categories = ["All", "Agentic AI", "Causal ML", "Time Series", "Multimodal AI", "Computer Vision / NLP"];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(projects[0]);
  const sectionRef = useRef(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-fact-card');
    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(80),
      duration: 600,
      easing: 'easeOutQuad',
    });
  }, [selectedCategory]);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <div className="section-header-center">
          <span className="section-tag-badge">TECHNICAL FACTSHEETS</span>
          <h2 className="section-title">AI Project Laboratory</h2>
          <p className="section-subtitle">Architectural fact-sheets detailing technical problems, system designs, algorithms, and production deployment frameworks.</p>
        </div>

        {/* Category Filter Pills */}
        <div className="project-categories-bar">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`project-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dual Pane Layout */}
        <div className="projects-dual-pane">
          {/* Left Pane: Project Cards List */}
          <div className="projects-cards-col">
            {filteredProjects.map((proj, index) => {
              const isSelected = activeProject.title === proj.title;
              return (
                <GlowCard
                  key={index}
                  glowColor={isSelected ? "rgba(0, 240, 255, 0.4)" : "rgba(255, 255, 255, 0.1)"}
                  className={`project-fact-card ${isSelected ? 'selected-card' : ''}`}
                  onClick={() => setActiveProject(proj)}
                >
                  <div className="fact-card-inner">
                    <div className="fact-card-header">
                      <span className="fact-cat-tag">{proj.category}</span>
                      {isSelected && <span className="active-inspect-pill">ACTIVE</span>}
                    </div>
                    <h3 className="fact-card-title">{proj.title}</h3>
                    <p className="fact-card-preview">{proj.problem.substring(0, 110)}...</p>
                    <div className="fact-card-tags">
                      {proj.tags.slice(0, 3).map((t, tIdx) => (
                        <span key={tIdx} className="fact-tag-chip">{t}</span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              );
            })}
          </div>

          {/* Right Pane: Linux Cyber Terminal Factsheet Inspector */}
          <div className="project-inspector-col">
            <div className="cyber-terminal-window">
              <div className="cyber-terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="terminal-title">bash - factsheet_inspector.sh // {activeProject.category}</div>
                <span className="terminal-status-pill">ONLINE</span>
              </div>

              <div className="cyber-terminal-body">
                <div className="terminal-line">
                  <span className="term-prompt">rishav@ai-lab:~$</span> <span className="term-cmd">cat factsheet.json</span>
                </div>

                <div className="terminal-block">
                  <span className="term-key">"title"</span>: <span className="term-val">"{activeProject.title}"</span>,
                </div>
                <div className="terminal-block">
                  <span className="term-key">"category"</span>: <span className="term-val">"{activeProject.category}"</span>,
                </div>

                <div className="terminal-section-title">// 01. BUSINESS & TECHNICAL CHALLENGE</div>
                <p className="terminal-text-block">{activeProject.problem}</p>

                <div className="terminal-section-title">// 02. SYSTEM ARCHITECTURE & ALGORITHMS</div>
                <p className="terminal-text-block">{activeProject.architecture}</p>

                <div className="terminal-section-title">// 03. PRODUCTION DEPLOYMENT & SCALING</div>
                <p className="terminal-text-block">{activeProject.deployment}</p>

                <div className="terminal-section-title">// 04. STACK MANIFEST</div>
                <div className="terminal-tags-grid">
                  {activeProject.tags.map((t, tIdx) => (
                    <span key={tIdx} className="terminal-tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
