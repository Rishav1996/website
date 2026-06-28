import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Rishav Saigal. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/rishav-saigal-4bb50311a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Rishav1996" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://medium.com/@rishavsaigal" target="_blank" rel="noopener noreferrer">Medium</a>
          <a href="https://orcid.org/0009-0005-5548-3016" target="_blank" rel="noopener noreferrer">ORCID</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
