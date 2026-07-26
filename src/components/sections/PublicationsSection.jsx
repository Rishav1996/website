import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import './PublicationsSection.css';

const TiltCard = ({ pub, onOpen }) => {
  const { title, date, description, link } = pub;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    x.set(currentX - rect.width / 2);
    y.set(currentY - rect.height / 2);
    mouseX.set(currentX);
    mouseY.set(currentY);
    opacity.set(1);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    opacity.set(0);
  }

  return (
    <motion.div
      className="tilt-card-wrapper"
      style={{ perspective: 2000 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(pub)}
      role="button"
      tabIndex={0}
    >
      <motion.div
        className="tilt-card"
        style={{ rotateX, rotateY, z: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div className="tilt-glare" style={{ background: glareBackground, opacity }} />
        <div className="card-content">
          <span className="pub-date">{date}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="pub-link"
            onClick={(e) => e.stopPropagation()}
          >
            Read Publication &rarr;
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const publications = [
  {
    title: "Claude Model Routing: Stop Scoring \"Complexity.\" Score These Two Things Instead.",
    date: "Jul 2026",
    description: "Published on Medium",
    summary: "Argues that a single blended 'complexity' score breaks Claude model routing — short-but-hard prompts get routed too cheap, long-but-easy ones too expensive. Proposes scoring capability floor (a max) and cost exposure (a sum) as two separate axes instead, with a real downgrade test gating any model swap.",
    link: "https://medium.com/@rishavsaigal/claude-model-routing-stop-scoring-complexity-score-these-two-things-instead-a6505c9053ce"
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
    link: "https://doi.org/10.5281/zenodo.20032071"
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
    link: "https://pub.towardsai.net/automl-on-autopilot-c8939bca8f8f"
  },
  {
    title: "CognitoEDA",
    date: "Aug 2025",
    description: "Published on Medium",
    summary: "Introduces CognitoEDA, an agentic workflow that automates exploratory data analysis — schema inspection, statistical summaries, and report generation — using a multi-agent LangGraph pipeline.",
    link: "https://medium.com/@rishavsaigal/cognitoeda-bcbd3567e6d2"
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

  return (
    <section id="publications" className="publications-section">
      <div className="publications-container">
        <h2 className="section-title">Publications & Research</h2>
        <p className="section-subtitle">Insights on Agentic AI, Causal Inference, and MLOps.</p>

        <div className="publications-grid">
          {publications.map((pub, index) => (
            <TiltCard key={index} pub={pub} onOpen={setSelectedPub} />
          ))}
        </div>
      </div>

      {/* Publication Summary Modal */}
      <div className={`pub-modal ${selectedPub ? 'active' : ''}`} onClick={() => setSelectedPub(null)}>
        {selectedPub && (
          <div className="pub-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-pub-modal-btn" onClick={() => setSelectedPub(null)}>
              <span>[ ESC_CLOSE ]</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <span className="pub-modal-date">{selectedPub.date} &bull; {selectedPub.description}</span>
            <h3 className="pub-modal-title">{selectedPub.title}</h3>
            <p className="pub-modal-summary">{selectedPub.summary}</p>
            <a
              href={selectedPub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-modal-readmore"
            >
              Read Full Article &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationsSection;
