import React from 'react';
import './WatchStory.css';

const WatchStory = ({ watch }) => {
  return (
    <section className="watch-story-section">
      <div className="story-container">
        <div className="story-inner-card">
          <div className="story-header">
            <span className="story-eyebrow">HOROLOGY & DETERMINISTIC CRAFTSMANSHIP</span>
            <h2 className="story-headline">{watch.narrative.headline}</h2>
            <p className="story-lead">{watch.narrative.summary}</p>
          </div>

          <div className="story-pillars-grid">
            {watch.narrative.keyPillars.map((pillar, idx) => (
              <div key={idx} className="story-pillar-item">
                <div className="pillar-num-badge">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="story-quote-footer">
            <blockquote className="story-quote">
              "In artificial intelligence, we model non-linear probability and high-dimensional manifolds. In mechanical horology, time is governed by pure harmonic oscillation—a hairspring, an escape wheel, and zero lines of code."
            </blockquote>
            <cite className="story-cite">— Rishav Saigal // AI Architect & Timepiece Collector</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchStory;
