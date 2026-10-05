import React, { useState, useMemo } from 'react';
import WatchFloatingBackground from './WatchFloatingBackground';
import './WatchCollectionVault.css';

/**
 * WatchCollectionVault - Scalable Horological Archive Matrix
 * Compact, high-density matrix grid engineered for future collection expansion.
 * Features:
 * - Bought Year tracking (2025 for first three, 2026 for last three)
 * - Multi-dimensional sorting (by Year desc/asc, by Name A-Z/Z-A, Vault order)
 * - Category and Year filter pills
 * - Zero duplicated sub-watch elements (macro cards reserved for atelier pages)
 * - Continuous "Wall of Fame" horizontal marquee background
 */

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'skeleton', label: 'Skeleton & Openwork' },
  { id: 'solar', label: 'Tough Solar & Utility' },
  { id: 'chronograph', label: 'Chronograph & Celestial' },
  { id: 'mid-century', label: 'Mid-Century & Geometric' }
];

const WatchCollectionVault = ({
  watches = [],
  onSelectWatch = () => {},
  onReturnToPortfolio = () => {}
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('vault');

  // Compute available acquisition years dynamically from registry
  const availableYears = useMemo(() => {
    const years = [...new Set(watches.map((w) => w.yearAcquired).filter(Boolean))];
    return years.sort((a, b) => Number(b) - Number(a)); // e.g. ['2026', '2025']
  }, [watches]);

  // Dynamic Collection-level statistics
  const stats = useMemo(() => {
    const total = watches.length;
    let mechanical = 0;
    let quartz = 0;
    let solar = 0;
    watches.forEach((w) => {
      const type = (w.movement?.type || '').toLowerCase();
      if (type.includes('solar')) {
        solar += 1;
      } else if (type.includes('mechanical') || type.includes('automatic')) {
        mechanical += 1;
      } else if (type.includes('quartz')) {
        quartz += 1;
      }
    });
    return { total, mechanical, quartz, solar };
  }, [watches]);

  // Filtered & Sorted Timepieces Pipeline
  const processedWatches = useMemo(() => {
    let list = watches.filter((w) => {
      const matchCat = selectedCategory === 'all' || w.categoryGroup === selectedCategory;
      const matchYr = selectedYear === 'all' || String(w.yearAcquired) === String(selectedYear);
      return matchCat && matchYr;
    });

    return list.sort((a, b) => {
      if (sortBy === 'year-desc') {
        const diff = Number(b.yearAcquired || 0) - Number(a.yearAcquired || 0);
        if (diff !== 0) return diff;
        return a.brand.localeCompare(b.brand);
      }
      if (sortBy === 'year-asc') {
        const diff = Number(a.yearAcquired || 0) - Number(b.yearAcquired || 0);
        if (diff !== 0) return diff;
        return a.brand.localeCompare(b.brand);
      }
      if (sortBy === 'name-asc') {
        const nameA = `${a.brand} ${a.model}`.toLowerCase();
        const nameB = `${b.brand} ${b.model}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'name-desc') {
        const nameA = `${a.brand} ${a.model}`.toLowerCase();
        const nameB = `${b.brand} ${b.model}`.toLowerCase();
        return nameB.localeCompare(nameA);
      }
      // Default: 'vault' order by index in canonical array
      return watches.findIndex((w) => w.id === a.id) - watches.findIndex((w) => w.id === b.id);
    });
  }, [watches, selectedCategory, selectedYear, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedYear('all');
    setSortBy('vault');
  };

  return (
    <div className="neutral-vault-wrapper">
      {/* Wall of Fame Continuous Marquee Background */}
      <WatchFloatingBackground />

      <div className="neutral-vault-container">
        {/* Scalable Matrix Header */}
        <header className="vault-minimal-header">
          <div className="vault-eyebrow-tag">
            <span className="eyebrow-indicator"></span>
            <span>HOROLOGICAL VAULT // SCALABLE ARCHIVE MATRIX</span>
          </div>

          <div className="vault-header-title-row">
            <div className="vault-title-column">
              <h1 className="vault-title-text">The Timepiece Archive</h1>
              <p className="vault-subtitle-text">
                A permanent horological matrix indexing mechanical, solar, and high-frequency engineering.
                Select any timepiece to enter its dedicated atelier and macro loupe inspection bay.
              </p>
            </div>

            {/* Live Matrix Metrics Strip */}
            <div className="vault-stats-matrix-strip">
              <div className="stat-matrix-cell">
                <span className="stat-matrix-num">{stats.total}</span>
                <span className="stat-matrix-lbl">TIMEPIECES</span>
              </div>
              <div className="stat-matrix-divider"></div>
              <div className="stat-matrix-cell">
                <span className="stat-matrix-num">
                  {availableYears.length > 1
                    ? `${availableYears[availableYears.length - 1]}–${availableYears[0]}`
                    : availableYears[0] || '2026'}
                </span>
                <span className="stat-matrix-lbl">TIMELINE</span>
              </div>
              <div className="stat-matrix-divider"></div>
              <div className="stat-matrix-cell">
                <span className="stat-matrix-num">
                  {stats.mechanical}M • {stats.quartz}Q • {stats.solar}S
                </span>
                <span className="stat-matrix-lbl">ENGINES</span>
              </div>
            </div>
          </div>

          {/* Multi-Dimensional Filter & Sort Command Bar */}
          <div className="vault-matrix-command-bar">
            {/* Category Filters */}
            <div className="command-filter-group">
              <span className="group-label">CATEGORY:</span>
              <div className="filter-pills-row">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat.id === 'all'
                      ? watches.length
                      : watches.filter((w) => w.categoryGroup === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`vault-filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-row: Year Filters & Sorting Controls */}
            <div className="command-sub-row">
              {/* Year Filter Group */}
              <div className="command-filter-group">
                <span className="group-label">BOUGHT YEAR:</span>
                <div className="filter-pills-row">
                  <button
                    type="button"
                    className={`vault-filter-pill ${selectedYear === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedYear('all')}
                  >
                    All Years ({watches.length})
                  </button>
                  {availableYears.map((yr) => {
                    const count = watches.filter((w) => String(w.yearAcquired) === yr).length;
                    return (
                      <button
                        key={yr}
                        type="button"
                        className={`vault-filter-pill year-filter-pill ${selectedYear === yr ? 'active' : ''}`}
                        onClick={() => setSelectedYear(yr)}
                      >
                        Bought in {yr} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Selector Group */}
              <div className="command-sort-group">
                <span className="group-label">SORT MATRIX BY:</span>
                <div className="sort-pills-row">
                  <button
                    type="button"
                    className={`vault-sort-pill ${sortBy === 'year-desc' ? 'active' : ''}`}
                    onClick={() => setSortBy('year-desc')}
                    title="Sort by Bought Year (2026 Recent First)"
                  >
                    Year (2026 → 2025)
                  </button>
                  <button
                    type="button"
                    className={`vault-sort-pill ${sortBy === 'year-asc' ? 'active' : ''}`}
                    onClick={() => setSortBy('year-asc')}
                    title="Sort by Bought Year (2025 Chronological)"
                  >
                    Year (2025 → 2026)
                  </button>
                  <button
                    type="button"
                    className={`vault-sort-pill ${sortBy === 'name-asc' ? 'active' : ''}`}
                    onClick={() => setSortBy('name-asc')}
                    title="Sort Alphabetically by Brand & Model (A-Z)"
                  >
                    Name (A → Z)
                  </button>
                  <button
                    type="button"
                    className={`vault-sort-pill ${sortBy === 'vault' ? 'active' : ''}`}
                    onClick={() => setSortBy('vault')}
                    title="Default Vault Archive Index"
                  >
                    Vault Index
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scalable Horological Matrix Grid */}
        {processedWatches.length > 0 ? (
          <div className="vault-matrix-grid">
            {processedWatches.map((watch) => {
              const originalIndex = watches.findIndex((w) => w.id === watch.id);
              const elements = watch?.elements || [];
              const is2026 = String(watch.yearAcquired) === '2026';

              return (
                <article
                  key={watch.id}
                  className="matrix-timepiece-cell"
                  onClick={() => onSelectWatch(watch.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectWatch(watch.id);
                    }
                  }}
                  aria-label={`Timepiece: ${watch.brand} ${watch.model}, Bought in ${watch.yearAcquired}`}
                >
                  {/* Cell Header: Order, Category, Prominent Bought Year Badge */}
                  <div className="matrix-cell-header">
                    <div className="matrix-cell-order">
                      <span className="order-number">N° 0{originalIndex + 1}</span>
                      <span className="dot-sep">•</span>
                      <span className="cell-category-label">
                        {watch.categoryGroup?.toUpperCase() || 'WATCH'}
                      </span>
                    </div>

                    <div
                      className={`matrix-year-badge ${
                        is2026 ? 'year-badge-2026' : 'year-badge-2025'
                      }`}
                    >
                      <span className="year-dot"></span>
                      <span>BOUGHT {watch.yearAcquired}</span>
                    </div>
                  </div>

                  {/* Display Pedestal Stage (~220px) */}
                  <div className="matrix-pedestal-stage">
                    <img
                      src={`${import.meta.env.BASE_URL}${watch.image}`}
                      alt={`${watch.brand} ${watch.model}`}
                      className="matrix-pedestal-img"
                      loading="lazy"
                    />
                    <div className="pedestal-lighting-aura"></div>
                  </div>

                  {/* Identity & Reference */}
                  <div className="matrix-identity-block">
                    <div className="matrix-brand-row">
                      <span className="matrix-brand-text">{watch.brand}</span>
                      <span className="matrix-sku-text">REF: {watch.sku}</span>
                    </div>

                    <h2 className="matrix-model-heading">{watch.model}</h2>

                    <p className="matrix-tagline-text">{watch.tagline}</p>

                    {/* Key Specifications Strip */}
                    <div className="matrix-quick-specs">
                      <span className="matrix-spec-pill">
                        {watch.dimensions.caseDiameter.split(' ')[0]} Case
                      </span>
                      <span className="matrix-spec-pill">
                        {watch.movement.type.split('(')[0].trim()}
                      </span>
                      <span className="matrix-spec-pill">
                        {watch.materials.waterResistance.split('(')[0].trim()}
                      </span>
                    </div>

                    {/* Cell Footer: Teaser & Action Button */}
                    <div className="matrix-cell-footer">
                      <div className="matrix-teaser-badge">
                        <span className="teaser-dot"></span>
                        <span>{elements.length} Macro Studies</span>
                      </div>

                      <span className="btn-matrix-inspect">
                        <span>Inspect Atelier</span>
                        <span className="matrix-arrow">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="vault-empty-matrix-card">
            <p className="empty-matrix-title">No timepieces match the selected filter criteria.</p>
            <p className="empty-matrix-subtitle">Try adjusting your category or acquisition year filters.</p>
            <button type="button" className="btn-reset-matrix" onClick={handleResetFilters}>
              Reset Matrix Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchCollectionVault;
