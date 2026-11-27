import React, { useState, useEffect, useRef } from 'react';
import WatchDossierSection from './WatchDossierSection';
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
 *  - 1080p Horological Cinema Loop (10s Continuous Master Take)
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
  _onReturnToPortfolio = () => {}
}) => {
  const elements = watch?.elements || [];
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [viewMode, setViewMode] = useState('cinema'); // Video-First: Defaults to auto-running 1080p cinema loop
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false); // Unmuted by default per user specification

  useEffect(() => {
    // Unmuted auto-play protocol with graceful interaction fallback
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }

    const handleInteraction = () => {
      if (videoRef.current && !isVideoMuted) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isVideoMuted]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
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
            <a
              href={`${import.meta.env.BASE_URL}watches`}
              className="btn-archive-back-titan"
              onClick={(e) => {
                e.preventDefault();
                onBackToVault();
              }}
              title="Return to Horological Collection Vault"
            >
              <span className="arrow">←</span>
              <span>Vault Archive</span>
            </a>
            {prevWatch && (
              <a
                href={`${import.meta.env.BASE_URL}watches/${prevWatch.id}`}
                className="btn-adjacent-timepiece"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectWatch(prevWatch.id);
                }}
                title={`Previous: ${prevWatch.brand} ${prevWatch.model}`}
              >
                <span>← {prevWatch.brand}</span>
              </a>
            )}
            {nextWatch && (
              <a
                href={`${import.meta.env.BASE_URL}watches/${nextWatch.id}`}
                className="btn-adjacent-timepiece"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectWatch(nextWatch.id);
                }}
                title={`Next: ${nextWatch.brand} ${nextWatch.model}`}
              >
                <span>{nextWatch.brand} →</span>
              </a>
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
                className={`btn-mode-pill ${viewMode === 'cinema' ? 'active' : ''}`}
                onClick={() => setViewMode('cinema')}
              >
                <span className="cinema-icon">▶</span> 10s Cinema Loop (1080p)
              </button>
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
              {viewMode === 'cinema' ? (
                <span className="element-indicator-text" style={{ color: 'var(--watch-accent, #38bdf8)' }}>
                  1080P MASTER CINEMA CAPTURE // 10.0S CONTINUOUS
                </span>
              ) : viewMode === 'full-watch' ? (
                <span className="element-indicator-text">
                  FULL TIMEPIECE // {watch.dimensions.caseDiameter} DECAGONAL
                </span>
              ) : (
                <span className="element-indicator-text">
                  ELEMENT {elements.indexOf(selectedElement) + 1} OF {elements.length}: {selectedElement?.name?.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className="stage-split-display">
            {/* Left: Viewport Stage */}
            <div className="stage-visual-viewport titan-viewport">
              {viewMode === 'cinema' ? (
                <div className="viewport-cinema-wrap">
                  <div className="cinema-video-holder">
                    <video
                      ref={videoRef}
                      src={`${import.meta.env.BASE_URL}${watch.video || 'assets/watches/videos/titan_cinema_1080p.mp4'}`}
                      poster={`${import.meta.env.BASE_URL}${watch.videoPoster || 'assets/watches/videos/titan_cinema_poster.jpg'}`}
                      className="viewport-cinema-video"
                      autoPlay
                      loop
                      muted={isVideoMuted}
                      playsInline
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                    />
                    <div className="cinema-overlay-controls">
                      <button
                        type="button"
                        className="cinema-control-btn"
                        onClick={handleTogglePlay}
                        title={isVideoPlaying ? "Pause Video" : "Play Video"}
                        aria-label={isVideoPlaying ? "Pause Video" : "Play Video"}
                      >
                        {isVideoPlaying ? "⏸" : "▶"}
                      </button>
                      <button
                        type="button"
                        className="cinema-control-btn"
                        onClick={() => setIsVideoMuted((prev) => !prev)}
                        title={isVideoMuted ? "Unmute Sound" : "Mute Sound"}
                        aria-label={isVideoMuted ? "Unmute Sound" : "Mute Sound"}
                      >
                        {isVideoMuted ? "🔇" : "🔊"}
                      </button>
                      <span className="cinema-badge-1080p">1080p • 10s MASTER TAKE</span>
                    </div>
                  </div>
                </div>
              ) : viewMode === 'full-watch' ? (
                <div className="viewport-full-wrap">
                  <div className="viewport-img-holder">
                    <img
                      src={`${import.meta.env.BASE_URL}${watch.image}`}
                      alt={`${watch.brand} ${watch.model}`}
                      className="viewport-full-img"
                      loading="eager"
                    />
                  </div>
                  <div className="viewport-caption">
                    Full Timepiece • {watch.dimensions.caseDiameter} Decagonal Bezel &amp; Riviera Sunburst Dial (Quartz 3-Hand Calendar)
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

        {/* Full Mechanical Specification & Horological Analysis Dossier (AEO & GEO) */}
        <WatchDossierSection watch={watch} />

        {/* Next Timepiece in Archive Transition Card */}
        {nextWatch && (
          <section className="next-timepiece-transition-section" aria-label="Next Timepiece in Archive">
            <a
              href={`${import.meta.env.BASE_URL}watches/${nextWatch.id}`}
              className="next-timepiece-card titan-next-card"
              onClick={(e) => {
                e.preventDefault();
                onSelectWatch(nextWatch.id);
              }}
              title={`Inspect Next Timepiece: ${nextWatch.brand} ${nextWatch.model}`}
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
                  width="180"
                  height="180"
                />
              </div>
            </a>
          </section>
        )}
      </div>
    </div>
  );
};

export default WatchDetailTitanDeca;
