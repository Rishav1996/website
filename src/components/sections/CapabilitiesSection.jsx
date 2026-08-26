import React, { useState, useEffect, useRef, useMemo } from 'react';
import anime from '../../utils/anime';
import './CapabilitiesSection.css';

const SKILLS = [
  // 2018
  { id: 'Python', group: 4, year: 2018 },
  { id: 'Scikit-Learn', group: 2, year: 2018 },
  { id: 'TensorFlow', group: 2, year: 2018 },
  { id: 'AWS', group: 3, year: 2018 },
  { id: 'MSSQL', group: 3, year: 2018 },
  { id: 'MySQL', group: 3, year: 2018 },
  { id: 'OpenCV', group: 2, year: 2018 },
  { id: 'Pandas', group: 2, year: 2018 },
  { id: 'NumPy', group: 2, year: 2018 },
  { id: 'SciPy', group: 2, year: 2018 },
  { id: 'Matplotlib', group: 4, year: 2018 },
  { id: 'Seaborn', group: 4, year: 2018 },
  { id: 'JavaScript', group: 4, year: 2018 },
  // 2019
  { id: 'Time Series', group: 2, year: 2019 },
  { id: 'PySpark', group: 3, year: 2019 },
  { id: 'Keras', group: 2, year: 2019 },
  { id: 'Transfer Learning', group: 2, year: 2019 },
  { id: 'Agile/Scrum', group: 1, year: 2019 },
  { id: 'REST APIs', group: 4, year: 2019 },
  { id: 'Flask', group: 4, year: 2019 },
  // 2020
  { id: 'Survival Analysis', group: 2, year: 2020 },
  { id: 'MLflow', group: 3, year: 2020 },
  { id: 'Plotly', group: 4, year: 2020 },
  { id: 'Power BI', group: 4, year: 2020 },
  { id: 'Feature Engineering', group: 3, year: 2020 },
  { id: 'Effort Estimation', group: 1, year: 2020 },
  { id: 'CI/CD for ML', group: 3, year: 2020 },
  // 2022
  { id: 'Azure ML', group: 3, year: 2022 },
  { id: 'DataRobot', group: 3, year: 2022 },
  { id: 'SHAP/XAI', group: 2, year: 2022 },
  { id: 'PyCaret', group: 2, year: 2022 },
  { id: 'Model Monitoring', group: 3, year: 2022 },
  { id: 'Team Leadership', group: 1, year: 2022 },
  { id: 'Stakeholder Management', group: 1, year: 2022 },
  { id: 'Causal Inference', group: 2, year: 2022 },
  // 2023
  { id: 'GenAI/LLMs', group: 2, year: 2023 },
  { id: 'Prompt Engineering', group: 2, year: 2023 },
  { id: 'Hugging Face', group: 2, year: 2023 },
  { id: 'FastAPI', group: 4, year: 2023 },
  { id: 'LangChain', group: 2, year: 2023 },
  { id: 'Docker', group: 3, year: 2023 },
  { id: 'Dask', group: 3, year: 2023 },
  { id: 'Impact & Risk Assessment', group: 1, year: 2023 },
  // 2024
  { id: 'RAG', group: 2, year: 2024 },
  { id: 'PostgreSQL', group: 3, year: 2024 },
  { id: 'Redis', group: 3, year: 2024 },
  { id: 'Streamlit', group: 4, year: 2024 },
  { id: 'DASH', group: 4, year: 2024 },
  { id: 'ipywidgets', group: 4, year: 2024 },
  { id: 'LLM Fine-Tuning', group: 2, year: 2024 },
  { id: 'Technical Roadmapping', group: 1, year: 2024 },
  { id: 'Cost Optimisation', group: 1, year: 2024 },
  // 2025
  { id: 'CrewAI', group: 2, year: 2025 },
  { id: 'LangGraph', group: 2, year: 2025 },
  { id: 'Agentic AI', group: 2, year: 2025 },
  { id: 'POC Management', group: 1, year: 2025 },
  // 2026
  { id: 'GCP Vertex AI', group: 3, year: 2026 },
  { id: 'Google ADK', group: 2, year: 2026 },
  { id: 'Architectural Design', group: 1, year: 2026 }
];

const COLORS = {
  1: '#a855f7', // Purple (Leadership)
  2: '#00f0ff', // Cyan (AI/ML)
  3: '#00ffaa', // Emerald (MLOps)
  4: '#f59e0b', // Amber (Prog/Viz)
};

const CapabilitiesSection = () => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [searchQuery, setSearchQuery] = useState('');
  const yearRefs = useRef([]);
  const cloudContainerRef = useRef(null);

  // Auto-scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = Number(entry.target.dataset.year);
            if (!isNaN(year)) setCurrentYear(year);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    const elements = yearRefs.current;
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const UNIQUE_YEARS = [...new Set(SKILLS.map(s => s.year))].sort();

  // Stable cloud item parameters
  const wordCloudItems = useMemo(() => {
    return SKILLS.map((skill, idx) => ({
      ...skill,
      size: (idx % 3 === 0) ? 1.25 : (idx % 2 === 0) ? 1.05 : 0.9,
    }));
  }, []);

  // Anime.js Layer-by-Layer Fall-Down & Gravity Physics Animation
  useEffect(() => {
    if (!cloudContainerRef.current) return;

    const visibleWordElements = cloudContainerRef.current.querySelectorAll('.cloud-word');
    
    // Anime.js fall-down animation with spring gravity bounce
    anime({
      targets: visibleWordElements,
      translateY: [-60, 0],
      scale: [0.75, 1],
      opacity: [0, 1],
      delay: anime.stagger(30, { from: 'center' }),
      duration: 750,
      easing: 'easeOutElastic(1, .6)'
    });
  }, [currentYear, searchQuery]);

  return (
    <section id="capabilities" className="capabilities-section">
      <div className="capabilities-container">
        <div className="section-header-center">
          <span className="section-tag-badge">SKILLS EVOLUTION MATRIX</span>
          <h2 className="section-title">Evolution of Capabilities</h2>
          <p className="section-subtitle">Scroll down to explore chronological skill acquisition and neural domain expertise.</p>
        </div>
        
        <div className="capabilities-layout">
          {/* Left: Chronological Year Milestones */}
          <div className="years-list">
            {UNIQUE_YEARS.map((year, idx) => {
              const yearSkills = SKILLS.filter(s => s.year === year);
              return (
                <div 
                  key={year}
                  ref={(el) => (yearRefs.current[idx] = el)}
                  data-year={year}
                  className={`year-node ${currentYear === year ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentYear(year);
                    if (yearRefs.current[idx]) {
                      yearRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                >
                  <div className="year-node-header">
                    <span className="year-number">{year}</span>
                    <span className="year-count-pill">{yearSkills.length} Skills Added</span>
                  </div>
                  <div className="year-skills">
                    {yearSkills.map(skill => (
                      <span 
                        key={skill.id} 
                        className="skill-tag" 
                        style={{ color: COLORS[skill.group], borderColor: `${COLORS[skill.group]}40` }}
                      >
                        {skill.id}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Neural Word Cloud with Fall-Down Layer Physics & JD Skill Search */}
          <div className="word-cloud-container">
            <div className="word-cloud-top-row">
              <div className="search-box-wrapper">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Filter by JD Keyword (e.g. LangGraph, Vertex, PySpark)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="jd-skill-search-input"
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>
              <div className="legend">
                <span style={{color: COLORS[1]}}>● Leadership</span>
                <span style={{color: COLORS[2]}}>● AI/ML</span>
                <span style={{color: COLORS[3]}}>● MLOps</span>
                <span style={{color: COLORS[4]}}>● Prog/Viz</span>
              </div>
            </div>

            <div className="word-cloud-box" ref={cloudContainerRef}>
              {wordCloudItems.map(skill => {
                const matchesSearch = !searchQuery || skill.id.toLowerCase().includes(searchQuery.toLowerCase());
                const isVisible = (searchQuery ? matchesSearch : skill.year <= currentYear);
                if (!isVisible) return null;
                
                return (
                  <span
                    key={skill.id}
                    className={`cloud-word ${searchQuery && matchesSearch ? 'highlight-match' : ''}`}
                    style={{
                      color: COLORS[skill.group],
                      fontSize: `${skill.size}rem`,
                      borderColor: `${COLORS[skill.group]}35`,
                      boxShadow: `0 0 12px ${COLORS[skill.group]}15`
                    }}
                  >
                    {skill.id}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
