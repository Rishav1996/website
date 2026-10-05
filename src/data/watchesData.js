/**
 * Horological Collection Data Registry
 * Single Source of Truth for Rishav Saigal's Timepiece Vault
 * 6 Curated Masterpieces across Skeleton, Solar, Chronograph & Mid-Century Horology
 */

export const WATCH_COLLECTION = [
  {
    id: 'kenneth-cole-kcwgl2104102mn',
    brand: 'Kenneth Cole New York',
    model: 'Automatic Skeleton',
    sku: 'KCWGL2104102MN',
    referenceAlias: 'KCWGL2104102',
    category: 'Haute Skeleton / Open-Heart',
    categoryGroup: 'skeleton',
    yearAcquired: '2025',
    status: 'In Active Rotation',
    tagline: 'Multi-Tiered Mechanical Heartbeat in Matte Mocha IP Stainless Steel',
    image: 'assets/watches/kc_watch_transparent.png',
    masterImage: 'assets/watches/kc_watch.jpg',
    backgroundImage: 'assets/watches/backgrounds/bg_coffee_mocha.jpg',

    // Watch-Specific Dynamic Luxury Theme Tokens
    theme: {
      accentPrimary: '#c5a059', // Raw Horological Brass / Champagne
      accentSecondary: '#8a5a44', // Warm Mocha / Chocolate Tone
      accentRuby: '#e11d48', // Synthetic Corundum Ruby
      bgDeep: '#0a0807', // Obsidian Cocoa Base
      bgSurface: '#130e0b', // Elevated Mocha Surface
      bgCard: '#1a130f', // Surface Card
      borderAccent: 'rgba(197, 160, 89, 0.22)',
      glowColor: 'rgba(197, 160, 89, 0.15)',
      creamText: '#f5f2eb'
    },

    // Core Horological Specifications
    movement: {
      type: 'Mechanical Automatic (Self-Winding)',
      mechanism: 'Bi-directional rotor winding with auxiliary crown manual winding capability',
      beatRate: '21,600 vibrations per hour (vph) / 3 Hz',
      powerReserve: '~36 to 40 Hours',
      jewelCount: 21,
      escapement: 'Swiss-style lever escapement with synthetic ruby pallets',
      complications: ['Central Sweeping Seconds', 'Full Skeleton Cutaway Dial', 'Exhibition Display Window']
    },

    dimensions: {
      caseDiameter: '44.0 mm',
      caseThickness: '12.0 mm',
      lugWidth: '22.0 mm',
      lugToLug: '51.0 mm',
      weight: '~88 g (with stitched calfskin strap)'
    },

    materials: {
      case: '316L Stainless Steel in Signature Matte Chocolate / Mocha Ion-Plated (IP) Finish',
      bezel: 'Integrated Slanted Bezel with Crown Guard Flanks',
      frontCrystal: 'High-Impact Beveled Mineral Glass with Anti-Reflective Internal Coating',
      casebackCrystal: 'Exhibition Mineral Glass Viewing Lens',
      dial: 'Multi-layer open skeleton cutaway with suspended 12 o’clock brand cartouche and cream chapter ring',
      hands: 'Mocha/Bronze skeletonized baton hands with white luminescent infill & sweeping needle seconds',
      bracelet: 'Supple Roasted Cocoa Calfskin Leather Strap with contrast perimeter stitching & signed Matte Mocha IP pin buckle',
      waterResistance: '30 Meters (3 ATM / 3 Bar) — splash and rain resistant'
    },

    narrative: {
      headline: 'The Intricacy of Deterministic Mechanical Systems',
      summary:
        'A full-skeleton mechanical automatic timepiece celebrating pure horological physics in a distinctive matte mocha IP steel silhouette. Exposing the balance wheel harmonic oscillation, brass gear meshing, and mainspring barrel directly under a suspended cream chapter ring, it stands as a daily physical testament to deterministic precision engineering.',
      keyPillars: [
        {
          title: 'Architectural Transparency',
          description: 'A rhodium-plated skeleton bridge plate with sculpted organic apertures lets ambient light pass through the movement, accentuating gold gear teeth and synthetic corundum rubies.'
        },
        {
          title: '3 Hz Harmonic Oscillator',
          description: 'A balance wheel and hairspring pulsing at 21,600 beats/hour, producing 6 discrete mechanical beats every second on the sweeping central bronze seconds needle.'
        },
        {
          title: 'Matte Mocha IP Monolith',
          description: 'Industrial 44mm three-piece stainless steel case finished in an uncommon matte chocolate brown ion-plating, seamlessly paired with integrated crown guards and solid link bracelet.'
        }
      ]
    },

    // Authentic Macro Watch Element Pictures
    elements: [
      {
        id: 'element-balance',
        name: 'Balance Organ & Ruby Pivot',
        subtitle: '3 Hz Harmonic Oscillator',
        image: 'assets/watches/elements/element_balance_wheel.jpg',
        description: 'Exposed oscillating balance wheel and hairspring beating at 21,600 vibrations per hour, pivoted on a synthetic ruby bearing to minimize mechanical friction.'
      },
      {
        id: 'element-gear-train',
        name: 'Skeleton Gear Train & Pinions',
        subtitle: 'Brass Reduction Wheels & Bridges',
        image: 'assets/watches/elements/element_gear_train.jpg',
        description: 'Brushed raw brass escape wheels and pinions meshing seamlessly beneath sculpted rhodium-plated skeleton bridge apertures.'
      },
      {
        id: 'element-chapter-ring',
        name: 'Cream Railroad Track & Hands',
        subtitle: 'Suspended Dial Perimeter',
        image: 'assets/watches/elements/element_chapter_ring.jpg',
        description: 'Suspended warm cream peripheral ring with black pad-printed minute indices and beveled applied mocha baton hour markers.'
      },
      {
        id: 'element-case-crown',
        name: 'Fluted Crown & Angled Lugs',
        subtitle: 'Matte Mocha IP Architecture',
        image: 'assets/watches/elements/element_crown_case.jpg',
        description: 'Matte chocolate brown ion-plated knurled winding crown nestled between sculpted crown protectors with satin-brushed case lugs.'
      },
      {
        id: 'element-strap',
        name: 'Cocoa Stitched Calfskin Strap',
        subtitle: 'Embossed Grain & Mocha Buckle',
        image: 'assets/watches/elements/element_leather_strap.jpg',
        description: 'Supple roasted cocoa calfskin leather band with tonal perimeter stitching and signed matte mocha IP stainless steel pin buckle.'
      }
    ],

    // Interactive Inspection Hotspots
    hotspots: [
      {
        id: 'skeleton-plate',
        name: 'Sculpted Rhodium Skeleton Bridge Plate',
        tier: 'The Architectural Frame',
        spotX: 48,
        spotY: 42,
        badge: 'Openworked Plate',
        specs: { finish: 'Satin Rhodium / Steel Plating', apertures: 'Sculpted Organic Aperture Windows', bearings: 'Beveled Sinkings for Ruby Pivots' },
        description: 'The structural skeleton bridge holding the upper jewel bearings in microscopic alignment while opening large aesthetic windows into the gear train.'
      },
      {
        id: 'balance-escapement',
        name: '3 Hz Regulating Balance Organ & Ruby Pivot',
        tier: 'The Mechanical Heartbeat',
        spotX: 42,
        spotY: 47,
        badge: '21,600 VPH (3 Hz)',
        specs: { frequency: '21,600 beats/hour (6 micro-steps/sec)', hairspring: 'Coiled Antimagnetic Spiral Hairspring', bearing: 'Synthetic Corundum Ruby Jewel Cap' },
        description: 'The pulsating heart of the watch at the 8–9 o’clock quadrant. The hairspring continuously oscillates the balance wheel back and forth to govern deterministic timekeeping.'
      },
      {
        id: 'gear-train-barrel',
        name: 'Brass Gear Transmission & Mainspring Barrel',
        tier: 'Power & Transmission',
        spotX: 52,
        spotY: 38,
        badge: 'Kinetic Reserve',
        specs: { centerWheel: 'Gold/Brass Center Minute Driver', barrel: 'Coiled Steel High-Tensile Spring Band', reserve: '~36–40 Hours Stored Energy' },
        description: 'The mechanical power train. Energy stored in the mainspring barrel unwinds through precision-cut brass gear wheels, stepping down torque into rotational time.'
      },
      {
        id: 'mocha-bracelet',
        name: 'Mocha IP Solid Link Stainless Steel Bracelet',
        tier: 'Ergonomic Attachment',
        spotX: 50,
        spotY: 10,
        badge: 'Solid 316L Steel',
        specs: { width: '22mm Tapered Profile', links: 'Solid Stainless Steel with Push-Pin Construction', clasp: 'Dual Push-Button Deployment Clasp' },
        description: 'Heavy solid-link steel bracelet finished in identical matte chocolate brown ion-plating, securing the 44mm case with balanced wrist presence.'
      }
    ]
  },
  {
    id: 'fastrack-opulence-nt3315km01',
    brand: 'Fastrack',
    model: 'Opulence Chronograph',
    sku: 'NT3315KM01',
    referenceAlias: '3315KM01',
    category: 'Celestial Chronograph / Day-Night Phase',
    categoryGroup: 'chronograph',
    yearAcquired: '2025',
    status: 'In Active Rotation',
    tagline: 'Precision Chronograph with Sun & Moon Phase Indicator in Stealth Anthracite Metal',
    image: 'assets/watches/fastrack/fastrack_watch_transparent.png',
    masterImage: 'assets/watches/fastrack/fastrack_watch.jpg',
    backgroundImage: 'assets/watches/backgrounds/bg_celestial_eclipse.jpg',

    // Watch-Specific Dynamic Luxury Theme Tokens (Obsidian Eclipse & Celestial Horizon)
    theme: {
      accentPrimary: '#f59e0b', // Solar Flare Gold (Sun Phase)
      accentSecondary: '#ef4444', // Racing Crimson Pusher Accent
      accentMoon: '#e2e8f0', // Lunar Starlight Silver
      bgDeep: '#060608', // Obsidian Eclipse Base
      bgSurface: '#121318', // Smoked Anthracite Surface
      bgCard: '#1a1c23', // 3D Carbon Card
      borderAccent: 'rgba(239, 68, 68, 0.28)',
      glowColor: 'rgba(245, 158, 11, 0.18)',
      whiteText: '#ffffff'
    },

    // Core Horological Specifications
    movement: {
      type: 'Multi-Function Quartz Chronograph',
      mechanism: 'Battery-powered high-precision quartz crystal resonator with multi-motor subdial gear trains',
      batteryLife: '~24 to 36 Months',
      complications: [
        'Central Chronograph Sweeping Seconds',
        '24-Hour Sun & Moon Celestial Orbit Disc',
        'Elapsed Chronograph Minutes Subdial',
        'Multi-Tier 3D Grooved Counters'
      ]
    },

    dimensions: {
      caseDiameter: '44.5 mm',
      caseThickness: '11.6 mm',
      lugWidth: '22.0 mm',
      lugToLug: '51.8 mm',
      weight: '~142 g (with full solid metal links)'
    },

    materials: {
      case: 'High-Impact Brass Alloy with Stealth Anthracite PVD Ion Plating',
      bezel: 'Sculpted Stepped Bezel with Dual Timing Pushers & Knurled Crown',
      frontCrystal: 'Scratch-Resistant Hardened Mineral Glass',
      caseback: 'Solid Stainless Steel Press-In Caseback with Laser-Etched Fastrack Hologram',
      dial: 'Multi-tier matte black 3D textured dial with recessed sub-dials and celestial horizon cutout',
      hands: 'High-contrast skeletonized black hands with stark luminescent white infill',
      bracelet: 'Solid-link PVD Anthracite Stainless Steel with Dual Push-Button Deployment Clasp',
      waterResistance: '50 Meters (5 ATM / 5 Bar) — suitable for splashes, rain, and everyday immersion'
    },

    narrative: {
      headline: 'The Synchronicity of Terrestrial Speed & Celestial Orbits',
      summary:
        'A high-performance all-black chronograph contrasting earthbound millisecond precision with the eternal 24-hour cycle of the sun and moon. Built with a sculpted anthracite PVD chassis, an anodized racing crimson start/stop trigger, and a multi-tiered 3D carbon dial, the Opulence Chronograph embodies modern tactical elegance.',
      keyPillars: [
        {
          title: 'Celestial Day-Night Horizon',
          description: 'A 24-hour rotatable disc displaying the golden sun climbing to noon and transitioning to the moon and constellations at midnight.'
        },
        {
          title: 'Racing Crimson Chronograph Trigger',
          description: 'A dedicated red anodized pusher at 2 o’clock activating split-second start/stop timing with sharp tactile feedback.'
        },
        {
          title: 'Stealth Anthracite Monolith',
          description: 'Architectural 44.5mm PVD metal case paired with a solid-link bracelet that absorbs ambient glare in an all-black silhouette.'
        }
      ]
    },

    // Authentic Macro Watch Element Pictures
    elements: [
      {
        id: 'element-sun-moon',
        name: 'Sun & Moon Celestial Horizon',
        subtitle: '24-Hour Solar & Lunar Orbital Disc',
        image: 'assets/watches/fastrack/elements/element_sun_moon.jpg',
        description: 'Exposed celestial subdial transitioning between a golden daytime sun and starlit silver moon, synchronizing 24-hour diurnal rhythm.'
      },
      {
        id: 'element-crimson-pusher',
        name: 'Crimson Chronograph Pusher',
        subtitle: '2 O’Clock Anodized Start/Stop Trigger',
        image: 'assets/watches/fastrack/elements/element_crimson_pusher.jpg',
        description: 'Anodized racing crimson trigger paired with a fluted setting crown, delivering instantaneous mechanical activation to the timing gears.'
      },
      {
        id: 'element-subdials',
        name: '3D Grooved Chronograph Registers',
        subtitle: 'Multi-Tier Recessed Counters',
        image: 'assets/watches/fastrack/elements/element_subdials.jpg',
        description: 'Sunken concentric-grooved subdials tracking elapsed seconds and minutes against a knurled carbon-textured dial base.'
      },
      {
        id: 'element-hands-indices',
        name: 'White-Tipped Skeleton Handset',
        subtitle: 'High-Contrast Luminous Batons',
        image: 'assets/watches/fastrack/elements/element_hands_indices.jpg',
        description: 'Faceted white hour batons and skeletonized black hands with high-intensity luminescent white fill for instant low-light legibility.'
      },
      {
        id: 'element-bracelet-links',
        name: 'Anthracite PVD Metal Bracelet',
        subtitle: 'Solid-Link Deployment Clasp',
        image: 'assets/watches/fastrack/elements/element_bracelet_links.jpg',
        description: 'Heavy gauge solid steel links treated with stealth anthracite PVD, secured by a double push-button fold-over safety clasp.'
      }
    ]
  },
  {
    id: 'casio-gshock-gab2100luu8a',
    brand: 'Casio G-Shock',
    model: '2100 Series "CasiOak" Tough Solar',
    sku: 'GA-B2100LUU-8A',
    referenceAlias: 'GAB2100LUU8A',
    category: 'Tough Solar / Tactical Utility',
    categoryGroup: 'solar',
    yearAcquired: '2025',
    status: 'In Active Rotation',
    tagline: 'Carbon Core Guard with Tough Solar, Smartphone Link & Octagonal Geometric Architecture',
    image: 'assets/watches/casio/gshock_watch_transparent.png',
    masterImage: 'assets/watches/casio/gshock_watch.jpg',
    backgroundImage: 'assets/watches/backgrounds/bg_tactical_concrete.jpg',

    // Watch-Specific Dynamic Luxury Theme Tokens (Brutalist Tactical Grey & Solar Amber)
    theme: {
      accentPrimary: '#f59e0b', // Tough Solar Amber
      accentSecondary: '#64748b', // Slate Monolith Core
      accentHud: '#38bdf8', // Bluetooth Cyan HUD
      bgDeep: '#080a0f', // Tactical Obsidian Base
      bgSurface: '#10141d', // Industrial Foundry Surface
      bgCard: '#181e2b', // Carbon Fiber Shell Card
      borderAccent: 'rgba(245, 158, 11, 0.28)',
      glowColor: 'rgba(245, 158, 11, 0.16)',
      whiteText: '#f8fafc'
    },

    // Core Horological Specifications
    movement: {
      type: 'Module 5689 Tough Solar Quartz with Bluetooth Low Energy',
      mechanism: 'Solar-powered internal capacitor rechargeable via ambient fluorescent or solar rays',
      accuracy: '±15 seconds per month (without mobile link calibration; atomic sync via smartphone)',
      batteryLife: 'Operating time: ~7 months on rechargeable battery with normal use without exposure to light; ~18 months in power saving mode',
      complications: [
        'World Time (38 Time Zones & UTC)',
        '1/100-Second Stopwatch (24-Hour Range)',
        'Countdown Timer (60 Minutes)',
        '5 Multi-Function Alarms & Hourly Time Signal',
        'Super Illuminator Double High-Brightness LED',
        'Hand Shift Feature (Hands move clear of LCD)',
        'Phone Finder & Automatic Time Adjustment via CASIO WATCHES App'
      ]
    },

    dimensions: {
      caseDiameter: '45.4 mm',
      caseThickness: '11.9 mm',
      lugWidth: 'Integrated / 26.1 mm flare',
      lugToLug: '48.5 mm',
      weight: '52.0 g (Ultralight bio-based resin chassis)'
    },

    materials: {
      case: 'Carbon Fiber Reinforced Fine Resin (Carbon Core Guard Monocoque)',
      bezel: 'Octagonal Bio-Based Resin in Monochromatic Warm Industrial Sand / Grey Tone',
      frontCrystal: 'Inorganic Hardened Mineral Glass',
      caseback: 'Solid 316L Stainless Steel 4-Screw Secured Plate with G-Shock Shock Resist Stamping',
      dial: 'Multi-layer matte tactical dial with integrated micro-solar gathering panels and inverted high-contrast LCD',
      hands: 'Neobrite luminescent skeletonized hour and minute hands with micro-mode indicator subdial needle',
      bracelet: 'Eco-conscious Bio-Based Resin Band with stainless steel single-prong buckle',
      waterResistance: '200 Meters (20 ATM / 20 Bar) — professional marine, diving and extreme condition rated'
    },

    narrative: {
      headline: 'The Resilience of Tactical Geometry & Boundless Solar Absorption',
      summary:
        'Inheriting the iconic octagonal bezel of the legendary 1983 DW-5000C, the GA-B2100LUU-8A shrinks the profile down to an ultra-slim 11.9mm while embedding advanced Tough Solar charging and Bluetooth smartphone synchronisation inside a Carbon Core Guard shell. Finished in a subtle industrial desert sand-grey tone, it pairs rugged durability with minimalist utilitarian chic.',
      keyPillars: [
        {
          title: 'Tough Solar Energy Harvest',
          description: 'A shadow-dispersing micro solar panel built directly into the dial surface converts even dim indoor fluorescent lighting into electrical current, eliminating battery replacements.'
        },
        {
          title: 'Carbon Core Guard Monocoque',
          description: 'Fine carbon fiber reinforced resin encapsulates the electronic module, shielding quartz circuitry and mechanical gear trains from extreme drops, vibrations, and centrifugal forces.'
        },
        {
          title: 'Octagonal CasiOak Iconography',
          description: 'A modern brutalist octagonal silhouette that has become a globally recognized design icon, marrying analog geometric hands with an inverted digital matrix display.'
        }
      ]
    },

    // Authentic Macro Watch Element Pictures
    elements: [
      {
        id: 'element-octagonal-bezel',
        name: 'Iconic Octagonal Bezel',
        subtitle: 'Geometric Bio-Resin Facets',
        image: 'assets/watches/casio/element_octagonal_bezel.jpg',
        description: 'Clean octagonal faceted outer bezel engineered from bio-based eco-resins, offering shock deflection and signature geometric presence.'
      },
      {
        id: 'element-mode-subdial',
        name: 'Retrograde Mode Subdial',
        subtitle: '9 O’Clock Battery & Function Needle',
        image: 'assets/watches/casio/element_mode_subdial.jpg',
        description: 'Mechanical indicator needle tracking mode selection, battery charge level (H/M/L), and Bluetooth pairing confirmation.'
      },
      {
        id: 'element-inverted-lcd',
        name: 'Inverted Digital Display & Solar Panel',
        subtitle: 'Tactical High-Contrast Matrix',
        image: 'assets/watches/casio/element_lcd_display.jpg',
        description: 'Stealth black inverted LCD showing running seconds, date, world time city, and countdown data under ambient solar ray harvesting.'
      },
      {
        id: 'element-lume-hands',
        name: 'Neobrite Luminous Handset',
        subtitle: 'Skeletonized Analog Pointers',
        image: 'assets/watches/casio/element_hands_lume.jpg',
        description: 'High-contrast white baton hour markers and Neobrite-coated hands providing long-lasting green luminescence in total darkness.'
      },
      {
        id: 'element-resin-strap',
        name: 'Ergonomic Bio-Based Resin Strap',
        subtitle: 'Shock Absorbing Tapered Band',
        image: 'assets/watches/casio/element_resin_strap.jpg',
        description: 'Textured flexible bio-based polyurethane strap engineered with corrugated internal vents for wrist ventilation and shock dampening.'
      }
    ]
  },
  {
    id: 'timex-automatic-tw000z800',
    brand: 'Timex',
    model: 'Automatic Heritage Sunray',
    sku: 'TW000Z800',
    referenceAlias: 'TW000Z800',
    category: 'Mid-Century Automatic / Heritage',
    categoryGroup: 'mid-century',
    yearAcquired: '2026',
    status: 'In Active Rotation',
    tagline: 'Warm Champagne Sunburst Dial with Faceted Gilt Markers & Exhibition Movement',
    image: 'assets/watches/timex/timex_watch_transparent.png',
    masterImage: 'assets/watches/timex/timex_watch.jpg',
    backgroundImage: 'assets/watches/backgrounds/bg_vintage_parchment.jpg',

    // Watch-Specific Dynamic Luxury Theme Tokens (Heritage Brass & Champagne Sunburst)
    theme: {
      accentPrimary: '#d4af37', // Vintage Horological Gold
      accentSecondary: '#b48a3c', // Warm Amber Brass
      accentGilt: '#fef08a', // Pale Gilt Reflection
      bgDeep: '#0a0907', // Deep Parchment Charcoal
      bgSurface: '#14120e', // Aged Walnut Surface
      bgCard: '#1d1913', // Heritage Leather Board Card
      borderAccent: 'rgba(212, 175, 55, 0.26)',
      glowColor: 'rgba(212, 175, 55, 0.15)',
      creamText: '#fbf8ee'
    },

    // Core Horological Specifications
    movement: {
      type: 'Mechanical Automatic (Miyota Calibre Architecture)',
      mechanism: 'Weighted ball-bearing central rotor with bidirectional winding & auxiliary hand-winding',
      beatRate: '21,600 vibrations per hour (vph) / 3 Hz',
      powerReserve: '~40 to 42 Hours',
      jewelCount: 21,
      escapement: 'Anchor lever escapement with Parashock shock absorber assembly',
      complications: ['Central Sweeping Seconds', 'Quickset Date Display at 3 O’Clock', 'Screw-Down Exhibition Caseback']
    },

    dimensions: {
      caseDiameter: '40.0 mm',
      caseThickness: '12.5 mm',
      lugWidth: '20.0 mm',
      lugToLug: '47.5 mm',
      weight: '~128 g (with solid steel link bracelet)'
    },

    materials: {
      case: 'High-Polish 316L Marine-Grade Stainless Steel with Brushed Case Sides',
      bezel: 'Mirror-Polished Sloped Fixed Bezel',
      frontCrystal: 'Vintage-Domed Scratch-Resistant Hardened Mineral Crystal',
      casebackCrystal: 'Exhibition Mineral Glass Rotor Lens',
      dial: 'Champagne / Warm Beige Sunray Guilloché Dial radiating outward from the pinion',
      hands: 'Faceted Polished Gilt Dauphine Hands with slender needle center seconds',
      bracelet: 'Five-link Jubilee-Style Stainless Steel Bracelet with folding deployant clasp',
      waterResistance: '50 Meters (5 ATM / 5 Bar) — everyday immersion and rain protection'
    },

    narrative: {
      headline: 'The Dignity of Classic Mid-Century Proportions & Radial Light',
      summary:
        'Capturing the golden era of mid-century gentleman’s chronometry, the TW000Z800 pairs an immaculate 40mm mirror-polished steel case with a warm champagne sunburst dial. Under direct sunlight, fine radial brushings catch golden reflections across beveled gilt hour markers and sweeping dauphine hands, honoring over 170 years of American watchmaking heritage.',
      keyPillars: [
        {
          title: 'Radial Sunburst Dial Finish',
          description: 'Micro-grooved brushed dial plate capturing ambient lighting and diffusing it in a dynamic champagne pinwheel reflection across all 12 applied indices.'
        },
        {
          title: 'Proven 21-Jewel Automatic Calibre',
          description: 'A dependable Japanese-designed self-winding mechanical engine beating at 3 Hz, visible through a transparent exhibition display caseback.'
        },
        {
          title: 'Golden Era Ergonomics',
          description: 'A versatile 40mm diameter and 47.5mm lug-to-lug footprint designed to slip effortlessly beneath tailored dress cuffs while delivering substantial wrist presence.'
        }
      ]
    },

    // Authentic Macro Watch Element Pictures
    elements: [
      {
        id: 'element-beige-dial',
        name: 'Champagne Sunburst Dial',
        subtitle: 'Radial Brushed Guilloché Finish',
        image: 'assets/watches/timex/element_beige_dial.jpg',
        description: 'Exquisite warm champagne dial surface catching light in dynamic radial reflections across the central pinion.'
      },
      {
        id: 'element-gilt-indices',
        name: 'Applied Gilt Hour Markers',
        subtitle: 'Diamond-Cut Faceted Indices',
        image: 'assets/watches/timex/element_gilt_indices.jpg',
        description: 'Precision-faceted warm golden baton indices reflecting ambient illumination with high-contrast legibility.'
      },
      {
        id: 'element-fluted-crown',
        name: 'Fluted Setting Crown',
        subtitle: 'Tactile Manual Winding Grip',
        image: 'assets/watches/timex/element_fluted_crown.jpg',
        description: 'Micro-knurled stainless steel crown providing positive tactile grip for manual winding and instant date correction.'
      },
      {
        id: 'element-handset',
        name: 'Faceted Dauphine Handset',
        subtitle: 'Golden Polished Pointers',
        image: 'assets/watches/timex/element_handset.jpg',
        description: 'Crisply beveled dauphine hour and minute hands sweeping gracefully across the vintage railroad minute track.'
      },
      {
        id: 'element-steel-bracelet',
        name: 'Polished 5-Link Steel Bracelet',
        subtitle: 'Engineered Jubilee Style Drape',
        image: 'assets/watches/timex/element_steel_bracelet.jpg',
        description: 'Articulated 5-link stainless steel bracelet alternating between mirror-polished center rows and satin outer links.'
      }
    ]
  },
  {
    id: 'lee-cooper-lc07979-399',
    brand: 'Lee Cooper',
    model: 'Lyam Tonneau Openworked Skeleton',
    sku: 'LC07979.399',
    referenceAlias: 'LC07979399',
    category: 'Haute Skeleton / Open-Heart',
    categoryGroup: 'skeleton',
    yearAcquired: '2026',
    status: 'In Active Rotation',
    tagline: 'Curved Tonneau Ergonomics with Architectural Blue Inner Ring & Exposed Mechanical Heart',
    image: 'assets/watches/leecooper/leecooper_watch_transparent.png',
    masterImage: 'assets/watches/leecooper/leecooper_watch.jpg',
    backgroundImage: 'assets/watches/backgrounds/bg_indigo_denim_mesh.jpg',

    // Watch-Specific Dynamic Luxury Theme Tokens (Raw Indigo & Industrial Steel)
    theme: {
      accentPrimary: '#3b82f6', // Electric Indigo Blue
      accentSecondary: '#64748b', // Industrial Brushed Gunmetal
      accentRuby: '#f43f5e', // Ruby Jewel Pivot
      bgDeep: '#07090e', // Raw Denim Midnight Base
      bgSurface: '#0e131d', // Industrial Forge Surface
      bgCard: '#151c2c', // Gunmetal Plinth Card
      borderAccent: 'rgba(59, 130, 246, 0.28)',
      glowColor: 'rgba(59, 130, 246, 0.16)',
      whiteText: '#f8fafc'
    },

    // Core Horological Specifications
    movement: {
      type: 'Mechanical Automatic Skeleton',
      mechanism: 'Heavy ball-bearing tungsten-style rotor winding with auxiliary crown manual winding',
      beatRate: '21,600 vibrations per hour (vph) / 3 Hz',
      powerReserve: '~38 to 40 Hours',
      jewelCount: 20,
      escapement: 'Inverted lever escapement visible directly through the front dial aperture',
      complications: ['Full Front & Caseback Skeletonization', 'Exposed Balance Organ at 7 O’Clock', 'Sweeping Central Seconds']
    },

    dimensions: {
      caseDiameter: '42.0 mm (Width)',
      caseThickness: '13.2 mm',
      lugWidth: '24.0 mm',
      lugToLug: '49.8 mm (Curved Tonneau Profile)',
      weight: '~115 g (with high-density silicone sports strap)'
    },

    materials: {
      case: 'Supermetal Gunmetal Alloy with Multi-Step Vertical Satin Brushing and Polished Chamfers',
      bezel: 'Sculpted Curved Tonneau Bezel with 8 Industrial Perimeter Screw Rivets',
      frontCrystal: 'Curved Anti-Reflective Mineral Crystal contouring to the wrist curve',
      casebackCrystal: 'Full Mineral Exhibition Glass Window',
      dial: 'Openworked multi-tier skeleton cage framed by an electric cobalt-blue chapter ring with luminous hour plots',
      hands: 'Semi-skeletonized gunmetal sword hands with white luminescent tips and cobalt second hand',
      bracelet: 'Integrated Textured High-Grade Silicone Strap in Midnight Blue with signed tang buckle',
      waterResistance: '30 Meters (3 ATM / 3 Bar) — splash and light spray resistant'
    },

    narrative: {
      headline: 'The Fusion of Haute Tonneau Curvature & Raw Urban Industrialism',
      summary:
        'Inspired by avant-garde Swiss high horology case profiles, the LC07979.399 departs from conventional round watchmaking with its dramatic curved tonneau silhouette. Featuring 8 structural bezel rivets, an electric cobalt blue inner chapter flange, and a suspended mechanical escapement beating at 3 Hz, it brings architectural audacity to modern streetwear.',
      keyPillars: [
        {
          title: 'Curved Tonneau Anatomy',
          description: 'An anatomically curved case and crystal that hugs the natural contour of the wrist, balancing substantial wrist presence with supreme ergonomic comfort.'
        },
        {
          title: 'Exposed Escapement & Ruby Jewels',
          description: 'The balance wheel, pallet fork, and escape wheel are directly showcased at the lower dial quadrant, suspended beneath chamfered gunmetal bridge plates.'
        },
        {
          title: 'Cobalt Blue Flange Contrast',
          description: 'A striking high-gloss blue chapter ring with luminescent hour markers creates dramatic depth against the dark industrial skeleton movement.'
        }
      ]
    },

    // Authentic Macro Watch Element Pictures
    elements: [
      {
        id: 'element-tonneau-bezel',
        name: 'Sculpted Tonneau Bezel',
        subtitle: '8-Rivet Industrial Screws',
        image: 'assets/watches/leecooper/element_tonneau_bezel.jpg',
        description: 'Bold tonneau case silhouette featuring 8 functional industrial perimeter bezel rivets and alternating brushed surfaces.'
      },
      {
        id: 'element-balance-ruby',
        name: 'Exposed Balance Organ & Ruby',
        subtitle: '3 Hz Escapement Heartbeat',
        image: 'assets/watches/leecooper/element_balance_wheel.jpg',
        description: 'Suspended oscillating balance assembly flanked by synthetic corundum ruby bearings and fine regulating hairspring.'
      },
      {
        id: 'element-skeleton-gears',
        name: 'Skeleton Gear Transmission',
        subtitle: 'Openworked Kinetic Bridges',
        image: 'assets/watches/leecooper/element_skeleton_gears.jpg',
        description: 'Intermeshing brass and steel gear train stepping down mainspring torque into sweeping rotational seconds.'
      },
      {
        id: 'element-chapter-ring',
        name: 'Electric Cobalt Chapter Ring',
        subtitle: 'High-Contrast Inner Flange',
        image: 'assets/watches/leecooper/element_blue_chapter_ring.jpg',
        description: 'Vibrant cobalt blue perimeter flange accented with faceted applied luminescent hour indices and minute track.'
      },
      {
        id: 'element-silicone-strap',
        name: 'Integrated Silicone Sports Strap',
        subtitle: 'Engineered Wrist Contouring',
        image: 'assets/watches/leecooper/element_silicone_strap.jpg',
        description: 'Supple midnight blue textured silicone band seamlessly integrated into the tonneau lugs for all-day comfort.'
      }
    ]
  },
  {
    id: 'titan-classique-deca-90245sm01',
    brand: 'Titan',
    model: 'Classique Deca Sky Blue Dial',
    sku: '90245SM01',
    referenceAlias: '90245SM01',
    category: 'Architectural Geometric / Dress',
    categoryGroup: 'mid-century',
    yearAcquired: '2026',
    status: 'In Active Rotation',
    tagline: '10-Sided Decagonal Faceted Bezel with Sunburst Tiffany Sky Blue Dial & Date Display',
    image: 'assets/watches/titan/titan_deca_watch_transparent.png',
    masterImage: 'assets/watches/titan/titan_deca_watch.jpg',
    backgroundImage: 'assets/watches/backgrounds/bg_riviera_azure.jpg',

    // Watch-Specific Dynamic Luxury Theme Tokens (Riviera Tiffany Sky Blue & Mirror Steel)
    theme: {
      accentPrimary: '#38bdf8', // Riviera Sky Blue / Aquamarine
      accentSecondary: '#0284c7', // Deep Azure Cobalt
      accentSilver: '#e2e8f0', // Mirror Polished Steel
      bgDeep: '#060a0f', // Deep Oceanic Abyssal Base
      bgSurface: '#0b131e', // Mediterranean Slate Surface
      bgCard: '#111d2e', // Azure Prismatic Plinth Card
      borderAccent: 'rgba(56, 189, 248, 0.28)',
      glowColor: 'rgba(56, 189, 248, 0.16)',
      whiteText: '#f8fafc'
    },

    // Core Horological Specifications
    movement: {
      type: 'High-Precision Quartz Calibre',
      mechanism: '32,768 Hz tuning-fork quartz crystal resonator with low-friction stepping motor',
      accuracy: '±15 to 20 seconds per month',
      batteryLife: '~36 Months (SR626SW silver oxide cell)',
      complications: [
        'Central Sweeping Seconds Needle',
        'Quickset Date Window at 3 O’Clock with Beveled Silver Frame',
        '10-Sided Decagonal Mirror-Beveled Geometrical Bezel'
      ]
    },

    dimensions: {
      caseDiameter: '41.2 mm',
      caseThickness: '9.8 mm (Ultra-Slim Profile)',
      lugWidth: '20.0 mm',
      lugToLug: '48.0 mm',
      weight: '~120 g (with solid link stainless steel bracelet)'
    },

    materials: {
      case: '316L Solid Stainless Steel with Mirror-Polished Lugs and Brushed Case Sides',
      bezel: 'Sculpted 10-Sided (Decagonal) Mirror-Polished Fixed Geometric Bezel',
      frontCrystal: 'High-Purity Scratch-Resistant Sapphire-Coated Mineral Glass',
      caseback: 'Snap-in Stainless Steel Caseback with Laser-Etched Titan Classique Crest',
      dial: 'Sunburst Tiffany / Sky Blue Radial Dial with subtle metallic grain and silver indices',
      hands: 'Mirror-polished steel faceted baton hands with luminous center channels and counterweighted seconds hand',
      bracelet: 'Integrated 3-Link Solid Stainless Steel Bracelet with push-button deployment clasp',
      waterResistance: '50 Meters (5 ATM / 5 Bar) — everyday splash, rain and swimming protection'
    },

    narrative: {
      headline: 'The Radiance of 10-Sided Decagonal Symmetry & Riviera Azure',
      summary:
        'A masterclass in modern geometric refinement, the 90245SM01 commands attention with its distinctive 10-sided decagonal mirror-faceted bezel. Paired with a mesmerizing sunburst sky-blue dial inspired by the crystal waters of the French Riviera, this ultra-slim timepiece bridges the gap between bold sport-luxury architecture and classic formal elegance.',
      keyPillars: [
        {
          title: 'Decagonal 10-Sided Geometry',
          description: 'A precision-machined 10-sided bezel featuring alternating polished chamfers and flat mirror planes that cast dynamic prismatic reflections with every wrist turn.'
        },
        {
          title: 'Riviera Sky Blue Sunburst',
          description: 'A vibrant turquoise/sky blue dial plate treated with microscopic radial brushing, yielding an ethereal iridescent shimmer under changing sunlight.'
        },
        {
          title: 'Ultra-Slim 9.8mm Profile',
          description: 'Engineered with a streamlined quartz movement to achieve an ultra-thin 9.8mm case depth, slipping effortlessly under cuff and jacket sleeves.'
        }
      ]
    },

    // Authentic Macro Watch Element Pictures
    elements: [
      {
        id: 'element-deca-bezel',
        name: '10-Sided Decagonal Bezel',
        subtitle: 'Mirror-Polished Prismatic Facets',
        image: 'assets/watches/titan/element_deca_bezel.jpg',
        description: 'Sculpted decagonal outer bezel with 10 precision-milled facets that capture and reflect light like a cut gemstone.'
      },
      {
        id: 'element-sky-blue-dial',
        name: 'Sunburst Sky Blue Dial',
        subtitle: 'Riviera Iridescent Sunray Finish',
        image: 'assets/watches/titan/element_sky_blue_dial.jpg',
        description: 'Mesmerizing turquoise sky-blue dial radiating outward in delicate sunray brushings across polished silver hour batons.'
      },
      {
        id: 'element-date-window',
        name: 'Framed Date Aperture',
        subtitle: '3 O’Clock Quickset Calendar',
        image: 'assets/watches/titan/element_date_window.jpg',
        description: 'Crisply framed rectangular date portal at 3 o’clock providing instant numerical calendar legibility with high contrast.'
      },
      {
        id: 'element-faceted-crown',
        name: 'Polished Knurled Crown',
        subtitle: 'Precision Setting Mechanism',
        image: 'assets/watches/titan/element_faceted_crown.jpg',
        description: 'Mirror-polished steel setting crown with fine knurled perimeter for effortless time adjustment and date jumping.'
      },
      {
        id: 'element-link-bracelet',
        name: 'Solid 3-Link Steel Bracelet',
        subtitle: 'Brushed & Polished Integration',
        image: 'assets/watches/titan/element_link_bracelet.jpg',
        description: 'Solid stainless steel bracelet with satin-brushed outer links and mirror-polished central links with folding deployant clasp.'
      }
    ]
  }
];

export const COLLECTION_STATS = {
  totalTimepieces: WATCH_COLLECTION.length,
  movementsRepresented: [
    'Mechanical Automatic (Skeleton & Calibre)',
    'Tough Solar Bluetooth Quartz',
    'Multi-Function Quartz Chronograph',
    'High-Precision Three-Hand Quartz'
  ],
  primaryCategories: [
    'Haute Skeleton / Open-Heart',
    'Tough Solar / Tactical Utility',
    'Celestial Chronograph / Day-Night Phase',
    'Mid-Century Automatic / Heritage',
    'Architectural Geometric / Dress'
  ]
};

export function findWatchById(id) {
  if (!id) return null;
  const raw = String(id).toLowerCase().trim();
  const clean = raw.replace(/[^a-z0-9]/g, ''); // alphanumeric only

  // Stage 1: Exact direct match
  const exact = WATCH_COLLECTION.find(
    (w) =>
      w.id.toLowerCase() === raw ||
      w.sku.toLowerCase() === raw ||
      (w.referenceAlias && w.referenceAlias.toLowerCase() === raw)
  );
  if (exact) return exact;

  // Stage 2: Normalized alphanumeric match (ignores hyphens, dots, spaces)
  const normMatch = WATCH_COLLECTION.find((w) => {
    const wIdClean = w.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const wSkuClean = w.sku.toLowerCase().replace(/[^a-z0-9]/g, '');
    const wAliasClean = (w.referenceAlias || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return wIdClean === clean || wSkuClean === clean || wAliasClean === clean;
  });
  if (normMatch) return normMatch;

  // Stage 3: Brand & Model intuitive keyword dictionary
  const KEYWORD_MAP = [
    { keys: ['kennethcole', 'kenneth', 'kcwgl'], id: 'kenneth-cole-kcwgl2104102mn' },
    { keys: ['fastrack', 'opulence', '3315', 'nt3315'], id: 'fastrack-opulence-nt3315km01' },
    { keys: ['casio', 'gshock', 'casioak', '2100', 'gab2100', 'solar'], id: 'casio-gshock-gab2100luu8a' },
    { keys: ['timex', 'tw000z', 'tw000z800', 'sunray'], id: 'timex-automatic-tw000z800' },
    { keys: ['leecooper', 'lee', 'cooper', 'lyam', 'tonneau', 'lc07979'], id: 'lee-cooper-lc07979-399' },
    { keys: ['titan', 'deca', '90245', '90245sm01', 'classique'], id: 'titan-classique-deca-90245sm01' }
  ];

  for (const entry of KEYWORD_MAP) {
    if (entry.keys.some((k) => clean.includes(k) || raw.includes(k))) {
      const match = WATCH_COLLECTION.find((w) => w.id === entry.id);
      if (match) return match;
    }
  }

  // Stage 4: Substring inclusion on ID or Model name
  return (
    WATCH_COLLECTION.find(
      (w) =>
        w.id.toLowerCase().includes(raw) ||
        w.model.toLowerCase().includes(raw) ||
        w.brand.toLowerCase().includes(raw)
    ) || null
  );
}

export default WATCH_COLLECTION;
