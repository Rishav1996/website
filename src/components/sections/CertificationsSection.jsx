import React, { useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import GlowCard from '../ui/GlowCard';
import './CertificationsSection.css';

const certifications = [
  {
    title: "Generative AI Practitioner Certificate",
    issuer: "Dataiku Academy",
    date: "Jun 2026",
    link: "https://verify.skilljar.com/c/hg2aiksrvrt2",
    icon: "AI"
  },
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "Jun 2025",
    link: "https://learn.microsoft.com/en-us/users/rishavsaigal-8851/credentials/3d9e3e8e7a0cb39d",
    icon: "AZ"
  },
  {
    title: "MLOps Practitioner Certificate",
    issuer: "Dataiku Academy",
    date: "Aug 2023",
    link: "https://verify.skilljar.com/c/7djsjp74vdvj",
    icon: "OPS"
  },
  {
    title: "Advanced Designer Certificate",
    issuer: "Dataiku Academy",
    date: "Jul 2023",
    link: "https://verify.skilljar.com/c/weie95jezjyz",
    icon: "ADV"
  },
  {
    title: "ML Practitioner Certificate",
    issuer: "Dataiku Academy",
    date: "Jul 2023",
    link: "https://verify.skilljar.com/c/2hph8ogspvy5",
    icon: "ML"
  },
  {
    title: "Core Designer Certificate",
    issuer: "Dataiku Academy",
    date: "Jul 2023",
    link: "https://verify.skilljar.com/c/4ucupx9wj33r",
    icon: "CORE"
  }
];

const CertificationsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.cert-card-container');
    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [25, 0],
      delay: anime.stagger(80),
      duration: 700,
      easing: 'easeOutQuad',
    });
  }, []);

  return (
    <section id="certifications" className="certifications-section" ref={sectionRef}>
      <div className="certifications-container">
        <div className="section-header-center">
          <span className="section-tag-badge">VERIFIED INDUSTRY CREDENTIALS</span>
          <h2 className="section-title">Certifications Vault</h2>
          <p className="section-subtitle">Verified professional credentials in Generative AI, Cloud Infrastructure, and Production MLOps.</p>
        </div>
        
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <GlowCard
              key={index}
              glowColor="rgba(88, 166, 255, 0.2)"
              className="cert-card-container"
            >
              <a
                className="cert-card-inner"
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="cert-top-row">
                  <span className="cert-monogram">{cert.icon}</span>
                  <span className="cert-verify-status">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>VERIFIED</span>
                  </span>
                </div>
                
                <div className="cert-info">
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-issuer-date">{cert.issuer} &bull; {cert.date}</span>
                </div>

                <div className="cert-arrow-link">
                  <span>View Credential</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17l9.2-9.2M17 17V8H8"/>
                  </svg>
                </div>
              </a>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
