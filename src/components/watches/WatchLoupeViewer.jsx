import React, { useState, useRef, useCallback } from 'react';
import './WatchLoupeViewer.css';

/**
 * Watchmaker's Precision Optical Loupe (2.5x Micro-Inspection)
 * Uses high-resolution authentic photography of Kenneth Cole KCWGL2104102MN.
 */
const WatchLoupeViewer = ({ watch, activeNode = null, onSelectNode = () => {} }) => {
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 }); // percentage
  const [zoomLevel, setZoomLevel] = useState(2.4);
  const containerRef = useRef(null);

  const imgSrc = `${import.meta.env.BASE_URL}${watch.image}`;

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  }, []);

  const handleMouseEnter = () => setLoupeActive(true);
  const handleMouseLeave = () => setLoupeActive(false);

  // Quick Preset Focus
  const focusOnCoord = (x, y, zoom = 2.8) => {
    setLoupePos({ x, y });
    setZoomLevel(zoom);
    setLoupeActive(true);
  };

  return (
    <div className="watch-loupe-card">
      <div className="loupe-top-bar">
        <div className="loupe-badge">
          <span className="loupe-pulse"></span>
          <span className="loupe-title">WATCHMAKER’S OPTICAL LOUPE // 2.5X MACRO</span>
        </div>

        <div className="loupe-preset-buttons">
          <button
            type="button"
            className="btn-loupe-preset"
            onClick={() => focusOnCoord(42, 47, 3.2)}
            title="Focus on 3 Hz Balance Wheel at 8-9 o’clock"
          >
            Balance Wheel
          </button>
          <button
            type="button"
            className="btn-loupe-preset"
            onClick={() => focusOnCoord(52, 38, 3.0)}
            title="Focus on Brass Center Wheel & Barrel"
          >
            Gear Train
          </button>
          <button
            type="button"
            className="btn-loupe-preset"
            onClick={() => focusOnCoord(30, 28, 2.5)}
            title="Focus on Cream Railroad Chapter Ring"
          >
            Chapter Ring
          </button>
          <button
            type="button"
            className="btn-loupe-preset"
            onClick={() => focusOnCoord(84, 48, 2.4)}
            title="Focus on Mocha IP Crown Guards"
          >
            Crown Guards
          </button>
        </div>
      </div>

      {/* Main Photographic Frame with Hotspots */}
      <div
        ref={containerRef}
        className="loupe-image-frame"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imgSrc}
          alt={`${watch.brand} ${watch.model} (${watch.sku})`}
          className="watch-authentic-photo"
          loading="eager"
        />

        {/* CAD Hotspot Overlay Pins */}
        {watch.anatomicalNodes.map((node) => {
          const isSelected = activeNode?.id === node.id;
          return (
            <button
              key={node.id}
              type="button"
              className={`cad-hotspot-pin ${isSelected ? 'selected' : ''}`}
              style={{ left: `${node.spotX}%`, top: `${node.spotY}%` }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node);
                focusOnCoord(node.spotX, node.spotY, 2.8);
              }}
              title={node.name}
            >
              <span className="pin-pulse"></span>
              <span className="pin-core"></span>
              <span className="pin-tooltip">{node.name.split(' ')[0]}</span>
            </button>
          );
        })}

        {/* Circular Optical Loupe Lens */}
        {loupeActive && (
          <div
            className="optical-loupe-glass"
            style={{
              left: `${loupePos.x}%`,
              top: `${loupePos.y}%`,
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
              backgroundSize: `${zoomLevel * 100}%`
            }}
          >
            <div className="loupe-reticle-crosshair"></div>
            <div className="loupe-magnification-readout">{zoomLevel.toFixed(1)}x</div>
          </div>
        )}
      </div>

      <div className="loupe-footer-hint">
        <span className="hint-icon">🔍</span>
        <span>Hover over dial for optical magnification or click CAD hotspot pins to inspect mechanical nodes.</span>
      </div>
    </div>
  );
};

export default WatchLoupeViewer;
