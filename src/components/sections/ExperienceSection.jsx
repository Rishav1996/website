import React, { useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import { useAudio } from '../../context/AudioContext';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';
import GlowCard from '../ui/GlowCard';
import './ExperienceSection.css';

const experiences = [
  {
    company: "Cognizant",
    role: "Manager (Senior Data Scientist / AI Architect)",
    period: "Nov 2023 – Present",
    active: true,
    responsibilities: [
      {
        title: "Solution Architect & Agentic AI Lead",
        desc: "Spearheaded end-to-end architectural design of enterprise-grade Generative AI and Agentic AI systems on complex GCP infrastructure."
      },
      {
        title: "Team Leadership & Architectural Direction",
        desc: "Led and mentored a cross-functional team of ML/GenAI engineers; defined architectural standards and drove Agile sprint planning."
      },
      {
        title: "Client Deliverable Management",
        desc: "Owned end-to-end delivery from requirement workshops through production handoff and stakeholder-facing POC demonstrations."
      }
    ],
    skills: [
      "GCP Vertex AI", "Gemini Enterprise", "Google ADK",
      "LangGraph", "CrewAI", "LangChain",
      "FastAPI", "Streamlit", "Azure ML", "MLflow"
    ]
  },
  {
    company: "Genpact",
    role: "Assistant Manager",
    period: "Jun 2022 – Nov 2023",
    active: false,
    responsibilities: [
      {
        title: "Team Leadership & ML Architecture",
        desc: "Managed a cross-functional team of 6 ML engineers; led Agile architecture reviews and end-to-end MLOps solution deployment."
      },
      {
        title: "Stakeholder Delivery",
        desc: "Served as primary technical point-of-contact for executive stakeholder demos and quarterly business reviews."
      },
      {
        title: "Responsible AI Governance",
        desc: "Translated complex business requirements into scalable ML specifications; upskilled client teams on model interpretability and proactive model monitoring."
      }
    ],
    skills: [
      "Scikit-Learn", "DataRobot", "Azure ML",
      "Causal Inference", "Customer Segmentation", "SHAP (XAI)"
    ]
  },
  {
    company: "Capgemini",
    role: "Consultant",
    period: "Apr 2018 – Jun 2022",
    active: false,
    responsibilities: [
      {
        title: "Technical Lead & Full-Lifecycle Delivery",
        desc: "Led cross-functional teams of up to 15 members across supply chain, manufacturing, and service analytics."
      },
      {
        title: "End-to-End ML Delivery",
        desc: "Owned the complete ML lifecycle—from Agile requirement gathering through CI/CD-driven production deployment on cloud infrastructure."
      }
    ],
    skills: [
      "PySpark", "TensorFlow", "Keras",
      "AWS SageMaker", "XGBoost", "Cox Proportional Hazard",
      "OpenCV", "LSTM", "MLP"
    ]
  }
];

const ExperienceSection = () => {
  const videoRef = useVideoAutoplay({ threshold: 0.5 });
  const { isMuted } = useAudio();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.experience-card-wrapper');
    anime({
      targets: cards,
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: anime.stagger(180),
      duration: 800,
      easing: 'easeOutQuad',
    });
  }, []);

  const seekVideo = (timeSec) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeSec;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        <div className="section-header-center">
          <span className="section-tag-badge">CAREER ARCHITECTURE</span>
          <h2 className="section-title">Enterprise Experience</h2>
          <p className="section-subtitle">Track record of leading ML engineering teams and architecting production AI systems.</p>
        </div>
        
        <div className="experience-layout">
          {/* Left Column: Talking Video Player */}
          <div className="experience-video-col">
            <div className="experience-video-wrapper">
              <video 
                ref={videoRef}
                playsInline
                muted={isMuted}
                className="experience-video"
                poster={`${import.meta.env.BASE_URL}assets/experience-poster.webp`}
              >
                {/* Serve 1080p for screens >= 768px */}
                <source src={`${import.meta.env.BASE_URL}assets/videos/Section 6 - Experience Timeline 1080p.mp4`} media="(min-width: 768px)" type="video/mp4" />
                {/* Serve standard 720p for smaller screens */}
                <source src={`${import.meta.env.BASE_URL}assets/videos/Section 6 - Experience Timeline.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-live-overlay">
                <span className="video-live-dot"></span>
                <span className="video-live-text">CAREER RETROSPECTIVE</span>
              </div>
            </div>

            <div className="exp-video-chapters">
              <span className="chapter-label">VIDEO CHAPTERS:</span>
              <button className="chapter-pill" onClick={() => seekVideo(0)}>0:00 Overview</button>
              <button className="chapter-pill" onClick={() => seekVideo(25)}>0:25 Cognizant Scale</button>
              <button className="chapter-pill" onClick={() => seekVideo(55)}>0:55 Leadership</button>
            </div>
          </div>

          {/* Right Column: Timeline Cards */}
          <div className="timeline-col">
            <div className="experiences-list">
              {experiences.map((exp, index) => (
                <div key={index} className="experience-card-wrapper">
                  <div className={`timeline-node ${exp.active ? 'active-node' : ''}`}>
                    <span className="node-core"></span>
                    {exp.active && <span className="node-pulse-ring"></span>}
                  </div>

                  <GlowCard
                    glowColor={exp.active ? "rgba(88, 166, 255, 0.25)" : "rgba(168, 85, 247, 0.15)"}
                    className={`exp-glow-card ${exp.active ? 'exp-active-border' : ''}`}
                  >
                    <div className="experience-inner">
                      <div className="exp-header">
                        <div>
                          <div className="exp-company-title-row">
                            <h3 className="exp-company">{exp.company}</h3>
                            {exp.active && <span className="live-role-badge">PRESENT</span>}
                          </div>
                          <h4 className="exp-role">{exp.role}</h4>
                        </div>
                        <span className="exp-period-pill">{exp.period}</span>
                      </div>

                      <div className="exp-responsibilities-box">
                        <span className="highlights-label">ROLES & RESPONSIBILITIES</span>
                        <ul className="highlights-list">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx}>
                              <span className="bullet-chevron">&gt;</span>
                              <span><strong>{resp.title}:</strong> {resp.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="exp-skills-box">
                        <span className="highlights-label">SKILLS & TECHNOLOGIES ACQUIRED</span>
                        <div className="skill-pill-wrap">
                          {exp.skills.map((s, sIdx) => (
                            <span key={sIdx} className="skill-pill">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
