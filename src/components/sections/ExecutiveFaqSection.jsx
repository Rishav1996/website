import React from 'react';
import './ExecutiveFaqSection.css';

const FAQ_ITEMS = [
  {
    question: "What are Rishav Saigal's primary engineering and research specializations?",
    answer: "Rishav Saigal specializes in autonomous Multi-Agent Systems, Time Series Forecasting, Causal Inference, and production MLOps. His engineering focuses on architecting production-grade enterprise Agentic AI systems on Google Cloud (Vertex AI, Cloud Run, Gemini Enterprise, Agent Engine Platform, FastMCP) with autonomous self-correction validation loops, context-window summarization, and token-cost observability."
  },
  {
    question: "What is Rishav's current enterprise leadership role and organizational scope?",
    answer: "Rishav serves as Manager (Senior Data Scientist / AI Architect) at Cognizant (promoted November 2023). In this capacity, he is a designated Subject Matter Expert (SME) in AI Architecture Design and GenAI, spearheading architectural solution design and response strategy for multiple high-value client RFPs, managing cross-functional teams of ML/GenAI engineers, directing campus-to-corporate fresher mentorship programs, and serving as a primary hiring panellist for external lateral recruitment."
  },
  {
    question: "What is Rishav's formal academic background and doctoral research focus?",
    answer: "Rishav is a Ph.D. Candidate in Computer Science & Engineering at the Indian Institute of Technology Patna (IIT Patna, Jul 2026 – Jun 2029 Expected). He holds a Master of Technology (M.Tech) in Data Science & Engineering from BITS Pilani (Sep 2019 – Aug 2021) and a Bachelor of Technology (B.Tech) in Computer Science & Engineering from RCC Institute of Information Technology / MAKAUT (Aug 2013 – Jul 2017). His doctoral research investigates LLM behavioral drift, adversarial robustness, and a self-coined calcification effect in multi-agent debate systems."
  },
  {
    question: "What open research frameworks, datasets, and DOI releases has Rishav published?",
    answer: "Rishav has published 11 technical publications and open research releases, including two Zenodo DOI-indexed releases: the LLM Behavioral Drift Experiment framework and dataset (DOI: 10.5281/zenodo.20032071) measuring persona shift across 22 behavioral signals, and model-router (DOI: 10.5281/zenodo.21520843), an open-source capability floor vs. cost exposure routing skill for Claude Code. His independent research articles appear in Towards AI, Towards Deep Learning, and Medium."
  },
  {
    question: "What verified credentials and professional certifications does Rishav hold?",
    answer: "Rishav holds 14 verified industry credentials, including 8 official Credly digital badges (Google Cloud Agent Development Kit [ADK] Deployment, ADK Agent Evaluation, Antigravity Accelerated Development, Build with Gemini, Cognizant Vibe Code Hackathon, AWS Knowledge: Amazon Braket, IBM Machine Learning with Python, IBM Python for Data Science) and 6 specialized academy certificates (Microsoft Certified: Azure AI Fundamentals, Dataiku Generative AI Practitioner, Dataiku MLOps Practitioner, and Dataiku Core/Advanced/ML Designer)."
  }
];

const ExecutiveFaqSection = () => {
  return (
    <section id="faq" className="executive-faq-section" aria-labelledby="faq-section-heading">
      <div className="executive-faq-container">
        <div className="section-header-center">
          <span className="section-tag-badge">EXECUTIVE INTELLIGENCE BRIEFING</span>
          <h2 id="faq-section-heading" className="section-title">Frequently Answered Inquiries</h2>
          <p className="section-subtitle">
            Direct architectural answers, credential verification, and doctoral research telemetry for executive talent teams and autonomous answer engines.
          </p>
        </div>

        <div className="faq-accordions-wrapper">
          {FAQ_ITEMS.map((item, idx) => (
            <details key={idx} className="faq-detail-card" open={idx === 0}>
              <summary className="faq-summary-row">
                <span className="faq-question-num">0{idx + 1}</span>
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-toggle-chevron" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="faq-answer-body">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveFaqSection;
