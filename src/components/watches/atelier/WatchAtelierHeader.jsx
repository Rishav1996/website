import React from 'react';
import './WatchAtelierHeader.css';

/**
 * WatchAtelierHeader
 * Clean, neutral gallery navigation.
 * Purely design-oriented with zero audio clutter.
 */
const WatchAtelierHeader = ({
  selectedWatch = null,
  onBackToVault = () => {},
  onReturnToPortfolio = () => {}
}) => {
  return (
    <header className="neutral-gallery-header">
      <div className="header-container">
        {/* Left: Minimal Brand Mark */}
        <div className="header-brand" onClick={onBackToVault} role="button" tabIndex={0}>
          <span className="brand-dot"></span>
          <span className="brand-title">TIMEPIECE ARCHIVE</span>
          <span className="brand-sep">//</span>
          <span className="brand-curator">CURATED BY RISHAV SAIGAL</span>
        </div>

        {/* Center: Breadcrumb Status */}
        <div className="header-breadcrumb">
          {selectedWatch ? (
            <div className="crumb-wrap">
              <button type="button" className="btn-crumb-link" onClick={onBackToVault}>
                VAULT
              </button>
              <span className="crumb-slash">/</span>
              <span className="crumb-active">{selectedWatch.brand} • {selectedWatch.sku}</span>
            </div>
          ) : (
            <span className="vault-count-badge">
              <span className="active-dot"></span>
              <span>06 TIMEPIECES CATALOGED</span>
            </span>
          )}
        </div>

        {/* Right: Return to Portfolio Door */}
        <div className="header-actions">
          <button
            type="button"
            className="btn-neutral-return"
            onClick={onReturnToPortfolio}
            title="Return to Software & AI Portfolio"
          >
            <span className="return-arrow">←</span>
            <span>Software Portfolio</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default WatchAtelierHeader;
