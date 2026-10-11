import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-nav-grid">
          <div className="footer-nav-col">
            <span className="footer-col-title">Portfolio Architecture</span>
            <div className="footer-col-links">
              <a href="#experience">Enterprise Experience</a>
              <a href="#research">Academics &amp; Research</a>
              <a href="#projects">Project Laboratory</a>
              <a href="#opensource">Open Source Tooling</a>
              <a href="#publications">Publications &amp; Papers</a>
              <a href="#capabilities">Skills Evolution</a>
              <a href="#certifications">Certifications &amp; Badges</a>
              <a href="#faq">Executive FAQ Inquiries</a>
            </div>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Specialized Archives</span>
            <div className="footer-col-links">
              <a href="/watches">The Horological Vault</a>
              <a href="/assets/Rishav_Saigal_Resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume (PDF)</a>
              <a href="/llms.txt" target="_blank" rel="noopener noreferrer">LLM Manifest (/llms.txt)</a>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">XML Sitemap</a>
              <a href="#contact">Direct Collaboration Protocol</a>
            </div>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Verified Profiles &amp; DOIs</span>
            <div className="footer-col-links">
              <a href="https://www.linkedin.com/in/rishav-saigal-4bb50311a/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              <a href="https://github.com/Rishav1996" target="_blank" rel="noopener noreferrer">GitHub Repositories</a>
              <a href="https://orcid.org/0009-0005-5548-3016" target="_blank" rel="noopener noreferrer">ORCID Registry</a>
              <a href="https://www.credly.com/users/rishav-saigal.ae0679ae" target="_blank" rel="noopener noreferrer">Credly Digital Badges</a>
              <a href="https://medium.com/@rishavsaigal" target="_blank" rel="noopener noreferrer">Medium Technical Articles</a>
              <a href="https://doi.org/10.5281/zenodo.20032071" target="_blank" rel="noopener noreferrer">LLM Drift Framework (DOI)</a>
              <a href="https://doi.org/10.5281/zenodo.21520843" target="_blank" rel="noopener noreferrer">model-router Release (DOI)</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Rishav Saigal. All rights reserved.</p>
          <p className="footer-telemetry">Agentic AI Architect &amp; ML Researcher &bull; Google Cloud Production Edge</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
