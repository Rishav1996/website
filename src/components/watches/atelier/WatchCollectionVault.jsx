import React, { useState } from 'react';
import WatchFloatingBackground from './WatchFloatingBackground';
import './WatchCollectionVault.css';

/**
 * WatchCollectionVault
 * Curated Vault Archive with 6 master timepieces.
 * Features the dynamic Wall of Fame background and high-contrast collection plinths.
 */
const CATEGORIES = [
  { id: 'all', label: 'All Timepieces (6)' },
  { id: 'skeleton', label: 'Skeleton & Openwork (2)' },
  { id: 'solar', label: 'Tough Solar & Utility (1)' },
  { id: 'chronograph', label: 'Chronograph & Celestial (1)' },
  { id: 'mid-century', label: 'Mid-Century & Geometric (2)' }
];

const WatchCollectionVault = ({
  watches = [],
  onSelectWatch = () => {},
  onReturnToPortfolio = () => {}
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredWatches =
    selectedCategory === 'all'
      ? watches
      : watches.filter((w) => w.categoryGroup === selectedCategory);

  return (
    <div className="neutral-vault-wrapper">
      {/* Wall of Fame Continuous Marquee Background */}
      <WatchFloatingBackground />

      <div className="neutral-vault-container">
        {/* Minimal Archive Header */}
        <header className="vault-minimal-header">
          <div className="vault-eyebrow-tag">
            <span className="eyebrow-indicator"></span>
            <span>HOROLOGICAL VAULT // 6 CURATED EDITIONS</span>
          </div>

          <h1 className="vault-title-text">The Timepiece Archive</h1>
          <p className="vault-subtitle-text">
            A permanent gallery of mechanical, solar, and high-frequency horological engineering.
            Explore authentic macro captures, internal gear trains, and architectural casework.
          </p>

          {/* Category Filter Pills */}
          <div className="vault-category-filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`vault-filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        {/* Timepiece Showcase Cards */}
        {filteredWatches.map((watch, wIdx) => {
          const elements = watch?.elements || [];
          return (
            <section
              key={watch.id}
              className="timepiece-neutral-card"
              aria-label={`Timepiece: ${watch.brand} ${watch.model}`}
            >
              <div className="timepiece-header-row">
                <div className="timepiece-order-badge">
                  <span>TIMEPIECE N° 0{watches.findIndex((w) => w.id === watch.id) + 1}</span>
                  <span className="dot-sep">•</span>
                  <span>{watch.category.toUpperCase()}</span>
                </div>
                <div className="timepiece-status-badge">
                  <span className="status-dot"></span>
                  <span>{watch.status.toUpperCase()}</span>
                </div>
              </div>

              <div className="showcase-split-grid">
                {/* Left Column: Full Watch Picture Stage */}
                <div className="watch-hero-column">
                  <div
                    className="watch-plinth-stage"
                    onClick={() => onSelectWatch(watch.id)}
                    role="button"
                    tabIndex={0}
                    title="Click to inspect timepiece"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${watch.image}`}
                      alt={`${watch.brand} ${watch.model}`}
                      className="watch-hero-image"
                      loading="eager"
                    />
                  </div>

                  <div className="watch-identity-block">
                    <div className="watch-brand-label">
                      <span>{watch.brand}</span>
                      <span className="dot-sep">•</span>
                      <span>{watch.category}</span>
                    </div>

                    <h2 className="watch-model-heading">{watch.model}</h2>

                    <div className="watch-sku-line">
                      <span className="sku-label">REFERENCE:</span>
                      <strong className="sku-value">{watch.sku}</strong>
                    </div>

                    <p className="watch-short-desc">{watch.tagline}</p>

                    {/* Clean Spec Chips */}
                    <div className="watch-quick-specs">
                      <span className="spec-pill">{watch.dimensions.caseDiameter} Case</span>
                      <span className="spec-pill">{watch.movement.type.split('(')[0].trim()}</span>
                      {watch.movement.jewelCount && (
                        <span className="spec-pill">{watch.movement.jewelCount} Synthetic Rubies</span>
                      )}
                      <span className="spec-pill">{watch.materials.waterResistance.split('(')[0].trim()}</span>
                    </div>

                    {/* Clean Action Button */}
                    <button
                      type="button"
                      className="btn-inspect-timepiece"
                      onClick={() => onSelectWatch(watch.id)}
                    >
                      <span>Inspect Full Timepiece & Macro Elements</span>
                      <span className="arrow-icon">→</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Watch Element Pictures Grid */}
                <div className="watch-elements-column">
                  <div className="elements-column-header">
                    <div className="elements-title-wrap">
                      <h3 className="elements-heading">ARCHITECTURAL ELEMENTS</h3>
                      <span className="elements-count">({elements.length} MACRO VIEWS)</span>
                    </div>
                    <p className="elements-subtext">
                      High-resolution detail crops revealing internal mechanics, casework, and finishing.
                    </p>
                  </div>

                  <div className="elements-grid">
                    {elements.map((elem, idx) => (
                      <div
                        key={elem.id}
                        className="element-crop-card"
                        onClick={() => onSelectWatch(watch.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="element-thumb-wrap">
                          <img
                            src={`${import.meta.env.BASE_URL}${elem.image}`}
                            alt={elem.name}
                            className="element-thumb-img"
                            loading="lazy"
                          />
                        </div>

                        <div className="element-card-meta">
                          <span className="element-num">0{idx + 1}</span>
                          <strong className="element-name">{elem.name}</strong>
                          <span className="element-subtitle">{elem.subtitle}</span>
                          <p className="element-desc">{elem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default WatchCollectionVault;
