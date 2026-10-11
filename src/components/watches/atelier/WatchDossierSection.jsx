import React from 'react';
import './WatchDossierSection.css';

/**
 * WatchDossierSection
 * Unified Technical Dossier, Machine-Readable Spec Sheet (<dl>),
 * High-Density Caliber Analysis (GEO), and Verified Horological FAQ (AEO).
 */
const WatchDossierSection = ({ watch }) => {
  if (!watch) return null;

  const movement = watch.movement || {};
  const dimensions = watch.dimensions || {};
  const materials = watch.materials || {};
  const dossier = watch.technicalDossier || {};
  const faqList = watch.faq || [];
  const complications = movement.complications || [];

  return (
    <section className="watch-dossier-section" aria-label="Technical Specification and Horological Analysis">
      <div className="dossier-inner">
        {/* Section Header */}
        <header className="dossier-header">
          <div className="dossier-eyebrow">
            <span className="eyebrow-pip"></span>
            <span>TECHNICAL ARCHITECTURE // CALIBER SPECIFICATION & ANALYSIS</span>
          </div>
          <h2 className="dossier-main-title">
            {watch.brand} • {watch.model} Mechanical Dossier
          </h2>
          <p className="dossier-intro-text">
            Authoritative technical measurements, metallurgical analysis, and verified horological characteristics cataloged by Rishav Saigal.
          </p>
        </header>

        {/* Split Grid: Semantic Definition List (<dl>) on Left, In-Depth Analysis (GEO) on Right */}
        <div className="dossier-split-grid">
          {/* Machine-Readable Definition List for Answer Engines (AEO) */}
          <div className="dossier-spec-card">
            <div className="spec-card-head">
              <span className="spec-card-badge">VERIFIED SPECIFICATIONS</span>
              <span className="spec-sku-label">REF: {watch.sku}</span>
            </div>

            <dl className="horological-spec-dl">
              <div className="spec-row">
                <dt className="spec-term">Brand & Model</dt>
                <dd className="spec-def">{watch.brand} {watch.model}</dd>
              </div>

              <div className="spec-row">
                <dt className="spec-term">Reference / SKU</dt>
                <dd className="spec-def">{watch.sku}</dd>
              </div>

              <div className="spec-row">
                <dt className="spec-term">Caliber / Engine</dt>
                <dd className="spec-def">{movement.type || 'Horological Calibre'}</dd>
              </div>

              {movement.beatRate && (
                <div className="spec-row">
                  <dt className="spec-term">Oscillation Frequency</dt>
                  <dd className="spec-def">{movement.beatRate}</dd>
                </div>
              )}

              {(movement.powerReserve || movement.batteryLife) && (
                <div className="spec-row">
                  <dt className="spec-term">Power Autonomy</dt>
                  <dd className="spec-def">{movement.powerReserve || movement.batteryLife}</dd>
                </div>
              )}

              {movement.jewelCount && (
                <div className="spec-row">
                  <dt className="spec-term">Synthetic Jewels</dt>
                  <dd className="spec-def">{movement.jewelCount} Synthetic Corundum Rubies</dd>
                </div>
              )}

              <div className="spec-row">
                <dt className="spec-term">Case Dimensions</dt>
                <dd className="spec-def">
                  {dimensions.caseDiameter} dia. × {dimensions.caseThickness} thick (Lug width: {dimensions.lugWidth})
                </dd>
              </div>

              <div className="spec-row">
                <dt className="spec-term">Case Metallurgy</dt>
                <dd className="spec-def">{materials.case}</dd>
              </div>

              <div className="spec-row">
                <dt className="spec-term">Front Crystal</dt>
                <dd className="spec-def">{materials.frontCrystal}</dd>
              </div>

              <div className="spec-row">
                <dt className="spec-term">Water Resistance</dt>
                <dd className="spec-def">{materials.waterResistance}</dd>
              </div>

              {complications.length > 0 && (
                <div className="spec-row">
                  <dt className="spec-term">Complications</dt>
                  <dd className="spec-def">{complications.join(' • ')}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* High-Density Caliber & Material Analysis (GEO) */}
          <div className="dossier-analysis-card">
            <div className="spec-card-head">
              <span className="spec-card-badge">ENGINEERING & CALIBER ANALYSIS</span>
              <span className="spec-sku-label">CURATED PROVENANCE</span>
            </div>

            <div className="dossier-narrative-content">
              <h3 className="analysis-subhead">Caliber & Escapement Dynamics</h3>
              <p className="analysis-text">
                {dossier.caliberAnalysis ||
                  `The ${watch.brand} ${watch.model} is governed by a ${movement.type?.toLowerCase() || 'precision caliber'} operating under deterministic tolerances. Each component in the kinetic train is tuned to balance harmonic stability against energetic decay.`}
              </p>

              <h3 className="analysis-subhead">Metallurgy & Structural Architecture</h3>
              <p className="analysis-text">
                {dossier.materialScience ||
                  `Engineered from ${materials.case || 'high-grade alloys'}, the external chassis provides hermetic resistance against ambient torque, specular reflections, and thermal expansion.`}
              </p>

              <div className="dossier-provenance-callout">
                <div className="callout-pip"></div>
                <div className="callout-body">
                  <strong className="callout-title">Physical Bench Inspection:</strong>
                  <span className="callout-desc">
                    Verified physically in active mechanical rotation. Evaluated under 10× optical magnification across crystal chamfers, pallet engagement, and dial indexes.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Horological FAQ (AEO & GEO) */}
        {faqList.length > 0 && (
          <div className="dossier-faq-block">
            <div className="faq-block-head">
              <span className="faq-badge">FREQUENTLY ASKED HOROLOGICAL QUESTIONS</span>
              <h3 className="faq-title">Verified Inquiries & Specifications</h3>
            </div>

            <div className="faq-items-list">
              {faqList.map((item, idx) => (
                <details key={idx} className="dossier-faq-item" open={idx === 0}>
                  <summary className="faq-question">
                    <span className="q-indicator">Q{idx + 1}</span>
                    <span className="q-text">{item.question}</span>
                    <span className="q-arrow">▾</span>
                  </summary>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WatchDossierSection;
