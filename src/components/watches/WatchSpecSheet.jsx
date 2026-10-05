import React from 'react';
import './WatchSpecSheet.css';

const WatchSpecSheet = ({ watch }) => {
  return (
    <section className="watch-specsheet-section">
      <div className="specsheet-container">
        <div className="section-head-cluster">
          <span className="section-eyebrow">HOROLOGICAL ARCHITECTURE</span>
          <h2 className="section-title">Technical Specification Fact-Sheet</h2>
          <p className="section-sub">
            Verified dimensional tolerances, mechanical specifications, and material compositions for{' '}
            <strong>{watch.brand} {watch.model} (SKU: {watch.sku})</strong>.
          </p>
        </div>

        <div className="spec-matrix-grid">
          {/* Column 1: Caliber & Mechanical Heart */}
          <div className="spec-cluster-card">
            <div className="card-cluster-header">
              <span className="cluster-icon">⚙️</span>
              <h3 className="cluster-title">Caliber & Regulating Engine</h3>
            </div>
            <div className="cluster-table">
              <div className="cluster-row">
                <span className="row-k">Movement Type:</span>
                <span className="row-v">{watch.movement.type}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Winding Mechanism:</span>
                <span className="row-v">{watch.movement.mechanism}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Beat Frequency:</span>
                <span className="row-v">{watch.movement.beatRate}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Jewel Count:</span>
                <span className="row-v">{watch.movement.jewelCount} Synthetic Rubies</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Power Reserve:</span>
                <span className="row-v">{watch.movement.powerReserve}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Escapement:</span>
                <span className="row-v">{watch.movement.escapement}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Dimensions & Case Geometry */}
          <div className="spec-cluster-card">
            <div className="card-cluster-header">
              <span className="cluster-icon">📐</span>
              <h3 className="cluster-title">Case Dimensions & Ergonomics</h3>
            </div>
            <div className="cluster-table">
              <div className="cluster-row">
                <span className="row-k">Case Diameter:</span>
                <span className="row-v">{watch.dimensions.caseDiameter}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Case Thickness:</span>
                <span className="row-v">{watch.dimensions.caseThickness}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Lug Width (Strap):</span>
                <span className="row-v">{watch.dimensions.lugWidth}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Lug-to-Lug Distance:</span>
                <span className="row-v">{watch.dimensions.lugToLug}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Total Weight:</span>
                <span className="row-v">{watch.dimensions.weight}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Water Resistance:</span>
                <span className="row-v">{watch.materials.waterResistance}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Materials & Optical Crystals */}
          <div className="spec-cluster-card">
            <div className="card-cluster-header">
              <span className="cluster-icon">💎</span>
              <h3 className="cluster-title">Materials, Crystals & Strap</h3>
            </div>
            <div className="cluster-table">
              <div className="cluster-row">
                <span className="row-k">Case Composition:</span>
                <span className="row-v">{watch.materials.case}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Front Crystal:</span>
                <span className="row-v">{watch.materials.frontCrystal}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Exhibition Back:</span>
                <span className="row-v">{watch.materials.casebackCrystal}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Dial Construction:</span>
                <span className="row-v">{watch.materials.dial}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Hands & Lume:</span>
                <span className="row-v">{watch.materials.hands}</span>
              </div>
              <div className="cluster-row">
                <span className="row-k">Strap & Buckle:</span>
                <span className="row-v">{watch.materials.strap}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchSpecSheet;
