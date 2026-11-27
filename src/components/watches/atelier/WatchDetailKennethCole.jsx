import React, { useState, useEffect, useRef } from 'react';
import WatchDossierSection from './WatchDossierSection';
import './WatchDetailExhibition.css';

/**
 * WatchDetailKennethCole
 * Tailored Sub-Watch Experience for Kenneth Cole KCWGL2104102MN.
 * Features:
 *  - 1080p Horological Cinema Loop (Video-First Auto-Running Experience)
 *  - The Coffee Mocha Roastery Theme
 *  - Single Authoritative Roastery Spotlight Atmosphere Bar
 *  - Single authoritative 5-element macro inspector with color dots
 *  - Full timepiece & cinema viewports
 */

// Color dots mapped to the 5 authentic macro elements
const ELEMENT_SWATCH_COLORS = {
  'element-balance': '#e11d48',       // Synthetic Ruby Pivot
  'element-gear-train': '#c5a059',    // Raw Horological Brass
  'element-chapter-ring': '#f5f2eb',  // Steamed Crema Railroad Track
  'element-case-crown': '#4a332a',    // Matte Mocha IP Steel
  'element-strap': '#2e1c14'          // Roasted Cocoa Calfskin
};

const WatchDetailKennethCole = ({
  watch,
  prevWatch = null,
  nextWatch = null,
  onSelectWatch = () => {},
  onBackToVault = () => {},
  onReturnToPortfolio = () => {}
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
        // If browser policies block unmuted autoplay prior to user interaction, fallback to muted then unmute on interaction
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
    <div className="tailored-exhibition-wrapper mood-spotlight">
      {/* Thematic Visual Background Element: Dark Roast Coffee Beans & Crema */}
      <div
        className="atelier-thematic-backdrop"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}assets/watches/backgrounds/bg_coffee_mocha.jpg)`
        }}
        aria-hidden="true"
      />
      <div className="tailored-exhibition-container">
        {/* Top Breadcrumbs & Atelier Navigation */}
        <div className="exhibition-top-bar">
          <div className="top-nav-group">
            <a
              href={`${import.meta.env.BASE_URL}watches`}
              className="btn-archive-back"
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

          <div className="roastery-theme-tag">
            <svg className="roastery-emblem-svg" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="14" stroke="#c5a059" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="16" cy="16" r="10" stroke="#c5a059" strokeWidth="1" opacity="0.6" />
              <line x1="16" y1="6" x2="16" y2="26" stroke="#c5a059" strokeWidth="1.2" opacity="0.7" />
              <line x1="6" y1="16" x2="26" y2="16" stroke="#c5a059" strokeWidth="1.2" opacity="0.7" />
              <circle cx="16" cy="16" r="2.5" fill="#e11d48" stroke="#c5a059" strokeWidth="0.8" />
              <path d="M16 8C14 12 18 18 16 24" stroke="#f5f2eb" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
            </svg>
            <span className="roastery-text">THE COFFEE MOCHA ATELIER // {watch.sku}</span>
          </div>
        </div>

        {/* Header & Integrated Atmospheric Lighting Split Block */}
        <div className="header-split-row">
          <header className="exhibition-mocha-header">
            <div className="mocha-eyebrow">
              <span>KENNETH COLE NEW YORK</span>
              <span className="sep">•</span>
              <span>REFERENCE {watch.sku}</span>
            </div>

            <h1 className="mocha-main-title">{watch.model}</h1>
            <p className="mocha-lead-text">{watch.tagline}</p>

            {/* Clean Horological Spec Chips */}
            <div className="mocha-spec-pills-row">
              <span className="spec-pill">{watch.dimensions.caseDiameter} Case</span>
              <span className="spec-pill">{watch.movement.type}</span>
              <span className="spec-pill">{watch.movement.jewelCount} Synthetic Rubies</span>
              <span className="spec-pill">{watch.materials.waterResistance.split('(')[0].trim()}</span>
            </div>
          </header>

          {/* Integrated Atmospheric Lighting Badge */}
          <div className="header-lighting-col">
            <div className="roastery-lighting-bar single-spotlight-bar">
              <span className="lighting-label">ATMOSPHERIC LIGHTING:</span>
              <div className="single-spotlight-pill">
                <span className="pill-icon">🕯️</span>
                <span className="pill-label">Roastery Spotlight</span>
                <span className="pill-sub">• Warm Amber Atelier Focus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: Single Unified Watch & Macro Element Inspection Stage */}
        <section className="element-inspection-stage" aria-label="Watch and Element Picture Showcase">
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
                Macro Elements
              </button>
            </div>

            <div className="controls-right">
              {viewMode === 'cinema' ? (
                <span className="element-indicator-text text-gold">
                  1080P MASTER CINEMA CAPTURE // 10.0S CONTINUOUS
                </span>
              ) : viewMode === 'full-watch' ? (
                <span className="element-indicator-text">
                  FULL TIMEPIECE // 44MM 316L MOCHA STEEL
                </span>
              ) : (
                <span className="element-indicator-text">
                  ELEMENT {elements.indexOf(selectedElement) + 1} OF {elements.length}: {selectedElement.name.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className="stage-split-display">
            {/* Visual Viewport Stage */}
            <div className="stage-visual-viewport">
              {viewMode === 'cinema' ? (
                <div className="viewport-cinema-wrap">
                  <div className="cinema-video-holder">
                    <video
                      ref={videoRef}
                      src={`${import.meta.env.BASE_URL}${watch.video || 'assets/watches/videos/kenneth_cole_cinema_1080p.mp4'}`}
                      poster={`${import.meta.env.BASE_URL}${watch.videoPoster || 'assets/watches/videos/kenneth_cole_cinema_poster.jpg'}`}
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
                    />
                  </div>
                  <div className="viewport-caption">
                    Full Timepiece • 44mm Matte Mocha IP Steel in Roastery Spotlight (Automatic Skeleton • 21 Jewels • 21,600 VPH)
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
                    Macro Element Crop: {selectedElement.name} • 480×480 Retina Inspection
                  </div>
                </div>
              )}
            </div>

            {/* Single Source of Truth: Element Detail Story & Selector */}
            <div className="stage-element-dossier">
              <div className="active-element-card">
                <div className="active-card-top">
                  <span
                    className="active-element-swatch-dot"
                    style={{ backgroundColor: ELEMENT_SWATCH_COLORS[selectedElement.id] || '#c5a059' }}
                  ></span>
                  <span className="element-eyebrow">ACTIVE ARCHITECTURAL ELEMENT</span>
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
                    const dotColor = ELEMENT_SWATCH_COLORS[elem.id] || '#c5a059';
                    return (
                      <div
                        key={elem.id}
                        className={`selector-item-card ${isSelected ? 'selected' : ''}`}
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

        {/* Concise Design Backstory: Manhattan & Coffee Mocha */}
        <section className="mocha-story-section" aria-label="Design Backstory">
          <div className="story-split-grid">
            <div className="story-card">
              <span className="story-kicker">MANHATTAN 1982 ORIGIN</span>
              <h2 className="story-title">Urban Architectural Transparency</h2>
              <ul className="story-list">
                <li>
                  <strong>Loft Culture:</strong> Stripping away solid walls to expose raw structural steel trusses, brick masonry, and conduits.
                </li>
                <li>
                  <strong>No Opaque Dial:</strong> The movement is exposed front-and-back as a wearable kinetic sculpture.
                </li>
                <li>
                  <strong>Visible Mechanics:</strong> The unadorned heartbeat of the balance wheel and brass gears operate in plain view.
                </li>
              </ul>
            </div>

            <div className="story-card">
              <span className="story-kicker">SENSORY COLORWAY</span>
              <h2 className="story-title">The Coffee Mocha Harmony</h2>
              <ul className="story-list">
                <li>
                  <strong>Matte Mocha IP Case:</strong> Deep, roasted chocolate finish absorbing glare across the 44mm chassis.
                </li>
                <li>
                  <strong>Steamed Crema Chapter Ring:</strong> Warm cream railroad track evoking silky espresso crema with high-contrast baton indices.
                </li>
                <li>
                  <strong>Cocoa Calfskin & Brass:</strong> Rich brown stitched leather and golden gear teeth recalling artisanal espresso boilers and roasters.
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
              className="next-timepiece-card"
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

export default WatchDetailKennethCole;
