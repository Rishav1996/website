import React, { useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import GlowCard from '../ui/GlowCard';
import './OpenSourceSection.css';

const repos = [
  {
    name: "PyCaretAgent",
    status: "ACTIVE DEV",
    desc: "Autonomous agentic framework integrating automated machine learning pipelines with stateful LLM supervision.",
    tech: ["Python", "LangChain", "AutoML", "FastAPI"],
    githubUrl: "https://github.com/Rishav1996/PyCaretAgent"
  },
  {
    name: "model-router",
    status: "STABLE",
    desc: "Dynamic multi-LLM routing engine that directs queries between frontier models based on task complexity, cost, and latency.",
    tech: ["Python", "LLM Routing", "Cost Optimization", "Embeddings"],
    githubUrl: "https://github.com/Rishav1996/model-router"
  },
  {
    name: "CognitoEDA",
    status: "STABLE",
    desc: "Automated exploratory data analysis suite with anomaly detection and automated statistical reporting.",
    tech: ["Python", "Data Profiling", "Statistical Analysis", "Seaborn"],
    githubUrl: "https://github.com/Rishav1996/CognitoEDA"
  },
  {
    name: "LLMDriftExperiment",
    status: "RESEARCH POC",
    desc: "Empirical benchmarking framework tracking behavioral drift, accuracy degradation, and prompt sensitivity over time.",
    tech: ["Python", "Drift Detection", "Benchmarking", "Evaluation"],
    githubUrl: "https://github.com/Rishav1996/LLMDriftExperiment"
  }
];

const OpenSourceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.repo-bento-card');
    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [25, 0],
      delay: anime.stagger(100),
      duration: 700,
      easing: 'easeOutQuad',
    });
  }, []);

  return (
    <section id="opensource" className="opensource-section" ref={sectionRef}>
      <div className="opensource-container">
        <div className="section-header-center">
          <span className="section-tag-badge">OPEN SOURCE TOOLING</span>
          <h2 className="section-title">Open Source Frameworks</h2>
          <p className="section-subtitle">Public repositories, developer tooling, and research frameworks designed for the machine learning community.</p>
        </div>

        <div className="repos-grid">
          {repos.map((repo, index) => (
            <GlowCard
              key={index}
              glowColor="rgba(0, 240, 255, 0.3)"
              className="repo-bento-card"
            >
              <div className="repo-card-inner">
                <div className="repo-top-row">
                  <div className="repo-icon-name">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <h3 className="repo-name">{repo.name}</h3>
                  </div>
                  <span className="repo-status-pill">{repo.status}</span>
                </div>

                <p className="repo-desc">{repo.desc}</p>

                <div className="repo-footer">
                  <div className="repo-tech-wrap">
                    {repo.tech.map((t, tIdx) => (
                      <span key={tIdx} className="repo-tech-chip">{t}</span>
                    ))}
                  </div>

                  <a 
                    href={repo.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="repo-link-btn"
                  >
                    <span>View Repo</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17l9.2-9.2M17 17V8H8"/>
                    </svg>
                  </a>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
