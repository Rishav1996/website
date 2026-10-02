import React, { useState, useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import GlowCard from '../ui/GlowCard';
import './CertificationsSection.css';

const CREDLY_PROFILE_URL = "https://www.credly.com/users/rishav-saigal.ae0679ae";

// All 14 verified industry credentials ordered chronologically by procurement (most recent to oldest)
const certifications = [
  // 1. Google Cloud - Sep 2026 (Sep 28, 2026)
  {
    id: "credly-adk-deploy",
    title: "Deploy an Agent with Agent Development Kit (ADK)",
    issuer: "Google Cloud",
    date: "Sep 2026",
    link: "https://www.credly.com/badges/bdc35b6d-823e-443f-8f93-47d57fbecf60/public_url",
    badgeImage: "https://images.credly.com/images/e9c45e2a-a48e-4686-99df-7de0ccd6dae7/blob",
    platform: "Credly",
    category: "credly",
    icon: "ADK",
    skills: ["AI Agents", "Agent Development Kit", "Agent Engine"]
  },
  // 2. Google Cloud - Sep 2026 (Sep 28, 2026)
  {
    id: "credly-adk-eval",
    title: "Evaluate and Improve Agent Development Kit Agents",
    issuer: "Google Cloud",
    date: "Sep 2026",
    link: "https://www.credly.com/badges/a04fd2d7-e28d-4dd6-adda-6e6670fec84b/public_url",
    badgeImage: "https://images.credly.com/images/b1800059-b7de-4065-851d-678287ea0720/blob",
    platform: "Credly",
    category: "credly",
    icon: "EVAL",
    skills: ["Agent Evaluation", "Evaluation Strategy"]
  },
  // 3. Google Cloud - Sep 2026 (Sep 27, 2026)
  {
    id: "credly-antigravity",
    title: "Accelerate Development with Antigravity",
    issuer: "Google Cloud",
    date: "Sep 2026",
    link: "https://www.credly.com/badges/32d2eeeb-5a49-458b-8860-a644ac8d71c9/public_url",
    badgeImage: "https://images.credly.com/images/9a9bd5ca-b41b-41ed-82ad-43968d960f62/blob",
    platform: "Credly",
    category: "credly",
    icon: "AGY",
    skills: ["Agent Development", "Application Development"]
  },
  // 4. Google Cloud - Sep 2026 (Sep 27, 2026)
  {
    id: "credly-gemini",
    title: "Build with Gemini",
    issuer: "Google Cloud",
    date: "Sep 2026",
    link: "https://www.credly.com/badges/795dbf1e-32ea-4e16-bcc6-c028495fb9cc/public_url",
    badgeImage: "https://images.credly.com/images/384e1386-110e-439d-8014-18fe42bb5f18/blob",
    platform: "Credly",
    category: "credly",
    icon: "GEM",
    skills: ["Gemini Enterprise", "Prompt Engineering"]
  },
  // 5. Dataiku Academy - Jun 2026
  {
    id: "cert-genai-dataiku",
    title: "Generative AI Practitioner Certificate",
    issuer: "Dataiku Academy",
    date: "Jun 2026",
    link: "https://verify.skilljar.com/c/hg2aiksrvrt2",
    platform: "Skilljar",
    category: "academy",
    icon: "AI"
  },
  // 6. Cognizant - Nov 2025 (Nov 12, 2025)
  {
    id: "credly-vibe",
    title: "Vibe Code Hackathon - Vibe Coded using Windsurf",
    issuer: "Cognizant",
    date: "Nov 2025",
    link: "https://www.credly.com/badges/7fa3859e-a282-495a-97bf-9305ac3a8a3f/public_url",
    badgeImage: "https://images.credly.com/images/d7f11737-5f2d-4603-88af-47c8a304aa29/blob",
    platform: "Credly",
    category: "credly",
    icon: "VIBE",
    skills: ["Windsurf", "Vibe Coding", "Agentic Workflows"]
  },
  // 7. AWS Training & Certification - Aug 2025 (Aug 29, 2025)
  {
    id: "credly-braket",
    title: "AWS Knowledge: Amazon Braket",
    issuer: "Amazon Web Services Training & Certification",
    date: "Aug 2025",
    link: "https://www.credly.com/badges/556aff6b-069a-4e2f-a5b3-739337b0b18d/public_url",
    badgeImage: "https://images.credly.com/images/811c6414-b84e-4879-bc5c-863fa62be6aa/blob",
    platform: "Credly",
    category: "credly",
    icon: "BRK",
    skills: ["Amazon Braket", "Quantum Computing", "AWS Cloud"]
  },
  // 8. Microsoft - Jun 2025
  {
    id: "cert-azure-ai",
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "Jun 2025",
    link: "https://learn.microsoft.com/en-us/users/rishavsaigal-8851/credentials/3d9e3e8e7a0cb39d",
    platform: "Microsoft",
    category: "academy",
    icon: "AZ"
  },
  // 9. Dataiku Academy - Aug 2023
  {
    id: "cert-mlops-dataiku",
    title: "MLOps Practitioner Certificate",
    issuer: "Dataiku Academy",
    date: "Aug 2023",
    link: "https://verify.skilljar.com/c/7djsjp74vdvj",
    platform: "Skilljar",
    category: "academy",
    icon: "OPS"
  },
  // 10. Dataiku Academy - Jul 2023
  {
    id: "cert-adv-dataiku",
    title: "Advanced Designer Certificate",
    issuer: "Dataiku Academy",
    date: "Jul 2023",
    link: "https://verify.skilljar.com/c/weie95jezjyz",
    platform: "Skilljar",
    category: "academy",
    icon: "ADV"
  },
  // 11. Dataiku Academy - Jul 2023
  {
    id: "cert-ml-dataiku",
    title: "ML Practitioner Certificate",
    issuer: "Dataiku Academy",
    date: "Jul 2023",
    link: "https://verify.skilljar.com/c/2hph8ogspvy5",
    platform: "Skilljar",
    category: "academy",
    icon: "MLP"
  },
  // 12. Dataiku Academy - Jul 2023
  {
    id: "cert-core-dataiku",
    title: "Core Designer Certificate",
    issuer: "Dataiku Academy",
    date: "Jul 2023",
    link: "https://verify.skilljar.com/c/4ucupx9wj33r",
    platform: "Skilljar",
    category: "academy",
    icon: "CORE"
  },
  // 13. IBM / Coursera - Jun 2021 (Jun 27, 2021)
  {
    id: "credly-ibm-ml",
    title: "Machine Learning with Python",
    issuer: "Coursera & authorized by IBM",
    date: "Jun 2021",
    link: "https://www.credly.com/badges/c3161482-efe8-4fb3-a3a4-9ac5d7682d24/public_url",
    badgeImage: "https://images.credly.com/images/f283df3d-1780-4c2d-947d-fc80eae0953b/image.png",
    platform: "Credly",
    category: "credly",
    icon: "ML",
    skills: ["Scikit-Learn", "Machine Learning", "Classification"]
  },
  // 14. IBM - May 2019 (May 21, 2019)
  {
    id: "credly-ibm-py",
    title: "Python for Data Science",
    issuer: "IBM",
    date: "May 2019",
    link: "https://www.credly.com/badges/a0e4eeca-bc00-4811-bc7b-5aa8e6535178/public_url",
    badgeImage: "https://images.credly.com/images/b40db465-587f-45eb-a854-af8630a630e7/blob",
    platform: "Credly",
    category: "credly",
    icon: "PY",
    skills: ["Python", "Pandas", "Data Science"]
  }
];

const CertificationsSection = () => {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  const filteredCerts = filter === 'all' 
    ? certifications 
    : certifications.filter(c => c.category === filter);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.cert-card-container');
    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(60),
      duration: 600,
      easing: 'easeOutQuad',
    });
  }, [filter]);

  return (
    <section id="certifications" className="certifications-section" ref={sectionRef}>
      <div className="certifications-container">
        <div className="section-header-center">
          <span className="section-tag-badge">VERIFIED INDUSTRY CREDENTIALS</span>
          <h2 className="section-title">Certifications &amp; Badges Vault</h2>
          <p className="section-subtitle">
            14 verified professional credentials and digital badges spanning Agentic AI, Google Cloud ADK, Cloud Infrastructure, and Production MLOps.
          </p>

          <div className="cert-header-actions">
            <a
              href={CREDLY_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="credly-profile-btn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Explore Official Credly Profile (8 Badges)</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17l9.2-9.2M17 17V8H8"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="cert-filter-bar">
          <button
            className={`cert-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Credentials ({certifications.length})
          </button>
          <button
            className={`cert-filter-btn ${filter === 'credly' ? 'active' : ''}`}
            onClick={() => setFilter('credly')}
          >
            Credly Digital Badges (8)
          </button>
          <button
            className={`cert-filter-btn ${filter === 'academy' ? 'active' : ''}`}
            onClick={() => setFilter('academy')}
          >
            Specialized Certifications (6)
          </button>
        </div>
        
        <div className="certifications-grid">
          {filteredCerts.map((cert) => (
            <GlowCard
              key={cert.id}
              glowColor={cert.platform === "Credly" ? "rgba(224, 109, 83, 0.18)" : "rgba(88, 166, 255, 0.18)"}
              className="cert-card-container"
            >
              <a
                className="cert-card-inner"
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="cert-top-row">
                  {cert.badgeImage ? (
                    <div className="cert-badge-img-wrapper">
                      <img
                        src={cert.badgeImage}
                        alt={cert.title}
                        className="cert-badge-img"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <span className="cert-monogram">{cert.icon}</span>
                  )}

                  <span className={`cert-verify-status ${cert.category}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{cert.platform === "Credly" ? "CREDLY VERIFIED" : "VERIFIED"}</span>
                  </span>
                </div>
                
                <div className="cert-info">
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-issuer-date">{cert.issuer} &bull; {cert.date}</span>
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="cert-skills-pills">
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="cert-skill-pill">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="cert-arrow-link">
                  <span>{cert.platform === "Credly" ? "Verify on Credly" : "View Credential"}</span>
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
