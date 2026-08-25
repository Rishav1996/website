import React, { useState, useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import GlowCard from '../ui/GlowCard';
import './CapabilitiesSection.css';

const yearsData = [
  {
    year: "2018 - 2020",
    theme: "Machine Learning & Statistical Foundations",
    skills: [
      { name: "Python", cat: "core", weight: 3 },
      { name: "Scikit-Learn", cat: "ml", weight: 3 },
      { name: "Statistical Hypothesis Testing", cat: "core", weight: 2 },
      { name: "XGBoost", cat: "ml", weight: 3 },
      { name: "Random Forest", cat: "ml", weight: 2 },
      { name: "Pandas & NumPy", cat: "core", weight: 3 },
      { name: "SQL Data Modeling", cat: "data", weight: 2 }
    ]
  },
  {
    year: "2021 - 2023",
    theme: "Large-Scale MLOps & Advanced Forecasting",
    skills: [
      { name: "PySpark Big Data", cat: "data", weight: 3 },
      { name: "Time-Series Survival Analysis", cat: "ml", weight: 3 },
      { name: "Hierarchical Linear Models", cat: "ml", weight: 3 },
      { name: "MLflow Model Tracking", cat: "mlops", weight: 3 },
      { name: "Docker Containerization", cat: "mlops", weight: 2 },
      { name: "AWS SageMaker", cat: "cloud", weight: 2 },
      { name: "SHAP Explainability", cat: "ml", weight: 2 },
      { name: "FastAPI REST Services", cat: "core", weight: 3 }
    ]
  },
  {
    year: "2024 - 2026",
    theme: "Agentic AI, RAG & LLM Orchestration",
    skills: [
      { name: "LangGraph State Machines", cat: "genai", weight: 3 },
      { name: "GCP Vertex AI", cat: "cloud", weight: 3 },
      { name: "Gemini 1.5 Pro & Claude 3.5", cat: "genai", weight: 3 },
      { name: "Multi-Agent Debate Systems", cat: "genai", weight: 3 },
      { name: "LLM Behavioral Drift Frameworks", cat: "genai", weight: 3 },
      { name: "Hybrid BM25 Vector RAG", cat: "genai", weight: 3 },
      { name: "Causal Dynamic Pricing", cat: "ml", weight: 3 },
      { name: "Automated GenAI Video Synthesis", cat: "genai", weight: 2 },
      { name: "Production MLOps Governance", cat: "mlops", weight: 3 }
    ]
  }
];

const CapabilitiesSection = () => {
  const [selectedYearIdx, setSelectedYearIdx] = useState(2);
  const cloudRef = useRef(null);

  const activeSkills = yearsData[selectedYearIdx].skills;

  useEffect(() => {
    if (!cloudRef.current) return;

    const tags = cloudRef.current.querySelectorAll('.neural-tag');
    anime({
      targets: tags,
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: anime.stagger(60, { from: 'center' }),
      duration: 600,
      easing: 'easeOutElastic(1, .6)',
    });
  }, [selectedYearIdx]);

  return (
    <section id="capabilities" className="capabilities-section">
      <div className="capabilities-container">
        <div className="section-header-center">
          <span className="section-tag-badge">SKILLS EVOLUTION MATRIX</span>
          <h2 className="section-title">Neural Capability Cloud</h2>
          <p className="section-subtitle">Interactive visualization of technical mastery evolving from classical statistical learning to frontier Agentic AI orchestration.</p>
        </div>

        {/* Year Scrubbers */}
        <div className="year-scrubber-grid">
          {yearsData.map((item, idx) => (
            <button
              key={idx}
              className={`year-scrub-btn ${selectedYearIdx === idx ? 'active' : ''}`}
              onClick={() => setSelectedYearIdx(idx)}
            >
              <span className="scrub-year">{item.year}</span>
              <span className="scrub-theme">{item.theme}</span>
            </button>
          ))}
        </div>

        {/* Evolving Neural Word Cloud Card */}
        <GlowCard glowColor="rgba(0, 240, 255, 0.25)" className="neural-cloud-card">
          <div className="neural-cloud-inner" ref={cloudRef}>
            <div className="cloud-header">
              <span className="cloud-title">// ACTIVE DOMAIN FOCUS // {yearsData[selectedYearIdx].year}</span>
              <div className="cloud-legend">
                <span className="legend-dot genai">GenAI & Agents</span>
                <span className="legend-dot ml">Core ML & Causal</span>
                <span className="legend-dot mlops">MLOps</span>
                <span className="legend-dot cloud">Cloud</span>
                <span className="legend-dot data">Big Data</span>
              </div>
            </div>

            <div className="tags-cloud-container">
              {activeSkills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className={`neural-tag tag-${skill.cat} weight-${skill.weight}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
