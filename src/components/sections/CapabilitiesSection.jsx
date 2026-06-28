import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const LINKS = [
  { source: 'Python', target: 'Scikit-Learn' },
  { source: 'Python', target: 'TensorFlow' },
  { source: 'Python', target: 'Pandas' },
  { source: 'TensorFlow', target: 'Keras' },
  { source: 'Scikit-Learn', target: 'Time Series' },
  { source: 'Time Series', target: 'Survival Analysis' },
  { source: 'TensorFlow', target: 'OpenCV' },
  { source: 'Python', target: 'PySpark' },
  { source: 'AWS', target: 'MLflow' },
  { source: 'MLflow', target: 'Azure ML' },
  { source: 'Azure ML', target: 'DataRobot' },
  { source: 'Scikit-Learn', target: 'SHAP/XAI' },
  { source: 'Python', target: 'FastAPI' },
  { source: 'Python', target: 'GenAI/LLMs' },
  { source: 'GenAI/LLMs', target: 'Prompt Engineering' },
  { source: 'GenAI/LLMs', target: 'LangChain' },
  { source: 'GenAI/LLMs', target: 'LLM Fine-Tuning' },
  { source: 'LangChain', target: 'RAG' },
  { source: 'LangChain', target: 'LangGraph' },
  { source: 'LangGraph', target: 'Agentic AI' },
  { source: 'Agentic AI', target: 'CrewAI' },
  { source: 'Agentic AI', target: 'Google ADK' },
  { source: 'Azure ML', target: 'GCP Vertex' },
  { source: 'FastAPI', target: 'Streamlit' }
];

// Colors map directly to skill categories
const COLORS = {
  1: '#9F7AEA', // Purple (Leadership)
  2: '#63B3ED', // Blue (AI/ML)
  3: '#68D391', // Green (MLOps)
  4: '#F6AD55', // Orange (Prog/Viz)
};

const CapabilitiesSection = () => {
  const [currentYear, setCurrentYear] = useState(2018);
  const yearRefs = useRef([]);

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

  // Pre-calculate random styling for word cloud so it stays stable
  const wordCloudItems = useMemo(() => {
    // Sort randomly so categories are mixed
    const shuffled = [...SKILLS].sort(() => 0.5 - Math.random());
    return shuffled.map(skill => ({
      ...skill,
      size: Math.random() * 0.9 + 0.85, // Random size between 0.85rem and 1.75rem
      margin: Math.random() * 0.3 + 0.1 // Random margin between 0.1rem and 0.4rem
    }));
  }, []);

  return (
    <section id="capabilities" className="capabilities-section">
      <div className="capabilities-header">
        <h2 className="section-title">Evolution of Capabilities</h2>
        <p className="section-subtitle">Scroll down to explore skill acquisition across domains.</p>
      </div>
      
      <div className="capabilities-layout">
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
                <h3>{year}</h3>
                <div className="year-skills">
                  {yearSkills.map(skill => (
                    <span key={skill.id} className="skill-tag" style={{ color: COLORS[skill.group], border: `1px solid ${COLORS[skill.group]}50` }}>
                      {skill.id}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="word-cloud-container">
          <AnimatePresence>
            {wordCloudItems.map(skill => {
              const isVisible = skill.year <= currentYear;
              if (!isVisible) return null;
              
              return (
                <motion.span
                  layout
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  key={skill.id}
                  className="cloud-word"
                  style={{
                    color: COLORS[skill.group],
                    fontSize: `${skill.size}rem`,
                    margin: `${skill.margin}rem`,
                  }}
                >
                  {skill.id}
                </motion.span>
              );
            })}
          </AnimatePresence>
          
          <div className="legend">
            <span style={{color: COLORS[1]}}>● Leadership</span>
            <span style={{color: COLORS[2]}}>● AI/ML</span>
            <span style={{color: COLORS[3]}}>● MLOps</span>
            <span style={{color: COLORS[4]}}>● Prog/Viz</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
