import React from 'react';
import { WATCH_COLLECTION } from '../../../data/watchesData';
import './WatchAtelierHeader.css';

/**
 * WatchAtelierHeader
 * Clean, neutral gallery navigation.
 * Purely design-oriented with zero audio clutter.
 * Features crawlable semantic links with client-side SPA navigation.
 */
const WatchAtelierHeader = ({
  selectedWatch = null,
  onBackToVault = () => {},
  onReturnToPortfolio = () => {}
}) => {
  const collectionCount = WATCH_COLLECTION.length;
  const countDisplay = `${String(collectionCount).padStart(2, '0')} TIMEPIECES CATALOGED`;

  const handleVaultClick = (e) => {
    e.preventDefault();
    onBackToVault();
  };

  const handleReturnClick = (e) => {
    e.preventDefault();
    onReturnToPortfolio();
  };

  return (
    <header className="neutral-gallery-header">
      <div className="header-container">
        {/* Left: Minimal Brand Mark (Crawlable Link to Vault) */}
        <a
          href={`${import.meta.env.BASE_URL}watches`}
          className="header-brand"
          onClick={handleVaultClick}
          title="Return to Horological Vault"
        >
          <span className="brand-dot"></span>
          <span className="brand-title">TIMEPIECE ARCHIVE</span>
          <span className="brand-sep">//</span>
          <span className="brand-curator">CURATED BY RISHAV SAIGAL</span>
        </a>

        {/* Center: Breadcrumb Status */}
        <div className="header-breadcrumb">
          {selectedWatch ? (
            <div className="crumb-wrap">
              <a
                href={`${import.meta.env.BASE_URL}watches`}
                className="btn-crumb-link"
                onClick={handleVaultClick}
                title="Back to Horological Collection Vault"
              >
                VAULT
              </a>
              <span className="crumb-slash">/</span>
              <span className="crumb-active">{selectedWatch.brand} • {selectedWatch.sku}</span>
            </div>
          ) : (
            <span className="vault-count-badge">
              <span className="active-dot"></span>
              <span>{countDisplay}</span>
            </span>
          )}
        </div>

        {/* Right: Return to Portfolio Door (Crawlable Link to Home) */}
        <div className="header-actions">
          <a
            href={import.meta.env.BASE_URL}
            className="btn-neutral-return"
            onClick={handleReturnClick}
            title="Return to Software & AI Portfolio"
          >
            <span className="return-arrow">←</span>
            <span>Software Portfolio</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default WatchAtelierHeader;

