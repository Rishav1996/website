import React, { useState, useRef, useCallback } from 'react';
import './WatchOpticalLoupe.css';

/**
 * WatchOpticalLoupe
 * High-precision Watchmaker's 2.5x Optical Loupe with realistic brass knurling,
 * convex lens glare, crosshairs, and 4 macro inspection presets.
 */
const MACRO_PRESETS = [
  {
    id: 'balance-organ',
    label: 'Balance Wheel Organ',
    sub: '3 Hz / 21,600 VPH Escapement',
    x: 35,
    y: 56,
    zoom: 2.6,
    desc: 'Exposed oscillating balance wheel, flat hairspring, and synthetic ruby pallet jewel beating 6 times per second.'
  },
  {
    id: 'gear-train',
    label: 'Skeleton Gear Train',
    sub: 'Brass Pinions & Bridges',
    x: 63,
    y: 48,
    zoom: 2.6,
    desc: 'Deep openwork cutaway revealing the brass escape wheel, fourth wheel, and center pinion meshing under rhodium bridges.'
  },
  {
    id: 'railroad-track',
    label: 'Railroad Chapter Ring',
    sub: 'Cream Track & Faceted Indices',
    x: 50,
    y: 18,
    zoom: 2.4,
    desc: 'Precision printed cream outer railroad minute track with applied faceted mocha-tone hour batons and luminescent pip accents.'
  },
  {
    id: 'case-crown',
    label: 'Mocha IP Crown Guards',
    sub: '44mm 316L Stainless Steel',
    x: 87,
    y: 50,
    zoom: 2.3,
    desc: 'Matte mocha ion-plated stainless steel casework featuring architectural fluted crown guards and knurled manual winding stem.'
  }
];

const WatchOpticalLoupe = ({ watch, activeNode, onSelectNode = () => {} }) => {
  const containerRef = useRef(null);
  const [loupePos, setLoupePos] = useState({ x: 35, y: 56 }); // Default to balance wheel
  const [isHovering, setIsHovering] = useState(false);
  const [activePreset, setActivePreset] = useState(MACRO_PRESETS[0]);
  const [zoomFactor, setZoomFactor] = useState(2.6);

  const imageSrc = `${import.meta.env.BASE_URL}${watch.image}`;

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    setLoupePos({ x: xPct, y: yPct });
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const applyPreset = (preset) => {
    setActivePreset(preset);
    setLoupePos({ x: preset.x, y: preset.y });
    setZoomFactor(preset.zoom);

    // If an anatomical node corresponds, activate it
    const matchingNode = watch.anatomicalNodes.find((n) => n.id.includes(preset.id.split('-')[0]));
    if (matchingNode) {
      onSelectNode(matchingNode);
    }
  };

  return (
    <div className="optical-loupe-card">
      {/* Stage Header */}
      <div className="loupe-stage-header">
        <div className="loupe-header-title-group">
          <span className="loupe-tag">OPTICAL BENCH</span>
          <h3 className="loupe-title">Watchmaker's 2.5x Loupe</h3>
        </div>

        {/* Zoom Level Switcher */}
        <div className="loupe-zoom-pills">
          <button
            type="button"
            className={`btn-zoom-pill ${zoomFactor === 2.2 ? 'active' : ''}`}
            onClick={() => setZoomFactor(2.2)}
          >
            2.2x
          </button>
          <button
            type="button"
            className={`btn-zoom-pill ${zoomFactor === 2.6 ? 'active' : ''}`}
            onClick={() => setZoomFactor(2.6)}
          >
            2.6x Macro
          </button>
          <button
            type="button"
            className={`btn-zoom-pill ${zoomFactor === 3.2 ? 'active' : ''}`}
            onClick={() => setZoomFactor(3.2)}
          >
            3.2x Micro
          </button>
        </div>
      </div>

      {/* Interactive Watch Photo Stage with Loupe Cursor */}
      <div
        ref={containerRef}
        className="loupe-interactive-stage"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Ambient Watchmaker's Spotlight */}
        <div
          className="stage-spotlight-follow"
          style={{
            background: `radial-gradient(circle 280px at ${loupePos.x}% ${loupePos.y}%, rgba(197, 160, 89, 0.18) 0%, transparent 80%)`
          }}
        ></div>

        {/* Base Transparent Watch Image */}
        <img
          src={imageSrc}
          alt={`${watch.brand} ${watch.model}`}
          className="loupe-base-watch"
          draggable={false}
        />

        {/* Watchmaker's Physical Eye Loupe Lens */}
        <div
          className={`watchmakers-loupe-lens ${isHovering ? 'visible' : 'preset-mode'}`}
          style={{
            left: `${loupePos.x}%`,
            top: `${loupePos.y}%`
          }}
        >
          {/* Brass Bezel Ring */}
          <div className="loupe-brass-bezel"></div>
          {/* Glass Convex Glare */}
          <div className="loupe-glass-glare"></div>

          {/* Magnified Optical Viewport */}
          <div
            className="loupe-magnified-content"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
              backgroundSize: `${zoomFactor * 100}%`
            }}
          >
            {/* Crosshairs & Reticle */}
            <div className="loupe-reticle-crosshair-h"></div>
            <div className="loupe-reticle-crosshair-v"></div>
            <div className="loupe-reticle-center-circle"></div>
          </div>

          {/* Coordinate Readout */}
          <div className="loupe-coord-badge">
            {Math.round(loupePos.x)}% / {Math.round(loupePos.y)}% • {zoomFactor}X
          </div>
        </div>
      </div>

      {/* Preset Macro Chips */}
      <div className="loupe-presets-tray">
        <div className="tray-label">MACRO INSPECTION PRESETS:</div>
        <div className="presets-chips-row">
          {MACRO_PRESETS.map((preset) => {
            const isSelected = activePreset.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                className={`btn-macro-preset ${isSelected ? 'active' : ''}`}
                onClick={() => applyPreset(preset)}
              >
                <div className="preset-chip-inner">
                  <strong className="preset-name">{preset.label}</strong>
                  <span className="preset-sub">{preset.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preset Explanation */}
      <div className="loupe-active-inspection-note">
        <div className="note-icon">🔍</div>
        <div className="note-text">
          <strong>{activePreset.label}:</strong> {activePreset.desc}
        </div>
      </div>
    </div>
  );
};

export default WatchOpticalLoupe;
