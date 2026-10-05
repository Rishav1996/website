import React, { useState } from 'react';
import './WatchDetailExhibition.css';

/**
 * WatchDetailKennethCole
 * Tailored Sub-Watch Experience for Kenneth Cole KCWGL2104102MN.
 * De-duplicated & Streamlined:
 *  - Single unified Roast Lighting Mood bar (Morning Espresso, Roastery Spotlight, Late Night Café)
 *  - Single authoritative 5-element macro inspector with color dots (no duplicate header swatches)
 *  - Clean header with horological specs
 */
// Color dots mapped to the 5 authentic macro elements
const ELEMENT_SWATCH_COLORS = {
  'element-balance': '#e11d48',       // Synthetic Ruby Pivot
  'element-gear-train': '#c5a059',    // Raw Horological Brass
  'element-chapter-ring': '#f5f2eb',  // Steamed Crema Railroad Track
  'element-case-crown': '#4a332a',    // Matte Mocha IP Steel
  'element-strap': '#2e1c14'          // Roasted Cocoa Calfskin
};

const WatchDetailKennethCole = ({
  watch,
  prevWatch = null,
  nextWatch = null,
  onSelectWatch = () => {},
  onBackToVault = () => {},
  onReturnToPortfolio = () => {}
}) => {
  const elements = watch?.elements || [];
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [viewMode, setViewMode] = useState('full-watch'); // Default to full timepiece view across all watches

  return (
    <div className="tailored-exhibition-wrapper mood-spotlight">
      {/* Thematic Visual Background Element: Dark Roast Coffee Beans & Crema */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/watches/backgrounds/bg_coffee_mocha.jpg)`
        }}
        aria-hidden="true"
      />
      <div className="tailored-exhibition-container">
        {/* Top Breadcrumbs & Atelier Navigation */}
        <div className="exhibition-top-bar">
          <div className="top-nav-group">
            <button type="button" className="btn-archive-back" onClick={onBackToVault}>
              <span className="arrow">←</span>
              <span>Vault Archive</span>
            </button>
            {prevWatch && (
              <button
                type="button"
                className="btn-adjacent-timepiece"
                onClick={() => onSelectWatch(prevWatch.id)}
                title={`Previous: ${prevWatch.brand} ${prevWatch.model}`}
              >
                <span>← {prevWatch.brand}</span>
              </button>
            )}
            {nextWatch && (
              <button
                type="button"
                className="btn-adjacent-timepiece"
                onClick={() => onSelectWatch(nextWatch.id)}
                title={`Next: ${nextWatch.brand} ${nextWatch.model}`}
              >
                <span>{nextWatch.brand} →</span>
              </button>
            )}
          </div>

          <div className="roastery-theme-tag">
            <svg className="roastery-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="14" stroke="#c5a059" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="16" cy="16" r="10" stroke="#c5a059" strokeWidth="1" opacity="0.6" />
              <line x1="16" y1="6" x2="16" y2="26" stroke="#c5a059" strokeWidth="1.2" opacity="0.7" />
              <line x1="6" y1="16" x2="26" y2="16" stroke="#c5a059" strokeWidth="1.2" opacity="0.7" />
              <circle cx="16" cy="16" r="2.5" fill="#e11d48" stroke="#c5a059" strokeWidth="0.8" />
              <path d="M16 8C14 12 18 18 16 24" stroke="#f5f2eb" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
            </svg>
            <span className="roastery-text">THE COFFEE MOCHA ATELIER // {watch.sku}</span>
          </div>
        </div>

        {/* Clean Header Block (Zero Duplicate Swatches) */}
        <header className="exhibition-mocha-header">
          <div className="mocha-eyebrow">
            <span>KENNETH COLE NEW YORK</span>
            <span className="sep">•</span>
            <span>REFERENCE {watch.sku}</span>
          </div>

          <h1 className="mocha-main-title">{watch.model}</h1>
          <p className="mocha-lead-text">{watch.tagline}</p>

          {/* Clean Horological Spec Chips */}
          <div className="mocha-spec-pills-row">
            <span className="spec-pill">{watch.dimensions.caseDiameter} Case</span>
            <span className="spec-pill">{watch.movement.type}</span>
            <span className="spec-pill">{watch.movement.jewelCount} Synthetic Rubies</span>
            <span className="spec-pill">{watch.materials.waterResistance.split('(')[0].trim()}</span>
          </div>
        </header>

        {/* Single Authoritative Atmospheric Lighting: Roastery Spotlight */}
        <div className="roastery-lighting-bar single-spotlight-bar">
          <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
          <div className="single-spotlight-pill">
            <span className="pill-icon">🕯️</span>
            <span className="pill-label">Roastery Spotlight</span>
            <span className="pill-sub">• Warm Amber Atelier Focus</span>
          </div>
        </div>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="element-inspection-stage" aria-label="Watch and Element Picture Showcase">
          <div className="stage-controls-bar">
            <div className="controls-left">
              <span className="controls-label">VIEWPORT:</span>
              <button
                type="button"
                className={`btn-mode-pill ${viewMode === 'full-watch' ? 'active' : ''}`}
                onClick={() => setViewMode('full-watch')}
              >
                Full Timepiece
              </button>
              <button
                type="button"
                className={`btn-mode-pill ${viewMode === 'element' ? 'active' : ''}`}
                onClick={() => setViewMode('element')}
              >
                Macro Element View
              </button>
            </div>

            <div className="controls-right">
              <span className="element-indicator-text">
                ELEMENT {elements.indexOf(selectedElement) + 1} OF {elements.length}: {selectedElement.name.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="stage-split-display">
            {/* Visual Viewport Stage */}
            <div className="stage-visual-viewport">
              {viewMode === 'full-watch' ? (
                <div className="viewport-full-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${watch.image}`}
                    alt={`${watch.brand} ${watch.model}`}
                    className="viewport-full-img"
                  />
                  <div className="viewport-caption">
                    Full Timepiece • 44mm Matte Mocha IP Steel in Roastery Spotlight
                  </div>
                </div>
              ) : (
                <div className="viewport-macro-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${selectedElement.image}`}
                    alt={selectedElement.name}
                    className="viewport-macro-img"
                  />
                  <div className="viewport-caption">
                    Macro Element Crop: {selectedElement.name} • 480×480 Retina Inspection
                  </div>
                </div>
              )}
            </div>

            {/* Single Source of Truth: Element Detail Story & Selector */}
            <div className="stage-element-dossier">
              <div className="active-element-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement.id] || '#c5a059' }}
                  ></span>
                  <span className="element-eyebrow">ACTIVE ARCHITECTURAL ELEMENT</span>
                </div>
                <h3 className="active-element-title">{selectedElement.name}</h3>
                <span className="active-element-sub">{selectedElement.subtitle}</span>
                <p className="active-element-desc">{selectedElement.description}</p>
              </div>

              {/* Single Authoritative Elements Selector Strip */}
              <div className="elements-selector-tray">
                <span className="tray-label">SELECT ARCHITECTURAL ELEMENT:</span>
                <div className="selector-cards-list">
                  {elements.map((elem, idx) => {
                    const isSelected = selectedElement.id === elem.id;
                    const dotColor = ELEMENT_SWATCH_COLORS[elem.id] || '#c5a059';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedElement(elem);
                          setViewMode('element');
                        }}
                      >
                        <div className="selector-thumb">
                          <img
                            src={`${import.meta.env.BASE_URL}${elem.image}`}
                            alt={elem.name}
                            className="selector-img"
                          />
                        </div>
                        <div className="selector-meta">
                          <div className="s-name-row">
                            <span
                              className="elem-color-indicator"
                              style={{ backgroundColor: dotColor }}
                            ></span>
                            <span className="s-num">0{idx + 1}</span>
                            <strong className="s-name">{elem.name}</strong>
                          </div>
                          <span className="s-sub">{elem.subtitle}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Concise Design Backstory: Manhattan & Coffee Mocha */}
        <section className="mocha-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card">
              <span className="story-kicker">MANHATTAN 1982 ORIGIN</span>
              <h2 className="story-title">Urban Architectural Transparency</h2>
              <ul className="story-list">
                <li>
                  <strong>Loft Culture:</strong> Stripping away solid walls to expose raw structural steel trusses, brick masonry, and conduits.
                </li>
                <li>
                  <strong>No Opaque Dial:</strong> The movement is exposed front-and-back as a wearable kinetic sculpture.
                </li>
                <li>
                  <strong>Visible Mechanics:</strong> The unadorned heartbeat of the balance wheel and brass gears operate in plain view.
                </li>
              </ul>
            </div>

            <div className="story-card">
              <span className="story-kicker">SENSORY COLORWAY</span>
              <h2 className="story-title">The Coffee Mocha Harmony</h2>
              <ul className="story-list">
                <li>
                  <strong>Matte Mocha IP Case:</strong> Deep, roasted chocolate finish absorbing glare across the 44mm chassis.
                </li>
                <li>
                  <strong>Steamed Crema Chapter Ring:</strong> Warm cream railroad track evoking silky espresso crema with high-contrast baton indices.
                </li>
                <li>
                  <strong>Cocoa Calfskin & Brass:</strong> Rich brown stitched leather and golden gear teeth recalling artisanal espresso boilers and roasters.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Timepiece in Archive Transition Card */}
        {nextWatch && (
          <section className="next-timepiece-transition-section" aria-label="Next Timepiece in Archive">
            <div
              className="next-timepiece-card"
              onClick={() => onSelectWatch(nextWatch.id)}
              role="button"
              tabIndex={0}
            >
              <div className="next-card-left">
                <span className="next-kicker">UP NEXT IN ARCHIVE</span>
                <h3 className="next-title">{nextWatch.brand} • {nextWatch.model}</h3>
                <p className="next-tagline">{nextWatch.tagline}</p>
                <div className="next-btn-action">
                  <span>Inspect Next Timepiece</span>
                  <span className="arrow">→</span>
                </div>
              </div>
              <div className="next-card-thumb">
                <img
                  src={`${import.meta.env.BASE_URL}${nextWatch.image}`}
                  alt={`${nextWatch.brand} ${nextWatch.model}`}
                  className="next-watch-img"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default WatchDetailKennethCole;
