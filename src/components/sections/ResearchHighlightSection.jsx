import React from 'react';
import './ResearchHighlightSection.css';

const ResearchHighlightSection = () => {
  return (
    <section id="llm-drift" className="research-highlight-section">
      <div className="research-highlight-container">
        <h2 className="section-title">How LLM Drift Is Measured</h2>
        <p className="section-subtitle">
          A quantitative framework for tracking behavioral drift under adversarial multi-agent debate.
        </p>

        <div className="research-highlight-body">
          <p>
            LLM Drift describes what happens to a language model's persona and reasoning
            over the course of a sustained, adversarial conversation. The LLMDriftExperiment
            framework measures this directly: a Pros agent (adopting a PROTECT posture) and
            a Cons agent (adopting an ATTACK posture) debate a position across multiple
            rounds, built on a LangGraph-based multi-agent architecture, while the system
            logs how each model's outputs shift round over round.
          </p>
          <p>
            Drift isn't scored as a single number. The framework tracks 22 distinct signals
            spanning 5 dimensions of model behavior — including Affective, Cognitive/Structural,
            and Social/Relational signal categories — to capture not just <em>whether</em> a
            model's position changed, but <em>how</em> it changed: growing more defensive,
            more agreeable, more repetitive, or less willing to engage with counter-argument.
          </p>
          <p>
            One consistent pattern across debate runs is what this research calls the
            <strong> calcification effect</strong> — a self-coined term for the way a model's
            persona and reasoning tend to grow progressively more rigid the longer it stays
            under adversarial pressure, becoming less responsive to new counter-arguments
            rather than more considered.
          </p>
          <p>
            The full methodology, signal definitions, and dataset are published as an open
            research framework, alongside a written breakdown of the findings.
          </p>
        </div>

        <div className="research-highlight-links">
          <a
            href="https://doi.org/10.5281/zenodo.20032071"
            target="_blank"
            rel="noopener noreferrer"
            className="research-highlight-link"
          >
            Research Framework &amp; Dataset (Zenodo) &rarr;
          </a>
          <a
            href="https://github.com/Rishav1996/LLMDriftExperiment"
            target="_blank"
            rel="noopener noreferrer"
            className="research-highlight-link"
          >
            LLMDriftExperiment on GitHub &rarr;
          </a>
          <a
            href="https://medium.com/towards-artificial-intelligence/measuring-behavioral-drift-in-llms-22-signals-5-dimensions-and-the-calcification-effect-aeaeb904d096"
            target="_blank"
            rel="noopener noreferrer"
            className="research-highlight-link"
          >
            Full Writeup: 22 Signals, 5 Dimensions &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResearchHighlightSection;
