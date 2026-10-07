import React, { useState, useEffect } from 'react';
import './WatchDetailPolice.css';

/**
 * WatchDetailPolice
 * Tailored Sub-Watch Experience for Police PLPEWJM0081301W Cranium Tonneau Skeleton.
 * Architecture strictly aligned with the canonical Atelier Blueprint (Lee Cooper / Titan Deca):
 *  - Top Navigation with Adjacent Timepiece Carousel buttons
 *  - Standardized Header Split Row with Integrated Atmospheric Lighting Badge
 *  - Single Unified Watch & Macro Element Inspection Stage (Left Viewport + Right 2-Card Dossier Stack)
 *  - Studio Perspective Switcher (Frontal Studio, 3/4 Dynamic Angle, Crown Flank Profile)
 *  - Interactive Cranium Aperture & Crystal Specular Scanner Overlay in Viewport
 *  - Elements Selector Tray with 38x38 preview thumbs and active element states
 *  - Interactive 1.00 Hz Calibre 05-203A Quartz Stepping Sequencer (1 Hz / 5 Hz / Halt)
 *  - Interactive 4-Corner Bezel Bolt Torque & Asymmetrical Tonneau Geometry Inspector
 *  - Concise Design Backstory: 2-Column Curated Story Split Grid
 *  - Up Next in Archive Transition Card
 *  - Zero external retail/store links
 */

const ELEMENT_SWATCH_COLORS = {
  'element-cranium-skull': '#e2e8f0',   // Frosted Silver Skull Bridge
  'element-bolted-bezel': '#94a3b8',    // 316L Brushed Steel Bezel
  'element-quartz-movement': '#e11d48', // Crimson Calibre Accent
  'element-silicone-strap': '#1e293b',  // Matte Black Traction Silicone
  'element-fluted-crown': '#cbd5e1'     // Knurled Steel Crown
};

const STUDIO_PERSPECTIVES = [
  {
    id: 'angle-front',
    label: 'Frontal Studio',
    icon: '🎯',
    image: 'assets/watches/police/police_watch_transparent.png',
    caption: 'Frontal Studio View • 42mm × 51.5mm Bolted Tonneau Skeleton'
  },
  {
    id: 'angle-perspective',
    label: '3/4 Dynamic Angle',
    icon: '📐',
    image: 'assets/watches/police/police_angle_2_transparent.png',
    caption: '3/4 Perspective • Tonneau Vault Depth & Bezel Chamfer'
  },
  {
    id: 'angle-profile',
    label: 'Crown Flank Profile',
    icon: '⚙️',
    image: 'assets/watches/police/police_angle_3_transparent.png',
    caption: 'Flank Profile • Knurled Setting Crown & Asymmetric Flank'
  }
];

const BEZEL_BOLTS = [
  {
    id: 'bolt-11h',
    label: 'Bolt 01 (11H)',
    title: 'Top-Left Socket Anchor',
    position: 'Upper-Left Bezel Flank',
    torque: '0.35 N·m Clamping Torque',
    material: '316L Austenitic Stainless Steel',
    finish: 'Concentric Satin-Brushed Face with High-Polish Mirror Chamfer',
    role: 'Anchors upper tonneau bridge plate to inner waterproof gasket housing.',
    cx: 26,
    cy: 20
  },
  {
    id: 'bolt-1h',
    label: 'Bolt 02 (1H)',
    title: 'Top-Right Socket Anchor',
    position: 'Upper-Right Bezel Flank',
    torque: '0.35 N·m Clamping Torque',
    material: '316L Austenitic Stainless Steel',
    finish: 'Concentric Satin-Brushed Face with High-Polish Mirror Chamfer',
    role: 'Secures upper crystal compression ring adjacent to 1 o’clock index.',
    cx: 74,
    cy: 20
  },
  {
    id: 'bolt-5h',
    label: 'Bolt 03 (5H)',
    title: 'Bottom-Right Socket Anchor',
    position: 'Lower-Right Lug Transition',
    torque: '0.35 N·m Clamping Torque',
    material: '316L Austenitic Stainless Steel',
    finish: 'Concentric Satin-Brushed Face with High-Polish Mirror Chamfer',
    role: 'Provides structural torsional rigidity above lower silicone strap junction.',
    cx: 74,
    cy: 80
  },
  {
    id: 'bolt-7h',
    label: 'Bolt 04 (7H)',
    title: 'Bottom-Left Socket Anchor',
    position: 'Lower-Left Lug Transition',
    torque: '0.35 N·m Clamping Torque',
    material: '316L Austenitic Stainless Steel',
    finish: 'Concentric Satin-Brushed Face with High-Polish Mirror Chamfer',
    role: 'Locks lower bezel perimeter against lateral shock and wrist impact.',
    cx: 26,
    cy: 80
  }
];

const CADENCE_MODES = [
  { id: '1hz', label: '1.00 Hz Real-Time', rateMs: 1000, desc: '32,768 Hz Quartz Division • 1 Step / Sec' },
  { id: '5hz', label: '5.00 Hz Rapid Sweep', rateMs: 200, desc: 'High-Speed Calibration • 5 Steps / Sec' },
  { id: 'halt', label: 'Stealth Halt', rateMs: null, desc: 'Motor Coil Disengaged • Zero Battery Drain' }
];



const WatchDetailPolice = ({
  watch,
  prevWatch = null,
  nextWatch = null,
  onSelectWatch = () => {},
  onBackToVault = () => {},
  _onReturnToPortfolio = () => {}
}) => {
  const elements = watch?.elements || [];
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [viewMode, setViewMode] = useState('full-watch'); // 'full-watch' | 'element'
  const [selectedPerspective, setSelectedPerspective] = useState(STUDIO_PERSPECTIVES[0]);

  // Quartz Stepping Drive State
  const [cadenceMode, setCadenceMode] = useState('1hz');
  const [stepTick, setStepTick] = useState(0);
  const [secondCount, setSecondCount] = useState(26);

  // Bezel Bolt Inspector State
  const [selectedBolt, setSelectedBolt] = useState(BEZEL_BOLTS[0]);

  const currentCadence = CADENCE_MODES.find((c) => c.id === cadenceMode) || CADENCE_MODES[0];

  // Precision Quartz Stepping Motor Rhythm
  useEffect(() => {
    if (!currentCadence.rateMs) return undefined;
    const interval = setInterval(() => {
      setStepTick((prev) => (prev + 1) % 6);
      setSecondCount((prev) => (prev + 1) % 60);
    }, currentCadence.rateMs);
    return () => clearInterval(interval);
  }, [currentCadence.rateMs]);

  return (
    <div className="police-exhibition-wrapper">
      {/* Thematic Visual Background: Authentic Dark Urban Carbon & Brushed Steel */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/watches/backgrounds/bg_urban_rebel.jpg)`
        }}
        aria-hidden="true"
      />

      <div className="police-exhibition-container">
        {/* Top Breadcrumb & Navigation */}
        <div className="police-top-bar">
          <div className="top-nav-group">
            <button type="button" className="btn-archive-back-police" onClick={onBackToVault}>
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

          <div className="police-theme-tag">
            <svg className="police-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M10 6C10 4.89543 10.8954 4 12 4H20C21.1046 4 22 4.89543 22 6V12C22 15.3137 19.3137 18 16 18C12.6863 18 10 15.3137 10 12V6Z"
                stroke="#e11d48"
                strokeWidth="1.5"
              />
              <circle cx="13" cy="11" r="1.5" fill="#e11d48" />
              <circle cx="19" cy="11" r="1.5" fill="#e11d48" />
              <path d="M13 22H19V26H13V22Z" stroke="#94a3b8" strokeWidth="1.2" />
            </svg>
            <span className="police-tag-text">CRANIUM FORGE // {watch.sku}</span>
          </div>
        </div>

        {/* Header & Integrated Atmospheric Lighting Split Block */}
        <div className="header-split-row">
          <header className="exhibition-police-header">
            <div className="police-eyebrow">
              <span>POLICE // PL-FW 25 NEWNESS ORDER</span>
              <span className="sep">•</span>
              <span>REFERENCE {watch.sku}</span>
              <span className="sep">•</span>
              <span className="acquisition-badge">2026 ACQUISITION</span>
            </div>

            <h1 className="police-main-title">{watch.model}</h1>
            <p className="police-lead-text">{watch.tagline}</p>

            {/* Clean Horological Spec Chips */}
            <div className="police-spec-pills-row">
              <span className="spec-pill">{watch.dimensions.caseDiameter} Tonneau</span>
              <span className="spec-pill">{watch.movement.type}</span>
              <span className="spec-pill">50M Water Resistance</span>
              <span className="spec-pill">4-Bolt Bezel</span>
              <span className="spec-pill highlight-pill">Acquired 2026</span>
            </div>
          </header>

          {/* Integrated Atmospheric Lighting Badge */}
          <div className="header-lighting-col">
            <div className="police-lighting-bar single-spotlight-bar">
              <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
              <div className="single-spotlight-pill">
                <span className="pill-icon">⚡</span>
                <span className="pill-label">Cranium Forge Spotlight</span>
                <span className="pill-sub">• Crimson Rebel Beam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="police-inspection-stage" aria-label="Watch and Macro Element Showcase">
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

            {viewMode === 'full-watch' ? (
              <div className="controls-center-perspectives">
                <span className="controls-label">STUDIO PERSPECTIVE:</span>
                <div className="perspective-btn-group">
                  {STUDIO_PERSPECTIVES.map((persp) => (
                    <button
                      key={persp.id}
                      type="button"
                      className={`btn-persp-pill ${selectedPerspective.id === persp.id ? 'active' : ''}`}
                      onClick={() => setSelectedPerspective(persp)}
                    >
                      <span className="persp-icon">{persp.icon}</span>
                      <span>{persp.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="controls-right">
              {viewMode === 'full-watch' ? (
                <div className="telemetry-pill-strip">
                  <span className="telemetry-chip">316L TONNEAU</span>
                  <span className="telemetry-chip">FROSTED SKULL BRIDGE</span>
                  <span className="telemetry-chip highlight">1.00 HZ QUARTZ</span>
                </div>
              ) : (
                <span className="element-indicator-text">
                  ELEMENT {elements.indexOf(selectedElement) + 1} OF {elements.length}: {selectedElement?.name?.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className="stage-split-display">
            {/* Left: Viewport Stage */}
            <div className="stage-visual-viewport police-viewport">
              {viewMode === 'full-watch' ? (
                <div className="viewport-full-wrap">
                  <div className="viewport-img-holder">
                    <img
                      src={`${import.meta.env.BASE_URL}${selectedPerspective.image}`}
                      alt={`${watch.brand} ${watch.model} - ${selectedPerspective.label}`}
                      className="viewport-full-img"
                      loading="eager"
                    />
                  </div>

                  <div className="viewport-caption">
                    {selectedPerspective.caption} • Calibre 05-203A Quartz ({cadenceMode !== 'halt' ? `${currentCadence.label} Active • Tick :${String(secondCount).padStart(2, '0')}` : 'Motor Coil Halted'})
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
                    Macro Element Crop: {selectedElement?.name} • 480×480 High-Resolution Retina Inspection
                  </div>
                </div>
              )}
            </div>

            {/* Right: Architectural Dossier Stack (2 Separate Cards) */}
            <div className="stage-element-dossier">
              {/* Card 1: Active Element Hero Dossier */}
              <div className="active-element-card police-dossier-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement?.id] || '#e11d48' }}
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
                    const swatchColor = ELEMENT_SWATCH_COLORS[elem.id] || '#e11d48';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card police-selector-card ${isSelected ? 'selected' : ''}`}
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

        {/* Interactive Calibre 05-203A Quartz Stepping Sequencer & Bezel Bolt Inspector Cockpit */}
        <section className="police-interactive-cockpit" aria-label="Quartz Stepping & Bezel Bolt Cockpit">
          {/* Left Panel: 1.00 Hz Calibre 05-203A Stepping Drive */}
          <div className="police-panel-left">
            <div className="cockpit-title-row">
              <span className="cockpit-badge">{currentCadence.label.toUpperCase()}</span>
              <h3 className="cockpit-title">Calibre 05-203A Quartz Stepping Drive</h3>
            </div>
            <p className="cockpit-desc">
              Regulated by a 32,768 Hz quartz crystal oscillator, the stepping motor advances the high-torque gear transmission in crisp mechanical pulses.
            </p>

            <div className="cadence-controls-strip">
              <span className="strip-label">DRIVE CADENCE:</span>
              <div className="cadence-btn-group">
                {CADENCE_MODES.map((cm) => (
                  <button
                    key={cm.id}
                    type="button"
                    className={`btn-cadence-pill ${cadenceMode === cm.id ? 'active' : ''}`}
                    onClick={() => setCadenceMode(cm.id)}
                  >
                    {cm.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pulse-meter-row">
              <div className="second-counter-badge">
                <span className="sc-label">STEP TICK</span>
                <strong className="sc-val">:{String(secondCount).padStart(2, '0')}</strong>
              </div>

              <div className="tick-visualizer">
                {[0, 1, 2, 3, 4, 5].map((beat) => (
                  <span
                    key={beat}
                    className={`beat-bar ${cadenceMode !== 'halt' && stepTick === beat ? 'active' : ''}`}
                  ></span>
                ))}
              </div>
            </div>

            <div className="escapement-stats-strip">
              <div className="stat-unit">
                <span className="stat-label">OSCILLATOR:</span>
                <strong className="stat-val text-crimson">32,768 Hz Quartz</strong>
              </div>
              <div className="stat-unit">
                <span className="stat-label">DRIVE COIL:</span>
                <span className="stat-val">{cadenceMode !== 'halt' ? 'High-Torque Pulse' : 'Halted'}</span>
              </div>
              <div className="stat-unit">
                <span className="stat-label">TRANSMISSION:</span>
                <span className="stat-val text-steel">Calibre 05-203A</span>
              </div>
            </div>
          </div>

          {/* Right Panel: 4-Corner Bezel Bolt Torque & Tonneau Geometry Inspector */}
          <div className="police-panel-right">
            <div className="tonneau-geometry-card">
              <div className="geo-header-row">
                <span className="geo-badge">BEZEL BOLT TORQUE INSPECTOR</span>
                <span className="geo-model-pill">42.0 × 51.5 mm Tonneau</span>
              </div>

              {/* Interactive SVG Tonneau Bolt Radar Diagram */}
              <div className="bolt-inspector-interactive-area">
                <div className="bolt-svg-radar-wrap">
                  <svg className="tonneau-chassis-svg" viewBox="0 0 100 100" fill="none">
                    {/* Tonneau Outer Barrel Contour */}
                    <path
                      d="M 32 12 Q 50 8 68 12 Q 86 16 88 50 Q 86 84 68 88 Q 50 92 32 88 Q 14 84 12 50 Q 14 16 32 12 Z"
                      stroke="rgba(225, 29, 72, 0.35)"
                      strokeWidth="1.8"
                      fill="rgba(15, 19, 26, 0.75)"
                    />
                    {/* Inner Dial Bezel Boundary */}
                    <path
                      d="M 35 20 Q 50 17 65 20 Q 78 24 80 50 Q 78 76 65 80 Q 50 83 35 80 Q 22 76 20 50 Q 22 24 35 20 Z"
                      stroke="rgba(148, 163, 184, 0.4)"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                    />
                    {/* Center Skull Silhouette Hint */}
                    <circle cx="50" cy="46" r="10" stroke="rgba(225, 29, 72, 0.3)" strokeWidth="1" />
                    <rect x="46" y="55" width="8" height="6" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" />

                    {/* 4 Corner Hex Bolt Anchors */}
                    {BEZEL_BOLTS.map((b) => {
                      const isSelected = selectedBolt.id === b.id;
                      return (
                        <g
                          key={b.id}
                          className={`bolt-svg-anchor ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedBolt(b)}
                        >
                          <circle
                            cx={b.cx}
                            cy={b.cy}
                            r={isSelected ? 6 : 4.5}
                            fill={isSelected ? '#e11d48' : '#1e293b'}
                            stroke={isSelected ? '#ffffff' : '#94a3b8'}
                            strokeWidth={isSelected ? 1.8 : 1.2}
                          />
                          {/* Hex socket center */}
                          <polygon
                            points={`${b.cx},${b.cy - 2} ${b.cx + 1.8},${b.cy - 1} ${b.cx + 1.8},${b.cy + 1} ${b.cx},${b.cy + 2} ${b.cx - 1.8},${b.cy + 1} ${b.cx - 1.8},${b.cy - 1}`}
                            fill={isSelected ? '#ffffff' : '#475569'}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Selected Bolt Engineering Details */}
                <div className="selected-bolt-dossier">
                  <div className="bolt-selector-pills">
                    {BEZEL_BOLTS.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className={`btn-bolt-pill ${selectedBolt.id === b.id ? 'active' : ''}`}
                        onClick={() => setSelectedBolt(b)}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <div className="bolt-spec-body">
                    <h5 className="bolt-spec-title">{selectedBolt.title}</h5>
                    <div className="bolt-spec-meta">
                      <span className="b-spec-chip text-crimson">{selectedBolt.torque}</span>
                      <span className="b-spec-chip">{selectedBolt.material}</span>
                    </div>
                    <p className="bolt-spec-desc">{selectedBolt.role}</p>
                    <div className="bolt-spec-finish">
                      <strong>Finish:</strong> {selectedBolt.finish}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Concise Design Backstory: 2-Column Curated Story Split Grid */}
        <section className="police-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card police-story-card">
              <span className="story-kicker">STREET HOROLOGY // NON-CONFORMIST ORIGIN</span>
              <h2 className="story-title">Bolted Tonneau Industrial Anatomy</h2>
              <ul className="story-list">
                <li>
                  <strong>Bolted Top Bezel:</strong> Four structural corner hex socket bolts anchoring the brushed stainless steel top plate in raw architectural styling.
                </li>
                <li>
                  <strong>Asymmetrical Contours:</strong> 42mm × 51.5mm barrel silhouette contoured to eliminate wrist pressure points while commanding high-impact presence.
                </li>
                <li>
                  <strong>Engineered Traction Strap:</strong> High-density 28mm matte black silicone band with longitudinal grip channels and signed steel pin buckle.
                </li>
              </ul>
            </div>

            <div className="story-card police-story-card">
              <span className="story-kicker">SENSORY COLORWAY // CRANIUM SKELETON</span>
              <h2 className="story-title">Silver Skull Motif & 2026 Acquisition</h2>
              <ul className="story-list">
                <li>
                  <strong>Openwork Cranium Framework:</strong> Frosted silver skull bridge plate exposing internal mechanical apertures and center hand drive.
                </li>
                <li>
                  <strong>Embedded Crystal Accents:</strong> Precision micro-stud stone hour plots accentuating the industrial gothic edge against dark bridge cutaways.
                </li>
                <li>
                  <strong>2026 Collection Addition:</strong> Rishav's latest timepiece addition in active rotation, celebrating bold non-conformist streetwear horology.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Timepiece in Archive Transition Card */}
        {nextWatch && (
          <section className="next-timepiece-transition-section" aria-label="Next Timepiece in Archive">
            <div
              className="next-timepiece-card police-next-card"
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

export default WatchDetailPolice;
