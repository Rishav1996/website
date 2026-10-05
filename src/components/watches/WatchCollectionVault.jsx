import React from 'react';
import './WatchCollectionVault.css';

const WatchCollectionVault = ({
  watches = [],
  onSelectWatch = () => {},
  onBackToPortfolio = () => {}
}) => {
  return (
    <div className="vault-page-container">
      {/* Top Breadcrumb & Status */}
      <div className="vault-top-nav">
        <button type="button" className="btn-vault-back" onClick={onBackToPortfolio}>
          <span className="back-arrow">←</span>
          <span>Back to Portfolio</span>
        </button>

        <div className="vault-badge-status">
          <span className="vault-pulse-dot"></span>
          <span className="vault-badge-text">CURATED HOROLOGICAL VAULT // ACTIVE ROTATION</span>
        </div>
      </div>

      {/* Header Banner */}
      <header className="vault-header">
        <span className="vault-eyebrow">HOROLOGY & DETERMINISTIC CRAFTSMANSHIP</span>
        <h1 className="vault-title">The Timepiece Collection</h1>
        <p className="vault-subtitle">
          An executive gallery of personal mechanical timepieces. From open skeleton architectural cutaways to harmonic balance oscillators, each piece represents deterministic engineering operating with zero algorithmic abstraction.
        </p>

        {/* Collection Metric Pills */}
        <div className="vault-metrics-row">
          <div className="vault-metric-chip">
            <span className="chip-k">TOTAL TIMEPIECES</span>
            <span className="chip-v">{String(watches.length).padStart(2, '0')}</span>
          </div>
          <div className="vault-metric-chip">
            <span className="chip-k">PRIMARY MOVEMENT</span>
            <span className="chip-v">Mechanical Automatic</span>
          </div>
          <div className="vault-metric-chip">
            <span className="chip-k">FREQUENCY</span>
            <span className="chip-v">21,600 vph (3 Hz)</span>
          </div>
          <div className="vault-metric-chip highlight">
            <span className="chip-k">SIGNATURE FINISH</span>
            <span className="chip-v">Matte Mocha IP Steel</span>
          </div>
        </div>
      </header>

      {/* Collection Grid */}
      <section className="vault-grid-section">
        <div className="vault-grid">
          {watches.map((watch, idx) => (
            <article key={watch.id} className="timepiece-vault-card" onClick={() => onSelectWatch(watch.id)}>
              <div className="card-top-tag">
                <span className="tag-edition">TIMEPIECE {String(idx + 1).padStart(2, '0')}</span>
                <span className="tag-status">{watch.status}</span>
              </div>

              {/* Photo Stage */}
              <div className="card-image-stage">
                <img
                  src={`${import.meta.env.BASE_URL}${watch.image}`}
                  alt={`${watch.brand} ${watch.model}`}
                  className="card-watch-photo"
                  loading="lazy"
                />
              </div>

              {/* Card Meta */}
              <div className="card-content">
                <div className="card-brand-label">
                  <span>{watch.brand}</span>
                  <span className="dot-sep">•</span>
                  <span>{watch.category}</span>
                </div>

                <h2 className="card-watch-title">{watch.model}</h2>

                <div className="card-sku-pill">
                  <span className="sku-prefix">SKU</span>
                  <span className="sku-val">{watch.sku}</span>
                </div>

                <p className="card-watch-tagline">{watch.tagline}</p>

                {/* Quick Specs HUD */}
                <div className="card-specs-row">
                  <div className="mini-spec">
                    <span className="ms-k">Case:</span>
                    <span className="ms-v">{watch.dimensions.caseDiameter}</span>
                  </div>
                  <div className="mini-spec">
                    <span className="ms-k">Beat:</span>
                    <span className="ms-v">{watch.movement.beatRate.split('/')[0].trim()}</span>
                  </div>
                  <div className="mini-spec">
                    <span className="ms-k">Jewels:</span>
                    <span className="ms-v">{watch.movement.jewelCount} Synthetic Rubies</span>
                  </div>
                  <div className="mini-spec">
                    <span className="ms-k">Depth:</span>
                    <span className="ms-v">{watch.materials.waterResistance.split('(')[0].trim()}</span>
                  </div>
                </div>

                {/* Explore Action Button */}
                <div className="card-action-row">
                  <span className="btn-explore-card">
                    <span>Inspect Timepiece // Blueprint & Anatomy</span>
                    <span className="explore-arrow">→</span>
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Extensibility Placeholder Card for Next Watch */}
          <div className="timepiece-vault-placeholder">
            <div className="placeholder-inner">
              <span className="placeholder-icon">⏱️</span>
              <span className="placeholder-tier">TIMEPIECE 02 // CURATION IN PROGRESS</span>
              <h3 className="placeholder-title">Horological Vault Expansion</h3>
              <p className="placeholder-desc">
                Upcoming mechanical addition undergoing cataloging, movement analysis, and CAD schematic registration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WatchCollectionVault;
