import React, { useState } from 'react';
import WatchLoupeViewer from './WatchLoupeViewer';
import WatchDeconstructedSchematic from './WatchDeconstructedSchematic';
import WatchLiveTimekeeper from './WatchLiveTimekeeper';
import WatchSpecSheet from './WatchSpecSheet';
import WatchStory from './WatchStory';
import './WatchDetailView.css';

const WatchDetailView = ({
  watch,
  onBackToVault = () => {},
  onBackToPortfolio = () => {}
}) => {
  const [activeNode, setActiveNode] = useState(watch.anatomicalNodes[5]); // Default: 3 Hz balance organ

  // Inline CSS variables from watch.theme to power dynamic luxury themer
  const dynamicThemeStyles = {
    '--watch-accent': watch.theme.accentPrimary,
    '--watch-secondary': watch.theme.accentSecondary,
    '--watch-ruby': watch.theme.accentRuby,
    '--watch-bg-deep': watch.theme.bgDeep,
    '--watch-bg-surface': watch.theme.bgSurface,
    '--watch-border': watch.theme.borderAccent,
    '--watch-cream': watch.theme.creamText
  };

  return (
    <div className="watch-detail-view-wrapper" style={dynamicThemeStyles}>
      <div className="watch-detail-container">
        {/* Top Breadcrumbs */}
        <div className="detail-top-breadcrumbs">
          <div className="breadcrumb-actions">
            <button type="button" className="btn-detail-nav" onClick={onBackToVault}>
              <span className="arrow">←</span>
              <span>Back to Collection Vault</span>
            </button>
            <button type="button" className="btn-detail-nav secondary" onClick={onBackToPortfolio}>
              <span>Portfolio</span>
            </button>
          </div>

          <div className="detail-vault-tag">
            <span className="vault-tag-dot"></span>
            <span className="vault-tag-code">
              {watch.brand} // {watch.sku}
            </span>
          </div>
        </div>

        {/* Watch Identity Header */}
        <header className="detail-identity-header">
          <div className="identity-left">
            <div className="identity-eyebrow">
              <span>{watch.brand}</span>
              <span className="sep">//</span>
              <span>{watch.category}</span>
            </div>

            <h1 className="detail-title">{watch.model}</h1>
            <p className="detail-tagline">{watch.tagline}</p>

            {/* Badges Ribbon */}
            <div className="detail-badges-ribbon">
              <div className="detail-badge">
                <span className="db-k">SKU</span>
                <span className="db-v">{watch.sku}</span>
              </div>
              <div className="detail-badge">
                <span className="db-k">CHASSIS</span>
                <span className="db-v">{watch.dimensions.caseDiameter} • Mocha IP</span>
              </div>
              <div className="detail-badge">
                <span className="db-k">CALIBER</span>
                <span className="db-v">{watch.movement.type.split('(')[0].trim()}</span>
              </div>
              <div className="detail-badge">
                <span className="db-k">FREQUENCY</span>
                <span className="db-v">{watch.movement.beatRate.split('/')[0].trim()}</span>
              </div>
              <div className="detail-badge highlight">
                <span className="db-k">JEWELS</span>
                <span className="db-v">{watch.movement.jewelCount} Synthetic Rubies</span>
              </div>
            </div>
          </div>
        </header>

        {/* Live Synchronized Mechanical Timekeeper Bar */}
        <WatchLiveTimekeeper watch={watch} />

        {/* Section: Authentic Visuals & CAD Deconstruction */}
        <section className="detail-interactive-section">
          <div className="section-head-cluster">
            <span className="section-eyebrow">OPTICAL LOUPE & ANATOMICAL CAD BLUEPRINT</span>
            <h2 className="section-title">Authentic Micro-Inspection & Anatomy</h2>
            <p className="section-sub">
              Hover over the high-resolution photograph to engage the <strong>Watchmaker's 2.5x Optical Loupe</strong>, or select CAD hotspot pins to inspect the authentic rhodium skeleton bridges, exposed 3 Hz balance organ, and matte mocha IP case guards.
            </p>
          </div>

          <div className="detail-interactive-grid">
            {/* Left: Authentic Photo + Optical Loupe */}
            <div className="viewer-col">
              <WatchLoupeViewer
                watch={watch}
                activeNode={activeNode}
                onSelectNode={(node) => setActiveNode(node)}
              />
            </div>

            {/* Right: Deconstructed Schematic CAD Drawer */}
            <div className="schematic-col">
              <WatchDeconstructedSchematic
                watch={watch}
                activeNode={activeNode}
                onSelectNode={(node) => setActiveNode(node)}
              />
            </div>
          </div>
        </section>

        {/* Technical Fact-Sheet */}
        <WatchSpecSheet watch={watch} />

        {/* Engineering & Horology Philosophy Story */}
        <WatchStory watch={watch} />
      </div>
    </div>
  );
};

export default WatchDetailView;
