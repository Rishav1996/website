import React, { useRef, useState } from 'react';
import './GlowCard.css';

const GlowCard = ({ 
  children, 
  className = '', 
  glowColor = 'rgba(0, 240, 255, 0.35)', 
  spotlightRadius = 300,
  onClick
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`glow-card-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        '--glow-color': glowColor,
        '--spotlight-radius': `${spotlightRadius}px`,
      }}
    >
      <div 
        className="glow-card-spotlight" 
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div className="glow-card-content">
        {children}
      </div>
    </div>
  );
};

export default GlowCard;
