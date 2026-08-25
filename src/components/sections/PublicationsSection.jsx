import React, { useState, useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './PublicationsSection.css';

const TiltCard = ({ pub, onOpen }) => {
  const { title, date, description } = pub;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getPublisherBadge = (publisher) => {
    if (publisher.includes("Towards AI")) return { label: "TOWARDS AI", color: "cyan" };
    if (publisher.includes("Zenodo") || publisher.includes("DOI")) return { label: "ZENODO DOI", color: "purple" };
    if (publisher.includes("Towards Deep Learning")) return { label: "TOWARDS DEEP LEARNING", color: "green" };
    if (publisher.includes("Medium")) return { label: "MEDIUM", color: "amber" };
    return { label: "PEER REVIEWED", color: "blue" };
  };

  const badge = getPublisherBadge(pub.publisher);

  return (
    <motion.div
      className="tilt-card-wrapper pub-card-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onClick={() => onOpen(pub)}
    >
      <div className="tilt-card-inner">
        <div className="pub-card-top">
          <span className={`pub-publisher-badge ${badge.color}`}>{badge.label}</span>
          <span className="pub-date-badge">{date}</span>
        </div>

        <h3 className="pub-title">{title}</h3>
        <p className="pub-desc">{description}</p>

        <div className="pub-card-action">
          <span>Read Research Brief & Citation</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const publications = [
  {
    title: "A Dual-Pillar Evaluation of Calcification and Prompt Drift in Large Language Models",
    publisher: "Zenodo / Research DOI",
    date: "Feb 2026",
    link: "https://doi.org/10.5281/zenodo.18820464",
    description: "Empirical benchmarking framework tracking behavioral drift, calcification, and prompt degradation in frontier LLMs over time."
  },
  {
    title: "The Specialized Frontier: How Agent Workflows Beat Bigger Models",
    publisher: "Towards AI",
    date: "Jan 2026",
    link: "https://towardsai.net/p/machine-learning/the-specialized-frontier-how-agent-workflows-beat-bigger-models",
    description: "Architecture blueprint for multi-agent workflows outperforming monolithic models through task decomposition and verification loops."
  },
  {
    title: "Claude Model Routing: Precision Architecture For Complex Reasoning",
    publisher: "Towards Deep Learning",
    date: "Jan 2026",
    link: "https://towardsdeeplearning.com/claude-model-routing-precision-architecture-for-complex-reasoning-1721532ffad8",
    description: "Design patterns for dynamic model routing among Claude 3.5 Sonnet, Haiku, and Opus to optimize accuracy and inference latency."
  },
  {
    title: "Architecting Context-Aware Agentic Workflows with Google Gemini",
    publisher: "Towards AI",
    date: "Dec 2025",
    link: "https://towardsai.net/p/machine-learning/architecting-context-aware-agentic-workflows-with-google-gemini-and-google-agent-development-kit-adk",
    description: "Enterprise implementation guide for multimodal long-context agent orchestration using Gemini 1.5 and Google ADK."
  },
  {
    title: "Autonomous Code Optimization with Multi-Agent Systems",
    publisher: "Towards AI",
    date: "Nov 2025",
    link: "https://towardsai.net/p/software-engineering/autonomous-code-optimization-with-multi-agent-systems",
    description: "Iterative multi-agent debate and refinement framework for automated AST transformation and code performance tuning."
  },
  {
    title: "Building Production-Grade RAG Systems with Hybrid Search",
    publisher: "Medium / Towards AI",
    date: "Oct 2025",
    link: "https://medium.com/@rishavsaigal",
    description: "Architectural blueprint combining dense vector search with sparse BM25 reranking for zero-hallucination enterprise retrieval."
  },
  {
    title: "Causal Inference in Dynamic Pricing Engines",
    publisher: "Medium",
    date: "Aug 2025",
    link: "https://medium.com/@rishavsaigal",
    description: "Double machine learning methodologies for isolating true price elasticity and mitigating confounding variables in retail data."
  },
  {
    title: "Time-Series Survival Modeling in Enterprise Churn Forecasting",
    publisher: "Medium",
    date: "Jun 2025",
    link: "https://medium.com/@rishavsaigal",
    description: "Application of Cox Proportional Hazards and neural survival analysis to model customer lifetime probability curves."
  },
  {
    title: "Explainable AI (XAI) with SHAP and LIME in High-Stakes Finance",
    publisher: "Medium",
    date: "Mar 2025",
    link: "https://medium.com/@rishavsaigal",
    description: "Interpretable machine learning pipelines providing audit-compliant explanations for black-box credit risk models."
  }
];

const PublicationsSection = () => {
  const [activeModal, setActiveModal] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.pub-card-item');
    anime({
      targets: cards,
      opacity: [0, 1],
      scale: [0.92, 1],
      delay: anime.stagger(80),
      duration: 700,
      easing: 'easeOutQuad',
    });
  }, []);

  return (
    <section id="publications" className="publications-section" ref={sectionRef}>
      <div className="publications-container">
        <div className="section-header-center">
          <span className="section-tag-badge">PEER-REVIEWED & TECHNICAL WRITING</span>
          <h2 className="section-title">Publications & Research Vault</h2>
          <p className="section-subtitle">11 technical research publications spanning Agentic AI, LLM behavioral drift, causal dynamic pricing, and production MLOps.</p>
        </div>

        <div className="publications-grid">
          {publications.map((pub, index) => (
            <TiltCard key={index} pub={pub} onOpen={(p) => setActiveModal(p)} />
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      {activeModal && (
        <div className="pub-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="pub-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pub-modal-header">
              <span className="modal-publisher-tag">{activeModal.publisher}</span>
              <span className="modal-date-tag">{activeModal.date}</span>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)} aria-label="Close modal">✕</button>
            </div>
            <h3 className="modal-pub-title">{activeModal.title}</h3>
            <p className="modal-pub-desc">{activeModal.description}</p>
            <div className="modal-footer-actions">
              <a href={activeModal.link} target="_blank" rel="noopener noreferrer" className="modal-view-paper-btn">
                <span>Access Full Publication</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17l9.2-9.2M17 17V8H8"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PublicationsSection;
