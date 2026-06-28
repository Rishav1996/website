import React from 'react';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';
import './HeroSection.css';

const HeroSection = () => {
  const videoRef = useVideoAutoplay({ threshold: 0.5 });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-video-container">
        <video 
          ref={videoRef}
          controls 
          playsInline
          muted
          className="hero-video"
          poster={`${import.meta.env.BASE_URL}assets/hero-poster.webp`}
        >
          {/* Serve 1080p for screens >= 768px */}
          <source src={`${import.meta.env.BASE_URL}assets/videos/Section 1 - Hero - 1080p.mp4`} media="(min-width: 768px)" type="video/mp4" />
          {/* Serve standard 720p for smaller screens */}
          <source src={`${import.meta.env.BASE_URL}assets/videos/Section 1 - Hero.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">Engineering Autonomous Intelligence</h1>
        <p className="hero-subtitle">
          "Build AI that thinks, plans, and executes."
        </p>
        <p className="hero-description">
          Hi, I'm Rishav. My career centers on time-series forecasting, causal inference, and building production-grade enterprise Agentic AI systems.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary-large">Let's Connect</a>
          <a href="#projects" className="btn-secondary">View Open Source</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
