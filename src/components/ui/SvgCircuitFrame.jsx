import React, { useEffect, useRef } from 'react';
import anime from '../../utils/anime';
import './SvgCircuitFrame.css';

const SvgCircuitFrame = ({ children, className = '', color = '#58a6ff' }) => {
  const frameRef = useRef(null);

  useEffect(() => {
    if (!frameRef.current) return;

    const pathElements = frameRef.current.querySelectorAll('.circuit-trace-path');
    
    // Animate SVG stroke drawing using Anime.js
    const anim = anime({
      targets: pathElements,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: anime.stagger(200),
      loop: false
    });

    return () => {
      anim.pause();
    };
  }, []);

  return (
    <div ref={frameRef} className={`svg-circuit-wrapper ${className}`}>
      <svg className="svg-circuit-frame-overlay" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {/* Top Left Corner Bracket */}
        <path className="circuit-trace-path" d="M 0 25 L 0 0 L 25 0" stroke={color} strokeWidth="1.5" fill="none" />
        {/* Top Right Corner Bracket */}
        <path className="circuit-trace-path" d="M calc(100% - 25px) 0 L 100% 0 L 100% 25" stroke={color} strokeWidth="1.5" fill="none" />
        {/* Bottom Left Corner Bracket */}
        <path className="circuit-trace-path" d="M 0 calc(100% - 25px) L 0 100% L 25 100%" stroke={color} strokeWidth="1.5" fill="none" />
        {/* Bottom Right Corner Bracket */}
        <path className="circuit-trace-path" d="M calc(100% - 25px) 100% L 100% 100% L 100% calc(100% - 25px)" stroke={color} strokeWidth="1.5" fill="none" />
      </svg>
      <div className="svg-circuit-content">
        {children}
      </div>
    </div>
  );
};

export default SvgCircuitFrame;
