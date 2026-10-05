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

/**
 * 10-Sided Decagonal Chamfered Bezel Facets
 * Regular decagon: 10 facets subtending 36° each around 360° perimeter.
 * Vertices on 100x100 SVG compass (center 50,50, radius 38)
 */
const DECAGON_FACETS = [
  { id: 1, centerAngle: 0, span: '342°–18°', name: 'Zenith Apex (12H)', orientation: 'North Bevel', x1: 38.3, y1: 13.9, x2: 61.7, y2: 13.9 },
  { id: 2, centerAngle: 36, span: '18°–54°', name: 'North-East Chamfer (1H–2H)', orientation: 'Upper Right Chamfer', x1: 61.7, y1: 13.9, x2: 80.7, y2: 27.7 },
  { id: 3, centerAngle: 72, span: '54°–90°', name: 'East Flank (2H–3H)', orientation: 'Right Flank', x1: 80.7, y1: 27.7, x2: 88.0, y2: 50.0 },
  { id: 4, centerAngle: 108, span: '90°–126°', name: 'South-East Chamfer (3H–4H)', orientation: 'Lower Right Date Frame', x1: 88.0, y1: 50.0, x2: 80.7, y2: 72.3 },
  { id: 5, centerAngle: 144, span: '126°–162°', name: 'South-East Bevel (4H–5H)', orientation: 'Lower Right Lug Transition', x1: 80.7, y1: 72.3, x2: 61.7, y2: 86.1 },
  { id: 6, centerAngle: 180, span: '162°–198°', name: 'Nadir Base (6H)', orientation: 'South Bevel', x1: 61.7, y1: 86.1, x2: 38.3, y2: 86.1 },
  { id: 7, centerAngle: 216, span: '198°–234°', name: 'South-West Bevel (7H–8H)', orientation: 'Lower Left Lug Transition', x1: 38.3, y1: 86.1, x2: 19.3, y2: 72.3 },
  { id: 8, centerAngle: 252, span: '234°–270°', name: 'South-West Chamfer (8H–9H)', orientation: 'Golden Hour Chamfer', x1: 19.3, y1: 72.3, x2: 12.0, y2: 50.0 },
  { id: 9, centerAngle: 288, span: '270°–306°', name: 'West Flank (9H–10H)', orientation: 'Opposite Crown Flank', x1: 12.0, y1: 50.0, x2: 19.3, y2: 27.7 },
  { id: 10, centerAngle: 324, span: '306°–342°', name: 'North-West Chamfer (10H–11H)', orientation: 'Upper Left Chamfer', x1: 19.3, y1: 27.7, x2: 38.3, y2: 13.9 }
];

const LIGHT_PRESETS = [
  { id: 'zenith', label: 'Zenith Noon', icon: '☀️', angle: 0 },
  { id: 'azure', label: 'Azure Flank', icon: '🌊', angle: 72 },
  { id: 'golden', label: 'Golden Sunset', icon: '🌅', angle: 252 }
];

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
  const [facetAngle, setFacetAngle] = useState(0); // 0° Zenith Noon default
  const [currentDate, setCurrentDate] = useState(14);

  // Exact 10-sided decagonal geometry calculation (36° per facet, centered on 0°, 36°, etc.)
  const normalizedAngle = ((Math.round(facetAngle) % 360) + 18) % 360;
  const activeFacetIndex = Math.floor(normalizedAngle / 36);
  const activeFacet = DECAGON_FACETS[activeFacetIndex] || DECAGON_FACETS[0];

  // Ray coordinates for incident sunlight vector in SVG radar (radius 38 from center 50,50)
  const rayRad = (facetAngle * Math.PI) / 180;
  const rayX = +(50 + 38 * Math.sin(rayRad)).toFixed(1);
  const rayY = +(50 - 38 * Math.cos(rayRad)).toFixed(1);

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

        {/* Header & Integrated Atmospheric Lighting Split Block */}
        <div className="header-split-row">
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

          {/* Integrated Atmospheric Lighting Badge */}
          <div className="header-lighting-col">
            <div className="titan-lighting-bar single-spotlight-bar">
              <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
              <div className="single-spotlight-pill">
                <span className="pill-icon">💎</span>
                <span className="pill-label">Riviera Caustics Spotlight</span>
                <span className="pill-sub">• Sunlit Azure Glint</span>
              </div>
            </div>
          </div>
        </div>

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
                  <div className="viewport-img-holder">
                    <img
                      src={`${import.meta.env.BASE_URL}${watch.image}`}
                      alt={`${watch.brand} ${watch.model}`}
                      className="viewport-full-img"
                      loading="eager"
                    />
                    {/* Live Dynamic Decagonal Bezel Specular Glint */}
                    <div
                      className="deca-specular-glint"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${facetAngle}deg)`
                      }}
                      aria-hidden="true"
                    >
                      <div className="glint-sheen" />
                      <div className="glint-spark" />
                    </div>
                  </div>
                  <div className="viewport-caption">
                    Full Timepiece • {watch.dimensions.caseDiameter} Decagonal Bezel & Riviera Sunburst Dial (Quartz 3-Hand Calendar) • Facet F{activeFacet.id} Active ({activeFacet.orientation})
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

            <div className="reflector-cockpit-grid">
              <div className="reflector-controls-col">
                {/* Lighting Condition Presets */}
                <div className="deca-presets-row" role="group" aria-label="Incident Lighting Presets">
                  <span className="deca-presets-label">PRESETS:</span>
                  <div className="deca-presets-pills">
                    {LIGHT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        className={`btn-deca-preset ${facetAngle === preset.angle ? 'active' : ''}`}
                        onClick={() => setFacetAngle(preset.angle)}
                      >
                        <span className="preset-icon">{preset.icon}</span>
                        <span className="preset-text">{preset.label}</span>
                        <span className="preset-angle">{preset.angle}°</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Angle Slider */}
                <div className="angle-slider-wrap">
                  <div className="slider-label-row">
                    <span className="slider-label">INCIDENT SUNLIGHT ANGLE:</span>
                    <strong className="slider-val text-cyan">
                      {facetAngle}° • Facet N° 0{activeFacet.id} ({activeFacet.orientation})
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={facetAngle}
                    onChange={(e) => setFacetAngle(Number(e.target.value))}
                    className="deca-angle-slider"
                    aria-label="Adjust incident sunlight angle"
                  />
                </div>

                {/* Clickable Facet Snap Pills */}
                <div className="facet-indicators-strip" role="group" aria-label="Decagon Facet Snaps">
                  {DECAGON_FACETS.map((facet) => (
                    <button
                      key={facet.id}
                      type="button"
                      className={`facet-pill-btn ${activeFacet.id === facet.id ? 'facet-active' : ''}`}
                      onClick={() => setFacetAngle(facet.centerAngle)}
                      title={`Facet F${facet.id}: ${facet.name} (${facet.centerAngle}°)`}
                      aria-pressed={activeFacet.id === facet.id}
                    >
                      <span className="f-num">F{facet.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Decagon Radar Compass Visualizer */}
              <div className="reflector-radar-col">
                <div className="deca-radar-frame" title={`Decagonal Bezel Compass - Facet F${activeFacet.id} Active`}>
                  <svg className="deca-radar-svg" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                    {/* Range Rings */}
                    <circle cx="50" cy="50" r="38" stroke="rgba(56, 189, 248, 0.12)" strokeDasharray="2,2" />
                    <circle cx="50" cy="50" r="24" stroke="rgba(56, 189, 248, 0.08)" />

                    {/* Cardinal Reference Marks */}
                    <text x="50" y="7" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="'Fira Code', monospace">12H</text>
                    <text x="96" y="52" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="'Fira Code', monospace">3H</text>
                    <text x="50" y="97" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="'Fira Code', monospace">6H</text>
                    <text x="4" y="52" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="'Fira Code', monospace">9H</text>

                    {/* Decagon Base Polygon */}
                    <polygon
                      points="38.3,13.9 61.7,13.9 80.7,27.7 88.0,50.0 80.7,72.3 61.7,86.1 38.3,86.1 19.3,72.3 12.0,50.0 19.3,27.7"
                      fill="rgba(17, 29, 46, 0.75)"
                      stroke="rgba(148, 163, 184, 0.28)"
                      strokeWidth="1.5"
                    />

                    {/* Active Chamfer Edge Highlight */}
                    <line
                      x1={activeFacet.x1}
                      y1={activeFacet.y1}
                      x2={activeFacet.x2}
                      y2={activeFacet.y2}
                      stroke="#38bdf8"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />

                    {/* Incident Sunlight Ray */}
                    <line
                      x1="50"
                      y1="50"
                      x2={rayX}
                      y2={rayY}
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="3,2"
                    />

                    {/* Specular Point Sparkle at Incident Point */}
                    <circle cx={rayX} cy={rayY} r="5" fill="#38bdf8" opacity="0.35" />
                    <circle cx={rayX} cy={rayY} r="2.5" fill="#ffffff" />

                    {/* Center Hub */}
                    <circle cx="50" cy="50" r="11" fill="#0b131e" stroke="#38bdf8" strokeWidth="1.5" />
                    <text
                      x="50"
                      y="53.5"
                      textAnchor="middle"
                      fill="#38bdf8"
                      fontSize="7.5"
                      fontFamily="'Fira Code', monospace"
                      fontWeight="700"
                    >
                      F{activeFacet.id}
                    </text>
                  </svg>
                  <div className="deca-radar-caption">
                    <span className="radar-status-dot" />
                    <span>F{activeFacet.id} • {activeFacet.centerAngle}°</span>
                  </div>
                </div>
              </div>
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
