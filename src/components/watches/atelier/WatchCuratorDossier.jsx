import React from 'react';
import './WatchCuratorDossier.css';

/**
 * WatchCuratorDossier
 * Technical manufacture specification matrix and the curator's philosophical essay:
 * "Deterministic Horology vs. Probabilistic Intelligence".
 */
const WatchCuratorDossier = ({ watch }) => {
  return (
    <section className="curator-dossier-section" aria-label="Technical Fact-Sheet and Philosophy">
      {/* Technical Spec-Sheet Matrix */}
      <div className="dossier-card spec-matrix-card">
        <div className="dossier-card-header">
          <span className="dossier-eyebrow">MANUFACTURE SPECIFICATION MATRIX</span>
          <h3 className="dossier-title">Technical Tolerances & Caliber Architecture</h3>
          <p className="dossier-sub">
            Verified physical tolerances, materials, and mechanical architecture for Reference <strong>{watch.sku}</strong>.
          </p>
        </div>

        <div className="spec-matrix-grid">
          {/* Caliber & Escapement */}
          <div className="spec-quadrant">
            <div className="quadrant-head">
              <span className="quadrant-icon">⚙️</span>
              <h4 className="quadrant-title">Caliber & Escapement</h4>
            </div>
            <ul className="quadrant-list">
              <li>
                <span className="qk">Movement Type</span>
                <span className="qv">{watch.movement.type}</span>
              </li>
              <li>
                <span className="qk">Escapement Frequency</span>
                <span className="qv">{watch.movement.beatRate}</span>
              </li>
              <li>
                <span className="qk">Synthetic Jewels</span>
                <span className="qv highlight-ruby">{watch.movement.jewelCount} Synthetic Rubies</span>
              </li>
              <li>
                <span className="qk">Autonomous Power Reserve</span>
                <span className="qv">{watch.movement.powerReserve}</span>
              </li>
              <li>
                <span className="qk">Winding Mechanism</span>
                <span className="qv">{watch.movement.winding}</span>
              </li>
            </ul>
          </div>

          {/* Casework & Dimensions */}
          <div className="spec-quadrant">
            <div className="quadrant-head">
              <span className="quadrant-icon">📐</span>
              <h4 className="quadrant-title">Casework & Dimensions</h4>
            </div>
            <ul className="quadrant-list">
              <li>
                <span className="qk">Case Diameter</span>
                <span className="qv">{watch.dimensions.caseDiameter}</span>
              </li>
              <li>
                <span className="qk">Total Thickness</span>
                <span className="qv">{watch.dimensions.caseThickness}</span>
              </li>
              <li>
                <span className="qk">Lug-to-Lug Distance</span>
                <span className="qv">{watch.dimensions.lugToLug}</span>
              </li>
              <li>
                <span className="qk">Inter-Lug Width</span>
                <span className="qv">{watch.dimensions.lugWidth}</span>
              </li>
              <li>
                <span className="qk">Water Resistance</span>
                <span className="qv">{watch.materials.waterResistance}</span>
              </li>
            </ul>
          </div>

          {/* Materials & Crystals */}
          <div className="spec-quadrant">
            <div className="quadrant-head">
              <span className="quadrant-icon">🛡️</span>
              <h4 className="quadrant-title">Materials & Finishes</h4>
            </div>
            <ul className="quadrant-list">
              <li>
                <span className="qk">Chassis Metallurgy</span>
                <span className="qv">{watch.materials.case}</span>
              </li>
              <li>
                <span className="qk">Surface Treatment</span>
                <span className="qv highlight-brass">{watch.materials.caseFinish}</span>
              </li>
              <li>
                <span className="qk">Dial Crystal</span>
                <span className="qv">{watch.materials.crystal}</span>
              </li>
              <li>
                <span className="qk">Exhibition Caseback</span>
                <span className="qv">{watch.materials.caseback}</span>
              </li>
              <li>
                <span className="qk">Bridges & Platine</span>
                <span className="qv">Skeletonized Rhodium-Plated Alloy</span>
              </li>
            </ul>
          </div>

          {/* Display & Ergonomics */}
          <div className="spec-quadrant">
            <div className="quadrant-head">
              <span className="quadrant-icon">⌚</span>
              <h4 className="quadrant-title">Display & Ergonomics</h4>
            </div>
            <ul className="quadrant-list">
              <li>
                <span className="qk">Dial Architecture</span>
                <span className="qv">{watch.materials.dial}</span>
              </li>
              <li>
                <span className="qk">Chapter Ring</span>
                <span className="qv">Printed Cream Railroad Track</span>
              </li>
              <li>
                <span className="qk">Hands Treatment</span>
                <span className="qv">Skeletonized Luminous Batons</span>
              </li>
              <li>
                <span className="qk">Strap & Clasp</span>
                <span className="qv">{watch.materials.strap}</span>
              </li>
              <li>
                <span className="qk">Curator Weight</span>
                <span className="qv">{watch.dimensions.weight}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Curator's Philosophical Essay */}
      <div className="dossier-card essay-card">
        <div className="essay-grid">
          <div className="essay-left-meta">
            <span className="essay-badge">CURATOR'S THESIS</span>
            <h3 className="essay-heading">Deterministic Horology vs. Probabilistic AI</h3>
            <span className="essay-byline">By Rishav Saigal // AI Architect & Horology Collector</span>
            <div className="essay-quote-callout">
              “In machine learning, we navigate high-dimensional latent space where outcomes are probabilistic.
              In mechanical watchmaking, there are no latent variables—every vibration is Newtonian, tangible, and true.”
            </div>
          </div>

          <div className="essay-body-content">
            <p className="essay-p">
              My professional life centers on building autonomous agent systems, neural model routers, and generative AI platforms.
              These computational systems operate in probabilistic realms—statistical approximations, floating-point weights, and emergent behaviors that can drift over time.
            </p>
            <p className="essay-p">
              The <strong>Kenneth Cole Automatic Skeleton (Reference KCWGL2104102MN)</strong> represents the absolute antithesis of algorithmic drift.
              Inside its 44mm matte mocha chassis, time is not computed via billions of silicon transistors; it is measured purely through potential energy stored in an S-shaped mainspring,
              metered by an oscillating balance wheel oscillating at precisely 3 Hertz (21,600 vibrations per hour), and arrested by synthetic ruby pallet jewels six times every second.
            </p>
            <p className="essay-p">
              The skeletonized architecture completely removes the opaque dial, putting the mechanical truth on display.
              You see the mainspring barrel slowly unwind; you see the escape wheel transmit its impulse; you see the hairspring breathe.
              For an AI architect, wearing this timepiece is a daily grounding ritual: a physical reminder that true reliability is built on deterministic mechanics, zero abstraction, and uncompromising structural clarity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchCuratorDossier;
