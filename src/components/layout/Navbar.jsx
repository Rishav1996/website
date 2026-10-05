import React, { useState } from 'react';
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
    ]
  }
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { route, navigate } = useRoute();

  const handleSubItemClick = (href) => {
    setActiveDropdown(null);
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
      </nav>
    </header>
  );
};

export default Navbar;

