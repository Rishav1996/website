import React, { useState } from 'react';
import './WatchDetailTitanDeca.css';

/**
 * WatchDetailTitanDeca
 * Tailored Sub-Watch Experience for Titan Classique Deca 90245SM01.
 * Features:
 *  - Riviera Deca Prism & Mediterranean Azure Theme
 *  - Thematic backdrop: sun-drenched azure water caustics & Mediterranean ripples
 *  - Single Atmospheric Lighting bar (Riviera Caustics Spotlight)
 *  - Full timepiece default viewport (filter: none, box-shadow: none)
 *  - 5 authentic macro elements with swatch dots
 *  - Interactive 10-Sided Decagonal Facet Reflector (0-360°) & Quickset Date Clicker
 */

const ELEMENT_SWATCH_COLORS = {
  'element-deca-bezel': '#e2e8f0',     // Mirror Polished Chamfer
  'element-sky-blue-dial': '#38bdf8',  // Riviera Sky Blue Sunburst
  'element-date-window': '#0284c7',    // Deep Azure Calendar Frame
  'element-faceted-crown': '#94a3b8',  // Knurled Steel Crown
  'element-link-bracelet': '#cbd5e1'   // 3-Link Solid Steel
};

const WatchDetailTitanDeca = ({
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
  const [facetAngle, setFacetAngle] = useState(45);
  const [currentDate, setCurrentDate] = useState(14);

  // Compute which of the 10 facets is catching the light (36 deg per facet)
  const activeFacetNumber = (Math.floor(facetAngle / 36) % 10) + 1;

  const handleAdvanceDate = () => {
    setCurrentDate((prev) => (prev >= 31 ? 1 : prev + 1));
  };

  return (
    <div className="titan-exhibition-wrapper">
      {/* Thematic Visual Background: Sun-Drenched Azure Caustics */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/watches/backgrounds/bg_riviera_azure.jpg)`
        }}
        aria-hidden="true"
      />

      <div className="titan-exhibition-container">
        {/* Top Breadcrumb & Navigation */}
        <div className="titan-top-bar">
          <div className="top-nav-group">
            <button type="button" className="btn-archive-back-titan" onClick={onBackToVault}>
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

          <div className="titan-theme-tag">
            <svg className="titan-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              {/* 10-sided decagon polygon */}
              <polygon
                points="16,3 23.6,5.5 28.5,11.5 28.5,20.5 23.6,26.5 16,29 8.4,26.5 3.5,20.5 3.5,11.5 8.4,5.5"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <circle cx="16" cy="16" r="5" fill="#0284c7" />
            </svg>
            <span className="titan-tag-text">RIVIERA DECA PRISM // {watch.sku}</span>
          </div>
        </div>

        {/* Clean Header Block */}
        <header className="exhibition-titan-header">
          <div className="titan-eyebrow">
            <span>TITAN MEN CLASSIQUE // GEOMETRIC REFINEMENT</span>
            <span className="sep">•</span>
            <span>REFERENCE {watch.sku}</span>
          </div>

          <h1 className="titan-main-title">{watch.model}</h1>
          <p className="titan-lead-text">{watch.tagline}</p>

          {/* Clean Horological Spec Chips */}
          <div className="titan-spec-pills-row">
            <span className="spec-pill">{watch.dimensions.caseDiameter} Decagon</span>
            <span className="spec-pill">{watch.dimensions.caseThickness} Ultra-Slim</span>
            <span className="spec-pill">High-Frequency Quartz</span>
            <span className="spec-pill">Quickset Calendar</span>
          </div>
        </header>

        {/* Single Authoritative Atmospheric Lighting: Riviera Caustics Spotlight */}
        <div className="titan-lighting-bar single-spotlight-bar">
          <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
          <div className="single-spotlight-pill">
            <span className="pill-icon">💎</span>
            <span className="pill-label">Riviera Caustics Spotlight</span>
            <span className="pill-sub">• Sunlit Azure Glint</span>
          </div>
        </div>

        {/* Interactive Decagonal Bezel Facet Reflector & Date Clicker Cockpit */}
        <section className="titan-interactive-cockpit" aria-label="Decagonal Reflector Cockpit">
          <div className="cockpit-panel-left">
            <div className="cockpit-title-row">
              <span className="cockpit-badge">PRISMATIC GEOMETRY</span>
              <h3 className="cockpit-title">10-Sided Decagonal Light Angle Reflector</h3>
            </div>
            <p className="cockpit-desc">
              Rotate the simulated light vector to observe mirror-chamfer reflections across each of the 10 precision-machined bezel facets.
            </p>

            <div className="angle-slider-wrap">
              <div className="slider-label-row">
                <span className="slider-label">INCIDENT SUNLIGHT ANGLE:</span>
                <strong className="slider-val text-cyan">{facetAngle}° (Active Mirror Facet N° 0{activeFacetNumber})</strong>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={facetAngle}
                onChange={(e) => setFacetAngle(Number(e.target.value))}
                className="deca-angle-slider"
              />
            </div>

            <div className="facet-indicators-strip">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div
                  key={num}
                  className={`facet-pill ${activeFacetNumber === num ? 'facet-active' : ''}`}
                >
                  <span className="f-num">F{num}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cockpit-panel-right">
            <div className="date-control-card">
              <span className="date-badge">QUICKSET CALENDAR</span>
              <h4 className="date-title">Date Aperture (3H)</h4>
              <p className="date-desc">Instant date jump mechanism nestled within beveled frame.</p>

              <button
                type="button"
                className="btn-advance-date"
                onClick={handleAdvanceDate}
              >
                <span className="date-box">{String(currentDate).padStart(2, '0')}</span>
                <span className="date-btn-text">Click to Jump Date (+1)</span>
              </button>
            </div>
          </div>
        </section>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="titan-inspection-stage" aria-label="Watch and Macro Element Showcase">
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
            <div className="stage-visual-viewport titan-viewport">
              {viewMode === 'full-watch' ? (
                <div className="viewport-full-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${watch.image}`}
                    alt={`${watch.brand} ${watch.model}`}
                    className="viewport-full-img"
                    loading="eager"
                  />
                  <div className="viewport-caption">
                    Full Timepiece • {watch.dimensions.caseDiameter} Decagonal Bezel & Riviera Sunburst Dial (Quartz 3-Hand Calendar)
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
              <div className="active-element-card titan-dossier-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement?.id] || '#38bdf8' }}
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
                    const swatchColor = ELEMENT_SWATCH_COLORS[elem.id] || '#38bdf8';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card titan-selector-card ${isSelected ? 'selected' : ''}`}
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

        {/* Concise Design Backstory: Deca Prism Origin & Riviera Azure */}
        <section className="titan-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card titan-story-card">
              <span className="story-kicker">GEOMETRIC REFLECTION // DECA PRISM</span>
              <h2 className="story-title">10-Sided Decagonal Architecture</h2>
              <ul className="story-list">
                <li>
                  <strong>10 Precision Facets:</strong> Distinct decagonal bezel geometry precision-machined in 316L stainless steel with alternating mirror-polished and brushed facets.
                </li>
                <li>
                  <strong>Ultra-Slim 9.8mm Profile:</strong> Contemporary dress-sport chassis engineered for effortless shirt-cuff glide and low wrist inertia.
                </li>
                <li>
                  <strong>Framed Quickset Calendar:</strong> Inset date aperture at 3 o'clock framed by micro-chamfered silver border for immediate calendar orientation.
                </li>
              </ul>
            </div>

            <div className="story-card titan-story-card">
              <span className="story-kicker">SENSORY COLORWAY // RIVIERA AZURE</span>
              <h2 className="story-title">The Sky Blue Sunburst Harmony</h2>
              <ul className="story-list">
                <li>
                  <strong>Riviera Sky Blue Dial:</strong> Vibrant sunburst dial radiating light outwards across changing ambient lighting angles.
                </li>
                <li>
                  <strong>Faceted Mirror Steel Batons:</strong> High-polish applied hour batons creating dynamic optical highlights matching the bezel facets.
                </li>
                <li>
                  <strong>Solid 3-Link Steel Integration:</strong> Ergonomic stainless steel link bracelet with dual push-button butterfly deployment clasp.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Timepiece in Archive Transition Card */}
        {nextWatch && (
          <section className="next-timepiece-transition-section" aria-label="Next Timepiece in Archive">
            <div
              className="next-timepiece-card titan-next-card"
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

export default WatchDetailTitanDeca;
