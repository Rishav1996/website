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
      {/* Top Left Corner Bracket */}
      <svg className="svg-circuit-corner top-left" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="circuit-trace-path" d="M 0 25 L 0 0 L 25 0" stroke={color} strokeWidth="1.5" />
      </svg>
      {/* Top Right Corner Bracket */}
      <svg className="svg-circuit-corner top-right" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="circuit-trace-path" d="M 0 0 L 25 0 L 25 25" stroke={color} strokeWidth="1.5" />
      </svg>
      {/* Bottom Left Corner Bracket */}
      <svg className="svg-circuit-corner bottom-left" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="circuit-trace-path" d="M 0 0 L 0 25 L 25 25" stroke={color} strokeWidth="1.5" />
      </svg>
      {/* Bottom Right Corner Bracket */}
      <svg className="svg-circuit-corner bottom-right" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="circuit-trace-path" d="M 0 25 L 25 25 L 25 0" stroke={color} strokeWidth="1.5" />
      </svg>
      <div className="svg-circuit-content">
        {children}
      </div>
    </div>
  );
};

export default SvgCircuitFrame;
