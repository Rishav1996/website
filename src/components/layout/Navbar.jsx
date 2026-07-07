import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">Rishav Saigal</a>
        <ul className="navbar-menu">
          <li><a href="#research">Academics</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#publications">Publications</a></li>
          <li><a href="#capabilities">Skills</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#media">Media</a></li>
          <li><a href="#contact" className="btn-primary">Connect</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
