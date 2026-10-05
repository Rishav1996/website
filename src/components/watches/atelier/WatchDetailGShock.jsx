import React, { useState } from 'react';
import './WatchDetailGShock.css';

/**
 * WatchDetailGShock
 * Tailored Sub-Watch Experience for Casio G-Shock GA-B2100LUU-8A "CasiOak".
 * Features:
 *  - Tactical Carbon Foundry & Tough Solar Theme
 *  - Thematic backdrop: brutalist concrete & tactical coordinate grid
 *  - Single Atmospheric Lighting bar (Tactical Concrete Foundry)
 *  - Full timepiece default viewport (filter: none, box-shadow: none)
 *  - 5 authentic macro elements with swatch dots
 *  - Interactive Tough Solar Lux Charging Simulator & Super Illuminator Double LED Light toggle
 */

const ELEMENT_SWATCH_COLORS = {
  'element-octagonal-bezel': '#f59e0b', // Solar Amber
  'element-mode-subdial': '#38bdf8',     // Bluetooth Cyan HUD
  'element-inverted-lcd': '#94a3b8',     // High-Contrast LCD Silver
  'element-lume-hands': '#22c55e',       // Neobrite Phosphor Green
  'element-resin-strap': '#64748b'       // Bio-Based Resin Slate
};

const LUX_PRESETS = [
  { id: 'indoor', label: 'Indoor Fluorescent', lux: '500 LUX', charge: 'Trickle Reserve', rate: '+1 hr run/3 hr exp' },
  { id: 'overcast', label: 'Overcast Daylight', lux: '10,000 LUX', charge: 'Moderate Charge', rate: '+8 hr run/1 hr exp' },
  { id: 'sunlight', label: 'Direct Solar Noon', lux: '50,000 LUX', charge: 'Full Rapid Charge', rate: 'Full Capacity in 8 hrs' }
];

const WatchDetailGShock = ({
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
  const [activeLux, setActiveLux] = useState('overcast');
  const [isSuperIlluminatorOn, setIsSuperIlluminatorOn] = useState(false);

  const currentLux = LUX_PRESETS.find((p) => p.id === activeLux) || LUX_PRESETS[1];

  return (
    <div className={`gshock-exhibition-wrapper ${isSuperIlluminatorOn ? 'led-active' : ''}`}>
      {/* Thematic Visual Background: Brutalist Concrete & Coordinate Grid */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/watches/backgrounds/bg_tactical_concrete.jpg)`
        }}
        aria-hidden="true"
      />

      <div className="gshock-exhibition-container">
        {/* Top Breadcrumb & Navigation */}
        <div className="gshock-top-bar">
          <div className="top-nav-group">
            <button type="button" className="btn-archive-back-gshock" onClick={onBackToVault}>
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

          <div className="gshock-theme-tag">
            <svg className="gshock-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="4" fill="#38bdf8" />
              <line x1="16" y1="3" x2="16" y2="29" stroke="#64748b" strokeWidth="0.8" strokeDasharray="2 2" />
            </svg>
            <span className="gshock-tag-text">TACTICAL CARBON FOUNDRY // {watch.sku}</span>
          </div>
        </div>

        {/* Clean Header Block */}
        <header className="exhibition-gshock-header">
          <div className="gshock-eyebrow">
            <span>CASIO G-SHOCK // 2100 SERIES</span>
            <span className="sep">•</span>
            <span>REFERENCE {watch.sku}</span>
          </div>

          <h1 className="gshock-main-title">{watch.model}</h1>
          <p className="gshock-lead-text">{watch.tagline}</p>

          {/* Clean Horological Spec Chips */}
          <div className="gshock-spec-pills-row">
            <span className="spec-pill">{watch.dimensions.caseDiameter} Carbon Guard</span>
            <span className="spec-pill">Module 5689 Tough Solar</span>
            <span className="spec-pill">Bluetooth Link</span>
            <span className="spec-pill">{watch.materials.waterResistance.split('(')[0].trim()}</span>
          </div>
        </header>

        {/* Single Authoritative Atmospheric Lighting: Tactical Concrete Foundry */}
        <div className="gshock-lighting-bar single-spotlight-bar">
          <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
          <div className="single-spotlight-pill">
            <span className="pill-icon">🔦</span>
            <span className="pill-label">Tactical Concrete Foundry</span>
            <span className="pill-sub">• Low-Glare Slate Focus</span>
          </div>
        </div>

        {/* Interactive Tough Solar Lux Simulator & Super Illuminator Cockpit */}
        <section className="gshock-interactive-cockpit" aria-label="Tough Solar & Light Simulator">
          <div className="cockpit-panel-left">
            <div className="cockpit-title-row">
              <span className="cockpit-badge">SOLAR HARVEST</span>
              <h3 className="cockpit-title">Tough Solar Light Absorption Simulator</h3>
            </div>
            <p className="cockpit-desc">
              Simulate ambient lux intensity across the shadow-dispersing solar dial plate and observe module charging efficiency.
            </p>

            <div className="lux-preset-buttons">
              {LUX_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`btn-lux-pill ${activeLux === p.id ? 'active' : ''}`}
                  onClick={() => setActiveLux(p.id)}
                >
                  <span className="lux-val">{p.lux}</span>
                  <span className="lux-name">{p.label}</span>
                </button>
              ))}
            </div>

            <div className="lux-status-strip">
              <div className="status-col">
                <span className="col-label">CHARGE STATE:</span>
                <strong className="col-val text-amber">{currentLux.charge}</strong>
              </div>
              <div className="status-col">
                <span className="col-label">CONVERSION RATE:</span>
                <span className="col-val">{currentLux.rate}</span>
              </div>
              <div className="status-col battery-indicator">
                <span className="col-label">CAPACITOR:</span>
                <div className="battery-levels">
                  <span className="bat-lvl lvl-l active">L</span>
                  <span className="bat-lvl lvl-m active">M</span>
                  <span className={`bat-lvl lvl-h ${activeLux !== 'indoor' ? 'active' : ''}`}>H</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cockpit-panel-right">
            <div className="led-control-wrap">
              <span className="led-badge">DOUBLE LED</span>
              <h4 className="led-title">Super Illuminator</h4>
              <p className="led-desc">Activates high-luminance white LED array across dial and LCD.</p>
              <button
                type="button"
                className={`btn-toggle-led ${isSuperIlluminatorOn ? 'btn-active' : ''}`}
                onClick={() => setIsSuperIlluminatorOn(!isSuperIlluminatorOn)}
              >
                <span className="led-bulb-icon">{isSuperIlluminatorOn ? '💡' : '🔦'}</span>
                <span>{isSuperIlluminatorOn ? 'LED Backlight Active' : 'Engage Super Illuminator'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="gshock-inspection-stage" aria-label="Watch and Macro Element Showcase">
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
            <div className="stage-visual-viewport gshock-viewport">
              {viewMode === 'full-watch' ? (
                <div className="viewport-full-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${watch.image}`}
                    alt={`${watch.brand} ${watch.model}`}
                    className="viewport-full-img"
                    loading="eager"
                  />
                  <div className="viewport-caption">
                    Full Timepiece • {watch.dimensions.caseDiameter} Carbon Guard Chassis (Module 5689 Tough Solar)
                  </div>
                  {isSuperIlluminatorOn && <div className="super-illuminator-glow"></div>}
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
              <div className="active-element-card gshock-dossier-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement?.id] || '#f59e0b' }}
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
                    const swatchColor = ELEMENT_SWATCH_COLORS[elem.id] || '#f59e0b';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card gshock-selector-card ${isSelected ? 'selected' : ''}`}
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

        {/* Concise Design Backstory: Brutalist Origin & Tactical Concrete */}
        <section className="gshock-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card gshock-story-card">
              <span className="story-kicker">BRUTALIST ORIGIN // 1983 TO CASIOAK</span>
              <h2 className="story-title">Carbon Core Guard Architecture</h2>
              <ul className="story-list">
                <li>
                  <strong>Monocoque Shield:</strong> Fine carbon-fiber-reinforced resin monocoque protecting the internal Module 5689 against high-impact deceleration.
                </li>
                <li>
                  <strong>Octagonal Geometry:</strong> Iconic 1983 DW-5000C heritage distilled into an ultra-slim 11.9mm profile with structural bezel ridges.
                </li>
                <li>
                  <strong>200M Marine Rating:</strong> Hermetic ISO-grade water resistance ready for amphibious tactical deployment and torrential conditions.
                </li>
              </ul>
            </div>

            <div className="story-card gshock-story-card">
              <span className="story-kicker">TACTICAL COLORWAY // DESERT FOUNDRY</span>
              <h2 className="story-title">The Tactical Concrete Harmony</h2>
              <ul className="story-list">
                <li>
                  <strong>Monochromatic Sand-Grey:</strong> Muted desert concrete bio-based resin chassis engineered to eliminate specular glare and reflections.
                </li>
                <li>
                  <strong>Tough Solar Harvesting:</strong> Shadow-dispersing solar dial converting ambient indoor and sunlight into perpetual electrical reserve.
                </li>
                <li>
                  <strong>Dual Illuminator & Neobrite:</strong> High-output double LED system paired with phospho-reactive faceted hands for zero-lux tactical legibility.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Timepiece in Archive Transition Card */}
        {nextWatch && (
          <section className="next-timepiece-transition-section" aria-label="Next Timepiece in Archive">
            <div
              className="next-timepiece-card gshock-next-card"
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

export default WatchDetailGShock;
