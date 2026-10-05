import React, { useState, useEffect, useRef } from 'react';
import './WatchDetailFastrack.css';

/**
 * WatchDetailFastrack
 * Tailored Sub-Watch Experience for Fastrack Opulence Chronograph NT3315KM01.
 * Features:
 *  - Tailored Theme: The Obsidian Eclipse & Celestial Horizon Atelier
 *  - 24-Hour Sun & Moon Diurnal Disc Slider (Rotates Aperture Disc & Shifts Ambient Celestial Horizon)
 *  - Dedicated Chronograph Stopwatch Cockpit (2H Crimson Trigger + 4H Reset)
 *  - Single authoritative 5-element macro inspector with color dots
 */
// Color dots mapped to the 5 authentic macro elements
const ELEMENT_SWATCH_COLORS = {
  'element-sun-moon': '#f59e0b',       // Solar Gold
  'element-crimson-pusher': '#ef4444', // Racing Crimson
  'element-subdials': '#1a1c23',       // 3D Carbon
  'element-hands-indices': '#ffffff',  // Stark Lume White
  'element-bracelet-links': '#94a3b8'  // Anthracite PVD Metal
};

const WatchDetailFastrack = ({
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

  // --- 24-Hour Celestial Sun & Moon Slider State (0 to 24h, default 12 Noon) ---
  const [orbitHour, setOrbitHour] = useState(12);

  // Compute disc rotation angle: 12 noon = 0 deg (Sun peak), 00/24 = 180 deg (Moon peak)
  const discDeg = ((orbitHour - 12) / 24) * 360;

  // Derive atmospheric lighting phase from slider position
  let currentPhase = 'day';
  let phaseTitle = 'SOLAR ZENITH';
  let phaseDesc = 'Golden Sun positioned at peak noon in the 24-hour aperture.';
  if (orbitHour >= 9 && orbitHour <= 15) {
    currentPhase = 'day';
    phaseTitle = 'SOLAR ZENITH';
    phaseDesc = 'Golden Sun positioned at peak noon in the 24-hour aperture.';
  } else if ((orbitHour > 15 && orbitHour <= 20) || (orbitHour >= 5 && orbitHour < 9)) {
    currentPhase = 'twilight';
    phaseTitle = 'TWILIGHT HORIZON';
    phaseDesc = 'Twilight transition between daytime solar brilliance and evening dusk.';
  } else {
    currentPhase = 'midnight';
    phaseTitle = 'STEALTH MIDNIGHT';
    phaseDesc = 'Crescent Moon & Constellations aligned with nocturnal luminescence.';
  }

  const formattedHour = `${String(Math.floor(orbitHour)).padStart(2, '0')}:00`;

  // --- Interactive Chronograph Stopwatch State ---
  const [chronoRunning, setChronoRunning] = useState(false);
  const [chronoMs, setChronoMs] = useState(0);
  const timerRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    if (chronoRunning) {
      lastTimeRef.current = performance.now();
      timerRef.current = setInterval(() => {
        const now = performance.now();
        const delta = now - lastTimeRef.current;
        lastTimeRef.current = now;
        setChronoMs((prev) => prev + delta);
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [chronoRunning]);

  const handleStartStop = () => {
    setChronoRunning((prev) => !prev);
  };

  const handleReset = () => {
    setChronoRunning(false);
    setChronoMs(0);
  };

  // Format Chrono Time (MM:SS.mm)
  const totalSeconds = Math.floor(chronoMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((chronoMs % 1000) / 100);
  const formattedChrono = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;

  return (
    <div className={`fastrack-exhibition-wrapper phase-${currentPhase}`}>
      {/* Thematic Visual Background Element: Solar Eclipse Corona & Constellations */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/watches/backgrounds/bg_celestial_eclipse.jpg)`
        }}
        aria-hidden="true"
      />
      <div className="fastrack-exhibition-container">
        {/* Top Breadcrumb & Navigation */}
        <div className="fastrack-top-bar">
          <div className="top-nav-group">
            <button type="button" className="btn-archive-back-fastrack" onClick={onBackToVault}>
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

          <div className="eclipse-theme-tag">
            <svg className="eclipse-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="14" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.8" />
              <path d="M16 4C19 8 19 14 16 20C13 14 13 8 16 4Z" fill="#f59e0b" opacity="0.9" />
              <circle cx="25" cy="9" r="2.5" fill="#ef4444" />
              <circle cx="16" cy="16" r="2" fill="#ffffff" />
            </svg>
            <span className="eclipse-tag-text">THE OBSIDIAN ECLIPSE ATELIER // {watch.sku}</span>
          </div>
        </div>

        {/* Header & Integrated Atmospheric Lighting Split Block */}
        <div className="header-split-row">
          <header className="exhibition-fastrack-header">
            <div className="fastrack-eyebrow">
              <span>FASTRACK OPULENCE COLLECTION</span>
              <span className="sep">•</span>
              <span>REFERENCE {watch.sku}</span>
            </div>

            <h1 className="fastrack-main-title">{watch.model}</h1>
            <p className="fastrack-lead-text">{watch.tagline}</p>

            {/* Clean Horological Spec Chips */}
            <div className="fastrack-spec-pills-row">
              <span className="spec-pill">{watch.dimensions.caseDiameter} Case</span>
              <span className="spec-pill">{watch.movement.type}</span>
              <span className="spec-pill">Sun & Moon 24H Complication</span>
              <span className="spec-pill">{watch.materials.waterResistance.split('(')[0].trim()}</span>
            </div>
          </header>

          {/* Integrated Atmospheric Lighting Badge */}
          <div className="header-lighting-col">
            <div className="fastrack-lighting-bar single-spotlight-bar">
              <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
              <div className="single-spotlight-pill">
                <span className="pill-icon">🌒</span>
                <span className="pill-label">Obsidian Eclipse Spotlight</span>
                <span className="pill-sub">• Celestial Amber Atelier Focus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="fastrack-inspection-stage" aria-label="Watch and Macro Showcase">
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
            <div className="stage-visual-viewport fastrack-viewport">
              {viewMode === 'full-watch' ? (
                <div className="viewport-full-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${watch.image}`}
                    alt={`${watch.brand} ${watch.model}`}
                    className="viewport-full-img"
                  />
                  <div className="viewport-caption">
                    Full Timepiece • 44.5mm Stealth Anthracite PVD Case & Metal Bracelet ({phaseTitle} • {formattedHour})
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
                    Macro Element Crop: {selectedElement.name} • 480×480 High-Resolution Inspection
                  </div>
                </div>
              )}
            </div>

            {/* Single Source of Truth: Element Detail Dossier & Selector */}
            <div className="stage-element-dossier">
              <div className="active-element-card fastrack-dossier-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement.id] || '#ffffff' }}
                  ></span>
                  <span className="element-eyebrow">ACTIVE COMPLICATION / HARDWARE</span>
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
                    const dotColor = ELEMENT_SWATCH_COLORS[elem.id] || '#ffffff';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card fastrack-selector-card ${isSelected ? 'selected' : ''}`}
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

        {/* Dual Instrument Cockpit Grid: 24H Diurnal Slider + Chronograph Stopwatch */}
        <div className="fastrack-dual-cockpit-grid">
          {/* Interactive 24-Hour Sun & Moon Diurnal Dial Slider */}
          <section className="celestial-slider-card" aria-label="Sun and Moon Dial Slider">
            <div className="celestial-slider-header">
              <div className="celestial-title-row">
                <span className="celestial-label">24-HOUR SUN & MOON DIURNAL SLIDER:</span>
                <div className="celestial-readout-badge">
                  <span className="time-digit">{formattedHour}</span>
                  <span className="sep">•</span>
                  <span className="phase-pill">{phaseTitle}</span>
                </div>
              </div>

              <div className="celestial-presets-row">
                <button
                  type="button"
                  className={`btn-preset-pill ${orbitHour === 12 ? 'active' : ''}`}
                  onClick={() => setOrbitHour(12)}
                >
                  <span>☀️ Noon (12:00)</span>
                </button>
                <button
                  type="button"
                  className={`btn-preset-pill ${orbitHour === 18 ? 'active' : ''}`}
                  onClick={() => setOrbitHour(18)}
                >
                  <span>🌗 Dusk (18:00)</span>
                </button>
                <button
                  type="button"
                  className={`btn-preset-pill ${orbitHour === 0 ? 'active' : ''}`}
                  onClick={() => setOrbitHour(0)}
                >
                  <span>🌙 Midnight (00:00)</span>
                </button>
              </div>
            </div>

            <div className="celestial-slider-body">
              {/* Micro Rotating Sun & Moon Disc Graphic */}
              <div className="celestial-disc-viewport" title={`Disc angle: ${Math.round(discDeg)}°`}>
                <div
                  className="celestial-disc-rotating"
                  style={{ transform: `rotate(${discDeg}deg)` }}
                >
                  <span className="disc-sun">☀️</span>
                  <span className="disc-moon">🌙</span>
                </div>
              </div>

              {/* 24-Hour Range Slider Input */}
              <div className="celestial-range-wrap">
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={orbitHour}
                  onChange={(e) => setOrbitHour(Number(e.target.value))}
                  className="celestial-range-input"
                  aria-label="24-Hour Sun & Moon Orbit Slider"
                />
                <div className="celestial-ticks-row">
                  <span>00:00 (Night)</span>
                  <span>06:00 (Dawn)</span>
                  <span>12:00 (Noon)</span>
                  <span>18:00 (Dusk)</span>
                  <span>24:00 (Night)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Chronograph Stopwatch Cockpit Simulator */}
          <section className="fastrack-chrono-cockpit-bar" aria-label="Chronograph Simulator">
            <div className="chrono-cockpit-card-unified">
              <div className="cockpit-left">
                <span className="cockpit-kicker">CHRONOGRAPH STOPWATCH SIMULATOR</span>
                <div className="chrono-digits-wrap">
                  <span className="chrono-digits">{formattedChrono}</span>
                  <span className="chrono-unit">ELAPSED</span>
                  <span className={`status-pill ${chronoRunning ? 'running' : 'idle'}`}>
                    {chronoRunning ? 'TIMING ACTIVE' : chronoMs > 0 ? 'PAUSED' : 'READY'}
                  </span>
                </div>
              </div>

              <div className="chrono-pushers-row">
                <button
                  type="button"
                  className={`btn-pusher crimson-start-btn ${chronoRunning ? 'active-timing' : ''}`}
                  onClick={handleStartStop}
                  title="Click to Start / Stop Chronograph"
                >
                  <span className="pusher-dot"></span>
                  <span>{chronoRunning ? 'Stop (2H)' : 'Start (2H Trigger)'}</span>
                </button>

                <button
                  type="button"
                  className="btn-pusher reset-btn"
                  onClick={handleReset}
                  disabled={chronoMs === 0}
                  title="Click to Reset to Zero"
                >
                  <span>Reset (4H)</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Concise Design Narrative: Terrestrial Speed & Celestial Horizon */}
        <section className="fastrack-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card fastrack-story-card">
              <span className="story-kicker">TERRESTRIAL TIMING</span>
              <h2 className="story-title">Millisecond Chronograph Architecture</h2>
              <ul className="story-list">
                <li>
                  <strong>Racing Crimson Pusher:</strong> Dedicated 2 o’clock anodized red trigger giving immediate visual hierarchy to start/stop timing.
                </li>
                <li>
                  <strong>Multi-Tier 3D Dial:</strong> Concentric-grooved sunken registers tracking elapsed chronograph minutes and seconds.
                </li>
                <li>
                  <strong>Quartz Precision:</strong> Multi-motor gear trains providing deterministic split-second accuracy without mechanical variance.
                </li>
              </ul>
            </div>

            <div className="story-card fastrack-story-card">
              <span className="story-kicker">COSMIC HORIZON</span>
              <h2 className="story-title">The 24-Hour Sun & Moon Cycle</h2>
              <ul className="story-list">
                <li>
                  <strong>Celestial Subdial:</strong> A rotating 24-hour diurnal disc linking rapid split-second human activity with planetary daylight and nightfall.
                </li>
                <li>
                  <strong>Stealth Anthracite Case:</strong> 44.5mm PVD ion-plated alloy chassis paired with solid steel links that absorb ambient light.
                </li>
                <li>
                  <strong>High-Contrast Lume:</strong> Stark white skeleton hands and faceted baton markers engineered for immediate nighttime legibility.
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

export default WatchDetailFastrack;
