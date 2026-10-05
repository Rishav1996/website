import React, { useState, useEffect } from 'react';
import './WatchDetailLeeCooper.css';

/**
 * WatchDetailLeeCooper
 * Tailored Sub-Watch Experience for Lee Cooper LC07979.399 "Lyam" Tonneau Skeleton.
 * Features:
 *  - Tonneau Indigo Forge & Urban Industrialism Theme
 *  - Thematic backdrop: raw indigo denim & industrial steel mesh
 *  - Single Atmospheric Lighting bar (Indigo Forge Spotlight)
 *  - Full timepiece default viewport (filter: none, box-shadow: none)
 *  - 5 authentic macro elements with swatch dots
 *  - Interactive 3 Hz Escapement Pulse (21,600 VPH harmonic rhythm)
 */

const ELEMENT_SWATCH_COLORS = {
  'element-tonneau-bezel': '#64748b',   // Gunmetal Alloy
  'element-balance-ruby': '#f43f5e',    // Corundum Synthetic Ruby
  'element-skeleton-gears': '#d4af37',  // Brushed Brass Pinion
  'element-chapter-ring': '#3b82f6',    // Electric Cobalt Blue
  'element-silicone-strap': '#1e293b'   // Midnight Blue Silicone
};

const WatchDetailLeeCooper = ({
  watch,
  prevWatch = null,
  nextWatch = null,
  onSelectWatch = () => {},
  onBackToVault = () => {},
  onReturnToPortfolio = () => {}
}) => {
  const elements = watch?.elements || [];
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [viewMode, setViewMode] = useState('full-watch'); // Default to full timepiece view
  const [isEscapementActive, setIsEscapementActive] = useState(true);
  const [tickCount, setTickCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isEscapementActive) {
      // 6 beats per second (approx every 166ms)
      interval = setInterval(() => {
        setTickCount((prev) => (prev + 1) % 6);
      }, 166);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isEscapementActive]);

  return (
    <div className="leecooper-exhibition-wrapper">
      {/* Thematic Visual Background: Raw Indigo Denim & Steel Mesh */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/watches/backgrounds/bg_indigo_denim_mesh.jpg)`
        }}
        aria-hidden="true"
      />

      <div className="leecooper-exhibition-container">
        {/* Top Breadcrumb & Navigation */}
        <div className="leecooper-top-bar">
          <div className="top-nav-group">
            <button type="button" className="btn-archive-back-leecooper" onClick={onBackToVault}>
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

          <div className="leecooper-theme-tag">
            <svg className="leecooper-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="7" y="4" width="18" height="24" rx="6" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="16" cy="18" r="4" stroke="#f43f5e" strokeWidth="1.2" />
              <line x1="16" y1="4" x2="16" y2="10" stroke="#64748b" strokeWidth="1" />
            </svg>
            <span className="leecooper-tag-text">TONNEAU INDIGO FORGE // {watch.sku}</span>
          </div>
        </div>

        {/* Clean Header Block */}
        <header className="exhibition-leecooper-header">
          <div className="leecooper-eyebrow">
            <span>LEE COOPER // HAUTE TONNEAU SKELETON</span>
            <span className="sep">•</span>
            <span>REFERENCE {watch.sku}</span>
          </div>

          <h1 className="leecooper-main-title">{watch.model}</h1>
          <p className="leecooper-lead-text">{watch.tagline}</p>

          {/* Clean Horological Spec Chips */}
          <div className="leecooper-spec-pills-row">
            <span className="spec-pill">{watch.dimensions.caseDiameter} Tonneau</span>
            <span className="spec-pill">{watch.movement.type}</span>
            <span className="spec-pill">{watch.movement.jewelCount} Synthetic Rubies</span>
            <span className="spec-pill">8-Rivet Bezel</span>
          </div>
        </header>

        {/* Single Authoritative Atmospheric Lighting: Indigo Forge Spotlight */}
        <div className="leecooper-lighting-bar single-spotlight-bar">
          <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
          <div className="single-spotlight-pill">
            <span className="pill-icon">⚡</span>
            <span className="pill-label">Indigo Forge Spotlight</span>
            <span className="pill-sub">• Electric Cobalt Beam</span>
          </div>
        </div>

        {/* Interactive 3 Hz Escapement Heartbeat Pulse Cockpit */}
        <section className="leecooper-interactive-cockpit" aria-label="3 Hz Escapement Cockpit">
          <div className="escapement-panel-left">
            <div className="cockpit-title-row">
              <span className="cockpit-badge">3 HZ HARMONIC PULSE</span>
              <h3 className="cockpit-title">Mechanical Lever Escapement Rhythm</h3>
            </div>
            <p className="cockpit-desc">
              Pulsing at 21,600 beats per hour, the synthetic ruby pallets release the escape wheel exactly 6 times per second to drive the sweeping second hand.
            </p>

            <div className="pulse-meter-row">
              <button
                type="button"
                className={`btn-toggle-pulse ${isEscapementActive ? 'active' : ''}`}
                onClick={() => setIsEscapementActive(!isEscapementActive)}
              >
                <span>{isEscapementActive ? '⏸ Pause Escapement' : '▶ Engage Escapement'}</span>
              </button>

              <div className="tick-visualizer">
                {[0, 1, 2, 3, 4, 5].map((beat) => (
                  <span
                    key={beat}
                    className={`beat-bar ${isEscapementActive && tickCount === beat ? 'active' : ''}`}
                  ></span>
                ))}
              </div>
            </div>

            <div className="escapement-stats-strip">
              <div className="stat-unit">
                <span className="stat-label">FREQUENCY:</span>
                <strong className="stat-val text-blue">21,600 VPH (3.0 Hz)</strong>
              </div>
              <div className="stat-unit">
                <span className="stat-label">DISCRETE STEPS:</span>
                <span className="stat-val">6 Micro-Ticks / Second</span>
              </div>
              <div className="stat-unit">
                <span className="stat-label">BEARING:</span>
                <span className="stat-val text-ruby">Corundum Ruby Cap</span>
              </div>
            </div>
          </div>

          <div className="escapement-panel-right">
            <div className="tonneau-geometry-card">
              <span className="geo-badge">ERGONOMIC ANATOMY</span>
              <h4 className="geo-title">Curved Tonneau Profile</h4>
              <p className="geo-desc">
                Departing from traditional round silhouettes, the 42mm curved tonneau chassis naturally wraps the carpal anatomy.
              </p>
              <div className="geo-specs">
                <span className="geo-spec-item">8 Perimeter Rivets</span>
                <span className="geo-spec-item">Cobalt Inner Chapter Flange</span>
                <span className="geo-spec-item">Midnight Silicone Integration</span>
              </div>
            </div>
          </div>
        </section>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="leecooper-inspection-stage" aria-label="Watch and Macro Element Showcase">
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
                ELEMENT {elements.indexOf(selectedElement) + 1} OF {elements.length}: {selectedElement?.name?.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="stage-split-display">
            {/* Left: Viewport Stage */}
            <div className="stage-visual-viewport leecooper-viewport">
              {viewMode === 'full-watch' ? (
                <div className="viewport-full-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${watch.image}`}
                    alt={`${watch.brand} ${watch.model}`}
                    className="viewport-full-img"
                    loading="eager"
                  />
                  <div className="viewport-caption">
                    Full Timepiece • {watch.dimensions.caseDiameter} Curved Tonneau Chassis (Automatic Openwork • 21,600 vph)
                  </div>
                </div>
              ) : (
                <div className="viewport-macro-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${selectedElement?.image}`}
                    alt={selectedElement?.name}
                    className="viewport-macro-img"
                    loading="eager"
                  />
                  <div className="viewport-caption">
                    Macro Element Crop: {selectedElement?.name} • 480×480 High-Resolution Inspection
                  </div>
                </div>
              )}
            </div>

            {/* Right: Architectural Dossier Stack (2 Separate Cards) */}
            <div className="stage-element-dossier">
              {/* Card 1: Active Element Hero Dossier */}
              <div className="active-element-card leecooper-dossier-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement?.id] || '#3b82f6' }}
                  ></span>
                  <span className="element-eyebrow">ACTIVE ARCHITECTURAL ELEMENT</span>
                </div>

                <h3 className="active-element-title">{selectedElement?.name}</h3>
                <span className="active-element-sub">{selectedElement?.subtitle}</span>
                <p className="active-element-desc">{selectedElement?.description}</p>
              </div>

              {/* Card 2: Dedicated Elements Selector Tray */}
              <div className="elements-selector-tray">
                <span className="tray-label">SELECT ARCHITECTURAL ELEMENT:</span>
                <div className="selector-cards-list">
                  {elements.map((elem, idx) => {
                    const isSelected = elem.id === selectedElement?.id;
                    const swatchColor = ELEMENT_SWATCH_COLORS[elem.id] || '#3b82f6';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card leecooper-selector-card ${isSelected ? 'selected' : ''}`}
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
                              style={{ backgroundColor: swatchColor }}
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

        {/* Concise Design Backstory: London 1908 Origin & Indigo Denim */}
        <section className="leecooper-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card leecooper-story-card">
              <span className="story-kicker">LONDON 1908 ORIGIN // URBAN FORGE</span>
              <h2 className="story-title">Curved Tonneau Haute Ergonomics</h2>
              <ul className="story-list">
                <li>
                  <strong>Anatomical Curvature:</strong> Ergonomically curved case back contoured to eliminate wrist pressure points across daily active wear.
                </li>
                <li>
                  <strong>8-Rivet Industrial Bezel:</strong> Exposed perimeter hardware evoking raw London industrial architecture and brutalist structural design.
                </li>
                <li>
                  <strong>Exhibition Architecture:</strong> Full skeleton dial cutouts showcasing synthetic ruby pivot jewels, bridges, and spring barrel kinetics.
                </li>
              </ul>
            </div>

            <div className="story-card leecooper-story-card">
              <span className="story-kicker">SENSORY COLORWAY // RAW INDIGO</span>
              <h2 className="story-title">The Indigo Denim & Ruby Harmony</h2>
              <ul className="story-list">
                <li>
                  <strong>Electric Cobalt Chapter Flange:</strong> Vibrant blue inner track contrasting boldly with the darkened openworked bridge plates.
                </li>
                <li>
                  <strong>3 Hz Escapement Heartbeat:</strong> 21,600 vph balance wheel pulsing in plain view through the lower dial window.
                </li>
                <li>
                  <strong>Integrated Midnight Silicone:</strong> Textured ergonomic sport strap engineered with quick-release spring bars for urban agility.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Timepiece in Archive Transition Card */}
        {nextWatch && (
          <section className="next-timepiece-transition-section" aria-label="Next Timepiece in Archive">
            <div
              className="next-timepiece-card leecooper-next-card"
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

export default WatchDetailLeeCooper;
