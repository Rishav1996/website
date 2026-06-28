import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Rishav Saigal. All rights reserved.</p>
        <div className="footer-links">
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Rishav1996" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Medium</a>
          <a href="#" target="_blank" rel="noopener noreferrer">ORCID</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
