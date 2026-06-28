import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Rishav Saigal. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
          <a href="#">Google Scholar</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
