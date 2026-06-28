import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CertificationsSection.css';

const CertificationsSection = () => {
  const handleMouseEnter = (e) => {
    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, { 
      scale: 1.08, 
      y: -10, 
      duration: 0.8, 
      ease: 'elastic.out(1, 0.4)', 
      borderColor: 'var(--color-accent-primary)',
      boxShadow: '0 25px 45px rgba(168, 199, 250, 0.15)',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = (e) => {
    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, { 
      scale: 1, 
      y: 0, 
      duration: 0.6, 
      ease: 'elastic.out(1, 0.6)', 
      borderColor: 'rgba(255, 255, 255, 0.05)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      overwrite: 'auto'
    });
  };

  const certifications = [
    {
      title: "Generative AI Practitioner Certificate",
      issuer: "Dataiku Academy",
      date: "Jun 2026",
      link: "https://verify.skilljar.com/c/hg2aiksrvrt2",
      icon: "D"
    },
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "Jun 2025",
      link: "https://learn.microsoft.com/en-us/users/rishavsaigal-8851/credentials/3d9e3e8e7a0cb39d",
      icon: "M"
    },
    {
      title: "MLOps Practitioner Certificate",
      issuer: "Dataiku Academy",
      date: "Aug 2023",
      link: "https://verify.skilljar.com/c/7djsjp74vdvj",
      icon: "D"
    },
    {
      title: "Advanced Designer Certificate",
      issuer: "Dataiku Academy",
      date: "Jul 2023",
      link: "https://verify.skilljar.com/c/weie95jezjyz",
      icon: "D"
    },
    {
      title: "ML Practitioner Certificate",
      issuer: "Dataiku Academy",
      date: "Jul 2023",
      link: "https://verify.skilljar.com/c/2hph8ogspvy5",
      icon: "D"
    },
    {
      title: "Core Designer Certificate",
      issuer: "Dataiku Academy",
      date: "Jul 2023",
      link: "https://verify.skilljar.com/c/4ucupx9wj33r",
      icon: "D"
    }
  ];

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <h2 className="section-title">Certifications Vault</h2>
        <p className="section-subtitle">Industry-recognized credentials verifying expertise.</p>
        
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div 
              className="cert-card" 
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => window.open(cert.link, '_blank', 'noopener,noreferrer')}
              role="button"
              tabIndex={0}
            >
              <div className={`cert-icon ${cert.issuer.toLowerCase().split(' ')[0]}`}>{cert.icon}</div>
              <div className="cert-info">
                <h3>{cert.title}</h3>
                <span>{cert.issuer} &bull; {cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
