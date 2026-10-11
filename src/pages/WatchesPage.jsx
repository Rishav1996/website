import React from 'react';
import WatchAtelierHeader from '../components/watches/atelier/WatchAtelierHeader';
import WatchAtelierFooter from '../components/watches/atelier/WatchAtelierFooter';
import WatchCollectionVault from '../components/watches/atelier/WatchCollectionVault';
import WatchDetailExhibition from '../components/watches/atelier/WatchDetailExhibition';
import { WATCH_COLLECTION, findWatchById } from '../data/watchesData';
import { useRoute } from '../hooks/useRoute';
import { useWatchHead } from '../hooks/useWatchHead';
import './WatchesPage.css';

/**
 * WatchesPage
 * Autonomous Luxury Horological Route (/watches and /watches/:watchId)
 * Clean sub-watch routing for each timepiece in the collection.
 */
const WatchesPage = () => {
  const { watchId, navigate } = useRoute();

  // Resolve watch by sub watch ID (supporting id, sku, or alias)
  const selectedWatch = findWatchById(watchId);

  // Synchronize document.title, meta description, canonical, and OG tags
  useWatchHead(selectedWatch);

  const handleSelectWatch = (id) => {
    navigate('watches', id);
  };

  const handleBackToVault = () => {
    navigate('watches');
  };

  const handleReturnToPortfolio = () => {
    navigate('home');
  };

  const pageThemeStyle = selectedWatch?.theme
    ? {
        '--watch-accent': selectedWatch.theme.accentPrimary,
        '--watch-secondary': selectedWatch.theme.accentSecondary,
        '--watch-bg-deep': selectedWatch.theme.bgDeep,
        '--watch-bg-surface': selectedWatch.theme.bgSurface,
        '--watch-bg-card': selectedWatch.theme.bgCard,
        '--watch-border': selectedWatch.theme.borderAccent,
        '--watch-glow': selectedWatch.theme.glowColor,
      }
    : {
        '--watch-accent': '#58a6ff',
        '--watch-secondary': '#8b949e',
        '--watch-bg-deep': '#09090b',
        '--watch-bg-surface': '#121316',
        '--watch-bg-card': '#18191f',
        '--watch-border': 'rgba(88, 166, 255, 0.2)',
        '--watch-glow': 'rgba(88, 166, 255, 0.1)',
      };

  return (
    <div className="watches-page-wrapper" style={pageThemeStyle}>
      {/* Standalone Neutral Gallery Header */}
      <WatchAtelierHeader
        selectedWatch={selectedWatch}
        onBackToVault={handleBackToVault}
        onReturnToPortfolio={handleReturnToPortfolio}
      />

      <main className="watches-main-content">
        {selectedWatch ? (
          <WatchDetailExhibition
            watch={selectedWatch}
            onSelectWatch={handleSelectWatch}
            onBackToVault={handleBackToVault}
            onReturnToPortfolio={handleReturnToPortfolio}
          />
        ) : (
          <WatchCollectionVault
            watches={WATCH_COLLECTION}
            onSelectWatch={handleSelectWatch}
            onReturnToPortfolio={handleReturnToPortfolio}
          />
        )}
      </main>

      {/* Standalone Neutral Gallery Footer */}
      <WatchAtelierFooter
        selectedWatch={selectedWatch}
        onReturnToPortfolio={handleReturnToPortfolio}
      />
    </div>
  );
};

export default WatchesPage;
