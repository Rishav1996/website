import React, { useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import GlowCard from '../ui/GlowCard';
import SvgCircuitFrame from '../ui/SvgCircuitFrame';
import './ResearchSection.css';

const researchData = [
  {
    institution: "Indian Institute of Technology Patna",
    monogram: "IITP",
    degree: "Ph.D. in Computer Science & Engineering",
    details: "Indian Institute of Technology Patna (Pursuing).",
    period: "Jul 2026 – Jun 2029"
  },
  {
    institution: "BITS Pilani",
    monogram: "BITS",
    degree: "M.Tech in Data Science & Engineering",
    details: "Birla Institute of Technology and Science, Pilani.",
    period: "Sep 2019 – Aug 2021"
  },
  {
    institution: "RCC Institute of Information Technology (MAKAUT)",
    monogram: "MAK",
    degree: "B.Tech in Computer Science & Engineering",
    details: "Maulana Abul Kalam Azad University of Technology.",
    period: "Aug 2013 – Jul 2017"
  }
];

const ResearchSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.academics-card');
    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(180),
      duration: 800,
      easing: 'easeOutQuad',
    });
  }, []);

  return (
    <section id="research" className="research-section" ref={sectionRef}>
      <div className="research-container">
        <div className="section-header-center">
          <span className="section-tag-badge">FORMAL EDUCATION</span>
          <h2 className="section-title">Academics</h2>
          <p className="section-subtitle">Formal education and foundational degrees.</p>
        </div>

        <div className="research-grid">
          {researchData.map((item, index) => (
            <SvgCircuitFrame key={index} color="rgba(88, 166, 255, 0.35)">
              <GlowCard 
                glowColor="rgba(88, 166, 255, 0.2)"
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
                  </div>

                  <div className="academics-body">
                    <h4 className="degree-title">{item.degree}</h4>
                    <p className="focus-description">{item.details}</p>
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
