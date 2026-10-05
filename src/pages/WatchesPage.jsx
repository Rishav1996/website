import React from 'react';
import WatchAtelierHeader from '../components/watches/atelier/WatchAtelierHeader';
import WatchAtelierFooter from '../components/watches/atelier/WatchAtelierFooter';
import WatchCollectionVault from '../components/watches/atelier/WatchCollectionVault';
import WatchDetailExhibition from '../components/watches/atelier/WatchDetailExhibition';
import { WATCH_COLLECTION, findWatchById } from '../data/watchesData';
import { useRoute } from '../hooks/useRoute';
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

  const handleSelectWatch = (id) => {
    navigate('watches', id);
  };

  const handleBackToVault = () => {
    navigate('watches');
  };

  const handleReturnToPortfolio = () => {
    navigate('home');
  };

  return (
    <div className="watches-page-wrapper">
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
