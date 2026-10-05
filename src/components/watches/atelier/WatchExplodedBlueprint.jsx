import React, { useState } from 'react';
import './WatchExplodedBlueprint.css';

/**
 * WatchExplodedBlueprint
 * Interactive 0%–100% scrubbable axonometric CAD explosion engine
 * disassembling all 8 verified anatomical layers along the central stem axis.
 */
const WatchExplodedBlueprint = ({
  watch,
  activeNode,
  onSelectNode = () => {}
}) => {
  const [explosionDepth, setExplosionDepth] = useState(0.5); // 0 = Assembled, 1 = Fully Exploded
  const current = activeNode || watch.anatomicalNodes[5]; // Default to balance wheel organ

  const isExploded = explosionDepth > 0.08;

  const toggleExplosion = () => {
    setExplosionDepth((prev) => (prev > 0.15 ? 0 : 0.85));
  };

  return (
    <div className="blueprint-schematic-card">
      {/* Top Header */}
      <div className="blueprint-card-header">
        <div className="header-meta-left">
          <div className="blueprint-tier-badge">
            <span className="tier-dot"></span>
            <span>{current.tier}</span>
          </div>
          <span className="blueprint-code-tag">{current.badge}</span>
        </div>

        {/* Master Assemble / Explode Toggle */}
        <button
          type="button"
          className={`btn-blueprint-toggle ${isExploded ? 'active' : ''}`}
          onClick={toggleExplosion}
        >
          <span>{isExploded ? '⤡ Assemble Layers' : '⤢ Explode CAD Blueprint'}</span>
          <span className="toggle-pct-pill">{Math.round(explosionDepth * 100)}%</span>
        </button>
      </div>

      {/* Scrubbable Explosion Slider */}
      <div className="blueprint-slider-bar">
        <div className="slider-label-row">
          <span className="slider-label">AXONOMETRIC EXPLOSION DEPTH:</span>
          <strong className="slider-value">{Math.round(explosionDepth * 100)}% EXPLODED</strong>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explosionDepth}
          onChange={(e) => setExplosionDepth(parseFloat(e.target.value))}
          className="blueprint-range-slider"
          aria-label="Explosion Depth Slider"
        />
        <div className="slider-ticks-row">
          <span>0% (Assembled)</span>
          <span>50% (Expanded)</span>
          <span>100% (Fully Deconstructed)</span>
        </div>
      </div>

      {/* Axonometric Blueprint Stack */}
      <div className="blueprint-axonometric-stage">
        {/* Subtle CAD Grid Background */}
        <div className="cad-stage-grid"></div>
        {/* Central Winding Stem & Centerline Pin Axis */}
        <div className="cad-stem-centerline">
          <span className="axis-cap top"></span>
          <span className="axis-label">STEM AXIS</span>
          <span className="axis-cap bottom"></span>
        </div>

        {/* 8 Layer Wafers */}
        <div className="blueprint-layers-column">
          {watch.anatomicalNodes.map((node, idx) => {
            const isSelected = current.id === node.id;
            // Calculate dynamic vertical translation based on explosionDepth
            const baseCenterOffset = (idx - 3.5) * 24;
            const dynamicTranslateY = baseCenterOffset * (0.35 + explosionDepth * 1.45);

            return (
              <div
                key={node.id}
                className={`cad-layer-wafer ${isSelected ? 'selected' : ''}`}
                style={{
                  transform: `translateY(${dynamicTranslateY}px)`,
                  zIndex: watch.anatomicalNodes.length - idx
                }}
                onClick={() => onSelectNode(node)}
              >
                <div className="wafer-marker">
                  <span className="wafer-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="wafer-tier">{node.tier}</span>
                </div>

                <div className="wafer-info">
                  <strong className="wafer-name">{node.name}</strong>
                  <span className="wafer-badge">{node.badge}</span>
                </div>

                {/* Active Leader Line Indicator */}
                {isSelected && (
                  <div className="wafer-leader-line">
                    <span className="leader-pin"></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Engineering Tolerances Inspection Drawer */}
      <div className="blueprint-inspection-drawer">
        <div className="drawer-header-row">
          <div className="drawer-title-group">
            <span className="drawer-eyebrow">ACTIVE ANATOMICAL LAYER // CAD {current.id}</span>
            <h4 className="drawer-title">{current.name}</h4>
          </div>
          <span className="drawer-tier-pill">{current.tier}</span>
        </div>

        <p className="drawer-description">{current.description}</p>

        {/* Engineering Tolerances Grid */}
        {current.specs && (
          <div className="drawer-specs-box">
            <span className="specs-box-title">ENGINEERING SPECIFICATIONS & TOLERANCES</span>
            <div className="specs-box-grid">
              {Object.entries(current.specs).map(([key, val]) => (
                <div key={key} className="spec-field">
                  <span className="spec-k">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="spec-v">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchExplodedBlueprint;
