import React, { useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import GlowCard from '../ui/GlowCard';
import SvgCircuitFrame from '../ui/SvgCircuitFrame';
import './ResearchSection.css';

const researchData = [
  {
    institution: "BITS Pilani",
    monogram: "BITS",
    degree: "Master of Technology (M.Tech)",
    field: "Software Systems (Data Analytics & Machine Learning)",
    period: "2023 - 2025",
    grade: "7.77 CGPA",
    focus: "Advanced distributed systems, deep learning architectures, time-series forecasting, and causal inference foundations."
  },
  {
    institution: "MAKAUT",
    monogram: "MAK",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Electronics & Communication Engineering",
    period: "2014 - 2018",
    grade: "7.84 DGPA",
    focus: "Signal processing, stochastic processes, mathematical computing, algorithmic logic, and hardware-software architectures."
  }
];

const ResearchSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.academics-card');
    
    // Anime.js Staggered Entrance
    const anim = anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(180),
      duration: 800,
      easing: 'easeOutQuad',
    });

    return () => {
      anim.pause();
    };
  }, []);

  return (
    <section id="research" className="research-section" ref={sectionRef}>
      <div className="research-container">
        <div className="section-header-center">
          <span className="section-tag-badge">ACADEMIC EXCELLENCE</span>
          <h2 className="section-title">Foundational Research</h2>
          <p className="section-subtitle">Rigorous postgraduate and undergraduate training underpinning production Machine Learning and Agentic AI architectures.</p>
        </div>

        <div className="research-grid">
          {researchData.map((item, index) => (
            <SvgCircuitFrame key={index} color="rgba(0, 240, 255, 0.4)">
              <GlowCard 
                glowColor="rgba(0, 240, 255, 0.25)"
                className="academics-card"
              >
                <div className="academics-card-inner">
                  <div className="academics-top">
                    <div className="institution-brand">
                      <span className="institution-monogram">{item.monogram}</span>
                      <div>
                        <h3 className="institution-name">{item.institution}</h3>
                        <span className="period-badge">{item.period}</span>
                      </div>
                    </div>
                    <span className="grade-pill">{item.grade}</span>
                  </div>

                  <div className="academics-body">
                    <h4 className="degree-title">{item.degree}</h4>
                    <span className="field-subtitle">{item.field}</span>
                    <p className="focus-description">{item.focus}</p>
                  </div>

                  <div className="academics-footer">
                    <span className="curriculum-tag">Advanced Analytics</span>
                    <span className="curriculum-tag">Neural Systems</span>
                    <span className="curriculum-tag">Signal Modeling</span>
                  </div>
                </div>
              </GlowCard>
            </SvgCircuitFrame>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
