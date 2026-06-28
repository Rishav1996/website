import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './StatsSection.css';

const StatsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simple GSAP animation for numbers
    const stats = sectionRef.current.querySelectorAll('.stat-number');
    gsap.fromTo(stats, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    );
  }, []);

  return (
    <section id="stats" className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        <div className="stat-card">
          <h2 className="stat-number">8+</h2>
          <p className="stat-label">Years Enterprise Exp.</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">9</h2>
          <p className="stat-label">Publications & Frameworks</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">15+</h2>
          <p className="stat-label">AI Models Deployed</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">4</h2>
          <p className="stat-label">Cloud Certifications</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
