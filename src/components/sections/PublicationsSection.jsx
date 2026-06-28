import React from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import './PublicationsSection.css';

const TiltCard = ({ title, date, description, link }) => {
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
      onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
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
          <span className="pub-link">Read Publication &rarr;</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PublicationsSection = () => {
  const publications = [
    {
      title: "LangGraph Multi-Agent Architecture: Building a Self-Critiquing AI Debate System",
      date: "May 2026",
      description: "Published in Towards AI",
      link: "https://pub.towardsai.net/langgraph-multi-agent-architecture-building-a-self-critiquing-ai-debate-system-971a7ad881d9"
    },
    {
      title: "LLM Drift Experiment: A Quantitative Framework for Measuring Behavioural Drift via Adversarial Multi-Agent Debate",
      date: "May 2026",
      description: "Published in Zenodo (Research Dataset & Framework)",
      link: "https://doi.org/10.5281/zenodo.20032071"
    },
    {
      title: "Measuring Behavioral Drift in LLMs: 22 Signals, 5 Dimensions, and the Calcification Effect",
      date: "May 2026",
      description: "Published in Towards AI",
      link: "https://medium.com/towards-artificial-intelligence/measuring-behavioral-drift-in-llms-22-signals-5-dimensions-and-the-calcification-effect-aeaeb904d096"
    },
    {
      title: "LLM Drift Explained: Do AI Models Lose Themselves Under Adversarial Pressure?",
      date: "May 2026",
      description: "Published in Towards AI",
      link: "https://pub.towardsai.net/do-ai-models-lose-themselves-exploring-llm-drift-through-adversarial-debate-a37e0c75012b"
    },
    {
      title: "The $1.5 Million Difference: Why Benchmarks are Only 10% of the AI Agent Story",
      date: "Mar 2026",
      description: "Published on LinkedIn",
      link: "https://www.linkedin.com/pulse/15-million-difference-why-benchmarks-only-10-ai-agent-rishav-saigal-ao4jc/"
    },
    {
      title: "AutoML on Autopilot",
      date: "Mar 2026",
      description: "Published in Towards AI",
      link: "https://pub.towardsai.net/automl-on-autopilot-c8939bca8f8f"
    },
    {
      title: "CognitoEDA",
      date: "Aug 2025",
      description: "Published on Medium",
      link: "https://medium.com/@rishavsaigal/cognitoeda-bcbd3567e6d2"
    },
    {
      title: "Beyond Prediction: Generative AI's Probabilistic Future in Time Series",
      date: "Jun 2025",
      description: "Published on Medium",
      link: "https://medium.com/@rishavsaigal/the-generative-ai-revolution-moving-beyond-what-will-happen-to-what-could-happen-in-time-f820ed5263f1"
    },
    {
      title: "Unlocking Time Series with LLMs: A New Era with TimeCAP",
      date: "Jun 2025",
      description: "Published on Medium",
      link: "https://medium.com/@rishavsaigal/unlocking-time-series-with-llms-99a369f45447"
    }
  ];

  return (
    <section id="publications" className="publications-section">
      <div className="publications-container">
        <h2 className="section-title">Publications & Research</h2>
        <p className="section-subtitle">Insights on Agentic AI, Causal Inference, and MLOps.</p>
        
        <div className="publications-grid">
          {publications.map((pub, index) => (
            <TiltCard key={index} {...pub} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
