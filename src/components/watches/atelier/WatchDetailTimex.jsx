import React, { useState } from 'react';
import './WatchDetailTimex.css';

/**
 * WatchDetailTimex
 * Tailored Sub-Watch Experience for Timex Automatic TW000Z800.
 * Features:
 *  - Heritage Parchment & Mid-Century Horology Theme
 *  - Thematic backdrop: vintage horology drafting blueprint & brass calipers
 *  - Single Atmospheric Lighting bar (Mid-Century Drafting Spotlight)
 *  - Full timepiece default viewport (filter: none, box-shadow: none)
 *  - 5 authentic macro elements with swatch dots
 *  - Interactive Automatic Winding Rotor & Kinetic Power Reserve Gauge
 */

const ELEMENT_SWATCH_COLORS = {
  'element-beige-dial': '#d4af37',      // Vintage Champagne Gold
  'element-gilt-indices': '#fef08a',    // Diamond-Cut Gilt
  'element-fluted-crown': '#b48a3c',    // Warm Amber Brass
  'element-handset': '#e2e8f0',         // Mirror Polished Dauphine
  'element-steel-bracelet': '#94a3b8'   // 5-Link Steel Silver
};

const WatchDetailTimex = ({
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
  const [rotorRotations, setRotorRotations] = useState(0);
  const [powerReserveHours, setPowerReserveHours] = useState(38);
  const [isWinding, setIsWinding] = useState(false);

  const handleWindRotor = () => {
    setIsWinding(true);
    setRotorRotations((prev) => prev + 180);
    setPowerReserveHours((prev) => Math.min(42, prev + 2));
    setTimeout(() => {
      setIsWinding(false);
    }, 600);
  };

  const reservePercent = Math.round((powerReserveHours / 42) * 100);

  return (
    <div className="timex-exhibition-wrapper">
      {/* Thematic Visual Background: Vintage Horology Blueprint & Parchment */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/watches/backgrounds/bg_vintage_parchment.jpg)`
        }}
        aria-hidden="true"
      />

      <div className="timex-exhibition-container">
        {/* Top Breadcrumb & Navigation */}
        <div className="timex-top-bar">
          <div className="top-nav-group">
            <button type="button" className="btn-archive-back-timex" onClick={onBackToVault}>
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

          <div className="timex-theme-tag">
            <svg className="timex-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="14" stroke="#d4af37" strokeWidth="1.2" />
              <circle cx="16" cy="16" r="10" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="1 3" />
              <line x1="16" y1="4" x2="16" y2="28" stroke="#d4af37" strokeWidth="1" />
              <line x1="4" y1="16" x2="28" y2="16" stroke="#d4af37" strokeWidth="1" />
            </svg>
            <span className="timex-tag-text">HERITAGE PARCHMENT ATELIER // {watch.sku}</span>
          </div>
        </div>

        {/* Header & Integrated Atmospheric Lighting Split Block */}
        <div className="header-split-row">
          <header className="exhibition-timex-header">
            <div className="timex-eyebrow">
              <span>TIMEX AMERICAN HOROLOGY // EST. 1854</span>
              <span className="sep">•</span>
              <span>REFERENCE {watch.sku}</span>
            </div>

            <h1 className="timex-main-title">{watch.model}</h1>
            <p className="timex-lead-text">{watch.tagline}</p>

            {/* Clean Horological Spec Chips */}
            <div className="timex-spec-pills-row">
              <span className="spec-pill">{watch.dimensions.caseDiameter} Case</span>
              <span className="spec-pill">{watch.movement.type}</span>
              <span className="spec-pill">{watch.movement.jewelCount} Synthetic Rubies</span>
              <span className="spec-pill">42h Power Reserve</span>
            </div>
          </header>

          {/* Integrated Atmospheric Lighting Badge */}
          <div className="header-lighting-col">
            <div className="timex-lighting-bar single-spotlight-bar">
              <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
              <div className="single-spotlight-pill">
                <span className="pill-icon">📜</span>
                <span className="pill-label">Mid-Century Drafting Spotlight</span>
                <span className="pill-sub">• Warm Caliper Focus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="timex-inspection-stage" aria-label="Watch and Macro Element Showcase">
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
            <div className="stage-visual-viewport timex-viewport">
              {viewMode === 'full-watch' ? (
                <div className="viewport-full-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${watch.image}`}
                    alt={`${watch.brand} ${watch.model}`}
                    className="viewport-full-img"
                    loading="eager"
                  />
                  <div className="viewport-caption">
                    Full Timepiece • {watch.dimensions.caseDiameter} Stainless Steel Case (Automatic Calibre • 21 Jewels)
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
              <div className="active-element-card timex-dossier-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement?.id] || '#d4af37' }}
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
                    const swatchColor = ELEMENT_SWATCH_COLORS[elem.id] || '#d4af37';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card timex-selector-card ${isSelected ? 'selected' : ''}`}
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

        {/* Interactive Automatic Winding Rotor & Kinetic Power Reserve Cockpit */}
        <section className="timex-interactive-cockpit" aria-label="Kinetic Rotor Simulator">
          <div className="rotor-panel-left">
            <div className="cockpit-title-row">
              <span className="cockpit-badge">KINETIC ENGINE</span>
              <h3 className="cockpit-title">Automatic Ball-Bearing Rotor Simulator</h3>
            </div>
            <p className="cockpit-desc">
              Every natural motion of the wrist rotates the weighted central oscillator, winding the mainspring band through reduction gears.
            </p>

            <div className="rotor-action-row">
              <button
                type="button"
                className={`btn-wind-rotor ${isWinding ? 'winding-active' : ''}`}
                onClick={handleWindRotor}
              >
                <span className="btn-icon">⚙️</span>
                <span>Oscillate Winding Rotor (+2h Reserve)</span>
              </button>
            </div>

            <div className="power-reserve-meter">
              <div className="meter-labels">
                <span className="meter-title">MAINSPRING TENSION:</span>
                <strong className="meter-val">{powerReserveHours} Hours / 42 Max ({reservePercent}%)</strong>
              </div>
              <div className="meter-bar-track">
                <div className="meter-bar-fill" style={{ width: `${reservePercent}%` }}></div>
              </div>
            </div>
          </div>

          <div className="rotor-panel-right">
            <div className="rotor-visual-disc">
              <div
                className="animated-rotor"
                style={{ transform: `rotate(${rotorRotations}deg)` }}
              >
                <svg viewBox="0 0 100 100" className="rotor-svg" aria-hidden="true">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.3" />
                  <path
                    d="M10,50 A40,40 0 0,1 90,50 L50,50 Z"
                    fill="url(#rotorGrad)"
                    stroke="#d4af37"
                    strokeWidth="1.5"
                  />
                  <circle cx="50" cy="50" r="8" fill="#14120e" stroke="#d4af37" strokeWidth="2" />
                  <circle cx="50" cy="50" r="3" fill="#e11d48" />
                  <defs>
                    <linearGradient id="rotorGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#b48a3c" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#d4af37" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#fef08a" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="rotor-subtext">BI-DIRECTIONAL ROTOR</span>
            </div>
          </div>
        </section>

        {/* Concise Design Backstory: Mid-Century Origin & Champagne Sunburst */}
        <section className="timex-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card timex-story-card">
              <span className="story-kicker">CONNECTICUT 1854 ORIGIN // GOLDEN ERA</span>
              <h2 className="story-title">Mid-Century Chronometry Heritage</h2>
              <ul className="story-list">
                <li>
                  <strong>Golden Era Proportions:</strong> 40mm dress silhouette with high-polish bezel and warm parchment champagne sunburst dial.
                </li>
                <li>
                  <strong>Proven 21-Jewel Calibre:</strong> Automatic mechanical movement boasting 42-hour continuous mainspring reserve and smooth 21,600 vph sweep.
                </li>
                <li>
                  <strong>Domed Crystal Optics:</strong> Ultra-curved acrylic crystal providing authentic warm distortion and vintage light transmission.
                </li>
              </ul>
            </div>

            <div className="story-card timex-story-card">
              <span className="story-kicker">SENSORY COLORWAY // AGED PARCHMENT</span>
              <h2 className="story-title">The Champagne Sunburst Harmony</h2>
              <ul className="story-list">
                <li>
                  <strong>Radial Brushed Guilloché:</strong> Subtle sunray dial finishing reflecting amber studio ambient light with warm golden refraction.
                </li>
                <li>
                  <strong>Diamond-Cut Gilt Indices:</strong> Faceted golden hour batons paired with mirror dauphine hands and blued mechanical balance wheel.
                </li>
                <li>
                  <strong>Jubilee Steel Drape:</strong> Fluid 5-link stainless steel bracelet offering supple wrist drape and polished mid-link brilliance.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Timepiece in Archive Transition Card */}
        {nextWatch && (
          <section className="next-timepiece-transition-section" aria-label="Next Timepiece in Archive">
            <div
              className="next-timepiece-card timex-next-card"
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

export default WatchDetailTimex;
