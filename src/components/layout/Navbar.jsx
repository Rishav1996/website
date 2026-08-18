import React, { useState } from 'react';
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
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">Rishav Saigal</a>
        
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
                  // If on mobile or direct click
                  setActiveDropdown(null);
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

          <li className="navbar-item-cta">
            <a href="#contact" className="btn-primary">Connect</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
