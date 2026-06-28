import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';
import './HeroSection.css';

const HeroSection = () => {
  const videoRef = useVideoAutoplay({ threshold: 0.5 });
  const { isMuted } = useAudio();

  return (
    <section id="hero" className="hero-section">
      <div className="hero-video-container">
        <video 
          ref={videoRef}
          playsInline
          muted={isMuted}
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
        <h1 className="hero-title">Architecting Autonomous Intelligence</h1>
        <p className="hero-subtitle">
          "Building Agentic AI, RAG Systems, & LLM Orchestration."
        </p>
        <p className="hero-description">
          Hi, I'm Rishav. I specialize in engineering autonomous machine learning systems. My career centers on time-series forecasting, causal inference, and deploying production-grade enterprise Agentic AI frameworks.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary-large">Let's Connect</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
