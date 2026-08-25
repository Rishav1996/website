import React, { useRef, useEffect } from 'react';
import anime from '../../utils/anime';
import { useAudio } from '../../context/AudioContext';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';
import AnimeMagnetic from '../ui/AnimeMagnetic';
import './HeroSection.css';

const HeroSection = () => {
  const videoRef = useVideoAutoplay({ threshold: 0.5 });
  const { isMuted } = useAudio();
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Anime.js Timeline for entrance choreography
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800,
    });

    tl.add({
      targets: '.hero-badge-hud',
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 600,
    })
    .add({
      targets: '.hero-name',
      opacity: [0, 1],
      translateY: [20, 0],
      letterSpacing: ['4px', '-0.02em'],
      duration: 700,
    }, '-=300')
    .add({
      targets: '.hero-tagline',
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    }, '-=400')
    .add({
      targets: ['.hero-subtitle', '.hero-description'],
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(150),
      duration: 700,
    }, '-=500')
    .add({
      targets: '.hero-actions',
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 600,
    }, '-=300')
    .add({
      targets: '.hud-stat-pill',
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: anime.stagger(120),
      duration: 800,
      easing: 'easeOutElastic(1, .6)',
    }, '-=400');

    // Anime.js Continuous Floating Physics for HUD chips
    const levitateAnim1 = anime({
      targets: '.pill-1',
      translateY: [-4, 6],
      direction: 'alternate',
      loop: true,
      duration: 2600,
      easing: 'easeInOutSine',
    });

    const levitateAnim2 = anime({
      targets: '.pill-2',
      translateY: [6, -8],
      direction: 'alternate',
      loop: true,
      duration: 3200,
      easing: 'easeInOutSine',
    });

    const levitateAnim3 = anime({
      targets: '.pill-3',
      translateY: [-6, 6],
      direction: 'alternate',
      loop: true,
      duration: 2900,
      easing: 'easeInOutSine',
    });

    // Radial aura breathing
    const auraAnim = anime({
      targets: '.hero-glow-aura',
      scale: [1, 1.35],
      opacity: [0.35, 0.75],
      direction: 'alternate',
      loop: true,
      duration: 4000,
      easing: 'easeInOutSine',
    });

    return () => {
      tl.pause();
      levitateAnim1.pause();
      levitateAnim2.pause();
      levitateAnim3.pause();
      auraAnim.pause();
    };
  }, []);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="hero-video-container">
        <video 
          ref={videoRef}
          playsInline
          muted={isMuted}
          className="hero-video"
          poster={`${import.meta.env.BASE_URL}assets/hero-poster.png`}
        >
          {/* Serve 1080p for screens >= 768px */}
          <source src={`${import.meta.env.BASE_URL}assets/videos/Section 1 - Hero - 1080p.mp4`} media="(min-width: 768px)" type="video/mp4" />
          {/* Serve standard 720p for smaller screens */}
          <source src={`${import.meta.env.BASE_URL}assets/videos/Section 1 - Hero.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-scanline"></div>
      </div>
      
      <div className="hero-glow-aura" />

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-badge-hud">
            <span className="hud-pulse-dot"></span>
            <span className="hud-label">SYSTEM ONLINE // AGENTIC AI ARCHITECT</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-name">Rishav Saigal — Agentic AI Architect</span>
            <span className="hero-tagline">Architecting Autonomous Intelligence</span>
          </h1>

          <p className="hero-subtitle">
            "Building Agentic AI, RAG Systems, & LLM Orchestration."
          </p>

          <p className="hero-description">
            Hi, I'm Rishav. I specialize in engineering autonomous machine learning systems. My career centers on time-series forecasting, causal inference, and deploying production-grade enterprise Agentic AI frameworks.
          </p>

          <div className="hero-actions">
            <AnimeMagnetic strength={0.35}>
              <a href="#contact" className="btn-hero-primary">
                <span>Let's Connect</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </AnimeMagnetic>
            <AnimeMagnetic strength={0.35}>
              <a href="#projects" className="btn-hero-secondary">
                <span>Project Lab</span>
                <span className="btn-tag">13 Factsheets</span>
              </a>
            </AnimeMagnetic>
          </div>
        </div>

        <div className="hero-hud-stats">
          <div className="hud-stat-pill pill-1">
            <span className="stat-icon">⚡</span>
            <div className="stat-text">
              <strong>8+ Years Enterprise</strong>
              <small>GCP Vertex AI • LangGraph • Multi-Agent</small>
            </div>
          </div>
          <div className="hud-stat-pill pill-2">
            <span className="stat-icon">📄</span>
            <div className="stat-text">
              <strong>11 Publications</strong>
              <small>Towards AI • Zenodo DOI • Towards Deep Learning</small>
            </div>
          </div>
          <div className="hud-stat-pill pill-3">
            <span className="stat-icon">🚀</span>
            <div className="stat-text">
              <strong>15+ Production AI Models</strong>
              <small>Autonomous Decision Engines & MLOps</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
