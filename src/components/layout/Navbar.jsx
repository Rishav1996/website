import React, { useState } from 'react';
import AnimeMagnetic from '../ui/AnimeMagnetic';
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

  const handleSubItemClick = (href) => {
    setActiveDropdown(null);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-pill" aria-label="Main Navigation">
        <a href="#" className="navbar-logo">
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
                onClick={() => setActiveDropdown(null)}
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

          <li className="navbar-item-cta">
            <AnimeMagnetic strength={0.3}>
              <a href="#contact" className="btn-nav-connect">
                <span>Connect</span>
                <span className="btn-glow-pulse"></span>
              </a>
            </AnimeMagnetic>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
