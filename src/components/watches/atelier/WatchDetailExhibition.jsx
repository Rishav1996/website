import React from 'react';
import WatchDetailKennethCole from './WatchDetailKennethCole';
import WatchDetailFastrack from './WatchDetailFastrack';
import WatchDetailGShock from './WatchDetailGShock';
import WatchDetailTimex from './WatchDetailTimex';
import WatchDetailLeeCooper from './WatchDetailLeeCooper';
import WatchDetailTitanDeca from './WatchDetailTitanDeca';
import { WATCH_COLLECTION } from '../../../data/watchesData';

/**
 * WatchDetailExhibition
 * Master Dynamic Sub-Watch Atelier Dispatcher.
 * Dynamically renders the 100% tailored design experience for each unique timepiece:
 *  - Kenneth Cole KCWGL2104102MN -> "The Coffee Mocha Roastery Atelier"
 *  - Fastrack Opulence NT3315KM01 -> "The Obsidian Eclipse & Celestial Horizon Atelier"
 *  - Casio G-Shock GA-B2100LUU-8A -> "The Tactical Carbon Foundry & Tough Solar Atelier"
 *  - Timex Heritage TW000Z800 -> "The Heritage Parchment & Mid-Century Atelier"
 *  - Lee Cooper LC07979.399 -> "The Tonneau Indigo Forge Atelier"
 *  - Titan Deca 90245SM01 -> "The Riviera Deca Prism Atelier"
 */
const WatchDetailExhibition = ({
  watch,
  onSelectWatch = () => {},
  onBackToVault = () => {},
  onReturnToPortfolio = () => {}
}) => {
  if (!watch) return null;

  const id = watch.id?.toLowerCase() || '';
  const sku = watch.sku?.toUpperCase() || '';

  // Calculate adjacent timepieces for fluid inter-watch navigation
  const currentIndex = WATCH_COLLECTION.findIndex((w) => w.id === watch.id);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevWatch = WATCH_COLLECTION[(safeIndex - 1 + WATCH_COLLECTION.length) % WATCH_COLLECTION.length];
  const nextWatch = WATCH_COLLECTION[(safeIndex + 1) % WATCH_COLLECTION.length];

  const commonProps = {
    watch,
    prevWatch,
    nextWatch,
    onSelectWatch,
    onBackToVault,
    onReturnToPortfolio
  };

  // 1. Fastrack Opulence Chronograph
  if (sku === 'NT3315KM01' || id.includes('fastrack') || id.includes('opulence')) {
    return <WatchDetailFastrack {...commonProps} />;
  }

  // 2. Casio G-Shock 2100 CasiOak
  if (sku === 'GA-B2100LUU-8A' || id.includes('casio') || id.includes('gshock') || id.includes('2100')) {
    return <WatchDetailGShock {...commonProps} />;
  }

  // 3. Timex Automatic Heritage
  if (sku === 'TW000Z800' || id.includes('timex')) {
    return <WatchDetailTimex {...commonProps} />;
  }

  // 4. Lee Cooper Tonneau Skeleton
  if (sku === 'LC07979.399' || id.includes('lee-cooper') || id.includes('leecooper') || id.includes('tonneau')) {
    return <WatchDetailLeeCooper {...commonProps} />;
  }

  // 5. Titan Classique Deca
  if (sku === '90245SM01' || id.includes('titan') || id.includes('deca')) {
    return <WatchDetailTitanDeca {...commonProps} />;
  }

  // 6. Default to Kenneth Cole Coffee Mocha Roastery Atelier
  return <WatchDetailKennethCole {...commonProps} />;
};

export default WatchDetailExhibition;
