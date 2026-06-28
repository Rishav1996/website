import React from 'react';
import './ResearchSection.css';

const ResearchSection = () => {
  return (
    <section id="research" className="research-section">
      <div className="research-container">
        <h2 className="section-title">Academics</h2>
        <p className="section-subtitle">Formal education and foundational degrees.</p>
        
        <div className="research-grid">
          <div className="academic-card">
            <div className="card-header">
              <h3>M.Tech in Data Science & Engineering</h3>
              <span className="institution">BITS Pilani</span>
            </div>
            <p className="academic-details">
              Birla Institute of Technology and Science, Pilani. <br/> Sep 2019 – Aug 2021
            </p>
          </div>

          <div className="academic-card">
            <div className="card-header">
              <h3>B.Tech in Computer Science & Engineering</h3>
              <span className="institution">RCC Institute of Information Technology (MAKAUT)</span>
            </div>
            <p className="academic-details">
              Aug 2013 – Jul 2017
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
