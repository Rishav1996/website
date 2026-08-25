import React, { useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import GlowCard from '../ui/GlowCard';
import './ExperienceSection.css';

const experiences = [
  {
    role: "Senior AI Specialist / Lead Data Scientist",
    company: "Cognizant Technology Solutions",
    period: "Feb 2024 - Present",
    location: "Kolkata, India",
    active: true,
    impact: "Lead enterprise AI solutions, production Generative AI multi-agent workflows, dynamic price elasticity modeling, and time-series forecasting frameworks across Fortune 500 accounts.",
    highlights: [
      "Architected enterprise Agentic AI workflows using LangGraph and GCP Vertex AI, decreasing manual decision latency by 65%.",
      "Constructed dynamic pricing algorithms using Hierarchical Linear Models with automated MLflow model tracking and retraining.",
      "Spearheaded technical development of an in-house automated GenAI Video synthesis pipeline for real-time marketing analytics.",
      "Engineered automated PySpark data pipelines to ingest and process 10M+ daily records on cloud infrastructure."
    ],
    skills: {
      genai: ["GCP Vertex AI", "LangGraph", "Gemini 1.5 Pro", "Multi-Agent Debate"],
      ml: ["Hierarchical Linear Models", "Causal Inference", "Survival Modeling", "PySpark"],
      mlops: ["MLflow", "Docker", "CI/CD Pipelines", "FastAPI"]
    }
  },
  {
    role: "Management Trainee — Data Scientist",
    company: "Genpact",
    period: "Aug 2018 - Feb 2024",
    location: "Kolkata, India",
    active: false,
    impact: "Engineered scalable predictive modeling architectures, automated financial time-series forecasting, and machine learning pipelines across banking, insurance, and retail clients.",
    highlights: [
      "Built production XGBoost, LightGBM, and Random Forest models achieving 94%+ precision on customer lifetime prediction.",
      "Developed end-to-end automated retraining pipelines using Docker and cloud APIs, cutting deployment turnaround by 40%.",
      "Designed interpretable machine learning dashboards using SHAP and LIME to provide audit-compliant decision explanations."
    ],
    skills: {
      ml: ["XGBoost", "LightGBM", "Scikit-Learn", "SHAP / XAI"],
      engineering: ["Python", "SQL", "Pandas", "AWS SageMaker"]
    }
  }
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Anime.js Staggered timeline card entrance
    const cards = sectionRef.current.querySelectorAll('.experience-card-wrapper');
    const anim = anime({
      targets: cards,
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: anime.stagger(200),
      duration: 800,
      easing: 'easeOutQuad',
    });

    // Animate the vertical circuit line
    const circuitPath = sectionRef.current.querySelector('.timeline-svg-line');
    let lineAnim = null;
    if (circuitPath) {
      lineAnim = anime({
        targets: circuitPath,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1800,
        easing: 'easeInOutSine',
      });
    }

    return () => {
      anim.pause();
      if (lineAnim) lineAnim.pause();
    };
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        <div className="section-header-center">
          <span className="section-tag-badge">CAREER TRAJECTORY</span>
          <h2 className="section-title">Enterprise Infrastructure</h2>
          <p className="section-subtitle">8+ years of production AI leadership, scaling machine learning architectures from research prototypes to high-availability enterprise services.</p>
        </div>

        <div className="timeline-corridor">
          <div className="timeline-circuit-track">
            <svg className="timeline-circuit-svg" width="4" height="100%" preserveAspectRatio="none">
              <line className="timeline-svg-line" x1="2" y1="0" x2="2" y2="100%" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="2" strokeDasharray="6 6"/>
            </svg>
          </div>

          <div className="experiences-list">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-card-wrapper">
                <div className={`timeline-node ${exp.active ? 'active-node' : ''}`}>
                  <span className="node-core"></span>
                  {exp.active && <span className="node-pulse-ring"></span>}
                </div>

                <GlowCard
                  glowColor={exp.active ? "rgba(0, 240, 255, 0.35)" : "rgba(168, 85, 247, 0.25)"}
                  className={`exp-glow-card ${exp.active ? 'exp-active-border' : ''}`}
                >
                  <div className="experience-inner">
                    <div className="exp-header">
                      <div>
                        <div className="exp-role-title-row">
                          <h3 className="exp-role">{exp.role}</h3>
                          {exp.active && <span className="live-role-badge">ACTIVE ROLE</span>}
                        </div>
                        <h4 className="exp-company">{exp.company} &bull; <span className="exp-location">{exp.location}</span></h4>
                      </div>
                      <span className="exp-period-pill">{exp.period}</span>
                    </div>

                    <p className="exp-impact">{exp.impact}</p>

                    <div className="exp-highlights-box">
                      <span className="highlights-label">PRODUCTION HIGHLIGHTS</span>
                      <ul className="highlights-list">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx}>
                            <span className="bullet-chevron">&gt;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="exp-skills-quadrant">
                      {exp.skills.genai && (
                        <div className="skill-group">
                          <span className="skill-group-label genai-label">GenAI & Agents</span>
                          <div className="skill-pill-wrap">
                            {exp.skills.genai.map((s, sIdx) => <span key={sIdx} className="skill-pill genai-pill">{s}</span>)}
                          </div>
                        </div>
                      )}
                      {exp.skills.ml && (
                        <div className="skill-group">
                          <span className="skill-group-label ml-label">Core ML & Causal</span>
                          <div className="skill-pill-wrap">
                            {exp.skills.ml.map((s, sIdx) => <span key={sIdx} className="skill-pill ml-pill">{s}</span>)}
                          </div>
                        </div>
                      )}
                      {exp.skills.mlops && (
                        <div className="skill-group">
                          <span className="skill-group-label mlops-label">Production MLOps</span>
                          <div className="skill-pill-wrap">
                            {exp.skills.mlops.map((s, sIdx) => <span key={sIdx} className="skill-pill mlops-pill">{s}</span>)}
                          </div>
                        </div>
                      )}
                      {exp.skills.engineering && (
                        <div className="skill-group">
                          <span className="skill-group-label eng-label">Engineering</span>
                          <div className="skill-pill-wrap">
                            {exp.skills.engineering.map((s, sIdx) => <span key={sIdx} className="skill-pill eng-pill">{s}</span>)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
