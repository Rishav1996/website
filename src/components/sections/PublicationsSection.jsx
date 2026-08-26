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

  const getPublisherBadge = (desc) => {
    if (desc.includes("Towards AI")) return { label: "TOWARDS AI", color: "cyan" };
    if (desc.includes("Zenodo") || desc.includes("DOI")) return { label: "ZENODO DOI", color: "purple" };
    if (desc.includes("Towards Deep Learning")) return { label: "TOWARDS DEEP LEARNING", color: "green" };
    if (desc.includes("LinkedIn")) return { label: "LINKEDIN", color: "blue" };
    if (desc.includes("Medium")) return { label: "MEDIUM", color: "amber" };
    return { label: "RESEARCH", color: "cyan" };
  };

  const badge = getPublisherBadge(description);

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
        <p className="pub-desc">{pub.summary}</p>

        <div className="pub-card-action">
          <span>Read Research Brief & Links</span>
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
    title: "The Specialized Frontier: An Inquiry Into Gated AI Architectures and the Cooperative Safety Flywheel",
    date: "Aug 2026",
    description: "Published in Towards AI",
    summary: "Examines the emergence of gated AI architectures operating under vetted access, and proposes the cooperative safety flywheel where public interaction and red-teaming directly supply the empirical data needed to harden frontier models.",
    link: "https://pub.towardsai.net/the-specialized-frontier-an-inquiry-into-gated-ai-architectures-and-the-cooperative-safety-0f10f1546ad6"
  },
  {
    title: "Claude Model Routing: Stop Scoring \"Complexity.\" Score These Two Things Instead.",
    date: "Jul 2026",
    description: "Published in Towards Deep Learning",
    summary: "Argues that a single blended 'complexity' score breaks Claude model routing — short-but-hard prompts get routed too cheap, long-but-easy ones too expensive. Proposes scoring capability floor (a max) and cost exposure (a sum) as two separate axes instead, with a real downgrade test gating any model swap.",
    link: "https://www.towardsdeeplearning.com/claude-model-routing-stop-scoring-complexity-score-these-two-things-instead-a6505c9053ce",
    repoLink: "https://github.com/Rishav1996/model-router"
  },
  {
    title: "LangGraph Multi-Agent Architecture: Building a Self-Critiquing AI Debate System",
    date: "May 2026",
    description: "Published in Towards AI",
    summary: "Walks through building a multi-agent debate system in LangGraph, where AI agents critique and refine each other's reasoning. Covers state graph design, agent roles, and shared-memory coordination patterns.",
    link: "https://pub.towardsai.net/langgraph-multi-agent-architecture-building-a-self-critiquing-ai-debate-system-971a7ad881d9"
  },
  {
    title: "LLM Drift Experiment: A Quantitative Framework for Measuring Behavioural Drift via Adversarial Multi-Agent Debate",
    date: "May 2026",
    description: "Published in Zenodo (Research Dataset & Framework)",
    summary: "An open research framework and dataset for quantifying how a model's persona and reasoning shift under sustained adversarial pressure, using a Pros/Cons multi-agent debate setup tracked across a set of behavioral signals.",
    link: "https://doi.org/10.5281/zenodo.20032071",
    repoLink: "https://github.com/Rishav1996/LLMDriftExperiment"
  },
  {
    title: "Measuring Behavioral Drift in LLMs: 22 Signals, 5 Dimensions, and the Calcification Effect",
    date: "May 2026",
    description: "Published in Towards AI",
    summary: "Breaks down the 22-signal, 5-dimension measurement framework used to detect LLM drift, and introduces the 'calcification effect' — the tendency for a model's stance to grow more rigid the longer it's challenged.",
    link: "https://medium.com/towards-artificial-intelligence/measuring-behavioral-drift-in-llms-22-signals-5-dimensions-and-the-calcification-effect-aeaeb904d096"
  },
  {
    title: "LLM Drift Explained: Do AI Models Lose Themselves Under Adversarial Pressure?",
    date: "May 2026",
    description: "Published in Towards AI",
    summary: "An accessible explainer on LLM drift: what it looks like in practice, why adversarial multi-agent debate is a useful way to surface it, and what the early findings suggest about model consistency.",
    link: "https://pub.towardsai.net/do-ai-models-lose-themselves-exploring-llm-drift-through-adversarial-debate-a37e0c75012b"
  },
  {
    title: "The $1.5 Million Difference: Why Benchmarks are Only 10% of the AI Agent Story",
    date: "Mar 2026",
    description: "Published on LinkedIn",
    summary: "Argues that standard AI agent benchmarks capture only a fraction of what determines real-world production success, and outlines the operational factors — cost, reliability, observability — that account for the rest.",
    link: "https://www.linkedin.com/pulse/15-million-difference-why-benchmarks-only-10-ai-agent-rishav-saigal-ao4jc/"
  },
  {
    title: "AutoML on Autopilot",
    date: "Mar 2026",
    description: "Published in Towards AI",
    summary: "A practical look at automating the machine learning pipeline end-to-end, from model selection to deployment, and where AutoML tooling still needs a human in the loop.",
    link: "https://pub.towardsai.net/automl-on-autopilot-c8939bca8f8f",
    repoLink: "https://github.com/Rishav1996/PyCaretAgent"
  },
  {
    title: "CognitoEDA",
    date: "Aug 2025",
    description: "Published on Medium",
    summary: "Introduces CognitoEDA, an agentic workflow that automates exploratory data analysis — schema inspection, statistical summaries, and report generation — using a multi-agent LangGraph pipeline.",
    link: "https://medium.com/@rishavsaigal/cognitoeda-bcbd3567e6d2",
    repoLink: "https://github.com/Rishav1996/CognitoEDA"
  },
  {
    title: "Beyond Prediction: Generative AI's Probabilistic Future in Time Series",
    date: "Jun 2025",
    description: "Published on Medium",
    summary: "Explores how generative AI is shifting time-series forecasting from single-point predictions toward probabilistic, scenario-based forecasts, and what that means for planning under uncertainty.",
    link: "https://medium.com/@rishavsaigal/the-generative-ai-revolution-moving-beyond-what-will-happen-to-what-could-happen-in-time-f820ed5263f1"
  },
  {
    title: "Unlocking Time Series with LLMs: A New Era with TimeCAP",
    date: "Jun 2025",
    description: "Published on Medium",
    summary: "Looks at TimeCAP and the emerging class of LLM-based time-series models, examining how language-model architectures are being adapted for forecasting tasks traditionally owned by statistical methods.",
    link: "https://medium.com/@rishavsaigal/unlocking-time-series-with-llms-99a369f45447"
  }
];

const PublicationsSection = () => {
  const [selectedPub, setSelectedPub] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.pub-card-item');
    anime({
      targets: cards,
      opacity: [0, 1],
      scale: [0.92, 1],
      delay: anime.stagger(60),
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
            <TiltCard key={index} pub={pub} onOpen={setSelectedPub} />
          ))}
        </div>
      </div>

      {/* Publication Summary Modal */}
      {selectedPub && (
        <div className="pub-modal-backdrop" onClick={() => setSelectedPub(null)}>
          <div className="pub-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pub-modal-top-bar">
              <div className="modal-meta-badges">
                <span className="modal-publisher-tag">{selectedPub.description}</span>
                <span className="modal-date-tag">{selectedPub.date}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedPub(null)} aria-label="Close modal">
                <span>[ ESC_CLOSE ]</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <h3 className="modal-pub-title">{selectedPub.title}</h3>
            <p className="modal-pub-desc">{selectedPub.summary}</p>
            <div className="modal-footer-actions">
              <a href={selectedPub.link} target="_blank" rel="noopener noreferrer" className="modal-view-paper-btn">
                <span>Access Full Publication</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17l9.2-9.2M17 17V8H8"/>
                </svg>
              </a>
              {selectedPub.repoLink && (
                <a
                  href={selectedPub.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-repo-link-btn"
                >
                  <span>GitHub Repository</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17l9.2-9.2M17 17V8H8"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PublicationsSection;
