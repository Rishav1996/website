import React, { useState, useEffect, useRef } from 'react';
import WatchDossierSection from './WatchDossierSection';
import './WatchDetailPolice.css';

/**
 * WatchDetailPolice
 * Tailored Sub-Watch Experience for Police PLPEWJM0081301W Cranium Tonneau Skeleton.
 * Features:
 *  - 1080p Horological Cinema Loop (10s Continuous Master Take)
 *  - Top Navigation with Adjacent Timepiece Carousel buttons
 *  - Standardized Header Split Row with Integrated Atmospheric Lighting Badge
 *  - Single Unified Watch & Macro Element Inspection Stage (Left Viewport + Right 2-Card Dossier Stack)
 *  - Studio Perspective Switcher (Frontal Studio, 3/4 Dynamic Angle, Crown Flank Profile)
 *  - Elements Selector Tray with 38x38 preview thumbs and active element states
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
  const [viewMode, setViewMode] = useState('cinema'); // Video-First: Defaults to auto-running 1080p cinema loop
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false); // Unmuted by default per user specification
  const [selectedPerspective, setSelectedPerspective] = useState(STUDIO_PERSPECTIVES[0]);

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
            <a
              href={`${import.meta.env.BASE_URL}watches`}
              className="btn-archive-back-police"
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
              {viewMode === 'cinema' ? (
                <span className="element-indicator-text" style={{ color: 'var(--watch-accent, #e11d48)' }}>
                  1080P MASTER CINEMA CAPTURE // 10.0S CONTINUOUS
                </span>
              ) : viewMode === 'full-watch' ? (
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
              {viewMode === 'cinema' ? (
                <div className="viewport-cinema-wrap">
                  <div className="cinema-video-holder">
                    <video
                      ref={videoRef}
                      src={`${import.meta.env.BASE_URL}${watch.video || 'assets/watches/videos/police_cinema_1080p.mp4'}`}
                      poster={`${import.meta.env.BASE_URL}${watch.videoPoster || 'assets/watches/videos/police_cinema_poster.jpg'}`}
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
                      src={`${import.meta.env.BASE_URL}${selectedPerspective.image}`}
                      alt={`${watch.brand} ${watch.model} - ${selectedPerspective.label}`}
                      className="viewport-full-img"
                      loading="eager"
                    />
                  </div>

                  <div className="viewport-caption">
                    {selectedPerspective.caption} • Calibre 05-203A Quartz (1.00 Hz Stepping Drive)
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

        {/* Full Mechanical Specification & Horological Analysis Dossier (AEO & GEO) */}
        <WatchDossierSection watch={watch} />

        {/* Next Timepiece in Archive Transition Card */}
        {nextWatch && (
          <section className="next-timepiece-transition-section" aria-label="Next Timepiece in Archive">
            <a
              href={`${import.meta.env.BASE_URL}watches/${nextWatch.id}`}
              className="next-timepiece-card police-next-card"
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

export default WatchDetailPolice;
