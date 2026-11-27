import React, { useState, useEffect, useRef } from 'react';
import WatchDossierSection from './WatchDossierSection';
import './WatchDetailD1Milano.css';

/**
 * WatchDetailD1Milano
 * Tailored Sub-Watch Experience for D1 Milano Polycarbon Urban Camo (PCBJ37).
 * Theme: The Milanese Urban Camo & Stealth Polymer Atelier.
 * Features:
 *  - 1080p Horological Cinema Loop (10s Continuous Master Take, Video-First Auto-Running)
 *  - Top Navigation with Adjacent Timepiece Carousel buttons
 *  - Standardized Header Split Row with Integrated Atmospheric Lighting Badge
 *  - Single Unified Watch & Macro Element Inspection Stage (Left Viewport + Right 2-Card Dossier Stack)
 *  - Studio Perspective Switcher (Frontal Studio, 3/4 Clasp Angle, 316L Caseback)
 *  - 5-Element Macro Selector Tray with 38x38 preview thumbs & swatch dots
 *  - Concise Design Backstory: 2-Column Curated Story Split Grid
 *  - AEO/GEO Technical Dossier & Up Next Transition Card
 */

const ELEMENT_SWATCH_COLORS = {
  'element-camo-bezel': '#8fa89b',       // Muted Urban Camo Sage
  'element-matte-dial': '#a1a1aa',       // Matte Grey Brass
  'element-ar-crystal-hands': '#7c9cc0', // Blue AR Crystal Ice Tint
  'element-camo-bracelet': '#71717a',    // Integrated Polymer Links
  'element-butterfly-clasp': '#e4e4e7'   // 316L Hidden Butterfly Clasp
};

const STUDIO_PERSPECTIVES = [
  {
    id: 'angle-front',
    label: 'Frontal Studio',
    icon: '◈',
    image: 'assets/watches/d1milano/d1milano_watch_transparent.png',
    caption: 'Frontal Studio View • 40.5 mm × 8.8 mm Urban Camo Polycarbonate Monoblock'
  },
  {
    id: 'angle-clasp',
    label: '3/4 Clasp Angle',
    icon: '⬡',
    image: 'assets/watches/d1milano/d1milano_angle_2_transparent.png',
    caption: '3/4 Perspective • Integrated Tapered Links & Concealed 316L Butterfly Clasp'
  },
  {
    id: 'angle-caseback',
    label: '316L Caseback',
    icon: '⚙',
    image: 'assets/watches/d1milano/d1milano_angle_3_transparent.png',
    caption: 'Caseback Architecture • 4-Screw 316L Stainless Steel Plate (5 ATM / Japanese Movement)'
  }
];

const WatchDetailD1Milano = ({
  watch,
  prevWatch = null,
  nextWatch = null,
  onSelectWatch = () => {},
  onBackToVault = () => {},
  _onReturnToPortfolio = () => {}
}) => {
  const elements = watch?.elements || [];
  const hasCinemaVideo = Boolean(watch?.video);

  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [viewMode, setViewMode] = useState(hasCinemaVideo ? 'cinema' : 'full-watch');
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [selectedPerspective, setSelectedPerspective] = useState(STUDIO_PERSPECTIVES[0]);

  // Sync video playback when cinema loop is present
  useEffect(() => {
    if (!hasCinemaVideo) return undefined;
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
  }, [hasCinemaVideo, isVideoMuted]);

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
    <div className="d1milano-exhibition-wrapper">
      {/* Thematic Visual Background: Milanese Brutalist Basalt & Urban Camo */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}${watch.backgroundImage || 'assets/watches/backgrounds/bg_milanese_camo.jpg'})`
        }}
        aria-hidden="true"
      />

      <div className="d1milano-exhibition-container">
        {/* Top Breadcrumb & Navigation */}
        <div className="d1milano-top-bar">
          <div className="top-nav-group">
            <a
              href={`${import.meta.env.BASE_URL}watches`}
              className="btn-archive-back-d1milano"
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

          <div className="d1milano-theme-tag">
            <svg className="d1milano-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              {/* Signature 8-Sided D1 Milano Octagon */}
              <polygon
                points="11,3 21,3 29,11 29,21 21,29 11,29 3,21 3,11"
                stroke="#8fa89b"
                strokeWidth="1.6"
              />
              <circle cx="16" cy="16" r="6.5" stroke="#7c9cc0" strokeWidth="1.3" />
              <line x1="16" y1="16" x2="20" y2="12.5" stroke="#e4e4e7" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="d1milano-tag-text">MILANESE CAMO LAB // {watch.sku}</span>
          </div>
        </div>

        {/* Header & Integrated Atmospheric Lighting Split Block */}
        <div className="header-split-row">
          <header className="exhibition-d1milano-header">
            <div className="d1milano-eyebrow">
              <span>D1 MILANO // POLYCARBON URBAN CAMO</span>
              <span className="sep">•</span>
              <span>REFERENCE {watch.sku}</span>
              <span className="sep">•</span>
              <span className="acquisition-badge">2026 ACQUISITION</span>
            </div>

            <h1 className="d1milano-main-title">{watch.model}</h1>
            <p className="d1milano-lead-text">{watch.tagline}</p>

            {/* Clean Horological Spec Chips */}
            <div className="d1milano-spec-pills-row">
              <span className="spec-pill">{watch.dimensions.caseDiameter} Octagon</span>
              <span className="spec-pill">8.8 mm Ultra-Slim</span>
              <span className="spec-pill">44 g Featherweight</span>
              <span className="spec-pill">TMI VJ21 Quartz</span>
              <span className="spec-pill">50M Water Resistance</span>
              <span className="spec-pill highlight-pill">Acquired 2026</span>
            </div>
          </header>

          {/* Integrated Atmospheric Lighting Badge */}
          <div className="header-lighting-col">
            <div className="d1milano-lighting-bar single-spotlight-bar">
              <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
              <div className="single-spotlight-pill">
                <span className="pill-icon">◈</span>
                <span className="pill-label">Milanese Studio Spotlight</span>
                <span className="pill-sub">• Matte Soft-Touch &amp; AR Blue Glint</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="d1milano-inspection-stage" aria-label="Watch and Macro Element Showcase">
          <div className="stage-controls-bar">
            <div className="controls-left">
              <span className="controls-label">VIEWPORT:</span>
              {hasCinemaVideo && (
                <button
                  type="button"
                  className={`btn-mode-pill ${viewMode === 'cinema' ? 'active' : ''}`}
                  onClick={() => setViewMode('cinema')}
                >
                  <span className="cinema-icon">▶</span> 10s Cinema Loop (1080p)
                </button>
              )}
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

            {viewMode === 'full-watch' && (
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
            )}

            <div className="controls-right">
              {viewMode === 'cinema' && hasCinemaVideo ? (
                <span className="element-indicator-text" style={{ color: 'var(--watch-accent, #8fa89b)' }}>
                  1080P MASTER CINEMA CAPTURE // 10.0S CONTINUOUS
                </span>
              ) : viewMode === 'full-watch' ? (
                <div className="telemetry-pill-strip">
                  <span className="telemetry-chip">44 G POLYCARBON</span>
                  <span className="telemetry-chip">BLUE AR COAT</span>
                  <span className="telemetry-chip highlight">1.00 HZ VJ21</span>
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
            <div className="stage-visual-viewport d1milano-viewport">
              {viewMode === 'cinema' && hasCinemaVideo ? (
                <div className="viewport-cinema-wrap">
                  <div className="cinema-video-holder">
                    <video
                      ref={videoRef}
                      src={`${import.meta.env.BASE_URL}${watch.video || 'assets/watches/videos/d1milano_cinema_1080p.mp4'}`}
                      poster={`${import.meta.env.BASE_URL}${watch.videoPoster || 'assets/watches/videos/d1milano_cinema_poster.jpg'}`}
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
                        title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                        aria-label={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                      >
                        {isVideoPlaying ? '⏸' : '▶'}
                      </button>
                      <button
                        type="button"
                        className="cinema-control-btn"
                        onClick={() => setIsVideoMuted((prev) => !prev)}
                        title={isVideoMuted ? 'Unmute Sound' : 'Mute Sound'}
                        aria-label={isVideoMuted ? 'Unmute Sound' : 'Mute Sound'}
                      >
                        {isVideoMuted ? '🔇' : '🔊'}
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
                    {selectedPerspective.caption} • Seiko TMI VJ21 Quartz (44g Soft-Touch Polycarbonate)
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
              <div className="active-element-card d1milano-dossier-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement?.id] || '#8fa89b' }}
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
                    const swatchColor = ELEMENT_SWATCH_COLORS[elem.id] || '#8fa89b';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card d1milano-selector-card ${isSelected ? 'selected' : ''}`}
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
        <section className="d1milano-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card d1milano-story-card">
              <span className="story-kicker">ITALIAN GEOMETRY // MILANESE ORIGIN</span>
              <h2 className="story-title">Octagonal Soft-Touch Monoblock</h2>
              <ul className="story-list">
                <li>
                  <strong>Ultra-Slim 8.8 mm Chassis:</strong> Precision-molded 40.5 mm octagonal geometry delivering crisp architectural chamfers with effortless cuff clearance.
                </li>
                <li>
                  <strong>44 g Featherweight Ergonomics:</strong> Soft-touch polycarbonate case and tapered 25–17 mm integrated links eliminate wrist fatigue across full-day wear.
                </li>
                <li>
                  <strong>316L Hidden Butterfly Clasp:</strong> Concealed brushed stainless steel deployment hardware preserving uninterrupted bracelet geometry.
                </li>
              </ul>
            </div>

            <div className="story-card d1milano-story-card">
              <span className="story-kicker">SENSORY SURFACE // URBAN CAMO &amp; BLUE AR</span>
              <h2 className="story-title">Fractal Camouflage &amp; Optical Clarity</h2>
              <ul className="story-list">
                <li>
                  <strong>Continuous Monochrome Camo:</strong> Organic grey fractal pattern wrapping continuously across bezel, matte grey brass dial, and bracelet links.
                </li>
                <li>
                  <strong>Blue Anti-Reflective Glass:</strong> Flat mineral crystal coated with an anti-glare blue optical filter for sharp contrast against tonal baton indices.
                </li>
                <li>
                  <strong>Seiko TMI VJ21 Reliability:</strong> Low-profile Japanese quartz engine paired with 50 meters (5 ATM) water resistance in active 2026 rotation.
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
              className="next-timepiece-card d1milano-next-card"
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

export default WatchDetailD1Milano;
