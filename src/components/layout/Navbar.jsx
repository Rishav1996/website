import React, { useState, useEffect } from 'react';
import useRoute from '../../hooks/useRoute';
import './Navbar.css';

const NAV_PILLARS = [
  {
    label: 'Enterprise',
    href: '#experience',
    subItems: [
      { label: 'Experience', href: '#experience' },
      { label: 'Academics', href: '#research' },
    ]
  },
  {
    label: 'Engineering',
    href: '#projects',
    subItems: [
      { label: 'Projects', href: '#projects' },
      { label: 'Open Source', href: '#opensource' },
    ]
  },
  {
    label: 'Research',
    href: '#publications',
    subItems: [
      { label: 'Publications', href: '#publications' },
      { label: 'Media & Channels', href: '#media' },
    ]
  },
  {
    label: 'Expertise',
    href: '#capabilities',
    subItems: [
      { label: 'Skills Evolution', href: '#capabilities' },
      { label: 'Certifications', href: '#certifications' },
      { label: 'Executive FAQ', href: '#faq' },
    ]
  }
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { route, navigate } = useRoute();

  // Auto-close mobile drawer when viewport widens to tablet/desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSubItemClick = (href) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (route === 'watches') {
      navigate('home');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (route === 'watches') {
      navigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-pill" aria-label="Main Navigation">
        <a href={import.meta.env.BASE_URL} className="navbar-logo" onClick={handleLogoClick}>
          <span className="logo-glitch">RS</span>
          <span className="logo-text">Rishav Saigal</span>
          <span className="live-status-dot" title="Online for Architecture & Research"></span>
        </a>
        
        {/* Desktop Navigation Menu */}
        <ul className="navbar-menu">
          {NAV_PILLARS.map((pillar, idx) => (
            <li
              key={idx}
              className="navbar-item"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
              onFocus={() => setActiveDropdown(idx)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setActiveDropdown(null);
                }
              }}
            >
              <a
                href={pillar.href}
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveDropdown(null);
                  handleSubItemClick(pillar.href);
                }}
              >
                <span>{pillar.label}</span>
                <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div className={`dropdown-menu ${activeDropdown === idx ? 'open' : ''}`}>
                {pillar.subItems.map((sub, sIdx) => (
                  <a
                    key={sIdx}
                    href={sub.href}
                    className="dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubItemClick(sub.href);
                      window.history.pushState(null, '', sub.href);
                    }}
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            </li>
          ))}

          {/* Dedicated Watches / Horology Route Link */}
          <li className="navbar-item">
            <a
              href={`${import.meta.env.BASE_URL}watches`}
              className={`navbar-link nav-link-horology ${route === 'watches' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                navigate('watches');
              }}
              title="Explore Horological Timepiece Collection"
            >
              <span>Horology</span>
            </a>
          </li>

          <li className="navbar-item-cta">
            <a 
              href={`${import.meta.env.BASE_URL}assets/Rishav_Saigal_Resume.pdf`}
              download="Rishav_Saigal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav-resume"
              title="Download 2-Page PDF Resume"
            >
              <span>Resume PDF</span>
            </a>
          </li>

          <li className="navbar-item-cta">
            <a
              href="#contact"
              className="btn-nav-connect"
              onClick={(e) => {
                if (route === 'watches') {
                  e.preventDefault();
                  navigate('home');
                  setTimeout(() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
            >
              <span>Connect</span>
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-drawer"
        >
          {isMobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer / Sheet */}
      <div 
        id="mobile-nav-drawer"
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-nav-content">
          {NAV_PILLARS.map((pillar, idx) => (
            <div key={idx} className="mobile-nav-group">
              <div className="mobile-nav-group-title">{pillar.label}</div>
              <div className="mobile-nav-group-items">
                {pillar.subItems.map((sub, sIdx) => (
                  <a
                    key={sIdx}
                    href={sub.href}
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubItemClick(sub.href);
                      window.history.pushState(null, '', sub.href);
                    }}
                  >
                    <span>{sub.label}</span>
                    <svg className="mobile-nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Dedicated Horology Route in Mobile Drawer */}
          <div className="mobile-nav-group">
            <div className="mobile-nav-group-title">Horology</div>
            <div className="mobile-nav-group-items">
              <a
                href={`${import.meta.env.BASE_URL}watches`}
                className={`mobile-nav-link mobile-link-horology ${route === 'watches' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate('watches');
                }}
              >
                <span>Timepiece Collection</span>
                <span className="mobile-badge-horology">Atelier</span>
              </a>
            </div>
          </div>

          {/* Mobile Actions: Resume PDF & Connect with >=44px touch targets */}
          <div className="mobile-nav-actions">
            <a 
              href={`${import.meta.env.BASE_URL}assets/Rishav_Saigal_Resume.pdf`}
              download="Rishav_Saigal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mobile-resume"
              onClick={() => setIsMobileMenuOpen(false)}
              title="Download 2-Page PDF Resume"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Resume PDF</span>
            </a>

            <a
              href="#contact"
              className="btn-mobile-connect"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (route === 'watches') {
                  e.preventDefault();
                  navigate('home');
                  setTimeout(() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
            >
              <span>Connect</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
