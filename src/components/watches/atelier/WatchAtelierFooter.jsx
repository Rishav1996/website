import React from 'react';
import './WatchAtelierFooter.css';

/**
 * WatchAtelierFooter
 * Autonomous horological manufacture footer. No generic portfolio links.
 */
const WatchAtelierFooter = ({ selectedWatch = null, onReturnToPortfolio = () => {} }) => {
  return (
    <footer className="atelier-footer-wrapper">
      <div className="atelier-footer-inner">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div className="footer-mark">
              <span className="mark-emblem">⚙️</span>
              <span className="mark-text">ATELIER SAIGAL</span>
            </div>
            <p className="footer-tagline">
              An archive of personal mechanical and tactical horology.
              Curated under principles of Newtonian physics, deterministic gear geometry, and uncompromised craftsmanship.
            </p>
          </div>

          <div className="footer-spec-col">
            <span className="footer-spec-head">
              {selectedWatch ? `${selectedWatch.brand.toUpperCase()} CALIBER SPECS` : 'VAULT COLLECTION ARCHITECTURE'}
            </span>
            {selectedWatch ? (
              <ul className="footer-spec-list">
                <li><strong>Engine:</strong> {selectedWatch.movement?.type || 'Horological Calibre'}</li>
                <li><strong>Caliber / SKU:</strong> {selectedWatch.movement?.caliber || selectedWatch.sku}</li>
                <li><strong>Oscillation / Power:</strong> {selectedWatch.movement?.beatRate || selectedWatch.movement?.powerReserve || selectedWatch.movement?.batteryLife || 'Autonomous Engine'}</li>
                <li><strong>Resistance:</strong> {selectedWatch.materials?.waterResistance?.split('(')[0]?.trim() || 'ISO Rated'}</li>
              </ul>
            ) : (
              <ul className="footer-spec-list">
                <li><strong>Archive Scope:</strong> 6 Independently Owned Timepieces</li>
                <li><strong>Disciplines:</strong> Automatic Skeleton, Tough Solar, Tonneau, Vintage Dress</li>
                <li><strong>Total Jewels:</strong> 42 Synthetic Rubies across mechanical engines</li>
                <li><strong>Curation:</strong> Zero Algorithmic Drift • Pure Horology</li>
              </ul>
            )}
          </div>

          <div className="footer-provenance-col">
            <span className="footer-spec-head">PROVENANCE & CURATION</span>
            <p className="footer-provenance-text">
              Every timepiece in this archive is physically owned, inspected, and maintained in active mechanical rotation.
            </p>
            <button
              type="button"
              className="btn-footer-return"
              onClick={onReturnToPortfolio}
            >
              <span>← Return to Software & AI Portfolio</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {new Date().getFullYear()} Rishav Saigal. All mechanical specifications, photography, and CAD blueprints cataloged independently.
          </div>
          <div className="footer-status-pill">
            <span className="status-dot"></span>
            <span>MECHANICAL ARCHIVE // ZERO ALGORITHMIC DRIFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WatchAtelierFooter;
