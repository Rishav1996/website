import React, { useState } from 'react';
import './WatchDeconstructedSchematic.css';

/**
 * Interactive Exploded CAD Blueprint Engine
 * Features an interactive 0%–100% explosion scrubber,
 * axonometric layer separation, CAD alignment leader lines, and engineering inspection cards.
 */
const WatchDeconstructedSchematic = ({
  watch,
  activeNode,
  onSelectNode = () => {}
}) => {
  const [explosionDepth, setExplosionDepth] = useState(0.45); // 0 = Assembled, 1 = Fully Exploded
  const current = activeNode || watch.anatomicalNodes[5]; // Default to balance organ

  const isExploded = explosionDepth > 0.05;

  return (
    <div className="cad-schematic-drawer">
      {/* Top Header & Explosion Slider */}
      <div className="cad-drawer-header">
        <div className="cad-header-left">
          <div className="cad-tier-tag">
            <span className="cad-tag-dot"></span>
            <span>{current.tier}</span>
          </div>
          <div className="cad-badge-label">{current.badge}</div>
        </div>

        {/* Master Explode / Assemble Toggle */}
        <button
          type="button"
          className={`btn-cad-explode-toggle ${isExploded ? 'active' : ''}`}
          onClick={() => setExplosionDepth((prev) => (prev > 0.1 ? 0 : 0.85))}
        >
          <span>{isExploded ? '⤡ Assemble Layers' : '⤢ Explode CAD Blueprint'}</span>
          <span className="toggle-pct">{Math.round(explosionDepth * 100)}%</span>
        </button>
      </div>

      {/* Scrubbable Explosion Depth Slider */}
      <div className="cad-explosion-slider-bar">
        <label htmlFor="cad-range" className="cad-slider-label">
          <span>Axonometric Explode Depth:</span>
          <strong className="cad-slider-val">{Math.round(explosionDepth * 100)}%</strong>
        </label>
        <input
          id="cad-range"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explosionDepth}
          onChange={(e) => setExplosionDepth(parseFloat(e.target.value))}
          className="cad-range-input"
        />
      </div>

      {/* Axonometric Exploded Blueprint Schematic Stack */}
      <div className="cad-blueprint-stack">
        <div className="blueprint-grid-bg"></div>
        <div className="cad-centerline-axis"></div>

        {watch.anatomicalNodes.map((node, idx) => {
          const isSelected = current.id === node.id;
          // Calculate exploded separation offset based on explosionDepth
          const baseOffset = (idx - 3.5) * 22; // centered
          const explodedOffset = baseOffset * (0.3 + explosionDepth * 1.4);

          return (
            <div
              key={node.id}
              className={`cad-blueprint-layer ${isSelected ? 'selected' : ''}`}
              style={{
                transform: `translateY(${explodedOffset}px)`,
                zIndex: watch.anatomicalNodes.length - idx
              }}
              onClick={() => onSelectNode(node)}
            >
              <div className="layer-cad-marker">
                <span className="cad-layer-num">{String(idx + 1).padStart(2, '0')}</span>
                <span className="cad-layer-tier">{node.tier}</span>
              </div>

              <div className="layer-cad-content">
                <strong className="layer-cad-name">{node.name}</strong>
                <span className="layer-cad-badge">{node.badge}</span>
              </div>

              {/* Leader Line when selected */}
              {isSelected && <div className="cad-active-leader-line"></div>}
            </div>
          );
        })}
      </div>

      {/* Selected Element Engineering Inspection Card */}
      <div className="cad-inspection-card">
        <div className="card-top-identity">
          <h3 className="cad-node-title">{current.name}</h3>
          <span className="cad-id-code">CAD // {current.id}</span>
        </div>

        <p className="cad-node-desc">{current.description}</p>

        {/* Engineering Specs */}
        {current.specs && (
          <div className="cad-specs-block">
            <h4 className="cad-specs-heading">ENGINEERING SPECIFICATIONS</h4>
            <div className="cad-specs-grid">
              {Object.entries(current.specs).map(([key, val]) => (
                <div key={key} className="cad-spec-item">
                  <span className="cad-k">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="cad-v">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchDeconstructedSchematic;
