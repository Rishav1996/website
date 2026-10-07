import React from 'react';
import './WatchFloatingBackground.css';

/**
 * WatchFloatingBackground - "Wall of Fame" Continuous Horological Ribbon
 * Displays an auto-sliding cinematic gallery behind the collection vault.
 * Dual-lane infinite marquee featuring authentic cuts and timepieces across all 6 watches.
 */

const LANE_1_ITEMS = [
  {
    id: 'l1-kc-watch',
    type: 'watch',
    watch: 'Kenneth Cole',
    name: 'Automatic Skeleton',
    image: 'assets/watches/kc_watch_transparent.png',
    accent: '#c5a059'
  },
  {
    id: 'l1-kc-escapement',
    type: 'cut',
    watch: 'Kenneth Cole',
    name: '3 Hz Escapement Organ',
    image: 'assets/watches/cuts/cut_kc_escapement.jpg',
    accent: '#c5a059'
  },
  {
    id: 'l1-ft-watch',
    type: 'watch',
    watch: 'Fastrack',
    name: 'Opulence Chronograph',
    image: 'assets/watches/fastrack/fastrack_watch_transparent.png',
    accent: '#f59e0b'
  },
  {
    id: 'l1-ft-sun-disc',
    type: 'cut',
    watch: 'Fastrack',
    name: 'Celestial Sun & Moon Disc',
    image: 'assets/watches/cuts/cut_ft_sun_disc.jpg',
    accent: '#f59e0b'
  },
  {
    id: 'l1-gs-watch',
    type: 'watch',
    watch: 'G-Shock',
    name: 'CasiOak GA-B2100',
    image: 'assets/watches/casio/gshock_watch_transparent.png',
    accent: '#38bdf8'
  },
  {
    id: 'l1-gs-bezel',
    type: 'cut',
    watch: 'G-Shock',
    name: 'Octagonal Bio-Resin Bezel',
    image: 'assets/watches/cuts/cut_gs_octagonal_bezel.jpg',
    accent: '#f59e0b'
  },
  {
    id: 'l1-tx-watch',
    type: 'watch',
    watch: 'Timex',
    name: 'Automatic Heritage Sunray',
    image: 'assets/watches/timex/timex_watch_transparent.png',
    accent: '#d4af37'
  },
  {
    id: 'l1-tx-beige',
    type: 'cut',
    watch: 'Timex',
    name: 'Radial Champagne Sunburst',
    image: 'assets/watches/cuts/cut_tx_beige_sunray.jpg',
    accent: '#d4af37'
  },
  {
    id: 'l1-lc-watch',
    type: 'watch',
    watch: 'Lee Cooper',
    name: 'Lyam Tonneau Skeleton',
    image: 'assets/watches/leecooper/leecooper_watch_transparent.png',
    accent: '#3b82f6'
  },
  {
    id: 'l1-lc-ruby',
    type: 'cut',
    watch: 'Lee Cooper',
    name: 'Exposed Escapement Ruby',
    image: 'assets/watches/cuts/cut_lc_balance_ruby.jpg',
    accent: '#f43f5e'
  },
  {
    id: 'l1-tt-watch',
    type: 'watch',
    watch: 'Titan',
    name: 'Classique Deca Sky Blue',
    image: 'assets/watches/titan/titan_deca_watch_transparent.png',
    accent: '#38bdf8'
  },
  {
    id: 'l1-tt-facets',
    type: 'cut',
    watch: 'Titan',
    name: '10-Sided Decagonal Bezel',
    image: 'assets/watches/cuts/cut_tt_deca_facets.jpg',
    accent: '#38bdf8'
  },
  {
    id: 'l1-pc-watch',
    type: 'watch',
    watch: 'Police',
    name: 'Cranium Tonneau Skeleton',
    image: 'assets/watches/police/police_watch_transparent.png',
    accent: '#e11d48'
  },
  {
    id: 'l1-pc-bezel',
    type: 'cut',
    watch: 'Police',
    name: 'Bolted Tonneau Bezel',
    image: 'assets/watches/cuts/cut_pc_bolted_bezel.jpg',
    accent: '#94a3b8'
  }
];

const LANE_2_ITEMS = [
  {
    id: 'l2-pc-cranium',
    type: 'cut',
    watch: 'Police',
    name: 'Silver Cranium Skull Dial',
    image: 'assets/watches/cuts/cut_pc_cranium_dial.jpg',
    accent: '#e11d48'
  },
  {
    id: 'l2-pc-watch',
    type: 'watch',
    watch: 'Police',
    name: 'Cranium PLPEWJM0081301W',
    image: 'assets/watches/police/police_watch_transparent.png',
    accent: '#e11d48'
  },
  {
    id: 'l2-tt-dial',
    type: 'cut',
    watch: 'Titan',
    name: 'Riviera Sky Blue Sunburst',
    image: 'assets/watches/cuts/cut_tt_sky_blue_dial.jpg',
    accent: '#38bdf8'
  },
  {
    id: 'l2-tt-watch',
    type: 'watch',
    watch: 'Titan',
    name: 'Deca 90245SM01',
    image: 'assets/watches/titan/titan_deca_watch_transparent.png',
    accent: '#38bdf8'
  },
  {
    id: 'l2-lc-frame',
    type: 'cut',
    watch: 'Lee Cooper',
    name: '8-Rivet Tonneau Bezel',
    image: 'assets/watches/cuts/cut_lc_tonneau_frame.jpg',
    accent: '#3b82f6'
  },
  {
    id: 'l2-lc-watch',
    type: 'watch',
    watch: 'Lee Cooper',
    name: 'Lyam Skeleton',
    image: 'assets/watches/leecooper/leecooper_watch_transparent.png',
    accent: '#3b82f6'
  },
  {
    id: 'l2-tx-indices',
    type: 'cut',
    watch: 'Timex',
    name: 'Faceted Gilt Hour Batons',
    image: 'assets/watches/cuts/cut_tx_gilt_indices.jpg',
    accent: '#d4af37'
  },
  {
    id: 'l2-tx-watch',
    type: 'watch',
    watch: 'Timex',
    name: 'Automatic TW000Z800',
    image: 'assets/watches/timex/timex_watch_transparent.png',
    accent: '#d4af37'
  },
  {
    id: 'l2-gs-subdial',
    type: 'cut',
    watch: 'G-Shock',
    name: 'Retrograde Mode Indicator',
    image: 'assets/watches/cuts/cut_gs_mode_dial.jpg',
    accent: '#38bdf8'
  },
  {
    id: 'l2-gs-watch',
    type: 'watch',
    watch: 'G-Shock',
    name: 'GA-B2100LUU-8A',
    image: 'assets/watches/casio/gshock_watch_transparent.png',
    accent: '#f59e0b'
  },
  {
    id: 'l2-ft-pusher',
    type: 'cut',
    watch: 'Fastrack',
    name: 'Racing Crimson Trigger',
    image: 'assets/watches/cuts/cut_ft_red_pusher.jpg',
    accent: '#ef4444'
  },
  {
    id: 'l2-ft-watch',
    type: 'watch',
    watch: 'Fastrack',
    name: 'Opulence NT3315KM01',
    image: 'assets/watches/fastrack/fastrack_watch_transparent.png',
    accent: '#f59e0b'
  },
  {
    id: 'l2-kc-pinion',
    type: 'cut',
    watch: 'Kenneth Cole',
    name: 'Skeleton Brass Pinions',
    image: 'assets/watches/cuts/cut_kc_brass_pinion.jpg',
    accent: '#c5a059'
  },
  {
    id: 'l2-kc-watch',
    type: 'watch',
    watch: 'Kenneth Cole',
    name: 'Mocha Skeleton',
    image: 'assets/watches/kc_watch_transparent.png',
    accent: '#c5a059'
  }
];

const renderMarqueeItem = (item, prefix) => {
  const isCut = item.type === 'cut';

  return (
    <div
      key={`${prefix}-${item.id}`}
      className={`wall-fame-item ${isCut ? 'item-cut-loupe' : 'item-watch-silhouette'}`}
      style={{ '--item-accent': item.accent }}
    >
      {isCut ? (
        <div className="loupe-frame">
          <img
            src={`${import.meta.env.BASE_URL}${item.image}`}
            alt=""
            className="loupe-img"
            loading="lazy"
            draggable={false}
          />
          <div className="loupe-ring"></div>
        </div>
      ) : (
        <div className="silhouette-frame">
          <img
            src={`${import.meta.env.BASE_URL}${item.image}`}
            alt=""
            className="silhouette-img"
            loading="lazy"
            draggable={false}
          />
        </div>
      )}
      <div className="item-caption">
        <span className="caption-brand">{item.watch}</span>
        <span className="caption-name">{item.name}</span>
      </div>
    </div>
  );
};

const WatchFloatingBackground = () => {
  return (
    <div className="wall-of-fame-background" aria-hidden="true">
      {/* Dark Studio Base & Gradient Mesh */}
      <div className="wall-mesh-gradient"></div>

      {/* Atmospheric Radial Vignette */}
      <div className="wall-vignette"></div>

      {/* Ribbon Lane 1: Drifts Slowly to the Left */}
      <div className="wall-marquee-lane lane-drift-left">
        <div className="marquee-track">
          {LANE_1_ITEMS.map((item) => renderMarqueeItem(item, 'track1-a'))}
          {LANE_1_ITEMS.map((item) => renderMarqueeItem(item, 'track1-b'))}
        </div>
      </div>

      {/* Ribbon Lane 2: Drifts Slowly to the Right */}
      <div className="wall-marquee-lane lane-drift-right">
        <div className="marquee-track">
          {LANE_2_ITEMS.map((item) => renderMarqueeItem(item, 'track2-a'))}
          {LANE_2_ITEMS.map((item) => renderMarqueeItem(item, 'track2-b'))}
        </div>
      </div>
    </div>
  );
};

export default WatchFloatingBackground;
